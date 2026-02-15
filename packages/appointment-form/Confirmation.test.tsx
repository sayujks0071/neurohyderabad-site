// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import Confirmation from './Confirmation';
import { APPOINTMENT_SUCCESS_MESSAGE } from './constants';
import type { BookingData } from './types';

afterEach(() => {
  cleanup();
});

describe('Confirmation Component', () => {
  const mockBookingData: BookingData = {
    patientName: 'Test Patient',
    email: 'test@example.com',
    phone: '9876543210',
    age: '35',
    gender: 'male',
    appointmentDate: '2023-12-25',
    appointmentTime: '10:00 AM',
    reason: 'Routine checkup',
    painScore: 5,
    mriScanAvailable: true,
  };

  const mockOnBookAnother = vi.fn();
  const mockOnEdit = vi.fn();

  it('renders the success message correctly', () => {
    render(
      <Confirmation
        message={APPOINTMENT_SUCCESS_MESSAGE}
        bookingData={mockBookingData}
        onBookAnother={mockOnBookAnother}
        onEdit={mockOnEdit}
      />
    );

    // Verify the heading
    expect(screen.getAllByRole('heading', { name: /Request Received!/i })[0]).toBeInTheDocument();

    // Verify the message
    expect(screen.getAllByText(APPOINTMENT_SUCCESS_MESSAGE)[0]).toBeInTheDocument();
  });

  it('renders booking details correctly', () => {
    render(
      <Confirmation
        message={APPOINTMENT_SUCCESS_MESSAGE}
        bookingData={mockBookingData}
        onBookAnother={mockOnBookAnother}
        onEdit={mockOnEdit}
      />
    );

    // Use getAllByText to be robust against potential duplicates (though distinct content should be preferred)
    // and verify at least one exists.
    expect(screen.getAllByText('Test Patient')[0]).toBeInTheDocument();
    expect(screen.getAllByText('test@example.com')[0]).toBeInTheDocument();
    expect(screen.getAllByText('9876543210')[0]).toBeInTheDocument();
    expect(screen.getAllByText('35')[0]).toBeInTheDocument();
    expect(screen.getAllByText('male')[0]).toBeInTheDocument();
    expect(screen.getAllByText('2023-12-25')[0]).toBeInTheDocument();
    expect(screen.getAllByText('10:00 AM')[0]).toBeInTheDocument();
    // For partial text matches or composed text
    expect(screen.getAllByText(/5 \/ 10/)[0]).toBeInTheDocument();
    expect(screen.getAllByText('Yes')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Routine checkup')[0]).toBeInTheDocument();
  });
});
