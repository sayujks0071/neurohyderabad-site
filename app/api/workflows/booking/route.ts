/**
 * Appointment Booking API Route (Direct Implementation)
 *
 * Replaces the Vercel Workflow with direct execution to avoid bundler issues.
 * Performs validation, saves to CRM (Sheets), sends emails (Resend), and integrates with AI.
 */

import { NextRequest, NextResponse } from "next/server";
import type { BookingData } from "@/packages/appointment-form/types";
import { processBooking } from "@/src/lib/appointments/service";
import { rateLimit } from '@/src/lib/rate-limit';
import { inngest } from "@/src/lib/inngest";

type WorkflowAppointmentType = "new-consultation" | "follow-up" | "second-opinion";

// 🛡️ Sentinel: Input length limits to prevent DoS
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 20;
const MAX_REASON_LENGTH = 5000;
const MAX_INTAKE_LENGTH = 5000;
const MAX_DATE_LENGTH = 100; // ample space for various date formats

function sanitizeInput(input: string): string {
  // Basic trimming and removing null bytes
  return input.trim().replace(/\0/g, '');
}

export async function POST(request: NextRequest) {
  // 🛡️ Sentinel: Rate limiting - 5 requests per 60 seconds per IP
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const limit = rateLimit(ip, 5, 60 * 1000);

  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
            'X-RateLimit-Limit': limit.limit.toString(),
            'X-RateLimit-Remaining': limit.remaining.toString(),
            'X-RateLimit-Reset': limit.reset.toString(),
        }
      }
    );
  }

  try {
    const body = await request.json();

    // Parse and normalize input data
    let name = String(body.name ?? body.patientName ?? "");
    let email = String(body.email ?? "");
    let phone = String(body.phone ?? "");
    let preferredDate = String(body.preferredDate ?? body.appointmentDate ?? "");
    let preferredTime = String(body.preferredTime ?? body.appointmentTime ?? "");
    let chiefComplaint = String(body.chiefComplaint ?? body.symptoms ?? "");
    let intakeNotes = typeof body.intakeNotes === "string" ? body.intakeNotes : "";
    let ageValue = body.age == null ? "" : String(body.age);

    // 🛡️ Sentinel: Input Length Validation (DoS Prevention)
    if (name.length > MAX_NAME_LENGTH) {
      return NextResponse.json({ error: 'Name is too long' }, { status: 400 });
    }
    if (email.length > MAX_EMAIL_LENGTH) {
      return NextResponse.json({ error: 'Email is too long' }, { status: 400 });
    }
    if (phone.length > MAX_PHONE_LENGTH) {
      return NextResponse.json({ error: 'Phone number is too long' }, { status: 400 });
    }
    if (preferredDate.length > MAX_DATE_LENGTH) {
      return NextResponse.json({ error: 'Date is too long' }, { status: 400 });
    }
    if (chiefComplaint.length > MAX_REASON_LENGTH) {
      return NextResponse.json({ error: 'Reason/Symptoms text is too long' }, { status: 400 });
    }
    if (intakeNotes.length > MAX_INTAKE_LENGTH) {
      return NextResponse.json({ error: 'Intake notes text is too long' }, { status: 400 });
    }

    // 🛡️ Sentinel: Sanitize inputs
    name = sanitizeInput(name);
    email = sanitizeInput(email);
    phone = sanitizeInput(phone);
    preferredDate = sanitizeInput(preferredDate);
    preferredTime = sanitizeInput(preferredTime);
    chiefComplaint = sanitizeInput(chiefComplaint);
    intakeNotes = sanitizeInput(intakeNotes);
    ageValue = sanitizeInput(ageValue);

    const appointmentTypeRaw = typeof body.appointmentType === "string" ? sanitizeInput(body.appointmentType) : "";
    const appointmentType = (["new-consultation", "follow-up", "second-opinion"] as const).includes(appointmentTypeRaw as WorkflowAppointmentType)
      ? (appointmentTypeRaw as WorkflowAppointmentType)
      : "new-consultation";

    const genderRaw = typeof body.gender === "string" ? sanitizeInput(body.gender).toLowerCase() : "";
    const gender = (["male", "female", "other"] as const).includes(genderRaw as "male" | "female" | "other")
      ? (genderRaw as BookingData["gender"])
      : "other"; // Default fallback

    const painScore = typeof body.painScore === "number" ? body.painScore : 5;
    const mriScanAvailable = typeof body.mriScanAvailable === "boolean" ? body.mriScanAvailable : false;
    const source = typeof body.source === "string" ? sanitizeInput(body.source) : undefined;

    // Validate required fields
    if (!name || !email || !phone || !preferredDate || !chiefComplaint || painScore === undefined || mriScanAvailable === undefined) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          required: ["name", "email", "phone", "preferredDate", "chiefComplaint", "painScore", "mriScanAvailable"],
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ error: 'Invalid phone format' }, { status: 400 });
    }

    const bookingReason = intakeNotes || chiefComplaint;
    const booking: BookingData = {
      patientName: name,
      email,
      phone,
      age: ageValue,
      gender,
      appointmentDate: preferredDate,
      appointmentTime: preferredTime || "10:00",
      reason: bookingReason,
      painScore,
      mriScanAvailable,
    };

    const result = await processBooking(booking, {
      source: source || "website",
      appointmentType,
      intakeNotes,
      chiefComplaint: chiefComplaint // Pass original chiefComplaint for DB column
    });

    if (result.success) {
      // Trigger Analytics Conversion Event
      await inngest.send({
        name: "analytics/conversion",
        data: {
          conversionType: "appointment",
          page: source || "website",
          value: 100,
          timestamp: new Date().toISOString(),
          patientEmail: booking.email,
          patientName: booking.patientName,
          condition: booking.reason,
          userAgent: request.headers.get("user-agent") || undefined,
          referrer: request.headers.get("referer") || undefined,
        },
      });

      return NextResponse.json({
        message: result.message,
        patientName: result.patientName,
        status: result.status,
        confirmationMessage: result.confirmationMessage,
        usedAI: result.usedAI,
      });
    } else {
      return NextResponse.json(
        {
          error: result.error || "Failed to process booking",
          // 🛡️ Sentinel: Don't leak internal details on failure if possible, but keep message if it's user-friendly
          message: "An error occurred while processing your booking.",
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("[API] Error processing booking:", error);
    return NextResponse.json(
      {
        error: "Failed to process booking",
        // 🛡️ Sentinel: Secure error message
        message: "An unexpected error occurred.",
      },
      { status: 500 }
    );
  }
}
