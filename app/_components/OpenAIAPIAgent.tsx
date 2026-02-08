'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useStatsigEvents } from '../../src/lib/statsig-events';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';

interface OpenAIAPIAgentProps {
  pageSlug: string;
  service?: string;
}

export default function OpenAIAPIAgent({ pageSlug, service }: OpenAIAPIAgentProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { logAppointmentBooking } = useStatsigEvents();
  const [input, setInput] = useState('');

  // Initial greeting
  const initialMessages = useMemo<UIMessage[]>(() => [
    {
      id: 'initial',
      role: 'assistant',
      parts: [{ type: 'text', text: "Hello! I'm Dr. Sayuj's AI assistant. I'm here to help you book an appointment and understand your condition. How can I assist you today?" }]
    },
  ], []);

  // Configure transport
  const transport = useMemo(() => new DefaultChatTransport({
    api: '/api/ai/chat',
    body: {
      pageSlug,
      service,
    },
  }), [pageSlug, service]);

  const { messages, sendMessage, status } = useChat<UIMessage>({
    transport,
    messages: initialMessages,
    onError: (error) => {
      console.error('Chat error:', error);
    }
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Log user interaction
    logAppointmentBooking('ai_chat_interaction', service || 'general');

    const content = input.trim();
    setInput('');
    await sendMessage({ text: content });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Chat Interface */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        {/* Chat Header */}
        <div className="bg-blue-600 text-white p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-lg">🤖</span>
            </div>
            <div>
              <h3 className="font-semibold">Dr. Sayuj's AI Assistant</h3>
              <p className="text-blue-100 text-sm">Powered by OpenAI & Vercel AI Gateway</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => {
            // Extract content safely
            const content = message.parts
              ? message.parts.filter(p => p.type === 'text').map(p => (p as any).text).join('')
              : (message as any).content || '';

            // Fallback timestamp (UIMessage usually has createdAt)
            const timeString = (message as any).createdAt
              ? new Date((message as any).createdAt).toLocaleTimeString()
              : new Date().toLocaleTimeString();

            return (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-200`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {timeString}
                  </p>
                </div>
              </div>
            );
          })}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={onFormSubmit} className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
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
