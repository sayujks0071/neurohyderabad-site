import type { BookingData } from "@/packages/appointment-form/types";

const ALLOWED_GENDERS = new Set(["male", "female", "other"]);
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[0-9\s()-]{10,}$/;

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export function parseBookingData(payload: unknown): BookingData {
  if (!payload || typeof payload !== "object") {
    throw new ValidationError("Invalid body");
  }

  const raw = payload as Record<string, unknown>;

  const patientName = String(raw.patientName ?? "").trim();
  if (patientName.length < 3) {
    throw new ValidationError("Patient name is invalid.");
  }

  const email = String(raw.email ?? "").trim();
  if (!EMAIL_REGEX.test(email)) {
    throw new ValidationError("Email is invalid.");
  }

  const phone = String(raw.phone ?? "").trim();
  if (!PHONE_REGEX.test(phone)) {
    throw new ValidationError("Phone number is invalid.");
  }

  const ageValue =
    typeof raw.age === "number" ? raw.age : Number(String(raw.age ?? "").trim());
  if (!Number.isFinite(ageValue) || ageValue <= 0 || ageValue > 120) {
    throw new ValidationError("Age must be a valid number.");
  }

  const gender = String(raw.gender ?? "").trim().toLowerCase();
  if (!ALLOWED_GENDERS.has(gender)) {
    throw new ValidationError("Gender is invalid.");
  }

  const appointmentDate = String(raw.appointmentDate ?? "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(appointmentDate)) {
    throw new ValidationError("Appointment date is invalid.");
  }

  const appointmentTime = String(raw.appointmentTime ?? "").trim();
  if (!appointmentTime) {
    throw new ValidationError("Appointment time is required.");
  }

  const reason = String(raw.reason ?? "").trim();
  if (reason.length < 10) {
    throw new ValidationError("Reason must be at least 10 characters.");
  }

  let painScore: number;
  if (typeof raw.painScore === "number") {
    painScore = raw.painScore;
  } else if (raw.painScore !== undefined && raw.painScore !== null && raw.painScore !== "") {
    painScore = Number(raw.painScore);
  } else {
    throw new ValidationError("Pain score is required.");
  }

  if (!Number.isFinite(painScore) || painScore < 1 || painScore > 10) {
    throw new ValidationError("Pain score must be between 1 and 10.");
  }

  let mriScanAvailable: boolean;
  if (typeof raw.mriScanAvailable === "boolean") {
    mriScanAvailable = raw.mriScanAvailable;
  } else {
    throw new ValidationError("MRI Scan availability is required.");
  }

  return {
    patientName,
    email,
    phone,
    age: String(ageValue),
    gender: gender as BookingData["gender"],
    appointmentDate,
    appointmentTime,
    reason,
    painScore,
    mriScanAvailable,
  };
}
