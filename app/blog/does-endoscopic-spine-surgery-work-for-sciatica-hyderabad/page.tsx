import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/src/lib/seo';

export const metadata: Metadata = {
  title: 'Does Endoscopic Spine Surgery Work for Sciatica in Hyderabad? – Dr. Sayuj Krishnan',
  description: 'Understand how endoscopic discectomy and foraminotomy relieve sciatica with tiny incisions, typical recovery timelines, and who is a good candidate in Hyderabad.',
  alternates: { canonical: `${SITE_URL}/blog/does-endoscopic-spine-surgery-work-for-sciatica-hyderabad/` },
  openGraph: {
    title: 'Endoscopic Spine Surgery for Sciatica in Hyderabad – What to Expect',
    description: 'How minimally invasive endoscopic techniques relieve nerve compression causing sciatica and help you walk the same day.',
    url: `${SITE_URL}/blog/does-endoscopic-spine-surgery-work-for-sciatica-hyderabad/`,
    type: 'article'
  }
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Does Endoscopic Spine Surgery Work for Sciatica in Hyderabad?</h1>
      <p className="text-lg text-gray-700 mb-6">
        Sciatica refers to leg pain, tingling or numbness caused by compression of the sciatic nerve—most often from a slipped (herniated) disc or
        spinal stenosis. When pressure on the nerve persists, pain can travel from the back or buttock down the leg, sometimes with weakness or
        difficulty walking. In Hyderabad, minimally invasive endoscopic techniques are frequently used to relieve this pressure through tiny incisions.
      </p>
      <h2 className="text-2xl font-semibold text-blue-800 mb-3">How Endoscopic Surgery Treats Sciatica</h2>
      <p className="text-gray-700 mb-4">
        With <strong>endoscopic discectomy</strong> or <strong>foraminotomy</strong>, the surgeon removes only the portion of disc or bone that is narrowing the nerve exit. A 6–8&nbsp;mm
        working channel and a high‑definition camera allow precise decompression while preserving normal muscle and ligament structures. Because there is
        less tissue disruption than traditional open surgery, patients generally walk the same day and go home after a short observation period.
      </p>
      <h2 className="text-2xl font-semibold text-blue-800 mb-3">Recovery and Results</h2>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>Walking begins within hours; desk work often resumes in 1–3&nbsp;weeks</li>
        <li>Oral pain medication typically manages discomfort</li>
        <li>A structured physiotherapy plan protects the back while strength returns</li>
      </ul>
      <p className="text-gray-700 mb-6">
        Outcomes are best when MRI findings match symptoms and the compressed nerve root is clearly identified. For appropriate candidates, endoscopic
        procedures have high success in relieving leg pain and numbness while limiting hospital stay.
      </p>
      <h2 className="text-2xl font-semibold text-blue-800 mb-3">Who Is a Candidate?</h2>
      <p className="text-gray-700 mb-6">
        Good candidates typically have leg‑dominant pain from a herniated disc or foraminal stenosis that has not improved with supervised physiotherapy
        and medication. During consultation, we review your MRI and perform a focused neurological exam to confirm whether endoscopic decompression is the
        right option.
      </p>
      <div className="bg-blue-50 rounded-lg p-5">
        <p className="text-blue-900">
          If sciatica pain is disrupting your life in Hyderabad, schedule an evaluation with Dr. Sayuj Krishnan to explore minimally invasive options.
          {' '}<Link href="/appointments" className="text-blue-700 underline">Book a consultation →</Link>
        </p>
      </div>
    </main>
  );
}




