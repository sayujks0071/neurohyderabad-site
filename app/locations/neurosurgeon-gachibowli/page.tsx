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
  title: "Neurosurgeon near Gachibowli, Hyderabad | Dr. Sayuj Krishnan",
  description: "Consult Dr. Sayuj Krishnan near Gachibowli. Expert endoscopic spine & brain surgeon. 25 min drive via ORR/Old Mumbai Hwy to Yashoda Malakpet.",
  alternates: {
    canonical: "https://www.drsayuj.info/locations/neurosurgeon-gachibowli",
  },
  openGraph: {
    title: "Neurosurgeon near Gachibowli, Hyderabad | Dr. Sayuj Krishnan",
    description: "Expert neurosurgeon near Gachibowli. Dr. Sayuj Krishnan provides advanced brain and spine surgery.",
    url: "https://www.drsayuj.info/locations/neurosurgeon-gachibowli",
    type: "article",
    images: [
      {
        url: "https://www.drsayuj.info/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Sayuj Krishnan - Neurosurgeon for Gachibowli patients",
      },
    ],
  },
};

const FAQ = [
  { q: "How far is the clinic from Gachibowli?", a: "Approx 20-30 mins via ORR or Old Mumbai Highway." },
  { q: "Do you treat IT professionals with back pain?", a: "Yes, we specialize in 'Tech Neck' and sciatica common in desk jobs." },
  { q: "Is weekend consultation available?", a: "Yes, OPD is open on Saturdays. Please book in advance." },
];

export default function GachibowliLocationPage() {
  const location = getLocationById("gachibowli");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
     { name: "Neurosurgeon near Gachibowli", item: `https://www.drsayuj.info/${location.slug}` },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <LocationSchema location={location} breadcrumb={breadcrumb} faq={FAQ} />

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Neurosurgeon Near Gachibowli, Hyderabad</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
        Serving the IT corridor of Gachibowli, Financial District, and Nanakramguda.
        Dr. Sayuj Krishnan offers world-class endoscopic spine and brain care.
      </p>

      <div className="mt-6 flex justify-center">
        <LocationCTAs location={location} />
      </div>

      <section className="grid md:grid-cols-2 gap-8 mt-10">
        <div>
          <LocationNAPCard location={location} className="mb-6" />

          <h2 className="text-2xl font-semibold">Specialized Care for IT Professionals</h2>
          <ul className="mt-3 list-disc pl-5 space-y-1">
            <li>Ergonomic advice for chronic back/neck pain</li>
            <li>Minimally Invasive Spine Surgery (MISS)</li>
            <li>Day-care procedures for quick return to work</li>
            <li>Advanced Brain Tumor management</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">Directions from Gachibowli</h3>
          <p className="mt-2 text-gray-700">
            <strong>Via ORR:</strong> Gachibowli → ORR → LB Nagar Exit → Malakpet.<br/>
            <strong>Via City:</strong> Gachibowli → Mehdipatnam → Masab Tank → Malakpet.
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
