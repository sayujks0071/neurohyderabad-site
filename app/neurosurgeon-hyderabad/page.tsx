import React from "react";
import { SITE_URL } from '../../src/lib/seo';

export const metadata = {
  title: "Best Neurosurgeon in Hyderabad | Endoscopic Spine Surgery | Dr. Sayuj Krishnan",
  description:
    "Consult Dr. Sayuj Krishnan, neurosurgeon in Hyderabad specializing in full endoscopic spine & minimally invasive brain surgery. OPD timings, directions, FAQs, and WhatsApp booking.",
  alternates: { canonical: "https://www.drsayuj.info/neurosurgeon-hyderabad" },
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
  const physicianSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: "Dr. Sayuj Krishnan",
    medicalSpecialty: [
      "Neurosurgery",
      "Endoscopic Spine Surgery",
      "Minimally Invasive Brain Surgery",
    ],
    url: "https://www.drsayuj.info",
    image: "https://www.drsayuj.info/images/og-default.jpg",
    telephone: "+919778280044",
    areaServed: ["Hyderabad", "Telangana", "India"],
    sameAs: [
      "https://www.yashodahospitals.com/doctors/dr-sayuj-krishnan/",
      "https://www.practo.com/hyderabad/doctor/dr-sayuj-krishnan-neurosurgeon",
      "https://www.facebook.com/drsayujkrishnan",
      "https://www.youtube.com/@drsayujkrishnan",
      "https://www.linkedin.com/in/dr-sayuj-krishnan",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Yashoda Hospitals, Malakpet",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500036",
      addressCountry: "IN",
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.drsayuj.info/" },
      { "@type": "ListItem", position: 2, name: "Neurosurgeon in Hyderabad", item: "https://www.drsayuj.info/neurosurgeon-hyderabad" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <section className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">
          Neurosurgeon in Hyderabad — Endoscopic Spine & Minimally Invasive Brain Surgery
        </h1>
        <p className="mt-4 text-lg">
          Consult <strong>Dr. Sayuj Krishnan</strong>, Consultant Neurosurgeon at Yashoda Hospitals, Malakpet.
          Focus on <strong>Full Endoscopic Spine Surgery (FESS)</strong>, cervical radiculopathy, sciatica, and
          minimally invasive brain procedures. Evidence-based, patient-first counseling with transparent risks and recovery plans.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://wa.me/919778280044?text=Hi%20I%20want%20to%20book%20an%20appointment"
            className="rounded-2xl px-6 py-3 bg-green-600 text-white"
          >
            WhatsApp Booking
          </a>
          <a href="tel:+919778280044" className="rounded-2xl px-6 py-3 border">
            Call: +91-9778280044
          </a>
          <a href="https://maps.google.com/?q=Yashoda+Hospitals+Malakpet+Hyderabad" className="rounded-2xl px-6 py-3 border">
            Directions (Google Maps)
          </a>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8 mb-10">
        <div>
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}
