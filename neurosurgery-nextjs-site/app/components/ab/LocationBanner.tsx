'use client';

import { useGate, useWebLogger, getPageContext } from '@/app/lib/ab';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface LocationBannerProps {
  className?: string;
}

export default function LocationBanner({ className = '' }: LocationBannerProps) {
  const showBanner = useGate('web_gate_location_banner')?.value ?? false;
  const pathname = usePathname();
  const pageCtx = getPageContext(pathname);
  const { logCTA } = useWebLogger(pageCtx);
  const [isDismissed, setIsDismissed] = useState(false);

  const handleClick = () => {
    logCTA('banner');
  };

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  // Don't render if gate is disabled or banner is dismissed
  if (!showBanner || isDismissed) {
    return null;
  }

  return (
    <div className={`bg-blue-50 border-l-4 border-blue-600 p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-800">
              <strong>Hyderabad Location:</strong> Dr. Sayuj Krishnan provides world-class neurosurgery services in Hyderabad with state-of-the-art facilities.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleClick}
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors duration-200"
          >
            Learn More
          </button>
          <button
            onClick={handleDismiss}
            className="text-blue-600 hover:text-blue-800 focus:outline-none"
            aria-label="Dismiss banner"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}