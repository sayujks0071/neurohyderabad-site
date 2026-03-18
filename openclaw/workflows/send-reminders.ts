import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

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
  // Use tomorrow's date if no arg is provided
  let targetDate = process.argv[2];
  if (!targetDate) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    targetDate = tomorrow.toISOString().split('T')[0];
  }

  sendAutomatedReminders(targetDate).catch(console.error);
}
