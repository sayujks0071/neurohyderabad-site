import { describe, expect, test } from 'vitest';
import { getLocationById, locations } from '../data/locations';

describe('Location Data Tests', () => {
  test('Locations should be defined', () => {
    expect(locations.length).toBeGreaterThan(0);
  });

  test('Should retrieve location by ID', () => {
    const loc = getLocationById('secunderabad');
    expect(loc).toBeDefined();
    expect(loc?.id).toBe('secunderabad');
  });

  test('All locations should have required fields', () => {
    locations.forEach(loc => {
      expect(loc.name).toBeTruthy();
      expect(loc.address).toBeTruthy();
      expect(loc.telephone).toBeTruthy();
      expect(loc.top_services_slugs).toBeDefined();
      expect(loc.top_conditions_slugs).toBeDefined();
    });
  });
});
