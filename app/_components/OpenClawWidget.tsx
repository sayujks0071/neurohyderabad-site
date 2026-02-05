'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface OpenClawWidgetProps {
  url: string;
}

export default function OpenClawWidget({ url }: OpenClawWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-4 z-[60] p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 bg-gradient-to-r from-blue-600 to-indigo-600 text-white animate-bounce-subtle"
        aria-label={isOpen ? "Close AI Chat" : "Open AI Chat"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
        {!isOpen && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm animate-pulse">
            AI
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-40 right-4 w-[400px] max-w-[calc(100vw-32px)] h-[600px] max-h-[calc(100vh-180px)] bg-white rounded-2xl shadow-2xl border border-gray-200 z-[60] overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
           <iframe
             src={url}
             className="w-full h-full border-none"
             title="Dr. Sayuj AI Assistant"
             allow="microphone"
           />
        </div>
      )}
    </>
  );
}
