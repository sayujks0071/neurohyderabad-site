
import { NextRequest, NextResponse, after } from "next/server";
import { rateLimit } from "@/src/lib/rate-limit";
import { validateLeadPayload } from "@/src/lib/validation";
import { submitToGoogleSheets } from "@/src/lib/google-sheets";
import { randomUUID } from "crypto";

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
  painScore?: number;
  mriScanAvailable?: boolean;
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

    // Normalize fields before validation to ensure we validate exactly what we process
    const phone = normalizeString(body.phone);
    const email = normalizeString(body.email);
    const city = normalizeString(body.city);
    const concern = normalizeString(body.concern ?? body.reason ?? body.condition);
    const source = normalizeString(body.source || "website");
    const preferredDate = normalizeString(body.preferredDate ?? body.appointmentDate);
    const preferredTime = normalizeString(body.preferredTime ?? body.appointmentTime);

    // 🛡️ Sentinel: Validate input lengths to prevent DoS
    const validation = validateLeadPayload({
      fullName,
      phone,
      email,
      city,
      concern,
      source,
    });

    if (!validation.isValid) {
      return NextResponse.json(
        { error: "Validation Error", details: validation.error },
        { status: 400 }
      );
    }

    const payload = {
      requestId: body.requestId ?? randomUUID(),
      fullName,
      phone,
      email,
      city,
      concern,
      preferredDate,
      preferredTime,
      source,
      metadata: {
        ...(body.metadata ?? {}),
        painScore: body.painScore,
        mriScanAvailable: body.mriScanAvailable,
      },
    };

    // Submit to Google Sheets (if configured)
    // Use `after` to process Google Sheet submission in the background
    // This reduces the response time for the user significantly (300-1500ms -> <50ms)
    after(() => submitToGoogleSheets(payload));

    // 🛡️ Sentinel: Redact sensitive PII from logs
    console.log("[api/lead] Lead received:", {
      fullName,
      phone: phone ? `${phone.slice(0, 3)}***${phone.slice(-3)}` : undefined,
      email: email ? `${email[0]}***@${email.split('@')[1]}` : undefined,
      source
    });

    return NextResponse.json({
      ok: true,
      message: "Lead received successfully",
      requestId: payload.requestId,
      note: "Data processed"
    });
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
  });
}
