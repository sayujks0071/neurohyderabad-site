'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const StickyCTA = dynamic(() => import('./StickyCTA'), { ssr: false });

export default function DynamicStickyCTA() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Handler for scroll interaction
    const handleScroll = () => {
      setShouldLoad(true);
    };

    // Add scroll listener immediately
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
  }, []);

  if (!shouldLoad) {
    return null;
  }

  return <StickyCTA />;
}
