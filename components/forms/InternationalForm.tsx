"use client";

import { useState } from "react";
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
  country: z.string().min(1, "Country is required"),
  whatsapp: z.string().min(1, "WhatsApp number is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  nationality: z.string().min(1, "Nationality is required"),
  diagnosis: z.string().min(1, "Diagnosis/Condition is required"),
  reportsAvailable: z.boolean().optional(),
  preferredMode: z.string().min(1, "Preferred mode is required"),
  travelDates: z.string().optional(),
  notes: z.string().optional(),
  company: z.string().optional(), // Honeypot
});

type FormData = z.infer<typeof schema>;

const countriesList = [
  "United Arab Emirates", "Saudi Arabia", "Oman", "Kuwait", "Qatar", "Bahrain",
  "United States", "United Kingdom", "Canada", "Australia", "Singapore", "Malaysia",
  "Tanzania", "Kenya", "Nigeria", "South Africa", "Bangladesh", "Nepal", "Sri Lanka"
];

export default function InternationalForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    reset,
    handleSubmit,
    control,
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
      const response = await fetch("/api/international", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit enquiry.");
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
        title="Enquiry Received"
        message="Thank you for contacting us. Our International Patient Coordinator will reach out to you within 24 hours on your WhatsApp or Email to coordinate your consultation."
        onReset={handleReset}
        resetLabel="Submit another enquiry"
      />
    );
  }

  return (
    <div className="relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6 sm:p-8 transition-all duration-300">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">International Consultation Request</h2>

      <FormError message={submitError} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-6"
        toolname="requestInternationalConsultation"
        tooldescription="Request an international consultation"
        toolautosubmit="false"
      >
        {/* Hidden Honeypot */}
        <div className="hidden" aria-hidden="true">
          <input tabIndex={-1} autoComplete="off" {...register("company")} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Patient Name" id="patientName" {...register("patientName")} error={errors.patientName?.message} required />
          <Select label="Country of Residence" id="country" {...register("country")} error={errors.country?.message} required>
            <option value="">Select country...</option>
            {countriesList.map(c => <option key={c} value={c}>{c}</option>)}
            <option value="Other">Other</option>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="WhatsApp Number (with code)" id="whatsapp" type="tel" placeholder="+1 ..." {...register("whatsapp")} error={errors.whatsapp?.message} required />
          <Input label="Email Address" id="email" type="email" {...register("email")} error={errors.email?.message} required />
          <Input label="Nationality / Passport" id="nationality" {...register("nationality")} error={errors.nationality?.message} required />
          <Input label="Diagnosis / Condition" id="diagnosis" {...register("diagnosis")} error={errors.diagnosis?.message} required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select label="Preferred Consultation Mode" id="preferredMode" {...register("preferredMode")} error={errors.preferredMode?.message} required>
            <option value="">Select...</option>
            <option value="Video Call First">Telemedicine / Video Call First</option>
            <option value="In-Person Direct">Travel for In-Person Direct</option>
            <option value="Unsure">Unsure / Need Advice</option>
          </Select>

          <Controller
            control={control}
            name="travelDates"
            render={({ field }) => (
              <Calendar
                label="Tentative Travel Dates (Optional)"
                value={field.value || ""}
                onChange={field.onChange}
                error={errors.travelDates?.message}
              />
            )}
          />
        </div>

        <div className="space-y-4">
          <Textarea label="Additional Notes (Optional)" id="notes" placeholder="Please mention any specific symptoms or requests..." {...register("notes")} error={errors.notes?.message} />

          <label className="flex items-center p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
            <input type="checkbox" id="reportsAvailable" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300" {...register("reportsAvailable")} />
            <span className="ml-3 text-sm font-medium text-slate-700 select-none">I have Medical Reports (MRI/CT/Labs) in English</span>
          </label>
        </div>

        <div className="pt-4">
          <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting} className="w-full sm:w-full">
            {isSubmitting ? "Submitting..." : "Request International Consultation"}
          </Button>
        </div>
      </form>
    </div>
  );
}
