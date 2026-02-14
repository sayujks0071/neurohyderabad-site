import { describe, it, expect } from "vitest";
import { validateLeadPayload } from "@/src/lib/validation";

describe("validateLeadPayload", () => {
  it("should validate a valid payload with painScore and mriScanAvailable", () => {
    const payload = {
      fullName: "John Doe",
      painScore: 5,
      mriScanAvailable: true,
    };
    const result = validateLeadPayload(payload);
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it("should validate a valid payload without painScore and mriScanAvailable (optional fields)", () => {
    const payload = {
      fullName: "Jane Doe",
    };
    const result = validateLeadPayload(payload);
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it("should fail if painScore is not a number", () => {
    const payload = {
      fullName: "John Doe",
      painScore: "high" as any,
    };
    const result = validateLeadPayload(payload);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Pain score must be a number between 1 and 10");
  });

  it("should fail if painScore is less than 1", () => {
    const payload = {
      fullName: "John Doe",
      painScore: 0,
    };
    const result = validateLeadPayload(payload);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Pain score must be a number between 1 and 10");
  });

  it("should fail if painScore is greater than 10", () => {
    const payload = {
      fullName: "John Doe",
      painScore: 11,
    };
    const result = validateLeadPayload(payload);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Pain score must be a number between 1 and 10");
  });

  it("should fail if mriScanAvailable is not a boolean", () => {
    const payload = {
      fullName: "John Doe",
      mriScanAvailable: "yes" as any,
    };
    const result = validateLeadPayload(payload);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("MRI Scan Available must be a boolean");
  });
});
