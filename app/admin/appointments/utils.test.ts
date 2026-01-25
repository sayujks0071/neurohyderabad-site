import { expect, test, describe } from 'vitest';
import { generateWhatsappUrl, formatDate } from './utils';
import { WhatsappAppointment } from './types';

describe('generateWhatsappUrl', () => {
  const basePatient: WhatsappAppointment = {
    id: '1',
    fullName: 'Test User',
    phone: '',
    preferredDate: '2023-10-01'
  };

  test('generates correct URL for standard Indian 10-digit number', () => {
    const patient = { ...basePatient, phone: '9876543210' };
    const url = generateWhatsappUrl(patient);
    expect(url).toContain('wa.me/919876543210');
    expect(url).toContain(encodeURIComponent('Hello Test User, this is regarding your appointment with Dr. Sayuj on 2023-10-01. We confirm your slot. Please bring your MRI/CT scans.'));
  });

  test('generates correct URL for 12-digit number with 91 prefix', () => {
    const patient = { ...basePatient, phone: '919876543210' };
    const url = generateWhatsappUrl(patient);
    // Should strip 91 from input and add 91 from template -> 919876543210
    expect(url).toContain('wa.me/919876543210');
  });

  test('generates correct URL for +91 formatted number with spaces', () => {
    const patient = { ...basePatient, phone: '+91 98765 43210' };
    const url = generateWhatsappUrl(patient);
    expect(url).toContain('wa.me/919876543210');
  });

  test('generates correct URL for number with dashes', () => {
    const patient = { ...basePatient, phone: '987-654-3210' };
    const url = generateWhatsappUrl(patient);
    expect(url).toContain('wa.me/919876543210');
  });

  test('handles number with leading zero (11 digits) by removing 0', () => {
    const patient = { ...basePatient, phone: '09876543210' };
    const url = generateWhatsappUrl(patient);
    // Should strip leading 0 -> 9876543210 -> wa.me/919876543210
    expect(url).toContain('wa.me/919876543210');
  });

  test('handles non-Indian number by appending 91 anyway (as per current logic)', () => {
     // The current logic hardcodes 91 prefix in the URL.
     // So if I pass 15551234567, it will be wa.me/9115551234567.
     // This test documents the behavior.
     const patient = { ...basePatient, phone: '15551234567' };
     const url = generateWhatsappUrl(patient);
     expect(url).toContain('wa.me/9115551234567');
  });

  test('handles complex formatted number with brackets and plus', () => {
    const patient = { ...basePatient, phone: '+91 (987) 654-3210' };
    const url = generateWhatsappUrl(patient);
    // Should strip all non-digits: + ( ) - space -> 919876543210
    // Then logic removes prefix 91 -> 9876543210
    // Then template adds 91 -> wa.me/919876543210
    expect(url).toContain('wa.me/919876543210');
  });
});

describe('formatDate', () => {
  test('formats date string correctly', () => {
    const formatted = formatDate('2023-10-01');
    // We expect some formatted date.
    // In many environments this is "1 Oct 2023" or similar.
    // Checking for year 2023 ensures it parsed correctly.
    expect(formatted).toContain('2023');
    expect(formatted).not.toBe('2023-10-01');
  });

  test('returns original string if date is invalid', () => {
    const invalid = 'invalid-date';
    expect(formatDate(invalid)).toBe(invalid);
  });
});
