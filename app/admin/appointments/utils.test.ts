import { expect, test, describe } from 'vitest';
import { generateWhatsappUrl } from './utils';
import { Appointment } from './data';

describe('generateWhatsappUrl', () => {
  const basePatient: Appointment = {
    id: '1',
    patientName: 'Test User',
    contactNumber: '',
    requestedDate: '2023-10-01',
    status: 'Pending'
  };

  test('generates correct URL for standard Indian 10-digit number', () => {
    const patient = { ...basePatient, contactNumber: '9876543210' };
    const url = generateWhatsappUrl(patient);
    expect(url).toContain('wa.me/919876543210');
    expect(url).toContain(encodeURIComponent('Hello Test User, this is regarding your appointment with Dr. Sayuj on 2023-10-01. We confirm your slot. Please bring your MRI/CT scans.'));
  });

  test('generates correct URL for 12-digit number with 91 prefix', () => {
    const patient = { ...basePatient, contactNumber: '919876543210' };
    const url = generateWhatsappUrl(patient);
    // Should strip 91 from input and add 91 from template -> 919876543210
    expect(url).toContain('wa.me/919876543210');
  });

  test('generates correct URL for +91 formatted number with spaces', () => {
    const patient = { ...basePatient, contactNumber: '+91 98765 43210' };
    const url = generateWhatsappUrl(patient);
    expect(url).toContain('wa.me/919876543210');
  });

  test('generates correct URL for number with dashes', () => {
    const patient = { ...basePatient, contactNumber: '987-654-3210' };
    const url = generateWhatsappUrl(patient);
    expect(url).toContain('wa.me/919876543210');
  });

  test('handles non-Indian number by appending 91 anyway (as per current logic)', () => {
     // The current logic hardcodes 91 prefix in the URL.
     // So if I pass 15551234567, it will be wa.me/9115551234567.
     // This test documents the behavior.
     const patient = { ...basePatient, contactNumber: '15551234567' };
     const url = generateWhatsappUrl(patient);
     expect(url).toContain('wa.me/9115551234567');
  });
});
