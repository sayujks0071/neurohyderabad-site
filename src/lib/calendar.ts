import { createEvent, EventAttributes } from 'ics';

export class CalendarService {

  static async generateCalendarInvite(
    patientEmail: string,
    patientName: string,
    appointmentDate: string,
    appointmentType: string,
    durationMinutes: number = 30
  ): Promise<{ icsContent?: string; error?: string }> {
    const startDate = new Date(appointmentDate);
    // Use UTC methods to extract date components and specify startInputType: 'utc'
    // This ensures the event is interpreted correctly regardless of the server's timezone

    const event: EventAttributes = {
      start: [
        startDate.getUTCFullYear(),
        startDate.getUTCMonth() + 1,
        startDate.getUTCDate(),
        startDate.getUTCHours(),
        startDate.getUTCMinutes()
      ],
      startInputType: 'utc',
      duration: { minutes: durationMinutes },
      title: `Appointment with Dr. Sayuj Krishnan (${appointmentType})`,
      description: `Appointment for ${patientName} with Dr. Sayuj Krishnan.\n\nType: ${appointmentType}\n\nPlease arrive 15 minutes early.\n\nLocation: Yashoda Hospital, Room No 317, OPD Block, Malakpet, Hyderabad - 500036\nContact: +91-9778280044`,
      location: 'Yashoda Hospital, Malakpet, Hyderabad',
      url: 'https://www.drsayuj.info',
      geo: { lat: 17.3730, lon: 78.4900 }, // Approximate coordinates for Yashoda Hospital Malakpet
      categories: ['Medical', 'Appointment'],
      status: 'CONFIRMED',
      busyStatus: 'BUSY',
      organizer: { name: 'Dr. Sayuj Krishnan', email: 'hellodr@drsayuj.info' },
      attendees: [
        { name: patientName, email: patientEmail, rsvp: true, partstat: 'NEEDS-ACTION', role: 'REQ-PARTICIPANT' }
      ]
    };

    return new Promise((resolve) => {
      createEvent(event, (error, value) => {
        if (error) {
          console.error('Failed to create calendar event:', error);
          resolve({ error: error.message });
          return;
        }
        resolve({ icsContent: value });
      });
    });
  }
}
