'use client';

/**
 * Wrapper for generated HypertuneProvider
 * Provides the correct configuration for the generated Hypertune code
 */

import { HypertuneProvider as GeneratedHypertuneProvider } from '@/generated/hypertune.react';
import type { Context } from '@/generated/hypertune';
import { getHypertuneToken } from '@/src/lib/hypertune/edge-config';
import { getExperimentationConfig, getHypertuneConfigKey } from '@/src/lib/hypertune/edge-config';
import { createClient } from '@vercel/edge-config';
import { VercelEdgeConfigInitDataProvider } from 'hypertune';

interface HypertuneWrapperProps {
  children: React.ReactNode;
}

export default function HypertuneWrapper({ children }: HypertuneWrapperProps) {
  const token = getHypertuneToken() ?? '';
  
  // Set up Edge Config init data provider if available
  const configUrl = getExperimentationConfig();
  const itemKey = getHypertuneConfigKey();
  
  const initDataProvider =
    typeof window === 'undefined' && configUrl && itemKey
      ? new VercelEdgeConfigInitDataProvider({
          edgeConfigClient: createClient(configUrl),
          itemKey,
        })
      : undefined;

  // Create context for flag evaluation
  const context: Context = {
    environment: (process.env.NODE_ENV || 'development') as 'development' | 'production' | 'test',
    user: {
      id: 'anonymous',
      name: '',
      email: '',
    },
  };

  return (
    <GeneratedHypertuneProvider
      createSourceOptions={{
        token,
        ...(initDataProvider && {
          initDataProvider,
          shouldRefreshInitData: true,
          shouldRefreshInitDataOnCreate: true,
        }),
        remoteLogging: {
          mode: process.env.NODE_ENV === 'production' ? 'session' : 'off',
        },
      }}
      rootArgs={{ context }}
    >
      {children}
    </GeneratedHypertuneProvider>
  );
}
