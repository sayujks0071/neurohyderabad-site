export interface Appointment {
  id: string;
  patientName: string;
  contactNumber: string;
  requestedDate: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  timeSlot?: string;
  reason?: string;
}

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientName: 'Rahul Sharma',
    contactNumber: '+91 98765 43210',
    requestedDate: '2023-10-25',
    status: 'Pending',
    timeSlot: '10:00 AM',
    reason: 'Severe back pain'
  },
  {
    id: '2',
    patientName: 'Priya Patel',
    contactNumber: '9988776655',
    requestedDate: '2023-10-26',
    status: 'Confirmed',
    timeSlot: '11:30 AM',
    reason: 'Follow-up'
  },
  {
    id: '3',
    patientName: 'Amit Singh',
    contactNumber: '+91-91234-56789',
    requestedDate: '2023-10-27',
    status: 'Pending',
    timeSlot: '02:00 PM',
    reason: 'Migraine consultation'
  }
];
