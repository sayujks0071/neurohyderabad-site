import { SITE_URL } from '../../../src/lib/seo';
import {
  CANONICAL_PHYSICIAN_NAME,
  CANONICAL_TELEPHONE,
  YASHODA_MALAKPET_ADDRESS,
  YASHODA_GEO,
  CANONICAL_MAPS_URL,
  SOCIAL_PROFILES
} from '@/src/data/locations';

export default function MedicalClinicSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${SITE_URL}/#medicalclinic`,
    "name": CANONICAL_PHYSICIAN_NAME,
    "description": "Premier neurosurgery and spine surgery clinic in Hyderabad offering minimally invasive procedures, endoscopic spine surgery, brain tumor surgery, and advanced neurosurgical care.",
    "url": SITE_URL,
    "image": `${SITE_URL}/images/og-default.jpg`,
    "telephone": CANONICAL_TELEPHONE,
    "email": "hellodr@drsayuj.info",
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
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "09:00",
        "closes": "13:00"
      }
    ],
    "priceRange": "$$",
    "currenciesAccepted": "INR",
    "paymentAccepted": ["Cash", "Credit Card", "Insurance", "UPI"],
    "medicalSpecialty": [
      {
        "@type": "MedicalSpecialty",
        "name": "Neurosurgery"
      },
      {
        "@type": "MedicalSpecialty",
        "name": "Spine Surgery"
      },
      {
        "@type": "MedicalSpecialty",
        "name": "Endoscopic Spine Surgery"
      },
      {
        "@type": "MedicalSpecialty",
        "name": "Brain Surgery"
      }
    ],
    "availableService": [
      {
        "@type": "MedicalProcedure",
        "name": "Endoscopic Discectomy",
        "description": "Minimally invasive spine surgery for herniated disc treatment with same-day discharge"
      },
      {
        "@type": "MedicalProcedure",
        "name": "Spinal Fusion Surgery",
        "description": "Advanced spinal stabilization procedures for instability and spondylolisthesis"
      },
      {
        "@type": "MedicalProcedure",
        "name": "Brain Tumor Surgery",
        "description": "Microsurgical brain tumor removal with neuronavigation and intraoperative monitoring"
      },
      {
        "@type": "MedicalProcedure",
        "name": "Awake Brain Surgery",
        "description": "Awake craniotomy for tumors near critical brain areas with real-time monitoring"
      },
      {
        "@type": "MedicalProcedure",
        "name": "Epilepsy Surgery",
        "description": "Surgical treatment for drug-resistant epilepsy including resection and laser ablation"
      },
      {
        "@type": "MedicalProcedure",
        "name": "Deep Brain Stimulation (ROSA DBS)",
        "description": "Robotic-assisted deep brain stimulation for movement disorders"
      }
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Hyderabad",
        "containedInPlace": {
          "@type": "State",
          "name": "Telangana"
        }
      },
      {
        "@type": "Place",
        "name": "Dilsukhnagar"
      },
      {
        "@type": "Place",
        "name": "LB Nagar"
      },
      {
        "@type": "Place",
        "name": "Charminar"
      },
      {
        "@type": "Place",
        "name": "Banjara Hills"
      },
      {
        "@type": "Place",
        "name": "Jubilee Hills"
      },
      {
        "@type": "Place",
        "name": "Hi-Tech City"
      },
      {
        "@type": "Place",
        "name": "Gachibowli"
      },
      {
        "@type": "Place",
        "name": "Secunderabad"
      }
    ],
    "hasMap": CANONICAL_MAPS_URL,
    "sameAs": SOCIAL_PROFILES,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "potentialAction": {
      "@type": "ReserveAction",
      "name": "Book Appointment",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/appointments`,
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
