import { SITE_URL } from '../../../src/lib/seo';

export default function PhysicianSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Physician",
        "@id": `${SITE_URL}/#physician`,
        "name": "Dr Sayuj Krishnan",
        "alternateName": "Dr Sayuj",
        "description": "Expert neurosurgeon in Hyderabad specializing in endoscopic spine surgery, brain tumor surgery, and minimally invasive procedures",
        "url": SITE_URL,
        "image": `${SITE_URL}/images/dr-sayuj-krishnan.jpg`,
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
            "educationalLevel": "Fellowship in Minimally Invasive Spine Surgery"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "educationalLevel": "Advanced Endoscopic Spine Surgery Training"
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
            "url": `${SITE_URL}/services/minimally-invasive-spine-surgery`
          },
          {
            "@type": "MedicalService",
            "name": "Brain Tumor Surgery",
            "description": "Advanced brain tumor surgery with neuronavigation",
            "url": `${SITE_URL}/services/brain-tumor-surgery-hyderabad`
          },
          {
            "@type": "MedicalService",
            "name": "Epilepsy Surgery",
            "description": "Surgical treatment for drug-resistant epilepsy",
            "url": `${SITE_URL}/services/epilepsy-surgery`
          },
          {
            "@type": "MedicalService",
            "name": "Trigeminal Neuralgia Treatment",
            "description": "Advanced treatment for trigeminal neuralgia including microvascular decompression",
            "url": `${SITE_URL}/conditions/trigeminal-neuralgia-treatment`
          }
        ],
        "sameAs": [
          "https://g.co/kgs/9366939683880052414",
          "https://www.google.com/maps/place/Dr+Sayuj+Krishnan",
          "https://www.yashodahospitals.com/doctor/dr-sayuj-krishnan/",
          "https://www.linkedin.com/in/dr-sayuj-krishnan",
          "https://www.researchgate.net/profile/Dr-Sayuj-Krishnan"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        "name": "Dr Sayuj Krishnan - Neurosurgeon in Hyderabad",
        "description": "Expert neurosurgeon specializing in endoscopic spine surgery and brain surgery in Hyderabad",
        "url": SITE_URL,
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
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
