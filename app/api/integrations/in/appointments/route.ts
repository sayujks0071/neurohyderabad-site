import { NextRequest, NextResponse } from "next/server";
import type { BookingData } from "@/packages/appointment-form/types";
import { generateBookingConfirmation } from "@/src/lib/appointments/gemini";
import { sendConfirmationEmail } from "@/src/lib/appointments/email";
import {
  formatBookingForGoogleSheets,
  sendToGoogleSheets,
} from "@/src/lib/appointments/google-sheets";
import {
  buildWebhookPayload,
  notifyAppointmentWebhooks,
} from "@/src/lib/appointments/webhooks";

const ALLOWED_GENDERS = new Set(["male", "female", "other"]);

function extractQueryParam(request: NextRequest, keys: string[]) {
  const { searchParams } = request.nextUrl;
  for (const key of keys) {
    const value = searchParams.get(key);
    if (value) return value.trim();
  }
  return "";
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

function extractAccessKey(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice("Bearer ".length).trim();
  }

  const headerKey = (
    request.headers.get("x-in-access-key") ??
    request.headers.get("x-access-key") ??
    ""
  ).trim();

  if (headerKey) return headerKey;

  return extractQueryParam(request, ["access_key", "token", "api_key"]);
}

function extractAppId(request: NextRequest) {
  const headerAppId = (
    request.headers.get("x-in-app-id") ??
    request.headers.get("x-app-id") ??
    ""
  ).trim();

  if (headerAppId) return headerAppId;

  return extractQueryParam(request, ["app_id", "appId"]);
}

function isAuthorized(request: NextRequest) {
  const appId = process.env.INTEGRATION_APP_ID ?? "";
  const accessKey = process.env.INTEGRATION_ACCESS_KEY ?? "";

  if (!appId || !accessKey) {
    return { ok: false, reason: "Integration not configured." };
  }

  const providedAppId = extractAppId(request);
  const providedAccessKey = extractAccessKey(request);

  if (!providedAppId || !providedAccessKey) {
    return { ok: false, reason: "Missing integration credentials." };
  }

  const appIdMatches = safeEqual(providedAppId, appId);
  const accessKeyMatches = safeEqual(providedAccessKey, accessKey);

  if (!appIdMatches || !accessKeyMatches) {
    return { ok: false, reason: "Invalid integration credentials." };
  }

  return { ok: true };
}

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : String(value ?? "").trim();
}

function parseBookingPayload(payload: unknown): {
  booking: BookingData;
  email?: string;
  phone?: string;
  source?: string;
} {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid body.");
  }

  const raw = payload as Record<string, unknown>;
  const bookingSource =
    raw.source && typeof raw.source === "string" ? raw.source : undefined;
  const bookingPayload =
    raw.booking && typeof raw.booking === "object"
      ? (raw.booking as Record<string, unknown>)
      : raw;

  const patientName = normalizeString(
    bookingPayload.patientName ?? bookingPayload.name
  );
  if (patientName.length < 2) {
    throw new Error("Patient name is invalid.");
  }

  const appointmentDate = normalizeString(
    bookingPayload.appointmentDate ??
      bookingPayload.preferredDate ??
      bookingPayload.date
  );
  if (!/^\d{4}-\d{2}-\d{2}$/.test(appointmentDate)) {
    throw new Error("Appointment date is invalid.");
  }

  const appointmentTime = normalizeString(
    bookingPayload.appointmentTime ??
      bookingPayload.preferredTime ??
      bookingPayload.time
  );
  if (!appointmentTime) {
    throw new Error("Appointment time is required.");
  }

  const reason = normalizeString(
    bookingPayload.reason ??
      bookingPayload.condition ??
      bookingPayload.message ??
      bookingPayload.chiefComplaint
  );
  if (reason.length < 5) {
    throw new Error("Reason must be at least 5 characters.");
  }

  const rawAge = bookingPayload.age;
  let age = "";
  if (rawAge !== undefined && rawAge !== null && String(rawAge).trim()) {
    const ageValue =
      typeof rawAge === "number" ? rawAge : Number(String(rawAge).trim());
    if (!Number.isFinite(ageValue) || ageValue <= 0 || ageValue > 120) {
      throw new Error("Age must be a valid number.");
    }
    age = String(ageValue);
  }

  const genderRaw = normalizeString(bookingPayload.gender).toLowerCase();
  let gender: BookingData["gender"] = "";
  if (genderRaw) {
    if (!ALLOWED_GENDERS.has(genderRaw)) {
      throw new Error("Gender is invalid.");
    }
    gender = genderRaw as BookingData["gender"];
  }

  const email = normalizeString(
    bookingPayload.email ?? bookingPayload.patientEmail
  );
  const phone = normalizeString(
    bookingPayload.phone ?? bookingPayload.patientPhone
  );

  return {
    booking: {
      patientName,
      age,
      gender,
      appointmentDate,
      appointmentTime,
      reason,
    },
    email: email || undefined,
    phone: phone || undefined,
    source: bookingSource,
  };
}

export async function POST(request: NextRequest) {
  const auth = isAuthorized(request);
  if (!auth.ok) {
    return NextResponse.json(
      { error: auth.reason ?? "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { booking, email, phone, source } = parseBookingPayload(body);

    const { message, usedAI } = await generateBookingConfirmation(booking);
    const emailResult = await sendConfirmationEmail(booking, message);

    const googleSheetsPayload = formatBookingForGoogleSheets(booking, {
      email,
      phone,
    });
    void sendToGoogleSheets(googleSheetsPayload).catch((error) => {
      console.error("[integrations-in] Google Sheets sync failed:", error);
    });

    void notifyAppointmentWebhooks(
      buildWebhookPayload({
        booking,
        confirmationMessage: message,
        emailResult,
        usedAI,
        source: source ?? "website",
      })
    );

    return NextResponse.json(
      {
        status: "accepted",
        booking,
        confirmationMessage: message,
        emailResult,
        usedAI,
      },
      { status: 202 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to process booking.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
