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
  title: "Neck Pain Symptoms & Causes | When to See a Doctor | Dr Sayuj",
  description: "Understanding neck pain causes: tech neck vs spondylosis vs pinched nerve. Learn red flag symptoms requiring neurosurgical attention in Hyderabad.",
  canonicalPath: '/symptoms/neck-pain',
});

export const metadata: Metadata = {
  ...baseMetadata,
  keywords: [
    "neck pain causes",
    "cervical spondylosis symptoms",
    "neck pain doctor hyderabad",
    "pinched nerve in neck",
    "neck pain red flags",
    "cervical radiculopathy vs myelopathy"
  ],
  alternates: {
    canonical: `${SITE_URL}/symptoms/neck-pain`,
  },
};

export const revalidate = 21600;

const FAQ = [
  {
    q: "When is neck pain serious?",
    a: "Neck pain is serious if it is accompanied by radiating pain down the arm, numbness or weakness in the hands, loss of balance/coordination, or loss of bladder/bowel control. These symptoms may indicate spinal cord compression (myelopathy) and require urgent evaluation."
  },
  {
    q: "Can neck pain cause headaches?",
    a: "Yes, 'cervicogenic headaches' originate from the neck, often due to stiffness or nerve irritation in the upper cervical spine. The pain usually starts at the base of the skull and radiates to the forehead or behind the eyes."
  },
  {
    q: "What is 'Tech Neck'?",
    a: "Tech neck refers to strain on the cervical spine caused by looking down at phones or laptops for prolonged periods. This forward head posture increases pressure on the discs and muscles, leading to chronic pain and early degeneration."
  },
  {
    q: "How do I know if I have a pinched nerve?",
    a: "A pinched nerve (radiculopathy) typically causes sharp, shooting pain that travels from the neck into the shoulder, arm, or hand. You may also feel 'pins and needles' or numbness in specific fingers."
  }
];

export default function NeckPainSymptomsPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Symptoms", path: "/symptoms/" },
    { name: "Neck Pain", path: "/symptoms/neck-pain" }
  ];

  // Filter relevant stories for spine/neck
  const relevantStories = patientStories.filter(s =>
    s.tags.includes('spine') || s.tags.includes('cervical') || s.tags.includes('neck')
  ).slice(0, 2);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-blue-900 leading-tight">
        Neck Pain: Symptoms, Causes & When to Worry
      </h1>

      <p className="text-lg text-gray-700 mb-8 max-w-3xl">
        Neck pain is increasingly common in our digital age. While often due to muscle strain,
        persistent pain or symptoms radiating to the arms can indicate underlying spinal conditions
        that need expert evaluation to prevent long-term nerve damage.
      </p>

      <section className="mb-12 grid md:grid-cols-2 gap-12">
        <div>
           <h2 className="text-2xl font-semibold mb-4 text-blue-800">Common Causes</h2>
           <ul className="space-y-4 text-gray-700">
             <li className="bg-gray-50 p-4 rounded-lg">
               <strong className="block text-blue-700 mb-1">Muscle Strain (Tech Neck)</strong>
               Caused by poor posture, prolonged computer use, or sleeping in an awkward position. Pain is usually localized to the neck and shoulders.
             </li>
             <li className="bg-gray-50 p-4 rounded-lg">
               <strong className="block text-blue-700 mb-1">Cervical Spondylosis</strong>
               <p className="mb-2">Age-related wear and tear of the spinal discs and joints (arthritis of the neck).</p>
             </li>
             <li className="bg-gray-50 p-4 rounded-lg">
               <strong className="block text-blue-700 mb-1">Cervical Radiculopathy (Pinched Nerve)</strong>
               <p className="mb-2">A herniated disc or bone spur compresses a nerve root, causing pain to shoot down the arm.</p>
               <Link href="/conditions/cervical-radiculopathy-treatment-hyderabad" className="text-sm text-blue-600 hover:underline font-medium">Learn about Pinched Nerves →</Link>
             </li>
             <li className="bg-gray-50 p-4 rounded-lg">
               <strong className="block text-blue-700 mb-1">Cervical Myelopathy</strong>
               <p className="mb-2">Severe compression of the spinal cord itself. This is a serious condition affecting balance and dexterity.</p>
               <Link href="/conditions/cervical-myelopathy-decompression-hyderabad" className="text-sm text-blue-600 hover:underline font-medium">Understand Myelopathy Risks →</Link>
             </li>
           </ul>
        </div>
        <div>
           <h2 className="text-2xl font-semibold mb-4 text-red-700">Red Flags: Urgent Attention Needed</h2>
           <div className="bg-red-50 border border-red-100 p-6 rounded-lg mb-6">
             <p className="font-semibold text-red-900 mb-4">Consult Dr. Sayuj immediately if you experience:</p>
             <ul className="space-y-2 text-red-800">
               <li>• Weakness or clumsiness in hands (dropping objects)</li>
               <li>• Difficulty walking or loss of balance</li>
               <li>• Pain radiating down the arm (electric shock sensation)</li>
               <li>• Numbness in arms or legs</li>
               <li>• Loss of bladder or bowel control</li>
               <li>• Neck pain after a fall or accident</li>
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
          Accurate diagnosis begins with a clinical exam and may require an MRI to visualize the nerves and discs. Treatment is tailored to the severity:
        </p>
        <div className="grid md:grid-cols-3 gap-6">
           <div className="border border-green-200 bg-green-50 p-6 rounded-lg">
              <h3 className="font-bold text-green-800 mb-3">Conservative Care</h3>
              <p className="text-sm text-gray-700">Rest, physiotherapy, ergonomic corrections, and medication resolve most non-nerve neck pain.</p>
           </div>
           <div className="border border-blue-200 bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-blue-800 mb-3">Pain Management</h3>
              <p className="text-sm text-gray-700">Selective nerve root blocks or epidural injections can reduce inflammation and delay/avoid surgery.</p>
           </div>
           <div className="border border-purple-200 bg-purple-50 p-6 rounded-lg">
              <h3 className="font-bold text-purple-800 mb-3">Advanced Surgery</h3>
              <p className="text-sm text-gray-700">
                <Link href="/services/minimally-invasive-spine-surgery" className="text-purple-700 underline font-medium">Endoscopic Foraminotomy</Link> (Keyhole) or <Link href="/services/spinal-fusion-surgery-hyderabad" className="text-purple-700 underline font-medium">ACDF</Link> for spinal cord compression.
              </p>
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
        title="Neck Pain Symptoms & Causes | Dr. Sayuj Krishnan"
        description="Comprehensive guide to neck pain causes, symptoms (radiculopathy, myelopathy), and red flags. Learn when to seek neurosurgical care in Hyderabad."
        pageSlug="/symptoms/neck-pain"
        pageType="condition"
        serviceOrCondition="Neck Pain"
        breadcrumbs={breadcrumbs}
      />
      <FAQPageSchema
        faqs={FAQ.map(item => ({ question: item.q, answer: item.a }))}
        pageUrl={`${SITE_URL}/symptoms/neck-pain`}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      <AuthorByline publishedOn="2026-01-22" />
    </main>
  );
}
