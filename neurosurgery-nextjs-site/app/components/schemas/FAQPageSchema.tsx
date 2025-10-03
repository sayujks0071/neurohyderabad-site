import React from 'react';

export default function FAQPageSchema() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is minimally invasive spine surgery right for me?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Patients with leg-dominant pain from a herniated disc or stenosis who don't improve with medicines and physiotherapy may benefit. MRI and examination confirm candidacy. Dr. Krishnan will evaluate your specific condition and recommend the best treatment approach."
        }
      },
      {
        "@type": "Question",
        "name": "How soon can I walk after endoscopic discectomy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most patients walk the same day; return to desk work is often within 1–2 weeks, depending on recovery and job demands. Physical jobs may require 4-8 weeks with a graded return plan. Dr. Krishnan provides personalized recovery guidelines for each patient."
        }
      },
      {
        "@type": "Question",
        "name": "What makes Dr Sayuj Krishnan the best neurosurgeon in Hyderabad?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dr. Krishnan combines 15+ years of experience with advanced training in Germany, state-of-the-art minimally invasive techniques, and a patient-centered approach. His expertise in endoscopic spine surgery, brain tumor surgery, and epilepsy treatment makes him a leading choice for neurosurgical care."
        }
      },
      {
        "@type": "Question",
        "name": "Do you accept insurance for neurosurgical procedures?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we work with most major insurance providers and TPAs. Our team will help you understand your coverage and provide transparent cost estimates. We also offer flexible payment options to make quality neurosurgical care accessible."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

