import { SITE_URL } from '@/src/lib/seo';
import {
  CANONICAL_PHYSICIAN_NAME,
  CANONICAL_TELEPHONE,
  YASHODA_MALAKPET_ADDRESS,
  YASHODA_GEO
} from '@/src/data/locations';

export function MedicalClinicSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${SITE_URL}/#clinic`,
    "name": `Dr Sayuj Krishnan Clinic - Yashoda Hospital Malakpet`,
    "url": SITE_URL,
    "telephone": CANONICAL_TELEPHONE,
    "image": `${SITE_URL}/images/og-default.jpg`,
    "description": "Clinic of Dr. Sayuj Krishnan, German-trained neurosurgeon in Hyderabad specializing in minimally invasive brain & spine surgery.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": YASHODA_MALAKPET_ADDRESS.streetAddress,
      "addressLocality": YASHODA_MALAKPET_ADDRESS.addressLocality,
      "addressRegion": YASHODA_MALAKPET_ADDRESS.addressRegion,
      "postalCode": YASHODA_MALAKPET_ADDRESS.postalCode,
      "addressCountry": YASHODA_MALAKPET_ADDRESS.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": YASHODA_GEO.latitude,
      "longitude": YASHODA_GEO.longitude
    },
    "medicalSpecialty": [
      "Neurosurgery",
      "Spine Surgery",
      "Brain Surgery"
    ],
    "parentOrganization": {
      "@type": "Hospital",
      "@id": `${SITE_URL}/#hospital`
    },
    "employee": {
      "@type": "Physician",
      "@id": `${SITE_URL}/#physician`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
