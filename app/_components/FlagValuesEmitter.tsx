'use client';

import { FlagValues } from 'flags/react';
import { useCtaVariantAdapter, useStickyCtaVariantAdapter } from '@/src/lib/hypertune/flag-adapter';
import { useHypertune } from '@/generated/hypertune.react';

/**
 * Emits flag values for analytics tracking
 * 
 * Uses enum-based variants (snake_case) as the canonical source of truth.
 * The boolean flags (camelCase) from Hypertune are converted to enums via adapters.
 * 
 * This ensures consistent tracking and avoids duplicate flag names.
 */
export default function FlagValuesEmitter() {
  const hypertune = useHypertune();
  
  // Get actual experiment variants (enum values) via adapters
  // These convert boolean Hypertune flags to enum-based experiment variants
  const ctaVariant = useCtaVariantAdapter();
  const stickyCtaVariant = useStickyCtaVariantAdapter();
  
  // Get raw boolean flags for reference (if needed for debugging)
  const ctaVariantBoolean = hypertune?.ctaVariant?.({ fallback: false }) ?? false;
  const exampleFlagBoolean = hypertune?.exampleFlag?.({ fallback: false }) ?? false;

  return (
    <FlagValues
      values={{
        // Primary: Enum-based experiment variants (canonical)
        cta_variant: ctaVariant,
        sticky_cta_variant: stickyCtaVariant,
        // Secondary: Raw boolean flags (for debugging/compatibility)
        // Note: These may be removed once analytics migration is complete
        ctaVariant: ctaVariantBoolean,
        exampleFlag: exampleFlagBoolean,
      }}
    />
  );
}
