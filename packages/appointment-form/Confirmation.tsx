'use client';

import type { BookingData } from "@/packages/appointment-form/types";
import Button from "./ui/Button";
import { CheckCircleIcon } from "./constants";

interface ConfirmationProps {
  message: string;
  bookingData: BookingData;
  onBookAnother: () => void;
  onEdit: () => void;
}

export default function Confirmation({
  message,
  bookingData,
  onBookAnother,
  onEdit,
}: ConfirmationProps) {
  return (
    <div className="max-w-2xl mx-auto my-8 md:my-16 px-4">
      <div className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-6 sm:p-10 text-center animate-in fade-in zoom-in-95 duration-500">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-slate-800 mb-3">
          Request Received!
        </h2>
        <p className="text-slate-600 leading-relaxed max-w-lg mx-auto mb-8">
          {message}
        </p>

        <div className="bg-slate-50 rounded-lg p-6 text-left border border-slate-200 mb-8">
          <h3 className="text-xl font-semibold text-slate-700 mb-4 border-b pb-3">
            Your Appointment Request Details
          </h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <div className="sm:col-span-2">
              <dt className="font-medium text-slate-500">Patient Name</dt>
              <dd className="mt-1 text-slate-800 font-semibold">
                {bookingData.patientName}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Email</dt>
              <dd className="mt-1 text-slate-800">{bookingData.email}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Phone</dt>
              <dd className="mt-1 text-slate-800">{bookingData.phone}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Age</dt>
              <dd className="mt-1 text-slate-800">{bookingData.age}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Gender</dt>
              <dd className="mt-1 text-slate-800 capitalize">
                {bookingData.gender}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Requested Date</dt>
              <dd className="mt-1 text-slate-800">
                {bookingData.appointmentDate}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Requested Time</dt>
              <dd className="mt-1 text-slate-800">
                {bookingData.appointmentTime}
              </dd>
            </div>
            {bookingData.painScore && (
              <div>
                <dt className="font-medium text-slate-500">Pain Score</dt>
                <dd className="mt-1 text-slate-800">
                  {bookingData.painScore} / 10
                </dd>
              </div>
            )}
            {bookingData.mriScanAvailable !== undefined && (
              <div>
                <dt className="font-medium text-slate-500">MRI Available</dt>
                <dd className="mt-1 text-slate-800">
                  {bookingData.mriScanAvailable ? "Yes" : "No"}
                </dd>
              </div>
            )}
            <div className="sm:col-span-2">
              <dt className="font-medium text-slate-500">Reason for Visit</dt>
              <dd className="mt-1 text-slate-800 whitespace-pre-wrap">
                {bookingData.reason}
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col sm:flex-row-reverse items-center justify-center gap-4">
          <Button onClick={onBookAnother}>Book Another Appointment</Button>
          <Button onClick={onEdit} variant="secondary">
            Edit Details
          </Button>
        </div>
      </div>
    </div>
  );
}
