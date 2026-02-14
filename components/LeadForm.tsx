'use client';

import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle } from "lucide-react";
import { analytics } from "@/src/lib/analytics";
import Button from "@/packages/appointment-form/ui/Button";
import Input from "@/packages/appointment-form/ui/Input";
import Textarea from "@/packages/appointment-form/ui/Textarea";
import Calendar from "@/packages/appointment-form/ui/Calendar";
import Select from "@/packages/appointment-form/ui/Select";
import { APPOINTMENT_SUCCESS_MESSAGE } from "@/packages/appointment-form/constants";

const schema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .transform((val) => val.replace(/[^\d+]/g, ""))
    .refine((val) => /^[0-9+]{8,15}$/.test(val), "Please enter a valid phone number (8-15 digits)"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  city: z.string().min(1, "City is required"),
  concern: z.string().min(10, "Please provide a bit more detail"),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  painScore: z.coerce.number().min(1).max(10).optional(),
  mriScanAvailable: z.boolean().optional(),
  company: z.string().optional(), // Honeypot
  source: z.string().default("website"),
});

type LeadFormData = z.infer<typeof schema>;

const availableTimes = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "02:00 PM", "03:00 PM", "04:00 PM"
];

export default function LeadForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const {
    register,
    reset,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      source: "website",
      company: "",
      painScore: 5,
      mriScanAvailable: false,
    }
  });

  const painScoreValue = watch("painScore");

  useEffect(() => {
    analytics.track('Form_View', {
      form_type: 'lead',
      page_slug: 'lead_form_component'
    });
  }, []);

  useEffect(() => {
    if (isSubmitted && successRef.current) {
      successRef.current.focus();
    }
  }, [isSubmitted]);

  useEffect(() => {
    if (submitError && errorRef.current) {
      errorRef.current.focus();
    }
  }, [submitError]);

  const onSubmit = async (data: LeadFormData) => {
    setSubmitError(null);
    analytics.leadSubmit('lead_form_component', data.source);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit enquiry.");
      }

      analytics.leadSuccess('lead_form_component', data.source);

      setIsSubmitted(true);
      reset();
    } catch (err: any) {
      console.error("Submission error:", err);

      analytics.formError('lead_form_component', 'submit_button', err.message);

      setSubmitError(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  if (isSubmitted) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="bg-white/90 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 text-center outline-none animate-in fade-in zoom-in-95 duration-500"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-3xl font-bold text-slate-800 mb-3">Request Received!</h3>
        <p className="text-slate-600 leading-relaxed max-w-lg mx-auto mb-8">{APPOINTMENT_SUCCESS_MESSAGE}</p>
        <Button
          onClick={() => setIsSubmitted(false)}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <div className="relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Quick Enquiry / Call Back</h2>
      <p className="text-slate-500 mb-6 text-sm">
        Fill out the form below for a rapid response from our team.
      </p>

      {submitError && (
        <div
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <Input
          label="Full Name"
          id="fullName"
          autoComplete="name"
          {...register("fullName")}
          error={errors.fullName?.message}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            id="phone"
            type="tel"
            autoComplete="tel"
            {...register("phone")}
            error={errors.phone?.message}
            required
          />
          <Input
            label="Email"
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
            error={errors.email?.message}
            required
          />
        </div>

        <Input
          label="City"
          id="city"
          autoComplete="address-level2"
          {...register("city")}
          error={errors.city?.message}
          required
        />

        <div className="space-y-4">
            <div>
              <label htmlFor="painScore" className="block text-sm font-medium text-slate-700 mb-2">
                Pain Intensity Score (1-10)
              </label>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-slate-400" aria-hidden="true">1</span>
                <input
                  id="painScore"
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-valuetext={painScoreValue ? `Score: ${painScoreValue}${painScoreValue >= 8 ? ' (Severe)' : painScoreValue <= 3 ? ' (Mild)' : ''}` : "Score: 5"}
                  {...register("painScore")}
                />
                <span className="text-sm font-bold text-slate-400" aria-hidden="true">10</span>
              </div>
              <div className="text-center mt-2">
                {painScoreValue !== undefined && (
                  <span
                    className={`inline-block px-3 py-1 rounded-lg text-xs font-bold ${
                      painScoreValue <= 3
                        ? "bg-green-100 text-green-700"
                        : painScoreValue <= 7
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    Score: {painScoreValue}
                    {painScoreValue >= 8 && " (Severe)"}
                    {painScoreValue <= 3 && " (Mild)"}
                  </span>
                )}
              </div>
            </div>

            <label className="flex items-center p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
              <input
                type="checkbox"
                id="mriScanAvailable"
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                {...register("mriScanAvailable")}
              />
              <span className="ml-3 text-sm font-medium text-slate-700 select-none">
                I have MRI/CT Scan reports available
              </span>
            </label>
        </div>

        <Textarea
          label="How can we help?"
          id="concern"
          placeholder="Briefly describe your symptoms or question..."
          {...register("concern")}
          error={errors.concern?.message}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            control={control}
            name="preferredDate"
            render={({ field }) => (
              <Calendar
                label="Preferred Date (Optional)"
                value={field.value || ""}
                onChange={field.onChange}
                error={errors.preferredDate?.message}
              />
            )}
          />

          <Select
            label="Preferred Time (Optional)"
            id="preferredTime"
            {...register("preferredTime")}
            error={errors.preferredTime?.message}
          >
            <option value="">Any time</option>
            {availableTimes.map(t => <option key={t} value={t}>{t}</option>)}
          </Select>
        </div>

        {/* Honeypot */}
        <div className="hidden" aria-hidden="true">
          <input tabIndex={-1} autoComplete="off" {...register("company")} />
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full sm:w-full"
          >
            {isSubmitting ? "Sending..." : "Request Call Back"}
          </Button>
        </div>
      </form>
    </div>
  );
}
