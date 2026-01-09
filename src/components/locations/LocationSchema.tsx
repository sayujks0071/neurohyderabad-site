import React from 'react';
import { LocationData, CANONICAL_PHYSICIAN_NAME } from '../../data/locations';

interface LocationSchemaProps {
  location: LocationData;
  breadcrumb?: {
    name: string;
    item: string;
  }[];
  faq?: { q: string; a: string }[];
}

export const LocationSchema: React.FC<LocationSchemaProps> = ({ location, breadcrumb, faq }) => {
  // 1. Physician Schema is handled globally by PhysicianSchema.tsx in RootLayout.
  // We do NOT duplicate it here to avoid conflicts.

  // 2. MedicalClinic / LocalBusiness Schema (Per Location)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `https://www.drsayuj.info/${location.slug}#clinic`,
    "name": location.name,
    "image": "https://www.drsayuj.info/images/og-default.jpg",
    "url": `https://www.drsayuj.info/${location.slug}`,
    "telephone": location.telephone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": location.address.streetAddress,
      "addressLocality": location.address.addressLocality,
      "addressRegion": location.address.addressRegion,
      "postalCode": location.address.postalCode,
      "addressCountry": location.address.addressCountry
    },
    ...(location.geo && {
        "geo": {
        "@type": "GeoCoordinates",
        "latitude": location.geo.latitude,
        "longitude": location.geo.longitude
        }
    }),
    "areaServed": {
      "@type": "City",
      "name": "Hyderabad",
      "containsPlace": { "@type": "Place", "name": location.areaServedName }
    },
    // Linking back to the physician via department (clinic has a neurosurgery department/physician)
    "department": {
        "@id": "https://www.drsayuj.info/#physician"
    },
    // Also explicitly link that this clinic is a place where the physician works (if supported by schema, but department is safer inverted relationship)
    "hasMap": location.google_maps_place_url
  };

  // 3. Breadcrumb Schema
  const breadcrumbSchema = breadcrumb ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.drsayuj.info/" },
      ...breadcrumb.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.name,
        "item": item.item
      }))
    ]
  } : null;

  // 4. FAQ Schema
  const faqSchema = faq ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
};
