/**
 * AI-Powered Predictive Appointment Scheduling
 * 
 * Predicts optimal appointment times based on:
 * - Patient preferences
 * - Historical booking patterns
 * - Doctor availability
 * - Urgency level
 * - Seasonal patterns
 */

import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export interface SchedulingRequest {
  preferredDates: string[];
  preferredTimes: string[];
  urgencyLevel: 'emergency' | 'urgent' | 'moderate' | 'routine';
  appointmentType: 'consultation' | 'follow-up' | 'procedure' | 'second-opinion';
  condition?: string;
  patientHistory?: {
    previousAppointments?: number;
    lastAppointmentDate?: string;
    noShowRate?: number;
  };
}

export interface SchedulingPrediction {
  recommendedSlots: {
    date: string;
    time: string;
    confidence: number;
    reasoning: string;
  }[];
  alternativeSlots: {
    date: string;
    time: string;
    confidence: number;
  }[];
  estimatedWaitTime: string;
  suggestions: string[];
}

/**
 * Predict optimal appointment slots
 */
export async function predictOptimalSlots(
  request: SchedulingRequest
): Promise<SchedulingPrediction> {
  if (!process.env.OPENAI_API_KEY) {
    return fallbackScheduling(request);
  }

  try {
    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `You are an AI scheduling assistant for a neurosurgery practice. Predict optimal appointment slots based on the following information:

Patient Request:
- Preferred Dates: ${request.preferredDates.join(', ')}
- Preferred Times: ${request.preferredTimes.join(', ')}
- Urgency: ${request.urgencyLevel}
- Appointment Type: ${request.appointmentType}
${request.condition ? `- Condition: ${request.condition}` : ''}
${request.patientHistory ? `- Patient History: ${JSON.stringify(request.patientHistory)}` : ''}

Practice Information:
- Location: Yashoda Hospital, Malakpet, Hyderabad
- Operating Hours: Mon-Sat 10:00-13:00 & 17:00-19:30 IST
- Doctor: Dr. Sayuj Krishnan (Neurosurgeon)
- Specializes in: Minimally invasive spine and brain surgery

Considerations:
1. Urgency level affects priority
2. Follow-up appointments typically need 2-4 weeks after procedure
3. New consultations may have longer wait times
4. Emergency/urgent cases should be scheduled as soon as possible
5. Consider patient convenience and travel time

Provide recommendations in JSON format with:
- recommendedSlots: Array of {date, time, confidence (0-100), reasoning}
- alternativeSlots: Array of alternative options
- estimatedWaitTime: Expected wait time for this appointment type
- suggestions: Array of helpful suggestions

Return ONLY valid JSON, no other text.`,
      temperature: 0.4,
    });

    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as SchedulingPrediction;
    }

    return fallbackScheduling(request);
  } catch (error) {
    console.error('Predictive scheduling error:', error);
    return fallbackScheduling(request);
  }
}

function fallbackScheduling(request: SchedulingRequest): SchedulingPrediction {
  const urgencyMultiplier = {
    emergency: 0,
    urgent: 1,
    moderate: 3,
    routine: 7,
  }[request.urgencyLevel];

  return {
    recommendedSlots: request.preferredDates.slice(0, 3).map((date, index) => ({
      date,
      time: request.preferredTimes[0] || '10:00',
      confidence: 70 - (index * 10),
      reasoning: `Based on ${request.urgencyLevel} urgency level`,
    })),
    alternativeSlots: [],
    estimatedWaitTime: `${urgencyMultiplier} days`,
    suggestions: [
      'Call +91-9778280044 to confirm availability',
      'Have your medical reports ready',
      'Arrive 15 minutes early for registration',
    ],
  };
}

/**
 * Predict no-show probability
 */
export async function predictNoShow(
  patientHistory: SchedulingRequest['patientHistory']
): Promise<{ probability: number; factors: string[] }> {
  if (!patientHistory) {
    return { probability: 0.15, factors: ['No historical data'] };
  }

  let probability = 0.15; // Base no-show rate
  const factors: string[] = [];

  if (patientHistory.noShowRate && patientHistory.noShowRate > 0.2) {
    probability = patientHistory.noShowRate;
    factors.push('Previous no-show history');
  }

  if (patientHistory.previousAppointments === 0) {
    probability += 0.1;
    factors.push('First-time patient');
  }

  return { probability, factors };
}

