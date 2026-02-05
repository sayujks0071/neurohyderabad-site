'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { MessageCircle } from 'lucide-react';

// Placeholder that mimics the closed state of the FloatingChatWidget
// This is used for:
// 1. Initial render (lightweight)
// 2. Loading state while the main chunk is being fetched
const PlaceholderButton = (props: React.HTMLAttributes<HTMLButtonElement>) => (
  <button
    className="fixed bottom-24 right-4 z-[60] p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 bg-gradient-to-r from-blue-600 to-indigo-600 text-white animate-bounce-subtle"
    aria-label="Open AI Assistant"
    {...props}
  >
    <MessageCircle size={28} />
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm animate-pulse">
      AI
    </span>
  </button>
);

const FloatingChatWidget = dynamic(() => import('./FloatingChatWidget'), {
  ssr: false,
});

const OpenClawWidget = dynamic(() => import('./OpenClawWidget'), {
  ssr: false,
});

export default function DynamicFloatingChatWidget() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [shouldAutoOpen, setShouldAutoOpen] = useState(false);
  const openClawUrl = process.env.NEXT_PUBLIC_OPENCLAW_URL;

  useEffect(() => {
    // Defer loading until idle (4s) to reduce Total Blocking Time (TBT)
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
          // Keep interaction handlers on fallback in case user clicks while loading
          onClick={handleClick}
        />
      }>
        {openClawUrl ? (
          <OpenClawWidget url={openClawUrl} />
        ) : (
          <FloatingChatWidget autoOpen={shouldAutoOpen} />
        )}
      </Suspense>
    );
  }

  return (
    <PlaceholderButton
      onMouseEnter={handleInteraction}
      onTouchStart={handleInteraction}
      onFocus={handleInteraction}
      onClick={handleClick}
    />
  );
}
