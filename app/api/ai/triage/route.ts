import { NextRequest, NextResponse } from 'next/server';
import { analyzeTriage, quickTriageCheck, type TriageRequest } from '@/src/lib/ai/triage';
import { rateLimit } from '@/src/lib/rate-limit';

/**
 * AI-Powered Patient Triage API
 * 
 * Analyzes patient symptoms and provides urgency assessment
 */
export async function POST(request: NextRequest) {
  // 🛡️ Rate Limiting: 5 requests per minute per IP
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
    const { symptoms, description, age, medicalHistory, currentMedications } = body;

    if (!description && (!symptoms || symptoms.length === 0)) {
      return NextResponse.json(
        { error: 'Description or symptoms are required' },
        { status: 400 }
      );
    }

    const triageRequest: TriageRequest = {
      symptoms: symptoms || [],
      description: description || '',
      age,
      medicalHistory,
      currentMedications,
    };

    // Perform triage analysis
    const result = await analyzeTriage(triageRequest, { headers: { 'X-Forwarded-For': ip } });

    return NextResponse.json({
      success: true,
      triage: result,
    });

  } catch (error) {
    console.error('Triage API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to analyze triage',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * Quick emergency check endpoint
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const description = searchParams.get('description');

    if (!description) {
      return NextResponse.json(
        { error: 'Description parameter is required' },
        { status: 400 }
      );
    }

    const isEmergency = quickTriageCheck(description) === 'emergency';

    return NextResponse.json({
      isEmergency,
      message: isEmergency 
        ? 'Emergency detected. Please seek immediate medical attention.'
        : 'No immediate emergency detected. Continue with standard triage.',
    });

  } catch (error) {
    console.error('Quick triage check error:', error);
    return NextResponse.json(
      { error: 'Failed to perform quick check' },
      { status: 500 }
    );
  }
}

