import { reportValue } from 'flags';
import { hypertuneFlagFallbacks } from '@/src/lib/hypertune/experiments-config';

export const FLAG_FALLBACKS = hypertuneFlagFallbacks;

export type FlagValues = Record<string, unknown>;

export function getDefaultFlagValues(): FlagValues {
  return { ...FLAG_FALLBACKS };
}

export function reportFlagValues(values: FlagValues) {
  try {
    Object.entries(values).forEach(([key, value]) => {
      reportValue(key, value);
    });
  } catch (error) {
    console.warn('Failed to report flag values:', error);
  }
}
