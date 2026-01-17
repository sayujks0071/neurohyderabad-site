"use client";

import { useRef, useState } from "react";
import { Activity, ChevronRight, MessageSquareCode, ShieldCheck, MessageSquare } from "lucide-react";
import PatientPortal from "./PatientPortal";
import { CLINIC } from "@/app/_lib/clinic";
import dynamic from "next/dynamic";

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

const NeuraLinkBookingApp = () => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

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
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50/80 border border-blue-100 text-blue-700 text-sm font-bold mb-6 backdrop-blur-sm shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Activity className="w-4 h-4 mr-2 text-blue-500" />
            Advanced Neurosurgical Booking
          </div>

          {/* LCP Optimization: Removed animation classes (animate-in fade-in) to ensure immediate text paint */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">
            Book your consultation with
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Dr. Sayuj Krishnan
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            Secure your neurosurgical appointment at Yashoda Hospitals, Malakpet. Get AI-assisted triage,
            report interpretation, and a fast confirmation call from our care team.
          </p>

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

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-slate-500 text-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Patient data handled securely
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300" />
            <div>
              {CLINIC.street}, {CLINIC.city}
            </div>
          </div>
        </div>
      </section>

      <section ref={formRef} className="pb-20">
        <PatientPortal />
      </section>

      {/* Conditionally render LiveAssistant to prevent loading its heavy dependencies (@google/genai) until needed */}
      {isAssistantOpen && (
        <LiveAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
      )}
      <ChatBot />
    </div>
  );
};

export default NeuraLinkBookingApp;
