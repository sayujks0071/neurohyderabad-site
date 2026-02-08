// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import LeadForm from './LeadForm';

// Mock dependencies
vi.mock('@/src/lib/middleware/rum', () => ({
  trackMiddlewareEvent: vi.fn(),
}));

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('LeadForm', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('submits form, shows loading state, and shows success message', async () => {
    // Mock successful fetch response
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    vi.stubGlobal('fetch', fetchMock);

    render(<LeadForm />);

    // Fill form
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'Hyderabad' } });
    fireEvent.change(screen.getByLabelText(/How can we help/i), { target: { value: 'I have severe back pain and need an appointment.' } });

    // Submit
    const submitBtn = screen.getByRole('button', { name: /Request Call Back/i });

    // Trigger click
    fireEvent.click(submitBtn);

    // Check loading state immediately after click (while fetch is pending)
    expect(submitBtn).toBeDisabled();
    expect(screen.getByText(/Sending.../i)).toBeInTheDocument();

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Request Received/i })).toBeInTheDocument();
    });

    // Verify exact success text
    expect(screen.getByText("Appointment request received. Please bring any MRI/CT scans with you. We will call you within 30-60 minutes to confirm your appointment.")).toBeInTheDocument();

    // Verify fetch was called
    expect(fetchMock).toHaveBeenCalledWith('/api/lead', expect.anything());

    // Verify "Send another enquiry" button appears (Reset logic validation indirectly)
    expect(screen.getByText(/Send another enquiry/i)).toBeInTheDocument();
  });
});
