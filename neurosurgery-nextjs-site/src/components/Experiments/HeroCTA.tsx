"use client";
import { useExperiment } from '@statsig/react-bindings';
import { analytics } from '../../lib/analytics';

interface HeroCTAProps {
  className?: string;
  href?: string;
}

export default function HeroCTA({ className = "", href = "/appointments/" }: HeroCTAProps) {
  const { value: ctaVariant } = useExperiment('exp_hero_cta_copy');
  
  const handleClick = () => {
    analytics.track('CTA_Click', {
      cta_label: String(ctaVariant || 'default'),
      cta_location: 'hero',
      page_type: 'home'
    });
  };

  const getCTAText = () => {
    const variant = String(ctaVariant || 'default');
    switch (variant) {
      case 'variant_b':
        return 'Schedule Consultation';
      case 'variant_c':
        return 'Get Expert Opinion';
      default:
        return 'Book Consultation';
    }
  };

  return (
    <a 
      href={href}
      className={`bg-white text-blue-800 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors ${className}`}
      onClick={handleClick}
    >
      {getCTAText()}
    </a>
  );
}
