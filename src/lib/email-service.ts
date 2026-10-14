import { LeadRecord } from './types';

interface SendEmailResult {
  sent: boolean;
  reason?: 'unconfigured' | 'error' | 'success';
  error?: string;
  messageId?: string;
}

// Sanitize string to prevent email header injection
function sanitizeHeader(val: string): string {
  return val.replace(/[\r\n\t]/g, ' ').trim();
}

export async function sendLeadNotificationEmail(lead: LeadRecord): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LIVECALICUT_LEADS_EMAIL || 'hello@livecalicut.com';
  const fromEmail = process.env.EMAIL_FROM || 'LiveCalicut Registrations <onboarding@resend.dev>';

  // If email configuration is missing, safely log and inform caller so lead is persisted without hard failing
  if (!apiKey) {
    console.info(
      `[LiveCalicut Lead Engine] Submission recorded safely [ID: ${lead.id}] for destination <${toEmail}>. ` +
      `Email delivery is queued pending environment variable RESEND_API_KEY.`
    );
    return {
      sent: false,
      reason: 'unconfigured',
      error: 'Email provider credentials not configured in environment',
    };
  }

  const sanitizedBusinessName = sanitizeHeader(lead.businessName);
  const subject = `New LiveCalicut Business Registration — ${sanitizedBusinessName}`;

  const plainText = `
NEW LIVECALICUT BUSINESS REGISTRATION
Reference ID: ${lead.id}
Date & Time: ${new Date(lead.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST

CONTACT & BUSINESS DETAILS:
-------------------------------------------
Full Name:         ${lead.fullName}
Mobile Number:     ${lead.mobile}
Business Name:     ${lead.businessName}
Business Category: ${lead.businessCategory}${lead.otherCategory ? ` (${lead.otherCategory})` : ''}
Email Address:     ${lead.email || 'Not provided'}
Location / Area:   ${lead.businessLocation || 'Not specified'}
Website / Social:  ${lead.websiteOrSocial || 'Not provided'}

CAMPAIGN ATTRIBUTION:
-------------------------------------------
UTM Source:        ${lead.utmParams?.utm_source || 'direct'}
UTM Medium:        ${lead.utmParams?.utm_medium || 'none'}
UTM Campaign:      ${lead.utmParams?.utm_campaign || 'none'}
UTM Content:       ${lead.utmParams?.utm_content || 'none'}
Referrer:          ${lead.utmParams?.referrer || 'none'}

Consent Verified:  Agreed to LiveCalicut registration & Privacy Policy terms
-------------------------------------------
LiveCalicut Hyperlocal Discovery Platform — Kozhikode, Kerala
`.trim();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: #131b3b; color: #ffffff; padding: 28px 32px; border-bottom: 3px solid #ec2028; }
    .logo-title { font-size: 20px; font-weight: 800; letter-spacing: -0.5px; margin: 0; color: #ffffff; }
    .logo-sub { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #93c5fd; margin-top: 4px; font-weight: 700; }
    .badge { display: inline-block; background: #fee2e2; color: #b91c1c; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; margin-top: 12px; }
    .content { padding: 32px; }
    .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #64748b; margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px; }
    .table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .table td { padding: 10px 0; border-bottom: 1px solid #f8fafc; font-size: 14px; }
    .label { color: #64748b; width: 38%; font-weight: 500; }
    .value { color: #0f172a; font-weight: 600; }
    .highlight-val { color: #2c3691; font-weight: 700; font-size: 16px; }
    .campaign-box { background: #f8fafc; border-radius: 10px; padding: 14px 18px; border: 1px solid #edf2f7; font-size: 13px; margin-bottom: 24px; }
    .footer { background: #f8fafc; padding: 20px 32px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="logo-title">LIVECALICUT</div>
      <div class="logo-sub">Kozhikode's Local Discovery Platform</div>
      <div class="badge">Reference ID: ${lead.id}</div>
    </div>
    
    <div class="content">
      <div class="section-title">New Business Registration Lead</div>
      <table class="table">
        <tr>
          <td class="label">Business Name</td>
          <td class="value highlight-val">${lead.businessName}</td>
        </tr>
        <tr>
          <td class="label">Full Name</td>
          <td class="value">${lead.fullName}</td>
        </tr>
        <tr>
          <td class="label">Mobile Number</td>
          <td class="value"><a href="tel:${lead.mobile}" style="color: #2c3691; text-decoration: none; font-weight: 700;">${lead.mobile}</a></td>
        </tr>
        <tr>
          <td class="label">Category</td>
          <td class="value">${lead.businessCategory}${lead.otherCategory ? ` (${lead.otherCategory})` : ''}</td>
        </tr>
        <tr>
          <td class="label">Email Address</td>
          <td class="value">${lead.email || '<span style="color:#94a3b8; font-weight:400;">Not provided</span>'}</td>
        </tr>
        <tr>
          <td class="label">Kozhikode Area</td>
          <td class="value">${lead.businessLocation || '<span style="color:#94a3b8; font-weight:400;">Not specified</span>'}</td>
        </tr>
        <tr>
          <td class="label">Website / Social</td>
          <td class="value">${lead.websiteOrSocial ? `<a href="${lead.websiteOrSocial.startsWith('http') ? lead.websiteOrSocial : 'https://' + lead.websiteOrSocial}" target="_blank" style="color: #ec2028; text-decoration: none;">${lead.websiteOrSocial}</a>` : '<span style="color:#94a3b8; font-weight:400;">Not provided</span>'}</td>
        </tr>
        <tr>
          <td class="label">Received At</td>
          <td class="value">${new Date(lead.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</td>
        </tr>
      </table>

      ${lead.utmParams && (lead.utmParams.utm_source || lead.utmParams.utm_campaign) ? `
      <div class="section-title">Paid Ads Attribution</div>
      <div class="campaign-box">
        <strong>Source:</strong> ${lead.utmParams.utm_source || 'direct'} &bull; 
        <strong>Medium:</strong> ${lead.utmParams.utm_medium || 'none'} &bull; 
        <strong>Campaign:</strong> ${lead.utmParams.utm_campaign || 'none'}
        ${lead.utmParams.utm_content ? `<br><strong>Ad Content:</strong> ${lead.utmParams.utm_content}` : ''}
      </div>` : ''}

      <div style="font-size: 12px; color: #15803d; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 10px 14px; border-radius: 8px;">
        &#10003; <strong>Consent verified:</strong> Applicant accepted the LiveCalicut terms & agreed to be contacted regarding this listing.
      </div>
    </div>

    <div class="footer">
      LiveCalicut Lead Delivery System &bull; Kozhikode (Calicut), Kerala, India<br>
      Automated notification for administrative review.
    </div>
  </div>
</body>
</html>
`.trim();

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject,
        html,
        text: plainText,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errorMsg = errData.message || `Resend API returned status ${response.status}`;
      console.error('[LiveCalicut Lead Engine] Resend delivery failed:', errorMsg);
      return { sent: false, reason: 'error', error: errorMsg };
    }

    const data = await response.json();
    return { sent: true, reason: 'success', messageId: data.id };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('[LiveCalicut Lead Engine] Network error delivering email:', errorMsg);
    return { sent: false, reason: 'error', error: errorMsg };
  }
}
