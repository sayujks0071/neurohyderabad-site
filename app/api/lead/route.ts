import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/src/lib/rate-limit";
import { randomUUID } from "crypto";

const WEBAPP_URL = process.env.GOOGLE_APPS_SCRIPT_WEBAPP_URL;

export async function POST(req: NextRequest) {
  // 1. Rate Limiting
  // Use IP address for limiting. Fallback to 'unknown' if not present.
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const limit = rateLimit(ip, 5, 60 * 1000); // 5 requests per minute

  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();

    // 2. Honeypot Check
    if (body.company) {
      // Silently fail (return success) to fool bots
      return NextResponse.json({ ok: true, message: "Received" });
    }

    // 3. Generate Request ID if missing
    if (!body.requestId) {
      body.requestId = randomUUID();
    }

    // 4. Mock Mode (Development / No Env Var)
    if (!WEBAPP_URL) {
      if (process.env.NODE_ENV === "production") {
        console.error("GOOGLE_APPS_SCRIPT_WEBAPP_URL is not set in production.");
        return NextResponse.json(
          { error: "Internal Server Configuration Error" },
          { status: 500 }
        );
      } else {
        // Dev mode mock response
        console.warn("Using MOCK response because GOOGLE_APPS_SCRIPT_WEBAPP_URL is unset.");
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return NextResponse.json({
          ok: true,
          requestId: body.requestId,
          message: "[MOCK] Lead processed successfully",
          mock: true,
          driveFolderUrl: "https://drive.google.com/mock-folder",
          calendarEventId: "mock-calendar-event-id"
        });
      }
    }

    // 5. Forward to Google Apps Script
    const response = await fetch(WEBAPP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      // Handle HTTP errors from the script (rare, usually 200 OK with error body)
      return NextResponse.json(
        { error: "Failed to submit lead upstream." },
        { status: 502 }
      );
    }

    // Apps Script returns JSON (even for logical errors if we handled them)
    // Note: Google Apps Script sometimes returns a redirect (302) to a content page.
    // fetch handles redirects automatically by default.
    // However, the text/content returned by the redirected page is the JSON we output.
    const result = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error("Error in /api/lead:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
