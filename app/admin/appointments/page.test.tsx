// @vitest-environment jsdom
import * as matchers from '@testing-library/jest-dom/matchers';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import AppointmentsPage from './page';
import { Appointment } from './types';
import '@testing-library/jest-dom/vitest';

expect.extend(matchers);

// Mock the WhatsAppIcon
vi.mock('@/src/components/WhatsAppIcon', () => ({
  WhatsAppIcon: () => <span data-testid="whatsapp-icon">Icon</span>
}));

describe('AppointmentsPage', () => {
  const mockAppointments: Appointment[] = [
    {
      id: '1',
      patient_name: 'John Doe',
      patient_email: 'john@example.com',
      patient_phone: '9876543210',
      preferred_date: '2023-10-25',
      preferred_time: '10:00 AM',
      appointment_type: 'Consultation',
      chief_complaint: 'Back pain',
      status: 'pending',
      source: 'website',
      created_at: '2023-10-20T10:00:00Z',
      pain_score: 8,
      mri_scan_available: true,
    },
    {
      id: '2',
      patient_name: 'Patient Two',
      patient_email: 'p2@example.com',
      patient_phone: '0987654321',
      preferred_date: '2023-10-28',
      preferred_time: '11:00',
      appointment_type: 'Follow-up',
      chief_complaint: 'Neck pain',
      status: 'pending',
      source: 'website',
      created_at: '2023-10-26',
      pain_score: 3,
      mri_scan_available: false,
    }
  ];

  beforeEach(() => {
    // Mock global fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ appointments: mockAppointments }),
      })
    ) as unknown as typeof fetch;

    // Mock window.open
    vi.stubGlobal('open', vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders appointments and clinical info correctly', async () => {
    render(<AppointmentsPage />);

    // Wait for appointments to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Check Header
    expect(screen.getByText('Clinical Info')).toBeInTheDocument();

    // Check Patient 1
    expect(screen.getByText('Pain: 8/10')).toBeInTheDocument();
    expect(screen.getByText('MRI Ready')).toBeInTheDocument();

    // Check Patient 2
    expect(screen.getByText('Pain: 3/10')).toBeInTheDocument();
  });

  it('confirms via WhatsApp', async () => {
    render(<AppointmentsPage />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Check for WhatsApp button
    const whatsappBtn = screen.getAllByTestId('whatsapp-button')[0];
    expect(whatsappBtn).toBeInTheDocument();

    // Click the button
    fireEvent.click(whatsappBtn);

    // Verify window.open was called with correct URL
    const expectedPhone = '919876543210';
    expect(window.open).toHaveBeenCalledTimes(1);
    const openedUrl = vi.mocked(window.open).mock.calls[0][0] as string;

    expect(openedUrl).toContain(`https://wa.me/${expectedPhone}`);
    expect(openedUrl).toContain(encodeURIComponent('Hello John Doe'));
  });
});
