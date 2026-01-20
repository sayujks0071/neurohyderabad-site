export interface Appointment {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  concern?: string;
  preferredDate: string;
  preferredTime?: string;
  source?: string;
  status?: 'Confirmed' | 'Pending' | 'Cancelled';
}

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    fullName: 'Rahul Sharma',
    phone: '+91 98765 43210',
    preferredDate: '2023-10-25',
    status: 'Pending',
    preferredTime: '10:00 AM',
    concern: 'Severe back pain',
    email: 'rahul@example.com',
    source: 'web'
  },
  {
    id: '2',
    fullName: 'Priya Patel',
    phone: '9988776655',
    preferredDate: '2023-10-26',
    status: 'Confirmed',
    preferredTime: '11:30 AM',
    concern: 'Follow-up',
    email: 'priya@example.com',
    source: 'web'
  },
  {
    id: '3',
    fullName: 'Amit Singh',
    phone: '+91-91234-56789',
    preferredDate: '2023-10-27',
    status: 'Pending',
    preferredTime: '02:00 PM',
    concern: 'Migraine consultation',
    email: 'amit@example.com',
    source: 'web'
  }
];
