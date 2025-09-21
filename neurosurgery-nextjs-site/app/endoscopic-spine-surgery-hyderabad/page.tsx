import { SITE_URL, webPageJsonLd, medicalGuidelineJsonLd, serviceJsonLd, CONTACT_EMAIL, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd } from "@/lib/seo";
import RelatedContent from "@/components/RelatedContent";

export const metadata = {
  title: "Endoscopic Spine Surgery Hyderabad | Dr. Sayuj Krishnan",
  description: "Full endoscopic and uniportal spine surgery in Hyderabad by Dr. Sayuj Krishnan. Smaller cuts, faster recovery. Indications, risks, recovery, cost.",
  alternates: { canonical: "/endoscopic-spine-surgery-hyderabad/" }
};

export default function PageWrapper() {
  const canonical = `${SITE_URL}/endoscopic-spine-surgery-hyderabad/`;
  const ldWeb = webPageJsonLd({
    name: "Endoscopic Spine Surgery in Hyderabad",
    description: metadata.description,
    url: canonical,
    dateModified: new Date().toISOString()
  });

  const ldService = serviceJsonLd({
    name: "Endoscopic Spine Surgery",
    url: canonical,
    description: "Minimally invasive endoscopic discectomy/decompression for lumbar disc herniation and focal stenosis.",
    areaServed: ["Hyderabad", "Telangana", "India"]
  });

  const ldPhys = physicianJsonLd();
  const ldCrumbs = breadcrumbJsonLd([
    { name: "Home", url: SITE_URL + "/" },
    { name: "Endoscopic Spine Surgery", url: canonical }
  ]);

  const ldGuidelineNass = medicalGuidelineJsonLd({
    name: "NASS guidance on lumbar discectomy and endoscopic decompression",
    url: "https://www.spine.org/",
    subject: "Lumbar Disc Herniation"
  });

  const ldGuidelineNice = medicalGuidelineJsonLd({
    name: "NICE interventional procedures guidance (endoscopic spinal decompression/discectomy)",
    url: "https://www.nice.org.uk/",
    subject: "Endoscopic Spine Surgery"
  });

  const ldContact = contactPointJsonLd({
    phone: "+91-98484-17094",
    contactType: "appointments",
    areaServed: ["IN"],
    availableLanguage: ["en", "hi", "te"]
  });

  return (
    <main>
      <h1>Endoscopic Spine Surgery in Hyderabad</h1>
      
      {/* Main content would go here */}

      <RelatedContent
        items={[
          {
            title: "Minimally Invasive Spine Surgery (MISS)",
            description: "Smaller incisions, faster recovery for select spine conditions.",
            href: "/services/minimally-invasive-spine-surgery",
            category: "procedure"
          },
          {
            title: "Slip Disc (Herniated Disc) Treatment",
            description: "Evidence-based care for sciatica and lumbar disc herniation.",
            href: "/slip-disc-treatment-hyderabad",
            category: "condition"
          },
          {
            title: "Book an Appointment",
            description: "Schedule a consult at Yashoda Hospital, Malakpet.",
            href: "/appointments",
            category: "action"
          }
        ]}
      />

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldWeb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldPhys) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldCrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldGuidelineNass) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldGuidelineNice) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldContact) }} />
    </main>
  );
}