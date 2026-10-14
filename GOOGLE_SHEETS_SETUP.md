# 📊 LiveCalicut — Google Sheets Integration Guide

This guide connects all submissions from the **LiveCalicut Registration Form** directly into your Google Sheet:
👉 **[Open Google Sheet](https://docs.google.com/spreadsheets/d/1g_c9WbrMvUG6LDqmNmbUHuSnZQeBJzYJwsyL_eN-1c8/edit?gid=0#gid=0)**

---

## Step 1: Open Apps Script in Google Sheets

1. Open your Google Sheet: `https://docs.google.com/spreadsheets/d/1g_c9WbrMvUG6LDqmNmbUHuSnZQeBJzYJwsyL_eN-1c8/edit`
2. In the top menu, click **Extensions** > **Apps Script**.
3. Delete any default code in the editor (`function myFunction() {...}`) and paste the code below:

```javascript
/**
 * LiveCalicut Landing Page — Automatic Lead Ingestion Webhook
 * Sheet ID: 1g_c9WbrMvUG6LDqmNmbUHuSnZQeBJzYJwsyL_eN-1c8
 */
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    // 1. Automatically configure styled headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Reference ID",
        "Submission Date (IST)",
        "Full Name",
        "Mobile Number",
        "Business Name",
        "Category",
        "Email",
        "Location / Area",
        "Website / Social",
        "UTM Source",
        "UTM Medium",
        "UTM Campaign",
        "UTM Content",
        "Referrer"
      ];
      sheet.appendRow(headers);

      // Apply styling to Header Row
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#131B3B");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      headerRange.setFontFamily("Arial");
      sheet.setFrozenRows(1);
    }

    // 2. Parse Incoming Payload (supports JSON or Form encoded)
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // 3. Format Date to Indian Standard Time
    var dateString = data.date || Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy, hh:mm:ss a") + " IST";

    // 4. Construct Lead Row
    var newRow = [
      data.id || data.referenceId || "LC-" + Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy") + "-NEW",
      dateString,
      data.fullName || data.name || "",
      "'" + String(data.mobile || data.phone || "").replace("+", ""), // Prepend quote to preserve phone number format
      data.businessName || "",
      data.category || data.businessCategory || "",
      data.email || "",
      data.location || data.businessLocation || "",
      data.website || data.websiteOrSocial || "",
      data.utmSource || data.utm_source || "",
      data.utmMedium || data.utm_medium || "",
      data.utmCampaign || data.utm_campaign || "",
      data.utmContent || data.utm_content || "",
      data.referrer || ""
    ];

    sheet.appendRow(newRow);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Lead appended successfully",
      referenceId: data.id || ""
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "ok",
    message: "LiveCalicut Google Sheets Webhook is active and healthy."
  })).setMimeType(ContentService.MimeType.JSON);
}
```

---

## Step 2: Deploy as a Web App

1. In the Apps Script top bar, click the blue **Deploy** button > select **New deployment**.
2. Click the gear icon (⚙️) next to *Select type* and choose **Web app**.
3. Fill in the deployment details:
   - **Description**: `LiveCalicut Leads Webhook`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` *(Important: Select "Anyone" so the website can submit leads without authentication errors)*
4. Click **Deploy**.
5. Click **Authorize access**, choose your Google account, and click **Advanced** > **Go to Untitled project (unsafe)** > **Allow**.
6. Copy the generated **Web app URL** (it looks like `https://script.google.com/macros/s/AKfycb.../exec`).

---

## Step 3: Connect to Vercel / Environment

Once you copy the Web app URL, add it to your environment variables:

### Option A: Via Vercel CLI (or dashboard)
```bash
npx vercel env add GOOGLE_SHEETS_WEBHOOK_URL
```
*(Paste your `https://script.google.com/macros/s/.../exec` URL when prompted, select Production, Preview, Development).*

### Option B: Send the Web app URL here
Paste the URL in this chat, and it will be configured and deployed directly to production on Vercel!
