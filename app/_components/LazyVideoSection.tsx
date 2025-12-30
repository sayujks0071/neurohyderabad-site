'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Lazy load the video component only when it comes into view
const PatientEducationVideos = dynamic(() => import('./PatientEducationVideos'), {
  loading: () => (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
        </div>
      </div>
    </div>
  )
});

export default function LazyVideoSection() {
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
      {isVisible ? <PatientEducationVideos /> : (
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
