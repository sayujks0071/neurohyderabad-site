import { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '../../../src/lib/seo/jsonld';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import { makeMetadata } from '@/app/_lib/meta';
import AuthorByline from '@/app/_components/AuthorByline';
import SourceList from '@/app/_components/SourceList';
import { getBlogSources } from '../sources';

const baseMetadata = makeMetadata({
  title: 'Endoscopic Cervical Spine Surgery in Hyderabad | Recovery & Indications',
  description:
    'When cervical endoscopic surgery is indicated, benefits vs. fusion, recovery timelines, and safety considerations for patients in Hyderabad.',
  canonicalPath: '/blog/endoscopic-cervical-spine-surgery-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  keywords: [
    'endoscopic cervical spine surgery hyderabad',
    'cervical endoscopic discectomy hyderabad',
    'cervical foraminotomy hyderabad',
    'minimally invasive cervical spine surgery',
    'cervical radiculopathy treatment hyderabad',
  ],
  openGraph: {
    title: baseMetadata.title,
    description: baseMetadata.description,
    url: 'https://www.drsayuj.info/blog/endoscopic-cervical-spine-surgery-hyderabad/',
    type: 'article',
    publishedTime: '2025-11-25T00:00:00.000Z',
    modifiedTime: '2025-11-25T00:00:00.000Z',
    authors: ['Dr Sayuj Krishnan'],
    section: 'Spine Surgery',
    tags: [
      'cervical endoscopy',
      'minimally invasive spine surgery',
      'cervical radiculopathy',
      'foraminotomy',
      'endoscopic discectomy',
    ],
  },
  alternates: {
    canonical: 'https://www.drsayuj.info/blog/endoscopic-cervical-spine-surgery-hyderabad/',
  },
};

const ARTICLE_SOURCES = getBlogSources('endoscopic-cervical-spine-surgery-hyderabad');

const blogPostingSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Endoscopic Cervical Spine Surgery in Hyderabad: When It’s Recommended and What to Expect",
  "description":
    "A concise guide to endoscopic cervical spine surgery in Hyderabad—indications, benefits vs. fusion, recovery timelines, and safety considerations.",
  "mainEntityOfPage": "https://www.drsayuj.info/blog/endoscopic-cervical-spine-surgery-hyderabad/",
  "url": "https://www.drsayuj.info/blog/endoscopic-cervical-spine-surgery-hyderabad/",
  "datePublished": "2025-11-25",
  "dateModified": "2025-11-25",
  "author": { "@id": "https://www.drsayuj.info/#physician" },
  "publisher": { "@id": "https://www.drsayuj.info/#hospital" },
  "articleSection": "Spine Surgery",
  "wordCount": "1150",
  "citation": ARTICLE_SOURCES?.map((s) => s.href) || [],
  "about": [
    { "@type": "MedicalCondition", "name": "Cervical Radiculopathy" },
    { "@type": "MedicalProcedure", "name": "Endoscopic Cervical Discectomy" },
    { "@type": "MedicalProcedure", "name": "Cervical Foraminotomy" }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "When is endoscopic cervical spine surgery recommended?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is considered when cervical radiculopathy persists despite 6–8 weeks of physiotherapy, medicines, and injections, and imaging shows a focal disc/foraminal stenosis correlating with symptoms."
      }
    },
    {
      "@type": "Question",
      "name": "How is endoscopic cervical surgery different from fusion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Endoscopic discectomy/foraminotomy preserves motion by removing only the offending fragment or widening the foramen. Fusion is chosen when there is instability or multilevel disease needing segmental support."
      }
    },
    {
      "@type": "Question",
      "name": "What is the recovery timeline?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most patients mobilise the same day, resume desk work in 7–10 days, and gradually return to full activity over 4–6 weeks depending on neurological recovery."
      }
    }
  ]
};

export default function EndoscopicCervicalSpineSurgeryPage() {
  return (
    <>
      <JsonLd json={blogPostingSchema} />
      <JsonLd json={faqSchema} />

      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Endoscopic Cervical Spine Surgery in Hyderabad: When It’s Recommended and What to Expect
          </h1>
          <AuthorByline
            publishedOn="2025-11-25"
            updatedOn="2025-11-25"
            className="text-gray-600 mb-4"
          />
        </header>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              Endoscopic cervical spine surgery uses a small working channel and high-definition camera to decompress a pinched nerve
              while preserving muscles and motion segments. For carefully selected patients with arm pain from cervical radiculopathy,
              it can reduce postoperative pain, shorten hospital stay, and speed return to work compared with open techniques.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Who is a candidate?</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Unilateral arm pain/tingling (C5–C7) with matching MRI showing paracentral/foraminal disc or osteophyte.</li>
              <li>No segmental instability on dynamic X-rays (fusion preferred if unstable).</li>
              <li>Failed 6–8 weeks of targeted physiotherapy, neuropathic medication, or selective nerve root block.</li>
              <li>Good neck alignment without kyphosis at the treated level.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Procedure options</h2>
            <p className="text-gray-700 mb-3">
              Access is typically through a 7–8 mm working portal. Discectomy removes offending fragments; foraminotomy widens the bony
              canal to free the nerve. Navigation and neuromonitoring enhance safety near the spinal cord. Fusion (ACDF) or arthroplasty
              remains the choice when instability or multilevel collapse is present.
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li><strong>Endoscopic discectomy:</strong> Targeted removal of herniated fragment with minimal bone work.</li>
              <li><strong>Endoscopic foraminotomy:</strong> Uncinate and foraminal drilling to relieve bony stenosis.</li>
              <li><strong>Hybrid planning:</strong> MISS at one level plus ACDF at an unstable level when needed.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Recovery milestones</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Same-day mobilisation; soft collar only for comfort if advised.</li>
              <li>Desk work: 7–10 days. Light activity: 2–3 weeks. Full activity: 4–6 weeks with physio clearance.</li>
              <li>Red flags after discharge: worsening weakness, bowel/bladder change, fever, or wound issues.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">When fusion is preferred</h2>
            <p className="text-gray-700">
              Significant instability, kyphosis, or multilevel collapse still favour ACDF or arthroplasty. Endoscopic techniques complement
              but do not replace stabilising procedures when biomechanics demand it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">How to prepare</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Share MRI, dynamic X-rays, and nerve conduction studies before consult.</li>
              <li>Optimise blood pressure/diabetes; stop smoking to improve healing.</li>
              <li>Clarify insurance pre-auth for endoscopic procedures and implants.</li>
            </ul>
          </section>

          <section className="mb-8 bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-800">
              Need a cervical endoscopy opinion? Share your MRI via WhatsApp or book a consult to confirm if you are a candidate.
              <Link href="/appointments" className="text-blue-700 underline ml-1">Book an appointment</Link>.
            </p>
          </section>
        </div>

        <ReviewedBy />
        <NAP />
        <SourceList sources={ARTICLE_SOURCES} />
      </article>
    </>
  );
}
