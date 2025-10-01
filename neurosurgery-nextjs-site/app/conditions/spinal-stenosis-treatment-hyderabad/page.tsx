import { SITE_URL, webPageJsonLd, medicalGuidelineJsonLd, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, conditionJsonLd, itemListJsonLd, idFor } from "../../../src/lib/seo";
import type { Metadata } from "next";
import RelatedContent from "../../../components/RelatedContent";

export const metadata: Metadata = {
  title: "Spinal Stenosis Treatment in Hyderabad | Endoscopic ULBD",
  description: "Image‑guided stenosis relief with endoscopic or microscopic decompression. Personalized rehab and safety‑first protocols.",
  alternates: { canonical: "/conditions/spinal-stenosis-treatment-hyderabad/" },
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Spinal Stenosis Treatment in Hyderabad")}&subtitle=${encodeURIComponent("MISS decompression • Laminectomy")}`,
        width: 1200,
        height: 630,
        alt: "Spinal Stenosis Treatment — Dr. Sayuj Krishnan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Spinal Stenosis Treatment in Hyderabad")}&subtitle=${encodeURIComponent("MISS decompression • Laminectomy")}`,
        alt: "Spinal Stenosis Treatment — Dr. Sayuj Krishnan",
      },
    ],
  },
};

export default function SpinalStenosisTreatmentPage() {
  const canonical = `${SITE_URL}/conditions/spinal-stenosis-treatment-hyderabad`;
  const WEB_ID = idFor(canonical, "webpage");
  const COND_ID = idFor(canonical, "condition");
  const BREAD_ID = idFor(canonical, "breadcrumbs");
  const RELATED_ID = idFor(canonical, "related");
  const CONTACT_ID = idFor(canonical, "contact");
  const PHYS_ID = idFor(SITE_URL, "physician");
  const FAQ_ID = idFor(canonical, "faqs");

  const ldCond: any = {
    ...conditionJsonLd("Spinal Stenosis", "Lumbar spinal stenosis"),
    url: canonical,
    signOrSymptom: ["Neurogenic claudication", "Leg pain with walking", "Numbness/tingling", "Weakness"],
    possibleTreatment: ["Physical therapy", "Medications", "Epidural injections", "MISS decompression", "Laminectomy"]
  };
  ldCond["@id"] = COND_ID;

  const ldWeb = webPageJsonLd({
    name: "Spinal Stenosis Treatment in Hyderabad",
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
    { name: "Spinal Stenosis Treatment", url: canonical }
  ]);
  ldCrumbs["@id"] = BREAD_ID;

  const ldGuidelineAans = medicalGuidelineJsonLd({
    name: "AANS: Spinal Stenosis (patient information and guidance)",
    url: "https://www.aans.org/Patients/Neurosurgical-Conditions-and-Treatments/Spinal-Stenosis",
    subject: { name: "Spinal Stenosis", type: "MedicalCondition" }
  });

  const ldGuidelineNass = medicalGuidelineJsonLd({
    name: "NASS guidance on lumbar spinal stenosis and decompression",
    url: "https://www.spine.org/",
    subject: { name: "Spinal Stenosis", type: "MedicalCondition" }
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
      title: "Minimally Invasive Spine Surgery (MISS)",
      description: "Advanced MISS techniques for spinal stenosis with reduced tissue trauma.",
      href: "/services/minimally-invasive-spine-surgery",
      category: "procedure" as const
    },
    {
      title: "Endoscopic Spine Surgery",
      description: "Minimally invasive endoscopic decompression for spinal stenosis.",
      href: "/services/minimally-invasive-spine-surgery",
      category: "procedure" as const
    },
    {
      title: "Book an Appointment",
      description: "Schedule a consultation for spinal stenosis evaluation and treatment.",
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
        name: "Do all spinal stenosis patients need surgery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Many patients improve with conservative treatment including physical therapy, medications, and epidural injections. Surgery is considered when conservative treatment fails."
        }
      },
      {
        "@type": "Question",
        name: "What's the difference between MISS and open decompression?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MISS uses smaller incisions, causes less muscle damage, and typically results in faster recovery with less pain compared to traditional open surgery."
        }
      },
      {
        "@type": "Question",
        name: "How long does relief from decompression surgery last?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most patients experience significant long-term relief. Success rates are generally high, though individual results may vary based on the severity of stenosis and other factors."
        }
      }
    ]
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <article className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Spinal Stenosis Treatment in Hyderabad</h1>
          <p className="text-lg text-gray-600">Conservative-first; endoscopic/tubular decompression for indicated cases</p>
        </header>

        <section className="bg-blue-50 p-6 rounded-lg mb-8">
          <p className="text-center">
            <strong>Call:</strong> 
            <a href="tel:+919778280044" className="text-blue-600 hover:underline ml-2">+91-9778280044</a> • 
            <a href="mailto:neurospinehyd@drsayuj.com" className="text-blue-600 hover:underline ml-2">neurospinehyd@drsayuj.com</a> • 
            <a href="/appointments" className="text-blue-600 hover:underline ml-2">Appointments</a>
          </p>
        </section>

        <div className="prose max-w-none">
          <section className="mb-8">
            <h2>Symptoms and evaluation</h2>
            <p>
              Back/leg pain, neurogenic claudication (pain on walking, relief on sitting/flexion). MRI confirms 
              level and severity; exam guides care.
            </p>
          </section>

          <section className="mb-8">
            <h2>Treatment options</h2>
            <ul>
              <li>Medicines and physiotherapy</li>
              <li>Epidural steroid or selective nerve root blocks</li>
              <li>Endoscopic/tubular decompression in selected patients</li>
            </ul>
          </section>

          <section id="faqs" className="mb-8">
            <h2>FAQs</h2>
            <h3>Will all stenosis need surgery?</h3>
            <p>No. Many improve with structured rehab. Surgery is considered for disabling claudication or neurological deficits.</p>
            <h3>How long until walking improves?</h3>
            <p>Many notice improvement within days to weeks; outcomes vary by severity and comorbidities.</p>
          </section>

          <section className="mb-8">
            <h2>Medical disclaimer</h2>
            <p>For education only; a clinical exam is essential before decisions.</p>
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
            "mainEntityOfPage": "https://www.drsayuj.com/conditions/spinal-stenosis-treatment-hyderabad",
            "name": "Spinal Stenosis Treatment in Hyderabad",
            "description": "Care pathway for lumbar spinal stenosis including minimally invasive decompression.",
            "medicalSpecialty": "Neurosurgery",
            "about": {
              "@type": "MedicalCondition",
              "name": "Lumbar spinal stenosis",
              "signOrSymptom": ["Neurogenic claudication", "Leg pain", "Numbness"],
              "possibleTreatment": [
                {"@type": "MedicalTherapy", "name": "Physiotherapy"},
                {"@type": "TherapeuticProcedure", "name": "Epidural steroid injection"},
                {"@type": "SurgicalProcedure", "name": "Minimally invasive decompression"}
              ]
            },
            "provider": {"@id": "https://www.drsayuj.com/#physician"},
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.drsayuj.com/"},
                {"@type": "ListItem", "position": 2, "name": "Conditions", "item": "https://www.drsayuj.com/conditions/"},
                {"@type": "ListItem", "position": 3, "name": "Spinal Stenosis Treatment", "item": "https://www.drsayuj.com/conditions/spinal-stenosis-treatment-hyderabad"}
              ]
            },
            "inLanguage": "en-IN"
          })
        }}
      />
    </main>
  );
}
