import { SITE_URL } from "../../src/lib/seo";
import type { Metadata } from "next";
import SmartSymptomChecker from "../_components/SmartSymptomChecker";

export const metadata: Metadata = {
  title: "Symptom Checker | Dr Sayuj Krishnan - AI-Powered Symptom Analysis",
  description: "Use our AI-powered symptom checker to get preliminary guidance about your symptoms. Not a diagnosis - always consult with Dr. Sayuj for proper evaluation.",
  alternates: {
    canonical: "/symptoms-checker",
  },
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Symptom Checker | Dr Sayuj Krishnan")}&subtitle=${encodeURIComponent("AI-Powered Symptom Analysis")}`,
        width: 1200,
        height: 630,
        alt: "Symptom Checker — Dr Sayuj Krishnan",
      },
    ],
  },
};

export default function SymptomsCheckerPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-6">
            AI-Powered Symptom Checker
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Describe your symptoms and get preliminary guidance from our AI assistant. 
            This tool helps you understand when to seek immediate care versus scheduling a routine consultation.
          </p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">
              ⚠️ Important Medical Disclaimer
            </h2>
            <p className="text-sm text-yellow-700">
              This symptom checker is for preliminary guidance only and does not constitute a medical diagnosis. 
              Always consult with Dr. Sayuj Krishnan or another qualified healthcare provider for proper evaluation 
              and treatment. If you are experiencing a medical emergency, call +91-9778280044 immediately or visit 
              the nearest emergency room.
            </p>
          </div>
        </div>

        {/* Symptom Checker Component */}
        <SmartSymptomChecker />

        {/* How It Works Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Describe Symptoms</h3>
              <p className="text-sm text-gray-600">
                Provide details about your symptoms, duration, and any relevant information
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
              <h3 className="font-semibold text-gray-800 mb-2">Get Guidance</h3>
              <p className="text-sm text-gray-600">
                Receive recommendations on next steps and when to seek care
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-16 bg-red-50 border border-red-200 rounded-2xl p-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🚨</div>
            <h2 className="text-2xl font-bold text-red-800 mb-4">Medical Emergency?</h2>
            <p className="text-red-700 mb-6">
              If you're experiencing a medical emergency, don't wait. 
              Call our emergency hotline immediately.
            </p>
            <a 
              href="tel:+919778280044"
              className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors inline-block"
            >
              Emergency Hotline: +91-9778280044
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

