import { SITE_URL } from "../../src/lib/seo";

export function BestNeurosurgeonStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Physician",
        "@id": `${SITE_URL}/#physician`,
        "name": "Dr Sayuj Krishnan",
        "alternateName": "Dr Sayuj",
        "description": "Best neurosurgeon in Hyderabad specializing in endoscopic spine surgery, brain tumor surgery, and minimally invasive procedures",
        "url": `${SITE_URL}`,
        "image": `${SITE_URL}/images/og-default.jpg`,
        "telephone": "+919778280044",
        "email": "neurospinehyd@drsayuj.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Room No 317, OPD Block",
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
            "name": "Trigeminal Neuralgia Treatment",
            "description": "Microvascular decompression and other treatments for trigeminal neuralgia",
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
        "@id": `${SITE_URL}/best-neurosurgeon-in-hyderabad/#localbusiness`,
        "name": "Dr Sayuj Krishnan - Best Neurosurgeon in Hyderabad",
        "description": "Leading neurosurgeon in Hyderabad specializing in endoscopic spine surgery and brain surgery",
        "url": `${SITE_URL}/best-neurosurgeon-in-hyderabad`,
        "telephone": "+919778280044",
        "email": "neurospinehyd@drsayuj.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Room No 317, OPD Block",
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
        "openingHours": "Mo-Fr 09:00-17:00",
        "priceRange": "$$",
        "currenciesAccepted": "INR",
        "paymentAccepted": "Cash, Credit Card, Insurance",
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
        ]
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/best-neurosurgeon-in-hyderabad/#webpage`,
        "url": `${SITE_URL}/best-neurosurgeon-in-hyderabad`,
        "name": "Best Neurosurgeon in Hyderabad | Dr Sayuj Krishnan",
        "description": "Dr Sayuj Krishnan is the best neurosurgeon in Hyderabad with over 9 years experience in endoscopic spine surgery, brain tumor surgery, and minimally invasive procedures.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          "url": `${SITE_URL}`,
          "name": "Dr Sayuj Krishnan - Neurosurgeon in Hyderabad",
          "description": "Expert neurosurgeon specializing in endoscopic spine surgery and brain surgery in Hyderabad"
        },
        "about": {
          "@id": `${SITE_URL}/#physician`
        },
        "mainEntity": {
          "@id": `${SITE_URL}/#physician`
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
              "name": "Best Neurosurgeon in Hyderabad",
              "item": `${SITE_URL}/best-neurosurgeon-in-hyderabad`
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Who is the best neurosurgeon in Hyderabad?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Dr Sayuj Krishnan is considered one of the best neurosurgeons in Hyderabad with over 9 years of experience, advanced training in Germany, and specialization in endoscopic spine surgery and brain tumor surgery."
            }
          },
          {
            "@type": "Question",
            "name": "What makes Dr Sayuj Krishnan the best neurosurgeon in Hyderabad?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Dr Sayuj Krishnan has exceptional training including DNB Neurosurgery, fellowship in minimally invasive spine surgery, and observer-ship in Germany. He uses advanced endoscopic techniques for faster recovery and better outcomes."
            }
          },
          {
            "@type": "Question",
            "name": "What procedures does Dr Sayuj perform?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Dr Sayuj specializes in endoscopic spine surgery (discectomy, foraminotomy, ULBD), brain tumor surgery with neuronavigation, trigeminal neuralgia treatment, and epilepsy surgery."
            }
          },
          {
            "@type": "Question",
            "name": "Where is Dr Sayuj's clinic located in Hyderabad?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Dr Sayuj practices at Yashoda Hospital, Malakpet, Hyderabad. The clinic is easily accessible from all parts of Hyderabad including Hi-Tech City, Banjara Hills, and Secunderabad."
            }
          }
        ]
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
