"use client";

import { useCallback, useRef } from "react";
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
    <div className="bg-gradient-to-br from-blue-50 via-white to-slate-50 border border-slate-200 rounded-2xl shadow-sm p-8 md:p-10">
      <div className="flex flex-col gap-6">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full">
            Secure Booking Assistant
          </span>
          <h3 className="mt-4 text-2xl md:text-3xl font-semibold text-slate-900">
            Book your appointment in seconds
          </h3>
          <p className="mt-3 text-sm md:text-base text-slate-600">
            Click below to open our secure booking assistant. Choose a slot, share
            your details, and our care team will confirm the appointment.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
            <p className="text-sm font-semibold text-slate-800">Step 1</p>
            <p className="mt-1 text-sm text-slate-600">
              Open the booking assistant and pick a preferred time.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
            <p className="text-sm font-semibold text-slate-800">Step 2</p>
            <p className="mt-1 text-sm text-slate-600">
              Share your details so our coordinator can confirm the slot.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            onClick={trackOnce}
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-colors"
          >
            Open Booking App
          </a>
          <span className="text-xs text-slate-500">
            Opens in a new tab for privacy and security.
          </span>
        </div>
      </div>
    </div>
  );
}
