import { NextRequest, NextResponse } from 'next/server';
import { predictOptimalSlots, predictNoShow, type SchedulingRequest } from '@/src/lib/ai/predictive-scheduling';

/**
 * AI-Powered Predictive Scheduling API
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      preferredDates,
      preferredTimes,
      urgencyLevel,
      appointmentType,
      condition,
      patientHistory,
    } = body;

    if (!preferredDates || preferredDates.length === 0) {
      return NextResponse.json(
        { error: 'Preferred dates are required' },
        { status: 400 }
      );
    }

    if (!urgencyLevel || !appointmentType) {
      return NextResponse.json(
        { error: 'Urgency level and appointment type are required' },
        { status: 400 }
      );
    }

    const schedulingRequest: SchedulingRequest = {
      preferredDates,
      preferredTimes: preferredTimes || [],
      urgencyLevel,
      appointmentType,
      condition,
      patientHistory,
    };

    // Get scheduling predictions
    const predictions = await predictOptimalSlots(schedulingRequest);

    // Predict no-show if patient history provided
    let noShowPrediction = null;
    if (patientHistory) {
      noShowPrediction = await predictNoShow(patientHistory);
    }

    return NextResponse.json({
      success: true,
      predictions,
      noShowPrediction,
    });

  } catch (error) {
    console.error('Predictive scheduling API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate scheduling predictions',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

