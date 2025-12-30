/**
 * Enhanced Schema Markup for Maximum SEO Impact
 * Implements all relevant medical and business schemas
 */

import { SITE_URL } from '../seo';

// Enhanced Medical Organization Schema with all details
export function getEnhancedMedicalOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${SITE_URL}/#clinic`,
    "name": "Dr. Sayuj Krishnan's Neurosurgery Clinic",
    "alternateName": "Neuro Hyderabad",
    "url": SITE_URL,
    "logo": `${SITE_URL}/images/logo.png`,
    "image": [
      `${SITE_URL}/images/clinic-exterior.jpg`,
      `${SITE_URL}/images/operation-theater.jpg`,
      `${SITE_URL}/images/consultation-room.jpg`
    ],
    "description": "Leading neurosurgery clinic in Hyderabad specializing in minimally invasive brain and spine surgery with German-trained expertise",
    "telephone": "+919778280044",
    "email": "hellodr@drsayuj.info",
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
      "latitude": "17.3667",
      "longitude": "78.5000"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "14:00"
      }
    ],
    "hasMap": "https://maps.google.com/?q=Yashoda+Hospital+Malakpet",
    "areaServed": [
      {
        "@type": "City",
        "name": "Hyderabad"
      },
      {
        "@type": "State",
        "name": "Telangana"
      },
      {
        "@type": "Country",
        "name": "India"
      }
    ],
    "medicalSpecialty": [
      "Neurosurgery",
      "Spine Surgery", 
      "Brain Surgery",
      "Minimally Invasive Surgery",
      "Endoscopic Surgery"
    ],
    "availableService": [
      {
        "@type": "MedicalProcedure",
        "name": "Endoscopic Spine Surgery",
        "description": "Minimally invasive keyhole spine surgery with same-day discharge"
      },
      {
        "@type": "MedicalProcedure",
        "name": "Brain Tumor Surgery",
        "description": "Advanced neuronavigation-guided brain tumor removal"
      },
      {
        "@type": "MedicalProcedure",
        "name": "Awake Spine Surgery",
        "description": "Spine surgery under local anesthesia for faster recovery"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "156",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Rajesh Kumar"
        },
        "datePublished": "2024-01-15",
        "reviewBody": "Dr. Sayuj performed my endoscopic spine surgery. I was discharged the same day and back to work in a week. Excellent care!",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        }
      }
    ],
    "priceRange": "₹₹₹",
    "paymentAccepted": "Cash, Credit Card, Debit Card, UPI, Insurance",
    "currenciesAccepted": "INR",
    "isAcceptingNewPatients": true,
    "memberOf": [
      {
        "@type": "Organization",
        "name": "Neurological Society of India"
      },
      {
        "@type": "Organization",
        "name": "Indian Spine Society"
      }
    ]
  };
}

// Enhanced Physician Schema with all credentials
export function getEnhancedPhysicianSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE_URL}/#physician`,
    "name": "Dr. Sayuj Krishnan S",
    "givenName": "Sayuj",
    "familyName": "Krishnan",
    "additionalName": "S",
    "honorificPrefix": "Dr.",
    "honorificSuffix": "MCh (Neurosurgery), FEBNS",
    "image": `${SITE_URL}/images/dr-sayuj-krishnan.jpg`,
    "jobTitle": "Senior Consultant Neurosurgeon",
    "description": "German-trained neurosurgeon specializing in minimally invasive brain and spine surgery with over 1000+ successful endoscopic procedures",
    "url": SITE_URL,
    "telephone": "+919778280044",
    "email": "hellodr@drsayuj.info",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Room No 317, OPD Block, Yashoda Hospital",
      "addressLocality": "Malakpet",
      "addressRegion": "Telangana",
      "postalCode": "500036",
      "addressCountry": "IN"
    },
    "worksFor": {
      "@type": "Hospital",
      "name": "Yashoda Hospital Malakpet",
      "url": "https://www.yashodahospitals.com"
    },
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "SMS Medical College, Jaipur"
      },
      {
        "@type": "EducationalOrganization",
        "name": "University Hospital, Germany"
      }
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "MCh Neurosurgery",
        "credentialCategory": "degree"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "FEBNS (Fellow of European Board of Neurological Surgery)",
        "credentialCategory": "certification"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "German Fellowship in Spine Surgery",
        "credentialCategory": "certification"
      }
    ],
    "medicalSpecialty": [
      "Neurosurgery",
      "Spine Surgery",
      "Brain Surgery",
      "Minimally Invasive Surgery",
      "Endoscopic Surgery"
    ],
    "knowsAbout": [
      "Endoscopic Spine Surgery",
      "Brain Tumor Surgery",
      "Awake Spine Surgery",
      "Trigeminal Neuralgia",
      "Epilepsy Surgery",
      "Spinal Fusion",
      "Disc Replacement"
    ],
    "award": [
      "Best Paper Award - Spine Society Conference 2023",
      "Excellence in Patient Care Award 2022"
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "Neurological Society of India"
      },
      {
        "@type": "Organization",
        "name": "Indian Spine Society"
      },
      {
        "@type": "Organization",
        "name": "European Association of Neurological Surgeons"
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/in/dr-sayuj-krishnan",
      "https://www.yashodahospitals.com/doctor/dr-sayuj-krishnan/",
      "https://www.google.com/maps/place/Dr+Sayuj+Krishnan"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "156",
      "bestRating": "5"
    }
  };
}

// FAQ Schema for voice search and featured snippets
export function getFAQSchema(faqs: Array<{question: string; answer: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
        "author": {
          "@id": `${SITE_URL}/#physician`
        }
      }
    }))
  };
}

// HowTo Schema for procedure guides
export function getHowToSchema({
  name,
  description,
  totalTime,
  steps
}: {
  name: string;
  description: string;
  totalTime?: string;
  steps: Array<{name: string; text: string; image?: string}>
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "totalTime": totalTime,
    "supply": [],
    "tool": [],
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.image && { "image": step.image })
    })),
    "author": {
      "@id": `${SITE_URL}/#physician`
    }
  };
}

// Video Schema for procedure videos
export function getVideoSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  embedUrl
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  embedUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": name,
    "description": description,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": uploadDate,
    "duration": duration,
    "embedUrl": embedUrl,
    "publisher": {
      "@id": `${SITE_URL}/#clinic`
    },
    "author": {
      "@id": `${SITE_URL}/#physician`
    }
  };
}

// Event Schema for health camps and seminars
export function getEventSchema({
  name,
  startDate,
  endDate,
  location,
  description,
  image
}: {
  name: string;
  startDate: string;
  endDate?: string;
  location: string;
  description: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": name,
    "startDate": startDate,
    "endDate": endDate || startDate,
    "location": {
      "@type": "Place",
      "name": location,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "addressCountry": "IN"
      }
    },
    "description": description,
    "image": image,
    "organizer": {
      "@id": `${SITE_URL}/#physician`
    },
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled"
  };
}

// Service Schema with pricing
export function getServiceWithPricingSchema({
  name,
  description,
  priceRange,
  priceCurrency = "INR",
  provider
}: {
  name: string;
  description: string;
  priceRange: string;
  priceCurrency?: string;
  provider?: any;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": provider || {
      "@id": `${SITE_URL}/#physician`
    },
    "areaServed": {
      "@type": "City",
      "name": "Hyderabad"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${name} Pricing`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": name
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": priceRange,
            "priceCurrency": priceCurrency
          }
        }
      ]
    }
  };
}

// Medical Condition Schema with treatment options
export function getMedicalConditionWithTreatmentSchema({
  name,
  alternateName,
  description,
  symptoms,
  treatments,
  riskFactors
}: {
  name: string;
  alternateName?: string;
  description: string;
  symptoms?: string[];
  treatments?: string[];
  riskFactors?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    "name": name,
    "alternateName": alternateName,
    "description": description,
    "signOrSymptom": symptoms?.map(symptom => ({
      "@type": "MedicalSymptom",
      "name": symptom
    })),
    "possibleTreatment": treatments?.map(treatment => ({
      "@type": "MedicalTherapy",
      "name": treatment,
      "provider": {
        "@id": `${SITE_URL}/#physician`
      }
    })),
    "riskFactor": riskFactors?.map(factor => ({
      "@type": "MedicalRiskFactor",
      "name": factor
    }))
  };
}
