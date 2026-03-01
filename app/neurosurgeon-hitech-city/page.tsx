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
  title: "Neurosurgeon in Hitech City | Endoscopic Spine | Dr. Sayuj",
  description:
    "Consult Dr. Sayuj Krishnan near Hitech City, Hyderabad for endoscopic spine & minimally invasive brain surgery. OPD timings, parking, directions, WhatsApp booking, and FAQs.",
  keywords: [
    "neurosurgeon hitech city",
    "brain surgeon hitech city",
    "spine surgeon hitech city",
    "endoscopic spine surgery hyderabad",
    "minimally invasive spine surgery hyderabad",
    "neurosurgeon near cyber towers"
  ],
  alternates: { canonical: "https://www.drsayuj.info/neurosurgeon-hitech-city" },
  openGraph: {
    title: "Neurosurgeon in Hitech City | Endoscopic Spine | Dr. Sayuj",
    description:
      "Consult Dr. Sayuj Krishnan near Hitech City for endoscopic spine and minimally invasive brain surgery with OPD timings, parking, directions, and WhatsApp booking.",
    url: "https://www.drsayuj.info/neurosurgeon-hitech-city",
    type: "article",
    images: [
      {
        url: "https://www.drsayuj.info/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Sayuj Krishnan - Neurosurgeon for Hitech City patients",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neurosurgeon in Hitech City, Hyderabad | Endoscopic Spine",
    description:
      "Endoscopic spine and brain surgery consultations for Hitech City patients — book via WhatsApp or call.",
    images: ["https://www.drsayuj.info/images/og-default.jpg"],
  },
};

const FAQ = [
  { q: "How far is the OPD from Hitech City?", a: "Typically 25–40 minutes by car depending on traffic; see landmark directions below." },
  { q: "Parking availability?", a: "On-site hospital parking with valet options during peak hours." },
  { q: "Fastest way to book?", a: "WhatsApp us your MRI and symptoms; we'll confirm the earliest slot." },
];

export default function Page() {
  const location = getLocationById("hitech-city");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
     { name: "Neurosurgeon in Hitech City", item: `https://www.drsayuj.info/${location.slug}` },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <LocationSchema location={location}  faq={FAQ} />

      <h1 className="text-3xl md:text-4xl font-bold">Neurosurgeon in Hitech City, Hyderabad</h1>
      <p className="mt-4 text-lg">
        Serving patients from <strong>Hitech City</strong> and nearby localities. OPD at Yashoda Hospitals (Malakpet) with endoscopic spine expertise.
      </p>

      <div className="mt-6">
         <LocationCTAs location={location} />
      </div>

      <section className="mt-10 bg-blue-50 p-6 rounded-2xl border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-900">Why Travel from Hitech City to Malakpet?</h2>
        <p className="mt-3 text-lg text-gray-700">
          We understand that travelling from Hitech City/Madhapur to Malakpet can take 45–60 minutes.
          However, many patients choose this commute for <strong>Endoscopic Spine Surgery</strong> because:
        </p>
        <ul className="mt-4 space-y-3 list-none pl-0">
          <li className="flex gap-3">
             <span className="text-blue-600 font-bold">✓</span>
             <span><strong>Specialised Expertise:</strong> Dr. Sayuj is a German-trained specialist in <Link href="/services/endoscopic-spine-surgery-hyderabad" className="text-blue-600 underline font-semibold">keyhole spine surgery</Link>, a technique not universally available.</span>
          </li>
          <li className="flex gap-3">
             <span className="text-blue-600 font-bold">✓</span>
             <span><strong>Same-Day Discharge:</strong> You travel once for the procedure and are typically back home in Hitech City the same evening, avoiding a 3-day hospital stay.</span>
          </li>
          <li className="flex gap-3">
             <span className="text-blue-600 font-bold">✓</span>
             <span><strong>Transparent Pricing:</strong> Our <Link href="/blog/cost-of-endoscopic-spine-surgery-hyderabad" className="text-blue-600 underline hover:text-blue-800">cost packages</Link> offer significant value compared to corporate hospitals in the financial district.</span>
          </li>
        </ul>
        <div className="mt-6">
           <Link href="/spine-surgery" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
             View Endoscopic Procedures
           </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8 mt-10">
        <div>
          <LocationNAPCard location={location} className="mb-6" />

          <h2 className="text-2xl font-semibold">OPD Timings</h2>
          <ul className="mt-3 list-disc pl-5">
            <li>Mon–Sat, 10:00–16:00 (IST)</li>
            <li>Emergency 24×7 via hospital triage</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">Landmark Directions from Hitech City</h3>
          <ol className="mt-3 list-decimal pl-5">
            <li>From Cyber Towers → Gachibowli → Mehdipatnam → Malakpet</li>
            <li>From Mindspace → Financial District → Masab Tank → Malakpet</li>
            <li>Metro: Hitech City → Malakpet (10–15 min cab from station)</li>
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

      <LocalPathways mode="location" locationId={location.id} />
    </main>
  );
}
