import { streamText } from 'ai';
import { NextRequest } from 'next/server';
import { getTextModel, hasAIConfig } from '@/src/lib/ai/gateway';

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const { prompt, model } = await request.json();

    if (!prompt) {
      return new Response('Prompt is required', { status: 400 });
    }

    if (!hasAIConfig()) {
      return new Response(
        JSON.stringify({ error: 'AI Gateway API key or OpenAI API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = streamText({
      model: getTextModel(model),
      prompt: prompt,
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
