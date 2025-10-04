import React from "react";

export const metadata = {
  title: "Best Neurosurgeon in Jubilee Hills, Hyderabad | Dr. Sayuj Krishnan | Endoscopic Spine Surgery",
  description:
    "Leading neurosurgeon Dr. Sayuj Krishnan serving Jubilee Hills, Hyderabad. Expert in endoscopic spine surgery, brain tumor surgery & epilepsy treatment. 15+ years experience. Book consultation.",
  keywords: "neurosurgeon jubilee hills, brain surgeon jubilee hills, spine specialist jubilee hills, endoscopic spine surgery jubilee hills, dr sayuj krishnan jubilee hills",
  alternates: { canonical: "https://www.drsayuj.com/neurosurgeon-jubilee-hills" },
  openGraph: {
    title: "Best Neurosurgeon in Jubilee Hills, Hyderabad | Dr. Sayuj Krishnan",
    description: "Expert neurosurgeon serving Jubilee Hills with endoscopic spine surgery and minimally invasive brain surgery. 15+ years experience.",
    url: "https://www.drsayuj.com/neurosurgeon-jubilee-hills",
    type: "website",
  },
};

const FAQ = [
  { q: "How far is the OPD from Jubilee Hills?", a: "Typically 20–35 minutes by car depending on traffic; see landmark directions below." },
  { q: "Parking availability?", a: "On-site hospital parking with valet options during peak hours." },
  { q: "Fastest way to book?", a: "WhatsApp us your MRI and symptoms; we'll confirm the earliest slot." },
];

export default function Page() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.drsayuj.com/" },
      { "@type": "ListItem", position: 2, name: "Neurosurgeon in Jubilee Hills", item: "https://www.drsayuj.com/neurosurgeon-jubilee-hills" },
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
      <h1 className="text-3xl md:text-4xl font-bold">Neurosurgeon in Jubilee Hills, Hyderabad</h1>
      <p className="mt-4 text-lg">
        Serving patients from <strong>Jubilee Hills</strong> and nearby localities. OPD at Yashoda Hospitals (Malakpet) with endoscopic spine expertise.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a href="https://wa.me/919778280044" className="rounded-2xl px-6 py-3 bg-green-600 text-white">WhatsApp Booking</a>
        <a href="tel:+919778280044" className="rounded-2xl px-6 py-3 border">Call: +91-9778280044</a>
        <a href="https://maps.google.com/?q=Yashoda+Hospitals+Malakpet+Hyderabad" className="rounded-2xl px-6 py-3 border">Directions</a>
      </div>

      <section className="grid md:grid-cols-2 gap-8 mt-10">
        <div>
          <h2 className="text-2xl font-semibold">OPD Timings</h2>
          <ul className="mt-3 list-disc pl-5">
            <li>Mon–Sat, 10:00–16:00 (IST)</li>
            <li>Emergency 24×7 via hospital triage</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">Landmark Directions from Jubilee Hills</h3>
          <ol className="mt-3 list-decimal pl-5">
            <li>From Jubilee Hills Check Post → Road No. 36 → Banjara Hills → Malakpet</li>
            <li>From Film Nagar → Road No. 45 → Masab Tank → Malakpet Bridge</li>
            <li>Metro: Jubilee Hills Check Post → Malakpet (8–12 min cab from station)</li>
          </ol>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">Map</h2>
          <div className="mt-3 aspect-video w-full overflow-hidden rounded-xl border">
            <iframe
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