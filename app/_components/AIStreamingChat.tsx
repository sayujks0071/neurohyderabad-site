'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { useStatsigEvents } from '../../src/lib/statsig-events';

interface AIStreamingChatProps {
  pageSlug: string;
  service?: string;
  initialMessage?: string;
}

/**
 * Enhanced Streaming Chat Component using Vercel AI SDK
 * 
 * Features:
 * - Real-time streaming responses
 * - Better UX with typing indicators
 * - Conversation history management
 * - Emergency detection
 */
export default function AIStreamingChat({ 
  pageSlug, 
  service,
  initialMessage = "Hello! I'm Dr. Sayuj's AI assistant. I can help you book appointments, answer questions about neurosurgical conditions, and provide information about our clinic. How can I assist you today?"
}: AIStreamingChatProps) {
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { logAppointmentBooking, logContactFormSubmit } = useStatsigEvents();

  // Use AI SDK's useChat hook for streaming
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
  } = useChat({
    api: '/api/ai/chat',
    initialMessages: [
      {
        id: 'initial',
        role: 'assistant',
        content: initialMessage,
      },
    ],
    body: {
      pageSlug,
      service,
    },
    onResponse: (response) => {
      // Check for emergency indicators in response headers
      const sources = response.headers.get('X-Sources');
      if (sources) {
        // Could parse sources if needed
      }
    },
    onFinish: (message) => {
      // Log successful interaction
      logContactFormSubmit('ai_streaming_chat', true);
      
      // Check for emergency keywords in response
      const emergencyKeywords = ['emergency', 'urgent', 'immediately', 'call', 'stroke', 'seizure'];
      const hasEmergency = emergencyKeywords.some(keyword => 
        message.content.toLowerCase().includes(keyword)
      );
      
      if (hasEmergency) {
        setShowEmergencyAlert(true);
      }
    },
    onError: (error) => {
      console.error('Chat error:', error);
      logContactFormSubmit('ai_streaming_chat', false);
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Log user interaction
    logAppointmentBooking('ai_streaming_interaction', service || 'general');
    
    handleSubmit(e);
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
      {/* Emergency Alert */}
      {showEmergencyAlert && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg animate-pulse">
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
              <p className="text-blue-100 text-sm">Powered by Vercel AI SDK</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          
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

          {error && (
            <div className="flex justify-start">
              <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg">
                <p className="text-sm">
                  {error.message || "I'm having trouble right now. Please call +91-9778280044 for immediate assistance."}
                </p>
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
                  onClick={() => {
                    // Set input value and submit
                    const syntheticEvent = {
                      preventDefault: () => {},
                      target: { value: action }
                    } as any;
                    handleInputChange({ target: { value: action } } as any);
                    setTimeout(() => {
                      const form = document.querySelector('form');
                      if (form) {
                        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
                        form.dispatchEvent(submitEvent);
                      }
                    }, 100);
                  }}
                  className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={onSubmit} className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message here..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
      </div>

      {/* Features Info */}
      <div className="mt-6 grid md:grid-cols-3 gap-4 text-center">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl mb-2">⚡</div>
          <h4 className="font-semibold text-blue-800">Streaming Responses</h4>
          <p className="text-sm text-blue-600">Real-time AI responses</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl mb-2">🔒</div>
          <h4 className="font-semibold text-green-800">Secure & Private</h4>
          <p className="text-sm text-green-600">HIPAA-compliant handling</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-2xl mb-2">🧠</div>
          <h4 className="font-semibold text-purple-800">AI Powered</h4>
          <p className="text-sm text-purple-600">Advanced AI technology</p>
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

