import { tool } from 'ai';
import { z } from 'zod';
import { processBooking } from '@/src/lib/appointments/service';
import { appointments } from '@/src/lib/db';
import { locations } from '@/src/data/locations';
import { semanticSearch } from '@/src/lib/ai/semantic-search';
import type { BookingData } from '@/packages/appointment-form/types';

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
        mapUrl: loc.google_maps_place_url
      }));
    },
  } as any),
};
