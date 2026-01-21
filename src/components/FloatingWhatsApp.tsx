"use client";
import { useState, useEffect } from 'react';
import { analytics } from '../lib/analytics';
import { WhatsAppIcon } from './WhatsAppIcon';

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleClick = () => {
    analytics.track('WhatsApp_Click', {
      location: 'floating_button',
      page_type: 'service'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <a
        href="https://wa.me/919778280044?text=Hi%20Dr.%20Sayuj,%20I%20would%20like%20to%20book%20a%20consultation%20for%20neurosurgery%20treatment."
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        aria-label="Contact Dr. Sayuj on WhatsApp for consultation"
      >
        <WhatsAppIcon className="w-6 h-6" />
      </a>
    </div>
  );
}
