// packages/appointment-form/BookingFormSubmission.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import BookingForm from './BookingForm';

// Mock dependencies
vi.mock('@/src/lib/dates', () => ({
  formatLocalDate: (date: Date) => {
    // Return local date string YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
  parseLocalDate: (dateStr: string) => {
      const [year, month, day] = dateStr.split('-').map(Number);
      return new Date(year, month - 1, day);
  },
}));

// Mock Calendar component
vi.mock('./ui/Calendar', () => ({
  default: ({ label, value, onChange }: any) => (
    <div data-testid="mock-calendar">
      <label>{label}</label>
      <input
        data-testid="calendar-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  ),
}));

describe('BookingForm Submission Flow', () => {
  it('handles successful submission correctly', async () => {
    // Setup onSubmit mock
    const onSubmit = vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(<BookingForm onSubmit={onSubmit} />);

    // Fill Required Fields
    fireEvent.change(screen.getByLabelText(/Patient Full Name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: '28' } });
    fireEvent.change(screen.getByLabelText(/Gender/i), { target: { value: 'female' } });

    // Calendar - use the testid from the mock
    // Use a future date to pass validation (assuming current date is before 2030)
    fireEvent.change(screen.getByTestId('calendar-input'), { target: { value: '2030-01-01' } });

    // Time
    fireEvent.click(screen.getByText('10:00 AM'));

    // Reason
    fireEvent.change(screen.getByLabelText(/Reason for Visit/i), { target: { value: 'Detailed reason for visit' } });

    // Submit
    const submitBtn = screen.getByRole('button', { name: /Submit Request/i });
    fireEvent.click(submitBtn);

    // Verify Loading State
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Sending/i })).toBeInTheDocument();
    });
    // The button should be disabled
    expect(screen.getByRole('button', { name: /Sending/i })).toBeDisabled();

    // Wait for submission completion
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });

    // Check Payload
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
      patientName: 'Jane Doe',
      email: 'jane@example.com',
      phone: '9876543210',
      age: '28',
      gender: 'female',
      appointmentDate: '2030-01-01',
      appointmentTime: '10:00 AM',
      reason: 'Detailed reason for visit',
      painScore: 5,
      mriScanAvailable: false
    }));
  });
});
