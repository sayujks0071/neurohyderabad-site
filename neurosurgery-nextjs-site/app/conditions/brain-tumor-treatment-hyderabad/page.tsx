import { SITE_URL, webPageJsonLd, medicalGuidelineJsonLd, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, conditionJsonLd, itemListJsonLd, idFor } from "../../../src/lib/seo";
import type { Metadata } from "next";
import RelatedContent from "../../../components/RelatedContent";

export const metadata: Metadata = {
  title: "Brain Tumor Treatment in Hyderabad | Advanced Neurosurgery — Dr Sayuj Krishnan",
  description: "Comprehensive care for brain tumors—diagnosis, surgery, and recovery. Microsurgery with neuronavigation and IOM in Hyderabad.",
  alternates: { canonical: "/conditions/brain-tumor-treatment-hyderabad" },
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Brain Tumor Treatment in Hyderabad")}&subtitle=${encodeURIComponent("Comprehensive diagnosis • Microsurgery")}`,
        width: 1200,
        height: 630,
        alt: "Brain Tumor Treatment — Dr Sayuj Krishnan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Brain Tumor Treatment in Hyderabad")}&subtitle=${encodeURIComponent("Comprehensive diagnosis • Microsurgery")}`,
        alt: "Brain Tumor Treatment — Dr Sayuj Krishnan",
      },
    ],
  },
};

export default function BrainTumorTreatmentPage() {
  const canonical = `${SITE_URL}/conditions/brain-tumor-treatment-hyderabad`;
  const WEB_ID = idFor(canonical, "webpage");
  const COND_ID = idFor(canonical, "condition");
  const BREAD_ID = idFor(canonical, "breadcrumbs");
  const RELATED_ID = idFor(canonical, "related");
  const CONTACT_ID = idFor(canonical, "contact");
  const PHYS_ID = idFor(SITE_URL, "physician");
  const FAQ_ID = idFor(canonical, "faqs");

  const ldCond: any = {
    ...conditionJsonLd("Brain Tumor", "Intracranial neoplasm"),
    url: canonical,
    signOrSymptom: ["Headaches", "Seizures", "Vision changes", "Cognitive changes", "Motor weakness"],
    possibleTreatment: [
      "Surgical resection",
      "Radiation therapy",
      "Chemotherapy",
      "Targeted therapy",
      "Supportive care"
    ]
  };
  ldCond["@id"] = COND_ID;

  const ldWeb = webPageJsonLd({
    name: "Brain Tumor Treatment in Hyderabad",
    description: metadata.description ?? "",
    url: canonical,
    dateModified: new Date().toISOString(),
    mainEntity: { "@id": COND_ID },
    about: { "@id": COND_ID },
    mentions: [{ "@id": COND_ID }]
  });
  (ldWeb as any)["@id"] = WEB_ID;

  const ldPhys: any = physicianJsonLd();
  ldPhys["@id"] = PHYS_ID;

  const ldCrumbs: any = breadcrumbJsonLd([
    { name: "Home", url: SITE_URL + "/" },
    { name: "Conditions", url: SITE_URL + "/conditions" },
    { name: "Brain Tumor Treatment", url: canonical }
  ]);
  ldCrumbs["@id"] = BREAD_ID;

  const ldGuidelineNice = medicalGuidelineJsonLd({
    name: "NICE guidance on brain tumor diagnosis and treatment",
    url: "https://www.nice.org.uk/",
    subject: { name: "Brain Tumor", type: "MedicalCondition" }
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
      title: "Brain Tumor Surgery",
      description: "Advanced microsurgical techniques for brain tumor removal with neuronavigation.",
      href: "/services/brain-tumor-surgery-hyderabad",
      category: "procedure" as const
    },
    {
      title: "Trigeminal Neuralgia Treatment",
      description: "Specialized treatment for facial pain conditions.",
      href: "/conditions/trigeminal-neuralgia-treatment-hyderabad",
      category: "condition" as const
    },
    {
      title: "Book an Appointment",
      description: "Schedule a consultation for brain tumor evaluation and treatment planning.",
      href: "/appointments",
      category: "action" as const
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
        name: "What's the difference between benign and malignant brain tumors?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Benign tumors are non-cancerous and grow slowly, while malignant tumors are cancerous and can grow rapidly and spread. Both can cause symptoms depending on their location and size."
        }
      },
      {
        "@type": "Question",
        name: "Do all brain tumors need a biopsy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not all tumors require biopsy. Some can be diagnosed based on imaging characteristics, while others may need tissue sampling for accurate diagnosis and treatment planning."
        }
      },
      {
        "@type": "Question",
        name: "What is the recovery time after brain tumor surgery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Recovery varies by tumor type and location. Most patients stay in the hospital for 3-7 days, with gradual return to normal activities over several weeks to months."
        }
      }
    ]
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <h1>Brain Tumor Treatment in Hyderabad</h1>
      
      <section>
        <h2>Understanding Brain Tumors</h2>
        <p>
          Brain tumors are abnormal growths of cells in the brain or surrounding structures. They can be 
          benign (non-cancerous) or malignant (cancerous), and their treatment depends on the type, 
          location, and size of the tumor.
        </p>
      </section>

      <section>
        <h2>Symptoms</h2>
        <ul>
          <li>Persistent headaches</li>
          <li>Seizures</li>
          <li>Vision changes or double vision</li>
          <li>Memory or cognitive problems</li>
          <li>Motor weakness or coordination problems</li>
          <li>Speech difficulties</li>
          <li>Personality or behavior changes</li>
        </ul>
      </section>

      <section>
        <h2>Types of Brain Tumors</h2>
        <h3>Primary Brain Tumors</h3>
        <ul>
          <li>Gliomas (including glioblastoma)</li>
          <li>Meningiomas</li>
          <li>Pituitary adenomas</li>
          <li>Acoustic neuromas</li>
        </ul>

        <h3>Metastatic Brain Tumors</h3>
        <p>
          Tumors that have spread to the brain from other parts of the body, most commonly from 
          lung, breast, or skin cancers.
        </p>
      </section>

      <section>
        <h2>Treatment Options</h2>
        <h3>Surgical Treatment</h3>
        <ul>
          <li>Microsurgical resection with neuronavigation</li>
          <li>Awake craniotomy for eloquent areas</li>
          <li>Intraoperative monitoring (IOM)</li>
          <li>Minimally invasive approaches</li>
        </ul>

        <h3>Adjuvant Therapies</h3>
        <ul>
          <li>Radiation therapy</li>
          <li>Chemotherapy</li>
          <li>Targeted therapy</li>
          <li>Immunotherapy (for certain types)</li>
        </ul>
      </section>

      <section>
        <h2>Recovery and Follow-up</h2>
        <p>
          Recovery from brain tumor treatment involves close monitoring, rehabilitation as needed, 
          and regular follow-up imaging. The multidisciplinary team works together to ensure 
          optimal outcomes and quality of life.
        </p>
      </section>

      <section>
        <h2>FAQs</h2>
        <details>
          <summary>What's the difference between benign and malignant brain tumors?</summary>
          <p>Benign tumors are non-cancerous and grow slowly, while malignant tumors are cancerous and can grow rapidly and spread. Both can cause symptoms depending on their location and size.</p>
        </details>
        <details>
          <summary>Do all brain tumors need a biopsy?</summary>
          <p>Not all tumors require biopsy. Some can be diagnosed based on imaging characteristics, while others may need tissue sampling for accurate diagnosis and treatment planning.</p>
        </details>
        <details>
          <summary>What is the recovery time after brain tumor surgery?</summary>
          <p>Recovery varies by tumor type and location. Most patients stay in the hospital for 3-7 days, with gradual return to normal activities over several weeks to months.</p>
        </details>
      </section>

      <section>
        <h3>Medical disclaimer</h3>
        <p>Selection and outcomes are individualised; this page is educational and not a substitute for medical advice.</p>
      </section>

      <RelatedContent items={relatedItemsAbs} />

      {/* JSON-LD (single @graph for clean de-duplication) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [ldWeb, ldCond, ldPhys, ldCrumbs, ldGuidelineNice, ldContact, ldRelatedList, ldFaq]
          })
        }}
      />
    </main>
  );
}
