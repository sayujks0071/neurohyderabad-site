import { streamText } from 'ai';
import { NextRequest } from 'next/server';
import { rateLimit } from '@/src/lib/rate-limit';
import { getTextModel, hasAIConfig } from '@/src/lib/ai/gateway';
import { DR_SAYUJ_SYSTEM_PROMPT } from '@/src/lib/ai/prompts';
import { getDefaultFlagValues, reportFlagValues } from '@/src/lib/flags';
import { tools } from '@/src/lib/ai/tools';

/**
 * Streaming Chat API using Vercel AI SDK
 * 
 * This endpoint provides streaming responses for better UX
 * Uses OpenAI via the AI SDK for consistent API
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

    const { messages, pageTitle, pageDescription } = await request.json();

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

    let systemPrompt = DR_SAYUJ_SYSTEM_PROMPT;

    // Add page context if available
    if (pageTitle || pageDescription) {
      systemPrompt += `\n\n### CURRENT USER CONTEXT\nThe user is currently viewing the following page on the website:\n`;
      if (pageTitle) systemPrompt += `- Page Title: ${pageTitle}\n`;
      if (pageDescription) systemPrompt += `- Page Summary: ${pageDescription}\n`;
      systemPrompt += `\nIf the user asks about "this page", "this surgery", or "here", refer to the context above.`;
    }

    // Stream text using AI SDK with Tools
    const result = streamText({
      model: getTextModel(),
      system: systemPrompt,
      messages,
      temperature: 0.7,
      maxSteps: 5, // Allow multi-step tool execution
      tools: tools,
    } as any);

    // Return data stream response (standard for AI SDK 3+)
    return result.toTextStreamResponse();

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
