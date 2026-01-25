'use client';

import { FlagValues } from 'flags/react';
import { useFeatureFlag } from '@/src/lib/hypertune/hooks';
import { hypertuneFlagFallbacks } from '@/src/lib/hypertune/experiments-config';

export default function FlagValuesEmitter() {
  const ctaVariant = useFeatureFlag(
    'cta_variant',
    hypertuneFlagFallbacks.cta_variant
  );
  const stickyCtaVariant = useFeatureFlag(
    'sticky_cta_variant',
    hypertuneFlagFallbacks.sticky_cta_variant
  );

  return (
    <FlagValues
      values={{
        cta_variant: ctaVariant,
        sticky_cta_variant: stickyCtaVariant,
      }}
    />
  );
}
