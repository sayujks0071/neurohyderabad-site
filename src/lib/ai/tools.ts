import { tool } from 'ai';
import { z } from 'zod';
import { exec } from 'child_process';
import { promisify } from 'util';
import { processBooking } from '@/src/lib/appointments/service';
import { appointments } from '@/src/lib/db';
import { locations } from '@/src/data/locations';
import { semanticSearch } from '@/src/lib/ai/semantic-search';
import type { BookingData } from '@/packages/appointment-form/types';

const execAsync = promisify(exec);

const SERVICES = [
  { name: 'Minimally Invasive Spine Surgery', url: '/services/minimally-invasive-spine-surgery' },
  { name: 'Endoscopic Discectomy', url: '/services/endoscopic-discectomy-hyderabad' },
  { name: 'Brain Tumor Surgery', url: '/services/brain-tumor-surgery-hyderabad' },
  { name: 'Awake Spine Surgery', url: '/services/awake-spine-surgery-hyderabad' },
  { name: 'Spinal Fusion Surgery', url: '/services/spinal-fusion-surgery-hyderabad' },
  { name: 'Kyphoplasty & Vertebroplasty', url: '/services/kyphoplasty-vertebroplasty-hyderabad' },
  { name: 'Epilepsy Surgery', url: '/services/epilepsy-surgery-hyderabad' },
  { name: 'Peripheral Nerve Surgery', url: '/services/peripheral-nerve-surgery-hyderabad' },
  { name: 'Cooled Radiofrequency Ablation', url: '/services/cooled-radiofrequency-ablation-hyderabad' },
  { name: 'Robotic Spine Surgery', url: '/services/robotic-spine-surgery-hyderabad' },
];

export const tools = {
  searchContent: tool({
    description: 'Search for medical information, conditions, treatments, and blog posts on the website.',
    parameters: z.object({
      query: z.string().describe('The search query to find relevant content.'),
    }),
    execute: async ({ query }: { query: string }) => {
      const results = await semanticSearch(query, 5);
      return results.map(r => ({
        title: r.title,
        description: r.description,
        url: r.href,
        category: r.category
      }));
    },
  } as any),

  checkAvailability: tool({
    description: 'Check if an appointment slot is available for a specific date and time.',
    parameters: z.object({
      date: z.string().describe('Date in YYYY-MM-DD format'),
      time: z.string().describe('Time in HH:MM format'),
    }),
    execute: async ({ date, time }: { date: string, time: string }) => {
      const count = await appointments.checkSlot(date, time);
      return {
        available: count === 0,
        date,
        time,
        message: count === 0 ? 'Slot is available' : 'Slot is already booked',
      };
    },
  } as any),

  bookAppointment: tool({
    requireApproval: true,
    description: 'Book an appointment for a patient.',
    parameters: z.object({
      patientName: z.string().describe('Full name of the patient'),
      email: z.string().email().describe('Email address of the patient'),
      phone: z.string().describe('Phone number of the patient'),
      age: z.string().optional().describe('Age of the patient'),
      gender: z.enum(['male', 'female', 'other']).optional().describe('Gender of the patient'),
      appointmentDate: z.string().describe('Preferred date of appointment (YYYY-MM-DD)'),
      appointmentTime: z.string().describe('Preferred time of appointment (HH:MM)'),
      reason: z.string().describe('Reason for consultation'),
      painScore: z.number().optional().default(0).describe('Pain score from 0-10'),
      mriScanAvailable: z.boolean().optional().default(false).describe('Whether MRI scan is available'),
    }),
    execute: async (input: any) => {
      const bookingData: BookingData = {
        patientName: input.patientName,
        email: input.email,
        phone: input.phone,
        age: input.age || '',
        gender: input.gender || '',
        appointmentDate: input.appointmentDate,
        appointmentTime: input.appointmentTime,
        reason: input.reason,
        painScore: input.painScore,
        mriScanAvailable: input.mriScanAvailable,
      };

      const result = await processBooking(bookingData, {
        source: 'ai-chat-agent',
      });

      if (result.success) {
        return {
          status: 'success',
          message: 'Appointment booked successfully. A confirmation email has been sent.',
          details: result
        };
      } else {
        return {
          status: 'error',
          message: result.error || result.message || 'Failed to book appointment',
        };
      }
    },
  } as any),

  getServices: tool({
    description: 'Get a list of medical services and surgeries offered by Dr. Sayuj.',
    parameters: z.object({}),
    execute: async () => {
      return SERVICES;
    },
  } as any),

  getLocations: tool({
    description: 'Get the list of clinic locations where Dr. Sayuj practices.',
    parameters: z.object({}),
    execute: async () => {
      return locations.map(loc => ({
        name: loc.name,
        address: loc.address,
        phone: loc.telephone,
        mapUrl: (loc as any).directions_url || (loc as any).googleMapsUrl
      }));
    },
  } as any),

  createCalendarEvent: tool({
    description: 'Create a Google Calendar event for a scheduled appointment to secure the timeslot and notify the patient via email.',
    parameters: z.object({
      summary: z.string().describe('The title of the event (e.g. "Dr. Sayuj Consultation - John Doe")'),
      description: z.string().describe('The description of the event including patient details and reason for visit'),
      startTime: z.string().describe('The start time of the event in ISO string format (e.g., "2024-12-25T10:00:00Z")'),
      endTime: z.string().describe('The end time of the event in ISO string format (e.g., "2024-12-25T11:00:00Z")'),
      attendeeEmail: z.string().email().optional().describe('Optional patient email to invite to the calendar event'),
    }),
    execute: async ({ summary, description, startTime, endTime, attendeeEmail }: { summary: string; description: string; startTime: string; endTime: string; attendeeEmail?: string }) => {
      try {
        const eventPayload: any = {
          summary,
          description,
          start: { dateTime: startTime },
          end: { dateTime: endTime },
        };

        if (attendeeEmail) {
          eventPayload.attendees = [{ email: attendeeEmail }];
        }

        const jsonString = JSON.stringify(eventPayload).replace(/'/g, "'\\''");
        const command = `gws calendar events insert --params '{"calendarId": "primary"}' --json '${jsonString}'`;

        const { stdout, stderr } = await execAsync(command);
        if (stderr && !stderr.includes('success')) {
          console.warn('[tools/createCalendarEvent] gws stderr:', stderr);
        }

        const response = JSON.parse(stdout);
        return {
          success: true,
          eventId: response.id,
          link: response.htmlLink,
          message: 'Calendar event created successfully.'
        };
      } catch (error: any) {
        console.error('[tools/createCalendarEvent] failed to create event via gws:', error);
        return {
          success: false,
          error: error.message || 'Failed to create calendar event'
        };
      }
    },
  } as any),

  logLeadToSheets: tool({
    description: 'Save lead information (name, phone, symptom) directly to a Google Sheet to capture early intent before a full booking.',
    parameters: z.object({
      name: z.string().describe('Name of the patient'),
      phone: z.string().describe('Phone number of the patient'),
      symptom: z.string().describe('Primary symptom or concern'),
    }),
    execute: async ({ name, phone, symptom }: { name: string; phone: string; symptom: string }) => {
      try {
        const spreadsheetId = process.env.LEADS_SPREADSHEET_ID || '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms';

        const params = {
          spreadsheetId,
          range: 'Sheet1!A1',
          valueInputOption: 'USER_ENTERED'
        };
        const body = {
          values: [[name, phone, symptom, new Date().toISOString()]]
        };

        // Use JSON.stringify and proper escaping to prevent command injection
        const paramsStr = JSON.stringify(params).replace(/'/g, "'\\''");
        const bodyStr = JSON.stringify(body).replace(/'/g, "'\\''");

        const command = `gws sheets spreadsheets values append --params '${paramsStr}' --json '${bodyStr}'`;

        const { stdout, stderr } = await execAsync(command);
        if (stderr && !stderr.includes('success')) {
          console.warn('[tools/logLeadToSheets] gws stderr:', stderr);
        }

        return { success: true, message: 'Lead logged successfully.' };
      } catch (error: any) {
        console.error('[tools/logLeadToSheets] failed to log lead via gws:', error);
        return { success: false, error: error.message || 'Failed to log lead' };
      }
    },
  } as any),


  sendPersonalizedFollowUp: tool({
    description: 'Send a highly personalized, empathetic follow-up email from Dr. Sayuj to the patient.',
    parameters: z.object({
      toEmail: z.string().email().describe('Email address of the patient'),
      patientName: z.string().describe('Name of the patient'),
      symptom: z.string().describe('The primary symptom discussed'),
    }),
    execute: async ({ toEmail, patientName, symptom }: { toEmail: string; patientName: string; symptom: string }) => {
      try {
        const subject = `Following up regarding your ${symptom} - Dr. Sayuj Krishnan`;
        const bodyText = `Dear ${patientName},\n\nI noticed you were looking for information regarding ${symptom}. Please let me know if you would like to schedule a consultation so we can discuss the best treatment options for you.\n\nWarm regards,\nDr. Sayuj Krishnan\nConsultant Neurosurgeon, Hyderabad`;

        const emailLines = [
          `To: ${toEmail}`,
          'Content-Type: text/plain; charset="UTF-8"',
          'MIME-Version: 1.0',
          `Subject: ${subject}`,
          '',
          bodyText
        ];
        const rawEmail = Buffer.from(emailLines.join('\r\n')).toString('base64url');

        const params = { userId: 'me' };
        const body = { raw: rawEmail };

        // Use JSON.stringify and proper escaping to prevent command injection
        const paramsStr = JSON.stringify(params).replace(/'/g, "'\\''");
        const bodyStr = JSON.stringify(body).replace(/'/g, "'\\''");

        const command = `gws gmail users messages send --params '${paramsStr}' --json '${bodyStr}'`;

        const { stdout, stderr } = await execAsync(command);
        if (stderr && !stderr.includes('success')) {
          console.warn('[tools/sendPersonalizedFollowUp] gws stderr:', stderr);
        }

        return { success: true, message: 'Follow-up email sent successfully.' };
      } catch (error: any) {
        console.error('[tools/sendPersonalizedFollowUp] failed to send email via gws:', error);
        return { success: false, error: error.message || 'Failed to send email' };
      }
    },
  } as any),


  };
