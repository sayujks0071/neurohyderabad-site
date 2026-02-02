import { describe, it, expect, vi } from 'vitest';
import { metadata } from './page';

// Mock the components imported by page.tsx to avoid rendering issues or heavy dependencies
vi.mock('./_components/neuralink/NeuraLinkBookingApp', () => ({ default: () => null }));
vi.mock('./_components/AppointmentSchema', () => ({ default: () => null }));
vi.mock('./_components/AppointmentFaqSchema', () => ({ default: () => null }));
vi.mock('./_components/neuralink/BookingHeroContent', () => ({ default: () => null }));
vi.mock('./_components/neuralink/BookingLocationInfo', () => ({ default: () => null }));

describe('Appointments Page Metadata', () => {
  it('has correct title and description', () => {
    expect(metadata.title).toBe('Book Appointment | Best Neurosurgeon Hyderabad | Dr. Sayuj');
    expect(metadata.description).toContain('Best Neurosurgeon in Hyderabad');
    expect(metadata.description).toContain('Book Appointment');
  });

  it('includes required keywords', () => {
    const keywords = metadata.keywords as string[];
    expect(keywords).toBeDefined();
    expect(keywords).toContain('Best Neurosurgeon Hyderabad');
    expect(keywords).toContain('Book Appointment');
  });
});
