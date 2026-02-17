// @vitest-environment jsdom
import React from 'react';
import { render, screen, fireEvent, waitFor, act, cleanup } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import TeleconsultationForm from './TeleconsultationForm';
import { analytics } from '@/src/lib/analytics';
import { trackContactConversion } from '../src/lib/google-ads-conversion';
import { APPOINTMENT_SUCCESS_MESSAGE } from '@/packages/appointment-form/constants';

// Extend expect with jest-dom matchers
expect.extend(matchers);

// Mock dependencies
vi.mock('@/src/lib/analytics', () => ({
  analytics: {
    appointmentSubmit: vi.fn(),
    appointmentSuccess: vi.fn(),
    formError: vi.fn(),
  },
}));

vi.mock('../src/lib/google-ads-conversion', () => ({
  trackContactConversion: vi.fn(),
}));

// Mock window.location
const mockLocation = {
  href: '',
};
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('TeleconsultationForm Analytics', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocation.href = '';
    // Mock console.error to avoid noisy output in tests
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
    document.body.innerHTML = '';
  });

  it('tracks appointment success on valid submission and shows correct states', async () => {
    render(<TeleconsultationForm pageSlug="test-page" service="Test Service" />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Phone \/ WhatsApp/i), { target: { value: '+91 9876543210' } });
    fireEvent.change(screen.getByLabelText(/Condition or symptoms/i), { target: { value: 'Back pain' } });
    fireEvent.change(screen.getByLabelText(/Additional details/i), { target: { value: 'Test message' } });

    // Submit
    const submitBtn = screen.getByRole('button', { name: /Send appointment request/i });
    fireEvent.click(submitBtn);

    // Verify loading state ("Sending...") immediately after click
    expect(screen.getByText('Sending...')).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();

    // Wait for submission logic to complete (includes 800ms delay)
    await waitFor(() => {
      expect(analytics.appointmentSubmit).toHaveBeenCalledWith('test-page', 'teleconsultation_form');
      expect(analytics.appointmentSuccess).toHaveBeenCalledWith('test-page', 'teleconsultation_form', 'Test Service');
      expect(trackContactConversion).toHaveBeenCalled();
    }, { timeout: 2000 }); // Increase timeout just in case

    // Check if success message is displayed with exact text
    expect(screen.getByRole('heading', { name: /Request Received/i })).toBeInTheDocument();
    expect(screen.getByText(APPOINTMENT_SUCCESS_MESSAGE)).toBeInTheDocument();

    // Verify "Send another request" button resets the form
    const resetBtn = screen.getByText('Send another request');
    fireEvent.click(resetBtn);

    // Form should be back
    expect(screen.getByLabelText(/Full name/i)).toHaveValue('');
    expect(screen.getByRole('button', { name: /Send appointment request/i })).toBeInTheDocument();
  });

  it('tracks form error on submission failure', async () => {
    // Force an error during submission
    (analytics.appointmentSubmit as any).mockImplementationOnce(() => {
      throw new Error('Submission failed');
    });

    render(<TeleconsultationForm pageSlug="test-page" service="Test Service" />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Full name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/Phone \/ WhatsApp/i), { target: { value: '+91 9876543210' } });
    fireEvent.change(screen.getByLabelText(/Condition or symptoms/i), { target: { value: 'Headache' } });
    fireEvent.change(screen.getByLabelText(/Additional details/i), { target: { value: 'Test message' } });

    // Submit
    fireEvent.click(screen.getByRole('button', { name: /Send appointment request/i }));

    // Wait for error handling
    await waitFor(() => {
      expect(analytics.formError).toHaveBeenCalledWith('test-page', 'teleconsultation_form', 'submission_error');
    }, { timeout: 2000 });

    // Check if error message is displayed
    expect(screen.getByText(/Something went wrong while preparing the email/i)).toBeInTheDocument();
  });
});
