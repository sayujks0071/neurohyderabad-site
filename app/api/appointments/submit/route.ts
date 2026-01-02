import { NextResponse } from "next/server";
import { generateBookingConfirmation } from "@/src/lib/appointments/gemini";
import {
  sendAdminNotificationEmail,
  sendConfirmationEmail,
} from "@/src/lib/appointments/email";
import { buildWebhookPayload, notifyAppointmentWebhooks } from "@/src/lib/appointments/webhooks";
import { rateLimit } from "@/src/lib/rate-limit";
import type { BookingData } from "@/packages/appointment-form/types";

/**
 * Add lead to CRM via /api/lead endpoint
 */
async function addLeadToCRM(leadData: {
  fullName: string;
  phone?: string;
  email?: string;
  city?: string;
  concern?: string;
  preferredDate?: string;
  preferredTime?: string;
  source?: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");
  
  try {
    const response = await fetch(`${baseUrl}/api/lead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`CRM API returned ${response.status}: ${error}`);
    }

    console.log(`[appointments/submit] Lead added to CRM: ${leadData.fullName}`);
  } catch (error) {
    // Log but don't throw - CRM failure shouldn't block appointment submission
    console.error("[appointments/submit] CRM integration error:", error);
    throw error; // Re-throw so caller can handle
  }
}

const ALLOWED_GENDERS = new Set(["male", "female", "other"]);

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

function parseBookingData(payload: unknown): BookingData {
  if (!payload || typeof payload !== "object") {
    throw new ValidationError("Invalid body");
  }

  const raw = payload as Record<string, unknown>;

  const patientName = String(raw.patientName ?? "").trim();
  if (patientName.length < 3) {
    throw new ValidationError("Patient name is invalid.");
  }

  const ageValue =
    typeof raw.age === "number" ? raw.age : Number(String(raw.age ?? "").trim());
  if (!Number.isFinite(ageValue) || ageValue <= 0 || ageValue > 120) {
    throw new ValidationError("Age must be a valid number.");
  }

  const gender = String(raw.gender ?? "").trim().toLowerCase();
  if (!ALLOWED_GENDERS.has(gender)) {
    throw new ValidationError("Gender is invalid.");
  }

  const appointmentDate = String(raw.appointmentDate ?? "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(appointmentDate)) {
    throw new ValidationError("Appointment date is invalid.");
  }

  const appointmentTime = String(raw.appointmentTime ?? "").trim();
  if (!appointmentTime) {
    throw new ValidationError("Appointment time is required.");
  }

  const reason = String(raw.reason ?? "").trim();
  if (reason.length < 10) {
    throw new ValidationError("Reason must be at least 10 characters.");
  }

  return {
    patientName,
    age: String(ageValue),
    gender: gender as BookingData["gender"],
    appointmentDate,
    appointmentTime,
    reason,
  };
}

export async function POST(request: Request) {
  try {
    // Get IP from x-forwarded-for (first IP is the real client IP) or fallback
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    const { success } = rateLimit(ip, 5, 60 * 1000); // 5 requests per minute

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const booking = parseBookingData(body);

    const { message, usedAI } = await generateBookingConfirmation(booking);
    const emailResult = await sendConfirmationEmail(booking, message);
    const adminEmailResult = await sendAdminNotificationEmail(
      booking,
      request.headers.get("x-booking-source") || "website"
    );
    if (!adminEmailResult.success) {
      console.error(
        "[appointments/submit] Admin notification failed:",
        adminEmailResult.error
      );
    }

    // Add lead to CRM (async, non-blocking)
    // Note: Email is optional - if the form doesn't collect it, the CRM will use name-based identifier
    const source = request.headers.get("x-booking-source") || "website";
    void addLeadToCRM({
      fullName: booking.patientName,
      concern: booking.reason.substring(0, 100),
      preferredDate: booking.appointmentDate,
      preferredTime: booking.appointmentTime,
      source,
      metadata: {
        age: booking.age,
        gender: booking.gender,
        bookingReason: booking.reason,
        contactMissing: true,
      },
    }).catch((error) => {
      console.error("[appointments/submit] Failed to add lead to CRM:", error);
    });

    void notifyAppointmentWebhooks(
      buildWebhookPayload({
        booking,
        confirmationMessage: message,
        emailResult,
        usedAI,
        source: request.headers.get("x-booking-source"),
      })
    );

    return NextResponse.json({
      booking,
      confirmationMessage: message,
      emailResult,
      usedAI,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to process appointment.";
    const status = error instanceof ValidationError ? 400 : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
