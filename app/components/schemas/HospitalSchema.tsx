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
    "medicalSpecialty": [
      "Neurosurgery",
      "Spine Surgery", 
      "Brain Surgery",
      "Endoscopic Surgery",
      "Minimally Invasive Surgery",
      "Epilepsy Surgery",
      "Peripheral Nerve Surgery"
    ],
    "department": {
      "@type": "MedicalSpecialty",
      "name": "Department of Neurosurgery",
      "availableService": [
        {
          "@type": "MedicalService",
          "name": "Endoscopic Spine Surgery",
          "description": "Minimally invasive spine surgery using endoscopic techniques"
        },
        {
          "@type": "MedicalService", 
          "name": "Brain Tumor Surgery",
          "description": "Advanced brain tumor surgery with neuronavigation"
        },
        {
          "@type": "MedicalService",
          "name": "Epilepsy Surgery", 
          "description": "Surgical treatment for drug-resistant epilepsy"
        },
        {
          "@type": "MedicalService",
          "name": "Trigeminal Neuralgia Treatment",
          "description": "Microvascular decompression and radiosurgery"
        }
      ]
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Neurosurgery Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalService",
            "name": "Endoscopic Discectomy",
            "description": "Minimally invasive disc surgery"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "MedicalService",
            "name": "Spinal Fusion Surgery",
            "description": "Advanced spinal fusion techniques"
          }
        }
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
