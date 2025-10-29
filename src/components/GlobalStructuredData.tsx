import { SITE_URL } from "../lib/seo";
import {
  CLINIC_AGGREGATE_RATING,
  CLINIC_INFO,
  CLINIC_OPENING_HOURS,
  getMedicalClinicSchema,
} from "../lib/clinic";

export function GlobalStructuredData() {
  const {
    name: clinicName,
    telephone,
    email,
    streetAddress,
    addressLocality,
    addressRegion,
    postalCode,
    addressCountry,
    latitude,
    longitude,
    url,
  } = CLINIC_INFO;

  const openingHours = CLINIC_OPENING_HOURS.map(({ dayOfWeek, opens, closes }) => {
    const dayCode = dayOfWeek
      .map((day) => day.slice(0, 2))
      .join(",");
    return `${dayCode} ${opens}-${closes}`;
  });

  const medicalClinicSchema = getMedicalClinicSchema({ includeContext: false });

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Physician",
        "@id": `${SITE_URL}/#physician`,
        "name": "Dr Sayuj Krishnan",
        "alternateName": "Dr Sayuj",
        "description": "Expert neurosurgeon in Hyderabad specializing in endoscopic spine surgery, brain tumor surgery, and minimally invasive procedures",
        "url": `${url}`,
        "image": `${SITE_URL}/images/og-default.jpg`,
        "telephone": telephone.replace(/-/g, ""),
        "email": email,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": streetAddress,
          "addressLocality": addressLocality,
          "addressRegion": addressRegion,
          "postalCode": postalCode,
          "addressCountry": addressCountry
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": latitude,
          "longitude": longitude
        },
        "medicalSpecialty": [
          "Neurosurgery",
          "Spine Surgery",
          "Brain Surgery",
          "Endoscopic Surgery",
          "Minimally Invasive Surgery"
        ],
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "degree",
            "educationalLevel": "MBBS"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "degree",
            "educationalLevel": "DNB Neurosurgery"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "educationalLevel": "Fellowship in Minimally Invasive Spine Surgery"
          }
        ],
        "alumniOf": [
          {
            "@type": "EducationalOrganization",
            "name": "Medical College"
          }
        ],
        "memberOf": [
          {
            "@type": "Organization",
            "name": "Neurological Society of India"
          },
          {
            "@type": "Organization",
            "name": "Association of Spine Surgeons of India"
          }
        ],
        "worksFor": {
          "@type": "Hospital",
          "name": "Yashoda Hospital",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Malakpet",
            "addressLocality": "Hyderabad",
            "addressRegion": "Telangana",
            "addressCountry": "IN"
          }
        },
        "availableService": [
          {
            "@type": "MedicalService",
            "name": "Endoscopic Spine Surgery",
            "description": "Minimally invasive spine surgery using endoscopic techniques",
            "provider": {
              "@type": "Physician",
              "name": "Dr Sayuj Krishnan"
            }
          },
          {
            "@type": "MedicalService",
            "name": "Brain Tumor Surgery",
            "description": "Advanced brain tumor surgery with neuronavigation",
            "provider": {
              "@type": "Physician",
              "name": "Dr Sayuj Krishnan"
            }
          },
          {
            "@type": "MedicalService",
            "name": "Epilepsy Surgery",
            "description": "Surgical treatment for drug-resistant epilepsy",
            "provider": {
              "@type": "Physician",
              "name": "Dr Sayuj Krishnan"
            }
          },
          {
            "@type": "MedicalService",
            "name": "Trigeminal Neuralgia Treatment",
            "description": "Advanced treatment for trigeminal neuralgia including microvascular decompression",
            "provider": {
              "@type": "Physician",
              "name": "Dr Sayuj Krishnan"
            }
          }
        ],
        "sameAs": [
          "https://www.linkedin.com/in/dr-sayuj-krishnan",
          "https://www.researchgate.net/profile/Dr-Sayuj-Krishnan"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        "name": clinicName,
        "description": "Expert neurosurgeon specializing in endoscopic spine surgery and brain surgery in Hyderabad",
        "url": `${url}`,
        "telephone": telephone.replace(/-/g, ""),
        "email": email,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": streetAddress,
          "addressLocality": addressLocality,
          "addressRegion": addressRegion,
          "postalCode": postalCode,
          "addressCountry": addressCountry
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": latitude,
          "longitude": longitude
        },
        "openingHours": openingHours,
        "priceRange": "$$",
        "currenciesAccepted": "INR",
        "paymentAccepted": "Cash, Credit Card, Insurance, UPI",
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
            "@type": "City",
            "name": "Secunderabad",
            "containedInPlace": {
              "@type": "State",
              "name": "Telangana"
            }
          },
          {
            "@type": "Place",
            "name": "Banjara Hills",
            "containedInPlace": {
              "@type": "City",
              "name": "Hyderabad"
            }
          },
          {
            "@type": "Place",
            "name": "Hi-Tech City",
            "containedInPlace": {
              "@type": "City",
              "name": "Hyderabad"
            }
          },
          {
            "@type": "Place",
            "name": "LB Nagar",
            "containedInPlace": {
              "@type": "City",
              "name": "Hyderabad"
            }
          }
        ],
        ...(CLINIC_AGGREGATE_RATING ? { aggregateRating: CLINIC_AGGREGATE_RATING } : {}),
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Neurosurgical Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalService",
                "name": "Endoscopic Spine Surgery",
                "description": "Minimally invasive spine surgery using endoscopic techniques"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalService",
                "name": "Brain Tumor Surgery",
                "description": "Advanced brain tumor surgery with neuronavigation"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalService",
                "name": "Epilepsy Surgery",
                "description": "Surgical treatment for drug-resistant epilepsy"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalService",
                "name": "Trigeminal Neuralgia Treatment",
                "description": "Advanced treatment for trigeminal neuralgia"
              }
            }
          ]
        }
      },
      medicalClinicSchema,
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "url": `${SITE_URL}`,
        "name": "Dr Sayuj Krishnan - Neurosurgeon in Hyderabad",
        "description": "Expert neurosurgeon specializing in endoscopic spine surgery and brain surgery in Hyderabad",
        "publisher": {
          "@id": `${SITE_URL}/#physician`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${SITE_URL}/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        "name": "Dr Sayuj Krishnan - Neurosurgeon",
        "url": `${SITE_URL}`,
        "logo": `${SITE_URL}/images/logo.png`,
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+919778280044",
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": "English"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Room No 317, OPD Block",
          "addressLocality": "Malakpet",
          "addressRegion": "Telangana",
          "postalCode": "500036",
          "addressCountry": "IN"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
