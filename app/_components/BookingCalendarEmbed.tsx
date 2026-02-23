"use client";

import { useCallback, useRef } from "react";
import { Calendar, ExternalLink } from "lucide-react";
import { trackConversionOnly } from "@/src/lib/google-ads-conversion";
import Button from "./Button";

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

      <Button
        variant="primary"
        href={url}
        target="_blank"
        rel="noreferrer"
        onClick={trackOnce}
        className="gap-2 px-8 group"
      >
        <span>Open Booking App</span>
        <span className="sr-only">(opens in a new tab)</span>
        <ExternalLink
          className="w-4 h-4 opacity-90 group-hover:translate-x-0.5 transition-transform"
          aria-hidden="true"
        />
      </Button>

      <p className="text-xs text-slate-500">
        Opens in a new tab • Secure via Google Opal
      </p>
    </div>
  );
}
