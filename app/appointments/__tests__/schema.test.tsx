// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import AppointmentSchema from '../_components/AppointmentSchema';
import { metadata } from '../page';
import { SITE_URL } from '@/src/lib/seo';

describe('Appointment Page SEO', () => {
  it('has correct metadata', () => {
    // Check title string or object (Next.js metadata title can be object)
    const title = typeof metadata.title === 'string' ? metadata.title : (metadata.title as any)?.default || '';
    expect(title).toContain('Best Neurosurgeon Hyderabad');
    expect(title).toContain('Book Appointment');

    expect(metadata.description).toContain('Best Neurosurgeon in Hyderabad');
    expect(metadata.description).toContain('Book Appointment');
  });

  it('renders correct JSON-LD schema', () => {
    const { container } = render(<AppointmentSchema />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeTruthy();

    if (!script) return; // for TS

    const json = JSON.parse(script.innerHTML);

    expect(json['@context']).toBe('https://schema.org');

    const graph = json['@graph'];
    expect(graph).toBeDefined();

    // Find Physician
    const physician = graph.find((item: any) => item['@type'] === 'Physician');
    expect(physician).toBeDefined();
    expect(physician.name).toBe('Dr. Sayuj Krishnan');
    expect(physician.medicalSpecialty).toBe('Neurosurgeon');
    expect(physician.url).toBe(`${SITE_URL}/appointments`);
    expect(physician.availableService).toEqual(expect.arrayContaining([
      'Neurosurgery',
      'Spine Surgery',
      'Brain Tumor Surgery'
    ]));

    // Check address in Physician (using Malakpet data)
    expect(physician.address).toBeDefined();
    expect(physician.address.streetAddress).toContain('Yashoda Hospital');
    expect(physician.address.streetAddress).toContain('Malakpet');

    // Find MedicalClinic
    const clinic = graph.find((item: any) => item['@type'] === 'MedicalClinic');
    expect(clinic).toBeDefined();
    expect(clinic.name).toContain('Yashoda Hospitals, Malakpet');

    // Check linkage
    // Physician worksFor -> Clinic ID
    // Clinic employee -> Physician ID

    // Note: The implementation in AppointmentSchema.tsx uses:
    // Physician -> worksFor -> @id: .../appointments#clinic
    // MedicalClinic -> @id: .../appointments#clinic

    expect(physician.worksFor['@id']).toBe(clinic['@id']);
    expect(clinic.employee['@id']).toBe(physician['@id']);
  });
});
