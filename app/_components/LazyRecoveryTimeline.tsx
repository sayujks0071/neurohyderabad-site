'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Lazy load the recovery timeline only when it comes into view
const RecoveryTimeline = dynamic(() => import('./RecoveryTimeline'), {
  loading: () => (
    <div className="py-16 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="animate-pulse bg-slate-800 h-64 rounded-lg"></div>
        </div>
      </div>
    </div>
  )
});

export default function LazyRecoveryTimeline() {
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
      {isVisible ? <RecoveryTimeline /> : (
        <div className="py-16 bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="animate-pulse bg-slate-800 h-64 rounded-lg"></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
