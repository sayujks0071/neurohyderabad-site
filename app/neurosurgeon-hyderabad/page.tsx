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
  title: "Best Neurosurgeon Hyderabad | Endoscopic Spine Specialist",
  description:
    "Consult Dr. Sayuj Krishnan, neurosurgeon in Hyderabad. Expert in endoscopic spine & minimally invasive brain surgery. OPD timings & booking.",
  alternates: { canonical: "https://www.drsayuj.info/neurosurgeon-hyderabad" },
  openGraph: {
    title: "Best Neurosurgeon Hyderabad | Endoscopic Spine Specialist",
    description:
      "Consult Dr. Sayuj Krishnan for full endoscopic spine and minimally invasive brain surgery in Hyderabad. OPD timings, directions, and WhatsApp booking.",
    url: "https://www.drsayuj.info/neurosurgeon-hyderabad",
    type: "website",
    images: [
      {
        url: "https://www.drsayuj.info/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Sayuj Krishnan - Neurosurgeon in Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Neurosurgeon in Hyderabad | Endoscopic Spine Surgery",
    description:
      "Endoscopic spine and minimally invasive brain surgery with Dr. Sayuj Krishnan at Yashoda Hospital, Malakpet.",
    images: ["https://www.drsayuj.info/images/og-default.jpg"],
  },
};

const FAQ = [
  {
    q: "Who is an ideal candidate for endoscopic cervical discectomy?",
    a: "Patients with soft cervical disc herniation causing radiculopathy who have failed conservative care and show MRI correlation. Selection requires clinical-radiological concordance and a focused neurological exam.",
  },
  {
    q: "Endoscopic vs microdiscectomy—what's the difference?",
    a: "Endoscopic uses a keyhole portal with continuous irrigation; microdiscectomy is a tubular/micro approach. Endoscopic can reduce muscle disruption, blood loss, and post-op pain for selected indications.",
  },
  {
    q: "What is typical recovery time after endoscopic spine surgery?",
    a: "Mobilization within hours, routine activities within 3–7 days, and graded return to work by 2–3 weeks for desk jobs (varies by pathology and baseline fitness).",
  },
  {
    q: "Do you treat trigeminal neuralgia and epilepsy?",
    a: "Yes. Options include microvascular decompression (MVD) for trigeminal neuralgia and comprehensive epilepsy surgery pathways when indicated. Patients receive individualized, guideline-based counseling.",
  },
  {
    q: "Which areas of Hyderabad do you serve?",
    a: "City-wide with OPD at Yashoda Hospitals (Malakpet). Dedicated pages available for Jubilee Hills, Banjara Hills, Hitech City, Gachibowli, and Secunderabad with maps and directions.",
  },
  {
    q: "How can I book an appointment quickly?",
    a: "Tap WhatsApp for slot confirmation, share MRI/Pain timeline, and we'll allocate the nearest OPD/OT window.",
  },
];

export default function Page() {
  const location = getLocationById("hyderabad");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
      { name: "Locations", item: "https://www.drsayuj.info/locations" },
      { name: "Neurosurgeon in Hyderabad", item: "https://www.drsayuj.info/neurosurgeon-hyderabad" },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <LocationSchema location={location} breadcrumb={breadcrumb} faq={FAQ} />

      <section className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">
          Neurosurgeon in Hyderabad — Endoscopic Spine & Minimally Invasive Brain Surgery
        </h1>
        <p className="mt-4 text-lg">
          Consult <strong>Dr. Sayuj Krishnan</strong>, Consultant Neurosurgeon at Yashoda Hospitals, Malakpet.
          Focus on <strong>Full Endoscopic Spine Surgery (FESS)</strong>, cervical radiculopathy, sciatica, and
          minimally invasive brain procedures. Evidence-based, patient-first counseling with transparent risks and recovery plans.
        </p>

        <div className="mt-6">
           <LocationCTAs mode="location" locationId={location.id} />
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8 mb-10">
        <div>
           <LocationNAPCard mode="location" locationId={location.id} className="mb-6" />

          <h2 className="text-2xl font-semibold">OPD Timings & Location</h2>
          <ul className="mt-3 list-disc pl-5">
            <li>Yashoda Hospitals – Malakpet, Hyderabad</li>
            <li>OPD: Mon–Sat, 10:00–16:00 (IST) • By appointment</li>
            <li>Emergency: 24×7 via hospital triage</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Conditions & Procedures</h2>
          <ul className="mt-3 list-disc pl-5">
            <li>Endoscopic cervical & lumbar discectomy, foraminotomy, ULBD</li>
            <li>Cervical/lumbar radiculopathy, spinal stenosis, disc herniation</li>
            <li>Trigeminal neuralgia (MVD), epilepsy surgery pathways</li>
            <li><Link href="/services/brain-tumor-surgery-hyderabad" className="text-blue-600 hover:underline">Advanced Brain Tumor Surgery</Link> (Neuronavigation)</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold">Why Choose Endoscopic Spine?</h2>
        <p className="mt-3">
          Selected patients benefit from smaller access corridors, reduced muscle disruption, lower blood loss, and
          faster return to work—when indications are correct and peri-operative protocols are followed. We practice
          guideline-aligned selection and provide day-by-day recovery calendars.
        </p>
        <LocationMapEmbed location={location} className="mt-6" />
      </section>

      <section>
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
