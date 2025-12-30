'use client';

import { useEffect } from 'react';

export default function StatsigSessionReplay() {
  useEffect(() => {
    // Session replay will be configured when Statsig is properly initialized
    console.log('Session replay component ready');
  }, []);

  return null;
}
