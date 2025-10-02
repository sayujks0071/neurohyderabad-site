'use client';

import React from "react";
import { StatsigProvider as StatsigProviderCore, useClientAsyncInit } from '@statsig/react-bindings';
import { StatsigAutoCapturePlugin } from '@statsig/web-analytics';
import { StatsigSessionReplayPlugin } from '@statsig/session-replay';
import { STATSIG_CONFIG } from '../lib/statsig';

interface StatsigProviderProps {
  children: React.ReactNode;
}

export default function StatsigProvider({ children }: StatsigProviderProps) {
  // Only initialize Statsig if we have a client key
  if (!STATSIG_CONFIG.clientKey || STATSIG_CONFIG.clientKey === '') {
    console.warn('Statsig client key not configured');
    return <>{children}</>;
  }

  const { client } = useClientAsyncInit(
    STATSIG_CONFIG.clientKey,
    { 
      userID: 'anonymous', // You can customize this based on user authentication
      custom: {
        medicalSpecialty: 'neurosurgery',
        location: 'hyderabad',
        practiceType: 'private'
      }
    }, 
    { 
      plugins: [ 
        new StatsigAutoCapturePlugin(), 
        new StatsigSessionReplayPlugin() 
      ] 
    },
  );

  return (
    <StatsigProviderCore client={client} loadingComponent={<div>Loading...</div>}>
      {children}
    </StatsigProviderCore>
  );
}
