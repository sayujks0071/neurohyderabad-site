'use client';

import { FlagValues } from 'flags/react';
import { useHypertune } from '@/generated/hypertune.react';
import { hypertuneFlagFallbacks } from '@/src/lib/hypertune/experiments-config';

export default function FlagValuesEmitter() {
  const hypertune = useHypertune();
  
  // Get boolean flags from generated code
  const ctaVariantBoolean = hypertune?.ctaVariant?.({ fallback: false }) ?? false;
  const exampleFlagBoolean = hypertune?.exampleFlag?.({ fallback: false }) ?? false;
  
  // Map boolean to enum for backward compatibility
  // For now, use fallback values since flags are booleans
  // TODO: Update Hypertune dashboard to use enums instead of booleans
  const ctaVariant = hypertuneFlagFallbacks.cta_variant;
  const stickyCtaVariant = hypertuneFlagFallbacks.sticky_cta_variant;

  return (
    <FlagValues
      values={{
        cta_variant: ctaVariant,
        sticky_cta_variant: stickyCtaVariant,
        ctaVariant: ctaVariantBoolean,
        exampleFlag: exampleFlagBoolean,
      }}
    />
  );
}
