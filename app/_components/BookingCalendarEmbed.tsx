"use client";

import { useCallback, useRef } from "react";
import { Calendar, ExternalLink } from "lucide-react";
import { trackConversionOnly } from "@/src/lib/google-ads-conversion";

interface BookingCalendarEmbedProps {
  url: string;
}

export default function BookingCalendarEmbed({
  url,
}: BookingCalendarEmbedProps) {
  const hasTrackedRef = useRef(false);

  const trackOnce = useCallback(() => {
    if (hasTrackedRef.current) return;
    hasTrackedRef.current = true;
    trackConversionOnly();
  }, []);

  return (
    <div className="relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 text-center space-y-6">
      <div className="w-16 h-16 bg-blue-50/50 backdrop-blur-sm border border-blue-100 rounded-full flex items-center justify-center mx-auto">
        <Calendar className="w-8 h-8 text-blue-600" aria-hidden="true" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-slate-900">
          Book Your Appointment Online
        </h3>
        <p className="text-slate-600 max-w-md mx-auto">
          Our secure booking assistant is hosted on Google. Click the button below to open the calendar in a new secure window.
        </p>
      </div>

      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        onClick={trackOnce}
        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] group"
        aria-label="Open secure booking calendar in a new tab"
      >
        <span>Open Booking App</span>
        <ExternalLink className="w-4 h-4 opacity-90 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
      </a>

      <p className="text-xs text-slate-500">
        Opens in a new tab • Secure via Google Opal
      </p>
    </div>
  );
}
