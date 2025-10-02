'use client';

import { useEffect } from 'react';
import { trackScrollDepth } from '../lib/statsig';

interface ScrollDepthTrackerProps {
  pageSlug: string;
}

export default function ScrollDepthTracker({ pageSlug }: ScrollDepthTrackerProps) {
  useEffect(() => {
    // Only track if user has given consent
    const hasConsent = localStorage.getItem('analytics-consent') === 'true';
    if (!hasConsent) return;

    let maxScrollDepth = 0;
    const scrollThresholds = [25, 50, 75, 90, 100];
    const trackedThresholds = new Set<number>();

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

      maxScrollDepth = Math.max(maxScrollDepth, scrollPercentage);

      // Track milestone thresholds
      scrollThresholds.forEach(threshold => {
        if (scrollPercentage >= threshold && !trackedThresholds.has(threshold)) {
          trackedThresholds.add(threshold);
          trackScrollDepth(pageSlug, threshold);
        }
      });
    };

    // Throttle scroll events for performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    // Track final scroll depth on page unload
    const handleBeforeUnload = () => {
      if (maxScrollDepth > 0) {
        trackScrollDepth(pageSlug, maxScrollDepth);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pageSlug]);

  return null;
}
