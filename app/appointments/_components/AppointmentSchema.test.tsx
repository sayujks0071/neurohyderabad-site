import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AppointmentSchema from './AppointmentSchema';
import { SITE_URL } from '@/src/lib/seo';

// @vitest-environment jsdom

describe('AppointmentSchema', () => {
  it('renders correct JSON-LD structured data', () => {
    const { container } = render(<AppointmentSchema />);
    const scriptTag = container.querySelector('script[type="application/ld+json"]');

    expect(scriptTag).toBeDefined();

    const jsonContent = scriptTag?.textContent;
    expect(jsonContent).toBeDefined();

    const schema = JSON.parse(jsonContent!);

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@graph']).toHaveLength(2);

    const physician = schema['@graph'].find((item: any) => item['@type'] === 'Physician');
    const clinic = schema['@graph'].find((item: any) => item['@type'] === 'MedicalClinic');

    expect(physician).toBeDefined();
    expect(clinic).toBeDefined();

    // Verify Physician details
    expect(physician.name).toBe('Dr. Sayuj Krishnan');
    expect(physician.medicalSpecialty).toBe('Neurosurgeon');
    expect(physician.url).toBe(`${SITE_URL}/appointments`);
    expect(physician.availableService).toEqual(expect.arrayContaining([
      'Neurosurgery',
      'Spine Surgery',
      'Brain Tumor Surgery'
    ]));

    // Verify Address (derived from Malakpet location)
    expect(physician.address).toBeDefined();
    expect(physician.address.streetAddress).toContain('Yashoda Hospital');
    expect(physician.address.addressLocality).toBe('Hyderabad');

    // Verify MedicalClinic details
    expect(clinic.name).toBe('Yashoda Hospitals, Malakpet');
    expect(clinic.url).toBe('https://www.yashodahospitals.com/malakpet/');
  });
});
