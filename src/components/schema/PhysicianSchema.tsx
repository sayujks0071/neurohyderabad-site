import React from 'react';
import {
  CANONICAL_PHYSICIAN_NAME,
  CANONICAL_TELEPHONE,
  getLocationById,
  SOCIAL_PROFILES
} from '../../data/locations';
import { SITE_URL } from '../../lib/seo';
import { serializeJsonLd } from '@/src/lib/seo/serialize';

const MAIN_LOCATION_ID = 'malakpet';

export const PhysicianSchema: React.FC = () => {
  const mainLocation = getLocationById(MAIN_LOCATION_ID);

  if (!mainLocation) return null;

  const serviceOffers = [
    {
      name: "Spine Surgery",
      description:
        "Comprehensive spine care with minimally invasive, endoscopic, and fusion techniques tailored to each patient.",
      url: `${SITE_URL}/spine-surgery`,
    },
    {
      name: "Brain Surgery",
      description:
        "Advanced brain tumor, epilepsy, and functional neurosurgery with awake protocols and neuronavigation.",
      url: `${SITE_URL}/brain-surgery`,
    },
    {
      name: "Pediatric Neurosurgery",
      description:
        "Specialised neurosurgical care for children with brain and spine conditions delivered in a family-centred setting.",
      url: `${SITE_URL}/pediatric-neurosurgery`,
    },
    {
      name: "Minimally Invasive Spine Surgery",
      description:
        "Advanced endoscopic and keyhole spine procedures that reduce pain, blood loss, and hospital stay.",
      url: `${SITE_URL}/services/minimally-invasive-spine-surgery`,
    },
    {
      name: "Endoscopic Discectomy",
      description:
        "Targeted removal of herniated disc material through a 7 mm working channel for rapid recovery.",
      url: `${SITE_URL}/services/endoscopic-discectomy-hyderabad`,
    },
    {
      name: "Brain Tumor Surgery",
      description:
        "Microsurgical and endoscopic tumor removal using neuronavigation and intraoperative monitoring.",
      url: `${SITE_URL}/services/brain-tumor-surgery-hyderabad`,
    },
    {
      name: "Epilepsy Surgery",
      description:
        "Comprehensive evaluation and surgical treatment pathways for drug-resistant epilepsy.",
      url: `${SITE_URL}/services/epilepsy-surgery-hyderabad`,
    },
    {
      name: "Spinal Fusion Surgery",
      description:
        "Stabilisation procedures for instability and spondylolisthesis with minimally invasive techniques.",
      url: `${SITE_URL}/services/spinal-fusion-surgery-hyderabad`,
    },
    {
      name: "Peripheral Nerve Surgery",
      description:
        "Microsurgical decompression and repair for peripheral nerve entrapments and injuries.",
      url: `${SITE_URL}/services/peripheral-nerve-surgery-hyderabad`,
    },
  ];

  const physicianSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Physician",
        "@id": `${SITE_URL}/#physician`,
        "name": CANONICAL_PHYSICIAN_NAME,
        "alternateName": ["Dr Sayuj Krishnan", "Dr Sayuj"],
        "givenName": "Sayuj",
        "familyName": "Krishnan",
        "additionalName": "S",
        "honorificPrefix": "Dr",
        "description": "Premier neurosurgeon with over 9 years of experience specializing in minimally invasive brain & spine surgery, awake brain surgery, and robotic neurosurgery. Fellowship-trained with German training in endoscopic spine surgery. Performed 1,000+ endoscopic procedures with same-day discharge capability.",
        "disambiguatingDescription": "Hyderabad (India)-based neurosurgeon and spine surgeon at Yashoda Hospital, Malakpet. Not associated with US-based internal medicine physician Dr. Sayuj Paudel.",
        "url": SITE_URL,
        "image": `${SITE_URL}/images/dr-sayuj-krishnan-portrait-optimized.jpg`,
        "telephone": CANONICAL_TELEPHONE,
        "priceRange": "₹₹",
        "email": "hellodr@drsayuj.info",
        "identifier": [
          {
            "@type": "PropertyValue",
            "propertyID": "TCMC Registration",
            "value": "47973"
          }
        ],
        "medicalLicense": "TCMC Registration 47973 (Travancore-Cochin Medical Council)",
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Years of Experience",
            "value": "9+"
          },
          {
            "@type": "PropertyValue",
            "name": "Fellowship Training",
            "value": "Minimally Invasive & Complex Spine Surgery"
          },
          {
            "@type": "PropertyValue",
            "name": "International Training",
            "value": "German Observership in Full Endoscopic Spine Surgery (2024)"
          },
          {
            "@type": "PropertyValue",
            "name": "Specialization",
            "value": "Minimally Invasive Spine Surgery, Awake Brain Surgery, ROSA DBS, Endoscopic Spine Surgery"
          }
        ],
        "medicalSpecialty": [
          "Neurosurgery",
          "Spine Surgery",
          "Brain Surgery",
          "Pediatric Neurosurgery"
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": mainLocation.address.streetAddress,
          "addressLocality": mainLocation.address.addressLocality,
          "addressRegion": mainLocation.address.addressRegion,
          "postalCode": mainLocation.address.postalCode,
          "addressCountry": mainLocation.address.addressCountry
        },
        "geo": mainLocation.geo ? {
          "@type": "GeoCoordinates",
          "latitude": mainLocation.geo.latitude,
          "longitude": mainLocation.geo.longitude
        } : undefined,
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
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "degree",
            "educationalLevel": "MBBS",
            "recognizedBy": {
              "@type": "Organization",
              "name": "Medical Council of India"
            }
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "degree",
            "educationalLevel": "DNB Neurosurgery",
            "recognizedBy": {
              "@type": "Organization",
              "name": "National Board of Examinations"
            }
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "educationalLevel": "Fellowship in Minimally Invasive & Complex Spine Surgery",
            "recognizedBy": {
              "@type": "Organization",
              "name": "Yashoda Hospital, Malakpet"
            }
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "educationalLevel": "Fellowship in Minimally Invasive Spine Surgery"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "educationalLevel": "Advanced Endoscopic Spine Surgery Training"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "educationalLevel": "Observership in Full Endoscopic Spine Surgery (Germany, 2024)",
            "recognizedBy": {
              "@type": "Organization",
              "name": "RIWOspine Academy"
            }
          }
        ],
        "alumniOf": [
          {
            "@type": "CollegeOrUniversity",
            "name": "Kerala University of Health Sciences",
            "sameAs": "https://www.kuhs.ac.in"
          },
          {
            "@type": "CollegeOrUniversity",
            "name": "Amrita Institute of Medical Sciences",
            "sameAs": "https://www.amrita.edu/school/medicine"
          }
        ],
        "memberOf": [
          {
            "@type": "Organization",
            "name": "Neurological Society of India",
            "sameAs": "https://www.neurosocietyindia.org"
          },
          {
            "@type": "Organization",
            "name": "Association of Spine Surgeons of India",
            "sameAs": "https://www.assi.in"
          },
          {
            "@type": "Organization",
            "name": "Neuro Spinal Surgeons Association of India (NSSA)",
            "sameAs": "https://www.nssa.org.in"
          }
        ],
        "hospitalAffiliation": {
          "@type": "Hospital",
          "@id": `${SITE_URL}/#hospital`,
          "name": "Yashoda Hospital, Malakpet",
          "url": "https://www.yashodahospitals.com/malakpet/",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Nalgonda X Roads, Malakpet",
            "addressLocality": "Hyderabad",
            "addressRegion": "Telangana",
            "postalCode": "500036",
            "addressCountry": "IN"
          }
        },
        "knowsAbout": [
          "Full Endoscopic Spine Surgery",
          "Minimally Invasive Spine Surgery (MISS)",
          "Endoscopic Discectomy",
          "Endoscopic Foraminotomy",
          "Endoscopic ULBD (Unilateral Laminotomy Bilateral Decompression)",
          "Awake Brain Surgery with Intraoperative Mapping",
          "Brain Tumor Surgery with Neuronavigation",
          "Epilepsy Surgery",
          "ROSA Robotic Deep Brain Stimulation (DBS)",
          "Spinal Fusion Surgery",
          "Peripheral Nerve Surgery",
          "Microvascular Decompression (MVD) for Trigeminal Neuralgia",
          "Gamma Knife Radiosurgery",
          "Pediatric Neurosurgery",
          "Emergency Neurotrauma Care"
        ],
        "areaServed": [
          {
            "@type": "City",
            "name": "Hyderabad",
            "containedInPlace": {
              "@type": "State",
              "name": "Telangana",
              "containedInPlace": {
                "@type": "Country",
                "name": "India"
              }
            }
          },
          { "@type": "Place", "name": "Malakpet, Hyderabad" },
          { "@type": "Place", "name": "Dilsukhnagar, Hyderabad" },
          { "@type": "Place", "name": "LB Nagar, Hyderabad" },
          { "@type": "Place", "name": "Kothapet, Hyderabad" },
          { "@type": "Place", "name": "Jubilee Hills, Hyderabad" },
          { "@type": "Place", "name": "Banjara Hills, Hyderabad" },
          { "@type": "Place", "name": "Hitech City, Hyderabad" },
          { "@type": "Place", "name": "Gachibowli, Hyderabad" },
          { "@type": "Place", "name": "Kondapur, Hyderabad" },
          { "@type": "Place", "name": "Madhapur, Hyderabad" },
          { "@type": "Place", "name": "Secunderabad" },
          { "@type": "Place", "name": "Kukatpally, Hyderabad" },
          { "@type": "Place", "name": "Miyapur, Hyderabad" },
          { "@type": "Place", "name": "Uppal, Hyderabad" },
          { "@type": "Place", "name": "Manikonda, Hyderabad" }
        ],
        "availableService": [
          ...serviceOffers.map((service) => ({
            "@type": "MedicalService",
            "name": service.name,
            "description": service.description,
            "url": service.url
          }))
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Neurosurgery & Spine Services",
          "itemListElement": serviceOffers.map((service) => ({
            "@type": "Offer",
            "itemOffered": {
              "@type": "MedicalProcedure",
              "name": service.name,
              "description": service.description,
              "url": service.url
            },
            "availability": "https://schema.org/InStock",
            "potentialAction": {
              "@type": "ReserveAction",
              "target": `${SITE_URL}/appointments`
            }
          }))
        },
        "potentialAction": {
          "@type": "ReserveAction",
          "name": "Book Appointment",
          "target": `${SITE_URL}/appointments`
        },
        "worksFor": {
          "@id": `${SITE_URL}/#hospital`
        },
        "knowsLanguage": ["English", "Hindi", "Telugu", "Malayalam", "Tamil"],
        "sameAs": SOCIAL_PROFILES,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "150",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      // LocalBusiness schema is handled per-location page by LocationSchema,
      // but if we want a global fallback/corporate identity, we can keep it here.
      // However, to avoid "Duplicate Conflicting Entities", we should rely on the Physician schema globally
      // and the specific MedicalClinic schema on location pages.
      // The previous file had both.
      // Decision: Exclude duplicate LocalBusiness here if it's identical to what LocationSchema produces.
      // But for the Homepage, we might need it.
      // Let's rely on Physician schema as the primary entity for the site-wide layout.
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(physicianSchema) }}
    />
  );
};
