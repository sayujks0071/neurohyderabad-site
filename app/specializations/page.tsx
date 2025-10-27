import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbSchema from "../components/schemas/BreadcrumbSchema";
import { SITE_URL } from "../../src/lib/seo";

export const metadata: Metadata = {
  title:
    "Neurosurgical Specializations | Brain, Spine, and Pediatric Programs | Dr. Sayuj Krishnan",
  description:
    "Explore Dr. Sayuj Krishnan's brain, spine, pediatric, and peripheral nerve specializations. Discover minimally invasive programs, technology, and recovery protocols.",
  alternates: {
    canonical: `${SITE_URL}/specializations`,
    languages: {
      "en-IN": `${SITE_URL}/specializations`,
      "x-default": `${SITE_URL}/specializations`,
    },
  },
  openGraph: {
    title:
      "Neurosurgical Specializations | Brain, Spine, and Pediatric Programs",
    description:
      "View specialised neurosurgery programs delivered by Dr. Sayuj Krishnan with minimally invasive protocols and multidisciplinary care teams.",
    url: `${SITE_URL}/specializations`,
    siteName: "Dr. Sayuj Krishnan - Neurosurgeon Hyderabad",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Neurosurgical Specializations | Brain, Spine, and Pediatric Programs",
    description:
      "Explore specialised neurosurgery programs delivered by Dr. Sayuj Krishnan in Hyderabad.",
  },
};

const SPECIALIZATION_GROUPS = [
  {
    title: "Minimally Invasive Spine Surgery",
    description:
      "Endoscopic and keyhole spine procedures that shorten recovery while providing durable relief for disc prolapse, stenosis, deformity, and instability.",
    highlights: [
      "Full-endoscopic discectomy and decompression",
      "Navigation-guided lumbar fusion and deformity correction",
      "Same-day discharge protocols and accelerated rehabilitation",
    ],
    primaryCta: {
      href: "/spine-surgery",
      label: "Explore Spine Surgery Program",
    },
    secondaryLinks: [
      { href: "/services/minimally-invasive-spine-surgery", label: "MISS Programme Overview" },
      { href: "/services/endoscopic-discectomy-hyderabad", label: "Endoscopic Discectomy Day-Care" },
      { href: "/services/spinal-fusion-surgery-hyderabad", label: "Advanced Fusion Techniques" },
    ],
  },
  {
    title: "Brain & Skull Base Surgery",
    description:
      "Neuronavigation-guided brain tumour surgery, awake craniotomy, and vascular neurosurgery with functional preservation and multidisciplinary support.",
    highlights: [
      "Awake brain surgery for eloquent cortex tumours",
      "Endoscopic skull base and craniovertebral junction procedures",
      "Comprehensive tumour board and neuro-rehabilitation planning",
    ],
    primaryCta: {
      href: "/brain-surgery",
      label: "View Brain Surgery Services",
    },
    secondaryLinks: [
      { href: "/brain-tumor-surgery", label: "Brain Tumour Surgery Insights" },
      { href: "/services/brain-tumor-surgery-hyderabad", label: "Brain Tumour Programme" },
      { href: "/awake-brain-surgery", label: "Awake Craniotomy Protocols" },
    ],
  },
  {
    title: "Epilepsy & Functional Neurosurgery",
    description:
      "Comprehensive evaluation and surgical treatment pathways for drug-resistant epilepsy, trigeminal neuralgia, and movement disorder pain syndromes.",
    highlights: [
      "Seizure surgery with invasive monitoring when required",
      "Microvascular decompression for facial pain and spasm",
      "Radiosurgery and neuromodulation options when surgery is not indicated",
    ],
    primaryCta: {
      href: "/services/epilepsy-surgery-hyderabad",
      label: "Epilepsy Surgery Pathway",
    },
    secondaryLinks: [
      { href: "/blog/mvd-vs-radiosurgery-trigeminal-neuralgia", label: "Trigeminal Neuralgia Treatment Options" },
      { href: "/services/peripheral-nerve-surgery-hyderabad", label: "Peripheral Nerve Programme" },
      { href: "/services/compare-neurosurgeons-hyderabad", label: "How We Benchmark Outcomes" },
    ],
  },
  {
    title: "Pediatric & Developmental Neurosurgery",
    description:
      "Child-focused brain and spine surgery addressing congenital malformations, pediatric tumours, and spine deformity with multidisciplinary support.",
    highlights: [
      "Child-friendly anaesthesia and ICU pathways",
      "Endoscopic neuro-endoscopy for hydrocephalus and cysts",
      "Paediatric spine deformity and scoliosis programmes",
    ],
    primaryCta: {
      href: "/pediatric-neurosurgery",
      label: "Pediatric Neurosurgery Overview",
    },
    secondaryLinks: [
      { href: "/neuro-endoscopy", label: "Neuro-Endoscopy Techniques" },
      { href: "/services/spine-surgery-hyderabad", label: "Paediatric Spine Expertise" },
      { href: "/patient-stories", label: "Family Recovery Stories" },
    ],
  },
];

export default function SpecializationsPage() {
  return (
    <div className="bg-white">
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Specializations", path: "/specializations" },
        ]}
      />

      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 lg:flex-row lg:items-center">
          <div className="lg:w-3/5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
              Expert Focus Areas
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              Comprehensive Brain & Spine Specializations
            </h1>
            <p className="mt-6 text-lg text-blue-50 md:text-xl">
              Dr. Sayuj Krishnan leads advanced neurosurgical programmes that
              combine minimally invasive techniques, intraoperative monitoring,
              and multidisciplinary rehabilitation to deliver safer outcomes and
              faster recoveries for complex brain, spine, and nerve conditions.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/appointments"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-100"
              >
                Book a Consultation
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View All Services
              </Link>
            </div>
          </div>
          <div className="lg:w-2/5">
            <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur">
              <h2 className="text-xl font-semibold">Why Specialisation Matters</h2>
              <ul className="mt-4 space-y-3 text-sm text-blue-100">
                <li>• Subspecialty training in endoscopic spine and skull base surgery</li>
                <li>• Over 1,000 minimally invasive spine procedures performed</li>
                <li>• Dedicated neuro-anaesthesia, intensive care, and rehab teams</li>
                <li>• Evidence-based protocols benchmarked against global centres</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10">
          {SPECIALIZATION_GROUPS.map((group) => (
            <article
              key={group.title}
              className="rounded-3xl border border-gray-200 bg-white p-10 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex flex-col gap-8 lg:flex-row">
                <div className="lg:w-2/3">
                  <h2 className="text-3xl font-semibold text-blue-800">
                    {group.title}
                  </h2>
                  <p className="mt-4 text-lg text-gray-700">
                    {group.description}
                  </p>
                  <ul className="mt-6 space-y-3 text-sm text-gray-600">
                    {group.highlights.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={group.primaryCta.href}
                      className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      {group.primaryCta.label}
                    </Link>
                    <Link
                      href="/appointments"
                      className="rounded-full border border-blue-200 px-5 py-2 text-sm font-semibold text-blue-600 transition hover:border-blue-300 hover:bg-blue-50"
                    >
                      Schedule with the Care Team
                    </Link>
                  </div>
                </div>
                <div className="lg:w-1/3">
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                      Key Resources
                    </p>
                    <ul className="mt-4 space-y-3 text-sm text-blue-800">
                      {group.secondaryLinks.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="flex items-center justify-between rounded-lg px-3 py-2 transition hover:bg-blue-100 hover:text-blue-900"
                          >
                            {link.label}
                            <span aria-hidden>→</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-blue-800">
                Multidisciplinary Support at Every Stage
              </h2>
              <p className="mt-4 text-lg text-gray-700">
                Each specialization is supported by dedicated neuro-anaesthesia,
                intraoperative neuromonitoring, neurocritical care, and
                rehabilitation teams. Patients receive personalised education,
                symptom tracking, and follow-up schedules to ensure outcomes
                remain aligned with recovery goals.
              </p>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Speak With the Coordination Team
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Share MRI scans or obtain a surgical second opinion within 24
                hours. Teleconsultations are available for outstation patients.
              </p>
              <div className="mt-6 space-y-3 text-sm font-semibold">
                <a
                  href="tel:+919778280044"
                  className="block rounded-full bg-blue-600 px-5 py-3 text-center text-white transition hover:bg-blue-700"
                >
                  Call +91 97782 80044
                </a>
                <a
                  href="https://wa.me/919778280044"
                  className="block rounded-full border border-blue-200 px-5 py-3 text-center text-blue-600 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  WhatsApp the Care Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
