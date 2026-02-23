import { SITE_URL } from '@/src/lib/seo';

interface Step {
  name: string;
  text: string;
  image?: string;
}

interface MedicalProcedureSchemaProps {
  name: string;
  description: string;
  procedureType: 'Surgical' | 'NonSurgical';
  bodyLocation?: string;
  howPerformed?: Step[];
  recoveryTime?: string;
  followup?: string;
  status?: 'Active' | 'Discontinued';
}

export default function MedicalProcedureSchema({
  name,
  description,
  procedureType,
  bodyLocation,
  howPerformed,
  recoveryTime,
  followup,
  status = 'Active'
}: MedicalProcedureSchemaProps) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": procedureType === 'Surgical' ? "SurgicalProcedure" : "MedicalProcedure",
    "name": name,
    "description": description,
    "procedureType": procedureType === 'Surgical' ? "https://schema.org/SurgicalProcedure" : "https://schema.org/MedicalProcedure",
    "status": status,
    "bodyLocation": bodyLocation,
    "performer": {
      "@type": "Physician",
      "@id": `${SITE_URL}/#physician`,
      "name": "Dr. Sayuj Krishnan"
    },
    "location": {
      "@type": "Hospital",
      "@id": `${SITE_URL}/#hospital`,
      "name": "Yashoda Hospital"
    }
  };

  if (followup) {
    schema.followup = followup;
  }

  if (howPerformed && howPerformed.length > 0) {
    schema.howPerformed = howPerformed.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "image": step.image ? `${SITE_URL}${step.image}` : undefined
    }));
  }

  // recoveryTime is not a direct property of MedicalProcedure but is often requested.
  // We can add it as a potentialAction (ReceiveAction?) or just description.
  // Or stick to valid schema.
  // Schema.org MedicalProcedure has `preparation`, `followup`, `howPerformed`.
  // `recoveryTime` is not standard.
  // We will append it to description or followup if provided, to ensure data is visible.
  if (recoveryTime) {
      if (schema.followup) {
          schema.followup += ` Typical recovery time: ${recoveryTime}.`;
      } else {
          schema.followup = `Typical recovery time: ${recoveryTime}.`;
      }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
