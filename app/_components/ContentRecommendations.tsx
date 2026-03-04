'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Tag } from 'lucide-react';

interface ContentRecommendationsProps {
  query?: string;
  currentSlug?: string;
  limit?: number;
  className?: string;
}

interface RecommendedPost {
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
  publishedAt?: string;
}

/**
 * Content Recommendations Component using Vercel AI SDK
 * 
 * Recommends relevant blog posts based on user query or current content
 */
export default function ContentRecommendations({ 
  query,
  currentSlug,
  limit = 5,
  className = '' 
}: ContentRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<RecommendedPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRecommendations = useCallback(async () => {
    if (!query && !currentSlug) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          currentSlug,
          limit,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to load recommendations');
      }

      const data = await response.json();
      setRecommendations(data.recommendations || []);
    } catch (err) {
      console.error('Error loading recommendations:', err);
      setError('Failed to load recommendations');
    } finally {
      setIsLoading(false);
    }
  }, [query, currentSlug, limit]);

  useEffect(() => {
    loadRecommendations();
  }, [loadRecommendations]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center p-12 ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary-500)] mx-auto mb-3"></div>
          <p className="text-[var(--color-text-secondary)] font-medium">Finding relevant articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    // Fail silently in production or show minimal error
    return null;
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className={`relative bg-[var(--color-surface)]/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${className}`}>
      <div className="flex items-center gap-3 mb-6 border-b border-[var(--color-primary-100)]/50 pb-4">
        <div className="p-2 bg-[var(--color-primary-100)]/50 rounded-lg text-[var(--color-primary-500)]">
          <Sparkles className="w-5 h-5" />
        </div>
        <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
          {query ? 'Recommended Articles' : 'You May Also Like'}
        </h3>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="flex flex-col h-full bg-[var(--color-surface)]/50 border border-[var(--color-primary-50)] rounded-xl p-5 hover:bg-[var(--color-surface)]/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
          >
            {post.category && (
              <span className="text-xs uppercase tracking-wider text-[var(--color-primary-500)] font-bold mb-2">
                {post.category}
              </span>
            )}
            <h4 className="font-bold text-[var(--color-text-primary)] text-lg mb-2 line-clamp-2 group-hover:text-[var(--color-primary-700)] transition-colors">
              {post.title}
            </h4>
            {post.excerpt && (
              <p className="text-sm text-[var(--color-text-secondary)] line-clamp-3 mb-4 flex-grow">
                {post.excerpt}
              </p>
            )}

            <div className="mt-auto pt-4 border-t border-[var(--color-border)]">
              {post.tags && post.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 text-[10px] bg-[var(--color-primary-50)] text-[var(--color-primary-500)] px-2 py-1 rounded-full font-medium border border-[var(--color-primary-100)]"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="flex items-center text-[var(--color-primary-500)] font-medium text-sm group/link">
                Read Article
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/link:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
