'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

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
      <div className={`${className} flex items-center justify-center p-8`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Finding relevant articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className} p-4 bg-red-50 border border-red-200 rounded-lg`}>
        <p className="text-red-800 text-sm">{error}</p>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <h3 className="text-2xl font-bold mb-4 text-blue-800">
        {query ? 'Recommended Articles' : 'You May Also Like'}
      </h3>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            {post.category && (
              <span className="text-xs uppercase text-blue-600 font-semibold">
                {post.category}
              </span>
            )}
            <h4 className="font-semibold text-gray-800 mt-2 mb-2 line-clamp-2">
              {post.title}
            </h4>
            {post.excerpt && (
              <p className="text-sm text-gray-600 line-clamp-3">
                {post.excerpt}
              </p>
            )}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
