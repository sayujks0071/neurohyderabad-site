import React from "react";
import Link from "next/link";
import { getLocationById } from "@/src/data/locations";
import { LocationNAPCard } from "@/src/components/locations/LocationNAPCard";
import { LocationCTAs } from "@/src/components/locations/LocationCTAs";
import { LocationMapEmbed } from "@/src/components/locations/LocationMapEmbed";
import { LocalPathways } from "@/src/components/locations/LocalPathways";
import { LocationSchema } from "@/src/components/locations/LocationSchema";
import { notFound } from "next/navigation";

// Force static generation
export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 86400;

export const metadata = {
  title: "Best Neurosurgeon in Jubilee Hills, Hyderabad | Endoscopic Spine | Dr. Sayuj Krishnan",
  description:
    "Leading neurosurgeon Dr. Sayuj Krishnan serving Jubilee Hills, Hyderabad. Expert in endoscopic spine surgery, brain tumor surgery, trigeminal neuralgia treatment & emergency neurotrauma care. Easy access from Jubilee Hills Check Post.",
  keywords: "neurosurgeon jubilee hills, brain surgeon jubilee hills, spine specialist jubilee hills, endoscopic spine surgery jubilee hills, dr sayuj krishnan jubilee hills",
  alternates: { canonical: "https://www.drsayuj.info/neurosurgeon-jubilee-hills" },
  openGraph: {
    title: "Best Neurosurgeon in Jubilee Hills, Hyderabad | Endoscopic Spine | Dr. Sayuj Krishnan",
    description: "Expert neurosurgeon serving Jubilee Hills with endoscopic spine surgery, brain tumor surgery, and minimally invasive procedures.",
    url: "https://www.drsayuj.info/neurosurgeon-jubilee-hills",
    type: "website",
    images: [
      {
        url: "https://www.drsayuj.info/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Sayuj Krishnan - Neurosurgeon for Jubilee Hills patients",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Neurosurgeon in Jubilee Hills, Hyderabad | Endoscopic Spine",
    description: "Expert neurosurgeon serving Jubilee Hills with endoscopic spine surgery, brain tumor surgery, and minimally invasive procedures.",
    images: ["https://www.drsayuj.info/images/og-default.jpg"],
  },
};

const FAQ = [
  { q: "How far is Dr. Sayuj's clinic from Jubilee Hills?", a: "Yashoda Hospital Malakpet is approximately 20-35 minutes by car from Jubilee Hills Check Post, depending on traffic. The clinic is easily accessible via Road No. 36 through Banjara Hills or Road No. 45 via Masab Tank." },
  { q: "What neurosurgical procedures are available for Jubilee Hills patients?", a: "We offer full endoscopic spine surgery, minimally invasive discectomy, brain tumor surgery, trigeminal neuralgia treatment (MVD), cervical myelopathy decompression, and 24/7 emergency neurosurgical care for brain bleeds and trauma." },
  { q: "Is parking available for patients from Jubilee Hills?", a: "Yes, Yashoda Hospital Malakpet has ample on-site parking with valet service available during peak hours. The hospital is well-signposted from main roads." },
  { q: "How do I book a consultation from Jubilee Hills?", a: "Book instantly via WhatsApp (+91 9778280044) by sharing your MRI scans and symptoms, or call directly. We offer same-week appointments for urgent cases and teleconsultation for initial review." },
  { q: "Do you accept insurance from Jubilee Hills residents?", a: "Yes, we accept all major health insurance policies including cashless approvals from leading TPAs. Our coordination team assists with pre-authorization and documentation." },
];

export default function JubileeHillsNeurosurgeonPage() {
  const location = getLocationById("jubilee-hills");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
      { name: "Locations", item: "https://www.drsayuj.info/locations" },
      { name: "Neurosurgeon in Jubilee Hills", item: "https://www.drsayuj.info/neurosurgeon-jubilee-hills" },
  ];

  return (
    <main className="bg-white">
      <LocationSchema location={location} breadcrumb={breadcrumb} faq={FAQ} />

      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-12 text-white">
        <div className="mx-auto max-w-5xl px-4">
          <p className="text-sm uppercase tracking-wide text-blue-100">
            Serving Jubilee Hills · Hyderabad
          </p>
          <h1 className="mt-4 text-3xl font-bold md:text-5xl">
            Best Neurosurgeon in Jubilee Hills, Hyderabad
          </h1>
          <p className="mt-4 text-xl text-blue-50">
            Dr. Sayuj Krishnan – Fellowship-Trained Neurosurgeon & Spine Surgeon serving Jubilee Hills residents. 
            Full Endoscopic Spine Surgery • Brain Tumor Surgery • Daycare Procedures • 9+ Years Experience
          </p>
          <div className="mt-6">
            <LocationCTAs location={location} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Expert Neurosurgical Care for Jubilee Hills Residents
            </h2>
            <p className="mt-4 text-gray-700">
              Dr. Sayuj Krishnan provides comprehensive neurosurgical services to patients from <strong>Jubilee Hills</strong>, 
              one of Hyderabad's premier residential areas. Our clinic at Yashoda Hospital Malakpet is conveniently 
              accessible (20-35 minutes) from Jubilee Hills Check Post, Film Nagar, and surrounding areas.
            </p>
            <p className="mt-4 text-gray-700">
              As a fellowship-trained neurosurgeon with German training in full endoscopic spine surgery, Dr. Sayuj 
              specializes in minimally invasive procedures that enable same-day discharge and rapid return to active life—
              perfect for Jubilee Hills professionals and families seeking world-class care close to home.
            </p>
            
            <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-6">
              <h3 className="font-semibold text-blue-800">Why Jubilee Hills Patients Choose Dr. Sayuj:</h3>
              <ul className="mt-3 space-y-2 text-blue-900">
                <li>✓ <strong>9+ years</strong> neurosurgical experience</li>
                <li>✓ <strong>German fellowship</strong> in endoscopic spine surgery</li>
                <li>✓ <strong>Same-day discharge</strong> for most spine procedures</li>
                <li>✓ <strong>24/7 emergency</strong> neurosurgical care</li>
                <li>✓ <strong>All major insurance</strong> accepted (cashless TPA)</li>
                <li>✓ <strong>Easy access</strong> from Jubilee Hills (20-35 min)</li>
              </ul>
            </div>
          </div>

          <div>
             <LocationNAPCard location={location} className="mb-6 shadow-lg" />

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-blue-700">
                Specialized Services for Jubilee Hills
              </h3>
              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Full Endoscopic Spine Surgery</h4>
                  <p className="text-sm text-gray-600">6-8mm incision, same-day discharge, return to work in 1-3 weeks</p>
                  <Link href="/services/endoscopic-spine-surgery-hyderabad" className="text-sm text-blue-600 hover:underline">Learn more →</Link>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Brain Tumor Surgery</h4>
                  <p className="text-sm text-gray-600">Microsurgical resection with neuronavigation & awake craniotomy</p>
                  <Link href="/conditions/brain-tumor-surgery-hyderabad" className="text-sm text-blue-600 hover:underline">Learn more →</Link>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Trigeminal Neuralgia Treatment</h4>
                  <p className="text-sm text-gray-600">Microvascular decompression (MVD) & radiosurgery options</p>
                  <Link href="/conditions/trigeminal-neuralgia-treatment-hyderabad" className="text-sm text-blue-600 hover:underline">Learn more →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold text-gray-900">How to Reach Us from Jubilee Hills</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-blue-700">Driving Directions</h3>
              <ol className="mt-4 list-decimal space-y-2 pl-6 text-gray-700">
                <li><strong>Via Road No. 36:</strong> Jubilee Hills Check Post → Road No. 36 → Banjara Hills → Mehdipatnam → Malakpet (25-30 min)</li>
                <li><strong>Via Road No. 45:</strong> Film Nagar → Road No. 45 → Masab Tank → Malakpet Bridge → Yashoda Hospital (20-28 min)</li>
                <li><strong>Via Outer Ring Road:</strong> Jubilee Hills → Gachibowli Flyover → Mehdipatnam → Malakpet (30-35 min)</li>
              </ol>
              
              <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4">
                <h4 className="font-semibold text-gray-900">OPD Timings</h4>
                <ul className="mt-2 space-y-1 text-gray-700">
                  <li>• Monday – Saturday: 10:00 AM – 4:00 PM</li>
                  <li>• Emergency: 24×7 via hospital triage</li>
                  <li>• Teleconsultation: Available for follow-ups</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-700">Map & Navigation</h3>
              <LocationMapEmbed location={location} className="mt-4 shadow-lg" />
              
              <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
                <h4 className="font-semibold text-green-800">Metro Option</h4>
                <p className="mt-2 text-sm text-green-900">
                  <strong>Nearest Metro:</strong> Jubilee Hills Check Post Station (Blue Line)<br />
                  Take cab/auto from metro to Yashoda Hospital (8-12 minutes)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions – Jubilee Hills Patients
        </h2>
        <div className="mt-6 space-y-4">
          {FAQ.map(({ q, a }) => (
            <details key={q} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer font-semibold text-blue-700">{q}</summary>
              <p className="mt-3 text-gray-700">{a}</p>
            </details>
          ))}
        </div>
      </section>

       <LocalPathways location={location} />
    </main>
  );
}
