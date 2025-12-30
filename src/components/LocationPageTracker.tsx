'use client';

import { useEffect } from 'react';
import { useStatsigEvents } from '../lib/statsig-events';

interface LocationPageTrackerProps {
  location: string;
}

export default function LocationPageTracker({ location }: LocationPageTrackerProps) {
  const { logLocationPageView } = useStatsigEvents();

  useEffect(() => {
    // Log location page view when component mounts
    logLocationPageView(location);
  }, [location, logLocationPageView]);

  return null; // This component doesn't render anything
}
