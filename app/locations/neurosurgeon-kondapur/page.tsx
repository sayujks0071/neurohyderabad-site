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
  title: "Neurosurgeon near Kondapur, Hyderabad | Dr Sayuj Krishnan",
  description: "Expert neurosurgeon near Kondapur. Dr Sayuj Krishnan provides advanced brain and spine surgery. Convenient access via Hitech City road.",
  alternates: {
    canonical: "https://www.drsayuj.info/locations/neurosurgeon-kondapur",
  },
  openGraph: {
    title: "Neurosurgeon near Kondapur, Hyderabad | Dr Sayuj Krishnan",
    description: "Expert neurosurgeon near Kondapur. Dr Sayuj Krishnan provides advanced brain and spine surgery.",
    url: "https://www.drsayuj.info/locations/neurosurgeon-kondapur",
    type: "article",
    images: [
      {
        url: "https://www.drsayuj.info/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Sayuj Krishnan - Neurosurgeon for Kondapur patients",
      },
    ],
  },
};

const FAQ = [
  { q: "How far is the clinic from Kondapur?", a: "It is about 20-25 km via ORR or Hitech City road to Malakpet." },
  { q: "Do you treat brain tumors?", a: "Yes, Dr. Sayuj specializes in minimally invasive brain tumor surgery." },
  { q: "How can I book an appointment?", a: "You can book via WhatsApp or call us directly." },
];

export default function KondapurLocationPage() {
  const location = getLocationById("kondapur");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
     { name: "Neurosurgeon near Kondapur", item: `https://www.drsayuj.info/${location.slug}` },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <LocationSchema location={location} breadcrumb={breadcrumb} faq={FAQ} />

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Neurosurgeon Near Kondapur, Hyderabad</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
        Providing world-class neurosurgical care for patients from Kondapur and Hitech City areas.
        Dr. Sayuj Krishnan specializes in endoscopic spine and brain surgeries.
      </p>

      <div className="mt-6 flex justify-center">
        <LocationCTAs mode="location" locationId={location.id} />
      </div>

      <section className="grid md:grid-cols-2 gap-8 mt-10">
        <div>
          <LocationNAPCard location={location} className="mb-6" />

          <h2 className="text-2xl font-semibold">Our Expertise</h2>
          <ul className="mt-3 list-disc pl-5 space-y-1">
            <li>Microscopic & Endoscopic Spine Surgery</li>
            <li>Brain Tumor Excision (Awake Craniotomy)</li>
            <li>Trigeminal Neuralgia Treatment</li>
            <li>Head Injury & Trauma Care</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">Directions from Kondapur</h3>
          <p className="mt-2 text-gray-700">
            <strong>By Car:</strong> Take Hitech City Road → Jubilee Hills Checkpost → Masab Tank → Malakpet.<br/>
            <strong>By Metro:</strong> Reach Hitech City Metro → Switch to Red Line at Ameerpet → Malakpet Station.
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
