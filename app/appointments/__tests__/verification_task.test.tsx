// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import AppointmentSchema from '../_components/AppointmentSchema';
import { metadata } from '../page';
import { SITE_URL } from '@/src/lib/seo';

/**
 * Verification Test for SEO & Structured Data Task
 * Requirement:
 * 1. Create a dynamic JSON-LD object for a Physician and MedicalClinic.
 * 2. Inject this script into the <head> of the booking page. The JSON should include:
 *    - @type: Physician
 *    - name: 'Dr. Sayuj Krishnan'
 *    - medicalSpecialty: 'Neurosurgeon'
 *    - address: The clinic location (e.g., Yashoda Hospitals, Malakpet, Hyderabad).
 *    - availableService: 'Neurosurgery', 'Spine Surgery', 'Brain Tumor Surgery'.
 *    - url: The full URL of this booking page.
 * 3. Ensure the script is rendered server-side.
 * 4. Verify page metadata includes 'Best Neurosurgeon Hyderabad' and 'Book Appointment'.
 */
describe('Verification Task: Appointment SEO', () => {
  it('Task Requirement 4: Metadata verification', () => {
    // Check title
    const title = typeof metadata.title === 'string' ? metadata.title : (metadata.title as any)?.default || '';
    expect(title).toContain('Best Neurosurgeon in Hyderabad');
    expect(title).toContain('Book Appointment');

    // Check description
    expect(metadata.description).toContain('Best Neurosurgeon Hyderabad');
    expect(metadata.description).toContain('Book Appointment');
  });

  it('Task Requirement 1 & 2: JSON-LD Structured Data verification', () => {
    const { container } = render(<AppointmentSchema />);

    // Verify script injection (simulated in component render)
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeTruthy();
    if (!script) throw new Error('JSON-LD script not found');

    const json = JSON.parse(script.innerHTML);
    const graph = json['@graph'];
    expect(graph).toBeDefined();

    // Verify Physician
    const physician = graph.find((item: any) => item['@type'] === 'Physician');
    expect(physician).toBeDefined();

    // Specific Field Checks
    expect(physician.name).toBe('Dr. Sayuj Krishnan');
    expect(physician.medicalSpecialty).toBe('Neurosurgeon');

    // Address Check (Malakpet Location)
    expect(physician.address).toBeDefined();
    expect(physician.address.streetAddress).toContain('Yashoda Hospital');
    expect(physician.address.addressLocality).toBe('Hyderabad');

    // Available Service Check
    // Requirement: 'Neurosurgery', 'Spine Surgery', 'Brain Tumor Surgery'
    expect(physician.availableService).toEqual(expect.arrayContaining([
      'Neurosurgery',
      'Spine Surgery',
      'Brain Tumor Surgery'
    ]));

    // URL Check
    expect(physician.url).toBe(`${SITE_URL}/appointments`);

    // Verify MedicalClinic
    const clinic = graph.find((item: any) => item['@type'] === 'MedicalClinic');
    expect(clinic).toBeDefined();
    expect(clinic.name).toContain('Yashoda Hospitals, Malakpet');
  });
});
