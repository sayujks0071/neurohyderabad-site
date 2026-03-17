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

// Example usage if run directly
if (require.main === module) {
  syncAppointmentToCalendar(
    "Ravi Kumar",
    "2026-03-10T10:00:00+05:30",
    "2026-03-10T10:30:00+05:30",
    "Reason: Back pain | Phone: 98XXXXXXXX | Email: ravi@example.com"
  ).catch(console.error);
}
