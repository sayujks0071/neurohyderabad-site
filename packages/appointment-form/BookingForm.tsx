'use client';

import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { BookingData } from "@/packages/appointment-form/types";
import Input from "./ui/Input";
import Select from "./ui/Select";
import Textarea from "./ui/Textarea";
import Button from "./ui/Button";
import Calendar from "./ui/Calendar";
import { PainScoreSlider } from "./ui/PainScoreSlider";
import { appointmentSchema, BookingFormParsedValues, BookingFormValues } from "./schema";
import { formatLocalDate, parseLocalDate } from "@/src/lib/dates";

interface BookingFormProps {
  onSubmit: (data: BookingData) => Promise<void> | void;
  initialData?: BookingData | null;
}

const defaultValues: Partial<BookingFormValues> = {
  patientName: "",
  email: "",
  contactNumber: "",
  age: "",
  gender: undefined,
  requestedDate: undefined,
  appointmentTime: "",
  reason: "",
  painScore: 5,
  mriScanAvailable: false,
};

const availableTimes = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
];

// Refactored to use enhanced Zod validation for strict type safety.
// Uses `appointmentSchema` to enforce strict rules for patientName, Indian mobile numbers, painScore (1-10), and requestedDate.
export default function BookingForm({
  onSubmit,
  initialData,
}: BookingFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(appointmentSchema) as any,
    defaultValues: defaultValues as BookingFormValues,
    mode: "onTouched", // Trigger validation on blur
  });

  useEffect(() => {
    if (initialData) {
      // Map initialData (BookingData) to form values (BookingFormValues)
      const mappedData: Partial<BookingFormValues> = {
        patientName: initialData.patientName,
        email: initialData.email,
        contactNumber: initialData.phone,
        age: initialData.age,
        gender: (initialData.gender && ["male", "female", "other"].includes(initialData.gender))
          ? (initialData.gender as "male" | "female" | "other")
          : undefined,
        requestedDate: initialData.appointmentDate
          ? parseLocalDate(initialData.appointmentDate)
          : undefined,
        appointmentTime: initialData.appointmentTime,
        reason: initialData.reason,
        painScore: initialData.painScore ?? 5,
        mriScanAvailable: initialData.mriScanAvailable ?? false,
      };

      // If date is invalid, don't set it (validation will catch it)
      if (mappedData.requestedDate && isNaN(mappedData.requestedDate.getTime())) {
          mappedData.requestedDate = undefined;
      }

      reset(mappedData as BookingFormValues);
    } else {
      reset(defaultValues as BookingFormValues);
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data: BookingFormValues) => {
    // Parse once more to get schema defaults (and a fully-typed output object).
    // In practice the resolver already validated, so this should not throw.
    const parsed: BookingFormParsedValues = appointmentSchema.parse(data);

    // Map form values back to BookingData
    const submissionData: BookingData = {
      patientName: parsed.patientName,
      email: parsed.email,
      phone: parsed.contactNumber,
      age: parsed.age,
      gender: parsed.gender,
      appointmentDate: formatLocalDate(parsed.requestedDate),
      appointmentTime: parsed.appointmentTime,
      reason: parsed.reason,
      painScore: parsed.painScore,
      mriScanAvailable: parsed.mriScanAvailable,
    };
    await onSubmit(submissionData);
    reset();
  };

  return (
    <div className="max-w-4xl mx-auto my-8 md:my-16">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-800">
            Request an Appointment
          </h2>
          <p className="mt-2 text-slate-500">
            Fill in the details below. Our team will contact you shortly to
            confirm your booking.
          </p>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit as any)} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="md:col-span-2">
              <Input
                label="Patient Full Name"
                id="patientName"
                autoComplete="name"
                {...register("patientName")}
                error={errors.patientName?.message}
                required
              />
            </div>

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <Input
                label="Email Address"
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                error={errors.email?.message}
                required
              />
              <Input
                label="Phone Number"
                id="contactNumber"
                type="tel"
                autoComplete="tel"
                {...register("contactNumber")}
                error={errors.contactNumber?.message}
                required
                placeholder="10-digit mobile number"
              />
            </div>

            <Input
              label="Age"
              id="age"
              type="number"
              inputMode="numeric"
              {...register("age")}
              error={errors.age?.message}
              required
            />

            <Select
              label="Gender"
              id="gender"
              {...register("gender")}
              error={errors.gender?.message}
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>

            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              <Controller
                name="requestedDate"
                control={control}
                render={({ field }) => (
                  <Calendar
                    label="Preferred Date"
                    value={field.value ? formatLocalDate(field.value) : ""}
                    onChange={(dateString) => {
                        const [year, month, day] = dateString.split("-").map(Number);
                        const date = new Date(year, month - 1, day);
                        field.onChange(date);
                    }}
                    error={errors.requestedDate?.message}
                    required
                  />
                )}
              />

              <Controller
                name="appointmentTime"
                control={control}
                render={({ field }) => (
                  <div>
                    <div id="appointment-time-label" className="block text-sm font-medium text-slate-700 mb-1">
                      Preferred Time{" "}
                      <span className="text-red-500 font-extrabold pl-1">*</span>
                    </div>
                    <div
                      role="group"
                      aria-labelledby="appointment-time-label"
                      aria-describedby={errors.appointmentTime ? "appointment-time-error" : undefined}
                      className="grid grid-cols-2 sm:grid-cols-3 gap-2"
                    >
                      {availableTimes.map((time) => (
                        <label
                          key={time}
                          className={`w-full text-center px-2 py-2.5 border rounded-md text-sm font-medium transition-colors cursor-pointer block focus-within:ring-2 focus-within:ring-cyan-500 focus-within:ring-offset-1 ${
                            field.value === time
                              ? "bg-cyan-600 text-white border-cyan-600"
                              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <input
                            type="radio"
                            name={field.name}
                            value={time}
                            checked={field.value === time}
                            onChange={() => field.onChange(time)}
                            className="sr-only"
                          />
                          {time}
                        </label>
                      ))}
                    </div>
                    {errors.appointmentTime && (
                      <p id="appointment-time-error" className="mt-1 text-sm text-red-600">
                        {errors.appointmentTime.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="md:col-span-2 space-y-6">
              <PainScoreSlider
                control={control}
                register={register}
                name="painScore"
                error={errors.painScore?.message}
              />

              <label
                className="flex items-center p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-cyan-300 hover:bg-slate-100 transition-all cursor-pointer group"
              >
                {/* Clinical Context: MRI Availability */}
                <input
                  type="checkbox"
                  id="mriScanAvailable"
                  className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500 border-gray-300"
                  {...register("mriScanAvailable")}
                />
                <span
                  className="ml-3 text-sm font-medium text-slate-700 select-none group-hover:text-cyan-800 transition-colors"
                >
                  I have recent MRI/CT Scan reports available
                </span>
              </label>

              <Textarea
                label="Reason for Visit / Chief Complaint"
                id="reason"
                {...register("reason")}
                error={errors.reason?.message}
                required
                placeholder="Please briefly describe your symptoms or reason for this appointment."
              />
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-200 text-center">
            <Button type="submit" isLoading={isSubmitting}>
              {isSubmitting ? "Sending..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
