import { serializeJsonLd } from '@/src/lib/seo/serialize';
export default function EmergencyRehabilitationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Emergency & Rehabilitation Services",
    "description": "24/7 emergency neurosurgical consultation, hotline support, and comprehensive rehabilitation partnerships in Hyderabad.",
    "url": "https://www.drsayuj.info/emergency-rehabilitation/",
    "mainEntity": {
      "@type": "MedicalBusiness",
      "name": "Dr. Sayuj Krishnan - Emergency Neurosurgery & Rehabilitation",
      "description": "24/7 emergency neurosurgical consultation and comprehensive rehabilitation partnerships for complete patient care.",
      "medicalSpecialty": "Neurosurgery",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Emergency & Rehabilitation Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "MedicalService",
              "name": "24/7 Emergency Neurosurgical Consultation",
              "description": "Direct access to Dr. Sayuj Krishnan for urgent neurosurgical consultations",
              "category": "Emergency Services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "MedicalService",
              "name": "Emergency Triage Service",
              "description": "Rapid assessment and prioritization of neurosurgical emergencies",
              "category": "Emergency Services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "MedicalService",
              "name": "Post-Surgical Rehabilitation",
              "description": "Comprehensive rehabilitation services through specialized partners",
              "category": "Rehabilitation Services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "MedicalService",
              "name": "Physiotherapy Services",
              "description": "Physical therapy and recovery programs for neurosurgical patients",
              "category": "Rehabilitation Services"
            }
          }
        ]
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Yashoda Hospital, Malakpet",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "500036",
        "addressCountry": "IN"
      },
      "telephone": "+91-9778280044",
      "email": "hellodr@drsayuj.info",
      "url": "https://www.drsayuj.info",
      "openingHours": "24/7",
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 17.3850,
          "longitude": 78.4867
        },
        "geoRadius": "50000"
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.drsayuj.info/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Emergency & Rehabilitation",
          "item": "https://www.drsayuj.info/emergency-rehabilitation/"
        }
      ]
    },
    "about": [
      {
        "@type": "MedicalSpecialty",
        "name": "Emergency Neurosurgery"
      },
      {
        "@type": "MedicalSpecialty",
        "name": "Rehabilitation Medicine"
      },
      {
        "@type": "MedicalSpecialty",
        "name": "Physical Therapy"
      }
    ],
    "mentions": [
      {
        "@type": "Organization",
        "name": "Yashoda Rehabilitation Center",
        "description": "Primary rehabilitation partner with comprehensive post-surgical care"
      },
      {
        "@type": "Organization",
        "name": "Apollo Rehabilitation Services",
        "description": "Advanced neurorehabilitation and robotic-assisted therapy"
      },
      {
        "@type": "Organization",
        "name": "Continental Rehabilitation Center",
        "description": "Specialized spine rehabilitation and sports medicine"
      },
      {
        "@type": "Organization",
        "name": "PhysioCare Plus",
        "description": "Outpatient physiotherapy and home-based care"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
    />
  );
}
