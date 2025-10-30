'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { analytics } from '@/src/lib/analytics';

interface JourneyStep {
  page: string;
  timestamp: number;
  action?: string;
}

/**
 * UserJourneyTracker - Tracks complete user journey through trust pathway
 * Monitors: Homepage → Trust Signals → About/Patient Stories → Appointment
 */
export default function UserJourneyTracker() {
  const pathname = usePathname();
  const journeyRef = useRef<JourneyStep[]>([]);
  const startTimeRef = useRef<number>(Date.now());
  const trustPathwayStartRef = useRef<number | null>(null);

  useEffect(() => {
    const currentPath = pathname || '/';
    const now = Date.now();

    // Initialize journey if starting
    if (journeyRef.current.length === 0) {
      journeyRef.current.push({
        page: currentPath,
        timestamp: now
      });
    } else {
      // Add new step
      journeyRef.current.push({
        page: currentPath,
        timestamp: now
      });
    }

    // Track trust pathway completion
    if (currentPath === '/about' || currentPath === '/patient-stories') {
      if (trustPathwayStartRef.current) {
        const timeSpent = Math.round((now - trustPathwayStartRef.current) / 1000);
        analytics.trustPathwayComplete(
          '/', // Started from homepage
          currentPath === '/about' ? 'about' : 'patient_stories',
          timeSpent
        );
      } else {
        // Direct visit to trust page
        analytics.trustPathwayStart(currentPath, 'direct');
      }
    }

    // Track conversion funnel progression
    const trackFunnelProgress = () => {
      const journey = journeyRef.current;
      const hasViewedTrust = journey.some(step => 
        step.page === '/about' || step.page === '/patient-stories'
      );
      const hasStartedAppointment = journey.some(step => 
        step.page === '/appointments' || step.action === 'appointment_start'
      );

      if (hasViewedTrust && !hasStartedAppointment) {
        analytics.track('Conversion_Funnel_Progress', {
          step: 'trust_reviewed',
          page_slug: currentPath,
          journey_length: journey.length,
          time_since_start: Math.round((now - startTimeRef.current) / 1000)
        });
      }

      if (hasStartedAppointment) {
        analytics.track('Conversion_Funnel_Progress', {
          step: 'appointment_started',
          page_slug: currentPath,
          journey_length: journey.length,
          time_since_start: Math.round((now - startTimeRef.current) / 1000),
          trust_pages_viewed: journey.filter(step => 
            step.page === '/about' || step.page === '/patient-stories'
          ).length
        });
      }
    };

    trackFunnelProgress();

    // Track time on page for trust pages
    if (currentPath === '/about' || currentPath === '/patient-stories') {
      const startTime = Date.now();
      
      return () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        if (timeSpent > 5) { // Only track if user spent meaningful time
          analytics.timeOnPage(currentPath, timeSpent);
        }
      };
    }
  }, [pathname]);

  // Track exit intent
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        analytics.exitIntent(pathname || '/', 'top_of_page');
      }
    };

    const handleBeforeUnload = () => {
      analytics.exitIntent(pathname || '/', 'page_unload');
      
      // Log complete journey on exit
      if (journeyRef.current.length > 1) {
        analytics.track('User_Journey_Complete', {
          page_slug: pathname || '/',
          journey_length: journeyRef.current.length,
          journey_pages: journeyRef.current.map(step => step.page).join(' → '),
          total_time_seconds: Math.round((Date.now() - startTimeRef.current) / 1000),
          viewed_trust_pages: journeyRef.current.filter(step => 
            step.page === '/about' || step.page === '/patient-stories'
          ).length
        });
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname]);

  return null;
}

