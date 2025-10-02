'use client';

import { useEffect } from 'react';
import { STATSIG_CONFIG } from '../lib/statsig';

export default function StatsigSessionReplay() {
  useEffect(() => {
    // Only load session replay if we have a client key
    if (!STATSIG_CONFIG.clientKey || STATSIG_CONFIG.clientKey === '') {
      return;
    }

    // Load Statsig Session Replay
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@statsig/session-replay@latest/dist/index.js';
    script.async = true;
    
    script.onload = () => {
      // Initialize session replay
      if (window.statsigSessionReplay) {
        window.statsigSessionReplay.init({
          clientKey: STATSIG_CONFIG.clientKey,
          userID: 'anonymous',
          custom: {
            medicalSpecialty: 'neurosurgery',
            location: 'hyderabad',
            practiceType: 'private'
          },
          options: {
            // Configure session replay options
            captureConsole: true,
            captureNetwork: true,
            captureErrors: true,
            // Privacy settings for medical practice
            maskText: true,
            maskInputs: true,
            // Only capture in production
            enabled: process.env.NODE_ENV === 'production'
          }
        });
        console.log('Statsig Session Replay initialized');
      }
    };

    script.onerror = () => {
      console.error('Failed to load Statsig Session Replay');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return null;
}

// Extend window interface for TypeScript
declare global {
  interface Window {
    statsigSessionReplay: any;
  }
}
