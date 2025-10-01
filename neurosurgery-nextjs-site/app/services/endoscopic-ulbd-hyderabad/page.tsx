import { SITE_URL, webPageJsonLd, serviceJsonLd, medicalGuidelineJsonLd, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, procedureJsonLd, itemListJsonLd, idFor } from "../../../src/lib/seo";
import type { Metadata } from "next";
import RelatedContent from "../../../components/RelatedContent";

export const metadata: Metadata = {
  title: "Endoscopic ULBD in Hyderabad | Lumbar Stenosis Decompression",
  description: "Endoscopic ULBD for lumbar spinal stenosis—unilateral approach to bilateral decompression. Safety‑first, evidence‑based care.",
  alternates: { canonical: "/services/endoscopic-ulbd-hyderabad/" },
  openGraph: {
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Endoscopic ULBD in Hyderabad")}&subtitle=${encodeURIComponent("Lumbar Stenosis • Bilateral decompression")}`,
        width: 1200,
        height: 630,
        alt: "Endoscopic ULBD — Dr. Sayuj Krishnan"
      }
    ]
  }
};

export default function EndoscopicULBDPage() {
  const PAGE_ID = idFor(SITE_URL, "endoscopic-ulbd");
  const CONTACT_ID = idFor(SITE_URL, "contact");
  const RELATED_ID = idFor(SITE_URL, "related-content");

  const relatedItemsAbs = [
    {
      title: "Spinal Stenosis Treatment",
      description: "Comprehensive treatment for spinal stenosis causing leg pain and walking difficulties.",
      href: "/conditions/spinal-stenosis-treatment-hyderabad",
      category: "condition" as const
    },
    {
      title: "Minimally Invasive Spine Surgery",
      description: "Advanced endoscopic techniques for various spine conditions.",
      href: "/services/minimally-invasive-spine-surgery",
      category: "procedure" as const
    }
  ];

  const ldRelatedList = itemListJsonLd({
    name: "Related content",
    items: relatedItemsAbs.map(item => ({ name: item.title, url: `${SITE_URL}${item.href}`, description: item.description })),
    id: RELATED_ID
  });

  const ldContact = contactPointJsonLd({
    phone: "+91 9778280044",
    contactType: "appointments",
    areaServed: "IN",
    languages: ["en", "hi", "te"],
    id: CONTACT_ID
  });

  return (
    <main className="container mx-auto px-4 py-16">
      <article className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Endoscopic ULBD in Hyderabad</h1>
          <p className="text-lg text-gray-600">Unilateral laminotomy bilateral decompression for lumbar stenosis</p>
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
            <h2>What is Endoscopic ULBD?</h2>
            <p>Endoscopic Unilateral Laminotomy Bilateral Decompression (ULBD) is an advanced minimally invasive technique that treats lumbar spinal stenosis by creating a small opening on one side of the spine to decompress both sides of the spinal canal. Dr. Sayuj Krishnan uses this sophisticated approach to provide maximum relief with minimal tissue disruption.</p>
          </section>

          <section className="mb-8">
            <h2>Who Benefits from ULBD?</h2>
            <ul>
              <li>Patients with central and lateral recess stenosis</li>
              <li>Bilateral leg pain and walking difficulties</li>
              <li>Neurogenic claudication (pain while walking)</li>
              <li>Failed conservative treatment approaches</li>
              <li>Patients seeking to avoid fusion surgery</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>Procedure Overview</h2>
            <ol>
              <li>Small 8-10mm incision on one side of the spine</li>
              <li>Endoscopic camera insertion for precise visualization</li>
              <li>Unilateral laminotomy (removal of small portion of lamina)</li>
              <li>Bilateral decompression of spinal canal and nerve roots</li>
              <li>Preservation of spinal stability and motion</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2>Advantages of Endoscopic ULBD</h2>
            <ul>
              <li><strong>Preserves spinal stability:</strong> No fusion required</li>
              <li><strong>Bilateral decompression:</strong> Treats both sides through one incision</li>
              <li><strong>Faster recovery:</strong> Return to activities in 2-4 weeks</li>
              <li><strong>Reduced blood loss:</strong> Minimal tissue damage</li>
              <li><strong>Lower complication rates:</strong> Compared to open surgery</li>
              <li><strong>Maintains motion:</strong> Preserves normal spine movement</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>Recovery Timeline</h2>
            <ul>
              <li><strong>Day 1:</strong> Walking with assistance, pain management</li>
              <li><strong>Week 1:</strong> Light walking, basic daily activities</li>
              <li><strong>Week 2-4:</strong> Gradual return to normal activities</li>
              <li><strong>Month 2-3:</strong> Full recovery, return to work/sports</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>Risks and Considerations</h2>
            <p>Potential risks include bleeding, infection, nerve injury, dural tear, and recurrence of symptoms. Dr. Krishnan uses advanced techniques and careful patient selection to minimize these risks. All patients receive detailed counseling about potential complications.</p>
          </section>

          <section className="mb-8 bg-blue-50 p-6 rounded-lg text-center">
            <a href="/about" className="text-blue-600 hover:underline mr-4">About Dr. Sayuj</a> •
            <a href="/appointments" className="text-blue-600 hover:underline">Book a consult</a>
          </section>

          <section id="faqs" className="mb-8">
            <h2>FAQs</h2>
            <h3>How is ULBD different from traditional laminectomy?</h3>
            <p>ULBD preserves more bone and soft tissue, maintains spinal stability, and allows for faster recovery compared to traditional open laminectomy.</p>
            
            <h3>Will I need a fusion after ULBD?</h3>
            <p>ULBD is designed to preserve spinal stability, so fusion is typically not required. The procedure maintains normal spine motion.</p>
            
            <h3>How long will the pain relief last?</h3>
            <p>Most patients experience long-term relief. Success rates are high, with many patients maintaining improvement for years.</p>
            
            <h3>Can ULBD be done on multiple levels?</h3>
            <p>Yes, ULBD can be performed on multiple levels if needed, though each level requires careful evaluation.</p>
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
            "@graph": [
              webPageJsonLd({
                url: `${SITE_URL}/services/endoscopic-ulbd-hyderabad`,
                name: "Endoscopic ULBD in Hyderabad",
                description: "Unilateral laminotomy bilateral decompression for lumbar stenosis in Hyderabad.",
                id: PAGE_ID
              }),
              serviceJsonLd({
                name: "Endoscopic ULBD",
                description: "Minimally invasive unilateral laminotomy bilateral decompression for lumbar spinal stenosis.",
                provider: { "@id": `${SITE_URL}/#physician` },
                areaServed: "Hyderabad, Telangana, India",
                id: idFor(SITE_URL, "service")
              }),
              procedureJsonLd({
                name: "Endoscopic ULBD",
                description: "Minimally invasive surgical procedure for bilateral decompression of lumbar spinal stenosis.",
                bodyLocation: "Lumbar spine",
                preparation: "Pre-operative evaluation, MRI/CT imaging, and patient counseling.",
                procedureType: "Minimally invasive spine surgery",
                id: idFor(SITE_URL, "procedure")
              }),
              breadcrumbJsonLd([
                { name: "Home", url: SITE_URL },
                { name: "Services", url: `${SITE_URL}/services` },
                { name: "Endoscopic ULBD", url: `${SITE_URL}/services/endoscopic-ulbd-hyderabad` }
              ]),
              ldContact,
              ldRelatedList
            ]
          })
        }}
      />
    </main>
  );
}
