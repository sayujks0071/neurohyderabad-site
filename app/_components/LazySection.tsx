'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  placeholder?: ReactNode;
  rootMargin?: string;
  className?: string;
}

export default function LazySection({
  children,
  placeholder,
  rootMargin = '200px', // Start loading 200px before viewport
  className = '',
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If IntersectionObserver is not supported, load immediately
    if (typeof window !== 'undefined' && !window.IntersectionObserver) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 🫀 CWV Sentinel Fix: Defer heavy child rendering to reduce INP/TBT during scroll.
          // By yielding to the main thread before updating state, the browser can paint
          // the current scroll frame smoothly without jank.
          if ('requestIdleCallback' in window) {
            window.requestIdleCallback(() => setIsVisible(true));
          } else {
            setTimeout(() => setIsVisible(true), 1);
          }
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={sectionRef} className={className}>
      {isVisible ? children : placeholder}
    </div>
  );
}
