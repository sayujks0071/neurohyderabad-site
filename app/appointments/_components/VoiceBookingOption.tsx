'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Mic, FormInput } from 'lucide-react';

// Dynamically import OpenAI voice agent to avoid SSR issues
const OpenAIVoiceAgent = dynamic(
  () => import('../../_components/VoiceAgent/OpenAIVoiceAgent'),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading voice assistant...</p>
        </div>
      </div>
    ),
  }
);

interface VoiceBookingOptionProps {
  onAppointmentBooked?: (data: any) => void;
}

export default function VoiceBookingOption({ onAppointmentBooked }: VoiceBookingOptionProps) {
  const [bookingMethod, setBookingMethod] = useState<'voice' | 'form'>('form');
  const [voiceEnabled] = useState(
    process.env.NEXT_PUBLIC_OPENAI_VOICE_ENABLED === 'true'
  );

  const handleVoiceAppointmentData = (data: any) => {
    console.log('Appointment data from voice:', data);
    onAppointmentBooked?.(data);
  };

  const handleVoiceError = (error: Error) => {
    console.error('Voice agent error:', error);
    // Fallback to form on error
    setBookingMethod('form');
  };

  // If voice is not enabled, don't show the toggle
  if (!voiceEnabled) {
    return null;
  }

  return (
    <div className="mb-8">
      {/* Booking Method Selector */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Choose Your Booking Method
        </h2>

        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {/* Voice Option */}
          <button
            onClick={() => setBookingMethod('voice')}
            className={`p-6 rounded-xl border-2 transition-all ${
              bookingMethod === 'voice'
                ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`p-4 rounded-full mb-3 ${
                bookingMethod === 'voice' ? 'bg-blue-600' : 'bg-gray-200'
              }`}>
                <Mic className={`w-8 h-8 ${
                  bookingMethod === 'voice' ? 'text-white' : 'text-gray-600'
                }`} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Voice Assistant</h3>
              <p className="text-sm text-gray-600">
                Talk naturally to book your appointment
              </p>
              {bookingMethod === 'voice' && (
                <span className="mt-3 px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                  Selected
                </span>
              )}
            </div>
          </button>

          {/* Form Option */}
          <button
            onClick={() => setBookingMethod('form')}
            className={`p-6 rounded-xl border-2 transition-all ${
              bookingMethod === 'form'
                ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`p-4 rounded-full mb-3 ${
                bookingMethod === 'form' ? 'bg-blue-600' : 'bg-gray-200'
              }`}>
                <FormInput className={`w-8 h-8 ${
                  bookingMethod === 'form' ? 'text-white' : 'text-gray-600'
                }`} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Traditional Form</h3>
              <p className="text-sm text-gray-600">
                Fill out the booking form manually
              </p>
              {bookingMethod === 'form' && (
                <span className="mt-3 px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                  Selected
                </span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Voice Assistant Widget */}
      {bookingMethod === 'voice' && (
        <div className="mb-8 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4 flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900 mb-1">AI-Powered Voice Booking</h4>
                <p className="text-sm text-blue-800">
                  Our AI assistant Priya will help you book your appointment.
                  She can answer questions about Dr. Sayuj&apos;s services and schedule your visit.
                </p>
              </div>
            </div>

            <OpenAIVoiceAgent
              onAppointmentData={handleVoiceAppointmentData}
              onError={handleVoiceError}
            />
          </div>

          {/* Quick switch to form */}
          <div className="mt-4 text-center">
            <button
              onClick={() => setBookingMethod('form')}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Prefer to use the traditional form instead?
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
