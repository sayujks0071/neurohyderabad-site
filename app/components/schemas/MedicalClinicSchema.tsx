import { SITE_URL } from '../../../src/lib/seo';

export default function MedicalClinicSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${SITE_URL}/#medicalclinic`,
    "name": "Dr. Sayuj Krishnan | Spine Surgeon in Hyderabad",
    "description": "Premier neurosurgery and spine surgery clinic in Hyderabad offering minimally invasive procedures, endoscopic spine surgery, brain tumor surgery, and advanced neurosurgical care.",
    "url": SITE_URL,
    "image": `${SITE_URL}/images/og-default.jpg`,
    "telephone": "+919778280044",
    "email": "neurospinehyd@drsayuj.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Room No 317, OPD Block, Yashoda Hospital",
      "addressLocality": "Malakpet",
      "addressRegion": "Telangana",
      "postalCode": "500036",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.3850,
      "longitude": 78.4867
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
    "hasMap": "https://www.google.com/maps/place/Dr+Sayuj+Krishnan",
    "sameAs": [
      "https://www.yashodahospitals.com/doctor/dr-sayuj-krishnan/",
      "https://www.practo.com/hyderabad/doctor/dr-sayuj-krishnan-neurosurgeon",
      "https://www.justdial.com/Hyderabad/Dr-Sayuj-Krishnan-Neurosurgeon-Malakpet",
      "https://www.linkedin.com/in/dr-sayuj-krishnan",
      "https://g.co/kgs/9366939683880052414"
    ],
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
