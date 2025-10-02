'use client';

import { useEffect } from 'react';
import { trackWebVitals } from '../lib/analytics';
import { monitorPerformance } from '../lib/monitoring';

export default function WebVitals() {
  useEffect(() => {
    // Import web-vitals dynamically
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Track for analytics
      getCLS(trackWebVitals);
      getFID(trackWebVitals);
      getFCP(trackWebVitals);
      getLCP(trackWebVitals);
      getTTFB(trackWebVitals);
      
      // Monitor for alerts
      getCLS(monitorPerformance);
      getFID(monitorPerformance);
      getFCP(monitorPerformance);
      getLCP(monitorPerformance);
      getTTFB(monitorPerformance);
    });
  }, []);

  return null;
}
