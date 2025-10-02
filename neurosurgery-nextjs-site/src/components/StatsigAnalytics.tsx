'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useStatsig } from '@statsig/react-bindings';
import { trackPageView, trackPerformance, trackError } from '../lib/statsig';

export default function StatsigAnalytics() {
  const pathname = usePathname();
  const { logEvent } = useStatsig();

  useEffect(() => {
    // Track page views
    if (pathname) {
      trackPageView(pathname, document.title);
    }

    // Track performance metrics
    const trackWebVitals = () => {
      // Track Core Web Vitals
      import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
        onCLS((metric) => {
          trackPerformance('CLS', metric.value, 'score');
          logEvent('web_vital', {
            metric: 'CLS',
            value: metric.value,
            unit: 'score'
          });
        });
        onINP((metric) => {
          trackPerformance('INP', metric.value, 'ms');
          logEvent('web_vital', {
            metric: 'INP',
            value: metric.value,
            unit: 'ms'
          });
        });
        onFCP((metric) => {
          trackPerformance('FCP', metric.value, 'ms');
          logEvent('web_vital', {
            metric: 'FCP',
            value: metric.value,
            unit: 'ms'
          });
        });
        onLCP((metric) => {
          trackPerformance('LCP', metric.value, 'ms');
          logEvent('web_vital', {
            metric: 'LCP',
            value: metric.value,
            unit: 'ms'
          });
        });
        onTTFB((metric) => {
          trackPerformance('TTFB', metric.value, 'ms');
          logEvent('web_vital', {
            metric: 'TTFB',
            value: metric.value,
            unit: 'ms'
          });
        });
      });
    };

    // Track errors
    const handleError = (event: ErrorEvent) => {
      trackError('javascript_error', event.message, pathname);
      logEvent('error_occurred', {
        error_type: 'javascript_error',
        error_message: event.message,
        page_path: pathname
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      trackError('unhandled_promise_rejection', event.reason?.toString() || 'Unknown error', pathname);
      logEvent('error_occurred', {
        error_type: 'unhandled_promise_rejection',
        error_message: event.reason?.toString() || 'Unknown error',
        page_path: pathname
      });
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
  }, [pathname, logEvent]);

  return null;
}
