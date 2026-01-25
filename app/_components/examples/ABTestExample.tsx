'use client';

/**
 * Use Case 2: A/B Testing
 * 
 * Best for: Testing different UI variations, copy, layouts to optimize conversion
 * 
 * Example: Test different CTA button colors, headlines, form layouts
 */
import { useFeatureFlag } from '@/src/lib/hypertune/hooks';
import { analytics } from '@/src/lib/analytics';
import { useEffect } from 'react';

type ButtonVariant = 'blue' | 'green' | 'red';

export default function ABTestExample() {
  // Get experiment variant
  const buttonColor = useFeatureFlag<ButtonVariant>('ctaButtonColor', 'blue');
  const headlineVariant = useFeatureFlag('headlineVariant', 'control');

  // Track experiment exposure
  useEffect(() => {
    analytics.track('Experiment_Exposure', {
      experiment_name: 'ctaButtonColor',
      experiment_variant: buttonColor,
      page_slug: window.location.pathname,
    });
  }, [buttonColor]);

  const buttonColors = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    red: 'bg-red-600 hover:bg-red-700',
  };

  const headlines = {
    control: 'Expert Neurosurgery Care in Hyderabad',
    variant_a: 'Transform Your Health with Advanced Brain & Spine Surgery',
    variant_b: '1,000+ Successful Surgeries | Same-Day Discharge Available',
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        {headlines[headlineVariant as keyof typeof headlines] || headlines.control}
      </h1>

      <button
        className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors ${buttonColors[buttonColor]}`}
        onClick={() => {
          analytics.track('CTA_Click', {
            experiment_name: 'ctaButtonColor',
            experiment_variant: buttonColor,
            page_slug: window.location.pathname,
          });
        }}
      >
        Book Consultation
      </button>

      <p className="text-sm text-gray-500">
        Testing: Button Color = {buttonColor} | Headline = {headlineVariant}
      </p>
    </div>
  );
}
