'use client';

import { StatsigProvider as StatsigProviderCore } from '@statsig/react-bindings';
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

  return (
    <StatsigProviderCore
      clientKey={STATSIG_CONFIG.clientKey}
      user={{
        userID: 'anonymous', // You can customize this based on user authentication
        custom: {
          medicalSpecialty: 'neurosurgery',
          location: 'hyderabad',
          practiceType: 'private'
        }
      }}
      options={{
        environment: {
          tier: process.env.NODE_ENV === 'production' ? 'production' : 'development'
        }
      }}
    >
      {children}
    </StatsigProviderCore>
  );
}
