import React from 'react';

interface SkeletonProps {
  /** Width class (Tailwind or CSS) */
  width?: string;
  /** Height class (Tailwind or CSS) */
  height?: string;
  /** Shape variant */
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  /** Additional CSS classes */
  className?: string;
  /** Number of text lines to render */
  lines?: number;
}

/**
 * Skeleton loading placeholder component.
 * Uses the `.skeleton` animation defined in globals.css design tokens.
 */
const Skeleton: React.FC<SkeletonProps> = ({
  width = 'w-full',
  height = 'h-4',
  variant = 'text',
  className = '',
  lines = 1,
}) => {
  const variantStyles = {
    text: 'rounded-[var(--radius-sm)]',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-[var(--radius-lg)]',
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`flex flex-col gap-2 ${className}`} role="status" aria-label="Loading content">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`skeleton ${variantStyles.text} ${height} ${
              i === lines - 1 ? 'w-3/4' : width
            }`}
          />
        ))}
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div
      className={`skeleton ${variantStyles[variant]} ${width} ${height} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

/* ── Preset Skeleton Patterns ── */

export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`surface-card p-[var(--space-6)] ${className}`} role="status" aria-label="Loading card">
      <Skeleton variant="rounded" height="h-48" className="mb-4" />
      <Skeleton height="h-6" width="w-3/4" className="mb-3" />
      <Skeleton variant="text" lines={3} />
      <div className="mt-4 flex gap-2">
        <Skeleton height="h-10" width="w-28" variant="rounded" />
        <Skeleton height="h-10" width="w-28" variant="rounded" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function TestimonialSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`surface-card p-[var(--space-6)] ${className}`} role="status" aria-label="Loading testimonial">
      <div className="flex items-center gap-3 mb-4">
        <Skeleton variant="circular" width="w-12" height="h-12" />
        <div className="flex-1">
          <Skeleton height="h-4" width="w-32" className="mb-2" />
          <Skeleton height="h-3" width="w-24" />
        </div>
      </div>
      <Skeleton variant="text" lines={4} />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="py-[var(--space-16)] px-[var(--space-4)]" role="status" aria-label="Loading hero section">
      <div className="max-w-3xl">
        <Skeleton height="h-10" width="w-3/4" className="mb-4" />
        <Skeleton height="h-6" width="w-1/2" className="mb-6" />
        <Skeleton variant="text" lines={3} className="mb-8" />
        <div className="flex gap-4">
          <Skeleton height="h-12" width="w-40" variant="rounded" />
          <Skeleton height="h-12" width="w-40" variant="rounded" />
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Skeleton;
