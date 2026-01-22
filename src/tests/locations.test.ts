import { describe, it, expect } from 'vitest';
import { getLocationById, locations } from '../data/locations';

describe('Location Data Tests', () => {
  it('should have locations defined', () => {
    expect(locations.length).toBeGreaterThan(0);
  });

  it('should retrieve location by ID', () => {
    const loc = getLocationById('secunderabad');
    expect(loc).toBeDefined();
    expect(loc?.id).toBe('secunderabad');
  });

  it('should have required fields for all locations', () => {
    locations.forEach(loc => {
      expect(loc.name).toBeDefined();
      expect(loc.address).toBeDefined();
      expect(loc.telephone).toBeDefined();
      expect(loc.top_services_slugs).toBeDefined();
      expect(loc.top_conditions_slugs).toBeDefined();
    });
  });
});
