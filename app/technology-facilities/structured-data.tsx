import { serializeJsonLd } from '@/src/lib/seo/serialize';
export default function TechnologyStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Advanced Technology & Facilities",
    "description": "State-of-the-art neurosurgery technology and equipment for the most advanced, minimally invasive, and precise surgical procedures in Hyderabad.",
    "url": "https://www.drsayuj.info/technology-facilities/",
    "mainEntity": {
      "@type": "MedicalBusiness",
      "name": "Dr. Sayuj Krishnan - Advanced Neurosurgery Technology",
      "description": "Cutting-edge neurosurgery technology including 3T MRI, neuronavigation, endoscopic systems, intraoperative monitoring, and AI-assisted surgical planning.",
      "medicalSpecialty": "Neurosurgery",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Advanced Medical Technology",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "MedicalDevice",
              "name": "3T MRI Scanner",
              "description": "High-resolution magnetic resonance imaging for detailed brain and spine visualization",
              "category": "Diagnostic Imaging"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "MedicalDevice",
              "name": "StealthStation S8 Neuronavigation",
              "description": "Advanced neuronavigation system for precise surgical guidance",
              "category": "Surgical Navigation"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "MedicalDevice",
              "name": "4K Endoscopic System",
              "description": "Ultra-high definition endoscopic visualization for minimally invasive surgery",
              "category": "Endoscopic Surgery"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "MedicalDevice",
              "name": "Intraoperative Neurophysiological Monitoring",
              "description": "Real-time monitoring during surgery for patient safety",
              "category": "Surgical Monitoring"
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
      "url": "https://www.drsayuj.info"
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
          "name": "Technology & Facilities",
          "item": "https://www.drsayuj.info/technology-facilities/"
        }
      ]
    },
    "about": [
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
        "name": "Minimally Invasive Surgery"
      }
    ],
    "mentions": [
      {
        "@type": "Organization",
        "name": "Yashoda Hospital",
        "description": "Primary hospital partner with comprehensive neurosurgery infrastructure"
      },
      {
        "@type": "Organization",
        "name": "Siemens Healthineers",
        "description": "Technology partner for imaging and surgical equipment"
      },
      {
        "@type": "Organization",
        "name": "Medtronic",
        "description": "Surgical equipment partner for neuronavigation systems"
      },
      {
        "@type": "Organization",
        "name": "Stryker",
        "description": "Endoscopic systems partner for minimally invasive surgery"
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
