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
  title: "Neurosurgeon near Ameerpet, Hyderabad | Dr Sayuj Krishnan",
  description: "Expert neurosurgeon near Ameerpet. Dr Sayuj Krishnan provides advanced brain and spine surgery. Convenient access via Metro or road.",
  alternates: {
    canonical: "https://www.drsayuj.info/locations/neurosurgeon-ameerpet",
  },
  openGraph: {
    title: "Neurosurgeon near Ameerpet, Hyderabad | Dr Sayuj Krishnan",
    description: "Expert neurosurgeon near Ameerpet. Dr Sayuj Krishnan provides advanced brain and spine surgery.",
    url: "https://www.drsayuj.info/locations/neurosurgeon-ameerpet",
    type: "article",
    images: [
      {
        url: "https://www.drsayuj.info/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Sayuj Krishnan - Neurosurgeon for Ameerpet patients",
      },
    ],
  },
};

const FAQ = [
  { q: "How far is the clinic from Ameerpet?", a: "Approximately 10-12 km, 30-40 minutes by road." },
  { q: "Is it accessible by Metro?", a: "Yes, take the Metro from Ameerpet to Malakpet station (Red Line)." },
  { q: "Do you treat slipped discs?", a: "Yes, we specialize in endoscopic discectomy for slipped discs." },
];

export default function AmeerpetLocationPage() {
  const location = getLocationById("ameerpet");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
     { name: "Neurosurgeon near Ameerpet", item: `https://www.drsayuj.info/${location.slug}` },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <LocationSchema location={location} breadcrumb={breadcrumb} faq={FAQ} />

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Neurosurgeon Near Ameerpet, Hyderabad</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
        Expert brain and spine surgery care accessible from Ameerpet.
        Dr. Sayuj Krishnan provides advanced minimally invasive neurosurgical treatments.
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
            <li>Convenient Metro access from Ameerpet</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">Directions from Ameerpet</h3>
          <p className="mt-2 text-gray-700">
            <strong>Route:</strong> Ameerpet → Khairatabad → Lakdikapul → Malakpet.<br/>
            <strong>Metro:</strong> Ameerpet Station (Red Line) → Malakpet Station (Direct).
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
