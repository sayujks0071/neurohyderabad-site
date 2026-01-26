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
    const section = document.getElementById('trust-bridge-section');
    if (!section) return;

    sectionRef.current = section;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const ratio = entry.intersectionRatio;
          const percentage = Math.round(ratio * 100);

          // Track View (at 30%)
          if (ratio >= 0.3 && !hasTrackedView.current) {
            hasTrackedView.current = true;
            analytics.trustSignalView(
              pathname || '/',
              'trust_bridge_homepage',
              'all'
            );
          }

          // Track Depth (25, 50, 75, 100)
          [25, 50, 75, 100].forEach((milestone) => {
            // Check if we reached this milestone (with small buffer for float precision)
            if (percentage >= milestone && !scrollDepthTracked.current.has(milestone)) {
              scrollDepthTracked.current.add(milestone);
              analytics.track('Trust_Bridge_Scroll_Depth', {
                page_slug: pathname || '/',
                scroll_depth_percentage: milestone,
                section: 'trust_bridge'
              });
            }
          });
        });
      },
      {
        // 0.3 for view tracking, others for depth tracking
        threshold: [0.25, 0.3, 0.5, 0.75, 1.0]
      }
    );

    observer.observe(section);

    // Track clicks on Trust Bridge links
    const handleTrustBridgeClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (!link) return;

      const href = link.getAttribute('href') || '';

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
      section.removeEventListener('click', handleTrustBridgeClick);
    };
  }, [pathname]);

  return null; // This component doesn't render anything
}
