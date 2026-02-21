'use client';

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Monitor Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Monitor Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        console.log('CLS:', clsValue);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Monitor First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('FID:', (entry as any).processingStart - entry.startTime);
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Monitor Total Blocking Time (TBT)
      const tbtObserver = new PerformanceObserver((list) => {
        let totalBlockingTime = 0;
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            totalBlockingTime += entry.duration - 50;
          }
        }
        console.log('TBT:', totalBlockingTime);
      });
      tbtObserver.observe({ entryTypes: ['longtask'] });

      // Cleanup observers
      return () => {
        lcpObserver.disconnect();
        clsObserver.disconnect();
        fidObserver.disconnect();
        tbtObserver.disconnect();
      };
    }
  }, []);

  return null;
}
