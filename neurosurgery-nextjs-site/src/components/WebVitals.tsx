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
        const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import('web-vitals');

        // Track Core Web Vitals
        onCLS((metric) => {
          trackCoreWebVitals(metric);
        });

        onINP((metric) => {
          trackCoreWebVitals(metric);
        });

        onFCP((metric) => {
          trackCoreWebVitals(metric);
        });

        onLCP((metric) => {
          trackCoreWebVitals(metric);
        });

        onTTFB((metric) => {
          trackCoreWebVitals(metric);
        });

        // INP tracking is handled by the web-vitals library
      } catch (error) {
        console.error('Web Vitals tracking failed:', error);
      }
    };

    trackWebVitals();
  }, []);

  return null;
}