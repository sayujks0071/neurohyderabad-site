import { SITE_URL } from '../../../src/lib/seo';

export default function AppointmentSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ScheduleAction",
    "@id": `${SITE_URL}/appointments#schedule`,
    "name": "Schedule Appointment with Dr. Sayuj Krishnan",
    "description": "Book a consultation with Dr. Sayuj Krishnan, leading neurosurgeon in Hyderabad",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${SITE_URL}/appointments`,
      "inLanguage": "en",
      "actionPlatform": [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform"
      ]
    },
    "result": {
      "@type": "Reservation",
      "name": "Neurosurgery Consultation"
    },
    "provider": {
      "@type": "Physician",
      "@id": `${SITE_URL}/#physician`,
      "name": "Dr. Sayuj Krishnan",
      "url": SITE_URL
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
