import React from "react";

// Force static generation
export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 86400;

export const metadata = {
  title: "Neurosurgeon in Hitech City, Hyderabad | Endoscopic Spine | Dr. Sayuj Krishnan",
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
    title: "Neurosurgeon in Hitech City, Hyderabad | Endoscopic Spine | Dr. Sayuj Krishnan",
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
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.drsayuj.info/" },
      { "@type": "ListItem", position: 2, name: "Neurosurgeon in Hitech City", item: "https://www.drsayuj.info/neurosurgeon-hitech-city" },
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
            "name": "Dr Sayuj Krishnan - Neurosurgeon near Hitech City",
            "image": "https://www.drsayuj.info/images/og-default.jpg",
            "url": "https://www.drsayuj.info/neurosurgeon-hitech-city",
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
              "name": "Hitech City"
            },
            "availableService": [
              { "@type": "MedicalProcedure", "name": "Endoscopic Spine Surgery" },
              { "@type": "MedicalProcedure", "name": "Awake Brain Surgery" }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h1 className="text-3xl md:text-4xl font-bold">Neurosurgeon in Hitech City, Hyderabad</h1>
      <p className="mt-4 text-lg">
        Serving patients from <strong>Hitech City</strong> and nearby localities. OPD at Yashoda Hospitals (Malakpet) with endoscopic spine expertise.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a href="https://wa.me/919778280044" className="rounded-2xl px-6 py-3 bg-green-600 text-white">WhatsApp Booking</a>
        <a href="tel:+919778280044" className="rounded-2xl px-6 py-3 border">Call: +91-9778280044</a>
        <a href="/appointments" className="rounded-2xl px-6 py-3 bg-blue-600 text-white">Book Appointment</a>
        <a href="https://maps.google.com/?q=Yashoda+Hospitals+Malakpet+Hyderabad" className="rounded-2xl px-6 py-3 border">Directions</a>
      </div>

      <section className="grid md:grid-cols-2 gap-8 mt-10">
        <div>
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
          <h2 className="text-2xl font-semibold">Map</h2>
          <div className="mt-3 aspect-video w-full overflow-hidden rounded-xl border">
            <iframe
              title="Map to Yashoda Hospital for Hitech City patients"
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

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Popular services for Hitech City patients</h2>
        <ul className="mt-4 space-y-2 list-disc list-inside">
          <li><a className="text-blue-700 hover:underline" href="/services/endoscopic-spine-surgery-hyderabad/">Endoscopic Spine Surgery (same-day discharge)</a></li>
          <li><a className="text-blue-700 hover:underline" href="/services/brain-tumor-surgery-hyderabad/">Brain Tumor Surgery with neuronavigation</a></li>
          <li><a className="text-blue-700 hover:underline" href="/services/epilepsy-surgery-hyderabad/">Epilepsy Surgery programme</a></li>
          <li><a className="text-blue-700 hover:underline" href="/services/spine-surgery-hyderabad/">Comprehensive Spine Surgery & fusion options</a></li>
        </ul>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Dr Sayuj Krishnan - Neurosurgeon near Hitech City",
            "image": "https://www.drsayuj.info/images/og-default.jpg",
            "url": "https://www.drsayuj.info/neurosurgeon-hitech-city",
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
              "name": "Hyderabad",
              "containsPlace": { "@type": "Place", "name": "Hitech City" }
            },
            "availableService": [
              { "@type": "MedicalProcedure", "name": "Endoscopic Spine Surgery" },
              { "@type": "MedicalProcedure", "name": "Awake Brain Surgery" },
              { "@type": "MedicalProcedure", "name": "Spine Fusion" }
            ]
          })
        }}
      />
    </main>
  );
}
// Force deployment
