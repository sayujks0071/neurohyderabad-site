'use client';

import { useEffect } from 'react';
import { trackWebVitals } from '../lib/analytics';
import { monitorPerformance } from '../lib/monitoring';

export default function WebVitals() {
  useEffect(() => {
    // Import web-vitals dynamically
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      // Track for analytics
      onCLS(trackWebVitals);
      onINP(trackWebVitals);
      onFCP(trackWebVitals);
      onLCP(trackWebVitals);
      onTTFB(trackWebVitals);
      
      // Monitor for alerts
      onCLS(monitorPerformance);
      onINP(monitorPerformance);
      onFCP(monitorPerformance);
      onLCP(monitorPerformance);
      onTTFB(monitorPerformance);
    });
  }, []);

  return null;
}
