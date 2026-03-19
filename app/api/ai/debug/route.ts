import { NextResponse } from 'next/server';
import { hasAIConfig, isAIGatewayConfigured } from '@/src/lib/ai/gateway';

// Temporary debug endpoint — remove after fixing chat
export async function GET() {
  const isOpenAIConfigured = Boolean(process.env.OPENAI_API_KEY?.trim());

  return NextResponse.json({
    hasAIConfig: hasAIConfig(),
    isAIGatewayConfigured: isAIGatewayConfigured(),
    isOpenAIConfigured,
    envChecks: {
      AI_GATEWAY_API_KEY: process.env.AI_GATEWAY_API_KEY ? `set (${process.env.AI_GATEWAY_API_KEY.length} chars)` : 'NOT SET',
      OPENAI_API_KEY: process.env.OPENAI_API_KEY ? `set (${process.env.OPENAI_API_KEY.substring(0, 8)}...)` : 'NOT SET',
      VERCEL: process.env.VERCEL || 'not set',
    },
  });
}
