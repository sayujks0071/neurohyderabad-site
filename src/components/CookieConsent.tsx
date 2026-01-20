"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { analytics } from '../lib/analytics';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented (accept legacy key for backward compatibility)
    const consent = localStorage.getItem('analytics-consent') || localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
      // Show banner after a short delay for better UX
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const persistConsent = (value: 'accepted' | 'declined') => {
    // Keep both keys in sync so legacy readers continue to work
    localStorage.setItem('analytics-consent', value === 'accepted' ? 'true' : 'false');
    localStorage.setItem('cookie-consent', value);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookie-consent-change', { detail: value }));
    }
  };

  const handleAccept = () => {
    persistConsent('accepted');
    setShowBanner(false);
    analytics.track('Cookie_Consent_Accepted', {
      consent_type: 'all_cookies'
    });
  };

  const handleDecline = () => {
    persistConsent('declined');
    setShowBanner(false);
    analytics.track('Cookie_Consent_Declined', {
      consent_type: 'all_cookies'
    });
  };

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className={`fixed bottom-0 left-0 right-0 md:left-auto md:right-6 md:bottom-6 md:max-w-[440px] z-50 p-4 md:p-0 transition-all duration-500 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-6 md:p-8">
        <div className="flex flex-col gap-6">
          <div>
            <h3 
              id="cookie-consent-title" 
              className="text-lg font-bold text-slate-800 mb-3"
            >
              We value your privacy
            </h3>
            <p 
              id="cookie-consent-description" 
              className="text-slate-600 text-sm leading-relaxed"
            >
              We use essential cookies for website functionality and analytics cookies to understand how you use our site. 
              By continuing to use our website, you consent to our use of cookies. 
              <Link 
                href="/cookies" 
                className="text-blue-600 hover:text-blue-700 font-medium ml-1 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
              >
                Learn more
              </Link>
            </p>
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3" role="group" aria-label="Cookie consent actions">
            <button
              type="button"
              onClick={handleDecline}
              className="flex-1 bg-white border border-slate-200 text-slate-600 font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              aria-label="Decline cookies"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Accept all cookies"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
