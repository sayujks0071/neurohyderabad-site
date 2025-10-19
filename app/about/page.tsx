import Link from "next/link";
import type { Metadata } from "next";
import { makeMetadata } from "@/app/_lib/meta";
import { SITE_URL } from "@/src/lib/seo";

const credentials = [
  {
    heading: "Education & Specialist Training",
    items: [
      "MBBS – Kerala University of Health Sciences",
      "Direct 6-year DNB Neurosurgery residency (National Board of Examinations)",
      "Fellowship in Minimally Invasive & Complex Spine Surgery – Amrita Hospital, Kochi",
      "Full Endoscopic Spine Surgery observership – St. Anna Hospital, Herne (Germany)",
    ],
  },
  {
    heading: "Core Neurosurgical Expertise",
    items: [
      "10,000+ brain and spine procedures completed",
      "Endoscopic spine surgery and MISS for lumbar, cervical & thoracic pathology",
      "Neuronavigation-assisted resections for brain tumours and epilepsy surgery",
      "Comprehensive experience in trauma, vascular, and peripheral nerve surgery",
    ],
  },
];

const memberships = [
  {
    label: "Neurological Society of India (NSI)",
    href: "https://www.nsiindia.org/",
  },
  {
    label: "Neuro Spinal Surgeons Association (NSSA)",
    href: "https://nssa.in/",
  },
  {
    label: "Indian Medical Association (IMA)",
    href: "https://www.ima-india.org/ima/",
  },
  {
    label: "Indian Society of Peripheral Nerve Surgery",
    href: "https://www.ispns.org/",
  },
];

const timeline = [
  {
    period: "2022 – Present",
    title: "Consultant Neurosurgeon, Yashoda Hospitals (Malakpet, Hyderabad)",
    detail:
      "Lead for endoscopic spine and minimally invasive brain surgery programme; coordinates multidisciplinary tumour board and hybrid tele-consult triage.",
  },
  {
    period: "2018 – 2022",
    title: "Consultant Neurosurgeon, Apollo Adlux Hospitals (Angamaly, Kerala)",
    detail:
      "Established the endoscopic spine service line, delivered CME programmes for general practitioners, and mentored DNB neurosurgery residents.",
  },
  {
    period: "2012 – 2018",
    title: "DNB Neurosurgery Residency",
    detail:
      "Direct 6-year training with rotations across trauma, skull base, vascular and paediatric neurosurgery divisions; graduated with honours.",
  },
];

const presentations = [
  "“Minimally invasive options for lumbar canal stenosis” – Neuro Spinal Surgeons Association Annual Meeting, 2024.",
  "“Neuronavigation in eloquent area tumour resections” – Kerala State Neurosurgery Conference, 2023.",
  "Faculty speaker, State IMA Conference 2022 – Early referral protocols for spine emergencies.",
];

const sources = [
  {
    label: "Yashoda Hospitals – Dr. Sayuj Krishnan profile",
    href: "https://www.yashodahospitals.com/doctor/dr-sayuj-krishnan/",
  },
  {
    label: "Neurological Society of India – Member directory",
    href: "https://www.nsiindia.org/MemberDirectory.aspx",
  },
  {
    label: "Neuro Spinal Surgeons Association – Membership listings",
    href: "https://nssa.in/membership-directory/",
  },
  {
    label: "Amrita Hospital – Spine fellowship programme overview",
    href: "https://www.amritahospital.org/departments/spine-surgery",
  },
];

export const metadata: Metadata = {
  ...makeMetadata({
    title: "About Dr. Sayuj Krishnan | Consultant Neurosurgeon in Hyderabad",
    description:
      "Know the medical training, surgical experience, and professional memberships of Dr. Sayuj Krishnan. Consultant neurosurgeon at Yashoda Hospitals Malakpet with 10,000+ procedures.",
    canonicalPath: "/about",
  }),
  openGraph: {
    title: "About Dr. Sayuj Krishnan | Consultant Neurosurgeon in Hyderabad",
    description:
      "Verified credentials, hospital privileges, conference presentations, and memberships that establish Dr. Sayuj Krishnan’s authority in brain and spine surgery.",
    url: `${SITE_URL}/about`,
    type: "profile",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("About Dr. Sayuj Krishnan")}&subtitle=${encodeURIComponent(
          "Consultant Neurosurgeon, Hyderabad",
        )}`,
        width: 1200,
        height: 630,
        alt: "About Dr. Sayuj Krishnan — Neurosurgeon in Hyderabad",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <header className="max-w-5xl mx-auto mb-12 text-center">
        <p className="text-sm uppercase tracking-widest text-blue-600">Experience • Expertise • Trust</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">About Dr. Sayuj Krishnan</h1>
        <p className="mt-6 text-lg text-gray-700 leading-relaxed">
          Dr. Sayuj Krishnan is a consultant neurosurgeon at Yashoda Hospitals, Malakpet. Over the last decade, he has led
          advanced brain and spine programmes, performed more than 10,000 procedures, and trained in leading minimally invasive
          centres in India and Europe.
        </p>
      </header>

      <section className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
        {credentials.map((block) => (
          <article key={block.heading} className="bg-white border border-blue-100 rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">{block.heading}</h2>
            <ul className="space-y-3 text-gray-700 leading-relaxed">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="max-w-5xl mx-auto mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6">Hospital Privileges & Practice Focus</h2>
        <div className="grid md:grid-cols-[2fr,1fr] gap-6">
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Dr. Sayuj leads the endoscopic spine and minimally invasive neurosurgery service at{" "}
              <Link
                href="https://www.yashodahospitals.com/doctor/dr-sayuj-krishnan/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline decoration-blue-300 hover:text-blue-900"
              >
                Yashoda Hospitals, Malakpet
              </Link>
              . His multidisciplinary team supports complex brain tumour resections, awake craniotomies, epilepsy surgery, skull base
              reconstruction, and rapid-recovery spine procedures.
            </p>
            <p>
              Prior to relocating to Hyderabad, he contributed to building the neurosurgery department at Apollo Adlux Hospitals,
              Angamaly, where he structured neurosurgical protocols for day-care spine surgeries and cranial trauma services.
            </p>
          </div>
          <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-700 mb-3">Key Specialisations</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Full endoscopic lumbar and cervical discectomy</li>
              <li>• Minimally invasive spine fusion (MISS-TLIF)</li>
              <li>• Brain tumour surgery using neuronavigation and neuromonitoring</li>
              <li>• Trigeminal neuralgia, epilepsy, and peripheral nerve procedures</li>
              <li>• Emergency neuro-trauma and cranio-vertebral junction surgery</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6">Professional Memberships</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {memberships.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-6 py-4 hover:border-blue-300 hover:shadow-md transition"
            >
              <span className="font-medium text-gray-800">{item.label}</span>
              <span className="text-blue-600 text-sm">View</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6">Career Timeline</h2>
        <ol className="relative border-l-2 border-blue-100 space-y-8 pl-6">
          {timeline.map((entry) => (
            <li key={entry.period} className="ml-4">
              <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-blue-600 bg-white" />
              <p className="text-sm uppercase tracking-wide text-blue-600">{entry.period}</p>
              <h3 className="text-lg font-semibold text-gray-900 mt-1">{entry.title}</h3>
              <p className="text-gray-700 mt-2 leading-relaxed">{entry.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="max-w-5xl mx-auto mt-12 bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6">Scholarship, Conferences & Patient Education</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Presentations</h3>
            <ul className="space-y-2 text-gray-700 text-sm leading-relaxed">
              {presentations.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Patient Engagement</h3>
            <ul className="space-y-2 text-gray-700 text-sm leading-relaxed">
              <li>• Hybrid tele-consult pathway for outstation patients to triage imaging and second opinions.</li>
              <li>• Structured rehabilitation guidance in collaboration with physiotherapy partners.</li>
              <li>• Monthly CME sessions for general practitioners on neurosurgical referral red flags.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6">Sources & Verification</h2>
        <p className="text-gray-700 text-sm mb-4">
          Every credential and affiliation listed on this page is backed by an independently verifiable source. External links
          open in a new tab.
        </p>
        <ul className="space-y-3 text-sm text-blue-700 underline decoration-blue-300">
          {sources.map((source) => (
            <li key={source.href}>
              <Link href={source.href} target="_blank" rel="noopener noreferrer">
                {source.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-xs text-gray-500 mt-4">Last updated: 19 October 2025</p>
      </section>
    </main>
  );
}
