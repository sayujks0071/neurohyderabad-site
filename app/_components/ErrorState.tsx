import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  /** Error title */
  title?: string;
  /** Error description */
  message?: string;
  /** Retry callback */
  onRetry?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Compact layout for inline errors */
  compact?: boolean;
}

/**
 * Error state component for failed data loads or server errors.
 * Uses design tokens for consistent styling.
 */
const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We couldn\'t load this content. Please try again or contact our team if the problem persists.',
  onRetry,
  className = '',
  compact = false,
}) => {
  if (compact) {
    return (
      <div
        className={`flex items-center gap-3 p-[var(--space-4)] rounded-[var(--radius-md)] bg-[var(--color-error-light)] border border-[var(--color-error-light)] ${className}`}
        role="alert"
      >
        <AlertTriangle className="h-5 w-5 text-[var(--color-error)] shrink-0" aria-hidden="true" />
        <p className="text-sm text-[var(--color-error)] font-medium">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="ml-auto shrink-0 text-sm text-[var(--color-error)] hover:text-[var(--color-error-800)] underline focus-ring"
            type="button"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center text-center py-[var(--space-16)] px-[var(--space-4)] ${className}`}
      role="alert"
    >
      <div className="w-16 h-16 rounded-full bg-[var(--color-error-light)] flex items-center justify-center mb-[var(--space-6)]">
        <AlertTriangle className="h-8 w-8 text-[var(--color-error)]" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
        {title}
      </h3>
      <p className="text-[var(--color-text-secondary)] max-w-md mb-[var(--space-6)]">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-gradient-primary inline-flex items-center gap-2 px-6 py-3 focus-ring"
          type="button"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
