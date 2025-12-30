'use client';

import { useEffect } from 'react';
import { useStatsigEvents } from '../lib/statsig-events';

interface ServicePageTrackerProps {
  service: string;
}

export default function ServicePageTracker({ service }: ServicePageTrackerProps) {
  const { logServiceInquiry } = useStatsigEvents();

  useEffect(() => {
    // Log service inquiry when component mounts (page view)
    logServiceInquiry(service, 'page_view');
  }, [service, logServiceInquiry]);

  return null; // This component doesn't render anything
}
