'use client';

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { BookingData } from "@/packages/appointment-form/types";
import Input from "./ui/Input";
import Select from "./ui/Select";
import Textarea from "./ui/Textarea";
import Button from "./ui/Button";
import Calendar from "./ui/Calendar";

interface BookingFormProps {
  onSubmit: (data: BookingData) => Promise<void> | void;
  initialData?: BookingData | null;
}

const schema: yup.ObjectSchema<BookingData> = yup
  .object({
    patientName: yup
      .string()
      .required("Patient name is required")
      .min(3, "Name must be at least 3 characters"),
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email address"),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^[0-9+\s()-]{10,}$/, "Please enter a valid phone number"),
    age: yup
      .string()
      .required("Age is required")
      .matches(/^\d+$/, "Age must be a number")
      .test("age-range", "Age seems too high", (value) => {
        const numeric = Number(value);
        return Number.isFinite(numeric) && numeric > 0 && numeric <= 120;
      }),
    gender: yup
      .mixed<BookingData["gender"]>()
      .oneOf(["male", "female", "other"], "Please select a gender")
      .required("Gender is required"),
    appointmentDate: yup.string().required("Please select a date"),
    appointmentTime: yup.string().required("Please select a time"),
    reason: yup
      .string()
      .required("Reason for visit is required")
      .min(10, "Please provide more details (min 10 characters)"),
    painScore: yup.number().optional(),
    mriScanAvailable: yup.boolean().optional(),
  })
  .required();

const defaultValues: BookingData = {
  patientName: "",
  email: "",
  phone: "",
  age: "",
  gender: "",
  appointmentDate: "",
  appointmentTime: "",
  reason: "",
  painScore: undefined,
  mriScanAvailable: undefined,
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

export default function BookingForm({
  onSubmit,
  initialData,
}: BookingFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingData>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const painScoreValue = watch("painScore");

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset(defaultValues);
    }
  }, [initialData, reset]);

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

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                id="phone"
                type="tel"
                autoComplete="tel"
                {...register("phone")}
                error={errors.phone?.message}
                required
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
                name="appointmentDate"
                control={control}
                render={({ field }) => (
                  <Calendar
                    label="Preferred Date"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.appointmentDate?.message}
                    required
                  />
                )}
              />

              <Controller
                name="appointmentTime"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Preferred Time{" "}
                      <span className="text-red-500 font-extrabold pl-1">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => field.onChange(time)}
                          className={`w-full text-center px-2 py-2.5 border rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-1 ${
                            field.value === time
                              ? "bg-cyan-600 text-white border-cyan-600"
                              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    {errors.appointmentTime && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.appointmentTime.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="md:col-span-2 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Pain Intensity Score (1-10)
                </label>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-slate-400">1</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                    {...register("painScore")}
                  />
                  <span className="text-sm font-bold text-slate-400">10</span>
                </div>
                <div className="text-center mt-2">
                  {painScoreValue && (
                    <span
                      className={`inline-block px-3 py-1 rounded-lg text-sm font-bold ${
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

              <div className="flex items-center p-4 bg-slate-50 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  id="mriScanAvailable"
                  className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500 border-gray-300"
                  {...register("mriScanAvailable")}
                />
                <label
                  htmlFor="mriScanAvailable"
                  className="ml-3 text-sm font-medium text-slate-700 cursor-pointer select-none"
                >
                  I have recent MRI/CT Scan reports available
                </label>
              </div>

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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
