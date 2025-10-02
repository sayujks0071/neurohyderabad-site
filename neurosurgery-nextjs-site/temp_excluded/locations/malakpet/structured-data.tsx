import { SITE_URL } from "../../../../src/lib/seo";

export function MalakpetLocationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/locations/malakpet/#localbusiness`,
        "name": "Dr Sayuj Krishnan - Neurosurgeon in Malakpet, Hyderabad",
        "description": "Expert neurosurgeon specializing in endoscopic spine surgery and brain surgery at Yashoda Hospital, Malakpet",
        "url": `${SITE_URL}/locations/malakpet`,
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
        "openingHours": [
          "Mo-Fr 09:00-17:00",
          "Sa 09:00-13:00"
        ],
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
          }
        ],
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
            }
          ]
        }
      },
      {
        "@type": "Physician",
        "@id": `${SITE_URL}/locations/malakpet/#physician`,
        "name": "Dr Sayuj Krishnan",
        "description": "Expert neurosurgeon at Yashoda Hospital, Malakpet specializing in endoscopic spine surgery and brain surgery",
        "url": `${SITE_URL}/locations/malakpet`,
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
        "medicalSpecialty": [
          "Neurosurgery",
          "Spine Surgery",
          "Brain Surgery",
          "Endoscopic Surgery"
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
        }
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/locations/malakpet/#webpage`,
        "url": `${SITE_URL}/locations/malakpet`,
        "name": "Neurosurgeon in Malakpet, Hyderabad | Dr Sayuj Krishnan",
        "description": "Expert neurosurgeon Dr Sayuj Krishnan at Yashoda Hospital, Malakpet. Specializing in endoscopic spine surgery and brain surgery.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          "url": `${SITE_URL}`,
          "name": "Dr Sayuj Krishnan - Neurosurgeon in Hyderabad",
          "description": "Expert neurosurgeon specializing in endoscopic spine surgery and brain surgery in Hyderabad"
        },
        "about": {
          "@id": `${SITE_URL}/locations/malakpet/#physician`
        },
        "mainEntity": {
          "@id": `${SITE_URL}/locations/malakpet/#localbusiness`
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": `${SITE_URL}`
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Locations",
              "item": `${SITE_URL}/locations`
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Malakpet",
              "item": `${SITE_URL}/locations/malakpet`
            }
          ]
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
