'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X, Loader2, Minimize2, Maximize2 } from 'lucide-react';

interface OpenClawWidgetProps {
  autoOpen?: boolean;
}

export default function OpenClawWidget({ autoOpen = false }: OpenClawWidgetProps) {
  const [isOpen, setIsOpen] = useState(autoOpen);
  const [isLoading, setIsLoading] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if (autoOpen) {
      setIsOpen(true);
    }
  }, [autoOpen]);

  // Reset loading state when opening
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  const url = process.env.NEXT_PUBLIC_OPENCLAW_URL;

  if (!url) return null;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleOpen}
        className={`fixed bottom-24 right-4 z-[60] p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
          isOpen && !isMinimized
            ? 'bg-gray-800 text-white rotate-90'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white animate-bounce-subtle'
        }`}
        aria-label={isOpen ? (isMinimized ? "Expand chat" : "Close chat") : "Open AI Assistant"}
        aria-expanded={isOpen && !isMinimized}
      >
        {isOpen && !isMinimized ? <X size={24} /> : <MessageCircle size={28} />}
        {!isOpen && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm animate-pulse">
            AI
          </span>
        )}
      </button>

      {/* Minimized State */}
      {isOpen && isMinimized && (
        <div className="fixed bottom-24 right-4 w-[200px] bg-white rounded-lg shadow-lg border border-gray-200 z-[60] p-3 animate-in slide-in-from-bottom-4 fade-in duration-200">
          <button
            onClick={() => setIsMinimized(false)}
            className="w-full text-left text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded flex items-center justify-between"
          >
            <span>Resume Chat</span>
            <Maximize2 size={14} />
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && !isMinimized && (
        <div className="fixed bottom-40 right-4 w-[350px] max-w-[calc(100vw-32px)] h-[500px] max-h-[calc(100vh-180px)] bg-white rounded-2xl shadow-2xl border border-gray-200 z-[60] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 flex justify-between items-center shrink-0">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <span>AI Assistant</span>
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMinimize}
                className="p-1 hover:bg-white/20 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Minimize chat"
              >
                <Minimize2 size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Iframe Container */}
          <div className="flex-1 relative bg-gray-50">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            )}
            <iframe
              src={url}
              className="w-full h-full border-0"
              allow="microphone; camera; geolocation"
              onLoad={() => setIsLoading(false)}
              title="AI Assistant Chat"
            />
          </div>
        </div>
      )}
    </>
  );
}
