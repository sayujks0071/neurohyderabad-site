'use client';

import { useState } from 'react';

interface ArticleSummarizerProps {
  content: string;
  maxLength?: number;
  className?: string;
}

/**
 * Article Summarizer Component using Vercel AI SDK
 * 
 * Summarizes long articles for better readability
 */
export default function ArticleSummarizer({ 
  content, 
  maxLength = 200,
  className = '' 
}: ArticleSummarizerProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSummarize = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          maxLength,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || errorData.details || `Server error: ${response.status}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();
      if (!data.summary) {
        throw new Error('No summary returned from server');
      }
      setSummary(data.summary);
      setIsExpanded(true);
    } catch (err) {
      console.error('Error generating summary:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate summary. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!summary && !isLoading && !error) {
    return (
      <div className={className}>
        <button
          onClick={handleSummarize}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          <span>📄</span>
          <span>Summarize Article</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`${className} bg-blue-50 border border-blue-200 rounded-lg p-4`}>
      {isLoading && (
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-sm text-gray-600">Generating summary...</span>
        </div>
      )}

      {error && (
        <div className="text-red-600 text-sm">
          {error}
        </div>
      )}

      {summary && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-blue-800">Article Summary</h3>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              {isExpanded ? 'Hide' : 'Show'}
            </button>
          </div>
          
          {isExpanded && (
            <div className="text-gray-700 text-sm leading-relaxed">
              {summary}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

