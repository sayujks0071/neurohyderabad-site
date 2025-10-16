"use client";
import { useSafeExperiment } from '@/src/hooks/useSafeExperiment';
import { analytics } from '../../lib/analytics';

interface HeroCTAProps {
  className?: string;
  href?: string;
}

export default function HeroCTA({ className = "", href = "/appointments/" }: HeroCTAProps) {
  const ctaVariant = useSafeExperiment<string>('exp_hero_cta_copy', 'default');
  
  const handleClick = () => {
    analytics.track('CTA_Click', {
      cta_label: ctaVariant,
      cta_location: 'hero',
      page_type: 'home'
    });
  };

  const getCTAText = () => {
    switch (ctaVariant) {
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
