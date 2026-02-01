'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { MessageCircle } from 'lucide-react';

const PlaceholderButton = ({
  onClick,
  onMouseEnter,
  onFocus
}: {
  onClick?: () => void;
  onMouseEnter?: () => void;
  onFocus?: () => void;
}) => (
  <button
    onMouseEnter={onMouseEnter}
    onFocus={onFocus}
    onClick={onClick}
    className="fixed bottom-24 right-4 z-[60] p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 bg-gradient-to-r from-blue-600 to-indigo-600 text-white animate-bounce-subtle"
    aria-label="Open AI Assistant"
  >
    <MessageCircle size={28} />
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm animate-pulse">
      AI
    </span>
  </button>
);

const FloatingChatWidget = React.lazy(() => import('./FloatingChatWidget'));

export default function DynamicFloatingChatWidget() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [shouldAutoOpen, setShouldAutoOpen] = useState(false);

  useEffect(() => {
    // Defer loading for 4 seconds to avoid TBT during initial page load
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleInteraction = () => {
    setShouldLoad(true);
  };

  const handleClick = () => {
    setShouldLoad(true);
    setShouldAutoOpen(true);
  };

  if (shouldLoad) {
    return (
      <Suspense fallback={
        <PlaceholderButton
          onMouseEnter={handleInteraction}
          onFocus={handleInteraction}
          onClick={handleClick}
        />
      }>
        <FloatingChatWidget autoOpen={shouldAutoOpen} />
      </Suspense>
    );
  }

  return (
    <PlaceholderButton
      onMouseEnter={handleInteraction}
      onFocus={handleInteraction}
      onClick={handleClick}
    />
  );
}
