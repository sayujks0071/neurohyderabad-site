import React from "react";

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
  { q: "How far is the OPD from Banjara Hills?", a: "Typically 15–25 minutes by car depending on traffic; see landmark directions below." },
  { q: "Parking availability?", a: "On-site hospital parking with valet options during peak hours." },
  { q: "Fastest way to book?", a: "WhatsApp us your MRI and symptoms; we'll confirm the earliest slot." },
];

export default function Page() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.drsayuj.info/" },
      { "@type": "ListItem", position: 2, name: "Neurosurgeon in Banjara Hills", item: "https://www.drsayuj.info/neurosurgeon-banjara-hills" },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Dr Sayuj Krishnan - Neurosurgeon near Banjara Hills",
            "image": "https://www.drsayuj.info/images/og-default.jpg",
            "url": "https://www.drsayuj.info/neurosurgeon-banjara-hills",
            "telephone": "+919778280044",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Room No 317, OPD Block, Yashoda Hospital, Malakpet",
              "addressLocality": "Hyderabad",
              "addressRegion": "Telangana",
              "postalCode": "500036",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 17.385,
              "longitude": 78.4867
            },
            "areaServed": {
              "@type": "City",
              "name": "Banjara Hills"
            },
            "availableService": [
              { "@type": "MedicalProcedure", "name": "Endoscopic Spine Surgery" },
              { "@type": "MedicalProcedure", "name": "Awake Brain Surgery" }
            ]
          })
        }}
      />
      <h1 className="text-3xl md:text-4xl font-bold">Neurosurgeon in Banjara Hills, Hyderabad</h1>
      <p className="mt-4 text-lg">
        Serving patients from <strong>Banjara Hills</strong> and nearby localities. OPD at Yashoda Hospitals (Malakpet) with endoscopic spine expertise.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a href="https://wa.me/919778280044" className="rounded-2xl px-6 py-3 bg-green-600 text-white" aria-label="WhatsApp booking for Banjara Hills patients">WhatsApp Booking</a>
        <a href="tel:+919778280044" className="rounded-2xl px-6 py-3 border" aria-label="Call +91 9778280044">Call: +91-9778280044</a>
        <a href="/appointments" className="rounded-2xl px-6 py-3 bg-blue-600 text-white" aria-label="Book an appointment near Banjara Hills">Book Appointment</a>
        <a href="https://maps.google.com/?q=Yashoda+Hospitals+Malakpet+Hyderabad" className="rounded-2xl px-6 py-3 border" aria-label="Directions to Yashoda Hospital Malakpet">Directions</a>
      </div>

      <section className="grid md:grid-cols-2 gap-8 mt-10">
        <div>
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
          <h2 className="text-2xl font-semibold">Map</h2>
          <div className="mt-3 aspect-video w-full overflow-hidden rounded-xl border">
            <iframe
              title="Map to Yashoda Hospital for Banjara Hills patients"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.123456789!2d78.5147!3d17.3750!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99dac93a348d%3A0xc9039baf28225326!2sYashoda%20Hospital%20Malakpet!5e0!3m2!1sen!2sin!4v1234567890"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}
// Deployment trigger
// Force cache clear
