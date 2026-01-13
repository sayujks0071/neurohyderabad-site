"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { getHypertune } from '@/src/lib/hypertune/client';

// Define the client type based on the return type of the getHypertune function
type HypertuneClient = ReturnType<typeof getHypertune>;

interface HypertuneContextType {
  hypertune: HypertuneClient | null;
  isReady: boolean;
}

const HypertuneContext = createContext<HypertuneContextType>({
  hypertune: null,
  isReady: false,
});

export function useHypertune() {
  const context = useContext(HypertuneContext);
  if (!context) {
    throw new Error('useHypertune must be used within HypertuneProvider');
  }
  return context;
}

interface HypertuneProviderProps {
  children: ReactNode;
}

export default function HypertuneProvider({ children }: HypertuneProviderProps) {
  const [hypertune, setHypertune] = useState<HypertuneClient | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function initHypertune() {
      try {
        // Dynamically import the client logic to avoid including the heavy Hypertune SDK
        // in the initial shared bundle. This significantly improves First Load JS.
        const { getHypertune, waitForHypertune } = await import('@/src/lib/hypertune/client');

        const client = getHypertune();
        
        if (client) {
          await waitForHypertune();
        }

        if (mounted) {
          setHypertune(client);
          setIsReady(true);
        }
      } catch (error) {
        console.error('Failed to initialize Hypertune:', error);
        if (mounted) {
          setIsReady(true); // Set ready even on error to prevent blocking render
        }
      }
    }

    // Use requestIdleCallback if available to further defer execution off the critical path
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => initHypertune());
    } else {
      setTimeout(initHypertune, 0);
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <HypertuneContext.Provider value={{ hypertune, isReady }}>
      {children}
    </HypertuneContext.Provider>
  );
}
