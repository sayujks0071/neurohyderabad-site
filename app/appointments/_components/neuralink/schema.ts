import { z } from "zod";
import { AppointmentType } from "./types";

export const appointmentSchema = z.object({
  patientName: z.string().min(2, "Name is too short"),
  contactNumber: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  email: z.string().email("Please enter a valid email address"),
  age: z.coerce.number().min(0).max(120, "Please enter a valid age"),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Please select a gender" }),
  }),
  symptoms: z.string().min(1, "Please describe your symptoms"),
  painScore: z.coerce.number().min(1).max(10),
  hasMRI: z.boolean(),

  // Fields from Step 1
  appointmentType: z.nativeEnum(AppointmentType, {
    errorMap: () => ({ message: "Please select an appointment type" }),
  }),
  appointmentDate: z.string().min(1, "Please select a date"), // Intermediate field for UI state
  appointmentTime: z.string().min(1, "Please select a time"),
  requestedDate: z.date().min(new Date(), "Date must be in the future"),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
