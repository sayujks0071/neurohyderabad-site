export interface MedicalProcedure {
  name: string;
  procedureType: 'Surgical' | 'Diagnostic' | 'Therapeutic';
  bodyLocation: string;
  indication: Array<{ name: string; type?: string }>;
  followup?: string;
}

export interface MedicalCondition {
  name: string;
  description?: string;
  symptoms?: string[];
  treatment?: string[];
}

export interface BreadcrumbItem {
  name: string;
  url: string;
  position: number;
}

export interface MedicalWebPageSchema {
  url: string;
  name: string;
  description: string;
  lastReviewed: string;
  breadcrumbs: BreadcrumbItem[];
  mainEntity?: MedicalProcedure | MedicalCondition;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
}

export function buildMedicalWebPageSchema({
  url,
  name,
  description,
  lastReviewed,
  breadcrumbs,
  mainEntity,
  faqs = []
}: MedicalWebPageSchema) {
  const baseSchema: any = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${url}#medical`,
    url,
    name,
    description,
    lastReviewed,
    reviewedBy: { "@id": "https://www.drsayuj.info/#physician" },
    breadcrumb: {
      "@id": `${url}#breadcrumb`
    }
  };

  // Add main entity if provided
  if (mainEntity) {
    const isProcedure = 'procedureType' in mainEntity;
    const entitySchema = {
      "@type": isProcedure ? "MedicalProcedure" : "MedicalCondition",
      "@id": `${url}#${isProcedure ? 'procedure' : 'condition'}`,
      name: mainEntity.name,
      ...(isProcedure && {
        procedureType: mainEntity.procedureType,
        bodyLocation: mainEntity.bodyLocation,
        indication: mainEntity.indication?.map(ind => ({
          "@type": "MedicalCondition",
          name: ind.name
        })),
        followup: mainEntity.followup
      })
    };
    
    baseSchema.mainEntity = [entitySchema];
  }

  // Add FAQ schema if provided
  if (faqs.length > 0) {
    baseSchema.hasPart = [{
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }];
  }

  return baseSchema;
}

export function buildBreadcrumbSchema(breadcrumbs: BreadcrumbItem[], baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${baseUrl}#breadcrumb`,
    "itemListElement": breadcrumbs.map(item => ({
      "@type": "ListItem",
      "position": item.position,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function buildPhysicianSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": "https://www.drsayuj.info/#physician",
    "name": "Dr. Sayuj Krishnan S",
    "medicalSpecialty": ["Neurosurgery", "SpineSurgery"],
    "priceRange": "₹₹",
    "affiliation": {
      "@type": "Hospital",
      "name": "Yashoda Hospital, Malakpet",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Yashoda Hospital, Room 317, OPD Block",
        "addressLocality": "Malakpet",
        "addressRegion": "Telangana",
        "postalCode": "500036",
        "addressCountry": "IN"
      }
    },
    "telephone": "+91 9778280044",
    "url": "https://www.drsayuj.info",
    "sameAs": [
      "https://www.yashodahospitals.com/doctor/dr-sayuj-krishnan/",
      "https://www.linkedin.com/in/dr-sayuj-krishnan"
    ]
  };
}
