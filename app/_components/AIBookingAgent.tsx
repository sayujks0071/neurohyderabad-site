'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { Loader2, Send } from 'lucide-react';
import { useStatsigEvents } from '../../src/lib/statsig-events';

interface AIBookingAgentProps {
  pageSlug: string;
  service?: string;
}

const EMERGENCY_KEYWORDS = [
  'stroke', 'seizure', 'unconscious', 'severe headache', 'sudden weakness',
  'paralysis', 'loss of vision', 'severe neck pain', 'trauma', 'accident',
  'emergency', 'urgent', 'critical', 'immediate', 'can\'t move', 'numbness',
  'confusion', 'difficulty speaking', 'facial droop', 'severe dizziness'
];

export default function AIBookingAgent({ pageSlug, service }: AIBookingAgentProps) {
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { logAppointmentBooking } = useStatsigEvents();

  // Get page title on mount
  useEffect(() => {
    if (typeof document !== 'undefined') {
      setPageTitle(document.title);
    }
  }, []);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput, append } = useChat({
    api: '/api/ai/chat',
    body: {
      pageTitle: pageTitle,
      pageContent: `Context: User is on page "${pageSlug}" related to service "${service || 'General Neurosurgery'}".`
    },
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hello! I'm Dr. Sayuj's AI assistant. I can help you book appointments, understand your condition, or answer questions about our clinic. How can I assist you today?"
      }
    ],
    onFinish: (message) => {
      // Log interaction when AI responds
      logAppointmentBooking('ai_chat_interaction', service || 'general');
    },
    onError: (error) => {
      console.error('AI Chat Error:', error);
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectEmergency = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return EMERGENCY_KEYWORDS.some(keyword => lowerText.includes(keyword));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const safeInput = input || '';
    if (!safeInput.trim() || isLoading) return;

    // Client-side emergency check
    if (detectEmergency(safeInput)) {
      setShowEmergencyAlert(true);
      // We still let the AI respond as it has emergency protocols too
    } else {
      setShowEmergencyAlert(false);
    }

    handleSubmit(e);
  };

  const quickActions = [
    "I have back pain and need an appointment",
    "I need to see Dr. Sayuj for a brain condition",
    "I have severe headaches",
    "I need a second opinion",
    "Where is the clinic located?"
  ];

  const handleQuickAction = (action: string) => {
    // Check emergency for quick actions too
    if (detectEmergency(action)) {
      setShowEmergencyAlert(true);
    }

    append({
      role: 'user',
      content: action
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Emergency Alert */}
      {showEmergencyAlert && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center">
            <div className="text-2xl mr-3">🚨</div>
            <div>
              <h3 className="font-bold">Possible Emergency Detected</h3>
              <p className="text-sm">
                If this is a medical emergency, please call <strong>+91-9778280044</strong> immediately 
                or visit the nearest emergency room.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chat Interface */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden flex flex-col h-[600px]">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 shrink-0">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-3 border border-white/30">
              <span className="text-xl">🤖</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Dr. Sayuj's AI Assistant</h3>
              <p className="text-blue-100 text-sm">Powered by Vercel AI Gateway</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] lg:max-w-[75%] px-5 py-3 rounded-2xl shadow-sm ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                }`}
              >
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </div>
                {/* Check for tool invocations/results if we want to show them?
                    Usually we just show the assistant's text response.
                    The SDK hides tool calls by default in `content` unless they are separate messages.
                */}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 text-gray-800 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span className="text-sm text-gray-500">Thinking...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions - Only show if no interaction yet or just starting */}
        {messages.length <= 1 && (
          <div className="p-4 bg-white border-t border-gray-100 shrink-0">
            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Suggested Actions</p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action)}
                  className="text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100 font-medium"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleFormSubmit} className="p-4 bg-white border-t border-gray-200 shrink-0">
          <div className="flex gap-2 relative">
            <input
              type="text"
              value={input || ''}
              onChange={handleInputChange}
              placeholder="Type your message here..."
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!(input || '').trim() || isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex items-center justify-center min-w-[60px]"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-xs text-center text-gray-400 mt-2">
            AI can make mistakes. Please verify critical information.
          </p>
        </form>
      </div>

      {/* Fallback Contact Info */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Prefer to speak directly? Call us at{' '}
          <a href="tel:+919778280044" className="text-blue-600 hover:underline font-medium">
            +91-9778280044
          </a>
        </p>
      </div>
    </div>
  );
}
