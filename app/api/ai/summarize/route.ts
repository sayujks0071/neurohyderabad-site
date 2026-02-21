import { streamText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { getTextModel, hasAIConfig } from '@/src/lib/ai/gateway';
import { rateLimit } from '@/src/lib/rate-limit';
import { scrapeContent } from '@/src/lib/scraping';

// Required for scraping (if jsdom is used indirectly, though scrapeContent handles it)
export const runtime = 'nodejs';

/**
 * Article Summarization API using Vercel AI SDK
 * 
 * Summarizes long articles/blog posts for better readability
 * Features:
 * - Streaming response for better UX
 * - Rate limiting (10 req/min)
 * - Vercel AI Gateway integration
 * - Cached URL Content Extraction
 */
export async function POST(request: NextRequest) {
  // 🛡️ Rate Limiting: 10 requests per minute per IP
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const limit = rateLimit(ip, 10, 60 * 1000);

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

  let content = '';
  let maxLength = 200;

  try {
    const body = await request.json();
    maxLength = body.maxLength ? Number(body.maxLength) : 200;

    // Handle URL summarization
    if (body.url) {
      try {
        content = await scrapeContent(body.url);
      } catch (e) {
        console.error('Error fetching URL:', e);
        return NextResponse.json(
          { error: `Failed to fetch content from URL: ${e instanceof Error ? e.message : String(e)}` },
          { status: 400 }
        );
      }
    } else {
      // Support both prompt (useCompletion default) and content (legacy)
      content = body.prompt || body.content || '';
    }

    if (!content) {
      return NextResponse.json(
        { error: 'Content or URL is required' },
        { status: 400 }
      );
    }

    if (!hasAIConfig()) {
      // Fallback for when AI is not configured
      // Return plain text so useCompletion renders it correctly
      const summary = buildFallbackSummary(content, maxLength);
      return new Response(summary);
    }

    const result = streamText({
      model: getTextModel(),
      prompt: `Summarize the following medical article in approximately ${maxLength} words. Focus on key points, main findings, and actionable information. Keep it concise and easy to understand:

${content}

Summary:`,
      temperature: 0.3, // Lower temperature for more factual summaries
    });

    return result.toTextStreamResponse();

  } catch (error) {
    console.error('Error generating summary:', error);
    if (content) {
      // Use fallback summary on error
      const summary = buildFallbackSummary(content, maxLength);
      return new Response(summary);
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
