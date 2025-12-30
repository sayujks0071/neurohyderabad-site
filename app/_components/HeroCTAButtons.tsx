'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

import { analytics } from '@/src/lib/analytics';
import { useCtaExperiment } from '@/src/lib/hypertune/experiments';
import { CTAButtonConfig, CTAIntent, HYPERTUNE_EXPERIMENT_KEYS } from '@/src/lib/hypertune/experiments-config';

import Button from './Button';

function intentTone(intent: CTAIntent) {
  if (intent === 'whatsapp' || intent === 'call') {
    return 'bg-green-700 hover:bg-green-800 text-white';
  }
  return '';
}

export default function HeroCTAButtons() {
  const pathname = usePathname();
  const { variant, config } = useCtaExperiment(pathname || undefined);

  const primary = config.heroPrimary;
  const secondary = config.heroSecondary;

  const primaryVariant = primary.intent === 'appointment' ? 'primary' : 'secondary';
  const secondaryVariant = secondary.intent === 'appointment' ? 'primary' : 'secondary';

  const primaryClass = useMemo(
    () => `rounded-full text-lg ${intentTone(primary.intent)}`,
    [primary.intent],
  );
  const secondaryClass = useMemo(
    () => `rounded-full text-lg ${intentTone(secondary.intent)}`,
    [secondary.intent],
  );

  const handleClick = (button: CTAButtonConfig) => {
    analytics.heroCTAClick(pathname || '/', button.label, undefined, variant);
    analytics.track('CTA_Click', {
      page_slug: pathname || '/',
      cta_label: button.label,
      cta_intent: button.intent,
      experiment_name: HYPERTUNE_EXPERIMENT_KEYS.cta,
      experiment_variant: variant,
    });
  };

  return (
    <div className="space-y-3">
      {config.heroKicker && (
        <p className="text-sm text-blue-100">
          {config.heroKicker}
        </p>
      )}
      <div className="flex flex-wrap gap-3 items-center">
        <Button
          href={primary.href}
          target={primary.target}
          rel={primary.rel}
          size="lg"
          variant={primaryVariant}
          className={primaryClass}
          aria-label={
            primary.ariaLabel ? `${primary.label} (${primary.ariaLabel})` : primary.label
          }
          onClick={() => handleClick(primary)}
        >
          {primary.label}
        </Button>
        <Button
          href={secondary.href}
          target={secondary.target}
          rel={secondary.rel}
          size="lg"
          variant={secondaryVariant}
          className={secondaryClass}
          aria-label={
            secondary.ariaLabel ? `${secondary.label} (${secondary.ariaLabel})` : secondary.label
          }
          onClick={() => handleClick(secondary)}
        >
          {secondary.label}
        </Button>
      </div>
      {config.heroHelper && (
        <p className="text-sm text-blue-50">
          {config.heroHelper}
        </p>
      )}
    </div>
  );
}
