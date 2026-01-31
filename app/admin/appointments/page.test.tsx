// @vitest-environment jsdom
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import AppointmentsPage from './page';

expect.extend(matchers);

// Mock global fetch
// We'll reset this in beforeEach
global.fetch = vi.fn();

const mockAppointments = [
  {
    id: '1',
    patient_name: 'John Doe',
    patient_email: 'john@example.com',
    patient_phone: '9876543210',
    preferred_date: '2023-10-15',
    preferred_time: '10:00 AM',
    appointment_type: 'Consultation',
    chief_complaint: 'Headache',
    status: 'pending',
    source: 'website',
    created_at: '2023-10-01T10:00:00Z',
  },
  {
    id: '2',
    patient_name: 'Jane Smith',
    patient_email: 'jane@example.com',
    patient_phone: '', // No phone
    preferred_date: '2023-10-16',
    preferred_time: '11:00 AM',
    appointment_type: 'Follow-up',
    chief_complaint: 'Checkup',
    status: 'confirmed',
    source: 'referral',
    created_at: '2023-10-02T10:00:00Z',
  }
];

describe('AppointmentsPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    global.fetch = vi.fn();
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ appointments: [...mockAppointments] }),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('renders appointments and whatsapp button', async () => {
    render(<AppointmentsPage />);

    // Check loading state
    expect(screen.getByText(/refresh/i)).toBeInTheDocument();

    // Wait for data to load
    await screen.findByText('John Doe');
    await screen.findByText('Jane Smith');

    // Check for WhatsApp buttons
    const buttons = screen.getAllByTestId('whatsapp-button');
    expect(buttons).toHaveLength(2); // One for each row
  });

  test('opens whatsapp url on click', async () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

    render(<AppointmentsPage />);

    await screen.findByText('John Doe');

    const buttons = screen.getAllByTestId('whatsapp-button');
    // Click the first button (John Doe)
    fireEvent.click(buttons[0]);

    expect(openSpy).toHaveBeenCalledTimes(1);
    const url = openSpy.mock.calls[0][0] as string;

    // Verify URL structure
    expect(url).toContain('https://wa.me/919876543210');
    expect(url).toContain('text=');

    // Decode and verify message content
    const decodedUrl = decodeURIComponent(url);
    expect(decodedUrl).toContain('Hello John Doe');
    expect(decodedUrl).toContain('regarding your appointment with Dr. Sayuj');
    expect(decodedUrl).toContain('We confirm your slot');
  });

  test('shows error if no phone number', async () => {
    // Reset fetch mock again just to be paranoid, though beforeEach handles it
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ appointments: [...mockAppointments] }),
    });

    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

    render(<AppointmentsPage />);

    // Use findAllByText to handle potential duplicate matches or timing
    await screen.findAllByText('John Doe');
    await screen.findAllByText('Jane Smith');

    const buttons = screen.getAllByTestId('whatsapp-button');
    // Click the second button (Jane Smith - no phone)
    fireEvent.click(buttons[1]);

    expect(openSpy).not.toHaveBeenCalled();
    expect(screen.getByText('No phone number available for this patient.')).toBeInTheDocument();
  });

  test('handles fetch error gracefully', async () => {
    (global.fetch as any).mockRejectedValue(new Error('Network error'));

    render(<AppointmentsPage />);

    await screen.findByText('Network error');
  });
});
