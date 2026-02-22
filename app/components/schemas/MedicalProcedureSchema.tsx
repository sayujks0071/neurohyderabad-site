import { SITE_URL } from '../../../src/lib/seo';

interface MedicalProcedureSchemaProps {
  name: string;
  description: string;
  procedureType?: 'SurgicalProcedure' | 'MedicalProcedure';
  bodyLocation: string;
  howPerformed?: string;
  status?: string;
  preparation?: string;
  recoveryTime?: string;
  postOp?: string;
  followUp?: string;
}

export default function MedicalProcedureSchema({
  name,
  description,
  procedureType = 'SurgicalProcedure',
  bodyLocation,
  howPerformed,
  status = 'StandardProcedure',
  preparation,
  recoveryTime,
  postOp,
  followUp
}: MedicalProcedureSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": procedureType,
    "name": name,
    "description": description,
    "bodyLocation": bodyLocation,
    "procedureType": {
      "@type": "MedicalProcedureType",
      "name": procedureType
    },
    "status": {
        "@type": "MedicalProcedureStatus",
        "name": status
    },
    "howPerformed": howPerformed,
    "preparation": preparation,
    "recoveryTime": recoveryTime,
    "postOp": postOp,
    "followUp": followUp,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": `${SITE_URL}/appointments`
    },
    "provider": {
        "@type": "Physician",
        "@id": `${SITE_URL}/#physician`,
        "name": "Dr. Sayuj Krishnan",
        "url": SITE_URL
    },
    "location": {
        "@type": "Hospital",
        "@id": `${SITE_URL}/#hospital`,
        "name": "Yashoda Hospitals",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Malakpet",
          "addressRegion": "Hyderabad",
          "addressCountry": "IN"
        }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
