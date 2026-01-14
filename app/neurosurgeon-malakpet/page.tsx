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
  title: "Neurosurgeon in Malakpet, Hyderabad | Dr. Sayuj Krishnan at Yashoda Hospital | Full Endoscopic Spine Surgery",
  description:
    "Dr. Sayuj Krishnan practices at Yashoda Hospital Malakpet. Expert neurosurgeon offering endoscopic spine surgery, brain tumor surgery, and 24/7 emergency neurosurgical care right in Malakpet, Hyderabad. Book consultation today.",
  keywords: "neurosurgeon malakpet, yashoda hospital malakpet neurosurgeon, spine surgeon malakpet, dr sayuj krishnan malakpet, endoscopic spine surgery malakpet",
  alternates: { canonical: "https://www.drsayuj.info/neurosurgeon-malakpet" },
  openGraph: {
    title: "Neurosurgeon in Malakpet | Dr. Sayuj Krishnan at Yashoda Hospital",
    description: "Expert neurosurgeon practicing at Yashoda Hospital Malakpet with endoscopic spine surgery and brain surgery expertise.",
    url: "https://www.drsayuj.info/neurosurgeon-malakpet",
    type: "website",
    images: [
      {
        url: "https://www.drsayuj.info/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Sayuj Krishnan - Neurosurgeon for Malakpet patients",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neurosurgeon in Malakpet | Dr. Sayuj Krishnan at Yashoda Hospital",
    description: "Expert neurosurgeon practicing at Yashoda Hospital Malakpet with endoscopic spine surgery and brain surgery expertise.",
    images: ["https://www.drsayuj.info/images/og-default.jpg"],
  },
};

const FAQ = [
  { q: "Where exactly is Dr. Sayuj's clinic in Malakpet?", a: "Dr. Sayuj Krishnan's clinic is at Room 317, OPD Block, Yashoda Hospital, Alexander Road, Malakpet, Hyderabad 500036. It's centrally located and easily accessible from all parts of Malakpet." },
  { q: "What services are available at the Malakpet clinic?", a: "Full range of neurosurgical services including endoscopic spine surgery, brain tumor surgery, trigeminal neuralgia treatment, cervical myelopathy decompression, and 24/7 emergency neurosurgical care." },
  { q: "Is parking available at Yashoda Hospital Malakpet?", a: "Yes, Yashoda Hospital has extensive on-site parking facilities with dedicated visitor parking. Valet service is also available during peak hours." },
  { q: "How do I book an appointment at the Malakpet clinic?", a: "Book instantly via WhatsApp (+91 9778280044), call directly, or use our online appointment system. Walk-in consultations are also available during OPD hours." },
  { q: "Do you accept insurance at Yashoda Hospital Malakpet?", a: "Yes, we accept all major health insurance policies with cashless TPA approvals. Our team assists with pre-authorization and claims processing." },
];

export default function MalakpetNeurosurgeonPage() {
  const location = getLocationById("malakpet");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
      { name: "Locations", item: "https://www.drsayuj.info/locations" },
      { name: "Neurosurgeon in Malakpet", item: "https://www.drsayuj.info/neurosurgeon-malakpet" },
  ];

  return (
    <main className="bg-white">
      <LocationSchema location={location} breadcrumb={breadcrumb} faq={FAQ} />

      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-12 text-white">
        <div className="mx-auto max-w-5xl px-4">
          <p className="text-sm uppercase tracking-wide text-blue-100">
            Yashoda Hospital Malakpet · Hyderabad
          </p>
          <h1 className="mt-4 text-3xl font-bold md:text-5xl">
            Neurosurgeon in Malakpet, Hyderabad
          </h1>
          <p className="mt-4 text-xl text-blue-50">
            Dr. Sayuj Krishnan – Your Local Neurosurgeon at Yashoda Hospital Malakpet. Full Endoscopic Spine Surgery • Brain Tumor Surgery • 24/7 Emergency Care • 9+ Years Experience
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
              Expert Neurosurgical Care Right in Malakpet
            </h2>
            <p className="mt-4 text-gray-700">
              Dr. Sayuj Krishnan brings world-class neurosurgical expertise to <strong>Malakpet</strong>, 
              one of Hyderabad's most accessible neighborhoods. Our clinic at Yashoda Hospital Malakpet 
              offers the full spectrum of brain and spine surgery services—from minimally invasive daycare 
              procedures to complex brain tumor resections.
            </p>
            <p className="mt-4 text-gray-700">
              Conveniently located on Alexander Road in the heart of Malakpet, we serve patients from 
              Dilsukhnagar, LB Nagar, Charminar, Moosarambagh, and surrounding areas. As a fellowship-trained 
              neurosurgeon with German training in endoscopic spine surgery, Dr. Sayuj offers cutting-edge 
              minimally invasive techniques with same-day discharge for most spine procedures.
            </p>
            
            <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-6">
              <h3 className="font-semibold text-blue-800">Why Choose Our Malakpet Clinic:</h3>
              <ul className="mt-3 space-y-2 text-blue-900">
                <li>✓ <strong>Centrally located</strong> at Yashoda Hospital Malakpet</li>
                <li>✓ <strong>9+ years</strong> neurosurgical experience</li>
                <li>✓ <strong>German fellowship</strong> in endoscopic spine surgery</li>
                <li>✓ <strong>Same-day discharge</strong> for most spine procedures</li>
                <li>✓ <strong>24/7 emergency</strong> neurosurgical care</li>
                <li>✓ <strong>All major insurance</strong> accepted (cashless TPA)</li>
                <li>✓ <strong>Ample parking</strong> and easy access</li>
              </ul>
            </div>
          </div>

          <div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-blue-700">
                Comprehensive Neurosurgical Services
              </h3>
              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Full Endoscopic Spine Surgery</h4>
                  <p className="text-sm text-gray-600">Minimally invasive spine surgery through 6-8mm incision, same-day discharge</p>
                  <Link href="/services/endoscopic-spine-surgery-hyderabad" className="text-sm text-blue-600 hover:underline">Learn more →</Link>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Brain Tumor Surgery</h4>
                  <p className="text-sm text-gray-600">Advanced microsurgical techniques with neuronavigation</p>
                  <Link href="/conditions/brain-tumor-surgery-hyderabad" className="text-sm text-blue-600 hover:underline">Learn more →</Link>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Emergency Brain Bleed Evacuation</h4>
                  <p className="text-sm text-gray-600">24/7 emergency endoscopic hemorrhage evacuation</p>
                  <Link href="/conditions/brain-bleed-evacuation-hyderabad" className="text-sm text-blue-600 hover:underline">Learn more →</Link>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Trigeminal Neuralgia Treatment</h4>
                  <p className="text-sm text-gray-600">Microvascular decompression for facial pain relief</p>
                  <Link href="/conditions/trigeminal-neuralgia-treatment-hyderabad" className="text-sm text-blue-600 hover:underline">Learn more →</Link>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Cervical Myelopathy Surgery</h4>
                  <p className="text-sm text-gray-600">Endoscopic decompression for spinal cord compression</p>
                  <Link href="/conditions/cervical-myelopathy-decompression-hyderabad" className="text-sm text-blue-600 hover:underline">Learn more →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold text-gray-900">Visit Us at Yashoda Hospital Malakpet</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
                <LocationNAPCard location={location} />
                
                <div className="mt-6 border-t pt-4">
                  <h4 className="font-semibold text-gray-900">OPD Timings</h4>
                  <ul className="mt-2 space-y-1 text-gray-700">
                    <li>• Monday – Saturday: 10:00 AM – 4:00 PM</li>
                    <li>• Emergency: 24×7 via hospital</li>
                    <li>• Teleconsultation: Available</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h4 className="font-semibold text-blue-800">Nearby Landmarks</h4>
                <ul className="mt-2 space-y-1 text-sm text-blue-900">
                  <li>• Near Malakpet Railway Station (2 km)</li>
                  <li>• Close to Dilsukhnagar (3 km)</li>
                  <li>• Accessible from Charminar (4 km)</li>
                  <li>• Easy access from LB Nagar (5 km)</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-700">Location Map</h3>
               <LocationMapEmbed location={location} className="mt-4 shadow-lg" />
              
              <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
                <h4 className="font-semibold text-green-800">Public Transport</h4>
                <p className="mt-2 text-sm text-green-900">
                  <strong>Nearest Metro:</strong> Malakpet Station (Green Line) – 10 min walk<br />
                  <strong>Bus Routes:</strong> Multiple TSRTC buses serve Malakpet area<br />
                  <strong>Auto/Taxi:</strong> Easily available 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions
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

      <section className="bg-blue-50 py-12">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Book Your Consultation Today</h2>
          <p className="mt-4 text-lg text-gray-700">
            Expert neurosurgical care right in Malakpet at Yashoda Hospital.
          </p>
          <div className="mt-6">
             <LocationCTAs location={location} />
          </div>
        </div>
      </section>

       <LocalPathways mode="location" locationId={location.id} />
    </main>
  );
}
