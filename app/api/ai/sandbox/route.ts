import { streamText } from 'ai';
import { getAIClient, hasAIConfig } from '@/src/lib/ai/gateway';
import { rateLimit } from '@/src/lib/rate-limit';
import { NextResponse } from 'next/server';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const rawIp = req.headers.get('x-forwarded-for') ?? '127.0.0.1';
    const ip = rawIp.split(',')[0].trim();
    // Provide default rate limit parameters if they are missing
    const { success } = await rateLimit(`ai-sandbox-${ip}`, 50, 60000);

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    if (!hasAIConfig()) {
      return new Response(JSON.stringify({ error: 'AI Gateway is not configured.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { messages } = await req.json();

    const aiClient = getAIClient();

    try {
      const result = streamText({
        model: aiClient('openai/gpt-5.2'),
        system: 'You are an informative, empathetic, and professional assistant for Dr. Sayuj Krishnan, a neurosurgeon in Hyderabad. Include a medical disclaimer emphasizing that the AI provides general educational information, not professional medical advice, and encourage users to book a clinical consultation.',
        messages: messages,
      });

      return result.toDataStreamResponse();
    } catch (streamingError) {
      console.error('Error during AI streamText execution:', streamingError);
      return new Response(JSON.stringify({ error: 'Failed to generate AI response stream' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error in AI Sandbox route:', error);
    return new Response(JSON.stringify({ error: 'Failed to process AI request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
