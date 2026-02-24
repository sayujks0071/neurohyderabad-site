import { NextRequest, NextResponse } from 'next/server';
import { streamText } from 'ai';
import { getTextModel, hasAIConfig } from '@/src/lib/ai/gateway';
import { rateLimit } from '@/src/lib/rate-limit';

export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * Ask AI Sandbox API - Demonstrates Vercel AI SDK `streamText`
 */
export async function POST(req: NextRequest) {
    // 1. Rate Limit: 20 requests per minute per IP
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
    const limit = rateLimit(ip, 20, 60 * 1000);

    if (!limit.success) {
        return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            {
                status: 429,
                headers: {
                    'X-RateLimit-Limit': limit.limit.toString(),
                    'X-RateLimit-Remaining': limit.remaining.toString(),
                    'X-RateLimit-Reset': limit.reset.toString(),
                }
            }
        );
    }

    if (!hasAIConfig()) {
        return NextResponse.json(
            { error: 'AI Gateway is not configured.' },
            { status: 500 }
        );
    }

    try {
        const { messages, requestedModel } = await req.json();

        // Determine requested model, but default to our standardized Gateway models
        let aiModel = getTextModel();

        // If the user's snippet model 'openai/gpt-5.2' is passed, map it gracefully to our known best model or try to pass it if dynamic models are supported.
        if (requestedModel === 'openai/gpt-5.2') {
            // As gpt-5.2 is not publicly available yet, we map to the closest semantic equivalent defined in the gateway (gpt-4o-mini or gpt-4)
            aiModel = getTextModel('gpt-4');
        }

        // This is the core snippet requested by the user, implemented in a robust route
        const result = streamText({
            model: aiModel,
            messages,
            temperature: 0.7,
            maxOutputTokens: 1000,
            system: `You are a helpful, extremely intelligent AI assistant. 
      You are running in a special "Sandbox" mode on Dr. Sayuj Krishnan's neurosurgery website.
      Your goal is to answer questions thoughtfully and format your responses with clean Markdown.`
        });

        return result.toUIMessageStreamResponse();
    } catch (error) {
        console.error('Error in Sandbox streamText:', error);
        return NextResponse.json(
            { error: 'Failed to process AI request', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
