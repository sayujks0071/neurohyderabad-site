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
  title: "Neurosurgeon near Jubilee Hills, Hyderabad",
  description: "Expert neurosurgeon near Jubilee Hills. Dr Sayuj Krishnan provides advanced brain and spine surgery. Convenient access from Road No. 36 and Checkpost.",
  alternates: {
    canonical: "https://www.drsayuj.info/neurosurgeon-jubilee-hills",
  },
  openGraph: {
    title: "Neurosurgeon near Jubilee Hills, Hyderabad | Dr Sayuj Krishnan",
    description: "Expert neurosurgeon near Jubilee Hills. Dr Sayuj Krishnan provides advanced brain and spine surgery.",
    url: "https://www.drsayuj.info/locations/neurosurgeon-jubilee-hills",
    type: "article",
    images: [
      {
        url: "https://www.drsayuj.info/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Sayuj Krishnan - Neurosurgeon for Jubilee Hills patients",
      },
    ],
  },
};

const FAQ = [
  { q: "How far is the clinic from Jubilee Hills?", a: "It is about 15-20 km via the Inner Ring Road or Old Mumbai Highway." },
  { q: "Do you treat sciatica?", a: "Yes, Dr. Sayuj specializes in endoscopic treatment for sciatica and slip disc." },
  { q: "How can I book an appointment?", a: "You can book via WhatsApp or call us directly." },
];

export default function JubileeHillsLocationPage() {
  const location = getLocationById("jubilee-hills");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
     { name: "Neurosurgeon near Jubilee Hills", item: `https://www.drsayuj.info/${location.slug}` },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <LocationSchema location={location} breadcrumb={breadcrumb} faq={FAQ} />

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Neurosurgeon Near Jubilee Hills, Hyderabad</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
        Providing world-class neurosurgical care for patients from Jubilee Hills, Film Nagar, and Banajara Hills.
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

          <h3 className="text-xl font-semibold mt-6">Directions from Jubilee Hills</h3>
          <p className="mt-2 text-gray-700">
            <strong>By Car:</strong> Take Road No. 36/45 → Jubilee Hills Checkpost → Punjagutta → Lakdi-ka-pul → Malakpet.<br/>
            <strong>By Metro:</strong> Reach Jubilee Hills Checkpost Metro → Switch to Red Line at Ameerpet → Malakpet Station.
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
