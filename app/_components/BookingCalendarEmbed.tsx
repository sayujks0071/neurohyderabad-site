"use client";

import { useCallback, useRef } from "react";
import { Calendar, ExternalLink } from "lucide-react";
import { trackConversionOnly } from "@/src/lib/google-ads-conversion";
import { ExternalLink, Calendar } from "lucide-react";

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
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 text-center space-y-6">
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
        <Calendar className="w-8 h-8 text-blue-600" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-slate-900">
          Book Your Appointment Online
        </h3>
        <p className="text-slate-600 max-w-md mx-auto">
          Our secure booking assistant is hosted on Google. Click the button below to open the calendar in a new secure window.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-2xl font-semibold text-slate-900">
          Book your appointment in seconds
        </h3>
        <p className="text-sm md:text-base text-slate-600">
          Click below to open our secure booking assistant. Choose a slot, share
          your details, and our care team will confirm the appointment.
        </p>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        onClick={trackOnce}
        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-blue-500/30 hover:scale-[1.02] transition-transform duration-200 group"
      >
        <span>Open Booking App</span>
        <ExternalLink className="w-4 h-4 opacity-90 group-hover:translate-x-0.5 transition-transform" />
      </a>

      <p className="text-xs text-slate-500">
        Opens in a new tab • Secure via Google Opal
      <p className="text-xs text-slate-500">
        Opens in a new tab for privacy and security.
      </p>
    </div>
  );
}
