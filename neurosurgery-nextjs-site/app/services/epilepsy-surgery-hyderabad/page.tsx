import { SITE_URL, webPageJsonLd, serviceJsonLd, medicalGuidelineJsonLd, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, procedureJsonLd, itemListJsonLd, idFor } from "../../../src/lib/seo";
import type { Metadata } from "next";
import RelatedContent from "../../../components/RelatedContent";

export const metadata: Metadata = {
  title: "Epilepsy Surgery in Hyderabad | Multimodal Workup & Care",
  description: "Surgical options for drug-resistant epilepsy with video EEG, MRI, and neuropsych workup. Consult Dr. Sayuj: +91-9778280044.",
  alternates: { canonical: "/services/epilepsy-surgery-hyderabad" },
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Epilepsy Surgery in Hyderabad")}&subtitle=${encodeURIComponent("Drug-resistant seizure treatment")}`,
        width: 1200,
        height: 630,
        alt: "Epilepsy Surgery — Dr. Sayuj Krishnan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Epilepsy Surgery in Hyderabad")}&subtitle=${encodeURIComponent("Drug-resistant seizure treatment")}`,
        alt: "Epilepsy Surgery — Dr. Sayuj Krishnan",
      },
    ],
  },
};

export default function EpilepsySurgeryPage() {
  const canonical = `${SITE_URL}/services/epilepsy-surgery-hyderabad`;
  const WEB_ID = idFor(canonical, "webpage");
  const PROC_ID = idFor(canonical, "procedure");
  const BREAD_ID = idFor(canonical, "breadcrumbs");
  const RELATED_ID = idFor(canonical, "related");
  const CONTACT_ID = idFor(canonical, "contact");
  const PHYS_ID = idFor(SITE_URL, "physician");
  const FAQ_ID = idFor(canonical, "faqs");

  const ldProc: any = {
    ...procedureJsonLd({
      name: "Epilepsy Surgery",
      description: "Advanced surgical techniques for drug-resistant epilepsy including temporal lobectomy, laser ablation, and vagus nerve stimulation.",
      bodyLocation: "Brain",
      preparation: "Video-EEG monitoring, advanced brain imaging, neuropsychological testing",
      procedureType: "Surgical procedure"
    }),
    url: canonical
  };
  ldProc["@id"] = PROC_ID;

  const ldWeb = webPageJsonLd({
    name: "Epilepsy Surgery in Hyderabad",
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
    { name: "Epilepsy Surgery", url: canonical }
  ]);
  ldCrumbs["@id"] = BREAD_ID;

  const ldGuideline = medicalGuidelineJsonLd({
    name: "ILAE guidelines on epilepsy surgery",
    url: "https://www.ilae.org/",
    subject: { name: "Epilepsy Surgery", type: "MedicalProcedure" }
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
      title: "Trigeminal Neuralgia Treatment",
      description: "Comprehensive treatment for trigeminal neuralgia including surgical options.",
      href: "/conditions/trigeminal-neuralgia-treatment-hyderabad",
      category: "condition" as const
    },
    {
      title: "Book an Appointment",
      description: "Schedule a consultation for epilepsy evaluation and treatment planning.",
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
        name: "Who is a candidate for epilepsy surgery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Patients with drug-resistant epilepsy who have failed to respond to multiple antiepileptic medications and have a well-defined seizure focus may be candidates for epilepsy surgery."
        }
      },
      {
        "@type": "Question",
        name: "What types of epilepsy surgery are available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Epilepsy surgery options include temporal lobectomy, laser interstitial thermal therapy (LITT), vagus nerve stimulation (VNS), corpus callosotomy, and multiple subpial transection."
        }
      },
      {
        "@type": "Question",
        name: "What is the success rate of epilepsy surgery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Success rates vary by procedure type and patient factors. Temporal lobectomy for mesial temporal sclerosis has success rates of 60-80% for seizure freedom, while other procedures may have different outcomes."
        }
      }
    ]
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <article className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Epilepsy Surgery in Hyderabad</h1>
          <p className="text-lg text-gray-600">For select drug-resistant epilepsy after comprehensive evaluation</p>
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
            <h2>Who is a candidate?</h2>
            <p>
              Patients with seizures not controlled by medications after appropriate trials. Workup may include 
              video EEG, MRI, PET/SPECT, neuropsych testing, and MDT review.
            </p>
          </section>

          <section className="mb-8">
            <h2>Surgical options</h2>
            <ul>
              <li>Resective surgery (e.g., temporal lobe)</li>
              <li>Disconnection procedures</li>
              <li>Neuromodulation (where available)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>Risks and outcomes</h2>
            <p>
              Depend on seizure focus and procedure. Risks include infection, bleeding, transient deficits, 
              memory/language changes (case-dependent).
            </p>
          </section>

          <section id="faqs" className="mb-8">
            <h2>FAQs</h2>
            <h3>Do I stop medicines after surgery?</h3>
            <p>Medication changes are individualized; many continue anti-seizure meds for a period after surgery.</p>
            <h3>How long is hospital stay?</h3>
            <p>Typically several days, depending on monitoring and recovery needs.</p>
          </section>

          <section className="mb-8">
            <h2>Medical disclaimer</h2>
            <p>Educational only; treatment decisions require specialist evaluation.</p>
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
            "mainEntityOfPage": "https://www.drsayuj.com/services/epilepsy-surgery-hyderabad",
            "name": "Epilepsy Surgery in Hyderabad",
            "description": "Surgical options for drug-resistant epilepsy following comprehensive workup.",
            "medicalSpecialty": "Neurosurgery",
            "about": {
              "@type": "MedicalProcedure",
              "name": "Epilepsy Surgery",
              "indication": [{"@type": "MedicalIndication", "name": "Drug-resistant epilepsy"}]
            },
            "provider": {"@id": "https://www.drsayuj.com/#physician"},
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.drsayuj.com/"},
                {"@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.drsayuj.com/services/"},
                {"@type": "ListItem", "position": 3, "name": "Epilepsy Surgery", "item": "https://www.drsayuj.com/services/epilepsy-surgery-hyderabad"}
              ]
            },
            "inLanguage": "en-IN"
          })
        }}
      />
    </main>
  );
}
