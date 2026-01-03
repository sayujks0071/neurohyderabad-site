// CRM_WebApp.gs
// Deploy this as a Web App:
// 1. Extensions > Apps Script
// 2. Paste this code.
// 3. Project Settings > Script Properties: add keys (SHEET_ID, API_TOKEN, etc.)
// 4. Deploy > New Deployment > Web App > Execute as Me > Access: Anyone
// 5. Copy URL to Vercel env var GOOGLE_APPS_SCRIPT_WEBAPP_URL
// 6. Set API_TOKEN in both Script Properties and Vercel env var GOOGLE_APPS_SCRIPT_API_TOKEN

const PROPS = PropertiesService.getScriptProperties();

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json({ ok: false, error: "Invalid payload" });
    }

    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (err) {
      return json({ ok: false, error: "Invalid JSON" });
    }

    // --- Auth (REQUIRED) ---
    const expectedToken = PROPS.getProperty("API_TOKEN");
    if (!expectedToken || data.apiToken !== expectedToken) {
      return json({ ok: false, error: "Unauthorized" });
    }

    // --- Validation ---
    const errors = validate(data);
    if (errors.length) {
      return json({ ok: false, error: "Validation failed", details: errors });
    }

    const sheetId = mustProp("SHEET_ID");
    const sheetTab = PROPS.getProperty("SHEET_TAB") || "Leads";
    const ss = SpreadsheetApp.openById(sheetId);
    let sheet = ss.getSheetByName(sheetTab);

    if (!sheet) {
      sheet = ss.insertSheet(sheetTab);
      sheet.appendRow([
        "timestamp", "requestId", "fullName", "phone", "email", "city",
        "concern", "preferredDate", "preferredTime", "source", "status",
        "driveFolderUrl", "calendarEventId", "calendarEventUrl",
        "staffNotified", "confirmationSent", "notes", "rawJson"
      ]);
      sheet.setFrozenRows(1);
    }

    // --- Idempotency (fast) ---
    const existing = findByRequestIdFast(sheet, data.requestId);
    if (existing) {
      return json({
        ok: true,
        requestId: data.requestId,
        message: "Already processed",
        sheetRowIndex: existing.rowIndex,
        driveFolderUrl: existing.driveFolderUrl || "",
        calendarEventId: existing.calendarEventId || "",
        calendarEventUrl: existing.calendarEventUrl || ""
      });
    }

    // --- Process lead ---
    const result = processLead(data);

    // Append row
    sheet.appendRow([
      new Date(),
      data.requestId,
      data.fullName,
      data.phone,
      data.email || "",
      data.city || "",
      data.concern || "",
      data.preferredDate || "",
      data.preferredTime || "",
      data.source || "website",
      result.status || "NEW",
      result.driveFolderUrl || "",
      result.calendarEventId || "",
      result.calendarEventUrl || "",
      result.staffNotified ? "YES" : "NO",
      result.confirmationSent ? "YES" : "NO",
      result.notes || "",
      JSON.stringify(sanitizeRaw(data))
    ]);

    const rowIndex = sheet.getLastRow();

    return json({
      ok: true,
      requestId: data.requestId,
      sheetRowIndex: rowIndex,
      driveFolderUrl: result.driveFolderUrl || "",
      calendarEventId: result.calendarEventId || "",
      calendarEventUrl: result.calendarEventUrl || "",
      message: "Lead processed successfully"
    });

  } catch (err) {
    Logger.log(err);
    return json({ ok: false, error: "Internal error", message: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  const staffEmails = PROPS.getProperty("STAFF_EMAILS");
  return json({
    ok: true,
    status: "ok",
    timestamp: new Date().toISOString(),
    config: {
      staffEmailsConfigured: !!staffEmails && staffEmails.length > 0
    }
  });
}

// ---------- helpers ----------

function mustProp(name) {
  const v = PROPS.getProperty(name);
  if (!v) throw new Error("Missing Script Property: " + name);
  return v;
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function validate(data) {
  const errors = [];
  if (!data.requestId) errors.push("Missing requestId");
  if (!data.fullName) errors.push("Missing fullName");
  if (!data.phone) errors.push("Missing phone");
  if (!data.email) errors.push("Missing email");
  if (!data.city) errors.push("Missing city");
  if (!data.concern) errors.push("Missing concern");

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Invalid email format");
  }

  if (data.concern && data.concern.length < 10) {
    errors.push("Concern must be at least 10 characters");
  }

  if (data.phone) {
    const clean = String(data.phone).replace(/[^0-9+]/g, "");
    if (clean.length < 8 || clean.length > 15) errors.push("Phone length invalid (8-15)");
  }

  return errors;
}

// Faster than reading whole sheet
function findByRequestIdFast(sheet, requestId) {
  const tf = sheet.createTextFinder(requestId).matchEntireCell(true).findNext();
  if (!tf) return null;

  const row = tf.getRow();
  // columns based on your header ordering
  const values = sheet.getRange(row, 1, 1, 18).getValues()[0];
  return {
    rowIndex: row,
    driveFolderUrl: values[11],
    calendarEventId: values[12],
    calendarEventUrl: values[13]
  };
}

function sanitizeRaw(data) {
  // Never store token in sheet
  const copy = JSON.parse(JSON.stringify(data));
  delete copy.apiToken;
  return copy;
}

function processLead(data) {
  const res = {
    status: "NEW",
    driveFolderUrl: "",
    calendarEventId: "",
    calendarEventUrl: "",
    staffNotified: false,
    confirmationSent: false,
    notes: ""
  };

  const parentFolderId = PROPS.getProperty("PARENT_FOLDER_ID");
  const staffEmails = (PROPS.getProperty("STAFF_EMAILS") || "")
    .split(",").map(s => s.trim()).filter(Boolean);
  const calendarId = PROPS.getProperty("CALENDAR_ID");

  // Drive folder
  if (parentFolderId) {
    try {
      const parent = DriveApp.getFolderById(parentFolderId);
      const folderName = safeFolderName(`${isoDate()}_${data.fullName}_${data.phone}_${data.requestId}`);
      const folder = parent.createFolder(folderName);
      res.driveFolderUrl = folder.getUrl();

      staffEmails.forEach(email => {
        try { folder.addEditor(email); } catch (e) { Logger.log("Share failed: " + email + " " + e); }
      });
    } catch (e) {
      res.notes += `Drive Error: ${String(e)}; `;
    }
  }

  // Calendar (optional)
  if (calendarId) {
    try {
      const cal = CalendarApp.getCalendarById(calendarId);
      if (cal) {
        const title = `Appointment: ${data.fullName} (${data.phone})`;
        const description = [
          `Concern: ${data.concern || "N/A"}`,
          `Folder: ${res.driveFolderUrl || "N/A"}`,
          `RequestId: ${data.requestId}`
        ].join("\n");

        const dt = parsePreferredDateTime(data.preferredDate, data.preferredTime);
        let event;
        if (dt) {
          const end = new Date(dt.getTime() + 20 * 60000);
          event = cal.createEvent(title, dt, end, { description });
        } else {
          event = cal.createAllDayEvent(title + " [Unscheduled]", new Date(), { description });
        }

        res.calendarEventId = event.getId();
        // calendarEventUrl requires Advanced Calendar API (optional)
      }
    } catch (e) {
      res.notes += `Calendar Error: ${String(e)}; `;
    }
  }

  // Staff notify (recommended always)
  if (staffEmails.length) {
    try {
      notifyStaff(staffEmails, data, res.driveFolderUrl);
      res.staffNotified = true;
    } catch (e) {
      res.notes += `Staff Notify Error: ${String(e)}; `;
    }
  }

  // User email confirmation
  if (data.email) {
    try {
      MailApp.sendEmail({
        to: data.email,
        subject: "Appointment Request Received",
        body: buildUserEmail(data, res)
      });
      res.confirmationSent = true;
    } catch (e) {
      res.notes += `Email Error: ${String(e)}; `;
    }
  }

  return res;
}

function notifyStaff(emails, data, folderUrl) {
  const subject = `New Lead: ${data.fullName} - ${data.phone}`;
  const body = [
    "New lead submitted from website.",
    "",
    `Name: ${data.fullName}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email || "-"}`,
    `City: ${data.city || "-"}`,
    `Concern: ${data.concern || "-"}`,
    `Preferred: ${(data.preferredDate || "-")} ${(data.preferredTime || "")}`,
    "",
    `Drive Folder: ${folderUrl || "-"}`
  ].join("\n");

  emails.forEach(email => MailApp.sendEmail(email, subject, body));
}

function buildUserEmail(data, res) {
  const lines = [
    `Dear ${data.fullName},`,
    "",
    "We have received your appointment request.",
    "",
    `Reference ID: ${data.requestId}`,
    "",
    "Our team will contact you shortly to confirm the details.",
    "",
    "Regards,",
    "Clinic Team"
  ];
  return lines.join("\n");
}

function parsePreferredDateTime(dateStr, timeStr) {
  if (!dateStr || !timeStr) return null;
  // expect YYYY-MM-DD and HH:MM (or "HH:MM AM/PM")
  const parts = String(dateStr).split("-");
  if (parts.length !== 3) return null;
  const y = Number(parts[0]), m = Number(parts[1]), d = Number(parts[2]);
  if (!y || !m || !d) return null;

  const t = to24h(timeStr);
  if (!t) return null;
  const hh = t.hh, mm = t.mm;

  // Construct in script timezone (set script tz to Asia/Kolkata)
  // Check if script timezone matches expected timezone
  const scriptTimeZone = Session.getScriptTimeZone();
  const expectedTimeZone = "Asia/Kolkata";
  if (scriptTimeZone !== expectedTimeZone) {
    Logger.log("TIMEZONE WARNING: Script is running in " + scriptTimeZone + 
      ", but appointments are assumed to be in " + expectedTimeZone + 
      ". Appointment times may be incorrect.");
  }

  const dt = new Date(y, m - 1, d, hh, mm, 0);
  if (isNaN(dt.getTime())) return null;
  return dt;
}

function to24h(timeStr) {
  const s = String(timeStr).trim().toUpperCase();
  
  // Handle 24-hour format "14:30"
  let m = s.match(/^(\d{1,2}):(\d{2})$/);
  if (m) return { hh: Number(m[1]), mm: Number(m[2]) };

  // Handle 12-hour format "2:30 PM"
  m = s.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/);
  if (!m) return null;
  
  const originalHours = Number(m[1]);
  const mm = Number(m[2]);
  const ampm = m[3];
  let hh = originalHours;

  // Make AM/PM handling explicit for clarity:
  // - 12 AM  -> 00
  // - 12 PM  -> 12
  // - Other PM hours -> add 12
  // - Other AM hours -> keep as-is
  if (ampm === "PM" && originalHours !== 12) {
    hh = originalHours + 12;
  } else if (ampm === "AM" && originalHours === 12) {
    hh = 0;
  }

  return { hh, mm };
}

function isoDate() {
  return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
}

function safeFolderName(name) {
  return String(name)
    .replace(/[\/\\:*?"<>|#%]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180);
}
