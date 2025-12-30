'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { analytics } from '@/src/lib/analytics';

/**
 * TrustBridgeTracker - Tracks user engagement with Trust Bridge section on homepage
 * Monitors viewport visibility, scroll depth, and click interactions
 */
export default function TrustBridgeTracker() {
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasTrackedView = useRef(false);
  const scrollDepthTracked = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Find Trust Bridge section
    const findTrustBridge = () => {
      const sections = document.querySelectorAll('section');
      for (const section of sections) {
        const text = section.textContent || '';
        if (text.includes('Meet Dr. Sayuj Krishnan') && text.includes('Patient Success Stories')) {
          return section as HTMLElement;
        }
      }
      return null;
    };

    const section = findTrustBridge();
    if (!section) return;

    sectionRef.current = section;

    // Track when Trust Bridge enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedView.current) {
            hasTrackedView.current = true;
            analytics.trustSignalView(
              pathname || '/',
              'trust_bridge_homepage',
              'all'
            );
          }
        });
      },
      { threshold: 0.3 } // Track when 30% visible
    );

    observer.observe(section);

    // Track scroll depth within Trust Bridge section
    const trackScrollDepth = () => {
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      // Calculate scroll depth within section
      if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
        const visibleHeight = Math.min(windowHeight - sectionTop, sectionHeight);
        const depth = Math.round((visibleHeight / sectionHeight) * 100);
        
        // Track at 25%, 50%, 75%, 100% milestones
        [25, 50, 75, 100].forEach((milestone) => {
          if (depth >= milestone && !scrollDepthTracked.current.has(milestone)) {
            scrollDepthTracked.current.add(milestone);
            analytics.track('Trust_Bridge_Scroll_Depth', {
              page_slug: pathname || '/',
              scroll_depth_percentage: milestone,
              section: 'trust_bridge'
            });
          }
        });
      }
    };

    window.addEventListener('scroll', trackScrollDepth);
    trackScrollDepth(); // Initial check

    // Track clicks on Trust Bridge links
    const handleTrustBridgeClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (!link) return;

      const href = link.getAttribute('href') || '';
      const linkText = link.textContent?.trim() || '';

      if (href.includes('/about')) {
        analytics.trustSignalClick(
          pathname || '/',
          'trust_bridge_about',
          '/about',
          'all'
        );
        analytics.trustPathwayStart(pathname || '/', 'homepage_trust_bridge');
      } else if (href.includes('/patient-stories')) {
        analytics.trustSignalClick(
          pathname || '/',
          'trust_bridge_patient_stories',
          '/patient-stories',
          'all'
        );
        analytics.trustPathwayStart(pathname || '/', 'homepage_trust_bridge');
      }
    };

    section.addEventListener('click', handleTrustBridgeClick);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', trackScrollDepth);
      section.removeEventListener('click', handleTrustBridgeClick);
    };
  }, [pathname]);

  return null; // This component doesn't render anything
}


