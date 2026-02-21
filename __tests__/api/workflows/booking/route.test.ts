import { POST } from "@/app/api/workflows/booking/route";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// Mock dependencies
vi.mock("@/src/lib/appointments/service", () => ({
  processBooking: vi.fn(),
}));

vi.mock("@/src/lib/inngest", () => ({
  inngest: {
    send: vi.fn(),
  },
}));

import { processBooking } from "@/src/lib/appointments/service";

describe("POST /api/workflows/booking", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("successfully processes a valid booking with painScore and mriScanAvailable", async () => {
    (processBooking as any).mockResolvedValue({
      success: true,
      message: "Booking confirmed",
      patientName: "John Doe",
      status: "confirmed",
      confirmationMessage: "See you soon!",
      usedAI: false,
    });

    const payload = {
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
      preferredDate: "2023-12-25",
      chiefComplaint: "Headache",
      painScore: 8,
      mriScanAvailable: true,
      age: 30,
      gender: "male",
    };

    const req = new NextRequest("http://localhost/api/workflows/booking", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.message).toBe("Booking confirmed");

    // Verify processBooking was called with correct data
    expect(processBooking).toHaveBeenCalledWith(
      expect.objectContaining({
        patientName: "John Doe",
        painScore: 8,
        mriScanAvailable: true,
      }),
      expect.objectContaining({
        source: "website",
      })
    );
  });

  it("uses default values if painScore is missing", async () => {
    (processBooking as any).mockResolvedValue({
      success: true,
      message: "Booking confirmed",
      patientName: "John Doe",
      status: "confirmed",
      confirmationMessage: "See you soon!",
      usedAI: false,
    });

    const payload = {
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
      preferredDate: "2023-12-25",
      chiefComplaint: "Headache",
      // painScore missing
      mriScanAvailable: true,
      age: 30,
      gender: "male",
    };

    const req = new NextRequest("http://localhost/api/workflows/booking", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(processBooking).toHaveBeenCalledWith(
      expect.objectContaining({
        painScore: 5, // Default
      }),
      expect.anything()
    );
  });

  it("clamps painScore to 1-10", async () => {
    (processBooking as any).mockResolvedValue({
      success: true,
      message: "Booking confirmed",
    });

    // Test upper bound
    const payloadHigh = {
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
      preferredDate: "2023-12-25",
      chiefComplaint: "Headache",
      painScore: 100, // Too high
      mriScanAvailable: true,
      age: 30,
      gender: "male",
    };

    const reqHigh = new NextRequest("http://localhost/api/workflows/booking", {
      method: "POST",
      body: JSON.stringify(payloadHigh),
    });

    await POST(reqHigh);
    expect(processBooking).toHaveBeenCalledWith(
      expect.objectContaining({
        painScore: 10, // Clamped
      }),
      expect.anything()
    );

    // Test lower bound
    const payloadLow = {
      ...payloadHigh,
      painScore: -5, // Too low
    };

    const reqLow = new NextRequest("http://localhost/api/workflows/booking", {
      method: "POST",
      body: JSON.stringify(payloadLow),
    });

    await POST(reqLow);
    expect(processBooking).toHaveBeenCalledWith(
      expect.objectContaining({
        painScore: 1, // Clamped
      }),
      expect.anything()
    );
  });

  it("uses default values if mriScanAvailable is missing", async () => {
    (processBooking as any).mockResolvedValue({
      success: true,
      message: "Booking confirmed",
      patientName: "John Doe",
      status: "confirmed",
      confirmationMessage: "See you soon!",
      usedAI: false,
    });

    const payload = {
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
      preferredDate: "2023-12-25",
      chiefComplaint: "Headache",
      painScore: 8,
      // mriScanAvailable missing
      age: 30,
      gender: "male",
    };

    const req = new NextRequest("http://localhost/api/workflows/booking", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(processBooking).toHaveBeenCalledWith(
      expect.objectContaining({
        mriScanAvailable: false, // Default
      }),
      expect.anything()
    );
  });
});
