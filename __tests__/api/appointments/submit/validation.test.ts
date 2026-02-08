import { describe, it, expect } from "vitest";
import { parseBookingData, ValidationError } from "@/app/api/appointments/submit/validation";

const baseValidPayload = {
  patientName: "John Doe",
  email: "john@example.com",
  phone: "9876543210",
  age: 30,
  gender: "male",
  appointmentDate: "2023-12-25",
  appointmentTime: "10:00 AM",
  reason: "Severe back pain for 2 weeks.",
  painScore: 5,
  mriScanAvailable: true,
};

describe("Appointment API Validation", () => {
  it("parses valid payload correctly", () => {
    const result = parseBookingData(baseValidPayload);
    expect(result).toEqual({
      ...baseValidPayload,
      age: "30", // converted to string
      painScore: 5,
      mriScanAvailable: true,
    });
  });

  it("throws if painScore is missing", () => {
    const { painScore, ...invalidPayload } = baseValidPayload;
    expect(() => parseBookingData(invalidPayload)).toThrow(ValidationError);
    expect(() => parseBookingData(invalidPayload)).toThrow("Pain score is required");
  });

  it("throws if painScore is out of range", () => {
    const invalidPayload = { ...baseValidPayload, painScore: 11 };
    expect(() => parseBookingData(invalidPayload)).toThrow("Pain score must be between 1 and 10");
  });

  it("throws if mriScanAvailable is missing", () => {
    const { mriScanAvailable, ...invalidPayload } = baseValidPayload;
    expect(() => parseBookingData(invalidPayload)).toThrow("MRI Scan availability is required");
  });

  // Note: strict validation expects boolean, string "yes" falls into else block
  it("throws if mriScanAvailable is not a boolean", () => {
    const invalidPayload = { ...baseValidPayload, mriScanAvailable: "yes" };
    expect(() => parseBookingData(invalidPayload)).toThrow("MRI Scan availability is required");
  });
});
