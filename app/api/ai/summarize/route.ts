import { generateText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { getAIClient, getGatewayModel, isAIGatewayConfigured } from '@/src/lib/ai/gateway';

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

    const hasAIConfig = isAIGatewayConfigured() || process.env.OPENAI_API_KEY;
    if (!hasAIConfig) {
      return NextResponse.json(
        { error: 'AI Gateway API key or OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const aiClient = getAIClient();
    const modelName = isAIGatewayConfigured() 
      ? getGatewayModel('gpt-4o-mini')
      : 'gpt-4o-mini';

    // Use AI SDK's generateText for summarization
    const { text } = await generateText({
      model: aiClient(modelName),
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

