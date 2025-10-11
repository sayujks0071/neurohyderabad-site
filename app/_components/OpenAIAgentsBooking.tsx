'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useStatsigEvents } from '../../src/lib/statsig-events';

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  action?: string;
  data?: any;
  isEmergency?: boolean;
}

interface OpenAIAgentsBookingProps {
  pageSlug: string;
  service?: string;
}

export default function OpenAIAgentsBooking({ pageSlug, service }: OpenAIAgentsBookingProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm Dr. Sayuj's AI assistant. I can help you book appointments, reschedule, cancel, or answer questions about our clinic. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { logAppointmentBooking, logContactFormSubmit } = useStatsigEvents();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const callOpenAIAgents = async (userMessage: string): Promise<{response: string, action: string, data: any, isEmergency: boolean}> => {
    try {
      const response = await fetch('/api/openai-agents-simple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          pageSlug,
          service,
          conversationHistory: messages.slice(-10) // Last 10 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      return {
        response: data.response,
        action: data.action,
        data: data.data,
        isEmergency: data.isEmergency
      };
    } catch (error) {
      console.error('OpenAI Agents API Error:', error);
      return {
        response: "I apologize, but I'm having trouble processing your request right now. Please call us directly at +91-9778280044 for immediate assistance.",
        action: "fallback_manual",
        data: {},
        isEmergency: false
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Log user interaction
      logAppointmentBooking('ai_agents_interaction', service || 'general');

      const aiResponse = await callOpenAIAgents(inputValue);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse.response,
        timestamp: new Date(),
        action: aiResponse.action,
        data: aiResponse.data,
        isEmergency: aiResponse.isEmergency
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Handle emergency detection
      if (aiResponse.isEmergency) {
        setShowEmergencyAlert(true);
      }

      // Log successful interaction
      logContactFormSubmit('ai_agents_booking', true);

    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I apologize, but I'm having trouble processing your request right now. Please call us directly at +91-9778280044 for immediate assistance.",
        timestamp: new Date(),
        action: "fallback_manual"
      };
      setMessages(prev => [...prev, errorMessage]);
      logContactFormSubmit('ai_agents_booking', false);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    "I need to book a new consultation",
    "I want to reschedule my appointment",
    "I need to cancel my appointment",
    "What are your clinic hours?",
    "I have severe headache and dizziness",
    "I need information about spine surgery"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Emergency Alert */}
      {showEmergencyAlert && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <div className="flex items-center">
            <div className="text-2xl mr-3">🚨</div>
            <div>
              <h3 className="font-bold">Emergency Detected</h3>
              <p className="text-sm">
                If this is a medical emergency, please call <strong>+91-9778280044</strong> immediately 
                or visit the nearest emergency room.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chat Interface */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
              <span className="text-lg">🤖</span>
            </div>
            <div>
              <h3 className="font-semibold">Dr. Sayuj's AI Assistant</h3>
              <p className="text-blue-100 text-sm">Powered by OpenAI Agents</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : message.isEmergency
                    ? 'bg-red-100 text-red-800 border border-red-200'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
                {message.action && message.action !== 'fallback_manual' && (
                  <div className="mt-2 text-xs opacity-60">
                    Action: {message.action}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm">AI agents are working...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length <= 1 && (
          <div className="p-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">Quick actions:</p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(action)}
                  className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      </div>

      {/* Features Info */}
      <div className="mt-6 grid md:grid-cols-3 gap-4 text-center">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl mb-2">🛡️</div>
          <h4 className="font-semibold text-blue-800">Guardrails Protected</h4>
          <p className="text-sm text-blue-600">Advanced safety and content filtering</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl mb-2">🔧</div>
          <h4 className="font-semibold text-green-800">Tool Integration</h4>
          <p className="text-sm text-green-600">Real booking and scheduling tools</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-2xl mb-2">🧠</div>
          <h4 className="font-semibold text-purple-800">GPT-5 Powered</h4>
          <p className="text-sm text-purple-600">Latest AI technology</p>
        </div>
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
