'use client';

import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/packages/appointment-form/ui/Input";
import Textarea from "@/packages/appointment-form/ui/Textarea";
import Button from "@/packages/appointment-form/ui/Button";
import Calendar from "@/packages/appointment-form/ui/Calendar";
import Select from "@/packages/appointment-form/ui/Select";

interface LeadFormData {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  concern: string;
  preferredDate?: string;
  preferredTime?: string;
  company?: string; // Honeypot
  source: string;
}

const schema = yup.object({
  fullName: yup.string().required("Full name is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .transform((value) => (value ? value.replace(/[^\d+]/g, "") : value))
    .matches(/^[0-9+]{8,15}$/, "Please enter a valid phone number (8-15 digits)"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  city: yup.string().required("City is required"),
  concern: yup.string().required("Please describe your concern").min(10, "Please provide a bit more detail"),
  preferredDate: yup.string(),
  preferredTime: yup.string(),
  company: yup.string(), // Honeypot - should be empty
  source: yup.string().default("website"),
}).required();

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
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      source: "website",
      company: "",
    }
  });

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

      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Submission error:", err);
      setSubmitError(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  if (isSubmitted) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center outline-none"
      >
        <h3 className="text-2xl font-bold text-green-800 mb-4">Request Received</h3>
        <p className="text-green-700 mb-6">
          Thank you for reaching out. We have received your details and will contact you shortly to confirm your appointment.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-green-800 underline hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 rounded p-1"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
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
          <Button type="submit" isLoading={isSubmitting} className="w-full justify-center">
            {isSubmitting ? "Sending..." : "Request Call Back"}
          </Button>
        </div>
      </form>
    </div>
  );
}
