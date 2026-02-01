import { z } from "zod";

export const appointmentSchema = z.object({
  patientName: z.string().min(2, "Name is too short"),
  email: z.string().email("Please enter a valid email address"),
  contactNumber: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number"),
  age: z.string().regex(/^\d+$/, "Age must be a number").refine((val) => {
    const n = Number(val);
    return Number.isFinite(n) && n > 0 && n <= 120;
  }, "Age seems too high"),
  gender: z.enum(["male", "female", "other"], { errorMap: () => ({ message: "Please select a gender" }) }),
  // Using .min() with start of today to allow 'Today' while enforcing future/present date.
  requestedDate: z.date().min(new Date(new Date().setHours(0, 0, 0, 0)), "Date must be in the future"),
  appointmentTime: z.string().min(1, "Please select a time"),
  reason: z.string().min(10, "Please provide more details (min 10 characters)"),
  painScore: z.coerce.number().min(1).max(10),
  mriScanAvailable: z.boolean().optional(),
});

export type BookingFormValues = z.input<typeof appointmentSchema>;
