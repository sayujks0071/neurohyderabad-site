import { z } from "zod";

export const ReferralDataSchema = z.object({
  patientName: z.string().describe("Full name of the patient"),
  patientDob: z.string().optional().describe("Date of birth of the patient if available"),
  referringDoctor: z.string().describe("Name of the referring doctor or clinic"),
  urgency: z.enum(["Routine", "Urgent", "Emergency"]).describe("Urgency level of the referral"),
  suspectedDiagnosis: z.string().describe("The suspected diagnosis or condition"),
  reasonForReferral: z.string().describe("Why the patient is being referred"),
  insurance: z.string().optional().describe("Insurance provider name if mentioned"),
});

export type ReferralData = z.infer<typeof ReferralDataSchema>;
