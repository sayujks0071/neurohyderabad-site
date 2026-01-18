'use client';

import { MessageCircle } from 'lucide-react';
import { generateWhatsappUrl } from './utils';
import { mockAppointments, type Appointment } from './data';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export default function AppointmentsPage() {
  // Using mock data - appointments are stored in n8n workflow (Google Sheets)
  // Admin can view appointments directly in Google Sheets or via n8n dashboard
  const appointments = mockAppointments;

  const sendWhatsapp = (appointment: Appointment) => {
    // Logic uses generateWhatsappUrl which implements the required message template and sanitization:
    // "Hello {name}, this is regarding your appointment with Dr. Sayuj on {date}. We confirm your slot. Please bring your MRI/CT scans."
    if (!appointment.phone) {
        alert("No phone number available for this patient.");
        return;
    }

    const url = generateWhatsappUrl({
      id: appointment.id,
      fullName: appointment.fullName,
      phone: appointment.phone,
      preferredDate: appointment.preferredDate,
      status: appointment.status || 'Pending'
    });
    window.open(url, '_blank');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Appointments</h1>
          <p className="text-sm text-gray-600 mt-1">
            Note: Appointments are stored in n8n workflow (Google Sheets). View full data in Google Sheets or n8n dashboard. (Updated)
          </p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Full Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Concern</th>
              <th className="py-2 px-4 border-b">Preferred Date</th>
              <th className="py-2 px-4 border-b">Preferred Time</th>
              <th className="py-2 px-4 border-b">Source</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="py-2 px-4 border-b">{appointment.fullName}</td>
                <td className="py-2 px-4 border-b">{appointment.email || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{appointment.phone}</td>
                <td className="py-2 px-4 border-b">{appointment.concern || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{appointment.preferredDate}</td>
                <td className="py-2 px-4 border-b">{appointment.preferredTime || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{appointment.source || 'web'}</td>
                <td className="py-2 px-4 border-b">
                   <button
                    onClick={() => sendWhatsapp(appointment)}
                    // Using !important to override global button styles defined in globals.css
                    className="flex items-center gap-2 !bg-[#25D366] !hover:bg-[#128C7E] text-white font-bold py-1 px-3 rounded text-sm transition-colors"
                    title="Confirm via WhatsApp"
                   >
                     <MessageCircle size={16} />
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
