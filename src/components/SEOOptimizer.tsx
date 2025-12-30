"use client";
import { useEffect } from 'react';
import { analytics } from '../lib/analytics';

interface SEOOptimizerProps {
  pageType: 'home' | 'service' | 'condition' | 'blog' | 'location' | 'other';
  pageSlug: string;
  serviceOrCondition?: string;
}

export default function SEOOptimizer({ pageType, pageSlug, serviceOrCondition }: SEOOptimizerProps) {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    analytics.pageView(pageSlug, pageType, serviceOrCondition);

    const startTime = Date.now();
    const cleanupCallbacks: Array<() => void> = [];

    const startTracking = () => {
      const observers: PerformanceObserver[] = [];

      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            if (lastEntry) {
              analytics.coreWebVitals('LCP', lastEntry.startTime, pageSlug);
            }
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
          observers.push(lcpObserver);

          const fidObserver = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
              const fidEntry = entry as PerformanceEntry & { processingStart?: number };
              if (typeof fidEntry.processingStart === 'number') {
                analytics.coreWebVitals('FID', fidEntry.processingStart - fidEntry.startTime, pageSlug);
              }
            });
          });
          fidObserver.observe({ entryTypes: ['first-input'] });
          observers.push(fidObserver);

          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
              const clsEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
              if (!clsEntry.hadRecentInput && typeof clsEntry.value === 'number') {
                clsValue += clsEntry.value;
              }
            });
            analytics.coreWebVitals('CLS', clsValue, pageSlug);
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });
          observers.push(clsObserver);

          const fcpObserver = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
              analytics.coreWebVitals('FCP', entry.startTime, pageSlug);
            });
          });
          fcpObserver.observe({ entryTypes: ['paint'] });
          observers.push(fcpObserver);
        } catch {
          // Ignore observer errors to avoid breaking hydration
        }
      }

      if (observers.length > 0) {
        cleanupCallbacks.push(() => observers.forEach((observer) => observer.disconnect()));
      }

      let maxScrollDepth = 0;
      const trackScrollDepth = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight <= 0) {
          return;
        }
        const scrollPercent = Math.round((scrollTop / docHeight) * 100);

        if (scrollPercent > maxScrollDepth) {
          maxScrollDepth = scrollPercent;
          analytics.scrollDepth(pageSlug, scrollPercent);
        }
      };

      window.addEventListener('scroll', trackScrollDepth, { passive: true });
      cleanupCallbacks.push(() => window.removeEventListener('scroll', trackScrollDepth));

      const trackTimeOnPage = () => {
        const timeOnPage = Date.now() - startTime;
        analytics.track('Time_On_Page', {
          page_slug: pageSlug,
          page_type: pageType,
          time_on_page_ms: timeOnPage,
          service_or_condition: serviceOrCondition
        });
      };

      const beforeUnloadHandler = () => trackTimeOnPage();
      const visibilityHandler = () => {
        if (document.visibilityState === 'hidden') {
          trackTimeOnPage();
        }
      };

      window.addEventListener('beforeunload', beforeUnloadHandler);
      document.addEventListener('visibilitychange', visibilityHandler);

      cleanupCallbacks.push(() => {
        window.removeEventListener('beforeunload', beforeUnloadHandler);
        document.removeEventListener('visibilitychange', visibilityHandler);
        trackTimeOnPage();
      });

      const faqElements = Array.from(
        document.querySelectorAll<HTMLDetailsElement>('details[data-faq-item]')
      );

      faqElements.forEach((faq, index) => {
        const handler = () => {
          const faqId = faq.dataset.faqId || `faq_${index}`;
          analytics.faqToggle(pageSlug, faqId, faq.open);
        };
        faq.addEventListener('toggle', handler);
        cleanupCallbacks.push(() => faq.removeEventListener('toggle', handler));
      });

      const ctaElements = Array.from(
        document.querySelectorAll<HTMLAnchorElement>('a[href*="/appointments"], a[href*="tel:"], a[href*="wa.me"]')
      );

      ctaElements.forEach((cta) => {
        const handler = () => {
          const href = cta.href;
          let ctaType = 'unknown';

          if (href.includes('/appointments')) {
            ctaType = 'appointment';
          } else if (href.includes('tel:')) {
            ctaType = 'phone';
          } else if (href.includes('wa.me')) {
            ctaType = 'whatsapp';
          }

          analytics.track('CTA_Click', {
            page_slug: pageSlug,
            page_type: pageType,
            cta_type: ctaType,
            cta_href: href,
            service_or_condition: serviceOrCondition
          });
        };

        cta.addEventListener('click', handler);
        cleanupCallbacks.push(() => cta.removeEventListener('click', handler));
      });
    };

    let idleHandle: number | null = null;
    const idleWindow = window as typeof window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    const scheduleTracking = () => {
      if (typeof idleWindow.requestIdleCallback === 'function') {
        idleHandle = idleWindow.requestIdleCallback(startTracking, { timeout: 1500 });
      } else {
        idleHandle = window.setTimeout(startTracking, 0);
      }
    };

    scheduleTracking();

    return () => {
      if (idleHandle !== null) {
        if (typeof idleWindow.cancelIdleCallback === 'function') {
          idleWindow.cancelIdleCallback(idleHandle);
        } else {
          clearTimeout(idleHandle);
        }
      }
      cleanupCallbacks.forEach((cleanup) => cleanup());
    };
  }, [pageType, pageSlug, serviceOrCondition]);

  // This component doesn't render anything visible
  return null;
}

// SEO optimization utilities
export const seoUtils = {
  // Generate optimized meta description
  generateMetaDescription: (title: string, content: string, maxLength: number = 160): string => {
    const baseDescription = `${title} - ${content}`;
    if (baseDescription.length <= maxLength) {
      return baseDescription;
    }
    
    const truncated = content.substring(0, maxLength - title.length - 3);
    const lastSpace = truncated.lastIndexOf(' ');
    return `${title} - ${truncated.substring(0, lastSpace)}...`;
  },

  // Generate optimized title
  generateTitle: (primary: string, secondary: string, location: string, maxLength: number = 60): string => {
    const baseTitle = `${primary} ${secondary} in ${location}`;
    if (baseTitle.length <= maxLength) {
      return baseTitle;
    }
    
    // Try without location
    const withoutLocation = `${primary} ${secondary}`;
    if (withoutLocation.length <= maxLength) {
      return withoutLocation;
    }
    
    // Truncate secondary
    const truncatedSecondary = secondary.substring(0, maxLength - primary.length - 3);
    return `${primary} ${truncatedSecondary}...`;
  },

  // Check if content is mobile-friendly
  isMobileFriendly: (): boolean => {
    if (typeof window === 'undefined') return true;
    
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) return false;
    
    const content = viewport.getAttribute('content');
    return !!(content?.includes('width=device-width') && content?.includes('initial-scale=1'));
  },

  // Get page loading performance
  getPagePerformance: (): { loadTime: number; domContentLoaded: number; firstPaint: number } => {
    if (typeof window === 'undefined') return { loadTime: 0, domContentLoaded: 0, firstPaint: 0 };
    
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    
    return {
      loadTime: navigation ? navigation.loadEventEnd - navigation.fetchStart : 0,
      domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.fetchStart : 0,
      firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0
    };
  }
};
