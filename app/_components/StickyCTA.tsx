'use client';

import React, { useState, useEffect } from 'react';
import { useExperiment } from '@statsig/react-bindings';
import StandardCTA from './StandardCTA';

interface StickyCTAProps {
  className?: string;
}

export default function StickyCTA({ className = '' }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  // A/B test for sticky CTA
  const { value: variant } = useExperiment('exp_sticky_cta');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show sticky CTA after 50% scroll on mobile, 75% on desktop
      const threshold = window.innerWidth < 768 ? 0.5 : 0.75;
      const shouldShow = scrollTop > (documentHeight - windowHeight) * threshold;
      
      setIsVisible(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only show for treatment variant
  const variantValue = String(variant || 'control');
  if (variantValue !== 'treatment' || !isVisible) {
    return null;
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 mb-1">
              Need immediate consultation?
            </p>
            <p className="text-xs text-gray-600">
              Call or WhatsApp for urgent appointments
            </p>
          </div>
          <div className="ml-4">
            <StandardCTA variant="compact" />
          </div>
        </div>
      </div>
    </div>
  );
}
