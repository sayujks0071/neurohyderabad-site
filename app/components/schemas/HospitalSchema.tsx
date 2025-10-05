import { SITE_URL } from '../../../src/lib/seo';

export default function HospitalSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Hospital",
    "@id": `${SITE_URL}/#hospital`,
    "name": "Yashoda Hospital, Malakpet",
    "url": "https://www.yashodahospitals.com/malakpet/",
    "telephone": "+91-40-6769 9999",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nalgonda X Roads",
      "addressLocality": "Malakpet",
      "addressRegion": "Hyderabad",
      "postalCode": "500036",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.3750",
      "longitude": "78.5147"
    },
    "department": {
      "@type": "MedicalSpecialty",
      "name": "Department of Neurosurgery",
      "availableService": [
        "Brain Surgery",
        "Spine Surgery",
        "Minimally Invasive Neurosurgery"
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
