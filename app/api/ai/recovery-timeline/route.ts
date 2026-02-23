import { NextRequest, NextResponse } from 'next/server';
import { generateRecoveryPlan, type RecoveryPredictorRequest } from '@/src/lib/recovery-predictor';

/**
 * AI-Powered Recovery Timeline API
 * 
 * POST /api/ai/recovery-timeline
 */
export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
    const body: RecoveryPredictorRequest = await request.json();
    
    if (!body.surgeryType) {
      return NextResponse.json(
        { error: 'Surgery type is required' },
        { status: 400 }
      );
    }

    const plan = await generateRecoveryPlan(body, { headers: { 'X-Forwarded-For': ip } });

    return NextResponse.json({
      plan,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in recovery timeline API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
