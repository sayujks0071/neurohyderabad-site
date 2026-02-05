import React from "react";
import Link from "next/link";
import { getLocationById } from "@/src/data/locations";
import { LocationNAPCard } from "@/src/components/locations/LocationNAPCard";
import { LocationCTAs } from "@/src/components/locations/LocationCTAs";
import { LocationMapEmbed } from "@/src/components/locations/LocationMapEmbed";
import { LocalPathways } from "@/src/components/locations/LocalPathways";
import { LocationSchema } from "@/src/components/locations/LocationSchema";
import Link from "next/link";
import { notFound } from "next/navigation";
import TrustProof from "@/app/_components/TrustProof";
import { patientStories } from "@/src/content/stories";

// Force static generation
export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 86400;

export const metadata = {
  title: "Neurosurgeon Jubilee Hills | Brain & Spine Specialist",
  description: "Expert neurosurgeon near Jubilee Hills. Dr Sayuj Krishnan provides advanced brain and spine surgery. Convenient access from Road No. 36 and Checkpost.",
  alternates: {
    canonical: "https://www.drsayuj.info/locations/neurosurgeon-jubilee-hills",
  },
  openGraph: {
    title: "Best Neurosurgeon for Jubilee Hills | Dr. Sayuj Krishnan",
    description: "Advanced Neurosurgery Centre for Jubilee Hills patients. Endoscopic Spine & Brain Surgery specialists.",
    url: "https://www.drsayuj.info/locations/neurosurgeon-jubilee-hills",
    type: "article",
    images: [
      {
        url: "https://www.drsayuj.info/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Sayuj Krishnan - Neurosurgeon for Jubilee Hills",
      },
    ],
  },
};

const FAQ = [
  { q: "Do you have a clinic in Jubilee Hills?", a: "Dr. Sayuj Krishnan's advanced neurosurgery suite is located at Yashoda Hospitals, Malakpet. Many patients from Jubilee Hills prefer to travel (approx. 25-30 mins) for the specialized technology available here, such as the 4K Endospine system and Neuronavigation." },
  { q: "What is the best time to visit from Jubilee Hills?", a: "We recommend booking a slot between 11:00 AM and 2:00 PM to avoid peak traffic at Punjagutta/Lakdikapul. The drive is typically smooth during these hours." },
  { q: "Do you offer second opinions for spine surgery?", a: "Yes. Many patients from Jubilee Hills consult Dr. Sayuj for a second opinion, especially if they have been advised open spine surgery. We specialize in minimally invasive endoscopic alternatives." },
  { q: "Is endoscopic spine surgery covered by insurance?", a: "Yes, endoscopic spine surgery is covered by all major insurance providers. We have a dedicated desk to handle cashless approvals for corporate patients." },
];

export default function JubileeHillsLocationPage() {
  const location = getLocationById("jubilee-hills");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
     { name: "Neurosurgeon Jubilee Hills", item: `https://www.drsayuj.info/${location.slug}` },
  ];

  // Filter stories - prioritize spine/brain excellence
  const relevantStories = patientStories.slice(0, 3);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <LocationSchema location={location} breadcrumb={breadcrumb} faq={FAQ} />

      {/* Hero Section */}
      <div className="mb-10 text-center md:text-left">
        <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-4">
          Serving Jubilee Hills, Film Nagar & Banjara Hills
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          Best Neurosurgeon for Jubilee Hills Patients
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl">
          Dr. Sayuj Krishnan provides world-class <strong>Endoscopic Spine Surgery</strong> and <strong>Brain Tumor Care</strong>.
          <br className="hidden md:block" />
          Conveniently accessible for patients from Jubilee Hills seeking specialized, ethical neurosurgical care.
        </p>

        <div className="mt-8">
           <LocationCTAs location={location} />
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12">
        <div>
          {/* Why Travel Section (The "Hook") */}
          <section className="mb-12 bg-white border border-blue-100 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Why Travel from Jubilee Hills to Malakpet?</h2>
            <p className="text-gray-700 mb-6">
              While there are many clinics in Jubilee Hills, complex spine and brain conditions require specialized infrastructure.
              Our centre at Yashoda Malakpet offers:
            </p>
            <ul className="grid sm:grid-cols-2 gap-4">
               <li className="flex gap-3 items-start">
                 <span className="text-green-500 font-bold text-xl">✓</span>
                 <span className="text-sm text-gray-700"><strong>Full Endoscopic Suite:</strong> For stitchless "keyhole" spine surgery.</span>
               </li>
               <li className="flex gap-3 items-start">
                 <span className="text-green-500 font-bold text-xl">✓</span>
                 <span className="text-sm text-gray-700"><strong>Neuronavigation:</strong> GPS-like precision for brain tumor removal.</span>
               </li>
               <li className="flex gap-3 items-start">
                 <span className="text-green-500 font-bold text-xl">✓</span>
                 <span className="text-sm text-gray-700"><strong>Transparent Pricing:</strong> Ethical care with no hidden costs.</span>
               </li>
               <li className="flex gap-3 items-start">
                 <span className="text-green-500 font-bold text-xl">✓</span>
                 <span className="text-sm text-gray-700"><strong>24/7 Trauma Ready:</strong> Immediate care for head injuries.</span>
               </li>
            </ul>
          </section>

          {/* Services Block */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Services</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/services/minimally-invasive-spine-surgery" className="group p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all bg-white">
                <h3 className="font-semibold text-blue-900 group-hover:text-blue-700">Endoscopic Spine Surgery</h3>
                <p className="text-sm text-gray-600 mt-2">Day-care procedure for slip disc and sciatica. Walk same day.</p>
              </Link>
              <Link href="/services/brain-tumor-surgery-hyderabad" className="group p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all bg-white">
                <h3 className="font-semibold text-blue-900 group-hover:text-blue-700">Brain Tumor Surgery</h3>
                <p className="text-sm text-gray-600 mt-2">Microscopic excision with maximal safe resection.</p>
              </Link>
              <Link href="/conditions/sciatica-pain-treatment-hyderabad" className="group p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all bg-white">
                <h3 className="font-semibold text-blue-900 group-hover:text-blue-700">Sciatica Treatment</h3>
                <p className="text-sm text-gray-600 mt-2">Non-surgical nerve blocks and minimally invasive options.</p>
              </Link>
              <Link href="/services/cervical-disc-replacement-hyderabad" className="group p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all bg-white">
                <h3 className="font-semibold text-blue-900 group-hover:text-blue-700">Cervical Disc Replacement</h3>
                <p className="text-sm text-gray-600 mt-2">Motion-preserving neck surgery (Artificial Disc).</p>
              </Link>
            </div>
          </section>

          {/* Second Opinion CTA */}
          <section className="mb-12 bg-blue-600 text-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Advised Surgery? Get a Second Opinion.</h2>
            <p className="mb-6 opacity-90 max-w-2xl mx-auto">
              Many patients from Jubilee Hills visit us to explore minimally invasive alternatives to open surgery.
              Bring your MRI for a detailed review.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
               <Link href="/appointments" className="bg-white text-blue-700 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                 Book Consultation
               </Link>
               <a href={`https://wa.me/${location.whatsapp || '919778280044'}`} className="bg-blue-700 border border-blue-400 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-800 transition-colors">
                 WhatsApp MRI
               </a>
            </div>
          </section>

          {/* Trust Proof */}
          <TrustProof stories={relevantStories} className="mb-12" />

          {/* FAQ Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Patient FAQs</h2>
            <div className="space-y-4">
              {FAQ.map(({ q, a }) => (
                <details key={q} className="group rounded-xl border border-gray-200 p-4 open:bg-gray-50 transition-colors">
                  <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    {q}
                    <span className="text-blue-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 text-gray-700 leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <LocationNAPCard location={location} />

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
             <h3 className="font-semibold text-gray-900 mb-3">Directions from Jubilee Hills</h3>
             <p className="text-sm text-gray-700 mb-4">
               <strong>Via Old Mumbai Hwy/NH65:</strong><br/>
               Drive past Punjagutta → Lakdi-ka-pul → Koti → Chaderghat → Yashoda Malakpet.
             </p>
             <p className="text-sm text-gray-700 mb-4">
               <strong>Via Metro:</strong><br/>
               Board at Jubilee Hills Checkpost (Blue Line) → Switch at Ameerpet (Red Line) → Alight at Malakpet Station.
             </p>
             <a href={location.directions_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium hover:underline text-sm">
               Open in Google Maps →
             </a>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Clinic Location</h3>
            <LocationMapEmbed location={location} />
            <p className="text-sm text-gray-500 mt-2 text-center">Yashoda Hospitals, Malakpet</p>
          </div>
        </div>
      </div>

      <LocalPathways mode="location" locationId={location.id} />
    </main>
  );
}
