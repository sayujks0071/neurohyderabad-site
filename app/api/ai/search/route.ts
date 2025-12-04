import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/src/lib/blog';

/**
 * AI-Powered Search API using Vercel AI SDK
 * 
 * Semantic search for blog posts and content
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, limit = 10 } = body;

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
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
    
    // Create a summary of available posts for semantic search
    const postsSummary = allPosts.map(post => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt || '',
      category: post.category || '',
      tags: post.tags || [],
      content: post.description || '',
    }));

    // Use AI SDK for semantic search
    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Given the user's search query, find the most relevant blog posts from the list below. Consider semantic meaning, not just keyword matching.

User Query: "${query}"

Available Blog Posts:
${JSON.stringify(postsSummary, null, 2)}

Return ONLY a JSON array of slugs (e.g., ["slug1", "slug2", "slug3"]) for the ${limit} most relevant posts, ordered by relevance. Do not include any other text.`,
      maxTokens: 300,
      temperature: 0.2, // Lower temperature for more consistent search results
    });

    // Parse the AI response
    let relevantSlugs: string[] = [];
    try {
      const jsonMatch = text.match(/\[.*?\]/s);
      if (jsonMatch) {
        relevantSlugs = JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error('Error parsing AI search response:', error);
      // Fallback: simple keyword matching
      const queryLower = query.toLowerCase();
      relevantSlugs = allPosts
        .map(post => {
          const searchText = `${post.title} ${post.excerpt} ${post.category} ${post.tags?.join(' ')} ${post.description}`.toLowerCase();
          const score = (searchText.match(new RegExp(queryLower.split(' ').join('|'), 'g')) || []).length;
          return { slug: post.slug, score };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.slug);
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

