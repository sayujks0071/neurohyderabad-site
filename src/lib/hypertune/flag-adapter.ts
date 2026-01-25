/**
 * Adapter layer to map Hypertune boolean flags to enum-based experiment system
 * 
 * This provides backward compatibility while Hypertune flags are set up as booleans.
 * Once flags are updated to enums in the Hypertune dashboard, this adapter can be removed.
 */

import type { CtaVariant, StickyCtaVariant } from './experiments-config';
import { useHypertune } from '@/generated/hypertune.react';

/**
 * Maps boolean ctaVariant flag to CtaVariant enum
 * true -> 'teleconsult_first' (experimental variant)
 * false -> 'control' (default)
 */
export function useCtaVariantAdapter(): CtaVariant {
  const hypertune = useHypertune();
  
  if (!hypertune || !hypertune.props.context) {
    return 'control';
  }

  try {
    const booleanValue = hypertune.ctaVariant({ fallback: false });
    // Map boolean to enum: true = experimental, false = control
    return booleanValue ? 'teleconsult_first' : 'control';
  } catch (error) {
    console.warn('Failed to get ctaVariant flag:', error);
    return 'control';
  }
}

/**
 * Maps boolean flags to StickyCtaVariant enum
 * Since sticky_cta_variant doesn't exist yet, always return 'control'
 * TODO: Add stickyCtaVariant flag to Hypertune dashboard
 */
export function useStickyCtaVariantAdapter(): StickyCtaVariant {
  const hypertune = useHypertune();
  
  if (!hypertune || !hypertune.props.context) {
    return 'control';
  }

  // TODO: Once stickyCtaVariant flag is added to Hypertune, implement mapping here
  // For now, always return control
  return 'control';
}
