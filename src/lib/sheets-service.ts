import { LeadRecord } from './types';

export interface SheetSyncResult {
  synced: boolean;
  reason?: 'unconfigured' | 'success' | 'error';
  error?: string;
}

/**
 * Dispatches lead data to the Google Sheets Webhook (Google Apps Script Web App).
 * The script automatically creates columns in Row 1 if the sheet is empty and appends each new lead as a row.
 */
export async function appendLeadToGoogleSheet(lead: LeadRecord): Promise<SheetSyncResult> {
  const webhookUrl =
    process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
    process.env.GOOGLE_SHEET_WEBHOOK_URL;

  if (!webhookUrl) {
    console.info(
      `[LiveCalicut Google Sheets] Webhook URL not configured. Lead [${lead.id}] is recorded safely in local store & runtime logs.`
    );
    return {
      synced: false,
      reason: 'unconfigured',
      error: 'GOOGLE_SHEETS_WEBHOOK_URL environment variable is not configured',
    };
  }

  const payload = {
    id: lead.id,
    date: new Date(lead.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    fullName: lead.fullName,
    mobile: lead.mobile,
    businessName: lead.businessName,
    category:
      lead.businessCategory === 'other' && lead.otherCategory
        ? `Other (${lead.otherCategory})`
        : lead.businessCategory,
    email: lead.email || '',
    location: lead.businessLocation || '',
    website: lead.websiteOrSocial || '',
    utmSource: lead.utmParams?.utm_source || '',
    utmMedium: lead.utmParams?.utm_medium || '',
    utmCampaign: lead.utmParams?.utm_campaign || '',
    utmContent: lead.utmParams?.utm_content || '',
    referrer: lead.utmParams?.referrer || '',
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000); // 9 second safeguard timeout

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      redirect: 'follow', // Google Apps Script redirects with 302 to echo output
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      console.warn(
        `[LiveCalicut Google Sheets] Webhook returned status ${response.status}:`,
        errText
      );
      return {
        synced: false,
        reason: 'error',
        error: `Google Sheets endpoint returned HTTP ${response.status}`,
      };
    }

    console.info(
      `[LiveCalicut Google Sheets] Lead [${lead.id}] synced to Google Sheet successfully.`
    );
    return { synced: true, reason: 'success' };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.warn('[LiveCalicut Google Sheets] Error dispatching to webhook:', errorMsg);
    return { synced: false, reason: 'error', error: errorMsg };
  }
}
