// @vitest-environment jsdom
import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import AppointmentsPage from './page';
import '@testing-library/jest-dom/vitest';

// Mock fetch
global.fetch = vi.fn();

// Mock window.open
global.open = vi.fn();

describe('AppointmentsPage', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders clinical info columns correctly', async () => {
    const mockAppointments = [
      {
        id: '1',
        patient_name: 'Patient One',
        patient_email: 'p1@example.com',
        patient_phone: '1234567890',
        preferred_date: '2023-10-27',
        preferred_time: '10:00',
        appointment_type: 'New Consultation',
        chief_complaint: 'Back pain',
        status: 'pending',
        source: 'website',
        created_at: '2023-10-26',
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

    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ appointments: mockAppointments }),
    });

    render(<AppointmentsPage />);

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Patient One')).toBeInTheDocument();
    });

    // Check Header
    expect(screen.getByText('Clinical Info')).toBeInTheDocument();

    // Check Patient 1
    expect(screen.getByText('Pain: 8/10')).toBeInTheDocument();
    expect(screen.getByText('MRI Ready')).toBeInTheDocument();

    // Check Patient 2
    expect(screen.getByText('Pain: 3/10')).toBeInTheDocument();
  });
});
