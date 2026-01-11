import React from 'react';
import { LocationData, CANONICAL_PHYSICIAN_NAME, CANONICAL_TELEPHONE } from '@/src/data/locations';

// Helper to sanitize and format JSON-LD
const toJson = (data: any) => JSON.stringify(data, null, 2);

interface FAQItem {
  question?: string;
  answer?: string;
  q?: string; // Legacy support
  a?: string; // Legacy support
}

interface LocationSchemaProps {
  location: LocationData;
  siteUrl?: string;
  imageUrl?: string;
  faq?: FAQItem[] | any[]; // Allow loose typing to catch legacy q/a without strict errors, but Interface above handles it.
  breadcrumb?: any[]; // Accepting breadcrumb but ignoring it or using it if we wanted to
}

export const LocationSchema: React.FC<LocationSchemaProps> = ({
  location,
  siteUrl = 'https://www.drsayuj.info',
  imageUrl = 'https://www.drsayuj.info/images/dr-sayuj-krishnan-portrait-v2.jpg',
  faq
}) => {

  // 1. Physician Schema
  const physicianSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${siteUrl}/#physician`,
    "name": CANONICAL_PHYSICIAN_NAME,
    "url": siteUrl,
    "image": imageUrl,
    "telephone": CANONICAL_TELEPHONE,
    "priceRange": "₹₹",
    "medicalSpecialty": ["Neurological Surgery", "Spine Surgery"],
  };

  // 2. MedicalClinic / LocalBusiness Schema
  const cleanSlug = location.slug.startsWith('/') ? location.slug.slice(1) : location.slug;
  const clinicId = `${siteUrl}/${cleanSlug}#clinic`;

  const clinicSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": clinicId,
    "name": location.name,
    "image": imageUrl,
    "url": `${siteUrl}/${cleanSlug}`,
    "telephone": location.telephone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": location.address.streetAddress,
      "addressLocality": location.address.addressLocality,
      "addressRegion": location.address.addressRegion,
      "postalCode": location.address.postalCode,
      "addressCountry": location.address.addressCountry
    },
    "geo": location.geo ? {
      "@type": "GeoCoordinates",
      "latitude": location.geo.latitude,
      "longitude": location.geo.longitude
    } : undefined,
    "hasMap": location.google_maps_place_url,
    "department": {
        "@id": `${siteUrl}/#physician`
    },
    "areaServed": {
        "@type": "Place",
        "name": location.areaServedName
    }
  };

  // 3. BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Locations",
        "item": `${siteUrl}/locations`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": location.areaServedName,
        "item": `${siteUrl}/${cleanSlug}`
      }
    ]
  };

  // 4. FAQPage Schema
  const faqSchema = faq ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(item => {
      const question = item.question || item.q;
      const answer = item.answer || item.a;
      if (!question || !answer) return null;

      return {
        "@type": "Question",
        "name": question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": answer
        }
      };
    }).filter(Boolean)
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJson(physicianSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJson(clinicSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJson(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJson(faqSchema) }}
        />
      )}
    </>
  );
};
