import React from "react";
import Link from "next/link";
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
  title: "Neurosurgeon in Gachibowli, Hyderabad | Endoscopic Spine | Dr. Sayuj Krishnan",
  description:
    "Consult Dr. Sayuj Krishnan near Gachibowli, Hyderabad for endoscopic spine & minimally invasive brain surgery. OPD timings, parking, directions, WhatsApp booking, and FAQs.",
  alternates: { canonical: "https://www.drsayuj.info/neurosurgeon-gachibowli" },
  openGraph: {
    title: "Neurosurgeon in Gachibowli, Hyderabad | Endoscopic Spine | Dr. Sayuj Krishnan",
    description: "Consult Dr. Sayuj Krishnan near Gachibowli for endoscopic spine & minimally invasive brain surgery. OPD timings, parking, directions, WhatsApp booking, and FAQs.",
    url: "https://www.drsayuj.info/neurosurgeon-gachibowli",
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
  twitter: {
    card: "summary_large_image",
    title: "Neurosurgeon in Gachibowli, Hyderabad",
    description: "Endoscopic spine and brain surgery consultations for Gachibowli patients — book via WhatsApp or call.",
    images: ["https://www.drsayuj.info/images/og-default.jpg"],
  },
};

const FAQ = [
  { q: "How far is the OPD from Gachibowli?", a: "Typically 30–45 minutes by car depending on traffic; see landmark directions below." },
  { q: "Parking availability?", a: "On-site hospital parking with valet options during peak hours." },
  { q: "Fastest way to book?", a: "WhatsApp us your MRI and symptoms; we'll confirm the earliest slot." },
];

export default function Page() {
  const location = getLocationById("gachibowli");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
     { name: "Neurosurgeon in Gachibowli", item: `https://www.drsayuj.info/${location.slug}` },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <LocationSchema location={location} breadcrumb={breadcrumb} faq={FAQ} />

      <h1 className="text-3xl md:text-4xl font-bold">Neurosurgeon in Gachibowli, Hyderabad</h1>
      <p className="mt-4 text-lg">
        Serving patients from <strong>Gachibowli</strong> and nearby localities. OPD at Yashoda Hospitals (Malakpet) with endoscopic spine expertise.
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

          <h3 className="text-xl font-semibold mt-6">Landmark Directions from Gachibowli</h3>
          <ol className="mt-3 list-decimal pl-5">
            <li>From ISB → Gachibowli Flyover → Mehdipatnam → Malakpet</li>
            <li>From Financial District → ORR → Masab Tank → Malakpet</li>
            <li>Metro: Gachibowli → Malakpet (12–18 min cab from station)</li>
          </ol>
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
