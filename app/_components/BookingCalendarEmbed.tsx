"use client";

import { useCallback, useRef, useMemo, useEffect } from "react";
import { Calendar, ExternalLink } from "lucide-react";
import Cal, { getCalApi } from "@calcom/embed-react";
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

  // Check if it's a Cal.com URL
  const calLink = useMemo(() => {
    try {
      if (!url) return null;

      // Handle standard URLs like https://cal.com/drsayuj
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname.includes("cal.com")) {
        // Strip leading slash
        return parsedUrl.pathname.substring(1);
      }
    } catch (e) {
      // Not a valid URL, could be just the namespace like 'drsayuj'
      if (url.includes('cal.com/')) {
        return url.split('cal.com/')[1];
      }
      return null;
    }
    return null;
  }, [url]);

  useEffect(() => {
    if (calLink) {
      (async function () {
        const cal = await getCalApi({});
        cal("on", {
          action: "bookingSuccessful",
          callback: () => {
             trackOnce();
          }
        });
        cal("ui", {
          styles: { branding: { brandColor: "#2563eb" } },
          hideEventTypeDetails: false,
          layout: "month_view"
        });
      })();
    }
  }, [calLink, trackOnce]);

  if (calLink) {
    return (
      <div className="w-full relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl overflow-hidden min-h-[600px] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        <Cal
          calLink={calLink}
          style={{ width: "100%", height: "100%", overflow: "scroll" }}
          config={{ layout: "month_view" }}
        />
      </div>
    );
  }

  return (
    <div className="relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 text-center space-y-6 flex flex-col items-center">
      <div className="w-16 h-16 bg-[var(--color-primary-50)] rounded-full flex items-center justify-center mx-auto">
        <Calendar className="w-8 h-8 text-[var(--color-primary-500)]" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
          Book Your Appointment Online
        </h3>
        <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
          Our secure booking assistant is hosted on Google. Click the button below to open the calendar in a new secure window.
        </p>
      </div>

      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        onClick={trackOnce}
        aria-label="Open Booking Calendar"
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center justify-center gap-2 group"
      >
        <span>Open Booking App</span>
        <ExternalLink className="w-4 h-4 opacity-90 group-hover:translate-x-0.5 transition-transform" />
      </a>

      <p className="text-xs text-[var(--color-text-secondary)]">
        Opens in a new tab • Secure via Google Opal
      </p>
    </div>
  );
}
