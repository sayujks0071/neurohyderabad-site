"use client";

import { useCallback, useEffect, useRef } from "react";
import { trackConversionOnly } from "@/src/lib/google-ads-conversion";

interface BookingCalendarEmbedProps {
  url: string;
}

export default function BookingCalendarEmbed({
  url,
}: BookingCalendarEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hasTrackedRef = useRef(false);

  const trackOnce = useCallback(() => {
    if (hasTrackedRef.current) return;
    hasTrackedRef.current = true;
    trackConversionOnly();
  }, []);

  useEffect(() => {
    const handleWindowBlur = () => {
      if (document.activeElement === iframeRef.current) {
        // First interaction with the embedded booking app: fire the existing Ads tag.
        trackOnce();
      }
    };

    window.addEventListener("blur", handleWindowBlur);
    return () => window.removeEventListener("blur", handleWindowBlur);
  }, [trackOnce]);

  return (
    <div className="space-y-3">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <iframe
          ref={iframeRef}
          title="Appointment booking calendar"
          src={url}
          className="w-full h-[80vh] min-h-[720px]"
          loading="lazy"
        />
      </div>
      <p className="text-sm text-slate-600">
        Having trouble loading the calendar?{" "}
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          onClick={trackOnce}
          className="text-blue-600 hover:text-blue-700 underline"
        >
          Open the booking app in a new tab
        </a>
        .
      </p>
    </div>
  );
}
