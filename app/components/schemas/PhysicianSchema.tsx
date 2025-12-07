import { SITE_URL } from '../../../src/lib/seo';

export default function PhysicianSchema() {
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

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Physician",
        "@id": `${SITE_URL}/#physician`,
        "name": "Dr Sayuj Krishnan",
        "alternateName": "Dr Sayuj",
        "description": "Premier neurosurgeon with over 9 years of experience specializing in minimally invasive brain & spine surgery, awake brain surgery, and robotic neurosurgery. Fellowship-trained with German training in endoscopic spine surgery.",
        "url": SITE_URL,
        "image": `${SITE_URL}/images/og-default.jpg`,
        "telephone": "+919778280044",
        "email": "hellodr@drsayuj.info",
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
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": "Hyderabad, Telangana, India"
        },
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
        "sameAs": [
          "https://www.yashodahospitals.com/doctor/dr-sayuj-krishnan/",
          "https://www.practo.com/hyderabad/doctor/dr-sayuj-krishnan-neurosurgeon",
          "https://www.justdial.com/Hyderabad/Dr-Sayuj-Krishnan-Neurosurgeon-Malakpet",
          "https://www.linkedin.com/in/dr-sayuj-krishnan",
          "https://www.researchgate.net/profile/Dr-Sayuj-Krishnan",
          "https://g.co/kgs/9366939683880052414",
          "https://www.google.com/maps/place/Dr+Sayuj+Krishnan",
          "https://www.linkedin.com/posts/dr-sayuj-krishnan-s-275baa66_had-the-privilege-of-demonstrating-full-endoscopic-activity-7379487709532209152-ngkQ",
          "https://www.linkedin.com/posts/dr-sayuj-krishnan-s-275baa66_recent-talk-on-full-endoscopic-spine-surgery-activity-7028204194725597184-rcmt",
          "https://www.yashodahospitals.com/events/cervical-spine-boot-camp-cadaveric-workshop/",
          "https://www.researchgate.net/publication/389909423_Consciousness_Information_And_Emergent_Spacetime_Biological_Counter-Curvature_and_Cross-_Domain_Clues_for_a_Mind-_Geometry_Coupling"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        "name": "Dr Sayuj Krishnan - Neurosurgeon in Hyderabad",
        "description": "Expert neurosurgeon specializing in endoscopic spine surgery and brain surgery in Hyderabad",
        "url": SITE_URL,
        "telephone": "+919778280044",
        "email": "hellodr@drsayuj.info",
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
