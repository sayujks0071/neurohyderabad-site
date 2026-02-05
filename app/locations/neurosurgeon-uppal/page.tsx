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
  title: "Neurosurgeon near Uppal, Hyderabad | Dr Sayuj Krishnan",
  description: "Expert neurosurgeon near Uppal. Dr Sayuj Krishnan provides advanced brain and spine surgery. Convenient access to Yashoda Malakpet.",
  alternates: {
    canonical: "https://www.drsayuj.info/locations/neurosurgeon-uppal",
  },
  openGraph: {
    title: "Neurosurgeon near Uppal, Hyderabad | Dr Sayuj Krishnan",
    description: "Expert neurosurgeon near Uppal. Dr Sayuj Krishnan provides advanced brain and spine surgery.",
    url: "https://www.drsayuj.info/locations/neurosurgeon-uppal",
    type: "article",
    images: [
      {
        url: "https://www.drsayuj.info/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Sayuj Krishnan - Neurosurgeon for Uppal patients",
      },
    ],
  },
};

const FAQ = [
  { q: "How far is the clinic from Uppal?", a: "Approximately 8-10 km, 20-30 minutes by road." },
  { q: "Is it accessible by Metro?", a: "Yes, take the Metro from Uppal to Malakpet station (via MGBS)." },
  { q: "Do you treat spinal stenosis?", a: "Yes, we specialize in endoscopic decompression for spinal stenosis." },
];

export default function UppalLocationPage() {
  const location = getLocationById("uppal");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
     { name: "Neurosurgeon near Uppal", item: `https://www.drsayuj.info/${location.slug}` },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <LocationSchema location={location} breadcrumb={breadcrumb} faq={FAQ} />

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Neurosurgeon Near Uppal, Hyderabad</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
        Expert brain and spine surgery care accessible from Uppal.
        Dr. Sayuj Krishnan provides advanced minimally invasive neurosurgical treatments at Yashoda Malakpet.
      </p>

      <div className="mt-6 flex justify-center">
        <LocationCTAs location={location} />
      </div>

      <section className="grid md:grid-cols-2 gap-8 mt-10">
        <div>
          <LocationNAPCard location={location} className="mb-6" />

          <h2 className="text-2xl font-semibold">Why Choose Dr. Sayuj</h2>
          <ul className="mt-3 list-disc pl-5 space-y-1">
            <li>Endoscopic spine surgery expert</li>
            <li>Minimally invasive brain tumor removal</li>
            <li>Comprehensive care for head injuries</li>
            <li>Convenient access from Uppal Ring Road</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">Directions from Uppal</h3>
          <p className="mt-2 text-gray-700">
            <strong>Route:</strong> Uppal X Roads → Amberpet → Malakpet.<br/>
            <strong>Metro:</strong> Uppal Station to Malakpet Station (Blue Line change to Red Line).
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
