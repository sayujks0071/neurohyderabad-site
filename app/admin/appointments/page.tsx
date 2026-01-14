'use client';

import React from 'react';
import { mockAppointments, Appointment } from './data';
import { MessageCircle } from 'lucide-react';

export default function AppointmentListPage() {
  const sendWhatsapp = (patient: Appointment) => {
    // 3. Ensure the phone number from the database is sanitized (remove spaces or dashes)
    const cleanNumber = patient.contactNumber.replace(/\D/g, ''); // Removes non-digits

    // 2. Dynamic Message
    const message = `Hello ${patient.patientName}, this is regarding your appointment with Dr. Sayuj on ${patient.requestedDate}. We confirm your slot. Please bring your MRI/CT scans.`;

    // Format: https://wa.me/91{contactNumber}?text={message}
    // Note: If cleanNumber already starts with 91, we might double it if we blindly add 91.
    // Usually local numbers don't have country code, but stored ones might.
    // Assuming standard Indian numbers for this context.
    // If it starts with 91 and length is 12, use it. If length is 10, add 91.

    let targetNumber = cleanNumber;
    if (targetNumber.length === 10) {
        targetNumber = '91' + targetNumber;
    }
    // If it starts with 91, keep it. If it starts with something else, valid?
    // Let's assume the prompt instruction "https://wa.me/91{contactNumber}" implies contactNumber is the local part,
    // or we ensure it has 91 prefix.

    // However, the prompt says: "https://wa.me/91{contactNumber}"
    // If contactNumber is "9876543210", then result is "919876543210".
    // If contactNumber is "919876543210", then result is "91919876543210" which is wrong.

    // Let's handle this robustly:
    if (targetNumber.startsWith('91') && targetNumber.length > 10) {
        // Already has 91, strip it so we don't double add, or just use it?
        // The prompt template is explicit: https://wa.me/91{contactNumber}
        // This suggests {contactNumber} is the variable part.
        // If the variable part already has 91, it might be an issue.
        // Let's strip leading 91 if present to be safe with the template provided.
        if (targetNumber.length === 12) {
             targetNumber = targetNumber.substring(2);
        }
    }

    const url = `https://wa.me/91${targetNumber}?text=${encodeURIComponent(message)}`;
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
                    {/* 4. Add a visual tooltip or icon (like a WhatsApp logo) */}
                    <MessageCircle className="w-4 h-4 fill-current" />
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
