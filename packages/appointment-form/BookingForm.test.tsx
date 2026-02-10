// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import BookingForm from './BookingForm';

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
});
