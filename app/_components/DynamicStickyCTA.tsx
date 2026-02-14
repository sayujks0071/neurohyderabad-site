'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const StickyCTA = dynamic(() => import('./StickyCTA'), { ssr: false });

export default function DynamicStickyCTA() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If already loaded, no need to attach listener
    if (shouldLoad) return;

    // Fallback for browsers without IntersectionObserver support
    if (typeof window !== 'undefined' && !window.IntersectionObserver) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      // ⚡ Bolt: Load when user scrolls past 100px (sentinel exits viewport)
      // Use IntersectionObserver instead of scroll listener for better performance
      if (!entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    });

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    // Fallback: Load after 4 seconds to ensure availability even without scroll
    // This helps with tracking or if the user interacts in other ways
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 4000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [shouldLoad]); // ⚡ Bolt: Depend on shouldLoad to cleanup listener once loaded

  if (!shouldLoad) {
    // ⚡ Bolt: Sentinel element for scroll detection (100px height)
    // When this element scrolls out of view (top), we know user scrolled > 100px
    return (
      <div
        ref={sentinelRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '1px',
          height: '100px',
          visibility: 'hidden',
          pointerEvents: 'none'
        }}
        aria-hidden="true"
      />
    );
  }

  return <StickyCTA />;
}
