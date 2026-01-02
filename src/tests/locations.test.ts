import { getLocationById, locations } from '../data/locations';

console.log("Running Location Data Tests...");

try {
  // Test 1: Locations defined
  if (locations.length === 0) {
    throw new Error('No locations defined');
  }
  console.log(`PASS: Found ${locations.length} locations`);

  // Test 2: Retrieve by ID
  const loc = getLocationById('secunderabad');
  if (!loc) {
    throw new Error('Could not find location "secunderabad"');
  }
  if (loc.id !== 'secunderabad') {
    throw new Error('ID mismatch');
  }
  console.log("PASS: Retrieved location by ID");

  // Test 3: Required fields
  locations.forEach(loc => {
    if (!loc.name || !loc.address || !loc.telephone) {
      throw new Error(`Location ${loc.id} missing required fields`);
    }
    if (!loc.top_services_slugs || !loc.top_conditions_slugs) {
      throw new Error(`Location ${loc.id} missing pathway links`);
    }
  });
  console.log("PASS: All locations have required fields");

  console.log("All tests passed!");

} catch (e: any) {
  console.error("TEST FAILED:", e.message);
  process.exit(1);
}
