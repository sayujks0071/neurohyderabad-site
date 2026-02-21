'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const StickyCTA = dynamic(() => import('./StickyCTA'), { ssr: false });

export default function DynamicStickyCTA() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // If already loaded, no need to attach listener
    if (shouldLoad) return;

    // Handler for scroll interaction
    const handleScroll = () => {
      // ⚡ Bolt: Only load when user has scrolled significantly (> 100px)
      // avoiding eager load on minor movements or initial bounce.
      if (window.scrollY > 100) {
        setShouldLoad(true);
      }
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Fallback: Load after 4 seconds to ensure availability even without scroll
    // This helps with tracking or if the user interacts in other ways
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 4000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [shouldLoad]); // ⚡ Bolt: Depend on shouldLoad to cleanup listener once loaded

  if (!shouldLoad) {
    return null;
  }

  return <StickyCTA />;
}
