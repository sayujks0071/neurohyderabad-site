'use client';

import { useState } from 'react';
import { useCompletion } from '@ai-sdk/react';

interface ArticleSummarizerProps {
  content: string;
  maxLength?: number;
  className?: string;
}

/**
 * Article Summarizer Component using Vercel AI SDK
 * 
 * Summarizes long articles for better readability
 * Features:
 * - Streaming response
 * - Vercel AI Gateway integration
 */
export default function ArticleSummarizer({ 
  content, 
  maxLength = 200,
  className = '' 
}: ArticleSummarizerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const { completion, complete, isLoading, error } = useCompletion({
    api: '/api/ai/summarize',
    onError: (err) => {
      console.error('Error generating summary:', err);
      setLocalError(err.message || 'Failed to generate summary.');
    },
  });

  const handleSummarize = async () => {
    setLocalError(null);
    try {
      // Pass content as prompt, and maxLength in body
      // We explicitly set isExpanded to true to show the stream
      setIsExpanded(true);
      await complete(content, {
        body: { maxLength }
      });
    } catch (e) {
      // Error is handled by onError callback
    }
  };

  // Logic to show button vs content
  // If we have completion (even partial) or loading, show content area
  // If error, show error but maybe keep button?
  // If nothing happening, show button.
  const showContent = completion.length > 0 || isLoading || (localError || error);

  if (!showContent) {
    return (
      <div className={className}>
        <button
          onClick={handleSummarize}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <span>📄</span>
          <span>Summarize Article</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`${className} bg-blue-50 border border-blue-200 rounded-lg p-4 animate-in fade-in duration-300`}>
      {isLoading && completion.length === 0 && (
        <div className="flex items-center gap-2 mb-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-sm text-gray-600">Generating summary...</span>
        </div>
      )}

      {(localError || error) && (
        <div className="text-red-600 text-sm mb-2">
          {localError || error?.message}
        </div>
      )}

      {completion && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-blue-800 flex items-center gap-2">
              Article Summary
              {isLoading && <span className="animate-pulse text-blue-600">●</span>}
            </h3>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              {isExpanded ? 'Hide' : 'Show'}
            </button>
          </div>
          
          {isExpanded && (
            <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
              {completion}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
