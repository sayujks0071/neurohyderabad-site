"use client";
import { useFeatureGate } from '@statsig/react-bindings';
import { analytics } from '../../lib/analytics';

interface StickyCTAProps {
  className?: string;
}

export default function StickyCTA({ className = "" }: StickyCTAProps) {
  const { value: stickyEnabled } = useFeatureGate('fg_sticky_cta');
  
  const handleClick = () => {
    analytics.track('CTA_Click', {
      cta_label: 'sticky_appointment',
      cta_location: 'sticky_mobile',
      page_type: 'service'
    });
  };

  if (!stickyEnabled) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 z-50 md:hidden ${className}`}>
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div>
          <p className="font-semibold">Need Expert Care?</p>
          <p className="text-sm opacity-90">Book consultation with Dr. Sayuj</p>
        </div>
        <a 
          href="/appointments/"
          className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors"
          onClick={handleClick}
        >
          Book Now
        </a>
      </div>
    </div>
  );
}
