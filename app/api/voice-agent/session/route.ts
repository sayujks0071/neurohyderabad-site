import { NextRequest, NextResponse } from 'next/server';
import { isAIGatewayConfigured, getGatewayModel } from '@/src/lib/ai/gateway';

export async function POST(req: NextRequest) {
  try {
    const { instructions, voice = 'alloy', model = 'gpt-4o-realtime-preview' } = await req.json();

    const apiKey = process.env.AI_GATEWAY_API_KEY;

    // Validate API key
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI Gateway API key not configured' },
        { status: 500 }
      );
    }

    if (!isAIGatewayConfigured()) {
      return NextResponse.json(
        { error: 'Vercel AI Gateway is not configured. Please set AI_GATEWAY_API_KEY or deploy on Vercel.' },
        { status: 500 }
      );
    }

    const baseUrl = process.env.AI_GATEWAY_BASE_URL || 'https://ai-gateway.vercel.sh/v1';
    const finalModel = getGatewayModel(model);

    // Create a session via Gateway
    const response = await fetch(`${baseUrl}/realtime/sessions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: finalModel,
        voice,
        instructions,
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
      console.error('Gateway API error:', error);
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
