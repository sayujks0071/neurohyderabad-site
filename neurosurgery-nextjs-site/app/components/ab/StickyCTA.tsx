'use client';

import { useWebExperiments, useWebLogger, getPageContext } from '@/app/lib/ab';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface StickyCTAProps {
  onClick: () => void;
  className?: string;
}

export default function StickyCTA({ onClick, className = '' }: StickyCTAProps) {
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

  // Don't render if experiment is disabled or not on mobile
  if (!expEnabled || sticky?.enabled === false || !isVisible) {
    return null;
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg ${className}`}>
      <div className="px-4 py-3">
        <button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={handleClick}
          data-testid="sticky-cta"
          data-experiment-variant={expEnabled ? 'enabled' : 'control'}
        >
          Book Consultation
        </button>
      </div>
    </div>
  );
}