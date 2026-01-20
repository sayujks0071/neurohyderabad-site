import React from 'react';
import { SITE_URL } from '@/src/lib/seo';
import { getLocationById, SOCIAL_PROFILES } from '@/src/data/locations';

export default function AppointmentSchema() {
  const malakpet = getLocationById('malakpet');
  if (!malakpet) return null;

  // The user requested a specific JSON-LD structure for the booking page.
  // We use a graph to include both Physician and MedicalClinic entities.
  // Verified against SEO requirements:
  // - Name: 'Dr. Sayuj Krishnan'
  // - MedicalSpecialty: 'Neurosurgeon'
  // - Address: Yashoda Hospitals, Malakpet, Hyderabad
  // - AvailableService: 'Neurosurgery', 'Spine Surgery', 'Brain Tumor Surgery'
  // - URL: Booking page URL
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Physician",
        "@id": `${SITE_URL}/#physician`,
        "name": "Dr. Sayuj Krishnan",
        "medicalSpecialty": "Neurosurgeon",
        "sameAs": SOCIAL_PROFILES,
        "description": "Premier neurosurgeon specializing in minimally invasive brain & spine surgery, awake brain surgery, and robotic neurosurgery. Fellowship-trained with German training in endoscopic spine surgery.",
        "knowsLanguage": ["English", "Hindi", "Telugu", "Malayalam", "Tamil"],
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
        "hasMap": malakpet.google_maps_place_url,
        "telephone": malakpet.telephone,
        // Using the v2 image as it's the specific resized asset mentioned in memory
        "image": `${SITE_URL}/images/dr-sayuj-krishnan-portrait-v2.jpg`,
        "priceRange": "$$",
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
