'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useStatsigClient } from '@statsig/react-bindings';
import { analytics } from '../lib/analytics';

export default function StatsigAnalytics() {
  const pathname = usePathname();
  const client = useStatsigClient();

  useEffect(() => {
    // Only initialize if Statsig is properly configured
    if (!client) {
      return;
    }
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

    // Track scroll depth
    const trackScrollDepth = () => {
      let maxScrollDepth = 0;
      let scrollDepthTracked = new Set<number>();

      const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);
        
        // Track milestone scroll depths
        const milestones = [25, 50, 75, 90, 100];
        milestones.forEach(milestone => {
          if (scrollPercentage >= milestone && !scrollDepthTracked.has(milestone)) {
            scrollDepthTracked.add(milestone);
            analytics.scrollDepth(pathname, milestone);
          }
        });

        // Update max scroll depth
        if (scrollPercentage > maxScrollDepth) {
          maxScrollDepth = scrollPercentage;
        }
      };

      // Throttle scroll events
      let scrollTimeout: NodeJS.Timeout;
      const throttledScroll = () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScroll, 100);
      };

      window.addEventListener('scroll', throttledScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', throttledScroll);
        if (scrollTimeout) clearTimeout(scrollTimeout);
      };
    };

    const scrollCleanup = trackScrollDepth();

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      scrollCleanup();
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
