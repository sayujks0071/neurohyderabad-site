import { SITE_URL, webPageJsonLd, medicalGuidelineJsonLd, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, conditionJsonLd, itemListJsonLd, idFor } from "../../../src/lib/seo";
import type { Metadata } from "next";
import RelatedContent from "../../../components/RelatedContent";

export const metadata: Metadata = {
  title: "Slip Disc Treatment in Hyderabad | Endoscopic Discectomy",
  description: "Accurate diagnosis and effective treatment for slip disc and sciatica. Non-surgical care and endoscopic discectomy. Same-day ambulation in Hyderabad.",
  alternates: { canonical: "/conditions/slip-disc-treatment-hyderabad" },
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Slip Disc (Herniated Disc) Treatment in Hyderabad")}&subtitle=${encodeURIComponent("Endoscopic discectomy • Same-day ambulation")}`,
        width: 1200,
        height: 630,
        alt: "Slip Disc Treatment — Dr. Sayuj Krishnan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Slip Disc (Herniated Disc) Treatment in Hyderabad")}&subtitle=${encodeURIComponent("Endoscopic discectomy • Same-day ambulation")}`,
        alt: "Slip Disc Treatment — Dr. Sayuj Krishnan",
      },
    ],
  },
};

export default function SlipDiscTreatmentPage() {
  const canonical = `${SITE_URL}/conditions/slip-disc-treatment-hyderabad`;
  const WEB_ID = idFor(canonical, "webpage");
  const COND_ID = idFor(canonical, "condition");
  const BREAD_ID = idFor(canonical, "breadcrumbs");
  const RELATED_ID = idFor(canonical, "related");
  const CONTACT_ID = idFor(canonical, "contact");
  const PHYS_ID = idFor(SITE_URL, "physician");
  const FAQ_ID = idFor(canonical, "faqs");

  const ldCond: any = {
    ...conditionJsonLd("Lumbar Disc Herniation", "Herniated disc; slipped disc"),
    url: canonical,
    signOrSymptom: ["Radicular leg pain (sciatica)", "Numbness/tingling", "Weakness"],
    possibleTreatment: ["Physiotherapy", "Medications", "Injections", "Endoscopic discectomy", "MISS decompression"]
  };
  ldCond["@id"] = COND_ID;

  const ldWeb = webPageJsonLd({
    name: "Slip Disc (Herniated Disc) Treatment in Hyderabad",
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
    { name: "Slip Disc Treatment", url: canonical }
  ]);
  ldCrumbs["@id"] = BREAD_ID;

  const ldGuidelineAans = medicalGuidelineJsonLd({
    name: "AANS: Herniated Disc (patient information and guidance)",
    url: "https://www.aans.org/Patients/Neurosurgical-Conditions-and-Treatments/Herniated-Disc",
    subject: { name: "Lumbar Disc Herniation", type: "MedicalCondition" }
  });

  const ldGuidelineNass = medicalGuidelineJsonLd({
    name: "NASS guidance on lumbar disc herniation and discectomy",
    url: "https://www.spine.org/",
    subject: { name: "Lumbar Disc Herniation", type: "MedicalCondition" }
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
      description: "Minimally invasive endoscopic discectomy for slip disc with faster recovery.",
      href: "/services/minimally-invasive-spine-surgery",
      category: "procedure" as const
    },
    {
      title: "Minimally Invasive Spine Surgery (MISS)",
      description: "Advanced MISS techniques for spine conditions with reduced tissue trauma.",
      href: "/services/minimally-invasive-spine-surgery",
      category: "procedure" as const
    },
    {
      title: "Book an Appointment",
      description: "Schedule a consultation for slip disc evaluation and treatment.",
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
        name: "When is surgery needed for a herniated disc?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Surgery is considered if severe leg-dominant pain, weakness, or functional limitation persists despite conservative care, and MRI findings correlate with symptoms."
        }
      },
      {
        "@type": "Question",
        name: "How long is recovery after endoscopic discectomy or MISS microdiscectomy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most patients mobilise early and return to desk work in 1–2 weeks. A graded physiotherapy plan helps reduce recurrence risk."
        }
      },
      {
        "@type": "Question",
        name: "Can a slipped disc heal without surgery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Many patients improve with physiotherapy, medications, and activity modification. Injections may be used selectively."
        }
      }
    ]
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <h1>Slip Disc (Herniated Disc) Treatment in Hyderabad</h1>
      
      <section>
        <h2>Understanding Slip Disc</h2>
        <p>
          A slip disc, also known as a herniated disc, occurs when the soft inner material of a spinal disc 
          protrudes through the outer ring, often causing pressure on nearby nerves. This condition commonly 
          affects the lumbar spine and can cause significant pain and disability.
        </p>
      </section>

      <section>
        <h2>Symptoms</h2>
        <ul>
          <li>Back pain that may radiate to the legs</li>
          <li>Sciatica (leg pain following the sciatic nerve)</li>
          <li>Numbness or tingling in the legs or feet</li>
          <li>Muscle weakness in the affected area</li>
          <li>Difficulty walking or standing for long periods</li>
        </ul>
      </section>

      <section>
        <h2>Treatment Options</h2>
        <h3>Conservative Treatment</h3>
        <ul>
          <li>Physical therapy and exercises</li>
          <li>Pain medications and anti-inflammatory drugs</li>
          <li>Epidural steroid injections</li>
          <li>Activity modification and rest</li>
        </ul>

        <h3>Surgical Treatment</h3>
        <p>
          When conservative treatment fails, surgical options include:
        </p>
        <ul>
          <li>Endoscopic discectomy - minimally invasive removal of herniated disc material</li>
          <li>Microdiscectomy - microscopic removal of disc material</li>
          <li>MISS decompression - minimally invasive spinal decompression</li>
        </ul>
      </section>

      <section>
        <h2>Recovery</h2>
        <p>
          Recovery time varies depending on the treatment approach. Endoscopic procedures typically allow 
          for same-day or overnight discharge with early mobilization. Most patients can return to light 
          activities within 1-2 weeks and full activities within 4-6 weeks.
        </p>
      </section>

      <section>
        <h2>FAQs</h2>
        <details>
          <summary>When is surgery needed for a herniated disc?</summary>
          <p>Surgery is considered if severe leg pain, weakness, or disability persists despite conservative care and MRI findings correlate with symptoms.</p>
        </details>
        <details>
          <summary>How long is recovery after endoscopic discectomy or MISS microdiscectomy?</summary>
          <p>Most patients mobilise early and return to desk work in 1–2 weeks; a graded physiotherapy plan is advised.</p>
        </details>
        <details>
          <summary>Can a slipped disc heal without surgery?</summary>
          <p>Yes. Many improve with physiotherapy, medications, and activity modification; injections may be helpful in select cases.</p>
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
            "@graph": [ldWeb, ldCond, ldPhys, ldCrumbs, ldGuidelineAans, ldGuidelineNass, ldContact, ldRelatedList, ldFaq]
          })
        }}
      />
    </main>
  );
}
