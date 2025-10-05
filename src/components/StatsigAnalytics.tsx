'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useStatsigClient } from '@statsig/react-bindings';
import { analytics } from '../lib/analytics';

export default function StatsigAnalytics() {
  const pathname = usePathname();
  const client = useStatsigClient();
  
  // Only initialize if Statsig is properly configured
  if (!client) {
    return null;
  }

  useEffect(() => {
    // Track page views
    if (pathname) {
      const pageType = getPageType(pathname);
      const serviceOrCondition = getServiceOrCondition(pathname);
      analytics.pageView(pathname, pageType, serviceOrCondition);
    }

    // Track performance metrics
    const trackWebVitals = () => {
      // Track Core Web Vitals
      import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
        onCLS((metric) => {
          analytics.coreWebVitals('CLS', metric.value, pathname);
        });
        onINP((metric) => {
          analytics.coreWebVitals('INP', metric.value, pathname);
        });
        onFCP((metric) => {
          analytics.coreWebVitals('FCP', metric.value, pathname);
        });
        onLCP((metric) => {
          analytics.coreWebVitals('LCP', metric.value, pathname);
        });
        onTTFB((metric) => {
          analytics.coreWebVitals('TTFB', metric.value, pathname);
        });
      });
    };

    // Track errors
    const handleError = (event: ErrorEvent) => {
      analytics.formError(pathname, 'javascript_error', event.message);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      analytics.formError(pathname, 'unhandled_promise_rejection', event.reason?.toString() || 'Unknown error');
    };

    // Add event listeners
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Track performance
    trackWebVitals();

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [pathname, client]);

  // Helper functions
  function getPageType(pathname: string): string {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/services/')) return 'service';
    if (pathname.startsWith('/conditions/')) return 'condition';
    if (pathname.startsWith('/blog/')) return 'blog';
    if (pathname.startsWith('/locations/')) return 'location';
    return 'other';
  }

  function getServiceOrCondition(pathname: string): string | undefined {
    if (pathname.startsWith('/services/')) {
      return pathname.split('/')[2]?.replace(/-/g, '_');
    }
    if (pathname.startsWith('/conditions/')) {
      return pathname.split('/')[2]?.replace(/-/g, '_');
    }
    return undefined;
  }

  return null;
}
