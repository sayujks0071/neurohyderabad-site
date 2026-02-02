'use client';

import { MessageCircle } from 'lucide-react';

interface PlaceholderButtonProps {
  onClick: () => void;
  onMouseEnter: () => void;
}

export default function PlaceholderButton({ onClick, onMouseEnter }: PlaceholderButtonProps) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className="fixed bottom-24 right-4 z-[60] p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 bg-gradient-to-r from-blue-600 to-indigo-600 text-white animate-bounce-subtle"
      aria-label="Open AI Assistant"
    >
      <MessageCircle size={28} />
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm animate-pulse">
        AI
      </span>
    </button>
  );
}
