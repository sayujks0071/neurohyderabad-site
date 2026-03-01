import { streamText } from 'ai';
import { NextRequest } from 'next/server';
import { getTextModel, hasAIConfig } from '@/src/lib/ai/gateway';
import { rateLimit } from '@/src/lib/rate-limit';

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateLimitResult = rateLimit(ip, 10, 60000); // 10 requests per minute per IP

    if (!rateLimitResult.success) {
      return new Response(
        JSON.stringify({ error: 'Too many requests' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { messages, requestedModel } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response('Messages array is required', { status: 400 });
    }

    if (!hasAIConfig()) {
      return new Response(
        JSON.stringify({ error: 'AI Gateway API key or OpenAI API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = streamText({
      model: getTextModel(requestedModel),
      messages: messages,
    });

    // @ts-ignore
    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error in AI Sandbox:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
