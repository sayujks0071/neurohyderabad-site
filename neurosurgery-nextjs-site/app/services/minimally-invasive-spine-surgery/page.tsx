import { SITE_URL, webPageJsonLd, medicalGuidelineJsonLd, serviceJsonLd, CONTACT_EMAIL, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, itemListJsonLd, procedureJsonLd, idFor } from "../../../src/lib/seo";
import type { Metadata } from "next";
import RelatedContent from "../../../components/RelatedContent";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Minimally Invasive Spine Surgery in Hyderabad | MISS",
  description: "Tiny‑incision MISS for slip disc and sciatica. Endoscopic discectomy and targeted decompression in Hyderabad.",
  alternates: { canonical: "/services/minimally-invasive-spine-surgery" },
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Minimally Invasive Spine Surgery (MISS) in Hyderabad")}&subtitle=${encodeURIComponent("Less pain, faster recovery")}`,
        width: 1200,
        height: 630,
        alt: "Minimally Invasive Spine Surgery — Dr. Sayuj Krishnan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Minimally Invasive Spine Surgery (MISS) in Hyderabad")}&subtitle=${encodeURIComponent("Less pain, faster recovery")}`,
        alt: "Minimally Invasive Spine Surgery — Dr. Sayuj Krishnan",
      },
    ],
  },
};

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

export default function MinimallyInvasiveSpineSurgeryPage() {
  const canonical = `${SITE_URL}/services/minimally-invasive-spine-surgery`;
  const WEB_ID = idFor(canonical, "webpage");
  const PROC_ID = idFor(canonical, "procedure");
  const BREAD_ID = idFor(canonical, "breadcrumbs");
  const RELATED_ID = idFor(canonical, "related");
  const CONTACT_ID = idFor(canonical, "contact");
  const PHYS_ID = idFor(SITE_URL, "physician");
  const FAQ_ID = idFor(canonical, "faqs");

  const ldProc: any = {
    ...procedureJsonLd({
      name: "Minimally Invasive Spine Surgery",
      description: "Advanced spine surgery techniques using smaller incisions and specialized instruments for reduced tissue trauma and faster recovery.",
      bodyLocation: "Spine",
      preparation: "Preoperative imaging, medical evaluation, patient counseling",
      procedureType: "Surgical procedure"
    }),
    url: canonical
  };
  ldProc["@id"] = PROC_ID;

  const ldWeb = webPageJsonLd({
    name: "Minimally Invasive Spine Surgery (MISS) in Hyderabad",
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
    { name: "Minimally Invasive Spine Surgery", url: canonical }
  ]);
  ldCrumbs["@id"] = BREAD_ID;

  const ldGuideline = medicalGuidelineJsonLd({
    name: "NASS guidelines on minimally invasive spine surgery",
    url: "https://www.spine.org/",
    subject: { name: "Minimally Invasive Spine Surgery", type: "MedicalProcedure" }
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
      title: "Endoscopic Spine Surgery",
      description: "Advanced endoscopic techniques for spine conditions with minimal tissue damage.",
      href: "/services/minimally-invasive-spine-surgery",
      category: "procedure" as const
    },
    {
      title: "Slip Disc Treatment",
      description: "Comprehensive treatment for herniated discs including endoscopic discectomy.",
      href: "/conditions/slip-disc-treatment-hyderabad",
      category: "condition" as const
    },
    {
      title: "Spinal Stenosis Treatment",
      description: "Minimally invasive decompression for spinal stenosis relief.",
      href: "/conditions/spinal-stenosis-treatment-hyderabad",
      category: "condition" as const
    },
    {
      title: "Book an Appointment",
      description: "Schedule a consultation for MISS evaluation and treatment planning.",
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
        name: "What conditions can be treated with minimally invasive spine surgery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MISS can treat herniated discs, spinal stenosis, degenerative disc disease, spinal instability, and some spinal tumors with smaller incisions and faster recovery."
        }
      },
      {
        "@type": "Question",
        name: "How long is the recovery after MISS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Recovery is typically faster than traditional open surgery. Most patients can return to light activities within 1-2 weeks and full activities within 4-6 weeks, depending on the specific procedure."
        }
      },
      {
        "@type": "Question",
        name: "What are the advantages of MISS over traditional spine surgery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MISS offers smaller incisions, less muscle damage, reduced blood loss, lower infection risk, shorter hospital stays, and faster return to normal activities compared to traditional open surgery."
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
          { name: "Minimally Invasive Spine Surgery", href: "/services/minimally-invasive-spine-surgery/" }
        ]}
      />
      <main className="container mx-auto px-4 py-16">
        <article className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Minimally Invasive Spine Surgery (MISS) in Hyderabad</h1>
          <p className="text-lg text-gray-600">Endoscopic and tubular techniques for slip disc, sciatica, and stenosis</p>
        </header>

        <section className="bg-blue-50 p-6 rounded-lg mb-8">
          <p className="text-center">
            <strong>Book a consult:</strong>
            <a href="tel:+919778280044" className="text-blue-600 hover:underline ml-2">+91-9778280044</a> •
            <a href="mailto:neurospinehyd@drsayuj.com" className="text-blue-600 hover:underline ml-2">neurospinehyd@drsayuj.com</a> •
            <a href="/appointments" className="text-blue-600 hover:underline ml-2">Appointments</a>
          </p>
        </section>

        <div className="prose max-w-none">
          <section className="mb-8">
            <h2>What is MISS?</h2>
            <p>
              MISS uses a tiny working channel and advanced visualization (endoscope or microscope) to treat nerve compression 
              with minimal muscle disruption. Common procedures include endoscopic discectomy, decompression, and selected fusions.
            </p>
          </section>

          <section className="mb-8">
            <h2>Who benefits</h2>
            <ul>
              <li>Slip disc (herniated disc) with leg-dominant sciatica</li>
              <li>Spinal stenosis (lateral recess/foraminal)</li>
              <li>Recurrent disc herniation (case-dependent)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>Procedure overview</h2>
            <ol>
              <li>Day-care admission; local anesthesia with sedation or general anesthesia</li>
              <li>6–18 mm incision (depending on technique)</li>
              <li>Targeted decompression or fragment removal under direct vision</li>
              <li>Early ambulation; many patients discharge same day or overnight</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2>Recovery timeline (typical)</h2>
            <ul>
              <li>Day 0–1: Walk the same day; oral pain control</li>
              <li>Week 1–2: Light walking; desk work if pain controlled</li>
              <li>Week 4–6: Guided physiotherapy (core/hips) and posture training</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>Risks and limitations</h2>
            <ul>
              <li>Re-herniation, dural tear, transient nerve irritation</li>
              <li>Not ideal for severe instability or massive central herniations (case-by-case)</li>
            </ul>
          </section>

          <section className="mb-8 bg-gray-50 p-6 rounded-lg">
            <p><strong>Areas served:</strong> Jubilee Hills, Banjara Hills, Hitec City, Gachibowli, Madhapur, Kondapur, Malakpet, and across Hyderabad.</p>
          </section>

          <section className="mb-8 bg-blue-50 p-6 rounded-lg text-center">
            <a href="tel:+919778280044" className="text-blue-600 hover:underline mr-4">Call +91-9778280044</a> • 
            <a href="/appointments" className="text-blue-600 hover:underline mr-4">Book online</a> • 
            <a href="/about" className="text-blue-600 hover:underline">About Dr. Sayuj</a>
          </section>

          <section id="faqs" className="mb-8">
            <h2>FAQs</h2>
            <h3>Is MISS a day-care procedure?</h3>
            <p>Yes, many MISS procedures are day-care or single-night stays, depending on anatomy and recovery.</p>
            <h3>How soon can I return to work?</h3>
            <p>Desk roles often 1–3 weeks; physical jobs may need 4–8+ weeks with graded rehab.</p>
          </section>

          <section className="mb-8">
            <h2>Medical disclaimer</h2>
            <p>This information is educational and not a substitute for medical advice. Decisions must be made after clinical exam and imaging review.</p>
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
            "mainEntityOfPage": "https://www.drsayuj.com/services/minimally-invasive-spine-surgery",
            "name": "Minimally Invasive Spine Surgery (MISS) in Hyderabad",
            "description": "Endoscopic and tubular spine surgery for slip disc, sciatica, and stenosis with faster recovery.",
            "medicalSpecialty": "Neurosurgery",
            "about": {
              "@type": "MedicalProcedure",
              "name": "Minimally Invasive Spine Surgery",
              "procedureType": "Endoscopic discectomy and decompression",
              "indication": [
                {"@type": "MedicalIndication", "name": "Lumbar disc herniation"},
                {"@type": "MedicalIndication", "name": "Lumbar spinal stenosis"}
              ]
            },
            "provider": {
              "@id": "https://www.drsayuj.com/#physician",
              "@type": "Physician",
              "name": "Dr. Sayuj Krishnan",
              "medicalSpecialty": "Neurosurgery",
              "telephone": "+91-9778280044",
              "email": "mailto:neurospinehyd@drsayuj.com"
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.drsayuj.com/"},
                {"@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.drsayuj.com/services/"},
                {"@type": "ListItem", "position": 3, "name": "Minimally Invasive Spine Surgery", "item": "https://www.drsayuj.com/services/minimally-invasive-spine-surgery"}
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
          __html: JSON.stringify(serviceJsonLd({
            name: "Minimally Invasive Spine Surgery (MISS)",
            description: "Advanced endoscopic and tubular techniques for slip disc, sciatica, and spinal stenosis with minimal muscle disruption and faster recovery.",
            url: `${SITE_URL}/services/minimally-invasive-spine-surgery/`,
            areaServed: "Hyderabad, Telangana, India",
            provider: {
              "@id": `${SITE_URL}/#physician`,
              name: "Dr. Sayuj Krishnan",
              url: SITE_URL,
              sameAs: [
                "https://g.co/kgs/9366939683880052414",
                "https://www.google.com/maps/place/Dr+Sayuj+Krishnan",
                "https://www.yashodahospitals.com/doctor/dr-sayuj-krishnan/"
              ],
              medicalSpecialty: ["Neurosurgery", "Spine Surgery", "Endoscopic Surgery"]
            },
            id: `${SITE_URL}/services/minimally-invasive-spine-surgery/#service`
          }))
        }}
      />
      </main>
    </>
  );
}