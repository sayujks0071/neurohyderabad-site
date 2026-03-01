import { streamText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { getTextModel, hasAIConfig } from '@/src/lib/ai/gateway';
import { rateLimit } from '@/src/lib/rate-limit';

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? '127.0.0.1';
    const { success } = await rateLimit(`ai-sandbox-${ip}`);

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    if (!hasAIConfig()) {
      return NextResponse.json(
        { error: 'AI Gateway is not configured.' },
        { status: 500 }
      );
    }

    const json = await request.json();
    const { messages, requestedModel } = json;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      );
    }

    let modelId;
    if (requestedModel === 'openai/gpt-5.2') {
      modelId = getTextModel('gpt-4');
    } else {
      modelId = getTextModel();
    }

    const result = streamText({
      model: modelId,
      messages: messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error in AI Sandbox:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
