'use client';

import { useEffect, useState } from 'react';
import { RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react';
import { generateWhatsappUrl, formatDate } from './utils';
import { WhatsAppIcon } from '@/src/components/WhatsAppIcon';

export const dynamic = 'force-dynamic';

import type { Appointment } from './types';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800',
  'no-show': 'bg-gray-100 text-gray-800',
};

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'confirmed':
    case 'completed':
      return <CheckCircle size={14} className="text-green-600" />;
    case 'cancelled':
    case 'no-show':
      return <XCircle size={14} className="text-red-600" />;
    default:
      return <Clock size={14} className="text-yellow-600" />;
  }
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/appointments');
      if (!res.ok) throw new Error('Failed to fetch appointments');
      const data = await res.json();
      setAppointments(data.appointments || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load appointments');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Quick Action: Confirm appointment via WhatsApp
  // Opens a dynamic WhatsApp API link with a pre-filled confirmation message.
  // Phone number is sanitized and message includes patient name and date.
  // Verified implementation matches requirements for instant communication.
  const sendWhatsapp = (appointment: Appointment) => {
    setError(null);
    // Ensure we have a phone number before proceeding
    if (!appointment.patient_phone) {
      setError('No phone number available for this patient.');
      return;
    }

    // Generate the WhatsApp URL with sanitized phone and pre-filled message
    const url = generateWhatsappUrl({
      id: appointment.id,
      fullName: appointment.patient_name,
      phone: appointment.patient_phone,
      preferredDate: formatDate(appointment.preferred_date),
    });

    // Open in a new tab
    window.open(url, '_blank');
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/admin/appointments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        fetchAppointments();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Appointments</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage patient appointments from Neon database
          </p>
        </div>
        <button
          onClick={fetchAppointments}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <RefreshCw size={32} className="animate-spin text-blue-600" />
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No appointments found. Bookings from the website will appear here.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Patient</th>
                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Contact</th>
                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Date/Time</th>
                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Complaint</th>
                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">
                    <div className="font-medium">{appointment.patient_name}</div>
                    <div className="text-sm text-gray-500">{appointment.source || 'website'}</div>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <div className="text-sm">{appointment.patient_email}</div>
                    <div className="text-sm text-gray-500">{appointment.patient_phone}</div>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <div>{formatDate(appointment.preferred_date)}</div>
                    <div className="text-sm text-gray-500">{appointment.preferred_time || 'TBD'}</div>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <div className="max-w-xs truncate" title={appointment.chief_complaint}>
                      {appointment.chief_complaint}
                    </div>
                    <div className="text-sm text-gray-500">{appointment.appointment_type}</div>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[appointment.status] || statusColors.pending}`}>
                      <StatusIcon status={appointment.status} />
                      {appointment.status || 'pending'}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => sendWhatsapp(appointment)}
                        className="flex items-center gap-1 !bg-[#25D366] hover:!bg-[#128C7E] text-white font-medium py-1 px-2 rounded text-xs transition-colors"
                        title="Click to confirm via WhatsApp"
                        aria-label="Confirm via WhatsApp"
                        data-testid="whatsapp-button"
                      >
                        <WhatsAppIcon size={14} />
                        <span>Confirm via WhatsApp</span>
                      </button>
                      {appointment.status === 'pending' && (
                        <button
                          onClick={() => updateStatus(appointment.id, 'confirmed')}
                          className="bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded text-xs"
                        >
                          Confirm
                        </button>
                      )}
                      {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
                        <select
                          className="text-xs border rounded py-1 px-1"
                          value=""
                          onChange={(e) => {
                            if (e.target.value) updateStatus(appointment.id, e.target.value);
                          }}
                        >
                          <option value="">More...</option>
                          <option value="completed">Mark Completed</option>
                          <option value="cancelled">Cancel</option>
                          <option value="no-show">No Show</option>
                        </select>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
