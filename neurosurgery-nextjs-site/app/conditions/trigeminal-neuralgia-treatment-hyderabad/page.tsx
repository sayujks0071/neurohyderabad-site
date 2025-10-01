import { SITE_URL, webPageJsonLd, medicalGuidelineJsonLd, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, conditionJsonLd, itemListJsonLd, idFor } from "../../../src/lib/seo";
import type { Metadata } from "next";
import RelatedContent from "../../../components/RelatedContent";

export const metadata: Metadata = {
  title: "Trigeminal Neuralgia Treatment in Hyderabad | MVD & Radiosurgery",
  description: "Medication optimization, microvascular decompression, radiosurgery, and percutaneous options. Tailored to imaging and symptoms.",
  alternates: { canonical: "/conditions/trigeminal-neuralgia-treatment-hyderabad/" },
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Trigeminal Neuralgia Treatment in Hyderabad")}&subtitle=${encodeURIComponent("MVD • Radiosurgery • Rhizotomy")}`,
        width: 1200,
        height: 630,
        alt: "Trigeminal Neuralgia Treatment — Dr. Sayuj Krishnan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Trigeminal Neuralgia Treatment in Hyderabad")}&subtitle=${encodeURIComponent("MVD • Radiosurgery • Rhizotomy")}`,
        alt: "Trigeminal Neuralgia Treatment — Dr. Sayuj Krishnan",
      },
    ],
  },
};

export default function TrigeminalNeuralgiaTreatmentPage() {
  const canonical = `${SITE_URL}/conditions/trigeminal-neuralgia-treatment-hyderabad`;
  const WEB_ID = idFor(canonical, "webpage");
  const COND_ID = idFor(canonical, "condition");
  const BREAD_ID = idFor(canonical, "breadcrumbs");
  const RELATED_ID = idFor(canonical, "related");
  const CONTACT_ID = idFor(canonical, "contact");
  const PHYS_ID = idFor(SITE_URL, "physician");
  const FAQ_ID = idFor(canonical, "faqs");

  const ldCond: any = {
    ...conditionJsonLd("Trigeminal Neuralgia", "Tic douloureux"),
    url: canonical,
    signOrSymptom: ["Paroxysmal facial pain", "Trigger zones", "Electric shock-like pain"],
    possibleTreatment: [
      "Carbamazepine/oxcarbazepine",
      "Microvascular decompression (MVD)",
      "Percutaneous rhizotomy",
      "Stereotactic radiosurgery"
    ]
  };
  ldCond["@id"] = COND_ID;

  const ldWeb = webPageJsonLd({
    name: "Trigeminal Neuralgia Treatment in Hyderabad",
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
    { name: "Trigeminal Neuralgia Treatment", url: canonical }
  ]);
  ldCrumbs["@id"] = BREAD_ID;

  const ldGuidelineNice = medicalGuidelineJsonLd({
    name: "NICE guidance on trigeminal neuralgia treatment",
    url: "https://www.nice.org.uk/",
    subject: { name: "Trigeminal Neuralgia", type: "MedicalCondition" }
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
      description: "Advanced microsurgical techniques for brain tumors and related conditions.",
      href: "/services/brain-tumor-surgery-hyderabad",
      category: "procedure" as const
    },
    {
      title: "Book an Appointment",
      description: "Schedule a consultation for trigeminal neuralgia evaluation and treatment.",
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
        name: "What triggers trigeminal neuralgia attacks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Common triggers include touching the face, chewing, brushing teeth, or wind exposure. Episodes are usually brief but severe."
        }
      },
      {
        "@type": "Question",
        name: "When is microvascular decompression (MVD) recommended?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MVD is considered when a neurovascular conflict is identified and medications are insufficient or poorly tolerated."
        }
      },
      {
        "@type": "Question",
        name: "What are alternatives if medicines fail?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Options include percutaneous procedures like radiofrequency rhizotomy or stereotactic radiosurgery in selected cases."
        }
      }
    ]
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <article className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Trigeminal Neuralgia Treatment in Hyderabad</h1>
          <p className="text-lg text-gray-600">Stepwise care — medicines first; MVD or radiosurgery when indicated</p>
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
            <h2>Understanding TN</h2>
            <p>
              Severe, shock-like facial pain in the trigeminal nerve distribution. MRI may show neurovascular 
              contact; diagnosis is clinical with imaging support.
            </p>
          </section>

          <section className="mb-8">
            <h2>Treatment pathway</h2>
            <ul>
              <li>Medicines (e.g., carbamazepine) under supervision</li>
              <li>Microvascular decompression (MVD) for classic TN with vascular compression</li>
              <li>Radiosurgery or percutaneous procedures in selected cases</li>
            </ul>
          </section>

          <section id="faqs" className="mb-8">
            <h2>FAQs</h2>
            <h3>Is MVD a cure?</h3>
            <p>Many patients experience durable relief, but outcomes vary; we discuss individualized expectations and risks.</p>
            <h3>What if I can't tolerate medicines?</h3>
            <p>Interventional options (MVD, radiosurgery, percutaneous) may be considered based on imaging and risk profile.</p>
          </section>

          <section className="mb-8">
            <h2>Medical disclaimer</h2>
            <p>Educational only; consult a specialist for personalized recommendations.</p>
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
            "mainEntityOfPage": "https://www.drsayuj.com/conditions/trigeminal-neuralgia-treatment-hyderabad",
            "name": "Trigeminal Neuralgia Treatment in Hyderabad",
            "description": "Stepwise TN care including microvascular decompression and radiosurgery.",
            "medicalSpecialty": "Neurosurgery",
            "about": {
              "@type": "MedicalCondition",
              "name": "Trigeminal Neuralgia",
              "signOrSymptom": ["Shock-like facial pain", "Trigger zones"],
              "possibleTreatment": [
                {"@type": "MedicalTherapy", "name": "Carbamazepine (medically supervised)"},
                {"@type": "SurgicalProcedure", "name": "Microvascular decompression (MVD)"},
                {"@type": "TherapeuticProcedure", "name": "Radiosurgery"}
              ]
            },
            "provider": {"@id": "https://www.drsayuj.com/#physician"},
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.drsayuj.com/"},
                {"@type": "ListItem", "position": 2, "name": "Conditions", "item": "https://www.drsayuj.com/conditions/"},
                {"@type": "ListItem", "position": 3, "name": "Trigeminal Neuralgia Treatment", "item": "https://www.drsayuj.com/conditions/trigeminal-neuralgia-treatment-hyderabad"}
              ]
            },
            "inLanguage": "en-IN"
          })
        }}
      />
    </main>
  );
}
