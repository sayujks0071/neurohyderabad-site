'use client';

import React from 'react';
import { useStatsigClient } from '@statsig/react-bindings';

interface TrustStripProps {
  className?: string;
}

export default function TrustStrip({ className = '' }: TrustStripProps) {
  const client = useStatsigClient();
  
  // A/B test for trust strip
  const variant = client?.getExperiment('exp_trust_strip', { 
    userID: 'anon' 
  })?.get('variant', 'control');

  const getTrustElements = () => {
    switch (variant) {
      case 'treatment':
        return [
          { icon: '🏥', text: 'Yashoda Hospital Association' },
          { icon: '🎓', text: 'Board Certified Neurosurgeon' },
          { icon: '🔬', text: 'MRI Reviewed by Dr. Sayuj' }
        ];
      case 'control':
      default:
        return [
          { icon: '🏥', text: 'Yashoda Hospital' },
          { icon: '🎓', text: 'Expert Neurosurgeon' },
          { icon: '🔬', text: 'Advanced Diagnostics' }
        ];
    }
  };

  const trustElements = getTrustElements();

  return (
    <div className={`bg-gray-50 border-t border-b border-gray-200 py-3 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-700">
          {trustElements.map((element, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-lg">{element.icon}</span>
              <span className="font-medium">{element.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
