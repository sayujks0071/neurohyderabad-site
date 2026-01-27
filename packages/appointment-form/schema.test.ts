import { describe, it, expect } from "vitest";
import { appointmentSchema } from "./schema";

const baseValidData = {
  patientName: "John Doe",
  email: "john@example.com",
  contactNumber: "9876543210",
  age: "30",
  gender: "male",
  requestedDate: new Date(Date.now() + 86400000), // Tomorrow
  appointmentTime: "10:00 AM",
  reason: "Severe back pain for 2 weeks. Need appointment.",
  painScore: 5,
  mriScanAvailable: true,
};

describe("Appointment Schema Validation", () => {
  it("validates a correct form object", () => {
    const result = appointmentSchema.safeParse(baseValidData);
    expect(result.success).toBe(true);
  });

  it("fails when patientName is too short", () => {
    const invalidData = {
      ...baseValidData,
      patientName: "A",
    };
    const result = appointmentSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const error = result.error.issues.find(i => i.path.includes("patientName"));
      expect(error?.message).toBe("Name is too short");
    }
  });

  it("fails when contactNumber is invalid", () => {
    const invalidData = {
      ...baseValidData,
      contactNumber: "1234567890", // Invalid start digit (starts with 1)
    };
    const result = appointmentSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const error = result.error.issues.find(i => i.path.includes("contactNumber"));
      expect(error?.message).toBe("Please enter a valid 10-digit mobile number");
    }
  });

  it("fails when requestedDate is in the past", () => {
    const pastDate = new Date(Date.now() - 86400000); // Yesterday
    const invalidData = {
      ...baseValidData,
      requestedDate: pastDate,
    };
    const result = appointmentSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const error = result.error.issues.find(i => i.path.includes("requestedDate"));
      expect(error?.message).toBe("Date must be in the future");
    }
  });

  it("passes when requestedDate is exactly now (dynamic check allows Today)", async () => {
    // The schema explicitly allows 'Today' by setting time to 00:00:00
    const now = new Date();
    const validData = {
      ...baseValidData,
      requestedDate: now,
    };
    const result = appointmentSchema.safeParse(validData);

    expect(result.success).toBe(true);
  });

  it("fails when painScore is out of range", () => {
    const invalidData = {
      ...baseValidData,
      painScore: 11,
    };
    const result = appointmentSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const error = result.error.issues.find(i => i.path.includes("painScore"));
      expect(error).toBeDefined();
    }
  });

  it("fails when painScore is too low", () => {
    const invalidData = {
      ...baseValidData,
      painScore: 0,
    };
    const result = appointmentSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const error = result.error.issues.find(i => i.path.includes("painScore"));
      expect(error).toBeDefined();
    }
  });

  it("coerces string painScore to number", () => {
    const validDataWithString = {
      ...baseValidData,
      painScore: "7",
    };
    const result = appointmentSchema.safeParse(validDataWithString);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.painScore).toBe(7);
    }
  });

  it("defaults mriScanAvailable to false if missing", () => {
    const { mriScanAvailable, ...dataWithoutMri } = baseValidData;
    const result = appointmentSchema.safeParse(dataWithoutMri);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.mriScanAvailable).toBe(false);
    }
  });
});
