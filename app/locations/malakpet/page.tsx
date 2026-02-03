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
  title: "Best Neurosurgeon in Malakpet | Dr. Sayuj Krishnan | Yashoda Hospitals",
  description: "Dr. Sayuj Krishnan is the leading Neurosurgeon at Yashoda Hospitals, Malakpet. Specialist in Endoscopic Spine Surgery, Brain Tumors & Trauma. Book Appointment.",
  alternates: { canonical: "https://www.drsayuj.info/neurosurgeon-malakpet" },
  openGraph: {
    title: "Best Neurosurgeon in Malakpet | Dr. Sayuj Krishnan",
    description: "Expert Neurosurgeon at Yashoda Hospitals, Malakpet. Advanced Endoscopic Spine & Brain Surgery Centre.",
    url: "https://www.drsayuj.info/neurosurgeon-malakpet",
    type: "article",
    images: [
      {
        url: "https://www.drsayuj.info/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Sayuj Krishnan - Neurosurgeon in Malakpet",
      },
    ],
  },
};

const FAQ = [
  { q: "Where is Dr. Sayuj's clinic in Malakpet?", a: "Dr. Sayuj Krishnan consults at Yashoda Hospitals, Malakpet, in Room No 317, OPD Block. The hospital is located near Nalgonda X Roads." },
  { q: "What are the OPD timings?", a: "Mon-Sat: 10:00 AM - 4:00 PM. Emergency neurosurgery services are available 24x7." },
  { q: "Is endoscopic spine surgery available at Malakpet?", a: "Yes, the Malakpet branch is equipped with a dedicated 4K Endoscopic Suite for keyhole spine surgeries (stitchless)." },
  { q: "Do you treat head injuries and spine fractures?", a: "Yes, as a Tier-1 Trauma Centre, we manage complex head injuries and traumatic spine fractures around the clock." },
];

export default function MalakpetLocationPage() {
  const location = getLocationById("malakpet");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
     { name: "Neurosurgeon in Malakpet", item: `https://www.drsayuj.info/${location.slug}` },
  ];

  // Filter stories for general impact + spine/brain mix
  const relevantStories = patientStories.slice(0, 3);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <LocationSchema location={location} breadcrumb={breadcrumb} faq={FAQ} />

      {/* Hero Section */}
      <div className="mb-10 text-center md:text-left">
        <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-4">
          At Yashoda Hospitals, Malakpet
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          Best Neurosurgeon in Malakpet, Hyderabad
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl">
          Dr. Sayuj Krishnan is a fellowship-trained neurosurgeon specializing in <strong>Endoscopic Spine Surgery</strong> and <strong>Brain Tumor Removal</strong>.
          <br className="hidden md:block" />
          Visit the advanced neurosurgery centre at Yashoda Hospitals, Malakpet for world-class care near Nalgonda X Roads.
        </p>

        <div className="mt-8">
           <LocationCTAs location={location} />
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12">
        <div>
          {/* Services Block */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Neurosurgery Services in Malakpet</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/services/endoscopic-spine-surgery-hyderabad" className="group p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all bg-white">
                <h3 className="font-semibold text-blue-900 group-hover:text-blue-700">Endoscopic Spine Surgery</h3>
                <p className="text-sm text-gray-600 mt-2">Stitchless "keyhole" surgery for slip disc and sciatica. Walk same day.</p>
              </Link>
              <Link href="/services/brain-tumor-surgery-hyderabad" className="group p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all bg-white">
                <h3 className="font-semibold text-blue-900 group-hover:text-blue-700">Brain Tumor Surgery</h3>
                <p className="text-sm text-gray-600 mt-2">Neuronavigation-guided removal of tumors with maximal safety.</p>
              </Link>
              <Link href="/conditions/osteoporotic-spine-fracture-hyderabad" className="group p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all bg-white">
                <h3 className="font-semibold text-blue-900 group-hover:text-blue-700">Spine Fracture & Trauma</h3>
                <p className="text-sm text-gray-600 mt-2">24x7 emergency care for spine fractures and head injuries.</p>
              </Link>
              <Link href="/conditions/sciatica-pain-treatment-hyderabad" className="group p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all bg-white">
                <h3 className="font-semibold text-blue-900 group-hover:text-blue-700">Sciatica & Back Pain</h3>
                <p className="text-sm text-gray-600 mt-2">Comprehensive management from medication to minimally invasive options.</p>
              </Link>
            </div>
          </section>

          {/* Symptoms We Treat Block */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Symptoms We Treat</h2>
            <p className="text-gray-700 mb-4">
              Don't ignore persistent pain or neurological symptoms. Early diagnosis at our Malakpet clinic can often prevent the need for major surgery.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/symptoms/back-pain" className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-800 transition-colors">
                Severe Back Pain
              </Link>
              <Link href="/conditions/sciatica-pain-treatment-hyderabad" className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-800 transition-colors">
                Leg Pain (Sciatica)
              </Link>
              <Link href="/conditions/cervical-radiculopathy-treatment-hyderabad" className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-800 transition-colors">
                Neck & Arm Pain
              </Link>
              <Link href="/symptoms/pain-on-top-of-head-causes" className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-800 transition-colors">
                Headaches
              </Link>
              <Link href="/symptoms/signs-of-brain-tumor" className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-800 transition-colors">
                Warning Signs
              </Link>
            </div>
          </section>

          {/* Why Choose Block */}
          <section className="mb-12 bg-blue-50 rounded-2xl p-8 border border-blue-100">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Why Choose Dr. Sayuj at Yashoda Malakpet?</h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-800"><strong>Advanced Technology:</strong> Equipped with 4K Endoscopes, Pentero Microscopes, and Neuronavigation.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-800"><strong>Expertise:</strong> Fellowship-trained in Full Endoscopic Spine Surgery (Germany).</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-800"><strong>Convenient Location:</strong> Easily accessible from Dilsukhnagar, LB Nagar, Charminar, and Koti.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-800"><strong>Comprehensive Care:</strong> From OPD consultation to ICU and Rehabilitation under one roof.</span>
              </li>
            </ul>
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
             <h3 className="font-semibold text-gray-900 mb-3">OPD Timings</h3>
             <ul className="space-y-2 text-sm text-gray-700">
               <li className="flex justify-between"><span>Monday</span> <span>10:00 AM - 4:00 PM</span></li>
               <li className="flex justify-between"><span>Tuesday</span> <span>10:00 AM - 4:00 PM</span></li>
               <li className="flex justify-between"><span>Wednesday</span> <span>10:00 AM - 4:00 PM</span></li>
               <li className="flex justify-between"><span>Thursday</span> <span>10:00 AM - 4:00 PM</span></li>
               <li className="flex justify-between"><span>Friday</span> <span>10:00 AM - 4:00 PM</span></li>
               <li className="flex justify-between"><span>Saturday</span> <span>10:00 AM - 4:00 PM</span></li>
               <li className="pt-2 border-t mt-2 font-semibold text-red-600">Sunday: Closed</li>
             </ul>
             <p className="text-xs text-gray-500 mt-3">*Emergency services available 24x7</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Clinic Location</h3>
            <LocationMapEmbed location={location} />
            <p className="text-sm text-gray-500 mt-2 text-center">Near Nalgonda X Roads, Malakpet</p>
          </div>
        </div>
      </div>

      <LocalPathways mode="location" locationId={location.id} />
    </main>
  );
}
