import { streamText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { getTextModel, hasAIConfig } from '@/src/lib/ai/gateway';
import { rateLimit } from '@/src/lib/rate-limit';

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const rawIp = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
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
      system: "You are a helpful, polite, and empathetic virtual assistant for Dr. Sayuj's neurosurgery and spine clinic. You are here to answer general questions, help patients understand clinical procedures, and provide a welcoming experience. However, you MUST clearly state that you cannot provide medical advice or diagnoses. Always encourage patients to book an appointment with Dr. Sayuj for proper medical evaluation.",
    });

    // @ts-ignore
    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error in AI Sandbox:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
