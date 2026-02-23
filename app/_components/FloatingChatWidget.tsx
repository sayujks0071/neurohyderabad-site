'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { useStatsigEvents } from '../../src/lib/statsig-events';
import { trackMiddlewareEvent } from '@/src/lib/middleware/rum';
import { MessageCircle, X, Send, AlertTriangle, Loader2, Sparkles, Minus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useChat } from '@ai-sdk/react';
// import { type Message } from 'ai';
type Message = any;

/**
 * Floating AI Chat Widget using Vercel AI Gateway
 *
 * Features:
 * - Global availability via floating button
 * - Real-time streaming responses (via useChat)
 * - Emergency detection
 * - Compact design
 */

interface FloatingChatWidgetProps {
  autoOpen?: boolean;
}

export default function FloatingChatWidget({ autoOpen = false }: FloatingChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(autoOpen);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if (autoOpen) {
      setIsOpen(true);
    }
  }, [autoOpen]);
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);

  // Manual input state
  const [input, setInput] = useState('');

  // Page context state
  const [pageTitle, setPageTitle] = useState('');
  const [pageDescription, setPageDescription] = useState('');
  const pathname = usePathname();

  // Update page context on navigation
  useEffect(() => {
    // Small delay to ensure document title and meta tags are updated by Next.js
    const timer = setTimeout(() => {
      setPageTitle(document.title);
      const metaDesc = document.querySelector('meta[name="description"]');
      setPageDescription(metaDesc ? metaDesc.getAttribute('content') || '' : '');
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Statsig hooks
  const { logAppointmentBooking, logContactFormSubmit } = useStatsigEvents();

  // Initial greeting
  const initialMessages = useMemo<Message[]>(() => [
    {
      id: 'initial',
      role: 'assistant',
      content: "Hello! I'm Dr. Sayuj's AI assistant. I can help you with appointments, condition info, and more. How can I help?"
    },
  ], []);

  // Use Vercel AI SDK useChat hook
  const { messages, append, status, error } = useChat(({
    api: '/api/ai/chat',
    body: {
      pageSlug: pathname || 'global',
      pageTitle,
      pageDescription,
      service: 'floating_widget',
    },
    initialMessages,
    onFinish: (message: any) => {
      const content = message.content;

      trackMiddlewareEvent('chat_response_received', {
        source: 'floating_widget',
        success: true
      });

      // Check for emergency keywords
      const emergencyKeywords = ['emergency', 'urgent', 'immediately', 'call', 'stroke', 'seizure'];
      const hasEmergency = emergencyKeywords.some((keyword: string) =>
        content.toLowerCase().includes(keyword)
      );

      if (hasEmergency) {
        setShowEmergencyAlert(true);
        trackMiddlewareEvent('chat_emergency_detected', {
          source: 'floating_widget'
        });
      }

      logContactFormSubmit('ai_chat_widget', true);
    },
    onError: (error: any) => {
      console.error('Chat error:', error);
      logContactFormSubmit('ai_chat_widget', false);
      trackMiddlewareEvent('chat_error', {
        source: 'floating_widget',
        error: error.message
      });
    }
  }) as any) as any;

  const isLoading = status === 'submitted' || status === 'streaming';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      // Focus input when opened
      setTimeout(() => inputRef.current?.focus(), 100);

      // Track widget open
      trackMiddlewareEvent('chat_widget_open', {
        page_slug: pathname || 'unknown'
      });
    }
  }, [isOpen, isMinimized]);

  // Scroll on new messages
  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Log user interaction
    logAppointmentBooking('ai_chat_widget_interaction', 'general');
    trackMiddlewareEvent('chat_message_sent', {
      source: 'floating_widget',
      page_slug: pathname || 'unknown'
    });

    await append({ role: 'user', content: content.trim() });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Log interaction
    logAppointmentBooking('ai_chat_widget_interaction', 'general');
    trackMiddlewareEvent('chat_message_sent', {
      source: 'floating_widget',
      page_slug: pathname || 'unknown'
    });

    const content = input;
    setInput('');
    await append({ role: 'user', content: content.trim() });
  };

  const quickActions = [
    "Book consultation",
    "Clinic hours?",
    "Cost of surgery?",
    "Emergency help"
  ];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => {
          if (isOpen && isMinimized) {
            setIsMinimized(false);
          } else {
            setIsOpen((prev) => !prev);
            setIsMinimized(false);
          }
        }}
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
            className="w-full text-left text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            Click to expand chat
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && !isMinimized && (
        <div className="fixed bottom-40 right-4 w-[350px] max-w-[calc(100vw-32px)] h-[500px] max-h-[calc(100vh-180px)] bg-white rounded-2xl shadow-2xl border border-gray-200 z-[60] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-lg">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Dr. Sayuj's AI Assistant</h3>
                <p className="text-xs text-blue-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 hover:bg-white/20 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Minimize chat"
              >
                <Minus size={18} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Emergency Alert */}
          {showEmergencyAlert && (
            <div className="bg-red-50 p-3 border-b border-red-100 flex items-start gap-2 shrink-0">
              <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={16} />
              <p className="text-xs text-red-700 font-medium">
                Emergency? Call <a href="tel:+919778280044" className="underline font-bold focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-1">+91-9778280044</a>
              </p>
            </div>
          )}

          {/* Messages Area */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
            role="log"
            aria-live="polite"
          >
            {messages.map((message: any) => {
              // Extract text content directly
              const content = message.content;

              // Skip messages with empty content (e.g. tool calls) unless we want to show a spinner
              if (!content && message.role !== 'assistant') return null;
              if (!content && message.role === 'assistant') {
                 // Check if it has tool invocations, if so maybe show "Processing..."
                 // For now, just skip empty messages to avoid empty bubbles
                 return null;
              }

              return (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-200`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">{content || '...'}</p>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 shadow-sm px-3 py-2 rounded-2xl rounded-bl-none">
                  <div className="flex items-center space-x-2">
                    <Loader2 size={14} className="animate-spin text-blue-600" />
                    <span className="text-xs text-gray-500">
                       {messages[messages.length - 1]?.role === 'assistant' ? 'Typing...' : 'Thinking...'}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            {error && (
              <div className="flex justify-start">
                <div className="bg-red-50 border border-red-200 shadow-sm px-3 py-2 rounded-2xl rounded-bl-none">
                  <p className="text-xs text-red-700">
                    {error.message || "I'm having trouble right now. Please call +91-9778280044 for immediate assistance."}
                  </p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions (only if few messages) */}
          {messages.length <= 2 && !isLoading && (
            <div className="px-4 py-2 bg-gray-50/50 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(action)}
                  className="whitespace-nowrap px-3 py-1 bg-white border border-blue-100 text-blue-600 text-xs rounded-full hover:bg-blue-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                >
                  {action}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <form onSubmit={onSubmit} className="p-3 border-t border-gray-100 bg-white shrink-0">
            <div className="flex items-center gap-2 relative">
              <label htmlFor="chat-input" className="sr-only">Ask a question</label>
              <input
                id="chat-input"
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="w-full pl-4 pr-10 py-2.5 bg-gray-100 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!input.trim() || isLoading}
                className="absolute right-1.5 p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              >
                <Send size={14} />
              </button>
            </div>
            <p className="text-[10px] text-center text-gray-400 mt-2">
              AI can make mistakes. For emergencies call +91-9778280044.
            </p>
          </form>
        </div>
      )}
    </>
  );
}
