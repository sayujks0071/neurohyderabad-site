// Client-side Hypertune helpers and hooks
'use client';

/**
 * React Hooks for Hypertune
 * Convenient hooks for using Hypertune feature flags in components
 */

import { useHypertune } from '@/generated/hypertune.react';
import { hypertuneFlagFallbacks } from './experiments-config';

/**
 * Hook to get a feature flag value
 * @param flagName - Name of the feature flag (supports both camelCase and snake_case)
 * @param fallback - Fallback value if flag is not available
 * @returns The flag value or fallback
 */
export function useFeatureFlag<T>(flagName: string, fallback: T): T {
  const hypertune = useHypertune();
  const derivedFallback =
    (hypertuneFlagFallbacks as Record<string, unknown>)[flagName] ??
    fallback;
  const safeFallback = (derivedFallback as T) ?? fallback;

  if (!hypertune || !hypertune.props.context) {
    return safeFallback;
  }

  try {
    // Map snake_case to camelCase for generated flags
    const camelCaseName = flagName.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    
    // Try camelCase first (generated flags), then snake_case (legacy)
    const flagMethod = (hypertune as any)[camelCaseName] || (hypertune as any)[flagName];
    
    if (typeof flagMethod === 'function') {
      return flagMethod({ fallback: safeFallback });
    }
    
    return safeFallback;
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
