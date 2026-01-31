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
  title: "Neurosurgeon in Dilsukhnagar, Hyderabad | Dr Sayuj Krishnan",
  description: "Expert neurosurgeon near Dilsukhnagar. Dr Sayuj Krishnan offers advanced spine & brain care at Yashoda Malakpet, just minutes away.",
  alternates: {
    canonical: "https://www.drsayuj.info/locations/neurosurgeon-dilsukhnagar",
  },
  openGraph: {
    title: "Neurosurgeon in Dilsukhnagar, Hyderabad | Dr Sayuj Krishnan",
    description: "Expert neurosurgeon near Dilsukhnagar. Dr Sayuj Krishnan offers advanced spine & brain care at Yashoda Malakpet.",
    url: "https://www.drsayuj.info/locations/neurosurgeon-dilsukhnagar",
    type: "article",
    images: [
      {
        url: "https://www.drsayuj.info/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Sayuj Krishnan - Neurosurgeon for Dilsukhnagar patients",
      },
    ],
  },
};

const FAQ = [
  { q: "How far is the clinic from Dilsukhnagar?", a: "Dr. Sayuj Krishnan's clinic at Yashoda Malakpet is extremely close to Dilsukhnagar, just a 5-10 minute drive." },
  { q: "Is emergency care available?", a: "Yes, Yashoda Malakpet has 24/7 emergency neurosurgery services and is the nearest major trauma center for Dilsukhnagar." },
  { q: "Do you treat sciatica and slip disc?", a: "Yes, we offer advanced sciatica treatment including endoscopic surgery which is a daycare procedure." },
  { q: "Is there a spine specialist near Dilsukhnagar Metro?", a: "Yes, you can easily reach us via the Red Line Metro. Alight at Malakpet Station, which is directly connected to Dilsukhnagar." },
];

export default function DilsukhnagarLocationPage() {
  const location = getLocationById("dilsukhnagar");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
     { name: "Neurosurgeon in Dilsukhnagar", item: `https://www.drsayuj.info/${location.slug}` },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <LocationSchema location={location} breadcrumb={breadcrumb} faq={FAQ} />

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Best Neurosurgeon in Dilsukhnagar & Malakpet</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
        Residents of Dilsukhnagar can access world-class neurosurgical care just minutes away. Dr. Sayuj Krishnan specializes in endoscopic spine surgery and complex brain procedures.
      </p>

      <div className="mt-6 flex justify-center">
        <LocationCTAs location={location} />
      </div>

      <section className="grid md:grid-cols-2 gap-8 mt-10">
        <div>
          <LocationNAPCard location={location} className="mb-6" />

          <h2 className="text-2xl font-semibold">Why Choose Dr. Sayuj Krishnan?</h2>
          <ul className="mt-3 list-disc pl-5 space-y-1">
            <li>Nearest advanced neurosurgery center for Dilsukhnagar residents</li>
            <li>Fellowship-trained in Endoscopic Spine Surgery</li>
            <li>15+ Years of Experience in Neurosurgery</li>
            <li>Advanced facilities at Yashoda Hospitals (24/7 Emergency)</li>
          </ul>

          <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl">
            <h3 className="text-lg font-semibold text-red-800">⚠️ When to see a Neurosurgeon immediately?</h3>
            <ul className="mt-2 text-sm text-red-700 list-disc pl-4 space-y-1">
              <li>Sudden, severe headache ("worst headache of life")</li>
              <li>Weakness or numbness in one side of the body</li>
              <li>Loss of bladder or bowel control (Cauda Equina Syndrome)</li>
              <li>Head injury with vomiting or loss of consciousness</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-6">Directions from Dilsukhnagar</h3>
          <p className="mt-2 text-gray-700">
            <strong>By Road:</strong> Drive towards Nalgonda X Roads via NH65. We are located at the Malakpet junction.<br/>
            <strong>By Metro:</strong> Take the Red Line from Dilsukhnagar Metro Station. Alight at Malakpet Station (just 2 stops away).
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
