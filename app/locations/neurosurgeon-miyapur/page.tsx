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
  title: "Neurosurgeon near Miyapur, Hyderabad | Dr Sayuj Krishnan",
  description: "Expert neurosurgeon near Miyapur. Dr Sayuj Krishnan provides advanced brain and spine surgery. Convenient access via Metro and NH65.",
  alternates: {
    canonical: "https://www.drsayuj.info/locations/neurosurgeon-miyapur",
  },
  openGraph: {
    title: "Neurosurgeon near Miyapur, Hyderabad | Dr Sayuj Krishnan",
    description: "Expert neurosurgeon near Miyapur. Dr Sayuj Krishnan provides advanced brain and spine surgery.",
    url: "https://www.drsayuj.info/locations/neurosurgeon-miyapur",
    type: "article",
    images: [
      {
        url: "https://www.drsayuj.info/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Sayuj Krishnan - Neurosurgeon for Miyapur patients",
      },
    ],
  },
};

const FAQ = [
  { q: "How far is the clinic from Miyapur?", a: "It is about 25 km via NH65 or Hitech City road. The easiest way is via Hyderabad Metro." },
  { q: "Do you treat brain tumors?", a: "Yes, Dr. Sayuj specializes in minimally invasive brain tumor surgery and awake craniotomy." },
  { q: "How can I book an appointment?", a: "You can book via WhatsApp or call us directly." },
];

export default function MiyapurLocationPage() {
  const location = getLocationById("miyapur");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
     { name: "Neurosurgeon near Miyapur", item: `https://www.drsayuj.info/${location.slug}` },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <LocationSchema location={location}  faq={FAQ} />

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Neurosurgeon Near Miyapur, Hyderabad</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
        Providing world-class neurosurgical care for patients from Miyapur, Bachupally, and surrounding areas.
        Dr. Sayuj Krishnan specializes in endoscopic spine and brain surgeries.
      </p>

      <div className="mt-6 flex justify-center">
        <LocationCTAs location={location} />
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

          <h3 className="text-xl font-semibold mt-6">Directions from Miyapur</h3>
          <p className="mt-2 text-gray-700">
            <strong>By Metro:</strong> Take the Red Line from Miyapur Metro Station directly to Malakpet Station.<br/>
            <strong>By Car:</strong> Take NH65 via Kukatpally → Ameerpet → Lakdi-ka-pul → Malakpet.
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
