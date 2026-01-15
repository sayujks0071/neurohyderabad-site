import React from 'react';
import { CANONICAL_PHYSICIAN_NAME, CANONICAL_TELEPHONE, getLocationById } from '../../data/locations';

const MAIN_LOCATION_ID = 'malakpet';

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
    },
    "sameAs": [
      mainLocation.google_maps_place_url
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
    />
  );
};
