import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/src/lib/rate-limit";
import { randomUUID } from "crypto";

const WEBAPP_URL = process.env.GOOGLE_APPS_SCRIPT_WEBAPP_URL;
const API_TOKEN = process.env.GOOGLE_APPS_SCRIPT_API_TOKEN;

// Allowed origins for CORS (in production, restrict to your actual domains)
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:5173'];

function getCorsHeaders(origin: string | null) {
  // If origin is in allowed list, return it; otherwise don't set the header (browser will block)
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : null;
  
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  
  // Only set the origin header if we have an allowed origin
  if (allowedOrigin) {
    headers['Access-Control-Allow-Origin'] = allowedOrigin;
  }
  
  return headers;
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);
  
  // 1. Rate Limiting
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const limit = await rateLimit(ip, 5, 60 * 1000); // 5 requests per minute

  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: corsHeaders }
    );
  }

  try {
    const body = await req.json();

    // 2. Honeypot Check
    if (body.company) {
      // Honeypot triggered: the "company" field should remain empty for real users.
      // We intentionally return a generic success response to avoid signaling bots that
      // their submission was rejected, but we still log this event for monitoring.
      console.warn("Honeypot field 'company' was filled; treating submission as spam.", {
        ip,
      });
      return NextResponse.json({ ok: true, message: "Received" }, { headers: corsHeaders });
    }

    // 3. Generate Request ID if missing
    if (!body.requestId) {
      body.requestId = randomUUID();
    }

    // 4. Inject API Token
    // We only inject this if it exists.
    // If it's missing in Production, we'll fail below.
    if (API_TOKEN) {
      body.apiToken = API_TOKEN;
    }

    // 5. Mock Mode (Development / No Env Var)
    if (!WEBAPP_URL) {
      if (process.env.NODE_ENV === "production") {
        console.error("GOOGLE_APPS_SCRIPT_WEBAPP_URL is not set in production.");
        return NextResponse.json(
          { error: "Internal Server Configuration Error" },
          { status: 500, headers: corsHeaders }
        );
      } else {
        // Dev mode mock response
        console.warn("Using MOCK response because GOOGLE_APPS_SCRIPT_WEBAPP_URL is unset.");
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return NextResponse.json({
          ok: true,
          requestId: body.requestId,
          message: "[MOCK] Lead processed successfully",
          mock: true,
          driveFolderUrl: "https://drive.google.com/mock-folder",
          calendarEventId: "mock-calendar-event-id"
        }, { headers: corsHeaders });
      }
    }

    // 6. Security Check for Token
    if (!API_TOKEN) {
      // In production, we MUST have a token for the new secure script
      if (process.env.NODE_ENV === "production") {
        console.error("GOOGLE_APPS_SCRIPT_API_TOKEN is not set in production.");
        return NextResponse.json(
          { error: "Internal Server Configuration Error" },
          { status: 500, headers: corsHeaders }
        );
      }
      // In dev, we might just be testing connectivity to a script that doesn't enforce it yet,
      // or we accept it might fail auth.
      console.warn("GOOGLE_APPS_SCRIPT_API_TOKEN is unset. Upstream script may reject request.");
    }

    // 7. Forward to Google Apps Script
    const response = await fetch(WEBAPP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to submit lead upstream." },
        { status: 502, headers: corsHeaders }
      );
    }

    const result = await response.json();
    return NextResponse.json(result, { headers: corsHeaders });

  } catch (error) {
    console.error("Error in /api/lead:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(origin),
  });
}
