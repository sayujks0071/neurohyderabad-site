import React from 'react';
import { LocationData } from '@/src/data/locations';
import { safeJsonLdStringify } from '@/src/lib/seo/jsonld';

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
  aggregateRating?: {
    ratingValue: string;
    reviewCount: string;
  };
}

export const LocationSchema: React.FC<LocationSchemaProps> = ({
  location,
  siteUrl = 'https://www.drsayuj.info',
  imageUrl = 'https://www.drsayuj.info/images/dr-sayuj-krishnan-portrait-v2.jpg',
  faq,
  aggregateRating
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
    // Establish relationship with the main Hospital entity
    "containedInPlace": {
        "@id": `${siteUrl}/#hospital`
    },
    "department": {
        "@id": `${siteUrl}/#physician`
    },
    "employee": [
      {
        "@type": "Physician",
        "@id": `${siteUrl}/#physician`,
        "name": "Dr. Sayuj Krishnan"
      }
    ],
    "founder": {
      "@type": "Physician",
      "@id": `${siteUrl}/#physician`,
      "name": "Dr. Sayuj Krishnan"
    },
    "areaServed": {
        "@type": "Place",
        "name": location.areaServedName
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "16:00"
      }
    ],
    ...(faq ? {} : {}), // just an anchor
    ...(aggregateRating ? {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": aggregateRating.ratingValue,
        "reviewCount": aggregateRating.reviewCount
      }
    } : {})
  };

  // 2. FAQPage Schema
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
        "name": location.name,
        "item": `${siteUrl}/${cleanSlug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(clinicSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(breadcrumbSchema) }}
      />
    </>
  );
};
