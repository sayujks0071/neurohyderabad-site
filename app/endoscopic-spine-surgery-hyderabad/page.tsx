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
          <p className="mt-3 text-lg">
            Endoscopic spine surgery is an advanced option for patients suffering from persistent pain due to nerve compression. It is highly effective for conditions where conservative care (medication, physiotherapy) has not provided relief. Common indications include:
          </p>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl border">
              <h3 className="font-semibold text-blue-900">Lumbar Conditions</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li>• <Link href="/conditions/sciatica-treatment-hyderabad" className="text-blue-600 hover:underline">Sciatica (Leg Pain)</Link></li>
                <li>• <Link href="/conditions/slip-disc-treatment-hyderabad" className="text-blue-600 hover:underline">Lumbar Disc Herniation</Link></li>
                <li>• <Link href="/conditions/spinal-stenosis-treatment-hyderabad" className="text-blue-600 hover:underline">Lumbar Canal Stenosis</Link></li>
                <li>• Foraminal Stenosis</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border">
              <h3 className="font-semibold text-blue-900">Cervical Conditions</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li>• <Link href="/conditions/cervical-radiculopathy-treatment-hyderabad" className="text-blue-600 hover:underline">Cervical Radiculopathy</Link> (Arm Pain)</li>
                <li>• Cervical Disc Herniation</li>
                <li>• Foraminal narrowing causing nerve root compression</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-gray-600 text-sm">
            Not sure if you are a candidate? See our guide on <Link href="/conditions/slip-disc-treatment-hyderabad" className="text-blue-600 hover:underline">Slip Disc Treatment</Link>.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold">Procedure Steps: How It Works</h2>
          <div className="mt-4 space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold">Preparation & Anesthesia</h3>
                <p className="text-gray-700 text-sm">The procedure is typically done under local anesthesia with conscious sedation or general anesthesia, depending on the complexity. You remain comfortable throughout.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold">Incision & Access</h3>
                <p className="text-gray-700 text-sm">A tiny incision (&lt; 1cm) is made. A dilator and tubular retractor are inserted to gently move muscles aside rather than cutting them.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold">Decompression</h3>
                <p className="text-gray-700 text-sm">An endoscope with a high-definition camera is introduced. Using specialized micro-instruments, Dr. Sayuj precisely removes the herniated disc fragment or bone spur compressing the nerve.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-semibold">Closure & Recovery</h3>
                <p className="text-gray-700 text-sm">The instruments are removed, and the small incision is closed with a stitch or skin glue. Most patients walk within hours and go home the same day or next day.</p>
              </div>
            </div>
          </div>
        </article>

        <article className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">Cost of Endoscopic Spine Surgery in Hyderabad</h2>
          <p className="mt-3 text-gray-700">
            The cost of endoscopic spine surgery in Hyderabad is generally affordable compared to traditional open surgery due to the shorter hospital stay and reduced medication requirements. However, the exact package varies based on several factors:
          </p>
          <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700">
            <li><strong>Hospital Category:</strong> Room type (General, Sharing, Single, Suite) influences the base package.</li>
            <li><strong>Procedure Complexity:</strong> Single-level vs. multi-level decompression.</li>
            <li><strong>Implants (if any):</strong> While most endoscopic discectomies don't need implants, some stabilization procedures might.</li>
            <li><strong>Insurance Coverage:</strong> Most health insurance policies and TPA cover endoscopic spine procedures. We assist with cashless approvals.</li>
          </ul>
          <div className="mt-6">
            <a href="https://wa.me/919778280044?text=Hi%20I%20need%20cost%20estimate%20for%20endoscopic%20spine%20surgery" className="inline-flex items-center gap-2 text-green-700 font-semibold hover:underline">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Get a Cost Estimate via WhatsApp
            </a>
          </div>
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
