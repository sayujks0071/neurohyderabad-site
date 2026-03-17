'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useStatsigEvents } from '../../src/lib/statsig-events';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { Shimmer } from "@/src/components/ai-elements/shimmer";
import { Suggestion, Suggestions } from "@/src/components/ai-elements/suggestion";

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


  const handleQuickAction = async (action: string) => {
    // Log user interaction
    logAppointmentBooking('ai_chat_interaction_quick_action', service || 'general');

    await sendMessage({ text: action });
  };

  const quickActions = [
    "I need to book a new consultation",
    "I want to reschedule my appointment",
    "I have severe headache and dizziness",
    "I need information about spine surgery",
    "What are your clinic hours?",
    "Tell me about endoscopic spine surgery"
  ];
  return (
    <div className="max-w-4xl mx-auto">
      {/* Chat Interface */}
      <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-lg overflow-hidden">
        {/* Chat Header */}
        <div className="bg-[var(--color-primary-500)] text-white p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[var(--color-primary-50)]0 rounded-full flex items-center justify-center mr-3">
              <span className="text-lg">🤖</span>
            </div>
            <div>
              <h3 className="font-semibold">Dr. Sayuj's AI Assistant</h3>
              <p className="text-[var(--color-primary-100)] text-sm">Powered by OpenAI & Vercel AI Gateway</p>
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
                      ? 'bg-[var(--color-primary-500)] text-white'
                      : 'bg-[var(--color-background)] text-[var(--color-text-primary)]'
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
              <div className="bg-[var(--color-background)] text-[var(--color-text-primary)] px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[var(--color-primary-500)]"></div>
                  <Shimmer as="span" className="text-sm">AI is thinking...</Shimmer>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length <= 1 && (
          <div className="p-4 border-t border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">Quick actions:</p>
            <Suggestions>
              {quickActions.map((action, index) => (
                <Suggestion
                  key={index}
                  onClick={() => handleQuickAction(action)}
                  suggestion={action}
                  disabled={isLoading}
                  className="bg-[var(--color-primary-50)] text-[var(--color-primary-700)] hover:bg-[var(--color-primary-100)] transition-colors disabled:opacity-50"
                />
              ))}
            </Suggestions>
          </div>
        )}

        {/* Input Form */}
        <form
          onSubmit={onFormSubmit}
          className="p-4 border-t border-[var(--color-border)]"
          toolname="askAIAssistant"
          tooldescription="Ask Dr. Sayuj's AI assistant a question about neurosurgery, appointments, or clinic information."
          toolautosubmit="false"
        >
          <div className="flex space-x-2">
            <input
              type="text"
              name="prompt"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              aria-label="Ask a question"
              className="flex-1 px-3 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-4 py-2 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-700)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      </div>

      {/* Fallback Contact Info */}
      <div className="mt-6 text-center">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Prefer to speak directly? Call us at{' '}
          <a href="tel:+919778280044" className="text-[var(--color-primary-500)] hover:underline font-medium">
            +91-9778280044
          </a>
        </p>
      </div>
    </div>
  );
}
