import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/src/lib/rate-limit';
import { analyzeSymptoms } from '@/src/lib/ai/symptoms';

/**
 * Smart Symptom Analyzer API using Vercel AI SDK
 * 
 * Analyzes symptoms and provides preliminary guidance (not diagnosis)
 */
export async function POST(request: NextRequest) {
  // 🛡️ Rate Limiting: 5 requests per minute per IP (strict)
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const limit = rateLimit(ip, 5, 60 * 1000);

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

  try {
    const body = await request.json();
    const { symptoms, age, gender, duration } = body;

    if (!symptoms) {
      return NextResponse.json(
        { error: 'Symptoms are required' },
        { status: 400 }
      );
    }

    const result = await analyzeSymptoms(symptoms, age, gender, duration);
    return NextResponse.json(result);

  } catch (error) {
    console.error('Error analyzing symptoms:', error);
    return NextResponse.json(
      { error: 'Failed to analyze symptoms' },
      { status: 500 }
    );
  }
}
