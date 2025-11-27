"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getHypertune, waitForHypertune } from '@/src/lib/hypertune/client';

interface HypertuneContextType {
  hypertune: ReturnType<typeof getHypertune> | null;
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
  const [hypertune, setHypertune] = useState<ReturnType<typeof getHypertune> | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function initHypertune() {
      try {
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

    initHypertune();

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
