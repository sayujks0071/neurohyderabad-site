import { SITE_URL, webPageJsonLd, medicalGuidelineJsonLd, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, conditionJsonLd, itemListJsonLd, idFor } from "@/lib/seo";
import RelatedContent from "@/components/RelatedContent";

export const metadata = {
  title: "Trigeminal Neuralgia Treatment in Hyderabad | Dr. Sayuj Krishnan",
  description: "Expert treatment for trigeminal neuralgia in Hyderabad. Medical and surgical options including microvascular decompression (MVD). Evidence-based approach.",
  alternates: { canonical: `${SITE_URL}/conditions/trigeminal-neuralgia/` }
};

export default function PageWrapper() {
  const canonical = `${SITE_URL}/conditions/trigeminal-neuralgia/`;
  const faqId = idFor(canonical, "faq");
  const ldFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": faqId,
    mainEntity: [
      {
        "@type": "Question",
        name: "What triggers trigeminal neuralgia attacks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Common triggers include light touch, chewing, brushing teeth, talking, or wind on the affected side. Avoiding triggers and optimising medication can help reduce attacks."
        }
      },
      {
        "@type": "Question",
        name: "When is microvascular decompression (MVD) recommended?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MVD is considered when medication fails or is poorly tolerated and imaging suggests neurovascular conflict. It aims to provide durable pain relief in suitable candidates."
        }
      },
      {
        "@type": "Question",
        name: "What are options if medicines fail?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Options include percutaneous radiofrequency rhizotomy, balloon compression, glycerol rhizolysis, or stereotactic radiosurgery depending on your case and preferences."
        }
      },
      {
        "@type": "Question",
        name: "What is recovery like after MVD?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most patients spend a few days in hospital and resume light activity in 2–3 weeks. Risks and recovery vary and are discussed individually."
        }
      }
    ]
  };

  return (
    <main>
      <h1>Trigeminal Neuralgia Treatment in Hyderabad</h1>

      {/* Main content would go here */}

      {/* Visible FAQs (content matches JSON-LD) */}
      <section id="faqs" aria-labelledby="faqs-heading" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 id="faqs-heading" className="text-3xl font-bold text-center mb-8">Trigeminal Neuralgia FAQs</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-lg font-semibold cursor-pointer">What triggers trigeminal neuralgia attacks?</summary>
              <p className="mt-4 text-gray-600">Common triggers include light touch, chewing, brushing teeth, talking, or wind on the affected side. Avoiding triggers and optimising medication can help reduce attacks.</p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-lg font-semibold cursor-pointer">When is microvascular decompression (MVD) recommended?</summary>
              <p className="mt-4 text-gray-600">MVD is considered when medication fails or is poorly tolerated and imaging suggests neurovascular conflict. It aims to provide durable pain relief in suitable candidates.</p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-lg font-semibold cursor-pointer">What are options if medicines fail?</summary>
              <p className="mt-4 text-gray-600">Options include percutaneous radiofrequency rhizotomy, balloon compression, glycerol rhizolysis, or stereotactic radiosurgery depending on your case and preferences.</p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-lg font-semibold cursor-pointer">What is recovery like after MVD?</summary>
              <p className="mt-4 text-gray-600">Most patients spend a few days in hospital and resume light activity in 2–3 weeks. Risks and recovery vary and are discussed individually.</p>
            </details>
          </div>
        </div>
      </section>

      {/* JSON-LD: Keep your existing scripts; we add FAQPage as a separate schema block */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldFaq) }} />
    </main>
  );
}
