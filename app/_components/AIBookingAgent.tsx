'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useStatsigEvents } from '../../src/lib/statsig-events';

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  isEmergency?: boolean;
}

interface BookingData {
  name?: string;
  phone?: string;
  email?: string;
  condition?: string;
  urgency?: 'routine' | 'urgent' | 'emergency';
  preferredDate?: string;
  preferredTime?: string;
  symptoms?: string[];
  previousTreatment?: string;
  insurance?: string;
}

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

const CONDITION_KEYWORDS = {
  'brain_tumor': ['brain tumor', 'tumor', 'mass', 'lesion', 'growth'],
  'spine_surgery': ['back pain', 'spine', 'disc', 'herniated', 'sciatica', 'stenosis'],
  'epilepsy': ['seizure', 'epilepsy', 'convulsion', 'fits'],
  'trigeminal_neuralgia': ['facial pain', 'trigeminal', 'neuralgia', 'jaw pain'],
  'peripheral_nerve': ['nerve pain', 'peripheral', 'carpal tunnel', 'ulnar']
};

export default function AIBookingAgent({ pageSlug, service }: AIBookingAgentProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm Dr. Sayuj's AI assistant. I'm here to help you book an appointment and understand your condition. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({});
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);
  const [currentStep, setCurrentStep] = useState<'greeting' | 'condition' | 'urgency' | 'details' | 'scheduling' | 'confirmation'>('greeting');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { logAppointmentBooking, logContactFormSubmit } = useStatsigEvents();

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

  const detectCondition = (text: string): string | null => {
    const lowerText = text.toLowerCase();
    for (const [condition, keywords] of Object.entries(CONDITION_KEYWORDS)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        return condition;
      }
    }
    return null;
  };

  const extractPhoneNumber = (text: string): string | null => {
    const phoneRegex = /(\+91|91)?[6-9]\d{9}/;
    const match = text.match(phoneRegex);
    return match ? match[0] : null;
  };

  const extractEmail = (text: string): string | null => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const match = text.match(emailRegex);
    return match ? match[0] : null;
  };

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    const isEmergency = detectEmergency(userMessage);
    const detectedCondition = detectCondition(userMessage);
    const phoneNumber = extractPhoneNumber(userMessage);
    const email = extractEmail(userMessage);

    // Update booking data with extracted information
    const updatedBookingData = {
      ...bookingData,
      ...(phoneNumber && { phone: phoneNumber }),
      ...(email && { email }),
      ...(detectedCondition && { condition: detectedCondition }),
      ...(isEmergency && { urgency: 'emergency' as const })
    };
    setBookingData(updatedBookingData);

    // Emergency detection
    if (isEmergency) {
      setShowEmergencyAlert(true);
      return "🚨 I've detected this may be an emergency situation. Please call our emergency hotline immediately at +91-9778280044 or visit the nearest emergency room. I can still help you book an urgent appointment, but your safety is our priority.";
    }

    // Generate contextual response based on current step and user input
    switch (currentStep) {
      case 'greeting':
        if (detectedCondition || userMessage.toLowerCase().includes('appointment') || userMessage.toLowerCase().includes('book')) {
          setCurrentStep('condition');
          return "I'd be happy to help you book an appointment with Dr. Sayuj Krishnan. Could you tell me more about your condition or symptoms? This will help me understand how urgent your appointment should be.";
        }
        return "I'm here to help you with your neurosurgical care needs. Are you looking to book an appointment, or do you have questions about a specific condition?";

      case 'condition':
        if (detectedCondition) {
          setCurrentStep('urgency');
          return `I understand you're dealing with ${detectedCondition.replace('_', ' ')}. How urgent is your condition? Are you experiencing severe pain, or is this for a routine consultation?`;
        }
        return "Could you describe your symptoms or condition in more detail? This helps me determine the best type of appointment for you.";

      case 'urgency':
        const urgencyLevel = userMessage.toLowerCase().includes('severe') || userMessage.toLowerCase().includes('urgent') ? 'urgent' : 'routine';
        setBookingData(prev => ({ ...prev, urgency: urgencyLevel }));
        setCurrentStep('details');
        return `Thank you. I'll mark this as a ${urgencyLevel} appointment. Now, could you please provide your name and contact information? I'll need your phone number for confirmation.`;

      case 'details':
        if (phoneNumber) {
          setCurrentStep('scheduling');
          return `Perfect! I have your phone number: ${phoneNumber}. When would you prefer to have your appointment? Dr. Sayuj is available Monday to Friday, 9 AM to 6 PM. What day works best for you?`;
        }
        return "I need your phone number to confirm the appointment. Could you please provide your contact number?";

      case 'scheduling':
        setCurrentStep('confirmation');
        return `Great! I have all the information I need. Let me summarize your appointment request and connect you with our scheduling team. One moment please...`;

      case 'confirmation':
        return "Your appointment request has been submitted! Our coordinator will call you within one working day to confirm your appointment slot. Is there anything else I can help you with?";

      default:
        return "I'm here to help you book an appointment with Dr. Sayuj Krishnan. How can I assist you today?";
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
      logAppointmentBooking('ai_chat_interaction', service || 'general');

      const aiResponse = await generateAIResponse(inputValue);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
        isEmergency: detectEmergency(inputValue)
      };

      setMessages(prev => [...prev, assistantMessage]);

      // If we've reached confirmation, submit the booking
      if (currentStep === 'confirmation') {
        await submitBooking();
      }

    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I apologize, but I'm having trouble processing your request right now. Please call us directly at +91-9778280044 for immediate assistance.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const submitBooking = async () => {
    try {
      // Create the booking request
      const bookingRequest = {
        ...bookingData,
        source: 'ai_chat',
        pageSlug,
        service,
        timestamp: new Date().toISOString()
      };

      // Log successful booking
      logContactFormSubmit('ai_appointment_booking', true);

      // In a real implementation, you would send this to your backend
      console.log('Booking request:', bookingRequest);

      // For now, we'll use the existing mailto approach
      const subject = `AI Booking Request - ${bookingData.name || 'New Patient'}`;
      const body = `AI Chat Booking Request:
Page: ${pageSlug}
Service: ${service || 'General'}
Name: ${bookingData.name || 'Not provided'}
Phone: ${bookingData.phone || 'Not provided'}
Email: ${bookingData.email || 'Not provided'}
Condition: ${bookingData.condition || 'Not specified'}
Urgency: ${bookingData.urgency || 'routine'}
Preferred Date: ${bookingData.preferredDate || 'Not specified'}
Preferred Time: ${bookingData.preferredTime || 'Not specified'}
Symptoms: ${bookingData.symptoms?.join(', ') || 'Not specified'}
Previous Treatment: ${bookingData.previousTreatment || 'Not specified'}
Insurance: ${bookingData.insurance || 'Not specified'}

This booking was created through our AI chat assistant.`;

      const mailtoHref = `mailto:neurospinehyd@drsayuj.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoHref;

    } catch (error) {
      console.error('Error submitting booking:', error);
      logContactFormSubmit('ai_appointment_booking', false);
    }
  };

  const quickActions = [
    "I have back pain and need an appointment",
    "I need to see Dr. Sayuj for a brain condition",
    "I have severe headaches",
    "I need a second opinion",
    "I want to book a routine consultation"
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
        <div className="bg-blue-600 text-white p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-lg">🤖</span>
            </div>
            <div>
              <h3 className="font-semibold">Dr. Sayuj's AI Assistant</h3>
              <p className="text-blue-100 text-sm">I'm here to help you book an appointment</p>
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
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm">Dr. Sayuj's assistant is typing...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {currentStep === 'greeting' && (
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
