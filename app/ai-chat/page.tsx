import { SITE_URL } from "../../src/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import OpenAIAgentsBooking from "../_components/OpenAIAgentsBooking";
import AIStreamingChat from "../_components/AIStreamingChat";
import AppointmentFormTracker from "../../src/components/AppointmentFormTracker";
import PhoneClickTracker from "../../src/components/PhoneClickTracker";

export const metadata: Metadata = {
  title: "AI Chat Assistant | Book Appointment with Dr Sayuj Krishnan",
  description: "Chat with our AI assistant to book an appointment with Dr Sayuj Krishnan. Get instant help with symptoms, emergency detection, and appointment scheduling.",
  alternates: {
    canonical: "/ai-chat",
  },
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("AI Chat Assistant | Dr Sayuj Krishnan")}&subtitle=${encodeURIComponent("Book Appointments Instantly")}`,
        width: 1200,
        height: 630,
        alt: "AI Chat Assistant — Dr Sayuj Krishnan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("AI Chat Assistant | Dr Sayuj Krishnan")}&subtitle=${encodeURIComponent("Book Appointments Instantly")}`,
        width: 1200,
        height: 630,
        alt: "AI Chat Assistant — Dr Sayuj Krishnan",
      },
    ],
  },
};

export default function AIChatPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          🤖 AI Chat Assistant
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Chat with Dr. Sayuj's intelligent assistant to book appointments, understand symptoms, 
          and get immediate help with your neurosurgical care needs.
        </p>
        
        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="text-3xl mb-3">🚨</div>
            <h3 className="font-semibold text-blue-800 mb-2">Emergency Detection</h3>
            <p className="text-sm text-gray-600">
              Automatically detects emergency symptoms and provides immediate guidance
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <div className="text-3xl mb-3">💬</div>
            <h3 className="font-semibold text-green-800 mb-2">Natural Conversation</h3>
            <p className="text-sm text-gray-600">
              Chat naturally about your symptoms and get personalized appointment recommendations
            </p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-purple-800 mb-2">Instant Booking</h3>
            <p className="text-sm text-gray-600">
              Book appointments instantly with intelligent scheduling and confirmation
            </p>
          </div>
        </div>
      </div>

      {/* AI Chat Interface - Using Enhanced Streaming Chat */}
      <AIStreamingChat pageSlug="/ai-chat" service="ai_chat" />
      
      {/* Fallback to original component (commented out, can be enabled if needed) */}
      {/* <OpenAIAgentsBooking pageSlug="/ai-chat" service="ai_chat" /> */}

      {/* Emergency Contact Section */}
      <div className="mt-16 bg-red-50 border border-red-200 rounded-2xl p-8">
        <div className="text-center">
          <div className="text-4xl mb-4">🚨</div>
          <h2 className="text-2xl font-bold text-red-800 mb-4">Medical Emergency?</h2>
          <p className="text-red-700 mb-6">
            If you're experiencing a medical emergency, don't wait for the chat. 
            Call our emergency hotline immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+919778280044"
              className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Emergency Hotline: +91-9778280044
            </a>
            <Link
              href="/emergency-rehabilitation"
              className="bg-white text-red-600 border border-red-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-50 transition-colors"
            >
              Emergency Information
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Start Chatting</h3>
            <p className="text-sm text-gray-600">
              Describe your symptoms or condition in natural language
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">AI Analysis</h3>
            <p className="text-sm text-gray-600">
              Our AI analyzes your symptoms and determines urgency level
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600">3</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Smart Scheduling</h3>
            <p className="text-sm text-gray-600">
              Get personalized appointment recommendations based on your needs
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-orange-600">4</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Confirmation</h3>
            <p className="text-sm text-gray-600">
              Receive confirmation and preparation instructions
            </p>
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="mt-16 bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Privacy & Security</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">🔒 Your Privacy is Protected</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• All conversations are encrypted and secure</li>
              <li>• Your personal information is never shared</li>
              <li>• HIPAA-compliant data handling</li>
              <li>• You can delete your chat history anytime</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">🛡️ Medical Accuracy</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• AI responses are reviewed by medical professionals</li>
              <li>• Emergency detection follows medical protocols</li>
              <li>• Always consult with Dr. Sayuj for final diagnosis</li>
              <li>• AI is a tool to assist, not replace medical judgment</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Hidden tracking components */}
      <div className="hidden" aria-hidden>
        <AppointmentFormTracker pageSlug="/ai-chat" service="ai_chat" />
        <PhoneClickTracker />
      </div>
    </main>
  );
}
