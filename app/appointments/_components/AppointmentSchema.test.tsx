// @vitest-environment jsdom
import { render } from '@testing-library/react';
import AppointmentSchema from './AppointmentSchema';
import { SITE_URL } from '@/src/lib/seo';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('AppointmentSchema', () => {
  it('renders correct JSON-LD schema', () => {
    const { container } = render(<AppointmentSchema />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();

    if (script) {
        const json = JSON.parse(script.innerHTML);
        const physician = json['@graph'].find((item: any) => item['@type'] === 'Physician');
        const clinic = json['@graph'].find((item: any) => item['@type'] === 'MedicalClinic');

        expect(physician).toBeDefined();
        expect(physician.name).toBe('Dr. Sayuj Krishnan');
        expect(physician.medicalSpecialty).toBe('Neurosurgeon');
        expect(physician.availableService).toEqual(expect.arrayContaining([
            'Neurosurgery',
            'Spine Surgery',
            'Brain Tumor Surgery'
        ]));
        // Check exact match for availableService to be precise as per prompt
        expect(physician.availableService).toHaveLength(3);

        expect(physician.url).toBe(`${SITE_URL}/appointments`);

        expect(clinic).toBeDefined();
        expect(clinic.name).toContain('Yashoda Hospitals');
        expect(clinic.address.addressLocality).toBe('Hyderabad');
    }
  });
});
