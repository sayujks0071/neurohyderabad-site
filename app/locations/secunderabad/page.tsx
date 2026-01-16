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
  title: "Neurosurgeon in Secunderabad | Dr. Sayuj Krishnan",
  description: "Consult Dr. Sayuj Krishnan near Secunderabad for endoscopic spine & minimally invasive brain surgery. OPD timings, parking, directions.",
  // Point canonical to the root page to consolidate SEO value
  alternates: { canonical: "https://www.drsayuj.info/neurosurgeon-secunderabad" },
  openGraph: {
    title: "Neurosurgeon in Secunderabad | Dr. Sayuj Krishnan",
    description: "Consult Dr. Sayuj Krishnan near Secunderabad for endoscopic spine & minimally invasive brain surgery. OPD timings, parking, directions.",
    url: "https://www.drsayuj.info/neurosurgeon-secunderabad",
    type: "article",
    images: [
      {
        url: "https://www.drsayuj.info/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Sayuj Krishnan - Neurosurgeon for Secunderabad patients",
      },
    ],
  },
};

const FAQ = [
  { q: "How far is the OPD from Secunderabad?", a: "Yashoda Malakpet is about 8-10 km from Secunderabad station (approx 20-30 mins)." },
  { q: "Do you treat brain tumors?", a: "Yes, we specialize in minimally invasive brain tumor surgery." },
];

export default function SecunderabadLocationPage() {
  const location = getLocationById("secunderabad");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
     { name: "Neurosurgeon in Secunderabad", item: `https://www.drsayuj.info/${location.slug}` },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <LocationSchema location={location} breadcrumb={breadcrumb} faq={FAQ} />

      <h1 className="text-3xl md:text-4xl font-bold">Neurosurgeon in Secunderabad</h1>
      <p className="mt-4 text-lg">
        Serving patients from <strong>Secunderabad</strong> and nearby localities. OPD at Yashoda Hospitals (Malakpet) with endoscopic spine expertise.
      </p>

      <div className="mt-6">
         <LocationCTAs mode="location" locationId={location.id} />
      </div>

      <section className="grid md:grid-cols-2 gap-8 mt-10">
        <div>
          <LocationNAPCard mode="location" locationId={location.id} className="mb-6" />

          <h2 className="text-2xl font-semibold">OPD Timings</h2>
          <ul className="mt-3 list-disc pl-5">
            <li>Mon–Sat, 10:00–16:00 (IST)</li>
            <li>Emergency 24×7 via hospital triage</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">Directions from Secunderabad</h3>
          <p className="mt-3">
            From Secunderabad Station → Mettuguda → Tarnaka → Amberpet → Malakpet.
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
