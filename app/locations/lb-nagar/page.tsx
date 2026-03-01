import React from "react";
import Link from "next/link";
import { getLocationById } from "@/src/data/locations";
import { LocationNAPCard } from "@/src/components/locations/LocationNAPCard";
import { LocationCTAs } from "@/src/components/locations/LocationCTAs";
import { LocationMapEmbed } from "@/src/components/locations/LocationMapEmbed";
import { LocalPathways } from "@/src/components/locations/LocalPathways";
import { LocationSchema } from "@/src/components/locations/LocationSchema";
import { notFound } from "next/navigation";
import TrustProof from "@/app/_components/TrustProof";
import { patientStories } from "@/src/content/stories";

// Force static generation
export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 86400;

export const metadata = {
  title: "Best Neurosurgeon near LB Nagar | 10 Min Drive | Dr. Sayuj",
  description: "Expert Neurosurgeon for LB Nagar & Vanasthalipuram. Dr. Sayuj offers Endoscopic Spine Surgery, Brain Tumor care & Trauma services at Yashoda Malakpet (10 mins away).",
  alternates: { canonical: "https://www.drsayuj.info/locations/lb-nagar" },
  openGraph: {
    title: "Best Neurosurgeon near LB Nagar | Dr. Sayuj Krishnan",
    description: "Leading Neurosurgeon serving LB Nagar, Nagole & Vanasthalipuram. Advanced Brain & Spine Care at Yashoda Hospitals.",
    url: "https://www.drsayuj.info/locations/lb-nagar",
    type: "article",
    images: [
      {
        url: "https://www.drsayuj.info/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Sayuj Krishnan - Neurosurgeon near LB Nagar",
      },
    ],
  },
};

const FAQ = [
  { question: "How far is the clinic from LB Nagar?", answer: "Dr. Sayuj's clinic at Yashoda Hospitals, Malakpet is just a 10-15 minute drive (approx. 4 km) from LB Nagar X Roads via the Mumbai Highway." },
  { question: "Is emergency neurosurgery available for accident cases?", answer: "Yes. Being close to the highway, our Level-1 Trauma Centre at Yashoda Malakpet is fully equipped to handle head injuries and spine fractures 24/7." },
  { question: "Do you offer treatment for Sciatica and Slip Disc?", answer: "Yes, Dr. Sayuj specializes in Endoscopic Spine Surgery (Keyhole Surgery) for sciatica and slip disc, allowing for same-day discharge." },
  { question: "Is insurance accepted?", answer: "We accept all major health insurance providers and offer cashless TPA services at Yashoda Hospitals." },
  { question: "What are the consultation timings?", answer: "OPD consultation is available Mon-Sat from 10:00 AM to 4:00 PM. Appointments are recommended to avoid waiting time." },
];

export default function LBNagarLocationPage() {
  const location = getLocationById("lb-nagar");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
     { name: "Neurosurgeon near LB Nagar", item: `https://www.drsayuj.info/${location.slug}` },
  ];

  // Filter stories - generic impact
  const relevantStories = patientStories.slice(0, 3);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <LocationSchema location={location}  faq={FAQ} />

      {/* Hero Section */}
      <div className="mb-10 text-center md:text-left">
        <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-4">
          Serving LB Nagar, Vanasthalipuram & Nagole
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          Best Neurosurgeon near LB Nagar, Hyderabad
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl">
          Residents of <strong>LB Nagar</strong> don't need to travel far for world-class neurosurgical care.
          Dr. Sayuj Krishnan offers advanced <strong>Endoscopic Spine Surgery</strong> and <strong>Brain Care</strong> at Yashoda Hospitals, Malakpet—just a short 10-minute drive away.
        </p>

        <div className="mt-8">
           <LocationCTAs location={location} />
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12">
        <div>
          {/* Services Block */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Expert Care Close to Home</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/services/endoscopic-spine-surgery-hyderabad" className="group p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all bg-white">
                <h3 className="font-semibold text-blue-900 group-hover:text-blue-700">Endoscopic Spine Surgery</h3>
                <p className="text-sm text-gray-600 mt-2">Stitchless surgery for slip disc. Ideal for active professionals in LB Nagar.</p>
              </Link>
              <Link href="/emergency-rehabilitation" className="group p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all bg-white">
                <h3 className="font-semibold text-blue-900 group-hover:text-blue-700">Trauma & Accident Care</h3>
                <p className="text-sm text-gray-600 mt-2">24/7 Emergency care for head injuries and spine fractures from highway accidents.</p>
              </Link>
              <Link href="/services/brain-tumor-surgery-hyderabad" className="group p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all bg-white">
                <h3 className="font-semibold text-blue-900 group-hover:text-blue-700">Brain Tumor Surgery</h3>
                <p className="text-sm text-gray-600 mt-2">Advanced neuronavigation-guided tumor removal.</p>
              </Link>
              <Link href="/conditions/sciatica-pain-treatment-hyderabad" className="group p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all bg-white">
                <h3 className="font-semibold text-blue-900 group-hover:text-blue-700">Sciatica Treatment</h3>
                <p className="text-sm text-gray-600 mt-2">Relief for leg pain and back pain using non-surgical and surgical methods.</p>
              </Link>
            </div>
          </section>

          {/* Why Choose Block */}
          <section className="mb-12 bg-blue-50 rounded-2xl p-8 border border-blue-100">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Why LB Nagar Patients Choose Dr. Sayuj</h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-800"><strong>Proximity:</strong> Only 4km from LB Nagar X Roads. Avoid the city traffic.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-800"><strong>German Training:</strong> Dr. Sayuj is fellowship-trained in Germany for Endoscopic Spine Surgery.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-800"><strong>Emergency Ready:</strong> Direct access to Yashoda Malakpet's Tier-1 Trauma Centre.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-800"><strong>Cashless Insurance:</strong> All major TPA and insurance cards accepted.</span>
              </li>
            </ul>
          </section>

          {/* Trust Proof */}
          <TrustProof stories={relevantStories} className="mb-12" />

          {/* FAQ Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {FAQ.map(({ question, answer }) => (
                <details key={question} className="group rounded-xl border border-gray-200 p-4 open:bg-gray-50 transition-colors">
                  <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    {question}
                    <span className="text-blue-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 text-gray-700 leading-relaxed">{answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <LocationNAPCard location={location} />

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
             <h3 className="font-semibold text-gray-900 mb-3">Serving Nearby Areas</h3>
             <div className="flex flex-wrap gap-2">
                {["LB Nagar", "Vanasthalipuram", "Nagole", "Hayathnagar", "Kothapet", "Dilsukhnagar", "Saroornagar"].map(area => (
                  <span key={area} className="text-xs bg-white px-2 py-1 rounded border border-gray-200 text-gray-600">{area}</span>
                ))}
             </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
             <h3 className="font-semibold text-gray-900 mb-3">OPD Timings</h3>
             <ul className="space-y-2 text-sm text-gray-700">
               <li className="flex justify-between"><span>Mon - Sat</span> <span>10:00 AM - 4:00 PM</span></li>
               <li className="pt-2 border-t mt-2 font-semibold text-red-600">Emergency: 24/7</li>
             </ul>
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
