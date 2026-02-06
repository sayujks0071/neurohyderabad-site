import { z } from "zod";

export const appointmentSchema = z.object({
  patientName: z.string().min(2, "Name is too short"),
  email: z.string().email("Please enter a valid email address"),
  contactNumber: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  age: z.string().regex(/^\d+$/, "Age must be a number").refine((val) => {
    const n = Number(val);
    return Number.isFinite(n) && n > 0 && n <= 120;
  }, "Age seems too high"),
  gender: z.enum(["male", "female", "other"], { errorMap: () => ({ message: "Please select a gender" }) }),
  requestedDate: z.date().min(new Date(), "Date must be in the future"),
  appointmentTime: z.string().min(1, "Please select a time"),
  reason: z.string().min(10, "Please provide more details (min 10 characters)"),
  painScore: z.coerce.number().min(1).max(10),
  mriScanAvailable: z.boolean().default(false),
});

// Note:
// - `zodResolver` is typed on schema input, where `.default()` makes the key optional.
// - For RHF, treating form values as schema *input* avoids TS incompatibilities.
export type BookingFormValues = z.input<typeof appointmentSchema>;
export type BookingFormParsedValues = z.output<typeof appointmentSchema>;
