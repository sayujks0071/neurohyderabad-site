import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Endoscopic Spine Surgery in Hyderabad | Best Spine Surgeon | Dr. Sayuj",
  description:
    "Expert endoscopic spine surgery in Hyderabad by Dr. Sayuj Krishnan. Minimally invasive, cost-effective treatment for slip disc & sciatica. Fast recovery, same-day discharge options available at Yashoda Hospital.",
  alternates: { canonical: "https://www.drsayuj.info/endoscopic-spine-surgery-hyderabad" },
  openGraph: {
    title: "Endoscopic Spine Surgery in Hyderabad | Dr. Sayuj Krishnan",
    description: "Minimally invasive spine surgery (MISS) for faster recovery. German-trained specialist at Yashoda Hospital.",
    url: "https://www.drsayuj.info/endoscopic-spine-surgery-hyderabad",
    type: "website",
  }
};

const FAQ = [
  {
    q: "Is endoscopic surgery always better than microdiscectomy?",
    a: "Not always. It depends on the exact pathology, level, and surgeon judgment. We select the approach that maximizes safety and outcomes for your case. Endoscopic surgery offers smaller incisions and faster recovery for many candidates.",
  },
  {
    q: "Will I need a collar or belt?",
    a: "Typically not for routine endoscopic discectomy/foraminotomy unless there is instability or surgeon-specific protocol. Most patients are encouraged to move naturally.",
  },
  {
    q: "What imaging do I need?",
    a: "MRI with appropriate sequences is essential. At times, dynamic X-rays or CT scans are recommended for bony evaluation or to exclude instability before confirming the surgical plan.",
  },
  {
    q: "What are the chances of recurrence?",
    a: "Recurrence is possible with any decompression (about 5-10%). We counsel on posture, ergonomics, core activation, and graded return to activity to minimize this risk.",
  },
  {
    q: "Is the surgery painful?",
    a: "The procedure is minimally invasive, causing significantly less pain than open surgery. Most patients manage with oral painkillers for a few days and report immediate relief from their leg pain (sciatica).",
  }
];

export default function Page() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "Endoscopic Spine Surgery",
    alternateName: "Full Endoscopic Spine Surgery (FESS)",
    bodyLocation: ["Cervical spine", "Lumbar spine"],
    procedureType: "SurgicalProcedure",
    url: "https://www.drsayuj.info/endoscopic-spine-surgery-hyderabad",
    medicalSpecialty: {
      "@type": "MedicalSpecialty",
      name: "Neurosurgery"
    },
    performer: {
      "@type": "Physician",
      name: "Dr. Sayuj Krishnan",
      url: "https://www.drsayuj.info",
      jobTitle: "Consultant Neurosurgeon"
    },
    location: {
      "@type": "Hospital",
      name: "Yashoda Hospitals, Malakpet",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        addressCountry: "IN"
      }
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
      <header className="mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          Endoscopic Spine Surgery in Hyderabad
        </h1>
        <p className="mt-6 text-xl text-gray-700 leading-relaxed max-w-3xl">
          Advanced, minimally invasive spine solutions for slip disc and sciatica.
          German-trained expertise for <span className="font-semibold text-blue-700">faster recovery, smaller scars, and same-day discharge</span> potential.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="https://wa.me/919778280044?text=Hi%20I%20need%20endoscopic%20spine%20consultation"
            className="rounded-full px-8 py-3 bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            WhatsApp Consultation
          </a>
          <a href="tel:+919778280044" className="rounded-full px-8 py-3 border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
            Call: +91-9778280044
          </a>
        </div>
      </header>

      {/* Trust & Expertise Section */}
      <section className="mb-12 bg-blue-50 p-8 rounded-2xl border border-blue-100 shadow-sm">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Why Choose Endoscopic Spine Surgery with Dr. Sayuj?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-3xl">🇩🇪</span>
            <h3 className="font-semibold text-lg">German-Trained</h3>
            <p className="text-sm text-gray-700">Fellowship training in advanced full-endoscopic spine techniques, ensuring international standards of care.</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-3xl">🔬</span>
            <h3 className="font-semibold text-lg">Pin-Hole Surgery</h3>
            <p className="text-sm text-gray-700">Incisions less than 1cm mean minimal muscle damage, practically no blood loss, and tiny scars.</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-3xl">🏥</span>
            <h3 className="font-semibold text-lg">Premium Facility</h3>
            <p className="text-sm text-gray-700">Performed at Yashoda Hospitals, Malakpet, utilizing the latest high-definition endoscopic visualization systems.</p>
          </div>
        </div>
      </section>

      {/* Benefits Comparison Table */}
      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Endoscopic vs. Open Spine Surgery</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left font-semibold text-gray-700">Feature</th>
                <th className="p-4 text-left font-bold text-blue-800 bg-blue-50">Endoscopic Surgery</th>
                <th className="p-4 text-left font-semibold text-gray-600">Traditional Open Surgery</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="p-4 font-medium text-gray-900">Incision Size</td>
                <td className="p-4 bg-blue-50/50 text-blue-900">Tiny (&lt; 1 cm)</td>
                <td className="p-4 text-gray-600">Large (3 - 5 cm)</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-gray-900">Muscle Damage</td>
                <td className="p-4 bg-blue-50/50 text-blue-900">Minimal (Muscles diluted/separated)</td>
                <td className="p-4 text-gray-600">Moderate (Muscles cut/retracted)</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-gray-900">Hospital Stay</td>
                <td className="p-4 bg-blue-50/50 text-blue-900">Day Care / 1 Night</td>
                <td className="p-4 text-gray-600">3 - 5 Days</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-gray-900">Recovery Time</td>
                <td className="p-4 bg-blue-50/50 text-blue-900">1 - 2 Weeks</td>
                <td className="p-4 text-gray-600">4 - 8 Weeks</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-gray-900">Pain</td>
                <td className="p-4 bg-blue-50/50 text-blue-900">Minimal (often manageable with oral meds)</td>
                <td className="p-4 text-gray-600">Moderate to Severe</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-12 mb-12">
        <article>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Conditions Treated</h2>
          <p className="text-lg text-gray-700 mb-6">
            Endoscopic spine surgery is highly effective for conditions where nerve compression causes persistent pain, numbness, or weakness. It is often the preferred choice when medication and physiotherapy do not provide relief.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Lumbar (Lower Back)</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>
                    <strong className="block text-gray-900"><Link href="/conditions/sciatica-treatment-hyderabad" className="hover:underline hover:text-blue-600">Sciatica & Leg Pain</Link></strong>
                    Shooting pain travelling down the leg caused by nerve irritation.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>
                    <strong className="block text-gray-900"><Link href="/conditions/slip-disc-treatment-hyderabad" className="hover:underline hover:text-blue-600">Herniated Disc (Slip Disc)</Link></strong>
                    Soft inner core of the disc leaks out, pressing on nerves.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>
                    <strong className="block text-gray-900"><Link href="/conditions/spinal-stenosis-treatment-hyderabad" className="hover:underline hover:text-blue-600">Spinal Stenosis</Link></strong>
                    Narrowing of the spinal canal causing cramping pain while walking.
                  </span>
                </li>
              </ul>
            </div>
            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Cervical (Neck)</h3>
              <ul className="space-y-4 text-gray-700">
                 <li className="flex gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>
                    <strong className="block text-gray-900"><Link href="/conditions/cervical-radiculopathy-treatment-hyderabad" className="hover:underline hover:text-blue-600">Cervical Radiculopathy</Link></strong>
                    Pain radiating into the shoulder, arm, or hand.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>
                    <strong className="block text-gray-900">Cervical Disc Herniation</strong>
                    Disc material compressing nerves in the neck.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>
                    <strong className="block text-gray-900">Foraminal Stenosis</strong>
                    Narrowing of the exit pathway for nerve roots in the neck.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </article>

        <article>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">How It Works: Step-by-Step</h2>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">1</div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Preparation & Anesthesia</h3>
                <p className="text-gray-700 mt-1">Done under local anesthesia with sedation or general anesthesia. You remain comfortable throughout.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">2</div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Precision Access</h3>
                <p className="text-gray-700 mt-1">A &lt;1cm incision is made. A dilator gently separates muscle fibers, preserving their function.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">3</div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Endoscopic Decompression</h3>
                <p className="text-gray-700 mt-1">A high-definition camera provides a crystal-clear view. Dr. Sayuj removes only the offending disc fragment or bone spur.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">4</div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Rapid Recovery</h3>
                <p className="text-gray-700 mt-1">The skin is closed with a single stitch or glue. Patients typically walk within hours.</p>
              </div>
            </div>
          </div>
        </article>

        <article>
           <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Recovery Roadmap</h2>
           <div className="relative border-l-2 border-blue-200 ml-4 space-y-8 pl-8 py-2">
             <div className="relative">
               <span className="absolute -left-[41px] top-1 h-6 w-6 rounded-full bg-blue-600 border-4 border-white shadow-sm"></span>
               <h3 className="font-bold text-lg text-gray-900">Day 0: Surgery & Mobilization</h3>
               <p className="text-gray-700 mt-1">Surgery takes 60-90 mins. You are encouraged to walk with support within 3-4 hours after the effect of anesthesia wears off.</p>
             </div>
             <div className="relative">
               <span className="absolute -left-[41px] top-1 h-6 w-6 rounded-full bg-blue-600 border-4 border-white shadow-sm"></span>
               <h3 className="font-bold text-lg text-gray-900">Day 1: Discharge</h3>
               <p className="text-gray-700 mt-1">Most patients are discharged the same day or next morning with simple oral painkillers and instructions for wound care.</p>
             </div>
             <div className="relative">
               <span className="absolute -left-[41px] top-1 h-6 w-6 rounded-full bg-blue-600 border-4 border-white shadow-sm"></span>
               <h3 className="font-bold text-lg text-gray-900">Week 1-2: Light Activity</h3>
               <p className="text-gray-700 mt-1">Short walks are encouraged. You can perform light household activities but should avoid bending, lifting, or twisting.</p>
             </div>
             <div className="relative">
               <span className="absolute -left-[41px] top-1 h-6 w-6 rounded-full bg-blue-600 border-4 border-white shadow-sm"></span>
               <h3 className="font-bold text-lg text-gray-900">Week 3+: Back to Work</h3>
               <p className="text-gray-700 mt-1">Return to sedentary/desk jobs is typically allowed. Physical therapy begins to strengthen core muscles.</p>
             </div>
           </div>
        </article>

        <article className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Transparent Pricing & Insurance</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Endoscopic spine surgery in Hyderabad is a cost-effective option. The reduced hospital stay and medication needs often lower the overall cost compared to traditional surgery.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Cost Factors</h3>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                <li>Hospital Room Category (General to Suite)</li>
                <li>Complexity (Single vs. Multi-level)</li>
                <li>Use of specialized implants (rare for simple discectomy)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Insurance Support</h3>
              <p className="text-gray-700 text-sm">
                We accept most major health insurance policies and TPAs. Our team assists with:
              </p>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mt-2">
                 <li>Cashless pre-authorization</li>
                 <li>Reimbursement documentation</li>
                 <li>Detailed cost estimation</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200">
             <a href="https://wa.me/919778280044?text=Hi%20I%20need%20cost%20estimate%20for%20endoscopic%20spine%20surgery" className="inline-flex items-center gap-2 text-green-700 font-bold hover:underline text-lg">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Get a Personalized Cost Estimate
            </a>
          </div>
        </article>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQ.map(({ q, a }) => (
            <details key={q} className="rounded-xl border border-gray-200 bg-white p-5 group shadow-sm">
              <summary className="font-semibold text-lg cursor-pointer list-none flex justify-between items-center text-gray-900">
                {q}
                <span className="transition-transform duration-300 group-open:rotate-180 text-gray-400">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-3 text-gray-700 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="mt-16 p-8 border border-blue-100 rounded-3xl bg-gradient-to-br from-blue-50 to-white text-center shadow-md">
         <h2 className="text-2xl font-bold text-blue-900 mb-3">Ready to Live Pain-Free?</h2>
         <p className="text-gray-600 max-w-2xl mx-auto mb-8">
           Don't let back or neck pain control your life. Consult Dr. Sayuj Krishnan to discuss if endoscopic spine surgery is the right path for your recovery.
         </p>
         <div className="flex flex-wrap justify-center gap-4">
            <Link href="/appointments" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-shadow shadow-lg hover:shadow-xl">
               Book Appointment
            </Link>
            <a href="tel:+919778280044" className="inline-block bg-white text-blue-700 border-2 border-blue-100 px-8 py-4 rounded-full font-bold hover:border-blue-300 transition-colors">
               Call +91-9778280044
            </a>
         </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}
