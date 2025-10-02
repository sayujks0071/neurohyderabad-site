import React from "react";

export const metadata = {
  title: "Endoscopic Spine Surgery in Hyderabad | Cervical & Lumbar | Dr. Sayuj Krishnan",
  description:
    "Full Endoscopic Spine Surgery (FESS) in Hyderabad for cervical/lumbar disc herniation and foraminal stenosis. Indications, technique, risks, recovery timelines, FAQs, and booking.",
  alternates: { canonical: "https://www.drsayuj.com/endoscopic-spine-surgery-hyderabad" },
};

const SECTIONS = [
  {
    title: "Who is it for?",
    body:
      "Patients with cervical or lumbar radiculopathy from soft disc herniation or focal foraminal stenosis with clinicoradiological concordance. We exclude red flags (myelopathy/instability/infection/tumor) and optimize comorbidities.",
  },
  {
    title: "Technique (Inside-out vs Outside-in)",
    body:
      "Approach is tailored to pathology/level. Endoscopic access via a working channel with continuous irrigation allows decompression under magnified vision. The choice between inside-out and outside-in depends on fragment location and foraminal anatomy.",
  },
  {
    title: "Benefits & Risks",
    body:
      "Benefits may include smaller access corridor, less muscle trauma, reduced blood loss, and shorter hospital stay. Risks include dural tear, nerve injury, dysesthesia, infection, hematoma, and symptom persistence/recurrence. All patients receive informed, documented counseling.",
  },
  {
    title: "Recovery Timeline (Typical)",
    body:
      "Ambulation within hours; discharge often within 24 hours; ADLs in 3–7 days; desk work 2–3 weeks; progressive conditioning thereafter. Individual recovery varies.",
  },
];

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
    url: "https://www.drsayuj.com/endoscopic-spine-surgery-hyderabad",
    medicalSpecialty: "Neurosurgery",
    performer: {
      "@type": "Physician",
      name: "Dr. Sayuj Krishnan",
      url: "https://www.drsayuj.com",
    },
    areaServed: ["Hyderabad", "Telangana", "India"],
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.drsayuj.com/" },
      { "@type": "ListItem", position: 2, name: "Endoscopic Spine Surgery in Hyderabad", item: "https://www.drsayuj.com/endoscopic-spine-surgery-hyderabad" },
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

      <section className="space-y-8 mb-10">
        {SECTIONS.map((s) => (
          <article key={s.title}>
            <h2 className="text-2xl font-semibold">{s.title}</h2>
            <p className="mt-3">{s.body}</p>
          </article>
        ))}
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}
