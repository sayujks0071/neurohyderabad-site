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
  title: "Neurosurgeon in Malakpet | Dr. Sayuj Krishnan",
  description: "Dr. Sayuj Krishnan - Expert Neurosurgeon at Yashoda Hospitals, Malakpet. Brain & Spine Surgery. Book Appointment.",
  // Point canonical to the root page to consolidate SEO value
  alternates: { canonical: "https://www.drsayuj.info/neurosurgeon-malakpet" },
  openGraph: {
    title: "Neurosurgeon in Malakpet | Dr. Sayuj Krishnan",
    description: "Dr. Sayuj Krishnan - Expert Neurosurgeon at Yashoda Hospitals, Malakpet. Brain & Spine Surgery.",
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
  { q: "Where is the clinic in Malakpet?", a: "Room No 317, OPD Block, Yashoda Hospitals, Nalgonda X Roads, Malakpet." },
  { q: "What are the timings?", a: "Mon-Sat: 10 AM - 4 PM." },
];

export default function MalakpetLocationPage() {
  const location = getLocationById("malakpet");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
     { name: "Neurosurgeon in Malakpet", item: `https://www.drsayuj.info/${location.slug}` },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <LocationSchema location={location} breadcrumb={breadcrumb} faq={FAQ} />

      <h1 className="text-3xl md:text-4xl font-bold">Neurosurgeon in Malakpet, Hyderabad</h1>
      <p className="mt-4 text-lg">
        Dr. Sayuj Krishnan is a leading neurosurgeon available at <strong>Yashoda Hospitals, Malakpet</strong>.
      </p>

      <div className="mt-6">
         <LocationCTAs location={location} />
      </div>

      <section className="grid md:grid-cols-2 gap-8 mt-10">
        <div>
          <LocationNAPCard location={location} className="mb-6" />

          <h2 className="text-2xl font-semibold">OPD Timings</h2>
          <ul className="mt-3 list-disc pl-5">
            <li>Mon–Sat, 10:00–16:00 (IST)</li>
            <li>Emergency 24×7 via hospital triage</li>
          </ul>
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

      <LocalPathways mode="location" locationId={location.id} />
    </main>
  );
}
