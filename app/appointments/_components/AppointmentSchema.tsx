import React from 'react';
import { SITE_URL } from '@/src/lib/seo';
import { getLocationById, SOCIAL_PROFILES } from '@/src/data/locations';

export default function AppointmentSchema() {
  const malakpet = getLocationById('malakpet');
  if (!malakpet) return null;

  // SEO: Dynamic JSON-LD for Physician and MedicalClinic specific to the booking page context.
  // Helps Google associate this page with the physician and clinic location.
  // Verified to meet SEO requirements: Physician, MedicalClinic, Address, Services.
  // Validated against schema.org recommendations for local business/medical practice.
  // Note: This script is server-side rendered and injected into the <body> via this component,
  // which is a valid placement for JSON-LD structured data according to Google guidelines.
  const physicianSchema = {
    "@type": "Physician",
    "@id": `${SITE_URL}/#physician`,
    "name": "Dr. Sayuj Krishnan",
    // SEO: Medical Specialty as 'Neurosurgeon'
    "medicalSpecialty": "Neurosurgeon",
    // SEO: Clinic Location (Yashoda Hospitals, Malakpet, Hyderabad)
    "address": {
      "@type": "PostalAddress",
      "streetAddress": malakpet.address.streetAddress,
      "addressLocality": malakpet.address.addressLocality,
      "addressRegion": malakpet.address.addressRegion,
      "postalCode": malakpet.address.postalCode,
      "addressCountry": malakpet.address.addressCountry
    },
    // SEO: Specific Services
    "availableService": [
      "Neurosurgery",
      "Spine Surgery",
      "Brain Tumor Surgery"
    ],
    "url": `${SITE_URL}/appointments`,
    "description": "Book Appointment with Dr. Sayuj Krishnan, the Best Neurosurgeon Hyderabad. Schedule a consultation for spine surgery & brain tumor surgery.",
    "sameAs": SOCIAL_PROFILES,
    "knowsLanguage": ["English", "Hindi", "Telugu", "Malayalam", "Tamil"],
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Hyderabad, Telangana, India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": malakpet.geo?.latitude,
      "longitude": malakpet.geo?.longitude
    },
    "hasMap": malakpet.google_maps_place_url,
    "telephone": malakpet.telephone,
    "image": `${SITE_URL}/images/dr-sayuj-krishnan-portrait-v2.jpg`,
    "priceRange": "₹₹",
    "worksFor": {
      "@id": `${SITE_URL}/appointments#clinic`
    }
  };

  const clinicSchema = {
    "@type": "MedicalClinic",
    "@id": `${SITE_URL}/appointments#clinic`,
    "name": "Yashoda Hospitals, Malakpet",
    "telephone": malakpet.telephone,
    "priceRange": "₹₹",
    "url": "https://www.yashodahospitals.com/malakpet/",
    "hasMap": malakpet.directions_url,
    "sameAs": "https://www.yashodahospitals.com/malakpet/",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": malakpet.address.streetAddress,
      "addressLocality": malakpet.address.addressLocality,
      "addressRegion": malakpet.address.addressRegion,
      "postalCode": malakpet.address.postalCode,
      "addressCountry": malakpet.address.addressCountry
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": malakpet.geo?.latitude,
        "longitude": malakpet.geo?.longitude
    },
    "parentOrganization": {
      "@id": `${SITE_URL}/#hospital`
    },
    "department": {
      "@id": `${SITE_URL}/#physician`
    }
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      physicianSchema,
      clinicSchema
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
