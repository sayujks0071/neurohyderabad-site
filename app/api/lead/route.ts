import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/src/lib/rate-limit";
import { randomUUID } from "crypto";

const WEBAPP_URL = process.env.GOOGLE_APPS_SCRIPT_WEBAPP_URL;
const API_TOKEN = process.env.GOOGLE_APPS_SCRIPT_API_TOKEN;

type LeadPayload = {
  fullName?: string;
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
  concern?: string;
  condition?: string;
  reason?: string;
  preferredDate?: string;
  appointmentDate?: string;
  preferredTime?: string;
  appointmentTime?: string;
  source?: string;
  company?: string;
  requestId?: string;
  metadata?: Record<string, unknown>;
};

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const limit = rateLimit(ip, 5, 60 * 1000);

  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = (await request.json()) as LeadPayload;

    if (body.company) {
      console.warn("Honeypot field 'company' was filled; treating submission as spam.", {
        ip,
      });
      return NextResponse.json({ ok: true, message: "Received" });
    }

    const fullName = normalizeString(body.fullName ?? body.name);
    if (!fullName) {
      return NextResponse.json(
        { error: "Missing required fields", required: ["fullName"] },
        { status: 400 }
      );
    }

    const payload = {
      requestId: body.requestId ?? randomUUID(),
      fullName,
      phone: normalizeString(body.phone),
      email: normalizeString(body.email),
      city: normalizeString(body.city),
      concern: normalizeString(body.concern ?? body.reason ?? body.condition),
      preferredDate: normalizeString(body.preferredDate ?? body.appointmentDate),
      preferredTime: normalizeString(body.preferredTime ?? body.appointmentTime),
      source: normalizeString(body.source || "website"),
      metadata: body.metadata ?? {},
    };

    if (!WEBAPP_URL) {
      if (process.env.NODE_ENV === "production") {
        console.error("GOOGLE_APPS_SCRIPT_WEBAPP_URL is not set in production.");
        return NextResponse.json(
          { error: "Internal Server Configuration Error" },
          { status: 500 }
        );
      }

      console.warn("Using MOCK response because GOOGLE_APPS_SCRIPT_WEBAPP_URL is unset.");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return NextResponse.json({
        ok: true,
        requestId: payload.requestId,
        message: "[MOCK] Lead processed successfully",
        mock: true,
        driveFolderUrl: "https://drive.google.com/mock-folder",
        calendarEventId: "mock-calendar-event-id",
      });
    }

    if (!API_TOKEN) {
      if (process.env.NODE_ENV === "production") {
        console.error("GOOGLE_APPS_SCRIPT_API_TOKEN is not set in production.");
        return NextResponse.json(
          { error: "Internal Server Configuration Error" },
          { status: 500 }
        );
      }
      console.warn(
        "GOOGLE_APPS_SCRIPT_API_TOKEN is unset. Upstream script may reject request."
      );
    }

    const response = await fetch(WEBAPP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        ...(API_TOKEN ? { apiToken: API_TOKEN } : {}),
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to submit lead upstream." },
        { status: 502 }
      );
    }

    const result = await response.json();
    if (result?.ok === false) {
      return NextResponse.json(
        { error: result.error || "Submission failed upstream." },
        { status: 400 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in /api/lead:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    configured: !!(WEBAPP_URL && API_TOKEN),
    webappUrl: WEBAPP_URL ? "***configured***" : "missing",
    apiToken: API_TOKEN ? "***configured***" : "missing",
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
