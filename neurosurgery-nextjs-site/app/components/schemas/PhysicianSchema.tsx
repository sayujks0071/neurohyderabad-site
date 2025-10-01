import { SITE_URL } from '../../../src/lib/seo';

export default function PhysicianSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE_URL}/#physician`,
    "name": "Dr. Sayuj Krishnan",
    "url": SITE_URL,
    "image": `${SITE_URL}/images/dr-sayuj-krishnan.jpg`,
    "description": "Dr. Sayuj Krishnan is a highly experienced neurosurgeon in Hyderabad specializing in minimally invasive brain & spine surgery",
    "medicalSpecialty": [
      "Neurosurgery",
      "Brain Surgery",
      "Spine Surgery"
    ],
    "availableService": [
      {
        "@type": "MedicalProcedure",
        "name": "Brain Tumor Surgery",
        "url": `${SITE_URL}/services/brain-tumor-surgery-hyderabad`
      },
      {
        "@type": "MedicalProcedure",
        "name": "Minimally Invasive Spine Surgery",
        "url": `${SITE_URL}/services/minimally-invasive-spine-surgery`
      },
      {
        "@type": "MedicalProcedure",
        "name": "Endoscopic Spine Surgery",
        "url": `${SITE_URL}/services/minimally-invasive-spine-surgery`
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Room No 317, OPD Block, Yashoda Hospital, Malakpet",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500036",
      "addressCountry": "IN"
    },
    "telephone": "+91 9778280044",
    "email": "neurospinehyd@drsayuj.com",
    "workLocation": {
      "@type": "Hospital",
      "name": "Yashoda Hospital, Malakpet",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Nalgonda X Roads",
        "addressLocality": "Malakpet",
        "addressRegion": "Hyderabad",
        "postalCode": "500036",
        "addressCountry": "IN"
      }
    },
    "sameAs": [
      "https://g.co/kgs/9366939683880052414",
      "https://www.google.com/maps/place/Dr+Sayuj+Krishnan",
      "https://www.yashodahospitals.com/doctor/dr-sayuj-krishnan/"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
