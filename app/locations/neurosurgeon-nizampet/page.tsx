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
  title: "Neurosurgeon near Nizampet, Hyderabad | Dr Sayuj Krishnan",
  description: "Expert neurosurgeon near Nizampet. Dr Sayuj Krishnan provides advanced brain and spine surgery with minimally invasive techniques.",
  alternates: {
    canonical: "https://www.drsayuj.info/locations/neurosurgeon-nizampet",
  },
  openGraph: {
    title: "Neurosurgeon near Nizampet, Hyderabad | Dr Sayuj Krishnan",
    description: "Expert neurosurgeon near Nizampet. Dr Sayuj Krishnan provides advanced brain and spine surgery with minimally invasive techniques.",
    url: "https://www.drsayuj.info/locations/neurosurgeon-nizampet",
    type: "article",
    images: [
      {
        url: "https://www.drsayuj.info/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Sayuj Krishnan - Neurosurgeon for Nizampet patients",
      },
    ],
  },
};

const FAQ = [
  { q: "How far is the clinic from Nizampet?", a: "Approximately 30-35 km, taking 50-70 minutes depending on traffic." },
  { q: "What conditions are treated?", a: "We treat slip discs, spinal stenosis, brain tumors, trigeminal neuralgia, and more." },
  { q: "Is emergency surgery available?", a: "Yes, 24/7 emergency neurosurgery is available at Yashoda Hospital, Malakpet." },
];

export default function NizampetLocationPage() {
  const location = getLocationById("nizampet");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
     { name: "Neurosurgeon near Nizampet", item: `https://www.drsayuj.info/${location.slug}` },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <LocationSchema location={location}  faq={FAQ} />

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Neurosurgeon Near Nizampet, Hyderabad</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
        Expert brain and spine surgery care accessible from Nizampet.
        Dr. Sayuj Krishnan provides advanced minimally invasive neurosurgical treatments.
      </p>

      <div className="mt-6 flex justify-center">
        <LocationCTAs mode="location" locationId={location.id} />
      </div>

      <section className="grid md:grid-cols-2 gap-8 mt-10">
        <div>
          <LocationNAPCard mode="location" locationId={location.id} className="mb-6" />

          <h2 className="text-2xl font-semibold">Why Choose Dr. Sayuj</h2>
          <ul className="mt-3 list-disc pl-5 space-y-1">
            <li>Endoscopic spine surgery (keyhole surgery)</li>
            <li>Advanced brain tumor treatment</li>
            <li>Minimal recovery time</li>
            <li>Experienced in complex neurosurgical cases</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">Directions from Nizampet</h3>
          <p className="mt-2 text-gray-700">
            <strong>Route:</strong> Nizampet → ORR → Malakpet → Yashoda Hospital.
            <br/>
            <strong>Metro:</strong> Accessible via Metro (transfer to Red Line).
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Map</h2>
          <LocationMapEmbed mode="location" locationId={location.id} />
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

      <LocalPathways mode="location" locationId={location.id} />
    </main>
  );
}
