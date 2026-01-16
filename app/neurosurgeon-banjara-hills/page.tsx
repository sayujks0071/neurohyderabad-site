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
  title: "Neurosurgeon in Banjara Hills, Hyderabad | Endoscopic Spine | Dr. Sayuj Krishnan",
  description:
    "Consult Dr. Sayuj Krishnan near Banjara Hills, Hyderabad for endoscopic spine & minimally invasive brain surgery. OPD timings, parking, directions, WhatsApp booking, and FAQs.",
  alternates: { canonical: "https://www.drsayuj.info/neurosurgeon-banjara-hills" },
  openGraph: {
    title: "Neurosurgeon in Banjara Hills, Hyderabad | Endoscopic Spine | Dr. Sayuj Krishnan",
    description: "Consult Dr. Sayuj Krishnan near Banjara Hills for endoscopic spine & minimally invasive brain surgery. OPD timings, parking, directions, WhatsApp booking, and FAQs.",
    url: "https://www.drsayuj.info/neurosurgeon-banjara-hills",
    type: "article",
    images: [
      {
        url: "https://www.drsayuj.info/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Sayuj Krishnan - Neurosurgeon for Banjara Hills patients",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neurosurgeon in Banjara Hills, Hyderabad",
    description: "Endoscopic spine and brain surgery consultations for Banjara Hills patients — book via WhatsApp or call.",
    images: ["https://www.drsayuj.info/images/og-default.jpg"],
  },
};

const FAQ = [
  { question: "How far is the OPD from Banjara Hills?", answer: "Typically 15–25 minutes by car depending on traffic; see landmark directions below." },
  { question: "Parking availability?", answer: "On-site hospital parking with valet options during peak hours." },
  { question: "Fastest way to book?", answer: "WhatsApp us your MRI and symptoms; we'll confirm the earliest slot." },
];

export default function Page() {
  const location = getLocationById("banjara-hills");

  if (!location) {
    return notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <LocationSchema
         location={location}
         faq={FAQ}
      />

      <h1 className="text-3xl md:text-4xl font-bold">Neurosurgeon in Banjara Hills, Hyderabad</h1>
      <p className="mt-4 text-lg">
        Serving patients from <strong>Banjara Hills</strong> and nearby localities. OPD at Yashoda Hospitals (Malakpet) with endoscopic spine expertise.
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

          <h3 className="text-xl font-semibold mt-6">Landmark Directions from Banjara Hills</h3>
          <ol className="mt-3 list-decimal pl-5">
            <li>From Road No. 1 → Road No. 12 → Masab Tank → Malakpet</li>
            <li>From GVK One Mall → Road No. 45 → Malakpet Bridge</li>
            <li>Metro: Banjara Hills → Malakpet (5–8 min cab from station)</li>
          </ol>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Map</h2>
          <LocationMapEmbed mode="location" locationId={location.id} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">FAQs</h2>
        <div className="mt-4 space-y-4">
          {FAQ.map(({ question, answer }) => (
            <details key={question} className="rounded-xl border p-4">
              <summary className="font-medium">{question}</summary>
              <p className="mt-2">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="mt-12">
        <LocalPathways mode="location" locationId={location.id} />
      </div>
    </main>
  );
}
