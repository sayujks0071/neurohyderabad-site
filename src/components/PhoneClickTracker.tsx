'use client';

import { useEffect } from 'react';
import { useStatsigEvents } from '../lib/statsig-events';

export default function PhoneClickTracker() {
  const { logPhoneCallClick } = useStatsigEvents();

  useEffect(() => {
    const handlePhoneClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a[href^="tel:"]') as HTMLAnchorElement;
      
      if (link) {
        const phoneNumber = link.href.replace('tel:', '');
        const source = target.textContent?.trim() || 'unknown';
        
        logPhoneCallClick(phoneNumber, source);
      }
    };

    // Add event listener to document for phone link clicks
    document.addEventListener('click', handlePhoneClick);

    return () => {
      document.removeEventListener('click', handlePhoneClick);
    };
  }, [logPhoneCallClick]);

  return null; // This component doesn't render anything
}
