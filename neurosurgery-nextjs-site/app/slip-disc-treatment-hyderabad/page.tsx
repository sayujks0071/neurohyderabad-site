import { SITE_URL, webPageJsonLd, medicalGuidelineJsonLd, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, conditionJsonLd, itemListJsonLd, idFor } from "@/lib/seo";
import RelatedContent from "@/components/RelatedContent";

export const metadata = {
  title: "Slip Disc Treatment in Hyderabad | Dr. Sayuj Krishnan",
  description: "Expert slip disc treatment in Hyderabad. Conservative care and minimally invasive surgery options for herniated disc. Evidence-based approach.",
  alternates: { canonical: `${SITE_URL}/slip-disc-treatment-hyderabad/` }
};

export default function PageWrapper() {
  const canonical = `${SITE_URL}/slip-disc-treatment-hyderabad/`;
  const faqId = idFor(canonical, "faq");
  const ldFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": faqId,
    mainEntity: [
      {
        "@type": "Question",
        name: "When is surgery needed for a herniated (slipped) disc?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Surgery is considered after adequate conservative care if disabling leg-dominant pain, progressive weakness, or neurological deficits persist and correlate with MRI. Urgent surgery is considered for red-flag signs such as cauda equina syndrome."
        }
      },
      {
        "@type": "Question",
        name: "Can a herniated disc heal without surgery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Many patients improve within weeks to months with physiotherapy, medications, ergonomics, and sometimes targeted injections. Imaging and symptoms should be correlated when deciding next steps."
        }
      },
      {
        "@type": "Question",
        name: "How long is recovery after endoscopic or MISS discectomy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most patients mobilise the same day and return to desk work in 1–2 weeks. Heavier activity typically resumes over 4–6 weeks with a graded physiotherapy plan."
        }
      },
      {
        "@type": "Question",
        name: "What are the risks of discectomy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Complications are uncommon but may include infection, dural tear/CSF leak, nerve irritation or injury, bleeding, or recurrent herniation. Your surgeon will discuss personalised risks."
        }
      }
    ]
  };

  return (
    <main>
      <h1>Slip Disc Treatment in Hyderabad</h1>

      {/* Main content would go here */}

      {/* Visible FAQs (content matches JSON-LD) */}
      <section id="faqs" aria-labelledby="faqs-heading" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 id="faqs-heading" className="text-3xl font-bold text-center mb-8">Slip Disc FAQs</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-lg font-semibold cursor-pointer">When is surgery needed for a herniated (slipped) disc?</summary>
              <p className="mt-4 text-gray-600">Surgery is considered after adequate conservative care if disabling leg-dominant pain, progressive weakness, or neurological deficits persist and correlate with MRI. Urgent surgery is considered for red-flag signs such as cauda equina syndrome.</p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-lg font-semibold cursor-pointer">Can a herniated disc heal without surgery?</summary>
              <p className="mt-4 text-gray-600">Yes. Many patients improve within weeks to months with physiotherapy, medications, ergonomics, and sometimes targeted injections. Imaging and symptoms should be correlated when deciding next steps.</p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-lg font-semibold cursor-pointer">How long is recovery after endoscopic or MISS discectomy?</summary>
              <p className="mt-4 text-gray-600">Most patients mobilise the same day and return to desk work in 1–2 weeks. Heavier activity typically resumes over 4–6 weeks with a graded physiotherapy plan.</p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-lg font-semibold cursor-pointer">What are the risks of discectomy?</summary>
              <p className="mt-4 text-gray-600">Complications are uncommon but may include infection, dural tear/CSF leak, nerve irritation or injury, bleeding, or recurrent herniation. Your surgeon will discuss personalised risks.</p>
            </details>
          </div>
        </div>
      </section>

      {/* JSON-LD: Keep your existing scripts; we add FAQPage as a separate schema block */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldFaq) }} />
    </main>
  );
}
