'use client';

import { useWebExperiments, useWebLogger, getPageContext } from '@/app/lib/ab';
import { usePathname } from 'next/navigation';

interface HeroCTAProps {
  onClick: () => void;
  className?: string;
  defaultText?: string;
  defaultStyle?: 'primary' | 'outline' | 'success';
}

export default function HeroCTA({ 
  onClick, 
  className = '', 
  defaultText = 'Book Consultation',
  defaultStyle = 'primary'
}: HeroCTAProps) {
  const { expEnabled, hero } = useWebExperiments();
  const pathname = usePathname();
  const pageCtx = getPageContext(pathname);
  const { logCTA } = useWebLogger(pageCtx);

  const label = (expEnabled && hero?.cta_text) || defaultText;
  const style = (expEnabled && hero?.cta_style) || defaultStyle;

  const handleClick = () => {
    logCTA('hero');
    onClick();
  };

  // Style classes based on experiment variant
  const getStyleClasses = () => {
    const baseClasses = 'px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    switch (style) {
      case 'outline':
        return `${baseClasses} bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500`;
      case 'success':
        return `${baseClasses} bg-green-600 hover:bg-green-700 focus:ring-green-500`;
      case 'primary':
      default:
        return `${baseClasses} bg-blue-600 hover:bg-blue-700 focus:ring-blue-500`;
    }
  };

  return (
    <button 
      className={`${getStyleClasses()} ${className}`}
      onClick={handleClick}
      data-testid="hero-cta"
      data-experiment-variant={expEnabled ? style : 'control'}
    >
      {label}
    </button>
  );
}