'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { analytics } from '@/src/lib/analytics';

/**
 * ConversionFunnelTracker - Tracks user progression through conversion funnel
 * Stages: Awareness → Interest → Consideration → Conversion
 */
export default function ConversionFunnelTracker() {
  const pathname = usePathname();
  const funnelStageRef = useRef<string>('awareness');
  const visitedPagesRef = useRef<Set<string>>(new Set());
  const hasTrackedCurrentStage = useRef(false);

  useEffect(() => {
    const currentPath = pathname || '/';
    
    // Skip if already tracked this page visit
    if (visitedPagesRef.current.has(currentPath)) {
      return;
    }
    
    visitedPagesRef.current.add(currentPath);

    // Determine funnel stage based on current page
    let currentStage = 'awareness';
    
    if (currentPath === '/' || currentPath.includes('/blog') || currentPath.includes('/media')) {
      currentStage = 'awareness';
    } else if (currentPath.includes('/services/') || currentPath.includes('/conditions/')) {
      currentStage = 'interest';
    } else if (currentPath === '/about' || currentPath === '/patient-stories' || currentPath.includes('/patient-stories/')) {
      currentStage = 'consideration';
    } else if (currentPath === '/appointments' || currentPath === '/contact') {
      currentStage = 'conversion';
    }

    // Track stage progression
    if (currentStage !== funnelStageRef.current && !hasTrackedCurrentStage.current) {
      const previousStage = funnelStageRef.current;
      funnelStageRef.current = currentStage;
      hasTrackedCurrentStage.current = true;

      analytics.track('Conversion_Funnel_Stage', {
        page_slug: currentPath,
        funnel_stage: currentStage,
        previous_stage: previousStage,
        stage_progression: `${previousStage} → ${currentStage}`,
        pages_visited: visitedPagesRef.current.size
      });

      // Track stage-specific events
      if (currentStage === 'consideration') {
        analytics.track('Trust_Pathway_Engagement', {
          page_slug: currentPath,
          trust_page_type: currentPath.includes('/about') ? 'about' : 'patient_stories',
          entry_point: previousStage
        });
      }

      if (currentStage === 'conversion') {
        analytics.track('Conversion_Intent', {
          page_slug: currentPath,
          conversion_type: currentPath === '/appointments' ? 'appointment' : 'contact',
          funnel_completion: true,
          stages_completed: ['awareness', 'interest', 'consideration', 'conversion'].filter(
            stage => visitedPagesRef.current.has(
              stage === 'awareness' ? '/' :
              stage === 'interest' ? '/services/' :
              stage === 'consideration' ? '/about' :
              '/appointments'
            )
          ).length
        });
      }
    }

    // Reset tracking flag on pathname change
    hasTrackedCurrentStage.current = false;
  }, [pathname]);

  return null;
}

