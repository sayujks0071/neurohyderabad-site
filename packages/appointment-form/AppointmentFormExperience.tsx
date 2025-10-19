'use client';

import { useState } from "react";
import type { BookingData } from "@/packages/appointment-form/types";
import { ToastProvider, useToast } from "./ToastContext";
import BookingForm from "./BookingForm";
import Confirmation from "./Confirmation";
import Faq from "./Faq";
import LoadingOverlay from "./LoadingOverlay";
import MapSection from "./MapSection";

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
      setBookingData(payload.booking);
      setConfirmationMessage(payload.confirmationMessage);

      if (payload.emailResult?.success) {
        addToast("Confirmation email simulated successfully.", "success");
      } else if (payload.emailResult?.error) {
        addToast(payload.emailResult.error, "info");
      }

      if (payload.usedAI) {
        addToast("AI generated a personalised confirmation.", "info");
      }

      setView("confirmation");
    } catch (error) {
      console.error("[appointments] Failed to submit booking:", error);
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
      <LoadingOverlay
        isLoading={isLoading}
        message="Submitting your request..."
      />
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
