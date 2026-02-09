'use client';

import { useState } from "react";
import type { BookingData } from "@/packages/appointment-form/types";
import { ToastProvider, useToast } from "./ToastContext";
import BookingForm from "./BookingForm";
import Confirmation from "./Confirmation";
import Faq from "./Faq";
import MapSection from "./MapSection";
import { APPOINTMENT_SUCCESS_MESSAGE } from "./constants";
import { trackConversionOnly } from "@/src/lib/google-ads-conversion";
import { trackMiddlewareEvent } from "@/src/lib/middleware/rum";

type ViewState = "form" | "confirmation";

interface AppointmentFormContentProps {
  apiEndpoint: string;
  bookingSource: string;
}

function AppointmentFormContent({
  apiEndpoint,
  bookingSource,
}: AppointmentFormContentProps) {
  const [view, setView] = useState<ViewState>("form");
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const submitForm = async (data: BookingData) => {
    setIsLoading(true);

    // Track form submission attempt
    trackMiddlewareEvent('form.submit', {
      form_type: 'appointment',
      source: bookingSource
    });

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-booking-source": bookingSource,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || "Unable to submit appointment.");
      }

      const payload = await response.json();

      // Track successful submission
      trackMiddlewareEvent('form.success', {
        form_type: 'appointment',
        source: bookingSource,
        used_ai: payload.usedAI
      });

      setBookingData(payload.booking);
      // Use the specific reassuring message requested by the user
      setConfirmationMessage(APPOINTMENT_SUCCESS_MESSAGE);
      setView("confirmation");

      // Track Google Ads conversion for successful appointment booking
      trackConversionOnly();

      if (payload.emailResult?.success) {
        addToast("Confirmation email simulated successfully.", "success");
      } else if (payload.emailResult?.error) {
        addToast(payload.emailResult.error, "info");
      }

      if (payload.usedAI) {
        addToast("AI generated a personalised confirmation.", "info");
      }
    } catch (error) {
      console.error("[appointments] Failed to submit booking:", error);

      // Track submission error
      trackMiddlewareEvent('form.error', {
        form_type: 'appointment',
        source: bookingSource,
        error: error instanceof Error ? error.message : 'Unknown error'
      });

      addToast(
        error instanceof Error
          ? error.message
          : "Failed to book appointment. Please try again later.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookAnother = () => {
    setBookingData(null);
    setConfirmationMessage("");
    setView("form");
  };

  const handleEdit = () => {
    setView("form");
  };

  return (
    <div className="relative">
      {view === "form" && (
        <>
          <BookingForm onSubmit={submitForm} initialData={bookingData} />
          <MapSection />
          <Faq />
        </>
      )}
      {view === "confirmation" && bookingData && (
        <Confirmation
          message={confirmationMessage}
          bookingData={bookingData}
          onBookAnother={handleBookAnother}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}

interface AppointmentFormExperienceProps {
  apiEndpoint?: string;
  bookingSource?: string;
}

export default function AppointmentFormExperience({
  apiEndpoint = "/api/appointments/submit",
  bookingSource = "website",
}: AppointmentFormExperienceProps) {
  return (
    <ToastProvider>
      <AppointmentFormContent
        apiEndpoint={apiEndpoint}
        bookingSource={bookingSource}
      />
    </ToastProvider>
  );
}
