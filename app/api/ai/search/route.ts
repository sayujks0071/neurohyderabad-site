import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/src/lib/rate-limit';
import { semanticSearch } from '@/src/lib/ai/semantic-search';

/**
 * AI-Powered Search API using Vercel AI SDK
 * 
 * Semantic search for blog posts and content
 */
export async function POST(request: NextRequest) {
  // 🛡️ Rate Limiting: 20 requests per minute per IP (search is frequent)
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const rateLimitResult = rateLimit(ip, 20, 60 * 1000);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.reset.toString(),
        }
      }
    );
  }

  let query = '';
  let limit = 10;

  try {
    const body = await request.json();
    ({ query, limit = 10 } = body);

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    const results = await semanticSearch(query, limit);

    return NextResponse.json({
      results,
      query,
      count: results.length,
    });

  } catch (error) {
    console.error('Error performing AI search:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
}
