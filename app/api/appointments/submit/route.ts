import { NextResponse } from "next/server";
import { generateBookingConfirmation } from "@/src/lib/appointments/gemini";
import { sendConfirmationEmail } from "@/src/lib/appointments/email";
import { buildWebhookPayload, notifyAppointmentWebhooks } from "@/src/lib/appointments/webhooks";
import type { BookingData } from "@/packages/appointment-form/types";

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
    const body = await request.json();
    const booking = parseBookingData(body);

    const { message, usedAI } = await generateBookingConfirmation(booking);
    const emailResult = await sendConfirmationEmail(booking, message);

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
