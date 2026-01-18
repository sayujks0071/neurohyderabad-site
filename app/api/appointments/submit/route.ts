import { NextResponse } from "next/server";
import { generateBookingConfirmation } from "@/src/lib/appointments/gemini";
import {
  sendAdminNotificationEmail,
  sendConfirmationEmail,
} from "@/src/lib/appointments/email";
import { buildWebhookPayload, notifyAppointmentWebhooks } from "@/src/lib/appointments/webhooks";
import { submitToGoogleSheets } from "@/src/lib/google-sheets";
import { rateLimit } from "@/src/lib/rate-limit";
import type { BookingData } from "@/packages/appointment-form/types";

const ALLOWED_GENDERS = new Set(["male", "female", "other"]);
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[0-9\s()-]{10,}$/;

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

  const email = String(raw.email ?? "").trim();
  if (!EMAIL_REGEX.test(email)) {
    throw new ValidationError("Email is invalid.");
  }

  const phone = String(raw.phone ?? "").trim();
  if (!PHONE_REGEX.test(phone)) {
    throw new ValidationError("Phone number is invalid.");
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

  let painScore: number | undefined;
  if (typeof raw.painScore === "number") {
    painScore = raw.painScore;
  } else if (raw.painScore) {
    painScore = Number(raw.painScore);
  }

  let mriScanAvailable: boolean | undefined;
  if (typeof raw.mriScanAvailable === "boolean") {
    mriScanAvailable = raw.mriScanAvailable;
  }

  return {
    patientName,
    email,
    phone,
    age: String(ageValue),
    gender: gender as BookingData["gender"],
    appointmentDate,
    appointmentTime,
    reason,
    painScore,
    mriScanAvailable,
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

    // Add lead to CRM / Google Sheet (async, non-blocking)
    const source = request.headers.get("x-booking-source") || "website";
    void submitToGoogleSheets({
      fullName: booking.patientName,
      email: booking.email,
      phone: booking.phone,
      concern: booking.reason.substring(0, 100),
      preferredDate: booking.appointmentDate,
      preferredTime: booking.appointmentTime,
      source,
      metadata: {
        age: booking.age,
        gender: booking.gender,
        bookingReason: booking.reason,
        painScore: booking.painScore,
        mriScanAvailable: booking.mriScanAvailable,
      },
    }).catch((error) => {
      console.error("[appointments/submit] Failed to submit to Google Sheet:", error);
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
