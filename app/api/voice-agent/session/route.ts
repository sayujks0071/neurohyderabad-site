import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { isAIGatewayConfigured, getGatewayModel, getGatewayBaseUrl } from '@/src/lib/ai/gateway';
import { rateLimit } from '@/src/lib/rate-limit';
import { sanitizeForPrompt } from '@/src/lib/validation';
import { DR_SAYUJ_SYSTEM_PROMPT } from '@/src/lib/ai/prompts';

export async function POST(req: NextRequest) {
  // 🛡️ Sentinel: Rate limiting - 10 requests per minute per IP to prevent cost exhaustion
  const ip = (req as any).ip ?? req.headers.get("x-forwarded-for") ?? "unknown";
  const limit = rateLimit(ip, 10, 60 * 1000);

  if (!limit.success) {
    return NextResponse.json(
      {
        error: "Too many requests. Please try again later.",
        message: "Rate limit exceeded. Please wait a moment."
      },
      { status: 429 }
    );
  }

  try {
    const { instructions, voice = 'alloy', model = 'gpt-4o-realtime-preview' } = await req.json();

    let finalInstructions = instructions;

    // If no specific instructions provided, load the unified persona from SOUL.md
    if (!finalInstructions) {
      try {
        const soulPath = path.join(process.cwd(), 'openclaw', 'SOUL.md');
        finalInstructions = await fs.promises.readFile(soulPath, 'utf-8');
      } catch (error) {
        console.warn('Failed to load SOUL.md for voice agent:', error);
        finalInstructions = DR_SAYUJ_SYSTEM_PROMPT;
      }
    }

    // 🛡️ Sentinel: Input validation to prevent abuse
    // 1. Sanitize instructions to remove control characters and limit length (increased to 5000 for full persona)
    const cleanInstructions = sanitizeForPrompt(finalInstructions, 5000);

    // 2. Validate voice (whitelist)
    const ALLOWED_VOICES = ['alloy', 'echo', 'shimmer', 'ash', 'ballad', 'coral', 'sage', 'verse'];
    const safeVoice = ALLOWED_VOICES.includes(voice) ? voice : 'alloy';

    // 3. Validate model (strict whitelist to prevent using expensive/unknown models)
    const ALLOWED_MODELS = ['gpt-4o-realtime-preview', 'gpt-4o-realtime-preview-2024-10-01'];
    const safeModel = ALLOWED_MODELS.includes(model) ? model : 'gpt-4o-realtime-preview';

    const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.OPENAI_API_KEY;

    // Validate API key
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI/Gateway API key not configured' },
        { status: 500 }
      );
    }

    const isGateway = isAIGatewayConfigured();

    const baseUrl = isGateway
      ? getGatewayBaseUrl()
      : 'https://api.openai.com/v1';

    const finalModel = isGateway ? getGatewayModel(safeModel) : safeModel;

    // Create a session with OpenAI Realtime API (or via Gateway)
    const response = await fetch(`${baseUrl}/realtime/sessions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: finalModel,
        voice: safeVoice,
        instructions: cleanInstructions,
        modalities: ['text', 'audio'],
        input_audio_format: 'pcm16',
        output_audio_format: 'pcm16',
        turn_detection: {
          type: 'server_vad', // Voice Activity Detection
          threshold: 0.5,
          prefix_padding_ms: 300,
          silence_duration_ms: 500,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI/Gateway API error:', error);
      return NextResponse.json(
        { error: 'Failed to create voice session' },
        { status: response.status }
      );
    }

    const session = await response.json();

    return NextResponse.json({
      sessionId: session.id,
      sessionUrl: session.client_secret?.url || session.url,
      expiresAt: session.expires_at,
    });

  } catch (error) {
    console.error('Error creating voice session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
