import { NextRequest, NextResponse } from 'next/server';
import { RegistrationFormData, LeadRecord, ApiResponse } from '@/lib/types';
import { saveLead, updateLeadEmailStatus } from '@/lib/lead-store';
import { sendLeadNotificationEmail } from '@/lib/email-service';
import { appendLeadToGoogleSheet } from '@/lib/sheets-service';

// In-memory rate limiting map: ip -> Array of timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 6;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

// Indian mobile number validation regex (permits +91 prefix, spaces, dashes)
const INDIAN_PHONE_REGEX = /^(?:\+91[\s-]?)?[6789]\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1';

    // 1. Rate limiting check
    if (isRateLimited(ip)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: 'Too many registration requests. Please wait a few minutes before trying again.',
        },
        { status: 429 }
      );
    }

    const body: RegistrationFormData = await request.json();

    // 2. Honeypot check (Spam protection)
    if (body.honeypot && body.honeypot.trim().length > 0) {
      console.warn(`[LiveCalicut Security] Honeypot triggered from IP ${ip}`);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: 'Submission failed spam verification.',
        },
        { status: 400 }
      );
    }

    const errors: Record<string, string> = {};

    // 3. Validation
    const fullName = body.fullName?.trim();
    if (!fullName || fullName.length < 2) {
      errors.fullName = 'Please enter your full name (at least 2 characters).';
    } else if (fullName.length > 100) {
      errors.fullName = 'Full name must be under 100 characters.';
    }

    const rawMobile = body.mobile?.replace(/[\s-]/g, '') || '';
    if (!rawMobile) {
      errors.mobile = 'Mobile number is required.';
    } else if (!INDIAN_PHONE_REGEX.test(rawMobile)) {
      errors.mobile = 'Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9).';
    }

    const businessName = body.businessName?.trim();
    if (!businessName || businessName.length < 2) {
      errors.businessName = 'Please enter your business or service name (at least 2 characters).';
    } else if (businessName.length > 120) {
      errors.businessName = 'Business name must be under 120 characters.';
    }

    const businessCategory = body.businessCategory?.trim();
    if (!businessCategory) {
      errors.businessCategory = 'Please select a business category.';
    }

    if (businessCategory === 'other') {
      const otherCategory = body.otherCategory?.trim();
      if (!otherCategory || otherCategory.length < 2) {
        errors.otherCategory = 'Please specify your business category.';
      }
    }

    const email = body.email?.trim();
    if (email && !EMAIL_REGEX.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!body.consent) {
      errors.consent = 'You must agree to the privacy terms to submit your registration.';
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: 'Please resolve the highlighted validation errors.',
          errors,
        },
        { status: 400 }
      );
    }

    // 4. Generate unique Lead Reference ID
    const year = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `LC-${year}-${randomSuffix}`;

    const leadRecord: LeadRecord = {
      id: referenceId,
      createdAt: new Date().toISOString(),
      fullName: fullName!,
      mobile: rawMobile,
      businessName: businessName!,
      businessCategory: businessCategory!,
      otherCategory: body.otherCategory?.trim(),
      email: email || undefined,
      businessLocation: body.businessLocation?.trim() || undefined,
      websiteOrSocial: body.websiteOrSocial?.trim() || undefined,
      consent: true,
      utmParams: body.utmParams || {},
      emailStatus: 'queued_for_configuration',
    };

    // 5. Durable persistence BEFORE email dispatch to prevent lead loss
    try {
      await saveLead(leadRecord);
    } catch (saveErr: unknown) {
      const msg = saveErr instanceof Error ? saveErr.message : 'Database error';
      if (msg.includes('Duplicate submission')) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            message: msg,
          },
          { status: 429 }
        );
      }
      console.warn('[LiveCalicut Registration] Lead save fallback warning:', msg);
    }

    // 6. External Dispatches (Email & Google Sheets)
    // Run both dispatches in parallel so registration response stays ultra-fast
    const [emailSettled, sheetSettled] = await Promise.allSettled([
      sendLeadNotificationEmail(leadRecord),
      appendLeadToGoogleSheet(leadRecord),
    ]);

    if (emailSettled.status === 'fulfilled') {
      const emailResult = emailSettled.value;
      if (emailResult.sent) {
        await updateLeadEmailStatus(leadRecord.id, 'sent');
      } else if (emailResult.reason === 'unconfigured') {
        await updateLeadEmailStatus(leadRecord.id, 'queued_for_configuration');
      } else {
        await updateLeadEmailStatus(leadRecord.id, 'failed', emailResult.error);
      }
    } else {
      console.warn('[LiveCalicut Registration] Email dispatch exception:', emailSettled.reason);
      await updateLeadEmailStatus(leadRecord.id, 'failed', String(emailSettled.reason));
    }

    if (sheetSettled.status === 'fulfilled') {
      const sheetResult = sheetSettled.value;
      if (sheetResult.synced) {
        leadRecord.sheetStatus = 'synced';
      } else if (sheetResult.reason === 'unconfigured') {
        leadRecord.sheetStatus = 'queued_for_configuration';
      } else {
        leadRecord.sheetStatus = 'failed';
        leadRecord.sheetError = sheetResult.error;
      }
    } else {
      console.warn('[LiveCalicut Registration] Sheet dispatch exception:', sheetSettled.reason);
    }

    // 7. Successful confirmed response
    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message:
          'Your registration details have been received. Our team will review your submission and contact you regarding the next steps.',
        referenceId,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('[LiveCalicut API Error]:', error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: 'An unexpected server error occurred. Please try again.',
      },
      { status: 500 }
    );
  }
}
