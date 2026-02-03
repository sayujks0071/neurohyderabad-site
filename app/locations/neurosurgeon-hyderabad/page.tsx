import React from "react";
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
  title: "Best Neurosurgeon in Hyderabad | Dr. Sayuj Krishnan",
  description: "Dr. Sayuj Krishnan - Leading Neurosurgeon in Hyderabad. Specializing in Endoscopic Spine, Brain Tumors & Trauma at Yashoda Hospitals, Malakpet.",
  alternates: {
    canonical: "https://www.drsayuj.info/locations/neurosurgeon-hyderabad",
  },
  openGraph: {
    title: "Best Neurosurgeon in Hyderabad | Dr. Sayuj Krishnan",
    description: "Dr. Sayuj Krishnan - Leading Neurosurgeon in Hyderabad. Specializing in Endoscopic Spine, Brain Tumors & Trauma.",
    url: "https://www.drsayuj.info/locations/neurosurgeon-hyderabad",
    type: "article",
    images: [
      {
        url: "https://www.drsayuj.info/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Sayuj Krishnan - Top Neurosurgeon in Hyderabad",
      },
    ],
  },
};

const FAQ = [
  { q: "Where is Dr. Sayuj located in Hyderabad?", a: "Dr. Sayuj consults at Yashoda Hospitals, Malakpet, Hyderabad." },
  { q: "What is the best treatment for slip disc in Hyderabad?", a: "Endoscopic Spine Surgery is considered the gold standard for minimal invasiveness and quick recovery." },
  { q: "Do you accept insurance?", a: "Yes, we accept all major insurances and TPA for cashless hospitalization." },
];

export default function HyderabadLocationPage() {
  const location = getLocationById("hyderabad");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
     { name: "Neurosurgeon in Hyderabad", item: `https://www.drsayuj.info/${location.slug}` },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <LocationSchema location={location} breadcrumb={breadcrumb} faq={FAQ} />

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Top Neurosurgeon in Hyderabad</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
        Providing comprehensive brain and spine care for patients across Hyderabad and Telangana.
        Dr. Sayuj Krishnan is renowned for his expertise in Endoscopic Spine Surgery.
      </p>

      <div className="mt-6 flex justify-center">
        <LocationCTAs location={location} />
      </div>

      <section className="grid md:grid-cols-2 gap-8 mt-10">
        <div>
          <LocationNAPCard location={location} className="mb-6" />

          <h2 className="text-2xl font-semibold">Why Patients Choose Us</h2>
          <ul className="mt-3 list-disc pl-5 space-y-1">
            <li>Patient-Centric Approach</li>
            <li>Advanced Technology (Neuronavigation, 4K Endoscopy)</li>
            <li>Transparent Pricing & Ethical Practice</li>
            <li>Comprehensive Post-Op Rehabilitation</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">Central Location</h3>
          <p className="mt-2 text-gray-700">
            Located centrally at Malakpet, we are easily accessible from all parts of Hyderabad via Metro and Road.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Map</h2>
          <LocationMapEmbed location={location} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">FAQs</h2>
        <div className="mt-4 space-y-4">
          {FAQ.map(({ q, a }) => (
            <details key={q} className="rounded-xl border p-4">
              <summary className="font-medium">{q}</summary>
              <p className="mt-2">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <LocalPathways locationId={location.id} mode="location" />
    </main>
  );
}
