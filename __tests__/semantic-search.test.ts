import { describe, it, expect, vi, beforeEach } from 'vitest';
import { semanticSearch } from '@/src/lib/ai/semantic-search';
import * as gateway from '@/src/lib/ai/gateway';
import * as blog from '@/src/lib/blog';
import * as aiSdk from 'ai';

vi.mock('next/cache', () => ({
  unstable_cache: (fn: any) => fn,
}));

// Mock dependencies
vi.mock('@/src/lib/ai/gateway', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/src/lib/ai/gateway')>();
  return {
    ...actual,
    hasAIConfig: vi.fn(),
    getTextModel: vi.fn(),
  };
});

vi.mock('@/src/lib/blog', () => ({
  getAllBlogPosts: vi.fn(),
}));

vi.mock('ai', () => ({
  generateObject: vi.fn(),
}));

vi.mock('@/src/data/searchIndex', () => ({
  SEARCH_INDEX: [
    { href: '/page1', title: 'Page 1', description: 'Description 1', category: 'General', tags: ['tag1'] },
    { href: '/page2', title: 'Page 2', description: 'Description 2', category: 'General', tags: ['tag2'] },
  ],
}));

describe('semanticSearch', () => {
  const mockBlogPosts = [
    { slug: 'post1', title: 'Post 1', excerpt: 'Excerpt 1', category: 'Blog', tags: ['blog'] },
    { slug: 'post2', title: 'Post 2', excerpt: 'Excerpt 2', category: 'Blog', tags: ['blog'] },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (blog.getAllBlogPosts as any).mockResolvedValue(mockBlogPosts);
  });

  it('should use keyword fallback when AI is not configured', async () => {
    (gateway.hasAIConfig as any).mockReturnValue(false);

    const results = await semanticSearch('Post 1', 5);

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].title).toBe('Post 1');
    expect(results[0].type).toBe('blog');
    expect(gateway.getTextModel).not.toHaveBeenCalled();
  });

  it('should use AI search when configured', async () => {
    (gateway.hasAIConfig as any).mockReturnValue(true);
    (gateway.getTextModel as any).mockReturnValue({});
    (aiSdk.generateObject as any).mockResolvedValue({
      object: { ids: ['/blog/post2'] }
    });

    const results = await semanticSearch('Post 2', 5);

    expect(results).toHaveLength(1);
    expect(results[0].title).toBe('Post 2');
    expect(results[0].type).toBe('blog');
    expect(aiSdk.generateObject).toHaveBeenCalled();
  });

  it('should fallback to keyword search if AI search returns no results', async () => {
    (gateway.hasAIConfig as any).mockReturnValue(true);
    (gateway.getTextModel as any).mockReturnValue({});
    (aiSdk.generateObject as any).mockResolvedValue({
      object: { ids: [] } // Empty result from AI
    });

    const results = await semanticSearch('Page 1', 5);

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].title).toBe('Page 1');
    expect(results[0].type).toBe('page');
    // It tried AI but fell back
    expect(aiSdk.generateObject).toHaveBeenCalled();
  });

  it('should handle AI errors gracefully and fallback', async () => {
    (gateway.hasAIConfig as any).mockReturnValue(true);
    (gateway.getTextModel as any).mockReturnValue({});
    (aiSdk.generateObject as any).mockRejectedValue(new Error('AI Error'));

    const results = await semanticSearch('Page 2', 5);

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].title).toBe('Page 2');
    expect(results[0].type).toBe('page');
  });
});
