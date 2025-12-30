/**
 * API Route: Generate FAQs from Gemini File API
 * POST /api/faq/generate
 */

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const { topic, numQuestions = 10 } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                   (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                   'http://localhost:3000');

    // Call Gemini File API to extract FAQs
    const geminiResponse = await fetch(`${baseUrl}/api/gemini-files/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchType: 'faq',
        query: topic,
        numQuestions: numQuestions
      })
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json().catch(() => ({}));
      throw new Error(`Failed to generate FAQs: ${geminiResponse.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await geminiResponse.json();
    
    // Parse the FAQ answer (should be JSON array)
    let faqs: any[] = [];
    try {
      if (typeof data.answer === 'string') {
        faqs = JSON.parse(data.answer);
      } else if (Array.isArray(data.answer)) {
        faqs = data.answer;
      } else {
        // If not in expected format, create a single FAQ from the answer
        faqs = [{
          question: `About ${topic}`,
          answer: data.answer
        }];
      }
    } catch (parseError) {
      // If parsing fails, create a single FAQ from the answer
      faqs = [{
        question: `About ${topic}`,
        answer: data.answer || 'No information available.'
      }];
    }

    return NextResponse.json({
      success: true,
      faqs: faqs.map((faq: any, index: number) => ({
        id: `faq-${topic.toLowerCase().replace(/\s+/g, '-')}-${index}`,
        question: faq.question || `Question ${index + 1}`,
        answer: faq.answer || faq.content || '',
        category: topic,
        sources: data.sources || []
      })),
      topic,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error generating FAQs:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate FAQs',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'FAQ Generation API',
    version: '1.0.0',
    usage: 'POST with { topic: string, numQuestions?: number }'
  });
}

