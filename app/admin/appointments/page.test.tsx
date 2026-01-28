// @vitest-environment jsdom
import * as matchers from '@testing-library/jest-dom/matchers';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AppointmentsPage from './page';

expect.extend(matchers);

// Mock global fetch
global.fetch = vi.fn();
// Mock window.open
global.open = vi.fn();

const mockAppointments = [
  {
    id: '1',
    patient_name: 'John Doe',
    patient_email: 'john@example.com',
    patient_phone: '9876543210',
    preferred_date: '2023-10-15',
    preferred_time: '10:00 AM',
    chief_complaint: 'Headache',
    status: 'pending',
    appointment_type: 'Consultation',
    source: 'website'
  }
];

describe('AppointmentsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders appointments and handles WhatsApp click', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ appointments: mockAppointments }),
    });

    render(<AppointmentsPage />);

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Check for WhatsApp button
    const whatsappButton = screen.getByTestId('whatsapp-button');
    expect(whatsappButton).toBeInTheDocument();
    expect(whatsappButton).toHaveAttribute('title', 'Click to confirm via WhatsApp');

    // Click it
    fireEvent.click(whatsappButton);

    // Verify window.open was called with correct URL
    expect(global.open).toHaveBeenCalledTimes(1);
    const url = (global.open as any).mock.calls[0][0];
    const decodedUrl = decodeURIComponent(url);

    expect(url).toContain('wa.me/919876543210');
    expect(decodedUrl).toContain('John Doe');
    expect(decodedUrl).toContain('Dr. Sayuj');
  });
});
