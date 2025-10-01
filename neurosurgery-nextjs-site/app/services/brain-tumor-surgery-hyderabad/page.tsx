import { SITE_URL, webPageJsonLd, serviceJsonLd, medicalGuidelineJsonLd, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, procedureJsonLd, itemListJsonLd, idFor } from "../../../src/lib/seo";
import type { Metadata } from "next";
import RelatedContent from "../../components/RelatedContent";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Brain Tumor Surgery in Hyderabad | Microsurgery",
  description: "Neuronavigation‑guided microsurgery with neuromonitoring for maximal safe resection when appropriate. Multidisciplinary care. Book a consultation.",
  alternates: { 
    canonical: "/services/brain-tumor-surgery-hyderabad/",
    languages: {
      'en-IN': 'https://www.drsayuj.com/services/brain-tumor-surgery-hyderabad/',
      'x-default': 'https://www.drsayuj.com/services/brain-tumor-surgery-hyderabad/'
    }
  },
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Brain Tumor Surgery in Hyderabad")}&subtitle=${encodeURIComponent("Microsurgery • Maximal safe resection")}`,
        width: 1200,
        height: 630,
        alt: "Brain Tumor Surgery — Dr. Sayuj Krishnan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Brain Tumor Surgery in Hyderabad")}&subtitle=${encodeURIComponent("Microsurgery • Maximal safe resection")}`,
        alt: "Brain Tumor Surgery — Dr. Sayuj Krishnan",
      },
    ],
  },
};

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

export default function BrainTumorSurgeryPage() {
  const canonical = `${SITE_URL}/services/brain-tumor-surgery-hyderabad`;
  const WEB_ID = idFor(canonical, "webpage");
  const PROC_ID = idFor(canonical, "procedure");
  const BREAD_ID = idFor(canonical, "breadcrumbs");
  const RELATED_ID = idFor(canonical, "related");
  const CONTACT_ID = idFor(canonical, "contact");
  const PHYS_ID = idFor(SITE_URL, "physician");
  const FAQ_ID = idFor(canonical, "faqs");

  const ldProc: any = {
    ...procedureJsonLd({
      name: "Brain Tumor Surgery",
      description: "Advanced microsurgical techniques for brain tumor removal with maximal safe resection while preserving neurological function.",
      bodyLocation: "Brain",
      preparation: "Preoperative imaging, medical evaluation, anesthesia consultation",
      procedureType: "Surgical procedure"
    }),
    url: canonical
  };
  ldProc["@id"] = PROC_ID;

  const ldWeb = webPageJsonLd({
    name: "Brain Tumor Surgery in Hyderabad",
    description: metadata.description ?? "",
    url: canonical,
    dateModified: new Date().toISOString(),
    mainEntity: { "@id": PROC_ID },
    about: { "@id": PROC_ID },
    mentions: [{ "@id": PROC_ID }]
  });
  (ldWeb as any)["@id"] = WEB_ID;

  const ldPhys: any = physicianJsonLd();
  ldPhys["@id"] = PHYS_ID;

  const ldCrumbs: any = breadcrumbJsonLd([
    { name: "Home", url: SITE_URL + "/" },
    { name: "Services", url: SITE_URL + "/services" },
    { name: "Brain Tumor Surgery", url: canonical }
  ]);
  ldCrumbs["@id"] = BREAD_ID;

  const ldGuideline = medicalGuidelineJsonLd({
    name: "AANS guidelines on brain tumor surgery",
    url: "https://www.aans.org/",
    subject: { name: "Brain Tumor Surgery", type: "MedicalProcedure" }
  });

  const ldContact = contactPointJsonLd({
    phone: "+91 9778280044",
    contactType: "appointments",
    areaServed: "IN",
    languages: ["en", "hi", "te"],
    id: CONTACT_ID
  });

  const relatedItemsAbs = [
    {
      title: "Trigeminal Neuralgia Treatment",
      description: "Advanced treatment for trigeminal neuralgia including microvascular decompression.",
      href: "/conditions/trigeminal-neuralgia-treatment-hyderabad",
      category: "condition" as const
    },
    {
      title: "Epilepsy Surgery",
      description: "Comprehensive epilepsy surgery for drug-resistant seizures.",
      href: "/services/epilepsy-surgery-hyderabad",
      category: "procedure" as const
    }
  ];
  const ldRelatedList = itemListJsonLd({
    name: "Related content",
    items: relatedItemsAbs.map(item => ({ name: item.title, url: `${SITE_URL}${item.href}`, description: item.description })),
    id: RELATED_ID
  });

  // FAQPage JSON-LD
  const ldFaq = {
    "@type": "FAQPage",
    "@id": FAQ_ID,
    mainEntity: [
      {
        "@type": "Question",
        name: "What types of brain tumors can be treated with surgery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Both primary brain tumors (gliomas, meningiomas, pituitary tumors) and metastatic brain tumors can often be treated with surgery, depending on location, size, and patient factors."
        }
      },
      {
        "@type": "Question",
        name: "What is maximal safe resection in brain tumor surgery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Maximal safe resection means removing as much of the tumor as possible while preserving critical brain functions like speech, movement, and cognition through advanced monitoring techniques."
        }
      },
      {
        "@type": "Question",
        name: "What advanced techniques are used in brain tumor surgery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Advanced techniques include neuronavigation for precise tumor localization, intraoperative monitoring to protect brain function, and awake craniotomy for tumors near critical areas."
        }
      }
    ]
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services/" },
          { name: "Brain Tumor Surgery", href: "/services/brain-tumor-surgery-hyderabad/" }
        ]}
      />
      <main className="container mx-auto px-4 py-16">
        <article className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Brain Tumor Surgery in Hyderabad</h1>
          <p className="text-lg text-gray-600">Microsurgery, neuronavigation, and multidisciplinary care</p>
        </header>

        <section className="bg-blue-50 p-6 rounded-lg mb-8">
          <p className="text-center">
            <strong>Contact:</strong> 
            <a href="tel:+919778280044" className="text-blue-600 hover:underline ml-2">+91-9778280044</a> • 
            <a href="mailto:neurospinehyd@drsayuj.com" className="text-blue-600 hover:underline ml-2">neurospinehyd@drsayuj.com</a> • 
            <a href="/appointments" className="text-blue-600 hover:underline ml-2">Appointments</a>
          </p>
        </section>

        <div className="prose max-w-none">
          <section className="mb-8">
            <h2>When is surgery recommended?</h2>
            <p>
              Based on tumor type, size, location, neurological status, and imaging features. We coordinate with 
              oncology, radiology, and pathology for individualized plans.
            </p>
          </section>

          <section className="mb-8">
            <h2>Techniques and safety</h2>
            <ul>
              <li>Microsurgery with neuronavigation and intraoperative monitoring (as available)</li>
              <li>Tissue preservation and safe maximal resection</li>
              <li>Postoperative ICU monitoring and rehab planning</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>Recovery</h2>
            <p>
              Hospital stay and rehab depend on tumor type and location. We provide structured follow-up and 
              adjuvant therapy coordination when required.
            </p>
          </section>

          <section className="mb-8">
            <h2>Risks</h2>
            <p>
              Bleeding, infection, neurological deficits (risk varies by location), seizures, CSF leak. 
              We discuss individualized risk-benefit before any decision.
            </p>
          </section>

          <section className="mb-8 bg-blue-50 p-6 rounded-lg text-center">
            <a href="/about" className="text-blue-600 hover:underline mr-4">About Dr. Sayuj</a> • 
            <a href="/appointments" className="text-blue-600 hover:underline">Book a consult</a>
          </section>

          <section id="faqs" className="mb-8">
            <h2>FAQs</h2>
            <h3>Do all brain tumors need surgery?</h3>
            <p>No. Some are observed or treated with radiosurgery/radiation/chemotherapy. Decisions are tailored.</p>
            <h3>How long is recovery?</h3>
            <p>Simple cases may discharge in a few days; complex cases require longer stays and rehab.</p>
          </section>

          <section className="mb-8">
            <h2>Medical disclaimer</h2>
            <p>Educational only; not medical advice. Decisions require clinical exam and comprehensive review.</p>
          </section>
        </div>
      </article>

      <RelatedContent items={relatedItemsAbs} />

      {/* JSON-LD (single @graph for clean de-duplication) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            "mainEntityOfPage": "https://www.drsayuj.com/services/brain-tumor-surgery-hyderabad",
            "name": "Brain Tumor Surgery in Hyderabad",
            "description": "Microsurgical brain tumor care with multidisciplinary coordination.",
            "medicalSpecialty": "Neurosurgery",
            "about": {
              "@type": "MedicalProcedure",
              "name": "Brain Tumor Surgery",
              "indication": [{"@type": "MedicalIndication", "name": "Brain tumor"}]
            },
            "provider": {"@id": "https://www.drsayuj.com/#physician"},
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.drsayuj.com/"},
                {"@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.drsayuj.com/services/"},
                {"@type": "ListItem", "position": 3, "name": "Brain Tumor Surgery", "item": "https://www.drsayuj.com/services/brain-tumor-surgery-hyderabad"}
              ]
            },
            "inLanguage": "en-IN"
          })
        }}
      />
      
      {/* Service JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://www.drsayuj.com/services/brain-tumor-surgery-hyderabad/#service",
            "serviceType": "Brain Tumor Surgery",
            "areaServed": {"@type": "City", "name": "Hyderabad"},
            "provider": {"@type": "Physician", "@id": "https://www.drsayuj.com/#physician"},
            "description": "Microsurgical brain tumor surgery in Hyderabad with neuronavigation and monitoring for maximal safe resection.",
            "availableChannel": {"@type": "ServiceChannel", "serviceUrl": "https://www.drsayuj.com/services/brain-tumor-surgery-hyderabad/"},
            "offers": {"@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "INR", "url": "https://www.drsayuj.com/appointments"}
          })
        }}
      />
      
      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {"@type": "Question", "name": "What is the recovery time after brain tumor surgery?", "acceptedAnswer": {"@type": "Answer", "text": "Recovery varies by tumor type and location. Most patients stay 3-7 days in hospital, with gradual return to activities over 4-8 weeks."}},
              {"@type": "Question", "name": "Is brain tumor surgery covered by insurance?", "acceptedAnswer": {"@type": "Answer", "text": "Most major insurers cover brain tumor surgery. Our team assists with pre-authorization and documentation."}}
            ]
          })
        }}
      />
      </main>
    </>
  );
}