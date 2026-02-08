// @vitest-environment jsdom
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { WhatsAppButton } from './WhatsAppButton';
import { Appointment } from './types';
import '@testing-library/jest-dom/vitest';

// Mock WhatsAppIcon
vi.mock('@/src/components/WhatsAppIcon', () => ({
  WhatsAppIcon: () => <span data-testid="whatsapp-icon">Icon</span>
}));

describe('WhatsAppButton', () => {
  const mockOpen = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('open', mockOpen);
    mockOpen.mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  const baseAppointment: Appointment = {
    id: '1',
    patient_name: 'Test Patient',
    patient_email: 'test@example.com',
    patient_phone: '9876543210',
    preferred_date: '2023-10-25',
    preferred_time: '10:00 AM',
    appointment_type: 'Consultation',
    chief_complaint: 'Pain',
    status: 'pending',
    source: 'website',
    created_at: '2023-10-20',
  };

  it('renders enabled button for valid phone number', () => {
    render(<WhatsAppButton appointment={baseAppointment} />);
    const btn = screen.getByTestId('whatsapp-button');
    expect(btn).not.toBeDisabled();

    fireEvent.click(btn);
    expect(mockOpen).toHaveBeenCalled();

    // Verify URL content
    const url = mockOpen.mock.calls[0][0];
    expect(url).toContain('https://wa.me/919876543210');
    expect(url).toContain(encodeURIComponent('Hello Test Patient'));
    expect(url).toContain(encodeURIComponent('Dr. Sayuj'));
    expect(url).toContain(encodeURIComponent('MRI/CT scans'));
  });

  it('displays correct tooltip with phone number', () => {
    render(<WhatsAppButton appointment={baseAppointment} />);
    const btn = screen.getByTestId('whatsapp-button');
    expect(btn).toHaveAttribute('title', 'Click to confirm via WhatsApp (9876543210)');
  });

  it('renders disabled button for missing phone number', () => {
    const appt = { ...baseAppointment, patient_phone: '' };
    render(<WhatsAppButton appointment={appt} />);
    const btn = screen.getByTestId('whatsapp-button');
    expect(btn).toBeDisabled();
  });

  it('renders disabled button for whitespace phone number', () => {
    const appt = { ...baseAppointment, patient_phone: '   ' };
    render(<WhatsAppButton appointment={appt} />);
    const btn = screen.getByTestId('whatsapp-button');
    expect(btn).toBeDisabled();
  });

  it('renders disabled button for non-numeric phone number', () => {
    const appt = { ...baseAppointment, patient_phone: 'abc-def' };
    render(<WhatsAppButton appointment={appt} />);
    const btn = screen.getByTestId('whatsapp-button');
    expect(btn).toBeDisabled();
  });
});
