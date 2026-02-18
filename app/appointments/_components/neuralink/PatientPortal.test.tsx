// @vitest-environment jsdom
import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import PatientPortal from './PatientPortal';
import { APPOINTMENT_SUCCESS_MESSAGE } from '@/packages/appointment-form/constants';
import * as neuralinkApi from './neuralinkApi';

// Mock dependencies
vi.mock('@/src/lib/analytics', () => ({
  analytics: {
    appointmentStart: vi.fn(),
    appointmentStepComplete: vi.fn(),
    appointmentSubmit: vi.fn(),
    appointmentSuccess: vi.fn(),
    formError: vi.fn(),
  },
}));

vi.mock('@/src/lib/google-ads-conversion', () => ({
  trackConversionOnly: vi.fn(),
}));

vi.mock('./neuralinkApi', () => ({
  analyzeSymptoms: vi.fn(),
  searchNearbyCenters: vi.fn(),
  refineSymptomDescription: vi.fn(),
  interpretReport: vi.fn(),
}));

// Mock calendar service to have predictable dates/slots
vi.mock('./calendarService', () => ({
  getAvailableSlots: () => [
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: true },
  ],
  getNextAvailableDate: () => '2023-12-01', // Fixed date
}));

// Mock scrollIntoView
window.scrollTo = vi.fn();
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('PatientPortal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('fetch', vi.fn());
    // Mock navigator.geolocation
    Object.defineProperty(global.navigator, 'geolocation', {
      value: {
        getCurrentPosition: vi.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('completes the full booking flow: schedule -> details -> submit -> success -> reset', async () => {
    // Setup API mocks
    (neuralinkApi.analyzeSymptoms as any).mockResolvedValue({
      summary: 'Test triage summary',
      suggestedPriority: 'HIGH',
      keyConcerns: ['Test concern'],
    });

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ confirmationMessage: 'Booking confirmed' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    render(<PatientPortal />);

    // --- STEP 1: Scheduler ---
    // Select Appointment Type (New Consultation)
    const typeBtn = screen.getByText('New Consultation');
    fireEvent.click(typeBtn);

    // Select Date (Assuming the mock returns a date that is rendered)
    // We can just find a date button. The mock returns '2023-12-01'.
    // The component renders date buttons. We'll click the first enabled one.
    // However, the component initializes `currentDate` based on `getNextAvailableDate`.
    // So '2023-12-01' will be selected/visible.
    // Let's just assume the default selection logic works or click a date.
    // The "Next Step" button is disabled until type, date, and time are selected.

    // Select Time (09:00 AM)
    const timeBtn = screen.getByLabelText(/09:00 AM/i);
    fireEvent.click(timeBtn);

    // Click Next Step
    const nextBtn = screen.getByText('Next Step');
    expect(nextBtn).toBeEnabled();
    fireEvent.click(nextBtn);

    // --- STEP 2: Details Form ---
    // Wait for form to appear
    await waitFor(() => {
      expect(screen.getByText(/Patient Profile/i)).toBeInTheDocument();
    });

    // Fill details
    fireEvent.change(screen.getByLabelText(/^Full Name/i), { target: { value: 'Test Patient' } });
    fireEvent.change(screen.getByLabelText(/^Age/i), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText(/^Phone/i), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByLabelText(/^Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Symptoms/i), { target: { value: 'Severe headache' } });

    // Pain score
    fireEvent.change(screen.getByLabelText(/Current Pain Score/i), { target: { value: '8' } });

    // Submit
    const submitBtn = screen.getByText('Confirm Booking');
    fireEvent.click(submitBtn);

    // --- VERIFY LOADING STATE ---
    // Should show "Triaging..." or "Sending..." and be disabled
    // analyzeSymptoms is called first (Triaging...), then fetch (Sending...)
    expect(submitBtn).toBeDisabled();
    // It might be "Triaging..." initially
    expect(screen.getByText(/Triaging...|Sending.../i)).toBeInTheDocument();

    // --- VERIFY SUCCESS ---
    await waitFor(() => {
      expect(screen.getByText('Appointment Request Received')).toBeInTheDocument();
    });

    // Check exact success message
    expect(screen.getByText(APPOINTMENT_SUCCESS_MESSAGE)).toBeInTheDocument();

    // Verify API calls
    expect(neuralinkApi.analyzeSymptoms).toHaveBeenCalledWith('Severe headache', 30, 'male');
    expect(fetchMock).toHaveBeenCalledWith('/api/workflows/booking', expect.anything());

    // --- VERIFY RESET ---
    // Find "Book another appointment" button
    const bookAnotherBtn = screen.getByText('Book another appointment');
    fireEvent.click(bookAnotherBtn);

    // Should return to Step 1 (Scheduler)
    await waitFor(() => {
      expect(screen.getByText('Reason for Visit')).toBeInTheDocument();
    });

    // Verify form data is reset (we can check if "Next Step" is disabled or inputs are empty if we went to step 2)
    // The state `formData` is reset to initial.
    // So type, date, time are cleared.
    // So "Next Step" should be disabled.
    const newNextBtn = screen.getByText('Next Step');
    expect(newNextBtn).toBeDisabled();
  });
});
