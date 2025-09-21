import { SITE_URL, webPageJsonLd, serviceJsonLd, medicalGuidelineJsonLd, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, procedureJsonLd, itemListJsonLd, idFor } from "@/lib/seo";
import RelatedContent from "@/components/RelatedContent";

export const metadata = {
  title: "Brain Tumor Surgery in Hyderabad | Dr. Sayuj Krishnan",
  description: "Expert brain tumor surgery in Hyderabad. Advanced microsurgical techniques and comprehensive care. Evidence-based approach.",
  alternates: { canonical: `${SITE_URL}/brain-tumor-surgery-hyderabad/` }
};

export default function PageWrapper() {
  const canonical = `${SITE_URL}/brain-tumor-surgery-hyderabad/`;
  const faqId = idFor(canonical, "faq");
  const ldFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": faqId,
    mainEntity: [
      {
        "@type": "Question",
        name: "How is 'maximal safe resection' decided?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We balance tumor removal with preservation of neurological function, guided by imaging, neuronavigation, functional mapping and intraoperative monitoring where indicated."
        }
      },
      {
        "@type": "Question",
        name: "What are the risks of brain tumor surgery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Risks vary by tumor location and pathology and may include bleeding, infection, seizures, CSF leak, or neurological deficits. Your individual risk is discussed during consultation."
        }
      },
      {
        "@type": "Question",
        name: "How long is the hospital stay and recovery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many patients stay 3–7 days in hospital, with recovery timelines tailored to tumor type, location, and overall health. Rehabilitation may be recommended."
        }
      },
      {
        "@type": "Question",
        name: "Will I need radiotherapy or chemotherapy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Adjuvant therapy is based on final pathology and tumor board recommendations. Many patients benefit from additional treatment after surgery."
        }
      }
    ]
  };

  return (
    <main>
      <h1>Brain Tumor Surgery in Hyderabad</h1>

      {/* Main content would go here */}

      {/* Visible FAQs (content matches JSON-LD) */}
      <section id="faqs" aria-labelledby="faqs-heading" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 id="faqs-heading" className="text-3xl font-bold text-center mb-8">Brain Tumor Surgery FAQs</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-lg font-semibold cursor-pointer">How is 'maximal safe resection' decided?</summary>
              <p className="mt-4 text-gray-600">We balance tumor removal with preservation of neurological function, guided by imaging, neuronavigation, functional mapping and intraoperative monitoring where indicated.</p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-lg font-semibold cursor-pointer">What are the risks of brain tumor surgery?</summary>
              <p className="mt-4 text-gray-600">Risks vary by tumor location and pathology and may include bleeding, infection, seizures, CSF leak, or neurological deficits. Your individual risk is discussed during consultation.</p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-lg font-semibold cursor-pointer">How long is the hospital stay and recovery?</summary>
              <p className="mt-4 text-gray-600">Many patients stay 3–7 days in hospital, with recovery timelines tailored to tumor type, location, and overall health. Rehabilitation may be recommended.</p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-lg font-semibold cursor-pointer">Will I need radiotherapy or chemotherapy?</summary>
              <p className="mt-4 text-gray-600">Adjuvant therapy is based on final pathology and tumor board recommendations. Many patients benefit from additional treatment after surgery.</p>
            </details>
          </div>
        </div>
      </section>

      {/* JSON-LD: Keep your existing scripts; we add FAQPage as a separate schema block */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldFaq) }} />
    </main>
  );
}
