import { NextRequest, NextResponse } from 'next/server';
import { generateFollowUpCare, type FollowUpRequest } from '@/src/lib/ai/follow-up-care';

/**
 * AI-Powered Follow-Up Care Recommendations API
 */
export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
    const body = await request.json();
    const {
      procedureType,
      condition,
      daysSinceProcedure,
      currentSymptoms,
      patientConcerns,
      recoveryStage,
      previousFollowUps,
    } = body;

    if (!procedureType || !condition) {
      return NextResponse.json(
        { error: 'Procedure type and condition are required' },
        { status: 400 }
      );
    }

    const followUpRequest: FollowUpRequest = {
      procedureType,
      condition,
      daysSinceProcedure,
      currentSymptoms,
      patientConcerns,
      recoveryStage,
      previousFollowUps,
    };

    const recommendations = await generateFollowUpCare(followUpRequest, { headers: { 'X-Forwarded-For': ip } });

    return NextResponse.json({
      success: true,
      recommendations,
    });

  } catch (error) {
    console.error('Follow-up care API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate follow-up care recommendations',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

