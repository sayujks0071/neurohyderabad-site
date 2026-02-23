// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import BookingForm from './BookingForm';

afterEach(() => {
  cleanup();
});

// Mock dependencies
vi.mock('@/src/lib/dates', () => ({
  formatLocalDate: (date: Date) => date.toISOString().split('T')[0],
  parseLocalDate: (dateStr: string) => new Date(dateStr),
}));

// Mock Calendar component since it might have dependencies
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

describe('BookingForm Component', () => {
  it('renders Pain Score slider and label', () => {
    render(<BookingForm onSubmit={vi.fn()} />);

    // Debug output to see why multiple elements are found
    screen.debug();

    // Check if the label is present
    const labels = screen.getAllByText(/Pain Score \(1-10\)/i);
    expect(labels.length).toBeGreaterThan(0);
    expect(labels[0]).toBeInTheDocument();

    // Check if the slider is present and has correct attributes
    const slider = screen.getByLabelText(/Pain Score \(1-10\)/i);
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute('type', 'range');
    expect(slider).toHaveAttribute('min', '1');
    expect(slider).toHaveAttribute('max', '10');
  });

  it('renders MRI Scan Available checkbox and label', () => {
    render(<BookingForm onSubmit={vi.fn()} />);

    // Check if the label is present
    const labels = screen.getAllByText(/I have recent MRI\/CT Scan reports available/i);
    expect(labels.length).toBeGreaterThan(0);
    expect(labels[0]).toBeInTheDocument();

    // Check if the checkbox is present and has correct attributes
    const checkbox = screen.getByLabelText(/I have recent MRI\/CT Scan reports available/i);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  it('allows updating Pain Score', () => {
    render(<BookingForm onSubmit={vi.fn()} />);

    const slider = screen.getByLabelText(/Pain Score \(1-10\)/i) as HTMLInputElement;
    fireEvent.change(slider, { target: { value: '8' } });
    expect(slider.value).toBe('8');
  });

  it('allows toggling MRI Scan Available', () => {
    render(<BookingForm onSubmit={vi.fn()} />);

    const checkbox = screen.getByLabelText(/I have recent MRI\/CT Scan reports available/i) as HTMLInputElement;
    expect(checkbox.checked).toBe(false); // Default

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });

  it('submits form with correct painScore and mriScanAvailable', async () => {
    const handleSubmit = vi.fn();
    render(<BookingForm onSubmit={handleSubmit} />);

    // Fill required fields
    fireEvent.change(screen.getByLabelText(/Patient Full Name/i), { target: { value: 'Test Patient' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText(/Gender/i), { target: { value: 'male' } });

    // Set Date (mocked Calendar)
    const calendarInput = screen.getByTestId('calendar-input');
    // Using a future date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split('T')[0];
    fireEvent.change(calendarInput, { target: { value: dateString } });

    // Set Time (click one of the buttons)
    fireEvent.click(screen.getByText('10:00 AM'));

    // Set Reason
    fireEvent.change(screen.getByLabelText(/Reason for Visit/i), { target: { value: 'Severe back pain for 2 weeks.' } });

    // Set Pain Score and MRI
    const slider = screen.getByLabelText(/Pain Score \(1-10\)/i);
    fireEvent.change(slider, { target: { value: '8' } });

    const checkbox = screen.getByLabelText(/I have recent MRI\/CT Scan reports available/i);
    if (!(checkbox as HTMLInputElement).checked) {
        fireEvent.click(checkbox);
    }

    // Submit
    fireEvent.submit(screen.getByRole('button', { name: /Submit Request/i }));

    // Wait for async submission
    await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    const submittedData = handleSubmit.mock.calls[0][0];
    expect(submittedData).toEqual(expect.objectContaining({
        painScore: 8,
        mriScanAvailable: true,
        patientName: 'Test Patient',
        email: 'test@example.com',
        phone: '9876543210',
        age: '30',
        gender: 'male',
        appointmentTime: '10:00 AM',
        reason: 'Severe back pain for 2 weeks.',
    }));
  });
});
