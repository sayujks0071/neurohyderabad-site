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
  title: "Neurosurgeon near Kothapet, Hyderabad | Dr Sayuj Krishnan",
  description: "Expert neurosurgeon near Kothapet. Dr Sayuj Krishnan is just 5 minutes away at Yashoda Malakpet. Advanced spine & brain care.",
  alternates: {
    canonical: "https://www.drsayuj.info/locations/neurosurgeon-kothapet",
  },
  openGraph: {
    title: "Neurosurgeon near Kothapet, Hyderabad | Dr Sayuj Krishnan",
    description: "Expert neurosurgeon near Kothapet. Dr Sayuj Krishnan is just 5 minutes away at Yashoda Malakpet.",
    url: "https://www.drsayuj.info/locations/neurosurgeon-kothapet",
    type: "article",
    images: [
      {
        url: "https://www.drsayuj.info/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Sayuj Krishnan - Neurosurgeon for Kothapet patients",
      },
    ],
  },
};

const FAQ = [
  { q: "How far is the clinic from Kothapet?", a: "Very close. It is just 2-3 km (5-10 mins) from Kothapet circle." },
  { q: "Is emergency care available?", a: "Yes, Yashoda Malakpet has 24/7 emergency neurosurgery services." },
  { q: "Do you treat sciatica?", a: "Yes, we offer advanced sciatica treatment including endoscopic surgery." },
];

export default function KothapetLocationPage() {
  const location = getLocationById("kothapet");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
     { name: "Neurosurgeon near Kothapet", item: `https://www.drsayuj.info/${location.slug}` },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <LocationSchema location={location} breadcrumb={breadcrumb} faq={FAQ} />

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Neurosurgeon Near Kothapet, Hyderabad</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
        Conveniently located near Kothapet, Dr. Sayuj Krishnan offers expert neurosurgical consultations at Yashoda Malakpet.
      </p>

      <div className="mt-6 flex justify-center">
        <LocationCTAs location={location} />
      </div>

      <section className="grid md:grid-cols-2 gap-8 mt-10">
        <div>
          <LocationNAPCard location={location} className="mb-6" />

          <h2 className="text-2xl font-semibold">Why Patients Choose Us</h2>
          <ul className="mt-3 list-disc pl-5 space-y-1">
            <li>Extremely close proximity to Kothapet & Dilsukhnagar</li>
            <li>Leading Spine Surgeon in Hyderabad</li>
            <li>Advanced facilities at Yashoda Hospitals</li>
            <li>Quick appointments for local residents</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">Directions from Kothapet</h3>
          <p className="mt-2 text-gray-700">
            <strong>By Road:</strong> Drive towards Nalgonda X Roads via Dilsukhnagar. We are right at the junction.<br/>
            <strong>By Metro:</strong> Take Red Line from Victoria Memorial/Chaitanyapuri to Malakpet Station.
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
