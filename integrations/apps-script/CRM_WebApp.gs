// CRM_WebApp.gs
// Deploy this as a Web App:
// 1. Extensions > Apps Script
// 2. Paste this code.
// 3. Project Settings > Script Properties: add keys (SHEET_ID, etc.)
// 4. Deploy > New Deployment > Web App > Execute as Me > Access: Anyone
// 5. Copy URL to Vercel env var GOOGLE_APPS_SCRIPT_WEBAPP_URL

// --- CONFIGURATION via Script Properties ---
// SHEET_ID: ID of the Google Sheet
// SHEET_TAB: Name of the tab (default: 'Leads')
// PARENT_FOLDER_ID: Drive folder ID where subfolders are created
// STAFF_EMAILS: Comma-separated emails to notify/share folder with
// CALENDAR_ID: (Optional) Google Calendar ID to create events in
// ALLOWED_ORIGINS: (Optional) Comma-separated list of allowed origins for CORS (e.g. https://mysite.com)

const PROPS = PropertiesService.getScriptProperties();

function doPost(e) {
  try {
    // 1. CORS Pre-check & Setup
    // Note: Actual CORS for POST is handled by returning proper headers in the response

    // 2. Parse Payload
    if (!e || !e.postData || !e.postData.contents) {
      return createJSONResponse({ error: "Invalid payload" }, 400);
    }
    const data = JSON.parse(e.postData.contents);

    // 3. Validation
    const errors = validate(data);
    if (errors.length > 0) {
      return createJSONResponse({ error: "Validation failed", details: errors }, 400);
    }

    // 4. Idempotency Check
    const sheetId = PROPS.getProperty('SHEET_ID');
    const sheetTab = PROPS.getProperty('SHEET_TAB') || 'Leads';
    if (!sheetId) throw new Error("Missing SHEET_ID property");

    const ss = SpreadsheetApp.openById(sheetId);
    let sheet = ss.getSheetByName(sheetTab);

    // Create sheet if missing
    if (!sheet) {
      sheet = ss.insertSheet(sheetTab);
      // Add headers
      sheet.appendRow([
        "timestamp", "requestId", "fullName", "phone", "email", "city",
        "concern", "preferredDate", "preferredTime", "source", "status",
        "driveFolderUrl", "calendarEventId", "calendarEventUrl",
        "staffNotified", "confirmationSent", "notes", "rawJson"
      ]);
      sheet.setFrozenRows(1);
    }

    const requestId = data.requestId;
    const existingRow = findRowByRequestId(sheet, requestId);

    if (existingRow) {
      // Idempotent return
      return createJSONResponse({
        ok: true,
        requestId: requestId,
        message: "Already processed",
        driveFolderUrl: existingRow.driveFolderUrl,
        calendarEventId: existingRow.calendarEventId,
        calendarEventUrl: existingRow.calendarEventUrl
      });
    }

    // 5. Process New Lead
    const processingResult = processLead(data);

    // 6. Append to Sheet
    const rowData = [
      new Date(), // timestamp
      requestId,
      data.fullName,
      data.phone,
      data.email || "",
      data.city || "",
      data.concern || "",
      data.preferredDate || "",
      data.preferredTime || "",
      data.source || "website",
      processingResult.status,
      processingResult.driveFolderUrl || "",
      processingResult.calendarEventId || "",
      processingResult.calendarEventUrl || "",
      processingResult.staffNotified ? "YES" : "NO",
      processingResult.confirmationSent ? "YES" : "NO",
      processingResult.notes || "",
      JSON.stringify(data) // rawJson
    ];

    sheet.appendRow(rowData);
    const lastRowIndex = sheet.getLastRow();

    // 7. Success Response
    return createJSONResponse({
      ok: true,
      requestId: requestId,
      sheetRowIndex: lastRowIndex,
      driveFolderUrl: processingResult.driveFolderUrl,
      calendarEventId: processingResult.calendarEventId,
      calendarEventUrl: processingResult.calendarEventUrl,
      message: "Lead processed successfully"
    });

  } catch (err) {
    Logger.log(err);
    return createJSONResponse({ error: "Internal Server Error", message: err.toString() }, 500);
  }
}

function doGet(e) {
  // Simple health check
  return createJSONResponse({ status: "ok", timestamp: new Date().toISOString() });
}

// --- Helper Functions ---

function validate(data) {
  const errors = [];
  if (!data.requestId) errors.push("Missing requestId");
  if (!data.fullName) errors.push("Missing fullName");
  if (!data.phone) errors.push("Missing phone");

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Invalid email format");
  }

  if (data.phone) {
    const cleanPhone = data.phone.replace(/[^0-9+]/g, '');
    if (cleanPhone.length < 8 || cleanPhone.length > 15) {
      errors.push("Phone length invalid (8-15 chars allowed)");
    }
  }

  return errors;
}

function findRowByRequestId(sheet, requestId) {
  const data = sheet.getDataRange().getValues();
  // Assume requestId is column index 1 (0-based) based on headers
  const REQUEST_ID_COL = 1;

  for (let i = 1; i < data.length; i++) { // Skip header
    if (data[i][REQUEST_ID_COL] === requestId) {
      return {
        rowIndex: i + 1,
        driveFolderUrl: data[i][11],
        calendarEventId: data[i][12],
        calendarEventUrl: data[i][13]
      };
    }
  }
  return null;
}

function processLead(data) {
  const result = {
    status: "NEW",
    driveFolderUrl: "",
    calendarEventId: "",
    calendarEventUrl: "",
    staffNotified: false,
    confirmationSent: false,
    notes: ""
  };

  const parentFolderId = PROPS.getProperty('PARENT_FOLDER_ID');
  const staffEmailsRaw = PROPS.getProperty('STAFF_EMAILS');
  const staffEmails = staffEmailsRaw ? staffEmailsRaw.split(',').map(e => e.trim()) : [];
  const calendarId = PROPS.getProperty('CALENDAR_ID');

  // A. Create Drive Folder
  if (parentFolderId) {
    try {
      const folderName = `${new Date().toISOString().slice(0,10)}_${data.fullName}_${data.phone}_${data.requestId}`;
      const parentFolder = DriveApp.getFolderById(parentFolderId);
      const newFolder = parentFolder.createFolder(folderName);
      result.driveFolderUrl = newFolder.getUrl();

      // Permissions
      if (staffEmails.length > 0) {
        staffEmails.forEach(email => {
          try { newFolder.addEditor(email); } catch (e) { console.error("Error sharing folder: " + e); }
        });
      }
    } catch (e) {
      result.notes += `Drive Error: ${e.message}; `;
      console.error(e);
    }
  }

  // B. Calendar / Notification
  if (calendarId) {
    try {
      const cal = CalendarApp.getCalendarById(calendarId);
      if (cal) {
        let title = `Appointment: ${data.fullName} (${data.phone})`;
        let description = `Concern: ${data.concern || "N/A"}\n\nFolder: ${result.driveFolderUrl || "N/A"}`;

        let event;
        if (data.preferredDate && data.preferredTime) {
          // Parse date/time (assuming ISO or simple format, but handling simply here)
          // Input expected: date "YYYY-MM-DD", time "HH:MM" (24h) or "HH:MM AM/PM"
          // We'll try to construct a date object.
          // Note: Browser/Node passes ISO strings ideally.
          // Let's assume standard ISO "YYYY-MM-DD" and "HH:mm"

          const dateTimeStr = `${data.preferredDate}T${convertTimeTo24(data.preferredTime)}`;
          const startTime = new Date(dateTimeStr);
          // Adjust for timezone if script is not in IST, but usually script runs in owner's TZ.
          // For safety, we rely on the script's timezone setting or we can force it.
          // Better: Create event in specific timezone
          // Apps Script Dates are native JS Dates.

          if (!isNaN(startTime.getTime())) {
            const endTime = new Date(startTime.getTime() + 20 * 60000); // 20 mins
            event = cal.createEvent(title, startTime, endTime, {description: description});
          }
        }

        if (!event) {
          // Fallback: All day event
          event = cal.createAllDayEvent(title + " [Unscheduled]", new Date(), {description: description});
        }

        result.calendarEventId = event.getId();
        // There is no direct getUrl() on CalendarEvent, but we can construct/guess or use advanced API.
        // For simplicity, we skip the URL or leave blank, or use a generic calendar link.
        // Actually, let's just leave ID.
        result.calendarEventId = event.getId();
      }
    } catch (e) {
       result.notes += `Calendar Error: ${e.message}; `;
       // Fallback to email notification if calendar fails
       notifyStaff(staffEmails, data, result.driveFolderUrl);
       result.staffNotified = true;
    }
  } else {
    // No calendar, just notify
    notifyStaff(staffEmails, data, result.driveFolderUrl);
    result.staffNotified = true;
  }

  // C. Send User Confirmation
  if (data.email) {
    try {
      const subject = "Appointment Request Received";
      let body = `Dear ${data.fullName},\n\nWe have received your appointment request.\n\n`;
      if (result.calendarEventId) {
        body += `We have tentatively blocked a slot for you on ${data.preferredDate} at ${data.preferredTime}.\n`;
      } else {
        body += `Our team will review your request and contact you shortly to confirm the details.\n`;
      }
      body += `\nReference ID: ${data.requestId}\n\nRegards,\nClinic Team`;

      MailApp.sendEmail({
        to: data.email,
        subject: subject,
        body: body
      });
      result.confirmationSent = true;
    } catch (e) {
       result.notes += `Email Error: ${e.message}; `;
    }
  }

  return result;
}

function notifyStaff(emails, data, folderUrl) {
  if (!emails || emails.length === 0) return;
  const subject = `New Lead: ${data.fullName} - ${data.phone}`;
  const body = `New lead submitted from website.\n\nName: ${data.fullName}\nPhone: ${data.phone}\nConcern: ${data.concern}\n\nDrive Folder: ${folderUrl}`;

  emails.forEach(email => {
    try {
      MailApp.sendEmail(email, subject, body);
    } catch (e) {
      console.error("Failed to notify staff: " + email);
    }
  });
}

function convertTimeTo24(timeStr) {
  // Handle "09:00 AM", "2:30 PM", "14:00"
  if (!timeStr) return "09:00";
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') {
    hours = '00';
  }
  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }
  return `${hours}:${minutes}:00`;
}

function createJSONResponse(data, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);

  // Note: Apps Script Web Apps don't strictly support setting HTTP status codes
  // in the response headers the way standard APIs do. It always returns 200 OK
  // from the Google server standpoint unless the script crashes.
  // The client must parse the JSON body to check for "error" or "ok".

  return output;
}
