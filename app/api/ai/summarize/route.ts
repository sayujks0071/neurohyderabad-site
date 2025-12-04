import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Article Summarization API using Vercel AI SDK
 * 
 * Summarizes long articles/blog posts for better readability
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, maxLength = 200 } = body;

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Use AI SDK's generateText for summarization
    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Summarize the following medical article in approximately ${maxLength} words. Focus on key points, main findings, and actionable information. Keep it concise and easy to understand:

${content}

Summary:`,
      temperature: 0.3, // Lower temperature for more factual summaries
    });

    return NextResponse.json({
      summary: text,
      originalLength: content.length,
      summaryLength: text.length,
    });

  } catch (error) {
    console.error('Error generating summary:', error);
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 }
    );
  }
}

