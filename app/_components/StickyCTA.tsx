'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { analytics } from '@/src/lib/analytics';
import { useStickyCtaExperiment } from '@/src/lib/hypertune/experiments';
import { CTAIntent, CTAButtonConfig, HYPERTUNE_EXPERIMENT_KEYS } from '@/src/lib/hypertune/experiments-config';

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

  if (intent === 'emergency') {
    return (
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    );
  }

  return (
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

interface StickyCTAProps {
  className?: string;
}

export default function StickyCTA({ className = '' }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const { variant: stickyVariant, config } = useStickyCtaExperiment(pathname || undefined);

  useEffect(() => {
    setIsClient(true);

    let animationFrame = 0;
    let lastVisibility = false;

    const evaluate = () => {
      animationFrame = 0;
      const { scrollHeight } = document.documentElement;
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const mediaQuery = typeof window.matchMedia === "function"
        ? window.matchMedia("(max-width: 767px)")
        : null;
      const isCompactViewport = mediaQuery ? mediaQuery.matches : window.innerWidth < 768;
      const threshold = isCompactViewport ? 0.45 : 0.7;
      const shouldShow = scrollTop > (scrollHeight - viewportHeight) * threshold;

      if (shouldShow !== lastVisibility) {
        lastVisibility = shouldShow;
        setIsVisible(shouldShow);
      }
    };

    const requestEvaluation = () => {
      if (animationFrame) {
        return;
      }
      animationFrame = window.requestAnimationFrame(evaluate);
    };

    window.addEventListener('scroll', requestEvaluation, { passive: true });
    window.addEventListener('resize', requestEvaluation);
    requestEvaluation();

    return () => {
      window.removeEventListener('scroll', requestEvaluation);
      window.removeEventListener('resize', requestEvaluation);
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  const handleCTAClick = (button: CTAButtonConfig) => {
    if (!isClient) return;

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', button.intent, {
        event_category: 'engagement',
        event_label: button.label,
      });
    }

    analytics.stickyCTAClick(pathname || '/', button.label, stickyVariant);
    analytics.track('CTA_Click', {
      page_slug: pathname || '/',
      cta_label: button.label,
      cta_intent: button.intent,
      experiment_name: HYPERTUNE_EXPERIMENT_KEYS.sticky,
      experiment_variant: stickyVariant,
    });
  };

  // Don't render during SSR to prevent hydration mismatch
  if (!isClient || !isVisible) {
    return null;
  }

  const buttonToneClasses: Record<CTAIntent, string> = {
    call: "bg-green-700 hover:bg-green-800 text-white",
    whatsapp: "bg-green-700 hover:bg-green-800 text-white",
    appointment: "bg-blue-700 hover:bg-blue-800 text-white",
    emergency: "bg-red-600 hover:bg-red-700 text-white animate-pulse",
  };

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4 ${className}`}
      role="region"
      aria-label="Quick contact options"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">
              {config.headline}
            </p>
            {config.subhead && (
              <p className="text-xs text-gray-600">
                {config.subhead}
              </p>
            )}
          </div>
          <div className="ml-4 flex flex-wrap gap-3" role="group" aria-label="Contact actions">
            {config.buttons.map((button) => (
              <Link 
                key={`${button.intent}-${button.label}`}
                href={button.href}
                target={button.target}
                rel={button.rel}
                onClick={() => handleCTAClick(button)}
                className={`${buttonToneClasses[button.intent]} font-semibold rounded-lg transition-colors duration-200 px-4 py-3 min-h-[44px] text-sm flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                aria-label={button.ariaLabel || button.label}
              >
                <CTAIcon intent={button.intent} />
                {button.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
