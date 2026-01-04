import React from 'react';
import { CANONICAL_PHYSICIAN_NAME, CANONICAL_TELEPHONE, getLocationById } from '../../data/locations';

// Using the first location (Secunderabad/Malakpet base) as the canonical address source for the physician
// or we can hardcode the main clinic details if they differ.
// Ideally, we should pull from locations.ts to stay consistent.
const MAIN_LOCATION_ID = "malakpet"; // Assuming Malakpet is the main clinic

export const PhysicianSchema: React.FC = () => {
  const mainLocation = getLocationById(MAIN_LOCATION_ID);

  if (!mainLocation) return null;

  const physicianSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": "https://www.drsayuj.info/#physician",
    "name": CANONICAL_PHYSICIAN_NAME,
    "url": "https://www.drsayuj.info/",
    "telephone": CANONICAL_TELEPHONE,
    "image": "https://www.drsayuj.info/images/dr-sayuj-krishnan.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": mainLocation.address.streetAddress,
      "addressLocality": mainLocation.address.addressLocality,
      "addressRegion": mainLocation.address.addressRegion,
      "postalCode": mainLocation.address.postalCode,
      "addressCountry": mainLocation.address.addressCountry
    },
    "affiliation": {
       "@type": "MedicalClinic",
       "name": mainLocation.name,
       "@id": `https://www.drsayuj.info/${mainLocation.slug}#clinic`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
    />
  );
};
