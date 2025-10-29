"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { analytics } from '../lib/analytics';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
      // Show banner after a short delay for better UX
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookie-consent-change', { detail: 'accepted' }));
    }
    analytics.track('Cookie_Consent_Accepted', {
      consent_type: 'all_cookies'
    });
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookie-consent-change', { detail: 'declined' }));
    }
    analytics.track('Cookie_Consent_Declined', {
      consent_type: 'all_cookies'
    });
  };

  if (!showBanner) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 transition-all duration-300 ${
      isVisible ? 'translate-y-0' : 'translate-y-full'
    }`}>
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">We use cookies to improve your experience</h3>
            <p className="text-sm text-gray-800">
              We use essential cookies for website functionality and analytics cookies to understand how you use our site. 
              By continuing to use our website, you consent to our use of cookies. 
              <Link href="/cookies" className="text-blue-800 hover:text-blue-900 underline ml-1 font-medium">Learn more about our cookie policy</Link>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
