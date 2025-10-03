'use client';

import { useWebExperiments, useWebLogger, getPageContext } from '@/app/lib/ab';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface StickyCTAProps {
  onClick: () => void;
  className?: string;
  phoneNumber?: string;
}

export default function StickyCTA({ onClick, className = '', phoneNumber = '+91-98484-17094' }: StickyCTAProps) {
  const { expEnabled, sticky } = useWebExperiments();
  const pathname = usePathname();
  const pageCtx = getPageContext(pathname);
  const { logCTA } = useWebLogger(pageCtx);
  const [isVisible, setIsVisible] = useState(false);

  // Only show on mobile devices
  useEffect(() => {
    const checkDevice = () => {
      setIsVisible(window.innerWidth < 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handleClick = () => {
    logCTA('sticky');
    onClick();
  };

  const handleCallClick = () => {
    logCTA('sticky');
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsAppClick = () => {
    logCTA('sticky');
    window.open(`https://wa.me/919848417094`, '_blank');
  };

  // Get sticky CTA variant with after-hours logic
  const getStickyVariant = () => {
    if (!expEnabled || !sticky?.variant) return 'book_consultation';
    
    // Check for after-hours WhatsApp switching
    if (sticky.enable_after_hours && sticky.variant === 'book_consultation') {
      const now = new Date();
      const istHour = now.getUTCHours() + 5.5; // IST offset
      
      // Switch to WhatsApp after 7 PM IST
      if (istHour >= 19) {
        return 'whatsapp';
      }
    }
    
    return sticky.variant;
  };

  const renderStickyContent = () => {
    const variant = getStickyVariant();
    
    switch (variant) {
      case 'call_now':
        return (
          <button 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={handleCallClick}
            aria-label={`Call Dr. Sayuj at ${phoneNumber}`}
          >
            📞 Call Now: {phoneNumber} (9 AM–7 PM)
          </button>
        );
      
      case 'whatsapp':
        return (
          <button 
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={handleWhatsAppClick}
            aria-label="WhatsApp Dr. Sayuj for consultation"
          >
            💬 WhatsApp Us (after-hours)
          </button>
        );
      
      case 'book_consultation':
      default:
        return (
          <button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={handleClick}
            aria-label="Book consultation with Dr. Sayuj"
          >
            Book Consultation
          </button>
        );
    }
  };

  // Don't render if experiment is disabled or not on mobile
  if (!expEnabled || sticky?.enabled === false || !isVisible) {
    return null;
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg ${className}`}>
      <div className="px-4 py-3">
        {renderStickyContent()}
      </div>
    </div>
  );
}