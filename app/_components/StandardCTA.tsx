'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { analytics } from '@/src/lib/analytics';
import { useCtaExperiment } from '@/src/lib/hypertune/experiments';
import { CTAIntent, CTAButtonConfig, HYPERTUNE_EXPERIMENT_KEYS } from '@/src/lib/hypertune/experiments-config';

interface StandardCTAProps {
  className?: string;
  variant?: 'default' | 'compact' | 'stacked';
}

function CTAIcon({ intent }: { intent: CTAIntent }) {
  if (intent === 'whatsapp') {
    return (
      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
      </svg>
    );
  }

  if (intent === 'appointment') {
    return (
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    );
  }

  return (
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

export default function StandardCTA({ className = '', variant = 'default' }: StandardCTAProps) {
  const pathname = usePathname();
  const { variant: experimentVariant, config } = useCtaExperiment(pathname || undefined);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const isCompact = variant === 'compact';
  const isStacked = variant === 'stacked';

  const handleCTAClick = (button: CTAButtonConfig) => {
    if (!isClient) return; // Only track on client side
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', button.intent, {
        event_category: 'engagement',
        event_label: button.label,
      });
    }

    analytics.track('CTA_Click', {
      page_slug: pathname || '/',
      cta_label: button.label,
      cta_intent: button.intent,
      experiment_name: HYPERTUNE_EXPERIMENT_KEYS.cta,
      experiment_variant: experimentVariant,
    });
  };
  
  const buttonPadding = isCompact 
    ? "px-4 py-2 text-sm" 
    : "px-6 py-3 text-base";
    
  const containerClasses = isStacked 
    ? "flex flex-col space-y-3" 
    : "flex flex-wrap gap-3";

  const buttonToneClasses = useMemo<Record<CTAIntent, string>>(() => ({
    call: "bg-green-700 hover:bg-green-800 text-white",
    whatsapp: "bg-green-700 hover:bg-green-800 text-white",
    appointment: "bg-blue-700 hover:bg-blue-800 text-white",
  }), []);

  return (
    <div className={`${containerClasses} ${className}`}>
      {config.standardButtons.map((button) => (
        <Link 
          key={`${button.intent}-${button.label}`}
          href={button.href}
          onClick={() => handleCTAClick(button)}
          target={button.target}
          rel={button.rel}
          className={`${buttonToneClasses[button.intent]} font-semibold rounded-lg transition-colors duration-200 ${buttonPadding} min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          aria-label={button.ariaLabel || button.label}
        >
          <CTAIcon intent={button.intent} />
          {button.label}
        </Link>
      ))}
    </div>
  );
}
