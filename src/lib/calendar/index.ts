/**
 * Calendar Service
 * Handles calendar invite generation for patient appointments
 */

interface CalendarInviteResult {
  icsContent: string;
  error: string | null;
}

interface AppointmentDetails {
  email: string;
  name: string;
  date: Date;
  duration: number;
  location: string;
  description: string;
}

class CalendarService {
  /**
   * Generate ICS calendar invite content
   */
  static async generateCalendarInvite(
    email: string,
    name: string,
    appointmentDate: Date,
    duration: number = 30,
    location: string = 'Yashoda Hospital, Malakpet',
    description: string = 'Neurosurgical Consultation with Dr. Sayuj Krishnan'
  ): Promise<CalendarInviteResult> {
    try {
      const startTime = new Date(appointmentDate);
      const endTime = new Date(startTime.getTime() + duration * 60000);

      // Format dates for iCalendar format (YYYYMMDDTHHMMSSZ)
      const formatDate = (date: Date) => {
        return date
          .toISOString()
          .replace(/[-:]/g, '')
          .replace(/\\.000/, '');
      };

      const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Neurosurgery Consultation//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
DTSTART:${formatDate(startTime)}
DTEND:${formatDate(endTime)}
DTSTAMP:${formatDate(new Date())}
UID:${email}-${startTime.getTime()}@drsayuj.info
CREATED:${formatDate(new Date())}
DESCRIPTION:${description}\n\nWith: Dr. Sayuj Krishnan
LOCATION:${location}
SUMMARY:Neurosurgical Consultation
ATTENDEE:mailto:${email}
END:VEVENT
END:VCALENDAR`;

      return {
        icsContent,
        error: null
      };
    } catch (error) {
      return {
        icsContent: '',
        error: error instanceof Error ? error.message : 'Failed to generate calendar invite'
      };
    }
  }

  /**
   * Send calendar invite via email (placeholder for integration)
   */
  static async sendCalendarInvite(
    email: string,
    icsContent: string
  ): Promise<{ success: boolean; error: string | null }> {
    try {
      // This would be integrated with the EmailService
      // For now, just return success
      console.log(`Calendar invite sent to ${email}`);
      return { success: true, error: null };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send calendar invite'
      };
    }
  }
}

export { CalendarService };
export type { CalendarInviteResult, AppointmentDetails };
