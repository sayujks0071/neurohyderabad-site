'use client';

import { useEffect } from 'react';
import { trackCoreWebVitals } from '../lib/statsig';

export default function WebVitals() {
  useEffect(() => {
    // Only track if user has given consent
    const hasConsent = localStorage.getItem('analytics-consent') === 'true';
    if (!hasConsent) return;

    const trackWebVitals = async () => {
      try {
        const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');

        // Track Core Web Vitals
        getCLS((metric) => {
          trackCoreWebVitals(metric);
        });

        getFID((metric) => {
          trackCoreWebVitals(metric);
        });

        getFCP((metric) => {
          trackCoreWebVitals(metric);
        });

        getLCP((metric) => {
          trackCoreWebVitals(metric);
        });

        getTTFB((metric) => {
          trackCoreWebVitals(metric);
        });

        // Track INP (Interaction to Next Paint) if available
        if ('PerformanceObserver' in window) {
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.entryType === 'event' && entry.name === 'click') {
                trackCoreWebVitals({
                  name: 'INP',
                  value: entry.processingStart - entry.startTime,
                  id: `inp_${Date.now()}`,
                });
              }
            }
          });
          
          observer.observe({ entryTypes: ['event'] });
        }
      } catch (error) {
        console.error('Web Vitals tracking failed:', error);
      }
    };

    trackWebVitals();
  }, []);

  return null;
}