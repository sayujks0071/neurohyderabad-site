import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/src/lib/blog';

/**
 * Content Recommendation API using Vercel AI SDK
 * 
 * Recommends relevant blog posts/articles based on user query or current content
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, currentSlug, limit = 5 } = body;

    if (!query && !currentSlug) {
      return NextResponse.json(
        { error: 'Query or currentSlug is required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Get all blog posts
    const allPosts = await getAllBlogPosts();
    
    // Filter out current post if provided
    const availablePosts = currentSlug 
      ? allPosts.filter(post => post.slug !== currentSlug)
      : allPosts;

    // Create a summary of available posts for the AI
    const postsSummary = availablePosts.slice(0, 20).map(post => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt || '',
      category: post.category || '',
      tags: post.tags || [],
    }));

    // Use AI SDK to find relevant posts
    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Given the following user query or current article context, recommend the most relevant blog posts from the list below.

${query ? `User Query: ${query}` : `Current Article Slug: ${currentSlug}`}

Available Blog Posts:
${JSON.stringify(postsSummary, null, 2)}

Return ONLY a JSON array of slugs (e.g., ["slug1", "slug2", "slug3"]) for the ${limit} most relevant posts. Do not include any other text.`,
      temperature: 0.3,
    });

    // Parse the AI response
    let recommendedSlugs: string[] = [];
    try {
      // Try to extract JSON array from response
      const jsonMatch = text.match(/\[.*?\]/s);
      if (jsonMatch) {
        recommendedSlugs = JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error('Error parsing AI response:', error);
      // Fallback: use simple keyword matching
      const queryLower = (query || '').toLowerCase();
      recommendedSlugs = availablePosts
        .filter(post => {
          const searchText = `${post.title} ${post.excerpt} ${post.category} ${post.tags?.join(' ')}`.toLowerCase();
          return searchText.includes(queryLower);
        })
        .slice(0, limit)
        .map(post => post.slug);
    }

    // Get full post details for recommended slugs
    const recommendedPosts = availablePosts
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

    return NextResponse.json({
      recommendations: recommendedPosts,
      count: recommendedPosts.length,
    });

  } catch (error) {
    console.error('Error generating recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}

