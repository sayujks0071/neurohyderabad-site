'use client';

import { useEffect, useMemo } from 'react';

import { trackExperimentExposure } from '../analytics';
import {
  CtaVariant,
  StickyCtaVariant,
  CTA_VARIANTS,
  STICKY_CTA_VARIANTS,
  hypertuneFlagFallbacks,
  HYPERTUNE_EXPERIMENT_KEYS,
  CtaExperimentConfig,
  StickyCtaConfig,
} from './experiments-config';
import { useCtaVariantAdapter, useStickyCtaVariantAdapter } from './flag-adapter';
import { useHypertune } from '@/generated/hypertune.react';

function resolvePageSlug(pageSlug?: string) {
  if (pageSlug) return pageSlug;
  if (typeof window !== 'undefined') {
    return window.location.pathname || '/';
  }
  return '/';
}

function useExperimentExposure(
  flagName: string,
  variant: string,
  pageSlug?: string,
) {
  const hypertune = useHypertune();
  const isReady = hypertune?.props.context !== null;
  const resolvedSlug = resolvePageSlug(pageSlug);

  useEffect(() => {
    if (!isReady) return;
    trackExperimentExposure(flagName, variant, resolvedSlug);
  }, [flagName, isReady, resolvedSlug, variant]);
}

export function useCtaExperiment(
  pageSlug?: string,
): { variant: CtaVariant; config: CtaExperimentConfig } {
  const fallback = hypertuneFlagFallbacks.cta_variant;
  // Use adapter to map boolean flag to enum
  const variant = useCtaVariantAdapter();
  const config = useMemo(
    () => CTA_VARIANTS[variant] ?? CTA_VARIANTS[fallback],
    [variant, fallback],
  );

  useExperimentExposure(
    HYPERTUNE_EXPERIMENT_KEYS.cta,
    variant,
    pageSlug,
  );

  return { variant, config };
}

export function useStickyCtaExperiment(
  pageSlug?: string,
): { variant: StickyCtaVariant; config: StickyCtaConfig } {
  const fallback = hypertuneFlagFallbacks.sticky_cta_variant;
  // Use adapter to map boolean flag to enum (currently always returns 'control')
  const variant = useStickyCtaVariantAdapter();
  const config = useMemo(
    () => STICKY_CTA_VARIANTS[variant] ?? STICKY_CTA_VARIANTS[fallback],
    [variant, fallback],
  );

  useExperimentExposure(
    HYPERTUNE_EXPERIMENT_KEYS.sticky,
    variant,
    pageSlug,
  );

  return { variant, config };
}
