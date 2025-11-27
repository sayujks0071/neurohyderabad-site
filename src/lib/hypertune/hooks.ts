// Client-side Hypertune helpers and hooks
'use client';

/**
 * React Hooks for Hypertune
 * Convenient hooks for using Hypertune feature flags in components
 */

import { useHypertune } from '@/app/providers/hypertune-provider';
import { hypertuneFlagFallbacks } from './experiments-config';

/**
 * Hook to get a feature flag value
 * @param flagName - Name of the feature flag
 * @param fallback - Fallback value if flag is not available
 * @returns The flag value or fallback
 */
export function useFeatureFlag<T>(flagName: string, fallback: T): T {
  const { hypertune, isReady } = useHypertune();
  const derivedFallback =
    (hypertuneFlagFallbacks as Record<string, unknown>)[flagName] ??
    fallback;
  const safeFallback = (derivedFallback as T) ?? fallback;

  if (!isReady || !hypertune) {
    return safeFallback;
  }

  try {
    if (typeof (hypertune as any).getFlagValue === 'function') {
      return (hypertune as any).getFlagValue(flagName, safeFallback) as T;
    }

    // Access the flag dynamically
    // Note: This assumes the flag exists on the hypertune object
    const flagValue = (hypertune as any)[flagName];
    
    if (typeof flagValue === 'function') {
      return flagValue({ fallback: safeFallback });
    }
    
    return (flagValue as T) ?? safeFallback;
  } catch (error) {
    console.warn(`Failed to get feature flag "${flagName}":`, error);
    return safeFallback;
  }
}

/**
 * Hook to check if a feature is enabled
 * @param flagName - Name of the feature flag
 * @param fallback - Fallback value (default: false)
 * @returns Boolean indicating if feature is enabled
 */
export function useFeatureEnabled(flagName: string, fallback: boolean = false): boolean {
  return useFeatureFlag(flagName, fallback);
}

/**
 * Hook to get experiment variant
 * @param experimentName - Name of the experiment
 * @param fallback - Fallback variant name
 * @returns The variant name
 */
export function useExperimentVariant(experimentName: string, fallback: string = 'control'): string {
  return useFeatureFlag(experimentName, fallback);
}
