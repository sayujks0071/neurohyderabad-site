// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import BookingForm from './BookingForm';

// Cleanup after each test case
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

  it('shows loading state during submission and resets form on success', async () => {
    // Mock onSubmit with a delay to verify loading state
    const onSubmit = vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    render(<BookingForm onSubmit={onSubmit} />);

    // Fill in required fields with valid data
    fireEvent.change(screen.getByLabelText(/Patient Full Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText(/Gender/i), { target: { value: 'male' } });

    // Set a future date (current year + 1) to ensure validation passes
    const futureYear = new Date().getFullYear() + 1;
    fireEvent.change(screen.getByTestId('calendar-input'), { target: { value: `${futureYear}-12-31` } });

    // Select time
    fireEvent.click(screen.getByText('09:00 AM'));

    // Fill reason (min 10 chars)
    fireEvent.change(screen.getByLabelText(/Reason for Visit/i), { target: { value: 'Severe headache for 2 days' } });

    // Find and click submit button
    const submitBtn = screen.getByRole('button', { name: /Submit Request/i });
    fireEvent.click(submitBtn);

    // Verify loading state (button disabled and text changed)
    // We wait for the button to be disabled because form submission is async
    await waitFor(() => {
        expect(submitBtn).toBeDisabled();
        expect(submitBtn).toHaveTextContent('Sending...');
    });

    // Verify onSubmit was called
    await waitFor(() => expect(onSubmit).toHaveBeenCalled());

    // Verify form reset (inputs should be empty)
    await waitFor(() => {
        expect(screen.getByLabelText(/Patient Full Name/i)).toHaveValue('');
        expect(screen.getByLabelText(/Email Address/i)).toHaveValue('');
        // Calendar input reset
        expect(screen.getByTestId('calendar-input')).toHaveValue('');
    });
  });
});
