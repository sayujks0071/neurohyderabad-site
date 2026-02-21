'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useStatsigEvents } from '../../src/lib/statsig-events';

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface RealAIBookingAgentProps {
  pageSlug: string;
  service?: string;
}

export default function RealAIBookingAgent({ pageSlug, service }: RealAIBookingAgentProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { logAppointmentBooking, logContactFormSubmit } = useStatsigEvents();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize OpenAI Chat Widget
  useEffect(() => {
    if (typeof window !== 'undefined' && !isInitialized) {
      // Load OpenAI Chat Widget Script
      const script = document.createElement('script');
      script.src = 'https://cdn.openai.com/chatgpt-widget/chatgpt-widget.js';
      script.async = true;
      script.onload = () => {
        // Initialize the widget
        if (window.ChatGPTWidget) {
          window.ChatGPTWidget.init({
            // Replace with your actual agent ID from OpenAI Platform
            agentId: 'YOUR_AGENT_ID_HERE',
            container: chatContainerRef.current,
            // Optional configuration
            theme: 'light',
            placeholder: 'Ask me about booking an appointment...',
            welcomeMessage: 'Hello! I\'m Dr. Sayuj\'s AI assistant. How can I help you book an appointment today?',
            // Event handlers
            onMessage: (message: any) => {
              console.log('AI Message:', message);
              // Log analytics
              logAppointmentBooking('ai_chat_interaction', service || 'general');
            },
            onError: (error: any) => {
              console.error('AI Chat Error:', error);
            }
          });
          setIsInitialized(true);
        }
      };
      document.head.appendChild(script);

      return () => {
        // Cleanup
        if (window.ChatGPTWidget) {
          window.ChatGPTWidget.destroy();
        }
      };
    }
  }, [isInitialized, service, logAppointmentBooking]);

  // Fallback UI while loading
  if (!isInitialized) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-lg">🤖</span>
              </div>
              <div>
                <h3 className="font-semibold">Dr. Sayuj's AI Assistant</h3>
                <p className="text-blue-100 text-sm">Loading AI assistant...</p>
              </div>
            </div>
          </div>
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Initializing AI assistant...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* OpenAI Chat Widget Container */}
      <div 
        ref={chatContainerRef}
        className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
        style={{ minHeight: '500px' }}
      />
      
      {/* Fallback Contact Info */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Having trouble with the AI assistant? Call us directly at{' '}
          <a href="tel:+919778280044" className="text-blue-600 hover:underline font-medium">
            +91-9778280044
          </a>
        </p>
      </div>
    </div>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ChatGPTWidget: {
      init: (config: any) => void;
      destroy: () => void;
    };
  }
}
