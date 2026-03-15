'use client';

import { useState } from 'react';
import { useCompletion } from '@ai-sdk/react';
import { Loader2 } from 'lucide-react';
import { Shimmer } from "@/src/components/ai-elements/shimmer";

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
          className="bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-700)] text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
        >
          <span>📄</span>
          <span>Summarize Article</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`${className} relative bg-[var(--color-surface)]/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 animate-in fade-in duration-300`}>
      {isLoading && completion.length === 0 && (
        <div className="flex items-center gap-2 mb-2">
          <Loader2 className="animate-spin h-5 w-5 text-[var(--color-primary-500)]" />
          <Shimmer as="span" className="text-sm text-[var(--color-text-secondary)]">Generating summary...</Shimmer>
        </div>
      )}

      {(localError || error) && (
        <div className="p-4 bg-[var(--color-error-light)] border border-[var(--color-error-light)] rounded-lg text-[var(--color-error-700)] text-sm mb-2">
          {localError || error?.message}
        </div>
      )}

      {completion && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[var(--color-primary-800)] flex items-center gap-2 text-lg">
              Article Summary
              {isLoading && <Shimmer as="span" className="text-[var(--color-primary-500)] text-xs bg-[var(--color-primary-100)] px-2 py-0.5 rounded-full">Generating...</Shimmer>}
            </h3>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] font-medium py-2 px-4 rounded-xl transition-all duration-300 hover:border-[var(--color-border)] hover:bg-[var(--color-background)] hover:text-[var(--color-text-primary)] text-sm"
            >
              {isExpanded ? 'Hide' : 'Show'}
            </button>
          </div>
          
          {isExpanded && (
            <div className="text-[var(--color-text-secondary)] text-sm leading-relaxed whitespace-pre-wrap bg-[var(--color-surface)]/50 p-4 rounded-xl border border-white/40 shadow-inner">
              {completion}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
