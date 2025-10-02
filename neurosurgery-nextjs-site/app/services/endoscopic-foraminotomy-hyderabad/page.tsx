import { SITE_URL, webPageJsonLd, serviceJsonLd, medicalGuidelineJsonLd, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, procedureJsonLd, itemListJsonLd, idFor } from "../../../src/lib/seo";
import type { Metadata } from "next";
import RelatedContent from "../../../components/RelatedContent";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Endoscopic Foraminotomy in Hyderabad",
  description: "Targeted endoscopic decompression for foraminal stenosis with minimal tissue disruption. Clear recovery plan and insurance support.",
  alternates: { 
    canonical: "/services/endoscopic-foraminotomy-hyderabad/",
    languages: {
      'en-IN': 'https://www.drsayuj.com/services/endoscopic-foraminotomy-hyderabad/',
      'x-default': 'https://www.drsayuj.com/services/endoscopic-foraminotomy-hyderabad/'
    }
  },
  openGraph: {
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Endoscopic Foraminotomy in Hyderabad")}&subtitle=${encodeURIComponent("Foraminal Stenosis • Tiny incision relief")}`,
        width: 1200,
        height: 630,
        alt: "Endoscopic Foraminotomy — Dr Sayuj Krishnan"
      }
    ]
  }
};

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

export default function EndoscopicForaminotomyPage() {
  const PAGE_ID = idFor(SITE_URL, "endoscopic-foraminotomy");
  const CONTACT_ID = idFor(SITE_URL, "contact");
  const RELATED_ID = idFor(SITE_URL, "related-content");

  const relatedItemsAbs = [
    {
      title: "Endoscopic Discectomy",
      description: "Minimally invasive treatment for herniated discs with tiny incisions.",
      href: "/services/minimally-invasive-spine-surgery",
      category: "procedure" as const
    },
    {
      title: "Spinal Stenosis Treatment",
      description: "Comprehensive treatment for spinal stenosis causing leg pain.",
      href: "/conditions/spinal-stenosis-treatment-hyderabad",
      category: "condition" as const
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
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services/" },
          { name: "Endoscopic Foraminotomy", href: "/services/endoscopic-foraminotomy-hyderabad/" }
        ]}
      />
      <main className="container mx-auto px-4 py-16">
      <article className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Endoscopic Foraminotomy in Hyderabad</h1>
          <p className="text-lg text-gray-600">Targeted relief for foraminal stenosis with tiny incisions</p>
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
            <h2>What is Endoscopic Foraminotomy?</h2>
            <p>Endoscopic foraminotomy is a minimally invasive procedure that enlarges the neural foramen (the opening where nerve roots exit the spine) to relieve compression and pain. Dr Sayuj Krishnan uses advanced endoscopic techniques to access the spine through tiny incisions, providing targeted relief for foraminal stenosis.</p>
          </section>

          <section className="mb-8">
            <h2>Who Benefits from This Procedure?</h2>
            <ul>
              <li>Patients with foraminal stenosis causing leg pain</li>
              <li>Nerve root compression at specific spinal levels</li>
              <li>Failed conservative treatment (medications, physiotherapy)</li>
              <li>Patients seeking faster recovery than traditional open surgery</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>Procedure Steps</h2>
            <ol>
              <li>Small 6-8mm incision under local or general anesthesia</li>
              <li>Endoscopic camera insertion for direct visualization</li>
              <li>Precise removal of bone and tissue compressing the nerve</li>
              <li>Verification of nerve decompression</li>
              <li>Closure with minimal scarring</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2>Benefits & Recovery</h2>
            <ul>
              <li><strong>Same-day discharge:</strong> Most patients go home the same day</li>
              <li><strong>Faster recovery:</strong> Return to light activities in 1-2 weeks</li>
              <li><strong>Minimal scarring:</strong> Tiny incisions heal quickly</li>
              <li><strong>Reduced pain:</strong> Less tissue damage than open surgery</li>
              <li><strong>Lower infection risk:</strong> Smaller surgical site</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>Risks and Considerations</h2>
            <p>While endoscopic foraminotomy is generally safe, potential risks include bleeding, infection, nerve injury, and recurrence of symptoms. Dr. Krishnan discusses all risks and benefits during your consultation to ensure you make an informed decision.</p>
          </section>

          <section className="mb-8 bg-blue-50 p-6 rounded-lg text-center">
            <a href="/about" className="text-blue-600 hover:underline mr-4">About Dr. Sayuj</a> •
            <a href="/appointments" className="text-blue-600 hover:underline">Book a consult</a>
          </section>

          <section id="faqs" className="mb-8">
            <h2>FAQs</h2>
            <h3>How long does the procedure take?</h3>
            <p>Endoscopic foraminotomy typically takes 1-2 hours, depending on the complexity and number of levels treated.</p>
            
            <h3>When can I return to work?</h3>
            <p>Desk work can often resume within 1-2 weeks, while physical jobs may require 4-6 weeks with a gradual return plan.</p>
            
            <h3>Is this procedure covered by insurance?</h3>
            <p>Yes, most insurance providers cover endoscopic foraminotomy. Our team helps with pre-authorization and cost estimates.</p>
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
                url: `${SITE_URL}/services/endoscopic-foraminotomy-hyderabad`,
                name: "Endoscopic Foraminotomy in Hyderabad",
                description: "Targeted relief for foraminal stenosis with tiny incisions in Hyderabad.",
                id: PAGE_ID
              }),
              serviceJsonLd({
                name: "Endoscopic Foraminotomy",
                description: "Minimally invasive procedure to relieve foraminal stenosis and nerve compression.",
                provider: { "@id": `${SITE_URL}/#physician` },
                areaServed: "Hyderabad, Telangana, India",
                id: idFor(SITE_URL, "service")
              }),
              procedureJsonLd({
                name: "Endoscopic Foraminotomy",
                description: "Minimally invasive surgical procedure to enlarge neural foramina and relieve nerve compression.",
                bodyLocation: "Spine",
                preparation: "Pre-operative evaluation, imaging studies, and patient counseling.",
                procedureType: "Minimally invasive spine surgery",
                id: idFor(SITE_URL, "procedure")
              }),
              breadcrumbJsonLd([
                { name: "Home", url: SITE_URL },
                { name: "Services", url: `${SITE_URL}/services` },
                { name: "Endoscopic Foraminotomy", url: `${SITE_URL}/services/endoscopic-foraminotomy-hyderabad` }
              ]),
              ldContact,
              ldRelatedList
            ]
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
            "@id": "https://www.drsayuj.com/services/endoscopic-foraminotomy-hyderabad/#service",
            "serviceType": "Endoscopic Foraminotomy",
            "areaServed": {"@type": "City", "name": "Hyderabad"},
            "provider": {"@type": "Physician", "@id": "https://www.drsayuj.com/#physician"},
            "description": "Minimally invasive endoscopic foraminotomy for foraminal stenosis in Hyderabad, enabling faster recovery with tiny incision.",
            "availableChannel": {"@type": "ServiceChannel", "serviceUrl": "https://www.drsayuj.com/services/endoscopic-foraminotomy-hyderabad/"},
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
              {"@type": "Question", "name": "How soon can I walk after endoscopic foraminotomy?", "acceptedAnswer": {"@type": "Answer", "text": "Most patients walk the same day; desk work often resumes within 1–2 weeks."}},
              {"@type": "Question", "name": "Is endoscopic foraminotomy covered by insurance?", "acceptedAnswer": {"@type": "Answer", "text": "Most major insurers cover indicated procedures. Our team helps with pre-authorization."}}
            ]
          })
        }}
      />
      </main>
    </>
  );
}
