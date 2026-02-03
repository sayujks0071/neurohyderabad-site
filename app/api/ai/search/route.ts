import { generateObject, jsonSchema } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/src/lib/blog';
import { getTextModel, hasAIConfig } from '@/src/lib/ai/gateway';
import { SEARCH_INDEX } from '@/src/data/searchIndex';
import { rateLimit } from '@/src/lib/rate-limit';

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
  let allPosts: Awaited<ReturnType<typeof getAllBlogPosts>> = [];

  const buildFallbackResults = () => {
    const queryLower = query.toLowerCase();

    // Search blog posts
    const blogResults = allPosts
      .map(post => {
        const searchText = `${post.title} ${post.excerpt} ${post.category} ${post.tags?.join(' ')} ${post.description}`.toLowerCase();
        const score = (searchText.match(new RegExp(queryLower.split(' ').join('|'), 'g')) || []).length;
        return {
          slug: `/blog/${post.slug}`,
          title: post.title,
          description: post.excerpt || post.description,
          category: post.category || 'Blog',
          score
        };
      })
      .filter(item => item.score > 0);

    // Search static index
    const staticResults = SEARCH_INDEX
      .map(item => {
        const searchText = `${item.title} ${item.description} ${item.category} ${item.tags?.join(' ')}`.toLowerCase();
        const score = (searchText.match(new RegExp(queryLower.split(' ').join('|'), 'g')) || []).length;
        return {
          slug: item.href,
          title: item.title,
          description: item.description,
          category: item.category,
          score
        };
      })
      .filter(item => item.score > 0);

    return [...blogResults, ...staticResults]
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => ({
        href: item.slug,
        title: item.title,
        description: item.description,
        category: item.category,
      }));
  };

  try {
    const body = await request.json();
    ({ query, limit = 10 } = body);

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    // Get all blog posts
    allPosts = await getAllBlogPosts();
    
    // Create a summary of available content for semantic search
    const blogSummary = allPosts.map(post => ({
      id: `/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt || post.description || '',
      category: post.category || 'Blog',
      tags: post.tags || [],
    }));

    const staticSummary = SEARCH_INDEX.map(item => ({
      id: item.href,
      title: item.title,
      description: item.description,
      category: item.category,
      tags: item.tags || [],
    }));

    const combinedSummary = [...blogSummary, ...staticSummary];

    if (!hasAIConfig()) {
      const results = buildFallbackResults();
      return NextResponse.json({
        results,
        query,
        count: results.length,
      });
    }

    // Use AI SDK for semantic search
    const { object } = await generateObject({
      model: getTextModel(),
      schema: jsonSchema({
        type: 'object',
        properties: {
          ids: { type: 'array', items: { type: 'string' }, description: 'List of relevant content IDs (URLs)' },
        },
        required: ['ids'],
        additionalProperties: false,
      }),
      prompt: `Given the user's search query, find the most relevant content from the list below. Consider semantic meaning, not just keyword matching.
For example, if the user searches for "headache", include content about "migraine" or "brain tumor symptoms".

User Query: "${query}"

Available Content:
${JSON.stringify(combinedSummary, null, 2)}

Return ONLY JSON with an "ids" array containing the IDs (URLs) of the ${limit} most relevant items, ordered by relevance.`,
      temperature: 0.2, // Lower temperature for more consistent search results
    });

    type SearchResult = { ids: string[] };
    const result = object as SearchResult;
    const relevantIds = (result?.ids || [])
      .filter((id) => typeof id === 'string' && id.length > 0)
      .slice(0, limit);

    if (relevantIds.length === 0) {
      const fallbackResults = buildFallbackResults();
      return NextResponse.json({
        results: fallbackResults,
        query,
        count: fallbackResults.length,
      });
    }

    // Get full details for relevant IDs
    // We map back from the combined list to ensure we have all fields
    const results = relevantIds
      .map(id => {
        // Check blog posts
        const blogPost = allPosts.find(p => `/blog/${p.slug}` === id);
        if (blogPost) {
          return {
            href: `/blog/${blogPost.slug}`,
            title: blogPost.title,
            description: blogPost.excerpt || blogPost.description,
            category: blogPost.category || 'Blog',
            tags: blogPost.tags,
            relevanceScore: relevantIds.indexOf(id) + 1,
          };
        }
        // Check static index
        const staticItem = SEARCH_INDEX.find(item => item.href === id);
        if (staticItem) {
          return {
            href: staticItem.href,
            title: staticItem.title,
            description: staticItem.description,
            category: staticItem.category,
            tags: staticItem.tags,
            relevanceScore: relevantIds.indexOf(id) + 1,
          };
        }
        return null;
      })
      .filter(item => item !== null);

    if (results.length === 0) {
      const fallbackResults = buildFallbackResults();
      return NextResponse.json({
        results: fallbackResults,
        query,
        count: fallbackResults.length,
      });
    }

    return NextResponse.json({
      results,
      query,
      count: results.length,
    });

  } catch (error) {
    console.error('Error performing AI search:', error);
    if (!query) {
      return NextResponse.json(
        { error: 'Failed to perform search' },
        { status: 500 }
      );
    }

    if (allPosts.length === 0) {
      // Try to load posts if not loaded (though they should be)
      try {
        allPosts = await getAllBlogPosts();
      } catch (e) {
        console.error('Failed to load blog posts for fallback:', e);
      }
    }

    const results = buildFallbackResults();
    return NextResponse.json({
      results,
      query,
      count: results.length,
    });
  }
}
