'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { analytics } from '@/src/lib/analytics';

/**
 * TrustSignalViewportTracker - Tracks when trust signals enter/exit viewport
 * Monitors TrustProof components and Trust Bridge section visibility
 */
export default function TrustSignalViewportTracker() {
  const pathname = usePathname();
  const trackedElements = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Find all trust signal elements
    const findTrustSignals = () => {
      const signals: HTMLElement[] = [];
      
      // ⚡ Bolt: Use specific data attribute for O(1) lookup instead of O(n) text scan
      const trustProofComponents = document.querySelectorAll('[data-trust-signal="trust_proof_component"]');
      trustProofComponents.forEach(el => signals.push(el as HTMLElement));

      // ⚡ Bolt: Use ID lookup for homepage bridge instead of iterating all sections
      if (pathname === '/') {
        const trustBridge = document.getElementById('trust-bridge-section');
        if (trustBridge) {
          signals.push(trustBridge);
        }
      }

      return signals;
    };

    const elements = findTrustSignals();
    if (elements.length === 0) return;

    // Track visibility for each trust signal
    const observers = elements.map((element, index) => {
      const elementId = `trust_signal_${index}_${pathname}`;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !trackedElements.current.has(elementId)) {
              trackedElements.current.add(elementId);
              
              // Determine signal type
              // ⚡ Bolt: Optimized detection using ID and data attributes
              let signalType = 'trust_proof_component';

              if (element.id === 'trust-bridge-section') {
                signalType = 'trust_bridge_homepage';
              } else if (element.getAttribute('data-trust-signal') === 'trust_proof_component') {
                signalType = 'trust_proof_component';
              }

              // Track view
              analytics.trustSignalView(
                pathname || '/',
                signalType,
                'all'
              );

              // Track time to view (since page load)
              const timeToView = Date.now() - performance.timing.navigationStart;
              analytics.track('Trust_Signal_Time_To_View', {
                page_slug: pathname || '/',
                trust_signal_type: signalType,
                time_to_view_ms: timeToView,
                scroll_position: window.scrollY
              });
            }
          });
        },
        { 
          threshold: [0.25, 0.5, 0.75, 1.0], // Track at multiple visibility thresholds
          rootMargin: '0px'
        }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [pathname]);

  return null;
}


