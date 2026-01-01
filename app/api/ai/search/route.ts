import { generateObject, jsonSchema } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/src/lib/blog';
import { getTextModel, hasAIConfig } from '@/src/lib/ai/gateway';

/**
 * AI-Powered Search API using Vercel AI SDK
 * 
 * Semantic search for blog posts and content
 */
export async function POST(request: NextRequest) {
  let query = '';
  let limit = 10;
  let allPosts: Awaited<ReturnType<typeof getAllBlogPosts>> = [];
  const buildFallbackResults = () => {
    const queryLower = query.toLowerCase();
    const relevantSlugs = allPosts
      .map(post => {
        const searchText = `${post.title} ${post.excerpt} ${post.category} ${post.tags?.join(' ')} ${post.description}`.toLowerCase();
        const score = (searchText.match(new RegExp(queryLower.split(' ').join('|'), 'g')) || []).length;
        return { slug: post.slug, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.slug);

    return allPosts
      .filter(post => relevantSlugs.includes(post.slug))
      .slice(0, limit)
      .map(post => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        tags: post.tags,
        publishedAt: post.publishedAt,
        relevanceScore: relevantSlugs.indexOf(post.slug) + 1,
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
    
    // Create a summary of available posts for semantic search
    const postsSummary = allPosts.map(post => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt || '',
      category: post.category || '',
      tags: post.tags || [],
      content: post.description || '',
    }));

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
          slugs: { type: 'array', items: { type: 'string' } },
        },
        required: ['slugs'],
        additionalProperties: false,
      }),
      prompt: `Given the user's search query, find the most relevant blog posts from the list below. Consider semantic meaning, not just keyword matching.

User Query: "${query}"

Available Blog Posts:
${JSON.stringify(postsSummary, null, 2)}

Return ONLY JSON with a "slugs" array (e.g., {"slugs": ["slug1", "slug2", "slug3"]}) for the ${limit} most relevant posts, ordered by relevance. Do not include any other text.`,
      temperature: 0.2, // Lower temperature for more consistent search results
    });

    let relevantSlugs = (object?.slugs || [])
      .filter((slug) => typeof slug === 'string' && slug.length > 0)
      .slice(0, limit);
    if (relevantSlugs.length === 0) {
      const fallbackResults = buildFallbackResults();
      return NextResponse.json({
        results: fallbackResults,
        query,
        count: fallbackResults.length,
      });
    }

    // Get full post details for relevant slugs
    const results = allPosts
      .filter(post => relevantSlugs.includes(post.slug))
      .slice(0, limit)
      .map(post => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        tags: post.tags,
        publishedAt: post.publishedAt,
        relevanceScore: relevantSlugs.indexOf(post.slug) + 1, // Lower number = more relevant
      }));
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
      allPosts = await getAllBlogPosts();
    }

    const results = buildFallbackResults();
    return NextResponse.json({
      results,
      query,
      count: results.length,
    });
  }
}
