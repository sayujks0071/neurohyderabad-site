"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/packages/appointment-form/ui/Input";
import Textarea from "@/packages/appointment-form/ui/Textarea";
import Select from "@/packages/appointment-form/ui/Select";
import Calendar from "@/packages/appointment-form/ui/Calendar";
import Button from "@/app/_components/Button";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";

const schema = z.object({
  patientName: z.string().min(1, "Patient name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  procedure: z.string().min(1, "Procedure performed is required"),
  surgeryDate: z.string().min(1, "Surgery date is required"),
  concern: z.string().min(1, "Your concern is required"),
  description: z.string().max(500, "Maximum 500 characters").min(1, "Description is required"),
  severity: z.string().min(1, "Severity is required"),
  company: z.string().optional(), // Honeypot
});

type FormData = z.infer<typeof schema>;

export default function FollowUpForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    reset,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      company: "",
      severity: "Mild",
    }
  });

  const severityValue = watch("severity");

  useEffect(() => {
    if (severityValue === "Severe") {
      setSubmitError("⚠️ WARNING: For severe symptoms, please call +91 9778280044 immediately or visit the nearest emergency department. Do not wait for an email response.");
    } else {
      setSubmitError(null);
    }
  }, [severityValue]);

  const onSubmit = async (data: FormData) => {
    if (data.severity === "Severe") {
      setSubmitError("Please call +91 9778280044 directly for severe symptoms.");
      return;
    }

    setSubmitError(null);
    try {
      const response = await fetch("/api/followup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit follow-up query.");
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
        title="Follow-up Query Received"
        message="Thank you for sending your follow-up query. Dr. Sayuj's team will review your concern and respond shortly with guidance. If you experience severe symptoms, please call +91 9778280044 immediately."
        onReset={handleReset}
        resetLabel="Submit another query"
      />
    );
  }

  return (
    <div className="relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6 sm:p-8 transition-all duration-300">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Post-Surgery Follow-Up Form</h2>

      <FormError message={submitError} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-6"
        toolname="submitFollowUp"
        tooldescription="Submit a post-surgery follow-up query"
        toolautosubmit="false"
      >
        {/* Hidden Honeypot */}
        <div className="hidden" aria-hidden="true">
          <input tabIndex={-1} autoComplete="off" {...register("company")} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Patient Name" id="patientName" {...register("patientName")} error={errors.patientName?.message} required />
          <Input label="Phone Number" id="phone" type="tel" {...register("phone")} error={errors.phone?.message} required />
          <Input label="Email Address (Optional)" id="email" type="email" {...register("email")} error={errors.email?.message} />
          <Select label="Procedure Performed" id="procedure" {...register("procedure")} error={errors.procedure?.message} required>
            <option value="">Select...</option>
            <option value="Laparoscopic Surgery">Laparoscopic Surgery</option>
            <option value="Bariatric Surgery">Bariatric Surgery</option>
            <option value="Robotic Surgery">Robotic Surgery</option>
            <option value="Hernia Repair">Hernia Repair</option>
            <option value="Other">Other</option>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            control={control}
            name="surgeryDate"
            render={({ field }) => (
              <Calendar
                label="Date of Surgery"
                value={field.value || ""}
                onChange={field.onChange}
                error={errors.surgeryDate?.message}
              />
            )}
          />

          <Select label="Your Concern" id="concern" {...register("concern")} error={errors.concern?.message} required>
            <option value="">Select concern type...</option>
            <option value="Pain">Pain Management</option>
            <option value="Wound">Wound / Incision Site</option>
            <option value="Diet">Diet / Digestion</option>
            <option value="Activity">Activity / Mobility</option>
            <option value="Medication">Medication Issues</option>
            <option value="Other">Other</option>
          </Select>
        </div>

        <div className="space-y-4">
          <Textarea label="Describe your concern" id="description" placeholder="Provide details about what you are experiencing..." maxLength={500} {...register("description")} error={errors.description?.message} required />
          <div className="text-right text-xs text-slate-500">Max 500 characters</div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700">Severity of Symptoms</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="Mild" aria-label="Mild severity" {...register("severity")} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
              <span className="text-sm font-medium text-slate-700">Mild</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="Moderate" aria-label="Moderate severity" {...register("severity")} className="w-4 h-4 text-yellow-600 focus:ring-yellow-500 border-gray-300" />
              <span className="text-sm font-medium text-slate-700">Moderate</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="Severe" aria-label="Severe severity" {...register("severity")} className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300" />
              <span className="text-sm font-medium text-red-600 font-bold">Severe (Requires immediate attention)</span>
            </label>
          </div>
          {errors.severity && <p className="text-xs text-red-500 mt-1">{errors.severity.message as string}</p>}
        </div>

        <div className="pt-4">
          <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting || severityValue === "Severe"} className="w-full sm:w-full">
            {isSubmitting ? "Submitting..." : "Send to Dr. Sayuj's Team"}
          </Button>
        </div>
      </form>
    </div>
  );
}
