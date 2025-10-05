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
    // Track page view with SEO context
    analytics.pageView(pageSlug, pageType, serviceOrCondition);

    // Track Core Web Vitals
    const trackWebVitals = () => {
      // LCP (Largest Contentful Paint)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        analytics.coreWebVitals('LCP', lastEntry.startTime, pageSlug);
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // FID (First Input Delay)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fidEntry = entry as any;
          if (fidEntry.processingStart) {
            analytics.coreWebVitals('FID', fidEntry.processingStart - fidEntry.startTime, pageSlug);
          }
        });
      }).observe({ entryTypes: ['first-input'] });

      // CLS (Cumulative Layout Shift)
      let clsValue = 0;
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const clsEntry = entry as any;
          if (!clsEntry.hadRecentInput) {
            clsValue += clsEntry.value;
          }
        });
        analytics.coreWebVitals('CLS', clsValue, pageSlug);
      }).observe({ entryTypes: ['layout-shift'] });

      // FCP (First Contentful Paint)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          analytics.coreWebVitals('FCP', entry.startTime, pageSlug);
        });
      }).observe({ entryTypes: ['paint'] });
    };

    // Track scroll depth
    let maxScrollDepth = 0;
    const trackScrollDepth = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
        analytics.scrollDepth(pageSlug, scrollPercent);
      }
    };

    // Track time on page
    const startTime = Date.now();
    const trackTimeOnPage = () => {
      const timeOnPage = Date.now() - startTime;
      analytics.track('Time_On_Page', {
        page_slug: pageSlug,
        page_type: pageType,
        time_on_page_ms: timeOnPage,
        service_or_condition: serviceOrCondition
      });
    };

    // Initialize tracking
    trackWebVitals();
    window.addEventListener('scroll', trackScrollDepth);
    
    // Track time on page when user leaves
    window.addEventListener('beforeunload', trackTimeOnPage);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        trackTimeOnPage();
      }
    });

    // Track FAQ interactions
    const faqElements = document.querySelectorAll('details');
    faqElements.forEach((faq, index) => {
      faq.addEventListener('toggle', () => {
        analytics.faqToggle(pageSlug, `faq_${index}`, faq.open);
      });
    });

    // Track CTA clicks
    const ctaElements = document.querySelectorAll('a[href*="/appointments"], a[href*="tel:"], a[href*="wa.me"]');
    ctaElements.forEach((cta) => {
      cta.addEventListener('click', (e) => {
        const href = (e.target as HTMLAnchorElement).href;
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
      });
    });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', trackScrollDepth);
      window.removeEventListener('beforeunload', trackTimeOnPage);
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
