'use client';

import { useEffect } from 'react';

export default function StatsigSessionReplay() {
  useEffect(() => {
    // Only enable if user has given consent
    const hasConsent = localStorage.getItem('analytics-consent') === 'true';
    if (!hasConsent) return;

    const initSessionReplay = async () => {
      try {
        const { Statsig } = await import('@statsig/js-client');
        
        // Configure session replay with privacy masking
        Statsig.updateUser({
          userID: `anonymous_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          customIDs: {},
        });

        // Enable session replay with privacy controls
        if (typeof window !== 'undefined' && window.Statsig) {
          // Mask sensitive elements for medical compliance
          const maskSelectors = [
            'input[type="email"]',
            'input[type="tel"]',
            'input[name*="phone"]',
            'input[name*="email"]',
            'input[name*="name"]',
            'input[name*="address"]',
            'textarea[name*="message"]',
            'textarea[name*="details"]',
            '.sensitive-data',
            '[data-sensitive="true"]'
          ];

          // Apply masking to sensitive elements
          maskSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
              element.setAttribute('data-statsig-mask', 'true');
            });
          });

          // Disable replay on appointment confirmation pages
          if (window.location.pathname.includes('/appointments/') && 
              window.location.pathname.includes('/confirm')) {
            return; // Skip replay on confirmation pages
          }
        }
      } catch (error) {
        console.error('Session replay initialization failed:', error);
      }
    };

    // Initialize after a short delay to ensure page is loaded
    const timer = setTimeout(initSessionReplay, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return null;
}
