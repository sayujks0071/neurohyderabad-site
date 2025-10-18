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
        "description": "Consultant Neurosurgeon and Spine Surgeon specializing in minimally invasive brain surgery and full endoscopic spine surgery with 9 years of experience. Fellowship-trained in Minimally Invasive & Complex Spine Surgery with advanced training in Germany.",
        "url": SITE_URL,
        "image": `${SITE_URL}/images/dr-sayuj-krishnan.jpg`,
        "telephone": "+919778280044",
        "email": "neurospinehyd@drsayuj.com",
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Years of Experience",
            "value": "9"
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
            "value": "Endoscopic Spine Surgery, Brain Tumor Surgery, Epilepsy Surgery"
          }
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
            "description": "Full endoscopic spine surgery across cervical, thoracic, and lumbar pathologies including transforaminal and interlaminar approaches.",
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
          },
          {
            "@type": "MedicalService",
            "name": "Robotic Endoport Evacuation",
            "description": "Robotic endoport assisted evacuation for spontaneous intracerebral haemorrhage and complex brain lesions.",
            "url": `${SITE_URL}/services/brain-tumor-surgery-hyderabad`
          }
        ],
        "sameAs": [
          "https://g.co/kgs/9366939683880052414",
          "https://www.google.com/maps/place/Dr+Sayuj+Krishnan",
          "https://www.yashodahospitals.com/doctor/dr-sayuj-krishnan/",
          "https://www.linkedin.com/in/dr-sayuj-krishnan",
          "https://www.researchgate.net/profile/Dr-Sayuj-Krishnan",
          "https://www.linkedin.com/posts/dr-sayuj-krishnan-s-275baa66_had-the-privilege-of-demonstrating-full-endoscopic-activity-7379487709532209152-ngkQ",
          "https://www.linkedin.com/posts/dr-sayuj-krishnan-s-275baa66_recent-talk-on-full-endoscopic-spine-surgery-activity-7028204194725597184-rcmt",
          "https://www.yashodahospitals.com/events/cervical-spine-boot-camp-cadaveric-workshop/",
          "https://www.researchgate.net/publication/389909423_Consciousness_Information_And_Emergent_Spacetime_Biological_Counter-Curvature_and_Cross-_Domain_Clues_for_a_Mind-_Geometry_Coupling",
          "https://www.practo.com/hyderabad/doctor/dr-sayuj-krishnan-neurosurgeon",
          "https://www.1mg.com/doctors/dr-sayuj-krishnan-123456",
          "https://www.apollohospitals.com/doctors/dr-sayuj-krishnan",
          "https://www.medifee.com/doctors/dr-sayuj-krishnan-hyderabad"
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
