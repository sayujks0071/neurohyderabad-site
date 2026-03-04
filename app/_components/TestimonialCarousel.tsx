'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

export interface Testimonial {
  id: string;
  name: string;
  condition?: string;
  rating: number;
  text: string;
  date?: string;
  source?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  /** Auto-advance interval in ms (0 = disabled) */
  autoPlayInterval?: number;
  className?: string;
}

/**
 * Accessible testimonial carousel with keyboard navigation,
 * auto-play, and proper ARIA roles.
 * Built on design system tokens.
 */
const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  autoPlayInterval = 6000,
  className = '',
}) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = testimonials.length;

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % total) + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-play
  useEffect(() => {
    if (autoPlayInterval <= 0 || isPaused || total <= 1) return;
    timerRef.current = setInterval(next, autoPlayInterval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlayInterval, isPaused, next, total]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    }
  };

  if (total === 0) return null;
  const t = testimonials[current];

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      role="region"
      aria-roledescription="carousel"
      aria-label="Patient testimonials"
    >
      {/* Slide */}
      <div
        role="group"
        aria-roledescription="slide"
        aria-label={`Testimonial ${current + 1} of ${total}`}
        className="surface-card p-[var(--space-8)] md:p-[var(--space-10)] text-center max-w-3xl mx-auto"
      >
        {/* Quote icon */}
        <Quote
          className="h-8 w-8 text-[var(--color-primary-100)] mx-auto mb-[var(--space-4)]"
          aria-hidden="true"
        />

        {/* Rating stars */}
        <div className="flex justify-center gap-1 mb-[var(--space-4)]" aria-label={`${t.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < t.rating
                  ? 'text-[var(--color-warning)] fill-yellow-400'
                  : 'text-[var(--color-border)]'
              }`}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Testimonial text */}
        <blockquote className="text-lg md:text-xl leading-relaxed text-[var(--color-text-primary)] mb-[var(--space-6)]">
          &ldquo;{t.text}&rdquo;
        </blockquote>

        {/* Attribution */}
        <footer className="flex flex-col items-center gap-1">
          <cite className="not-italic font-semibold text-[var(--color-text-primary)]">
            {t.name}
          </cite>
          {t.condition && (
            <span className="text-sm text-[var(--color-text-secondary)]">
              {t.condition}
            </span>
          )}
          {t.date && (
            <time className="text-xs text-[var(--color-text-secondary)]" dateTime={t.date}>
              {new Date(t.date).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
              })}
            </time>
          )}
        </footer>
      </div>

      {/* Navigation controls */}
      {total > 1 && (
        <>
          {/* Prev / Next buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 w-10 h-10 rounded-full bg-[var(--color-surface)] shadow-[var(--shadow-md)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-primary-500)] transition-colors focus-ring"
            aria-label="Previous testimonial"
            type="button"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 w-10 h-10 rounded-full bg-[var(--color-surface)] shadow-[var(--shadow-md)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-primary-500)] transition-colors focus-ring"
            aria-label="Next testimonial"
            type="button"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-[var(--space-6)]" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => goTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus-ring ${
                  i === current
                    ? 'bg-[var(--color-primary-500)] w-6'
                    : 'bg-[var(--color-border)] hover:bg-[var(--color-text-secondary)]'
                }`}
                type="button"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TestimonialCarousel;
