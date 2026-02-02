'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import PlaceholderButton from './PlaceholderButton';

const FloatingChatWidget = dynamic(() => import('./FloatingChatWidget'), {
  ssr: false,
});

export default function DynamicFloatingChatWidget() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldAutoOpen, setShouldAutoOpen] = useState(false);

  useEffect(() => {
    // Load after 4 seconds of idle time to minimize TBT
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleInteraction = () => {
    setShouldAutoOpen(true);
    setIsLoaded(true);
  };

  const handleMouseEnter = () => {
    // Preload on hover
    setIsLoaded(true);
  };

  if (!isLoaded) {
    return (
      <PlaceholderButton
        onClick={handleInteraction}
        onMouseEnter={handleMouseEnter}
      />
    );
  }

  return <FloatingChatWidget autoOpen={shouldAutoOpen} />;
}
