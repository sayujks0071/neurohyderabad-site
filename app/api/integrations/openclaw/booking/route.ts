import { NextRequest, NextResponse } from "next/server";
import { normalizeBookingData, processBooking } from "@/src/lib/appointments/service";

const API_KEY = process.env.OPENCLAW_API_KEY;

function isAuthenticated(req: NextRequest): boolean {
  if (!API_KEY) return false; // Fail secure if no key set
  const authHeader = req.headers.get("authorization");
  const apiKeyHeader = req.headers.get("x-api-key");

  if (apiKeyHeader === API_KEY) return true;
  if (authHeader?.startsWith("Bearer ") && authHeader.split(" ")[1] === API_KEY) return true;

  return false;
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized. Set OPENCLAW_API_KEY env var and provide it in headers." }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Explicitly mark source as 'openclaw-agent'
    const source = "openclaw-agent";

    const { booking, error, missingFields } = normalizeBookingData(body);

    if (error || !booking) {
      return NextResponse.json(
        {
          error: error || "Invalid booking data",
          required: missingFields,
        },
        { status: 400 }
      );
    }

    const result = await processBooking(booking, source);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[OpenClaw API] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
