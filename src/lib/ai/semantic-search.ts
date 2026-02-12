import { generateObject } from 'ai';
import { z } from 'zod';
import { getAllBlogPosts } from '@/src/lib/blog';
import { getTextModel, hasAIConfig } from '@/src/lib/ai/gateway';
import { SEARCH_INDEX } from '@/src/data/searchIndex';

export interface SearchResult {
  href: string;
  title: string;
  description: string;
  category: string;
  tags?: string[];
  type: 'blog' | 'page';
  relevanceScore?: number;
}

/**
 * Perform a semantic search using Vercel AI Gateway (if configured)
 * Falls back to keyword search if AI is unavailable or fails
 */
export async function semanticSearch(query: string, limit: number = 10): Promise<SearchResult[]> {
  let allPosts: Awaited<ReturnType<typeof getAllBlogPosts>> = [];

  try {
    allPosts = await getAllBlogPosts();
  } catch (e) {
    console.error('Failed to load blog posts for search:', e);
  }

  // Helper for keyword fallback
  const performKeywordSearch = () => {
    const queryLower = query.toLowerCase();
    const terms = queryLower.split(' ').filter(t => t.length > 0);

    if (terms.length === 0) return [];

    // Search blog posts
    const blogResults = allPosts
      .map(post => {
        const searchText = `${post.title} ${post.excerpt} ${post.category} ${post.tags?.join(' ')} ${post.description}`.toLowerCase();
        // Simple scoring: count occurrences of terms
        const score = terms.reduce((acc, term) => acc + (searchText.split(term).length - 1), 0);
        return {
          href: `/blog/${post.slug}`,
          title: post.title,
          description: post.excerpt || post.description,
          category: post.category || 'Blog',
          tags: post.tags,
          type: 'blog' as const,
          relevanceScore: score
        };
      })
      .filter(item => item.relevanceScore > 0);

    // Search static index
    const staticResults = SEARCH_INDEX
      .map(item => {
        const searchText = `${item.title} ${item.description} ${item.category} ${item.tags?.join(' ')}`.toLowerCase();
        const score = terms.reduce((acc, term) => acc + (searchText.split(term).length - 1), 0);
        return {
          href: item.href,
          title: item.title,
          description: item.description,
          category: item.category,
          tags: item.tags,
          type: 'page' as const,
          relevanceScore: score
        };
      })
      .filter(item => item.relevanceScore > 0);

    return [...blogResults, ...staticResults]
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);
  };

  if (!hasAIConfig()) {
    return performKeywordSearch();
  }

  try {
    // Create a summary of available content for semantic search
    // Truncate description to save tokens
    const blogSummary = allPosts.map(post => ({
      id: `/blog/${post.slug}`,
      title: post.title,
      description: (post.excerpt || post.description || '').substring(0, 300),
      category: post.category || 'Blog',
    }));

    const staticSummary = SEARCH_INDEX.map(item => ({
      id: item.href,
      title: item.title,
      description: (item.description || '').substring(0, 300),
      category: item.category,
    }));

    // Limit to top 50 items to fit in context window
    // Prioritize static pages + recent blog posts
    const combinedSummary = [...staticSummary, ...blogSummary].slice(0, 50);

    // Use AI SDK for semantic search
    const { object } = await generateObject({
      model: getTextModel(),
      schema: z.object({
        ids: z.array(z.string()).describe('List of relevant content IDs (URLs), ordered by relevance'),
      }),
      prompt: `Given the user's search query, find the most relevant content from the list below. Consider semantic meaning, not just keyword matching.
For example, if the user searches for "headache", include content about "migraine" or "brain tumor symptoms".

User Query: "${query}"

Available Content (Top 50 Candidates):
${JSON.stringify(combinedSummary, null, 2)}

Return ONLY a JSON object with an "ids" array containing the IDs (URLs) of the ${limit} most relevant items.`,
      temperature: 0.2, // Low temperature for consistent results
    });

    const relevantIds = object.ids
      .filter((id) => typeof id === 'string' && id.length > 0)
      .slice(0, limit);

    if (relevantIds.length === 0) {
      return performKeywordSearch();
    }

    // Map back to full objects
    const results = relevantIds
      .map((id, index) => {
        // Check blog posts
        const blogPost = allPosts.find(p => `/blog/${p.slug}` === id);
        if (blogPost) {
          return {
            href: `/blog/${blogPost.slug}`,
            title: blogPost.title,
            description: blogPost.excerpt || blogPost.description,
            category: blogPost.category || 'Blog',
            tags: blogPost.tags,
            type: 'blog' as const,
            relevanceScore: relevantIds.length - index, // Simple score based on rank
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
            type: 'page' as const,
            relevanceScore: relevantIds.length - index,
          };
        }
        return null;
      })
      .filter((item): item is SearchResult => item !== null);

    if (results.length === 0) {
      return performKeywordSearch();
    }

    return results;

  } catch (error) {
    console.error('Semantic search failed, falling back to keyword search:', error);
    return performKeywordSearch();
  }
}
