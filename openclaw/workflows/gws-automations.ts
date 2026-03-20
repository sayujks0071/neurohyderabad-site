import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

/**
 * Creates a Google Calendar event for a new patient appointment using the `gws` CLI.
 *
 * @param patientName The name of the patient.
 * @param startDateTime ISO string for the appointment start time (e.g., "2026-03-10T10:00:00+05:30").
 * @param endDateTime ISO string for the appointment end time (e.g., "2026-03-10T10:30:00+05:30").
 * @param description Details such as reason for visit and phone number.
 */
export async function syncAppointmentToCalendar(
  patientName: string,
  startDateTime: string,
  endDateTime: string,
  description: string
) {
  const payload = {
    summary: `Patient: ${patientName} - Consultation`,
    start: { dateTime: startDateTime },
    end: { dateTime: endDateTime },
    description: description,
    reminders: { useDefault: false, overrides: [{ method: 'email', minutes: 60 }] }
  };

  const args = [
    'calendar',
    'events',
    'create',
    '--params',
    JSON.stringify({ calendarId: 'primary' }),
    '--json',
    JSON.stringify(payload)
  ];

  try {
    const { stdout, stderr } = await execFileAsync('gws', args);
    if (stderr) {
      console.warn(`[gws-calendar] Warning: ${stderr}`);
    }
    console.log(`[gws-calendar] Successfully created calendar event for ${patientName}`);
    return stdout;
  } catch (error) {
    console.error(`[gws-calendar] Failed to create calendar event:`, error);
    throw error;
  }
}

/**
 * Appends patient intake data to a Google Sheet via `gws` CLI.
 *
 * @param spreadsheetId The Google Sheet ID.
 * @param patientData An array of strings containing data such as Date, Name, Age, Gender, Conditions, Phone, Status.
 */
export async function appendPatientIntakeToSheets(spreadsheetId: string, patientData: string[]) {
  const payload = {
    values: [patientData]
  };

  const args = [
    'sheets',
    'spreadsheets',
    'values',
    'append',
    '--params',
    JSON.stringify({ spreadsheetId, range: 'Sheet1!A1', valueInputOption: 'USER_ENTERED' }),
    '--json',
    JSON.stringify(payload)
  ];

  try {
    const { stdout, stderr } = await execFileAsync('gws', args);
    if (stderr) {
      console.warn(`[gws-sheets] Warning: ${stderr}`);
    }
    console.log(`[gws-sheets] Successfully appended intake for ${patientData[1] || 'Patient'}`);
    return stdout;
  } catch (error) {
    console.error(`[gws-sheets] Failed to append intake data:`, error);
    throw error;
  }
}

/**
 * Encodes a string to a base64url encoded string.
 * This is necessary for Google Workspace CLI to properly process the email body.
 */
function encodeBase64Url(str: string): string {
  return Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Automates fetching tomorrow's appointments via Calendar and sending an email reminder.
 *
 * @param date The date string (e.g., "2026-03-09") for the next day's appointments.
 */
export async function sendAutomatedReminders(date: string) {
  const startDateTime = `${date}T00:00:00+05:30`;
  const endDateTime = `${date}T23:59:00+05:30`;

  const calendarArgs = [
    'calendar',
    'events',
    'list',
    '--params',
    JSON.stringify({
      calendarId: 'primary',
      timeMin: startDateTime,
      timeMax: endDateTime,
      singleEvents: true
    })
  ];

  try {
    const { stdout, stderr } = await execFileAsync('gws', calendarArgs);
    if (stderr) {
      console.warn(`[gws-calendar] Warning fetching events: ${stderr}`);
    }

    const events = JSON.parse(stdout);

    // Simulate mapping over items and sending an email reminder for each
    for (const item of events.items || []) {
      // Extract email from description if available
      const description = item.description || '';
      const emailMatch = description.match(/Email:\s*([^\s|]+)/i);
      const recipientEmail = emailMatch ? emailMatch[1] : 'no-reply@example.com';

      const emailContent = `Hi ${item.summary},\n\nThis is a reminder for your upcoming appointment on ${item.start.dateTime}.\n\nDr. Sayuj Clinic`;
      const encodedEmail = encodeBase64Url(
        `To: ${recipientEmail}\nSubject: Reminder: Upcoming Appointment with Dr. Sayuj\n\n${emailContent}`
      );

      const payload = {
        raw: encodedEmail,
        subject: `Reminder: Upcoming Appointment - Dr. Sayuj Clinic`
      };

      const emailArgs = [
        'gmail',
        'users',
        'messages',
        'send',
        '--params',
        JSON.stringify({ userId: 'me' }),
        '--json',
        JSON.stringify(payload)
      ];

      try {
        const emailResult = await execFileAsync('gws', emailArgs);
        console.log(`[gws-gmail] Sent reminder for ${item.summary} to ${recipientEmail}.`);
      } catch (err) {
        console.error(`[gws-gmail] Failed to send reminder for ${item.summary}:`, err);
      }
    }

    console.log(`[gws-reminders] Successfully processed automated reminders for ${date}`);
    return events;
  } catch (error) {
    console.error(`[gws-reminders] Process failed:`, error);
    throw error;
  }
}

// Example usage if run directly
if (require.main === module) {
  (async () => {
    try {
      console.log('--- Running syncAppointmentToCalendar ---');
      await syncAppointmentToCalendar(
        "Ravi Kumar",
        "2026-03-10T10:00:00+05:30",
        "2026-03-10T10:30:00+05:30",
        "Reason: Back pain | Phone: 98XXXXXXXX | Email: ravi@example.com"
      );

      console.log('\n--- Running appendPatientIntakeToSheets ---');
      const SPREADSHEET_ID = process.env.SHEET_ID || "DEFAULT_SHEET_ID";
      await appendPatientIntakeToSheets(SPREADSHEET_ID, [
        "2026-03-08",
        "Ravi Kumar",
        "35",
        "M",
        "Hypertension",
        "98XXXXXXXX",
        "New"
      ]);

      console.log('\n--- Running sendAutomatedReminders ---');
      await sendAutomatedReminders("2026-03-09");

    } catch (err) {
      console.error("Error running gws-automations script:", err);
    }
  })();
}
