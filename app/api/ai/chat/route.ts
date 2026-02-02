import { streamText, tool } from 'ai';
import { z } from 'zod';
import { NextRequest } from 'next/server';
import { rateLimit } from '../../../../src/lib/rate-limit';
import { getTextModel, hasAIConfig } from '@/src/lib/ai/gateway';
import { DR_SAYUJ_SYSTEM_PROMPT } from '@/src/lib/ai/prompts';
import { getDefaultFlagValues, reportFlagValues } from '@/src/lib/flags';
import { YASHODA_MALAKPET_ADDRESS, CANONICAL_TELEPHONE } from '@/src/data/locations';

/**
 * Streaming Chat API using Vercel AI SDK with Tools (OpenClaw style)
 * 
 * Features:
 * - Streaming responses
 * - Tool calling (Clinic Info, Booking)
 * - Rate limiting
 */
export async function POST(request: NextRequest) {
  try {
    // 🛡️ Rate Limiting: 10 requests per minute per IP
    const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
    const limit = await rateLimit(ip, 10, 60 * 1000); // 10 requests per minute

    if (!limit.success) {
      return new Response('Too Many Requests', {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.limit.toString(),
          'X-RateLimit-Remaining': limit.remaining.toString(),
          'X-RateLimit-Reset': limit.reset.toString(),
        }
      });
    }

    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response('Messages array is required', { status: 400 });
    }

    // Check if AI configuration is available
    if (!hasAIConfig()) {
      return new Response(
        JSON.stringify({ error: 'AI Gateway API key or OpenAI API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    reportFlagValues(getDefaultFlagValues());

    // Stream text using AI SDK with Tools
    const result = streamText({
      model: getTextModel(),
      system: DR_SAYUJ_SYSTEM_PROMPT,
      messages,
      temperature: 0.7,
      tools: {
        getClinicInfo: tool({
          description: 'Get the clinic address, phone number, and operating hours. Use this when the user asks for location, contact details, or when to visit.',
          parameters: z.object({}),
          execute: async () => {
            return {
              address: YASHODA_MALAKPET_ADDRESS,
              phone: CANONICAL_TELEPHONE,
              hours: "Monday – Saturday: 10:00 AM – 1:00 PM & 5:00 PM – 7:30 PM IST"
            };
          },
        } as any),
        initiateBooking: tool({
          description: 'Initiate an appointment booking flow. Use this when the user expresses an intent to book, schedule, or see the doctor.',
          parameters: z.object({
            intent: z.string().describe('The reason or context for the booking (e.g., "back pain", "consultation").'),
          }),
          execute: async ({ intent }: { intent: string }) => {
            return {
              status: 'ready_to_book',
              intent,
              message: "I can help you book that appointment via WhatsApp."
            };
          },
        } as any),
      },
    });

    // Return Data Stream Response for useChat (Generative UI compatible)
    return result.toUIMessageStreamResponse();

  } catch (error) {
    console.error('Error processing AI chat request:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: "I apologize, but I'm having trouble processing your request right now. Please call us directly at +91-9778280044 for immediate assistance."
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
