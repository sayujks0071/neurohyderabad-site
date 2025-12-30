import { NextRequest, NextResponse } from 'next/server';
import { generateInsights, type AnalyticsData } from '@/src/lib/ai/analytics';

/**
 * AI-Powered Analytics Insights API
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const analyticsData: AnalyticsData = body;

    // Validate required fields
    if (typeof analyticsData.pageViews !== 'number' || 
        typeof analyticsData.conversions !== 'number') {
      return NextResponse.json(
        { error: 'Invalid analytics data format' },
        { status: 400 }
      );
    }

    const insights = await generateInsights(analyticsData);

    return NextResponse.json({
      success: true,
      insights,
    });

  } catch (error) {
    console.error('AI analytics API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate insights',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

