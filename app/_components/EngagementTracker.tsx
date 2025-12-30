'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { analytics } from '@/src/lib/analytics';

interface EngagementTrackerProps {
  /** Track time spent on page */
  trackTime?: boolean;
  /** Track engagement milestones */
  trackMilestones?: boolean;
  /** Minimum time (seconds) before tracking as engaged */
  engagementThreshold?: number;
}

export default function EngagementTracker({
  trackTime = true,
  trackMilestones = true,
  engagementThreshold = 30
}: EngagementTrackerProps) {
  const pathname = usePathname();
  const startTimeRef = useRef<number>(Date.now());
  const lastActivityRef = useRef<number>(Date.now());
  const milestonesRef = useRef<Set<number>>(new Set());
  const isEngagedRef = useRef<boolean>(false);

  useEffect(() => {
    // Only track if user has given consent
    const hasConsent = typeof window !== 'undefined' && 
      localStorage.getItem('analytics-consent') === 'true';
    
    if (!hasConsent) return;

    startTimeRef.current = Date.now();
    lastActivityRef.current = Date.now();

    // Track engagement milestones (30s, 60s, 120s, 300s)
    const milestoneThresholds = [30, 60, 120, 300];
    
    // Track user activity (scroll, click, keypress)
    const handleActivity = () => {
      lastActivityRef.current = Date.now();
      
      // Check if user is engaged (spent threshold time on page)
      if (!isEngagedRef.current) {
        const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
        if (timeSpent >= engagementThreshold) {
          isEngagedRef.current = true;
          analytics.track('Page_Engagement', {
            page_slug: pathname || '/',
            engagement_type: 'threshold_reached',
            time_spent: timeSpent
          });
        }
      }
    };

    // Track time milestones
    const milestoneInterval = setInterval(() => {
      if (!trackMilestones) return;
      
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
      
      milestoneThresholds.forEach(threshold => {
        if (timeSpent >= threshold && !milestonesRef.current.has(threshold)) {
          milestonesRef.current.add(threshold);
          analytics.track('Engagement_Milestone', {
            page_slug: pathname || '/',
            milestone_seconds: threshold,
            total_time_spent: timeSpent
          });
        }
      });
    }, 5000); // Check every 5 seconds

    // Track periodic time on page (every 30 seconds)
    const timeTrackingInterval = setInterval(() => {
      if (!trackTime) return;
      
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const timeSinceLastActivity = Math.floor((Date.now() - lastActivityRef.current) / 1000);
      
      // Only track if user was active in last 60 seconds (not idle)
      if (timeSinceLastActivity < 60) {
        analytics.timeOnPage(pathname || '/', timeSpent);
      }
    }, 30000); // Every 30 seconds

    // Track final time on page before leaving
    const handleBeforeUnload = () => {
      const finalTimeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
      
      if (finalTimeSpent > 5) { // Only track if spent more than 5 seconds
        analytics.timeOnPage(pathname || '/', finalTimeSpent);
        
        // Track as engagement if threshold met
        if (finalTimeSpent >= engagementThreshold) {
          analytics.track('Page_Engagement', {
            page_slug: pathname || '/',
            engagement_type: 'session_end',
            time_spent: finalTimeSpent
          });
        }
      }
    };

    // Listen for user activity
    window.addEventListener('scroll', handleActivity, { passive: true });
    window.addEventListener('click', handleActivity, { passive: true });
    window.addEventListener('keypress', handleActivity, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(milestoneInterval);
      clearInterval(timeTrackingInterval);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      
      // Final time tracking on cleanup
      const finalTimeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
      if (finalTimeSpent > 5) {
        analytics.timeOnPage(pathname || '/', finalTimeSpent);
      }
    };
  }, [pathname, trackTime, trackMilestones, engagementThreshold]);

  return null;
}

