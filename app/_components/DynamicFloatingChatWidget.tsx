'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MessageCircle } from 'lucide-react';

const FloatingChatWidget = dynamic(() => import('./FloatingChatWidget'), {
  ssr: false,
});

function PlaceholderButton({ onClick, onMouseEnter }: { onClick?: () => void; onMouseEnter?: () => void }) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className="fixed bottom-24 right-4 z-[60] p-4 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white animate-bounce-subtle transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
      aria-label="Open AI Assistant"
    >
      <MessageCircle size={28} />
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm animate-pulse">
        AI
      </span>
    </button>
  );
}

export default function DynamicFloatingChatWidget() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [autoOpen, setAutoOpen] = useState(false);

  useEffect(() => {
    // Delay load by 4 seconds (idle) to reduce TBT on initial load
    const timer = setTimeout(() => setShouldLoad(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleInteraction = (shouldOpen: boolean) => {
    if (shouldOpen) setAutoOpen(true);
    setShouldLoad(true);
  };

  if (!shouldLoad) {
    return (
      <PlaceholderButton
        onClick={() => handleInteraction(true)}
        onMouseEnter={() => handleInteraction(false)}
      />
    );
  }

  return <FloatingChatWidget autoOpen={autoOpen} />;
}
