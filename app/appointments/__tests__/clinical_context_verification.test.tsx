// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import PatientPortal from '../_components/neuralink/PatientPortal';

// Mock dependencies
vi.mock('../_components/neuralink/neuralinkApi', () => ({
  analyzeSymptoms: vi.fn(),
  searchNearbyCenters: vi.fn(),
  refineSymptomDescription: vi.fn(),
  interpretReport: vi.fn(),
}));

vi.mock('@/src/lib/google-ads-conversion', () => ({
  trackConversionOnly: vi.fn(),
}));

vi.mock('@/src/lib/analytics', () => ({
  analytics: {
    appointmentStart: vi.fn(),
    appointmentStepComplete: vi.fn(),
    appointmentSubmit: vi.fn(),
    appointmentSuccess: vi.fn(),
    formError: vi.fn(),
  },
}));

// Mock window.scrollTo
window.scrollTo = vi.fn();

describe('PatientPortal Clinical Context Verification', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock navigator.geolocation
    Object.defineProperty(global.navigator, 'geolocation', {
        value: {
            getCurrentPosition: vi.fn(),
            watchPosition: vi.fn(),
            clearWatch: vi.fn(),
        },
        writable: true,
    });

    // Mock global fetch
    global.fetch = vi.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ confirmationMessage: 'Confirmed!' }),
        })
    ) as any;
  });

  it('renders and submits Pain Score and MRI Scan fields', async () => {
    render(<PatientPortal />);

    // --- STEP 1: Scheduler ---

    // 1. Select Appointment Type (e.g., "New Consultation")
    const consultationBtn = screen.getByText('New Consultation');
    fireEvent.click(consultationBtn);

    // 2. Select Date (first enabled date)
    const dateButtons = screen.getAllByRole('button', { name: /Select/ });
    const enabledDateBtn = dateButtons.find(btn => !btn.hasAttribute('disabled'));
    if (!enabledDateBtn) throw new Error("No enabled date button found");
    fireEvent.click(enabledDateBtn);

    // 3. Select Time (first available slot)
    // We assume slots are rendered immediately since useMemo is used
    const timeSlotLabels = screen.getAllByRole('radiogroup');
    // Find the first label inside radiogroup that is enabled
    // Actually, TimeSlotButton uses <label><input type="radio" /></label>
    const radioInputs = screen.getAllByRole('radio') as HTMLInputElement[];
    const enabledRadio = radioInputs.find(r => !r.disabled);

    if (enabledRadio) {
        fireEvent.click(enabledRadio);
    } else {
        // Fallback: If no slots, we can't proceed.
        // But getAvailableSlots mocks logic based on date.
        // It's possible the test runs on a weekend where slots are empty?
        // getNextAvailableDate should handle weekends.
        throw new Error("No time slots available for testing");
    }

    // 4. Click Next Step
    const nextBtn = screen.getByText(/Next Step/i);
    expect(nextBtn).toBeEnabled();
    fireEvent.click(nextBtn);

    // --- STEP 2: Form ---

    // Verify Fields Exist
    expect(screen.getByText(/Pain Score \(1-10\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/I have recent MRI\/CT Scan reports/i)).toBeInTheDocument();

    // Fill Required Fields
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText(/Gender/i), { target: { value: 'male' } });
    fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });

    // Fill Symptoms (TextArea doesn't have label associated correctly in some cases, use placeholder or id)
    const symptomsInput = screen.getByPlaceholderText(/Describe your pain/i);
    fireEvent.change(symptomsInput, { target: { value: 'Back pain' } });

    // Interact with Pain Score Slider
    // The slider uses type="range".
    const slider = screen.getByLabelText(/Current Pain Score \(1-10\)/i);
    fireEvent.change(slider, { target: { value: '8' } });

    // Interact with MRI Checkbox
    const mriCheckbox = screen.getByLabelText(/I have recent MRI\/CT Scan reports/i);
    fireEvent.click(mriCheckbox); // Toggle to true (default false)

    // Submit Form
    const submitBtn = screen.getByText(/Confirm Booking/i);
    fireEvent.click(submitBtn);

    // Wait for submission
    await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    // Verify Payload
    const fetchCall = (global.fetch as any).mock.calls[0];
    const url = fetchCall[0];
    const options = fetchCall[1];

    expect(url).toBe('/api/workflows/booking');
    const body = JSON.parse(options.body);

    expect(body).toMatchObject({
        name: 'John Doe',
        painScore: 8,
        mriScanAvailable: true,
        chiefComplaint: 'Back pain',
    });
  });
});
