import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { createRealtimeSession } from '@/src/lib/ai/gateway';
import { rateLimit, getClientIp } from '@/src/lib/rate-limit';
import { sanitizeForPrompt } from '@/src/lib/validation';
import { DR_SAYUJ_SYSTEM_PROMPT } from '@/src/lib/ai/prompts';

export async function POST(req: NextRequest) {
  // 🛡️ Sentinel: Rate limiting - 10 requests per minute per IP to prevent cost exhaustion
  const ip = getClientIp(req);
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

    try {
      const session = await createRealtimeSession({
        model: safeModel,
        voice: safeVoice,
        instructions: cleanInstructions,
      });

      return NextResponse.json(session);
    } catch (error: any) {
      console.error('Error creating voice session:', error);
      return NextResponse.json(
        {
          error: 'Failed to create voice session',
          details: error.message || String(error)
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error processing voice session request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
