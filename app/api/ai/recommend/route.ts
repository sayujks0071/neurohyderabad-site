import { generateObject, jsonSchema } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/src/lib/blog';
import { getTextModel, hasAIConfig } from '@/src/lib/ai/gateway';

/**
 * Content Recommendation API using Vercel AI SDK
 * 
 * Recommends relevant blog posts/articles based on user query or current content
 */
export async function POST(request: NextRequest) {
  let query = '';
  let currentSlug: string | undefined;
  let limit = 5;
  let availablePosts: Awaited<ReturnType<typeof getAllBlogPosts>> = [];

  const getFallbackSlugs = () => {
    const queryLower = (query || '').toLowerCase();
    if (!queryLower) {
      return availablePosts.slice(0, limit).map((post) => post.slug);
    }
    return availablePosts
      .filter(post => {
        const searchText = `${post.title} ${post.excerpt} ${post.category} ${post.tags?.join(' ')}`.toLowerCase();
        return searchText.includes(queryLower);
      })
      .slice(0, limit)
      .map(post => post.slug);
  };

  try {
    const body = await request.json();
    ({ query, currentSlug, limit = 5 } = body);

    if (!query && !currentSlug) {
      return NextResponse.json(
        { error: 'Query or currentSlug is required' },
        { status: 400 }
      );
    }

    // Get all blog posts
    const allPosts = await getAllBlogPosts();
    
    // Filter out current post if provided
    availablePosts = currentSlug 
      ? allPosts.filter(post => post.slug !== currentSlug)
      : allPosts;

    if (!hasAIConfig()) {
      const fallbackSlugs = getFallbackSlugs();
      const fallbackPosts = availablePosts
        .filter(post => fallbackSlugs.includes(post.slug))
        .slice(0, limit)
        .map(post => ({
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          category: post.category,
          tags: post.tags,
          publishedAt: post.publishedAt,
        }));

      return NextResponse.json({
        recommendations: fallbackPosts,
        count: fallbackPosts.length,
      });
    }

    // Create a summary of available posts for the AI
    const postsSummary = availablePosts.slice(0, 20).map(post => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt || '',
      category: post.category || '',
      tags: post.tags || [],
    }));

    // Use AI SDK to find relevant posts
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
      prompt: `Given the following user query or current article context, recommend the most relevant blog posts from the list below.

${query ? `User Query: ${query}` : `Current Article Slug: ${currentSlug}`}

Available Blog Posts:
${JSON.stringify(postsSummary, null, 2)}

Return ONLY JSON with a "slugs" array (e.g., {"slugs": ["slug1", "slug2", "slug3"]}) for the ${limit} most relevant posts. Do not include any other text.`,
      temperature: 0.3,
    });

    type RecommendationResult = { slugs: string[] };
    const result = object as RecommendationResult;
    let recommendedSlugs = (result?.slugs || [])
      .filter((slug) => typeof slug === 'string' && slug.length > 0)
      .slice(0, limit);
    if (recommendedSlugs.length === 0) {
      recommendedSlugs = getFallbackSlugs();
    }

    // Get full post details for recommended slugs
    let recommendedPosts = availablePosts
      .filter(post => recommendedSlugs.includes(post.slug))
      .slice(0, limit)
      .map(post => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        tags: post.tags,
        publishedAt: post.publishedAt,
      }));
    if (recommendedPosts.length === 0) {
      const fallbackSlugs = getFallbackSlugs();
      recommendedPosts = availablePosts
        .filter(post => fallbackSlugs.includes(post.slug))
        .slice(0, limit)
        .map(post => ({
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          category: post.category,
          tags: post.tags,
          publishedAt: post.publishedAt,
        }));
    }

    return NextResponse.json({
      recommendations: recommendedPosts,
      count: recommendedPosts.length,
    });

  } catch (error) {
    console.error('Error generating recommendations:', error);
    if (!availablePosts.length) {
      return NextResponse.json(
        { error: 'Failed to generate recommendations' },
        { status: 500 }
      );
    }

    const fallbackSlugs = getFallbackSlugs();
    const fallbackPosts = availablePosts
      .filter(post => fallbackSlugs.includes(post.slug))
      .slice(0, limit)
      .map(post => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        tags: post.tags,
        publishedAt: post.publishedAt,
      }));

    return NextResponse.json({
      recommendations: fallbackPosts,
      count: fallbackPosts.length,
    });
  }
}
