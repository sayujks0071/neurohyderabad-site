"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronRight, MessageSquareCode, MessageSquare } from "lucide-react";
import PatientPortal from "./PatientPortal";
import AppointmentFaq from "../AppointmentFaq";
import dynamic from "next/dynamic";
import VoiceBookingOption from "../VoiceBookingOption";

// Dynamic import for LiveAssistant (heavy dependency on @google/genai)
// Only loaded when the user explicitly clicks "Voice AI Assistant".
const LiveAssistant = dynamic(() => import("./LiveAssistant"), {
  ssr: false,
});

// Dynamic import for ChatBot (imports lucide-react icons and other logic)
// ssr: false ensures it doesn't bloat the initial server HTML.
// Using a loading component that mimics the initial button to avoid layout shifts/pop-in.
const ChatBot = dynamic(() => import("./ChatBot"), {
  ssr: false,
  loading: () => (
    <div className="fixed bottom-6 left-6 z-[90]">
      <button
        className="p-4 rounded-full shadow-2xl bg-blue-600 text-white flex items-center justify-center group"
        aria-label="Loading AI Assistant"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 font-bold whitespace-nowrap">
          Web AI Assistant
        </span>
      </button>
    </div>
  ),
});

interface NeuraLinkBookingAppProps {
  heroContent: React.ReactNode;
  locationInfo: React.ReactNode;
}

const NeuraLinkBookingApp = ({ heroContent, locationInfo }: NeuraLinkBookingAppProps) => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  // CWV Optimization: Defer ChatBot loading to reduce TBT
  const [shouldLoadChatBot, setShouldLoadChatBot] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load ChatBot after 4 seconds (idle time)
    const timer = setTimeout(() => {
      setShouldLoadChatBot(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-slate-50/50">
      <section className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[700px] h-[700px] rounded-full bg-blue-100/40 blur-3xl opacity-60" />
          <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-3xl opacity-60" />
        </div>

        <div className="max-w-5xl mx-auto py-20 px-4 text-center">
          {heroContent}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-slate-900 text-white font-bold shadow-lg shadow-slate-300 hover:bg-slate-800 transition-all"
            >
              Start Booking <ChevronRight className="w-5 h-5 ml-2" />
            </button>
            <button
              onClick={() => setIsAssistantOpen(true)}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold shadow-sm hover:border-blue-200 hover:text-blue-600 transition-all"
            >
              <MessageSquareCode className="w-5 h-5 mr-2 text-blue-600" />
              Voice AI Assistant
            </button>
          </div>

          {locationInfo}
        </div>
      </section>

      <section ref={formRef} className="pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <VoiceBookingOption />
          <PatientPortal />
        </div>
      </section>

      <AppointmentFaq />

      {/* Conditionally render LiveAssistant to prevent loading its heavy dependencies (@google/genai) until needed */}
      {isAssistantOpen && (
        <LiveAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
      )}

      {/* CWV Optimization: Show placeholder initially, then lazy load the real ChatBot */}
      {shouldLoadChatBot ? (
        <ChatBot />
      ) : (
        <div className="fixed bottom-6 left-6 z-[90]">
          <button
            className="p-4 rounded-full shadow-2xl bg-blue-600 text-white flex items-center justify-center group"
            aria-label="Loading AI Assistant"
            onClick={() => setShouldLoadChatBot(true)}
          >
            <MessageSquare className="w-6 h-6" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 font-bold whitespace-nowrap">
              Web AI Assistant
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default NeuraLinkBookingApp;
