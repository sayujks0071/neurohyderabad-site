'use client';

import React from 'react';
import { mockAppointments, Appointment } from './data';
import { MessageCircle } from 'lucide-react';

export default function AppointmentListPage() {
  const sendWhatsapp = (patient: Appointment) => {
    // Sanitize phone number: remove non-digits
    let cleanNumber = patient.contactNumber.replace(/\D/g, '');

    // Normalize Indian numbers: if it starts with 91 and is 12 digits, strip the 91
    // because the URL format adds it back.
    if (cleanNumber.startsWith('91') && cleanNumber.length === 12) {
      cleanNumber = cleanNumber.slice(2);
    }

    // Dynamic Message
    const message = `Hello ${patient.patientName}, this is regarding your appointment with Dr. Sayuj on ${patient.requestedDate}. We confirm your slot. Please bring your MRI/CT scans.`;

    const url = `https://wa.me/91${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Appointment List (Admin)</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Patient Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Quick Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {mockAppointments.map((appt) => (
              <tr key={appt.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {appt.patientName}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{appt.contactNumber}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {appt.requestedDate}
                  </p>
                  <p className="text-gray-600 text-xs">{appt.timeSlot}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span
                    className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                      appt.status === 'Confirmed'
                        ? 'text-green-900'
                        : appt.status === 'Pending'
                        ? 'text-orange-900'
                        : 'text-red-900'
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`absolute inset-0 opacity-50 rounded-full ${
                        appt.status === 'Confirmed'
                          ? 'bg-green-200'
                          : appt.status === 'Pending'
                          ? 'bg-orange-200'
                          : 'bg-red-200'
                      }`}
                    ></span>
                    <span className="relative">{appt.status}</span>
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button
                    onClick={() => sendWhatsapp(appt)}
                    className="flex items-center gap-2 px-4 py-2 !bg-green-600 !text-white rounded hover:!bg-green-700 transition-colors tooltip font-semibold shadow-sm"
                    title="Send WhatsApp Confirmation"
                    aria-label={`Confirm appointment for ${appt.patientName} via WhatsApp`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Confirm via WhatsApp</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
