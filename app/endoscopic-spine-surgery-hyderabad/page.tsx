import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Endoscopic Spine Surgery in Hyderabad | Cervical & Lumbar | Dr. Sayuj Krishnan",
  description:
    "Full Endoscopic Spine Surgery (FESS) in Hyderabad for cervical/lumbar disc herniation and foraminal stenosis. Indications, technique, risks, recovery timelines, FAQs, and booking.",
  alternates: { canonical: "https://www.drsayuj.info/endoscopic-spine-surgery-hyderabad" },
};

const FAQ = [
  {
    q: "Is endoscopic surgery always better than microdiscectomy?",
    a: "Not always. It depends on the exact pathology, level, and surgeon judgment. We select the approach that maximizes safety and outcomes for your case.",
  },
  {
    q: "Will I need a collar or belt?",
    a: "Typically not for routine endoscopic discectomy/foraminotomy unless there is instability or surgeon-specific protocol.",
  },
  {
    q: "What imaging do I need?",
    a: "MRI with appropriate sequences; at times dynamic X-rays/CT are recommended for bony evaluation or to exclude instability.",
  },
  {
    q: "What are the chances of recurrence?",
    a: "Recurrence is possible with any decompression. We counsel on posture, ergonomics, core activation, and graded return to activity.",
  },
];

export default function Page() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "Endoscopic Spine Surgery",
    alternateName: "Full Endoscopic Spine Surgery (FESS)",
    bodyLocation: ["Cervical spine", "Lumbar spine"],
    url: "https://www.drsayuj.info/endoscopic-spine-surgery-hyderabad",
    medicalSpecialty: "Neurosurgery",
    performer: {
      "@type": "Physician",
      name: "Dr. Sayuj Krishnan",
      url: "https://www.drsayuj.info",
    },
    areaServed: ["Hyderabad", "Telangana", "India"],
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.drsayuj.info/" },
      { "@type": "ListItem", position: 2, name: "Endoscopic Spine Surgery in Hyderabad", item: "https://www.drsayuj.info/endoscopic-spine-surgery-hyderabad" },
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
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Endoscopic Spine Surgery in Hyderabad</h1>
        <p className="mt-4 text-lg">
          Comprehensive endoscopic cervical and lumbar solutions for radiculopathy and foraminal stenosis. We prioritize precise selection,
          minimally invasive access, and structured recovery planning.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://wa.me/919778280044?text=Hi%20I%20need%20endoscopic%20spine%20consultation"
            className="rounded-2xl px-6 py-3 bg-green-600 text-white"
          >
            WhatsApp Consultation
          </a>
          <a href="tel:+919778280044" className="rounded-2xl px-6 py-3 border">
            Call: +91-9778280044
          </a>
          <a href="https://maps.google.com/?q=Yashoda+Hospitals+Malakpet+Hyderabad" className="rounded-2xl px-6 py-3 border">
            Directions (Google Maps)
          </a>
        </div>
      </header>

      {/* Trust & Expertise Section */}
      <section className="mb-10 bg-blue-50 p-6 rounded-2xl border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-900">Why Choose Dr. Sayuj Krishnan for Endoscopic Spine Surgery?</h2>
        <ul className="mt-4 space-y-4">
          <li className="flex gap-3">
            <span className="text-xl">✅</span>
            <span>
              <strong>Specialized Training:</strong> <Link href="/about" className="text-blue-700 hover:underline">German-trained neurosurgeon</Link> with extensive experience in minimally invasive techniques.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-xl">✅</span>
            <span>
              <strong>Minimally Invasive Expertise:</strong> Specializing in <Link href="/spine-surgery" className="text-blue-700 hover:underline">Full Endoscopic Spine Surgery (FESS)</Link> which allows for smaller incisions (less than 1cm) and faster recovery compared to traditional open surgery.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-xl">✅</span>
            <span>
              <strong>Advanced Facility:</strong> Procedures are performed at <Link href="/locations/malakpet" className="text-blue-700 hover:underline">Yashoda Hospitals, Malakpet</Link>, equipped with state-of-the-art endoscopic visualization systems.
            </span>
          </li>
        </ul>
      </section>

      <section className="space-y-8 mb-10">
        <article>
          <h2 className="text-2xl font-semibold">Who is it for?</h2>
          <p className="mt-3">
            Patients with <Link href="/conditions/cervical-radiculopathy-treatment-hyderabad" className="text-blue-600 hover:underline">cervical radiculopathy</Link> or lumbar radiculopathy from soft disc herniation or focal foraminal stenosis with clinicoradiological concordance. We exclude red flags (myelopathy/instability/infection/tumor) and optimize comorbidities.
          </p>
          <p className="mt-2 text-gray-600 text-sm">
            Not sure if you are a candidate? See our guide on <Link href="/conditions/slip-disc-treatment-hyderabad" className="text-blue-600 hover:underline">Slip Disc Treatment</Link>.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold">Technique (Inside-out vs Outside-in)</h2>
          <p className="mt-3">
            Approach is tailored to pathology/level. Endoscopic access via a working channel with continuous irrigation allows decompression under magnified vision. The choice between inside-out and outside-in depends on fragment location and foraminal anatomy.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold">Benefits & Risks</h2>
          <p className="mt-3">
            Benefits may include smaller access corridor, less muscle trauma, reduced blood loss, and shorter hospital stay. Risks include dural tear, nerve injury, dysesthesia, infection, hematoma, and symptom persistence/recurrence. All patients receive informed, documented counseling.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold">Recovery Timeline (Typical)</h2>
          <p className="mt-3">
            Ambulation within hours; discharge often within 24 hours; ADLs in 3–7 days; desk work 2–3 weeks; progressive conditioning thereafter. Individual recovery varies.
          </p>
        </article>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">FAQs</h2>
        <div className="mt-4 space-y-4">
          {FAQ.map(({ q, a }) => (
            <details key={q} className="rounded-xl border p-4 group">
              <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                {q}
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-2 text-gray-700">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-10 p-6 border rounded-2xl bg-gray-50 text-center">
         <h2 className="text-xl font-bold">Need a Second Opinion?</h2>
         <p className="mt-2 text-gray-600">Consult Dr. Sayuj Krishnan to verify if you are a candidate for endoscopic surgery.</p>
         <div className="mt-4">
            <Link href="/contact" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
               Book Appointment
            </Link>
         </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}
