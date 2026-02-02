import { NextRequest, NextResponse } from "next/server";
import { normalizeBookingData, processBooking } from "@/src/lib/appointments/service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const source = typeof body.source === "string" ? body.source : undefined;

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
      return NextResponse.json(
        {
          error: "Failed to process booking",
          message: result.error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: result.message,
      patientName: result.patientName,
      status: "confirmed",
      confirmationMessage: result.confirmationMessage,
      usedAI: result.usedAI,
    });

  } catch (error) {
    console.error("[API] Error processing booking:", error);
    return NextResponse.json(
      {
        error: "Failed to process booking",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
