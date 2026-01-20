// @vitest-environment jsdom
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TeleconsultationForm from '../../components/TeleconsultationForm';
import React from 'react';
import '@testing-library/jest-dom/vitest';

// Mock dependencies
vi.mock('../src/lib/statsig-events', () => ({
  useStatsigEvents: () => ({
    logAppointmentBooking: vi.fn(),
    logContactFormSubmit: vi.fn(),
  }),
}));

vi.mock('../src/lib/google-ads-conversion', () => ({
  trackContactConversion: vi.fn(() => false),
}));

describe('TeleconsultationForm', () => {
  it('updates aria-valuetext when pain score changes', () => {
    render(<TeleconsultationForm pageSlug="test-slug" />);

    const rangeInput = screen.getByRole('slider', { name: /Pain Intensity Score/i });

    // Initial state
    expect(rangeInput).toHaveAttribute('aria-valuetext', 'Score: 5');

    // Change value to 9 (Severe)
    fireEvent.change(rangeInput, { target: { value: '9' } });
    expect(rangeInput).toHaveAttribute('aria-valuetext', 'Score: 9 (Severe)');

    // Change value to 2 (Mild)
    fireEvent.change(rangeInput, { target: { value: '2' } });
    expect(rangeInput).toHaveAttribute('aria-valuetext', 'Score: 2 (Mild)');
  });
});
