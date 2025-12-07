import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/src/lib/seo";

export const metadata: Metadata = {
  title: "Research & Innovation | Dr. Sayuj Krishnan",
  description:
    "Learn how Dr. Sayuj Krishnan advances neurosurgery through clinical research, conference presentations, and collaboration with international centres.",
  alternates: {
    canonical: `${SITE_URL}/research`,
    languages: {
      "en-IN": `${SITE_URL}/research`,
      "x-default": `${SITE_URL}/research`,
    },
  },
  openGraph: {
    title: "Research & Innovation | Dr. Sayuj Krishnan",
    description:
      "Discover current studies, publications, and innovation programmes led by Dr. Sayuj Krishnan in Hyderabad.",
    url: `${SITE_URL}/research`,
    siteName: "Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad",
    images: [
      {
        url: `${SITE_URL}/api/og?title=Research%20%26%20Innovation&subtitle=Clinical%20Trials%20and%20Collaborations`,
        width: 1200,
        height: 630,
        alt: "Research and Innovation - Dr. Sayuj Krishnan",
      },
    ],
    locale: "en_IN",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Research & Innovation | Dr. Sayuj Krishnan",
    description:
      "Track clinical studies, conference presentations, and technology pilots led by the neurosurgery team.",
    images: [
      `${SITE_URL}/api/og?title=Research%20%26%20Innovation&subtitle=Clinical%20Trials%20and%20Collaborations`,
    ],
  },
};

const conferenceHighlights = [
  {
    title: "Asia Pacific Spine Society",
    summary:
      "Presented intraoperative neuromonitoring protocols for endoscopic decompression to reduce nerve injury risk.",
    year: "2025",
  },
  {
    title: "World Federation of Neurosurgical Societies",
    summary:
      "Shared outcomes of awake craniotomy for deep-seated tumours with functional MRI-guided planning.",
    year: "2024",
  },
];

const ongoingInitiatives = [
  {
    title: "Enhanced Recovery After Surgery (ERAS) Pathway",
    description:
      "Prospective study on day-care endoscopic discectomy protocols combining multimodal analgesia and tele-rehab follow-up.",
  },
  {
    title: "3D Navigation Quality Registry",
    description:
      "Data registry tracking accuracy of neuronavigation-assisted tumour resections and correlation with post-operative MRI.",
  },
  {
    title: "Tele-neurosurgery Collaboration",
    description:
      "Clinical partnership with European centres to co-review complex epilepsy cases and adopt AI-assisted seizure forecasting.",
  },
];


export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-sm uppercase tracking-wide text-blue-600">
            Research & Innovation
          </p>
          <h1 className="mt-3 text-4xl font-bold text-gray-900">
            Advancing Neurosurgery Through Evidence and Collaboration
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-gray-600">
            Dr. Sayuj Krishnan leads clinical studies that improve patient
            outcomes in brain, spine, and epilepsy surgery. Our team collaborates
            with international centres to pilot new technologies, standardise
            protocols, and publish meaningful data for the neurosurgical
            community.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Connect with the Research Team
            </Link>
            <Link
              href="/appointments"
              className="rounded-full border border-blue-200 px-6 py-3 text-sm font-semibold text-blue-600 transition hover:border-blue-300 hover:bg-blue-50"
            >
              Refer a Clinical Case
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-16 px-6 py-16">
        {/* E-E-A-T Statistics Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">Clinical Experience & Outcomes</h2>
          <p className="text-center text-blue-100 mb-8 max-w-2xl mx-auto">
            Quantifiable expertise and outcomes demonstrating Dr. Sayuj Krishnan's experience, expertise, authoritativeness, and trustworthiness in neurosurgery.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-100 text-sm">Endoscopic Procedures Performed</div>
              <div className="text-blue-200 text-xs mt-2">Experience</div>
            </div>
            <div className="text-center bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold mb-2">9+</div>
              <div className="text-blue-100 text-sm">Years Neurosurgery Experience</div>
              <div className="text-blue-200 text-xs mt-2">Expertise</div>
            </div>
            <div className="text-center bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold mb-2">85-90%</div>
              <div className="text-blue-100 text-sm">Success Rate (Endoscopic Disc)</div>
              <div className="text-blue-200 text-xs mt-2">Authoritativeness</div>
            </div>
            <div className="text-center bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold mb-2">80%+</div>
              <div className="text-blue-100 text-sm">Same-Day Discharge Rate</div>
              <div className="text-blue-200 text-xs mt-2">Trustworthiness</div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            Current Clinical Initiatives
          </h2>
          <p className="mt-2 text-gray-600">
            Active projects led by Dr. Sayuj&apos;s team in partnership with
            anaesthesiology, radiology, and rehabilitation colleagues.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {ongoingInitiatives.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-blue-800">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>


        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            Conference Presentations
          </h2>
          <p className="mt-2 text-gray-600">
            Recent podium and poster sessions featuring our clinical outcomes
            and protocol refinements.
          </p>
          <div className="mt-6 space-y-4">
            {conferenceHighlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 p-5 shadow-sm"
              >
                <div className="flex items-center justify-between text-sm font-medium text-blue-700">
                  <span>{item.title}</span>
                  <span className="text-gray-400">{item.year}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{item.summary}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-blue-50 p-8">
          <h2 className="text-2xl font-semibold text-blue-900">
            Collaborate on Research or Trial Development
          </h2>
          <p className="mt-2 text-blue-800">
            We welcome partnerships with neurosurgeons, rehabilitation experts,
            and technology innovators who are advancing minimally invasive brain
            and spine care.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="mailto:hellodr@drsayuj.info?subject=Research%20Collaboration%20Enquiry"
              className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Email the Research Desk
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-blue-200 px-5 py-2 text-sm font-semibold text-blue-600 transition hover:border-blue-300 hover:bg-blue-50"
            >
              Contact the Coordination Team
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
