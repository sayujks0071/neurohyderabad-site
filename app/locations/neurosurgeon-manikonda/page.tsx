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
  title: "Neurosurgeon near Manikonda, Hyderabad | Dr Sayuj Krishnan",
  description: "Expert neurosurgeon near Manikonda. Dr Sayuj Krishnan provides advanced brain and spine surgery with minimally invasive techniques. Easy access via ORR.",
  alternates: {
    canonical: "https://www.drsayuj.info/locations/neurosurgeon-manikonda",
  },
  openGraph: {
    title: "Neurosurgeon near Manikonda, Hyderabad | Dr Sayuj Krishnan",
    description: "Expert neurosurgeon near Manikonda. Dr Sayuj Krishnan provides advanced brain and spine surgery with minimally invasive techniques.",
    url: "https://www.drsayuj.info/locations/neurosurgeon-manikonda",
    type: "article",
    images: [
      {
        url: "https://www.drsayuj.info/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Sayuj Krishnan - Neurosurgeon for Manikonda patients",
      },
    ],
  },
};

const FAQ = [
  { q: "How far is the clinic from Manikonda?", a: "Approximately 20-25 km via ORR, taking about 40-50 minutes." },
  { q: "What are the OPD timings?", a: "Mon–Sat, 10:00–16:00 (IST)." },
  { q: "Is robotic spine surgery available?", a: "We offer advanced endoscopic and minimally invasive spine surgery options." },
];

export default function ManikondaLocationPage() {
  const location = getLocationById("manikonda");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
     { name: "Neurosurgeon near Manikonda", item: `https://www.drsayuj.info/${location.slug}` },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <LocationSchema location={location} breadcrumb={breadcrumb} faq={FAQ} />

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Neurosurgeon Near Manikonda, Hyderabad</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
        Expert brain and spine surgery care accessible from Manikonda.
        Dr. Sayuj Krishnan provides advanced minimally invasive neurosurgical treatments at Yashoda Hospital, Malakpet.
      </p>

      <div className="mt-6 flex justify-center">
        <LocationCTAs location={location} />
      </div>

      <section className="grid md:grid-cols-2 gap-8 mt-10">
        <div>
          <LocationNAPCard location={location} className="mb-6" />

          <h2 className="text-2xl font-semibold">Why Choose Dr. Sayuj</h2>
          <ul className="mt-3 list-disc pl-5 space-y-1">
            <li>Endoscopic spine surgery with small incisions</li>
            <li>Minimally invasive brain tumor surgery</li>
            <li>Same-day discharge for selected procedures</li>
            <li>Faster recovery and less pain</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">Directions from Manikonda</h3>
          <p className="mt-2 text-gray-700">
            <strong>Route:</strong> Manikonda → ORR → Malakpet → Yashoda Hospital.
            Ample parking available.
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

      <LocalPathways location={location} />
    </main>
  );
}
