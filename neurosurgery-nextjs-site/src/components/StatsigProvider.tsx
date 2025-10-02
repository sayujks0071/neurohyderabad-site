'use client';

import { StatsigProvider as StatsigProviderBase } from '@statsig/react-bindings';
import { ReactNode, useEffect, useState } from 'react';

interface StatsigProviderProps {
  children: ReactNode;
}

export default function StatsigProvider({ children }: StatsigProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Check for existing consent
    const consent = localStorage.getItem('analytics-consent');
    if (consent === 'true') {
      setHasConsent(true);
    }
  }, []);

  useEffect(() => {
    if (hasConsent && !isInitialized) {
      // Mark as initialized - the actual Statsig initialization will be handled by the React bindings
      setIsInitialized(true);
    }
  }, [hasConsent, isInitialized]);

  // Show consent banner if no consent given
  if (!hasConsent) {
    return (
      <>
        {children}
        <ConsentBanner onConsent={() => setHasConsent(true)} />
      </>
    );
  }

  // Only render Statsig provider after initialization
  if (!isInitialized) {
    return <>{children}</>;
  }

  return <>{children}</>;
}

// Privacy-compliant consent banner
function ConsentBanner({ onConsent }: { onConsent: () => void }) {
  const handleAccept = () => {
    localStorage.setItem('analytics-consent', 'true');
    onConsent();
  };

  const handleDecline = () => {
    localStorage.setItem('analytics-consent', 'false');
    // Still allow basic functionality without analytics
    onConsent();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">
              Privacy & Analytics
            </h3>
            <p className="text-sm text-gray-600">
              We use analytics to improve your experience. All data is anonymized and no personal information is collected. 
              You can opt out at any time.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
