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
          // 🫀 CWV INP Optimization: Wrap state update in requestIdleCallback
          // Heavy components loaded via next/dynamic inside LazySection can block the main thread
          // if rendered immediately during scroll. Yielding to requestIdleCallback defers rendering
          // until the browser is idle, preventing scroll jank and improving Interaction to Next Paint (INP).
          const loadComponent = () => setIsVisible(true);

          if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
            window.requestIdleCallback(loadComponent);
          } else {
            // Fallback for Safari/unsupported browsers
            setTimeout(loadComponent, 1);
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
