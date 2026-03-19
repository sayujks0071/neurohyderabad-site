// @ts-nocheck
'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { trackMiddlewareEvent } from '@/src/lib/middleware/rum';
import { MessageCircle, X, Send, AlertTriangle, Loader2, Sparkles, Minus, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useChat } from '@ai-sdk/react';
import { Shimmer } from "@/src/components/ai-elements/shimmer";
type Message = any;

/**
 * Floating AI Chat Widget — Scoped Booking & Navigation Assistant
 *
 * Scope: appointment booking, clinic info, procedure discovery, published FAQs.
 * Escalates clinical/diagnostic questions to WhatsApp/phone.
 *
 * Tracking events (7):
 *   1. widget_open          — widget opened
 *   2. chat_first_message   — first user message in session
 *   3. chat_appointments_click — CTA click to appointments
 *   4. chat_whatsapp_click  — CTA click to WhatsApp
 *   5. chat_phone_click     — phone number clicked
 *   6. chat_form_submit     — lead/booking form submitted
 *   7. chat_qualified_handoff — clinical question escalated to human
 */

const WHATSAPP_URL = 'https://wa.me/919778280044?text=Hi%2C%20I%20would%20like%20to%20book%20an%20appointment%20with%20Dr.%20Sayuj.';
const PHONE_NUMBER = '+919778280044';
const PHONE_DISPLAY = '+91 97782 80044';

// Track events to GA4 + middleware RUM
function trackEvent(name: string, props: Record<string, string> = {}) {
  trackMiddlewareEvent(name, { source: 'chat_widget', ...props });
  // Also push to GA4 dataLayer if available
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({ event: name, ...props });
  }
}

interface FloatingChatWidgetProps {
  autoOpen?: boolean;
}

export default function FloatingChatWidget({ autoOpen = false }: FloatingChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(autoOpen);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasTrackedFirstMessage, setHasTrackedFirstMessage] = useState(false);
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);
  const [input, setInput] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const [pageDescription, setPageDescription] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    if (autoOpen) setIsOpen(true);
  }, [autoOpen]);

  // Update page context on navigation
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageTitle(document.title);
      const metaDesc = document.querySelector('meta[name="description"]');
      setPageDescription(metaDesc ? metaDesc.getAttribute('content') || '' : '');
    }, 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initialMessages = useMemo<Message[]>(() => [
    {
      id: 'initial',
      role: 'assistant',
      content: "Hi! I can help you book an appointment with Dr. Sayuj, find information about our services, or connect you with our team. How can I help?"
    },
  ], []);

  const { messages, append, status, error } = useChat({
    api: '/api/ai/chat',
    body: {
      pageSlug: pathname || 'global',
      pageTitle,
      pageDescription,
      service: 'floating_widget',
    },
    initialMessages,
    onFinish: (message) => {
      const content = message.content?.toLowerCase() || '';

      // Detect emergency keywords
      const emergencyKeywords = ['emergency', 'immediately', 'call +91', 'nearest emergency'];
      if (emergencyKeywords.some(kw => content.includes(kw))) {
        setShowEmergencyAlert(true);
      }

      // EVENT 6: chat_form_submit — detect successful booking via tool result or assistant confirmation
      const bookingSuccessIndicators = [
        'appointment booked successfully',
        'confirmation email has been sent',
        'coordinator will call you shortly to confirm',
      ];
      if (bookingSuccessIndicators.some(indicator => content.includes(indicator))) {
        trackEvent('chat_form_submit', { page_slug: pathname || '/' });
      }

      // EVENT 7: qualified_handoff — detect when assistant escalates to human
      const handoffIndicators = [
        'whatsapp us',
        'call directly',
        'dr. sayuj would assess',
        'dr. sayuj would need to evaluate',
        'speak with our team',
        'book a consultation',
      ];
      if (handoffIndicators.some(indicator => content.includes(indicator))) {
        trackEvent('chat_qualified_handoff', { page_slug: pathname || '/' });
      }
    },
    onError: (err) => {
      console.error('Chat error:', err);
      trackEvent('chat_error', { error: err.message });
    }
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // EVENT 1: widget_open
  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 100);
      trackEvent('widget_open', { page_slug: pathname || '/' });
    }
  }, [isOpen, isMinimized, pathname, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !isMinimized) scrollToBottom();
  }, [messages, isOpen, isMinimized, scrollToBottom]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // EVENT 2: first_message (only once per session)
    if (!hasTrackedFirstMessage) {
      trackEvent('chat_first_message', { page_slug: pathname || '/' });
      setHasTrackedFirstMessage(true);
    }

    const content = input;
    setInput('');
    await append({ role: 'user', content: content.trim() });
  };

  const handleQuickAction = async (content: string) => {
    if (isLoading) return;
    if (!hasTrackedFirstMessage) {
      trackEvent('chat_first_message', { page_slug: pathname || '/', via: 'quick_action' });
      setHasTrackedFirstMessage(true);
    }
    await append({ role: 'user', content });
  };

  // EVENT 3: appointments_click
  const handleAppointmentsClick = () => {
    trackEvent('chat_appointments_click', { page_slug: pathname || '/' });
  };

  // EVENT 4: whatsapp_click
  const handleWhatsAppClick = () => {
    trackEvent('chat_whatsapp_click', { page_slug: pathname || '/' });
  };

  // EVENT 5: phone_click
  const handlePhoneClick = () => {
    trackEvent('chat_phone_click', { page_slug: pathname || '/' });
  };

  const quickActions = [
    "Book an appointment",
    "Clinic hours & location",
    "What services do you offer?",
    "Cost of spine surgery?",
  ];

  // Hide on appointments page
  if (pathname === '/appointments') return null;

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
        className={`fixed bottom-24 right-4 z-[60] p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-300)] ${
          isOpen && !isMinimized
            ? 'bg-[var(--color-text-primary)] text-white rotate-90'
            : 'bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-700)] text-white animate-bounce-subtle'
        }`}
        aria-label={isOpen ? (isMinimized ? "Expand chat" : "Close chat") : "Open booking assistant"}
        aria-expanded={isOpen && !isMinimized}
      >
        {isOpen && !isMinimized ? <X size={24} /> : <MessageCircle size={28} />}
        {!isOpen && (
          <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
            Book
          </span>
        )}
      </button>

      {/* Minimized State */}
      {isOpen && isMinimized && (
        <div className="fixed bottom-24 right-4 w-[200px] bg-[var(--color-surface)] rounded-lg shadow-lg border border-[var(--color-border)] z-[60] p-3 animate-in slide-in-from-bottom-4 fade-in duration-200">
          <button
            onClick={() => setIsMinimized(false)}
            className="w-full text-left text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary-500)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] rounded"
          >
            Click to expand chat
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && !isMinimized && (
        <div className="fixed bottom-40 right-4 w-[350px] max-w-[calc(100vw-32px)] h-[500px] max-h-[calc(100vh-180px)] bg-[var(--color-surface)] rounded-2xl shadow-2xl border border-[var(--color-border)] z-[60] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-700)] text-white p-4 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-lg">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Booking Assistant</h3>
                <p className="text-xs text-[var(--color-primary-100)] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[var(--color-success)] rounded-full animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 hover:bg-white/20 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Minimize chat"
              >
                <Minus size={18} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Emergency Alert */}
          {showEmergencyAlert && (
            <div role="alert" className="bg-red-50 p-3 border-b border-red-200 flex items-start gap-2 shrink-0">
              <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={16} />
              <p className="text-xs text-red-800 font-medium">
                Emergency? Call{' '}
                <a href={`tel:${PHONE_NUMBER}`} onClick={handlePhoneClick} className="underline font-bold">
                  {PHONE_DISPLAY}
                </a>
              </p>
            </div>
          )}

          {/* Messages Area */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--color-background)]/50 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
            role="log"
            aria-live="polite"
          >
            {messages.map((message) => {
              const content = message.content;
              if (!content) return null;

              return (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-200`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${
                      message.role === 'user'
                        ? 'bg-[var(--color-primary-500)] text-white rounded-br-none'
                        : 'bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)] shadow-sm rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">{content}</p>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm px-3 py-2 rounded-2xl rounded-bl-none">
                  <div className="flex items-center space-x-2">
                    <Loader2 size={14} className="animate-spin text-[var(--color-primary-500)]" />
                    <Shimmer as="span" className="text-xs text-[var(--color-text-secondary)]">
                      {messages[messages.length - 1]?.role === 'assistant' ? 'Typing...' : 'Thinking...'}
                    </Shimmer>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="flex justify-start">
                <div className="bg-red-50 border border-red-200 shadow-sm px-3 py-2 rounded-2xl rounded-bl-none">
                  <p className="text-xs text-red-700">
                    Sorry, something went wrong. Please call{' '}
                    <a href={`tel:${PHONE_NUMBER}`} onClick={handlePhoneClick} className="underline font-bold">
                      {PHONE_DISPLAY}
                    </a>{' '}
                    for immediate help.
                  </p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions (first interaction only) */}
          {messages.length <= 2 && !isLoading && (
            <div className="px-4 py-2 bg-[var(--color-background)]/50 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickAction(action)}
                  className="whitespace-nowrap px-3 py-1 bg-[var(--color-surface)] border border-[var(--color-primary-100)] text-[var(--color-primary-500)] text-xs rounded-full hover:bg-[var(--color-primary-50)] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:ring-offset-1"
                >
                  {action}
                </button>
              ))}
            </div>
          )}

          {/* Contact CTAs (shows after initial interaction) */}
          {messages.length > 2 && !isLoading && (
            <div className="px-4 py-2 bg-[var(--color-primary-50)]/50 flex flex-wrap gap-2 justify-center shrink-0 border-t border-[var(--color-primary-100)]">
              <a
                href="/appointments"
                onClick={handleAppointmentsClick}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-primary-600)] text-white text-xs font-medium rounded-full hover:bg-[var(--color-primary-700)] transition-colors shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Book Appointment
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] text-white text-xs font-medium rounded-full hover:bg-[#128C7E] transition-colors shadow-sm"
              >
                WhatsApp
              </a>
              <a
                href={`tel:${PHONE_NUMBER}`}
                onClick={handlePhoneClick}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-600 text-white text-xs font-medium rounded-full hover:bg-slate-700 transition-colors shadow-sm"
              >
                <Phone size={12} />
                Call
              </a>
            </div>
          )}

          {/* Input Area */}
          <form onSubmit={onSubmit} className="p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)] shrink-0">
            <div className="flex items-center gap-2 relative">
              <label htmlFor="chat-input" className="sr-only">Ask a question</label>
              <input
                id="chat-input"
                name="prompt"
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about appointments, services..."
                aria-label="Ask a question"
                className="w-full pl-4 pr-10 py-2.5 bg-[var(--color-background)] border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]/50 focus:bg-[var(--color-surface)] transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!input.trim() || isLoading}
                className="absolute right-1.5 p-1.5 bg-[var(--color-primary-500)] text-white rounded-full hover:bg-[var(--color-primary-700)] disabled:opacity-50 disabled:hover:bg-[var(--color-primary-500)] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:ring-offset-1"
              >
                <Send size={14} />
              </button>
            </div>
            <p className="text-[10px] text-center text-[var(--color-text-secondary)] mt-2">
              For medical advice, please book a consultation. Emergencies: {PHONE_DISPLAY}
            </p>
          </form>
        </div>
      )}
    </>
  );
}
