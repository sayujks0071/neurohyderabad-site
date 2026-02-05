// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AppointmentSchema from './AppointmentSchema';

describe('AppointmentSchema', () => {
  it('renders valid JSON-LD with Physician and MedicalClinic data', () => {
    const { container } = render(<AppointmentSchema />);
    const scriptTag = container.querySelector('script[type="application/ld+json"]');

    expect(scriptTag).toBeDefined();
    expect(scriptTag).not.toBeNull();

    if (scriptTag) {
      const json = JSON.parse(scriptTag.innerHTML);
      expect(json['@context']).toBe('https://schema.org');
      expect(json['@graph']).toBeDefined();
      expect(Array.isArray(json['@graph'])).toBe(true);

      const physician = json['@graph'].find((item: any) => item['@type'] === 'Physician');
      const clinic = json['@graph'].find((item: any) => item['@type'] === 'MedicalClinic');

      // Verify Physician
      expect(physician).toBeDefined();
      expect(physician.name).toBe('Dr. Sayuj Krishnan');
      expect(physician.medicalSpecialty).toBe('Neurosurgeon');
      // Using arrayContaining to be flexible with order
      expect(physician.availableService).toEqual(expect.arrayContaining(['Neurosurgery', 'Spine Surgery', 'Brain Tumor Surgery']));
      expect(physician.url).toContain('/appointments');
      expect(physician.address).toBeDefined();

      // Verify Area Served
      expect(physician.areaServed).toBeDefined();
      expect(physician.areaServed.name).toContain('Hyderabad');

      // Verify MedicalClinic
      expect(clinic).toBeDefined();
      expect(clinic.name).toContain('Yashoda Hospitals');
      expect(clinic.department).toBeDefined(); // Should link to physician

      // Verify Linkage
      expect(physician.worksFor['@id']).toBe(clinic['@id']);
      expect(clinic.department['@id']).toBe(physician['@id']);
    }
  });
});
