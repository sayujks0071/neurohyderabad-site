import React from "react";
import { SITE_URL } from "@/src/lib/seo";

const FAQS = [
  {
    question: "How quickly will I receive confirmation?",
    answer:
      "Most appointment requests are confirmed within 30–60 minutes during clinic hours. We will contact you by phone or WhatsApp.",
  },
  {
    question: "What documents should I bring?",
    answer:
      "Please bring any MRI/CT scans, previous reports, and a list of current medications.",
  },
  {
    question: "Can I reschedule after submitting?",
    answer:
      "Yes. If you need to change the date or time, reply to the confirmation message or call the clinic.",
  },
  {
    question: "Do you offer teleconsultations?",
    answer:
      "Teleconsultations are available for follow-ups and initial triage. Choose the teleconsult option during scheduling.",
  },
  {
    question: "Where is the clinic located?",
    answer:
      "Dr. Sayuj Krishnan practices at Yashoda Hospitals, Malakpet, Hyderabad. The address is listed on the confirmation screen.",
  },
];

export default function AppointmentFaqSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/appointments#faq`,
    "mainEntity": FAQS.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
