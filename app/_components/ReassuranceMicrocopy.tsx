'use client';

import React from 'react';
import { useExperiment } from '@statsig/react-bindings';

interface ReassuranceMicrocopyProps {
  className?: string;
  serviceType?: 'spine' | 'brain' | 'epilepsy' | 'nerve';
}

export default function ReassuranceMicrocopy({ 
  className = '', 
  serviceType = 'spine' 
}: ReassuranceMicrocopyProps) {
  // A/B test for reassurance microcopy
  const { value: variant } = useExperiment('exp_reassurance_microcopy');

  const getMicrocopy = () => {
    const variantValue = String(variant || 'control');
    switch (variantValue) {
      case 'treatment':
        return "Minimally invasive options first—surgery only when needed";
      case 'control':
      default:
        return "Expert neurosurgical care with advanced techniques";
    }
  };

  return (
    <div className={`bg-blue-50 border-l-4 border-blue-500 p-4 ${className}`}>
      <p className="text-blue-800 font-medium">
        {getMicrocopy()}
      </p>
    </div>
  );
}
