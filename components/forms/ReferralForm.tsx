"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/packages/appointment-form/ui/Input";
import Textarea from "@/packages/appointment-form/ui/Textarea";
import Select from "@/packages/appointment-form/ui/Select";
import Button from "@/app/_components/Button";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";

const schema = z.object({
  doctorName: z.string().min(1, "Your name is required"),
  specialty: z.string().min(1, "Specialty is required"),
  hospital: z.string().min(1, "Hospital/Clinic is required"),
  doctorEmail: z.string().min(1, "Email is required").email("Invalid email address"),
  doctorPhone: z.string().min(1, "Phone number is required"),
  patientName: z.string().min(1, "Patient name is required"),
  patientAge: z.string().min(1, "Patient age is required"),
  patientGender: z.string().min(1, "Patient gender is required"),
  diagnosis: z.string().min(1, "Diagnosis/Condition is required"),
  urgency: z.string().min(1, "Urgency is required"),
  notes: z.string().optional(),
  reportsAvailable: z.boolean().optional(),
  company: z.string().optional(), // Honeypot
});

type FormData = z.infer<typeof schema>;

export default function ReferralForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      reportsAvailable: false,
      company: "",
    }
  });

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    try {
      const response = await fetch("/api/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit referral.");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Submission error:", err);
      setSubmitError(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    reset();
  };

  if (isSubmitted) {
    return (
      <FormSuccess
        title="Referral Received"
        message="Thank you for your referral. We have received the details and will contact you and the patient within 2 hours to schedule an appointment. For urgent cases, please call +91 9778280044 directly."
        onReset={handleReset}
        resetLabel="Submit another referral"
      />
    );
  }

  return (
    <div className="relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6 sm:p-8 transition-all duration-300">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Patient Referral Form</h2>

      <FormError message={submitError} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-6"
        toolname="submitReferral"
        tooldescription="Submit a patient referral"
        toolautosubmit="false"
      >
        {/* Hidden Honeypot */}
        <div className="hidden" aria-hidden="true">
          <input tabIndex={-1} autoComplete="off" {...register("company")} />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-800 border-b border-blue-100 pb-2">Referring Doctor Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Your Name" id="doctorName" {...register("doctorName")} error={errors.doctorName?.message} required />
            <Input label="Your Specialty" id="specialty" {...register("specialty")} error={errors.specialty?.message} required />
            <Input label="Your Hospital / Clinic" id="hospital" {...register("hospital")} error={errors.hospital?.message} required />
            <Input label="Your Email" id="doctorEmail" type="email" {...register("doctorEmail")} error={errors.doctorEmail?.message} required />
            <Input label="Your Phone" id="doctorPhone" type="tel" {...register("doctorPhone")} error={errors.doctorPhone?.message} required />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-800 border-b border-blue-100 pb-2">Patient Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Patient Name" id="patientName" {...register("patientName")} error={errors.patientName?.message} required />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Age" id="patientAge" type="number" {...register("patientAge")} error={errors.patientAge?.message} required />
              <Select label="Gender" id="patientGender" {...register("patientGender")} error={errors.patientGender?.message} required>
                <option value="">Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            </div>
            <Input label="Diagnosis / Condition" id="diagnosis" className="md:col-span-2" {...register("diagnosis")} error={errors.diagnosis?.message} required />
            <Select label="Urgency" id="urgency" className="md:col-span-2" {...register("urgency")} error={errors.urgency?.message} required>
              <option value="">Select urgency...</option>
              <option value="Routine">Routine (within 1-2 weeks)</option>
              <option value="Urgent">Urgent (within 48 hours)</option>
              <option value="Emergency">Emergency (Immediate)</option>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <Textarea label="Clinical Notes / Summary (Optional)" id="notes" placeholder="Brief history or specific requests..." {...register("notes")} error={errors.notes?.message} />

          <label className="flex items-center p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
            <input type="checkbox" id="reportsAvailable" aria-label="Reports available (MRI/CT/Labs)" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300" {...register("reportsAvailable")} />
            <span className="ml-3 text-sm font-medium text-slate-700 select-none">Reports available (MRI/CT/Labs)</span>
          </label>
        </div>

        <div className="pt-4">
          <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting} className="w-full sm:w-full">
            {isSubmitting ? "Submitting..." : "Submit Referral"}
          </Button>
        </div>
      </form>
    </div>
  );
}
