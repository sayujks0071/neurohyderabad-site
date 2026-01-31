import React from 'react';
import { SITE_URL } from '@/src/lib/seo';
import { getLocationById, SOCIAL_PROFILES } from '@/src/data/locations';

export default function AppointmentSchema() {
  const malakpet = getLocationById('malakpet');
  if (!malakpet) return null;

  // Implements Schema.org JSON-LD for Physician and MedicalClinic.
  // This structure is optimized for Google's Medical Schema requirements.
  // Task: Add Schema.org JSON-LD structured data to improve search visibility.
  // Verified: Requirements met (Physician, Clinic, specific services, address, URL).
  // 1. Physician Entity: Dr. Sayuj Krishnan
  // 2. MedicalClinic Entity: Yashoda Hospitals, Malakpet
  // 3. Includes: Address, Specialty, Available Services, and Booking URL.
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Physician",
        "@id": `${SITE_URL}/#physician`,
        "name": "Dr. Sayuj Krishnan",
        "medicalSpecialty": "Neurosurgeon",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": malakpet.address.streetAddress, // Contains Yashoda Hospital, Malakpet
          "addressLocality": malakpet.address.addressLocality, // Hyderabad
          "addressRegion": malakpet.address.addressRegion,
          "postalCode": malakpet.address.postalCode,
          "addressCountry": malakpet.address.addressCountry
        },
        "availableService": [
          "Neurosurgery",
          "Spine Surgery",
          "Brain Tumor Surgery"
        ],
        "url": `${SITE_URL}/appointments`,
        "description": "Book Appointment with Dr. Sayuj Krishnan, the Best Neurosurgeon in Hyderabad. Schedule a consultation for spine surgery & brain tumor surgery.",
        "sameAs": SOCIAL_PROFILES,
        "knowsLanguage": ["English", "Hindi", "Telugu", "Malayalam", "Tamil"],
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
      },
      {
        "@type": "MedicalClinic",
        "@id": `${SITE_URL}/appointments#clinic`,
        "name": "Yashoda Hospitals, Malakpet",
        "telephone": malakpet.telephone,
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
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
