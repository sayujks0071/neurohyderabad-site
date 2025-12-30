import { NextRequest, NextResponse } from 'next/server';
import { personalizeContent, type PersonalizationContext } from '@/src/lib/ai/personalization';

/**
 * AI-Powered Content Personalization API
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      condition,
      location,
      language,
      deviceType,
      previousPages,
      searchQuery,
      urgencyLevel,
      age,
      referralSource,
    } = body;

    const context: PersonalizationContext = {
      condition,
      location,
      language,
      deviceType,
      previousPages,
      searchQuery,
      urgencyLevel,
      age,
      referralSource,
    };

    const personalizedContent = await personalizeContent(context);

    return NextResponse.json({
      success: true,
      personalization: personalizedContent,
    });

  } catch (error) {
    console.error('Personalization API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to personalize content',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

