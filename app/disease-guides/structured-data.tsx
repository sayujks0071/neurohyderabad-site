import {
  CANONICAL_TELEPHONE,
  YASHODA_MALAKPET_ADDRESS
} from '@/src/data/locations'

export default function DiseaseGuidesStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Disease Guides & Medical Conditions",
    "description": "Comprehensive disease guides for neurological and spinal conditions with expert medical information and treatment options.",
    "url": "https://www.drsayuj.info/disease-guides/",
    "mainEntity": {
      "@type": "MedicalBusiness",
      "name": "Dr. Sayuj Krishnan - Disease Guides & Medical Conditions",
      "description": "Comprehensive information about neurological and spinal conditions, their symptoms, causes, and treatment options.",
      "medicalSpecialty": "Neurosurgery",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Disease Information & Treatment",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "MedicalCondition",
              "name": "Degenerative Disc Disease",
              "description": "Age-related wear and tear of spinal discs causing chronic back pain",
              "signOrSymptom": ["Chronic back pain", "Stiffness", "Reduced flexibility", "Pain worsens with activity"],
              "cause": ["Aging", "Genetics", "Repetitive stress", "Smoking", "Obesity"]
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "MedicalCondition",
              "name": "Spinal Stenosis",
              "description": "Narrowing of spinal canal causing nerve compression and pain",
              "signOrSymptom": ["Leg pain", "Numbness", "Weakness", "Difficulty walking"],
              "cause": ["Aging", "Arthritis", "Herniated discs", "Bone spurs"]
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "MedicalCondition",
              "name": "Trigeminal Neuralgia",
              "description": "Severe facial pain caused by trigeminal nerve compression",
              "signOrSymptom": ["Electric shock-like pain", "Facial spasms", "Pain triggered by touch", "Brief episodes"],
              "cause": ["Blood vessel compression", "Multiple sclerosis", "Tumor pressure", "Nerve damage"]
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "MedicalCondition",
              "name": "Epilepsy",
              "description": "Neurological disorder causing recurrent seizures",
              "signOrSymptom": ["Seizures", "Loss of consciousness", "Muscle spasms", "Confusion"],
              "cause": ["Brain injury", "Genetics", "Stroke", "Brain tumors", "Infections"]
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "MedicalCondition",
              "name": "Herniated Disc",
              "description": "Bulging or ruptured spinal disc pressing on nerves",
              "signOrSymptom": ["Back pain", "Leg pain", "Numbness", "Muscle weakness"],
              "cause": ["Aging", "Lifting injuries", "Repetitive motion", "Obesity"]
            }
          }
        ]
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": YASHODA_MALAKPET_ADDRESS.streetAddress,
        "addressLocality": YASHODA_MALAKPET_ADDRESS.addressLocality,
        "addressRegion": YASHODA_MALAKPET_ADDRESS.addressRegion,
        "postalCode": YASHODA_MALAKPET_ADDRESS.postalCode,
        "addressCountry": YASHODA_MALAKPET_ADDRESS.addressCountry
      },
      "telephone": CANONICAL_TELEPHONE,
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
          "name": "Disease Guides",
          "item": "https://www.drsayuj.info/disease-guides/"
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
        "name": "Neurological Disorders"
      }
    ],
    "mentions": [
      {
        "@type": "MedicalCondition",
        "name": "Degenerative Disc Disease"
      },
      {
        "@type": "MedicalCondition",
        "name": "Spinal Stenosis"
      },
      {
        "@type": "MedicalCondition",
        "name": "Trigeminal Neuralgia"
      },
      {
        "@type": "MedicalCondition",
        "name": "Epilepsy"
      },
      {
        "@type": "MedicalCondition",
        "name": "Herniated Disc"
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
