'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Lazy load the reputation panel only when it comes into view
const LocalReputationPanel = dynamic(() => import('./LocalReputationPanel'), {
  loading: () => (
    <div className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
        </div>
      </div>
    </div>
  )
});

export default function LazyReputationPanel() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef}>
      {isVisible ? <LocalReputationPanel /> : (
        <div className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
