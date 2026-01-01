import { generateText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { getTextModel, hasAIConfig } from '@/src/lib/ai/gateway';

/**
 * Article Summarization API using Vercel AI SDK
 * 
 * Summarizes long articles/blog posts for better readability
 */
export async function POST(request: NextRequest) {
  let content = '';
  let maxLength = 200;

  try {
    const body = await request.json();
    ({ content, maxLength = 200 } = body);
    maxLength = Number.isFinite(Number(maxLength)) ? Number(maxLength) : 200;

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    if (!hasAIConfig()) {
      const summary = buildFallbackSummary(content, maxLength);
      return NextResponse.json({
        summary,
        originalLength: content.length,
        summaryLength: summary.length,
      });
    }

    const { text } = await generateText({
      model: getTextModel(),
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
    if (content) {
      const summary = buildFallbackSummary(content, maxLength);
      return NextResponse.json({
        summary,
        originalLength: content.length,
        summaryLength: summary.length,
      });
    }
    return NextResponse.json(
      { 
        error: 'Failed to generate summary',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function buildFallbackSummary(content: string, maxLength: number) {
  const words = content.trim().split(/\s+/);
  return words.slice(0, Math.max(1, maxLength)).join(' ');
}
