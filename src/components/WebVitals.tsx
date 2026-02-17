'use client';

import { useEffect } from 'react';
import { analytics } from '../lib/analytics';

export default function WebVitals() {
  // Monitoring Core Web Vitals for analytics
  useEffect(() => {
    // Only track if user has given consent
    const hasConsent = localStorage.getItem('analytics-consent') === 'true';
    if (!hasConsent) return;

    const trackWebVitals = async () => {
      try {
        const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import('web-vitals');

        // Track Core Web Vitals
        onCLS((metric) => {
          analytics.coreWebVitals(metric.name, metric.value, window.location.pathname);
        });

        onINP((metric) => {
          analytics.coreWebVitals(metric.name, metric.value, window.location.pathname);
        });

        onFCP((metric) => {
          analytics.coreWebVitals(metric.name, metric.value, window.location.pathname);
        });

        onLCP((metric) => {
          analytics.coreWebVitals(metric.name, metric.value, window.location.pathname);
        });

        onTTFB((metric) => {
          analytics.coreWebVitals(metric.name, metric.value, window.location.pathname);
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