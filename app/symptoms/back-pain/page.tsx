import React from "react";
import Link from "next/link";
import type { Metadata } from 'next';
import MedicalWebPageSchema from "@/app/components/schemas/MedicalWebPageSchema";
import FAQPageSchema from "@/app/_components/FAQPageSchema";
import BreadcrumbSchema from "@/app/components/schemas/BreadcrumbSchema";
import { SITE_URL } from "@/src/lib/seo";
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import { makeMetadata } from '@/app/_lib/meta';
import AuthorByline from '@/app/_components/AuthorByline';
import { LocalPathways } from '@/src/components/locations/LocalPathways';
import TrustProof from '@/app/_components/TrustProof';
import { patientStories } from '@/src/content/stories';

const baseMetadata = makeMetadata({
  title: "Back Pain Causes & Red Flags | Specialist Treatment Hyderabad",
  description: "Back pain won't go away? Learn the 5 red flags requiring urgent care. Specialist diagnosis & non-surgical treatment in Hyderabad by Dr. Sayuj.",
  canonicalPath: '/symptoms/back-pain',
});

export const metadata: Metadata = {
  ...baseMetadata,
  keywords: [
    "back pain causes",
    "lower back pain symptoms",
    "back pain doctor hyderabad",
    "when to see a doctor for back pain",
    "back pain red flags",
    "sciatica vs back pain"
  ],
  alternates: {
    canonical: `${SITE_URL}/symptoms/back-pain`,
  },
};

export const revalidate = 21600;

const FAQ = [
  {
    q: "When is back pain serious?",
    a: "Back pain is serious if it's accompanied by fever, weight loss, leg weakness, numbness in the groin area, or loss of bladder/bowel control. These require immediate medical attention."
  },
  {
    q: "What is the difference between muscle pain and disc pain?",
    a: "Muscle pain is usually a dull ache that improves with rest. Disc pain (like a slip disc) is often sharp, shooting, and radiates down the leg (sciatica), often worsening with sitting or bending."
  },
  {
    q: "Can stress cause back pain?",
    a: "Yes, emotional stress can cause muscle tension leading to back pain. However, persistent pain should always be evaluated to rule out structural causes."
  }
];

export default function BackPainSymptomsPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Symptoms", path: "/symptoms/" },
    { name: "Back Pain", path: "/symptoms/back-pain" }
  ];

  const relevantStories = patientStories.filter(s => s.tags.includes('spine')).slice(0, 2);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-blue-900 leading-tight">
        Back Pain: Symptoms, Causes & When to Worry
      </h1>

      <p className="text-lg text-gray-700 mb-8 max-w-3xl">
        Back pain is one of the most common reasons people visit a doctor. While most cases resolve on their own,
        understanding the underlying cause is crucial for effective treatment, especially if the pain persists or radiates to the legs.
      </p>

      <section className="mb-12 grid md:grid-cols-2 gap-12">
        <div>
           <h2 className="text-2xl font-semibold mb-4 text-blue-800">Common Causes</h2>
           <ul className="space-y-4 text-gray-700">
             <li className="bg-gray-50 p-4 rounded-lg">
               <strong className="block text-blue-700 mb-1">Muscle Strain</strong>
               Often caused by lifting heavy objects or sudden movements. Pain is usually localized to the lower back.
             </li>
             <li className="bg-gray-50 p-4 rounded-lg">
               <strong className="block text-blue-700 mb-1">Herniated Disc (Slip Disc)</strong>
               <p className="mb-2">The soft inner material of a disc leaks out and irritates a nerve.</p>
               <Link href="/conditions/slip-disc-treatment-hyderabad" className="text-sm text-blue-600 hover:underline font-medium">Learn about Slip Disc →</Link>
             </li>
             <li className="bg-gray-50 p-4 rounded-lg">
               <strong className="block text-blue-700 mb-1">Sciatica</strong>
               <p className="mb-2">Pain that radiates along the sciatic nerve, from the lower back down the leg.</p>
               <Link href="/conditions/sciatica-pain-treatment-hyderabad" className="text-sm text-blue-600 hover:underline font-medium">Read Sciatica Guide →</Link>
             </li>
             <li className="bg-gray-50 p-4 rounded-lg">
               <strong className="block text-blue-700 mb-1">Spinal Stenosis</strong>
               <p className="mb-2">Narrowing of the spinal canal putting pressure on the spinal cord or nerves.</p>
               <Link href="/conditions/spinal-stenosis-treatment-hyderabad" className="text-sm text-blue-600 hover:underline font-medium">Understand Spinal Stenosis →</Link>
             </li>
           </ul>
        </div>
        <div>
           <h2 className="text-2xl font-semibold mb-4 text-red-700">Red Flags: Urgent Attention Needed</h2>
           <div className="bg-red-50 border border-red-100 p-6 rounded-lg mb-6">
             <p className="font-semibold text-red-900 mb-4">Consult Dr. Sayuj immediately if you experience:</p>
             <ul className="space-y-2 text-red-800">
               <li>• Pain accompanied by unexplained weight loss</li>
               <li>• Pain after a severe fall or accident</li>
               <li>• Loss of bladder or bowel control (Cauda Equina Syndrome)</li>
               <li>• Progressive weakness or numbness in legs</li>
               <li>• Fever accompanying back pain</li>
             </ul>
             <div className="mt-6">
                <Link href="/appointments" className="inline-block bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors text-sm font-semibold">
                  Book Urgent Consultation
                </Link>
             </div>
           </div>

           <TrustProof stories={relevantStories} className="mt-8" />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-800">Diagnosis & Treatment Options</h2>
        <p className="text-gray-700 mb-6">
          Diagnosis typically involves a physical exam and imaging tests like X-rays or MRI scans. Treatment depends on the cause:
        </p>
        <div className="grid md:grid-cols-3 gap-6">
           <div className="border border-green-200 bg-green-50 p-6 rounded-lg">
              <h3 className="font-bold text-green-800 mb-3">Conservative Care</h3>
              <p className="text-sm text-gray-700">Rest, physiotherapy, and medication. Effective for 90% of cases.</p>
           </div>
           <div className="border border-blue-200 bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-blue-800 mb-3">Pain Management</h3>
              <p className="text-sm text-gray-700">Epidural steroid injections or nerve blocks for severe pain.</p>
           </div>
           <div className="border border-purple-200 bg-purple-50 p-6 rounded-lg">
              <h3 className="font-bold text-purple-800 mb-3">Surgery</h3>
              <p className="text-sm text-gray-700">Minimally invasive options like <Link href="/services/endoscopic-spine-surgery-hyderabad" className="text-purple-700 underline">Endoscopic Spine Surgery</Link> for persistent cases.</p>
           </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-800">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQ.map(({ q, a }, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold mb-2 text-blue-900">{q}</h3>
              <p className="text-gray-700">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <LocalPathways mode="condition" />

      <section className="mt-12 space-y-6">
         <ReviewedBy />
         <NAP />
      </section>

      <MedicalWebPageSchema
        title="Back Pain Causes & Red Flags | Specialist Treatment Hyderabad"
        description="Back pain won't go away? Learn the 5 red flags requiring urgent care. Specialist diagnosis & non-surgical treatment in Hyderabad by Dr. Sayuj."
        pageSlug="/symptoms/back-pain"
        pageType="condition"
        serviceOrCondition="Back Pain"
        breadcrumbs={breadcrumbs}
      />
      <FAQPageSchema
        faqs={FAQ.map(item => ({ question: item.q, answer: item.a }))}
        pageUrl={`${SITE_URL}/symptoms/back-pain`}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      <AuthorByline publishedOn="2025-05-20" />
    </main>
  );
}
