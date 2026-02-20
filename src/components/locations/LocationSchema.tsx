import React from 'react';
import { LocationData } from '@/src/data/locations';

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
  faq?: FAQItem[] | any[]; // Allow loose typing to catch legacy q/a without strict errors
  breadcrumb?: any[]; // Accepting breadcrumb but we generate defaults if not provided
}

export const LocationSchema: React.FC<LocationSchemaProps> = ({
  location,
  siteUrl = 'https://www.drsayuj.info',
  imageUrl = 'https://www.drsayuj.info/images/dr-sayuj-krishnan-portrait-v2.jpg',
  faq,
  breadcrumb
}) => {

  // Note: Physician Schema is injected globally by RootLayout via <PhysicianSchema />.
  // We do not duplicate it here to avoid conflicting entities.
  // We only generate MedicalClinic (linked to Physician via department) and Breadcrumb/FAQ.
  // This ensures a clean separation: Physician (Global) vs MedicalClinic (Local).

  // 1. MedicalClinic / LocalBusiness Schema
  const cleanSlug = location.slug.startsWith('/') ? location.slug.slice(1) : location.slug;
  const clinicId = `${siteUrl}/${cleanSlug}#clinic`;

  const clinicSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": clinicId,
    // Enforce Canonical Identity Rule: Name must be consistent
    "name": location.canonical_display_name,
    "image": imageUrl,
    "url": `${siteUrl}/${cleanSlug}`,
    "telephone": location.telephone,
    "medicalSpecialty": ["Neurosurgery", "Spine Surgery"],
    "priceRange": "₹₹",
    "paymentAccepted": "Cash, Credit Card, Insurance",
    "currenciesAccepted": "INR",
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
    "sameAs": location.sameAs,
    // Establish relationship with the main Hospital entity
    "containedInPlace": {
        "@id": `${siteUrl}/#hospital`
    },
    "department": {
        "@id": `${siteUrl}/#physician`
    },
    "areaServed": {
        "@type": "Place",
        "name": location.areaServedName
    },
    "openingHoursSpecification": location.openingHoursSpecification || [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "16:00"
      }
    ]
  };

  // 2. BreadcrumbList Schema
  // Use passed breadcrumb if available, otherwise generate default
  let itemListElement;

  if (breadcrumb && breadcrumb.length > 0) {
      // Normalize breadcrumb prop to schema structure if needed
      itemListElement = [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteUrl
        },
        ...breadcrumb.map((b, i) => ({
            "@type": "ListItem",
            "position": i + 2,
            "name": b.name,
            "item": b.item
        }))
      ];
  } else {
      itemListElement = [
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
      ];
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement
  };

  // 3. FAQPage Schema
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
