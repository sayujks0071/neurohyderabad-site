import React from "react";
import Link from "next/link";
import type { Metadata } from 'next';
import MedicalWebPageSchema from "../../components/schemas/MedicalWebPageSchema";
import FAQPageSchema from "@/app/_components/FAQPageSchema";
import { SITE_URL } from "../../../src/lib/seo";
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import { makeMetadata } from '@/app/_lib/meta';
import AuthorByline from '@/app/_components/AuthorByline';
import SourceList from '@/app/_components/SourceList';
import { sources } from '../../blog/sources';
import { LocalPathways } from '@/src/components/locations/LocalPathways';
import TrustProof from '@/app/_components/TrustProof';
import { patientStories } from '@/src/content/stories';
import CostTransparencySection from '@/src/components/CostTransparencySection';
import { getLocationById } from '@/src/data/locations';

const baseMetadata = makeMetadata({
  title: "Slip Disc Treatment Hyderabad | Expert Endoscopic Care",
  description: "Comprehensive slip disc treatment in Hyderabad. Expert conservative care and minimally invasive endoscopic discectomy by Dr. Sayuj Krishnan.",
  canonicalPath: '/conditions/slip-disc-treatment-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  keywords: [
    "slip disc treatment hyderabad",
    "herniated disc",
    "endoscopic discectomy",
    "spine surgery",
    "dr sayuj krishnan",
    "non-surgical spine treatment",
    "sciatica treatment"
  ],
  alternates: {
    canonical: `${SITE_URL}/conditions/slip-disc-treatment-hyderabad/`,
  },
};

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

const FAQ = [
  {
    q: "What is a slip disc and how is it treated?",
    a: "A slip disc (herniated disc) occurs when the soft center of a spinal disc pushes through a crack in the outer ring. Treatment begins with conservative measures like medication and physiotherapy. If symptoms persist, Dr. Sayuj Krishnan specializes in endoscopic discectomy, a minimally invasive procedure for lasting relief."
  },
  {
    q: "Do I always need surgery for a slip disc?",
    a: "No. 80-90% of slip disc patients recover with conservative treatment (medications, rest, physiotherapy) within 6 weeks. Surgery is only recommended if there is severe pain, weakness, or no improvement after non-surgical care."
  },
  {
    q: "How long does endoscopic discectomy take?",
    a: "The endoscopic discectomy procedure typically takes 45-60 minutes. Most patients can walk the same day and return to desk work within 1-2 weeks. Physical jobs may require 4-8 weeks with a graded return plan."
  },
  {
    q: "What are the benefits of endoscopic discectomy over traditional surgery?",
    a: "Endoscopic discectomy offers several advantages: smaller incision (6-8mm vs 3-4 inches), less muscle damage, minimal blood loss, same-day discharge, faster recovery, and reduced risk of complications. The procedure preserves normal spinal anatomy while effectively treating the herniated disc."
  },
  {
    q: "Who is a candidate for endoscopic discectomy?",
    a: "Candidates include patients with leg-dominant pain from herniated discs who haven't improved with conservative treatment (medications, physiotherapy). Dr. Krishnan evaluates each case individually, considering MRI findings, symptoms, and overall health to determine the best treatment approach."
  },
  {
    q: "What is the success rate of endoscopic discectomy?",
    a: "Endoscopic discectomy has a high success rate of 85-95% for appropriate candidates. Success depends on proper patient selection, surgeon experience, and following post-operative care instructions. Dr. Krishnan's extensive experience in minimally invasive spine surgery ensures optimal outcomes."
  }
];

const slipDiscCosts = [
  {
    procedure: "Conservative Management",
    range: "₹5,000 - ₹15,000",
    recovery: "2-4 Weeks",
    includes: ["Consultation", "MRI Scan (approx)", "Medications (1 week)", "Physiotherapy Assessment"]
  },
  {
    procedure: "Nerve Root Block (Injection)",
    range: "₹20,000 - ₹35,000",
    recovery: "Same Day Discharge",
    includes: ["Procedure Charges", "C-Arm Guidance", "Day Care Stay", "Post-proc medicines"]
  },
  {
    procedure: "Endoscopic Discectomy",
    range: "₹2,50,000 - ₹4,00,000",
    recovery: "1-2 Weeks",
    includes: ["Surgery", "Hospital Stay (1-2 days)", "Medications", "Follow-up"]
  }
];

export default function SlipDiscTreatmentPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Conditions", path: "/conditions/" },
    { name: "Slip Disc Treatment", path: "/conditions/slip-disc-treatment-hyderabad/" }
  ];

  // Filter relevant stories
  const spineStories = patientStories.filter(story =>
    story.tags.includes('spine') ||
    story.tags.includes('slip-disc') ||
    story.tags.includes('sciatica')
  ).slice(0, 2);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        Slip Disc Treatment in Hyderabad | Comprehensive Care
      </h1>
      
      <p className="text-lg text-gray-700 mb-8">
        Expert slip disc treatment in Hyderabad offering a complete care pathway: from
        <strong> Conservative Management</strong> (Medication & Physio) to advanced
        <strong> Endoscopic Discectomy</strong>. Dr. Sayuj Krishnan ensures the right treatment
        at the right time for your spine health.
      </p>

      {/* Red Flag Symptoms Section */}
      <section className="mb-12 bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg shadow-sm">
        <h2 className="text-xl font-bold text-red-700 mb-4 flex items-center">
          <span className="text-2xl mr-2">⚠️</span> When to See a Doctor Urgently (Red Flags)
        </h2>
        <p className="text-gray-800 mb-4">
          Most slip discs can be managed with time, but seek immediate medical attention if you experience:
        </p>
        <ul className="space-y-2 text-gray-800">
          <li className="flex items-start">
            <span className="font-bold text-red-600 mr-2">•</span>
            <span><strong>Cauda Equina Syndrome:</strong> Loss of bladder or bowel control, or numbness in the groin/saddle area.</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold text-red-600 mr-2">•</span>
            <span><strong>Progressive Weakness:</strong> Sudden foot drop (unable to lift foot) or worsening leg weakness.</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold text-red-600 mr-2">•</span>
            <span><strong>Intractable Pain:</strong> Severe pain that does not improve with strong painkillers and prevents sleep.</span>
          </li>
        </ul>
      </section>

      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">What is a Slip Disc?</h2>
          <p className="text-gray-700 mb-4">
            A slip disc, also known as a herniated disc, occurs when the soft center of a spinal 
            disc pushes through a crack in the outer ring. This can compress nearby nerves, 
            causing pain, numbness, or weakness in the arms or legs. This compression is often the primary cause of <Link href="/conditions/sciatica-pain-treatment-hyderabad" className="text-blue-600 underline">sciatica leg pain</Link>.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6 rounded-r-lg">
             <p className="text-blue-900 text-sm font-medium">
               <strong>Did you know?</strong> 90% of sciatica cases are caused by a slip disc. If you have radiating leg pain, treating the disc is key to relief.
               <Link href="/conditions/sciatica-pain-treatment-hyderabad" className="block mt-1 text-blue-700 hover:underline">
                 ➜ Read our Full Guide to Sciatica Relief
               </Link>
             </p>
          </div>
          
          <h3 className="text-xl font-semibold mb-4 text-blue-700">Common Symptoms</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>
                Sharp, shooting pain in the leg or arm (
                <Link href="/conditions/sciatica-pain-treatment-hyderabad" className="text-blue-600 underline">
                  Sciatica
                </Link>
                )
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Numbness or tingling in affected areas</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Muscle weakness in the leg or arm</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Pain that worsens with sitting, bending, or coughing</span>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">Why Choose Dr. Sayuj?</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">✓</span>
              <span><strong>Holistic Approach:</strong> Conservative care is always the first option.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">✓</span>
              <span><strong>Advanced Diagnostics:</strong> Precise MRI evaluation to pinpoint the cause.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">✓</span>
              <span><strong>Minimally Invasive Expert:</strong> If surgery is needed, we use keyhole techniques (6-8mm).</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">✓</span>
              <span><strong>Faster Recovery:</strong> Same-day discharge for most endoscopic procedures.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Causes Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Causes & Risk Factors of Slip Disc</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <p className="text-gray-700 mb-4">
            Understanding the underlying cause of a slip disc is key to preventing future episodes. Most slip discs occur due to gradual, age-related wear and tear called disc degeneration. As we age, our spinal discs lose some of their water content, making them less flexible and more prone to tearing or rupturing with even a minor strain or twist.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-3">Common Causes</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span><strong>Age-Related Degeneration:</strong> The natural aging process is the most common cause.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span><strong>Improper Lifting:</strong> Using your back muscles instead of your leg and thigh muscles to lift heavy, large objects can lead to a slipped disc, as can twisting while lifting.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span><strong>Trauma:</strong> Rarely, a traumatic event such as a fall or a blow to the back can cause a herniated disc.</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-3">Risk Factors</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span><strong>Weight:</strong> Excess body weight causes extra stress on the discs in your lower back.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span><strong>Genetics:</strong> Some people inherit a predisposition to developing a herniated disc.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span><strong>Smoking:</strong> It&apos;s thought that smoking lessens the oxygen supply to the disc and causes more rapid breakdown.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span><strong>Occupation:</strong> People with physically demanding jobs have a greater risk of back problems.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Diagnosis Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Diagnosis & Evaluation</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <p className="text-gray-700 mb-4">
            A precise diagnosis is critical for effective slip disc treatment. Dr. Sayuj Krishnan relies on detailed clinical evaluation combined with advanced imaging to understand the exact location and severity of the nerve compression.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-3">Diagnostic Tests We Use</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span><strong>MRI Spine:</strong> The gold standard to visualize soft tissues, confirming disc herniation and nerve compression.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span><strong>Dynamic X-Rays:</strong> Used to rule out spinal instability (spondylolisthesis) or bone abnormalities.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span><strong>CT Scan:</strong> Detailed bone imaging to check for calcified discs or bony spurs.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span><strong>Nerve Conduction Studies (NCS/EMG):</strong> To confirm the extent of nerve damage if symptoms are unclear.</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-3">What We Look For</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span>Exact level of the slip disc (e.g., L4-L5, L5-S1).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span>Type of herniation (bulge, protrusion, or extrusion).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span>Degree of nerve root or spinal cord compression.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span>Overall health of adjacent spinal segments.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <div className="mb-12">
        <TrustProof stories={spineStories} serviceType="spine" className="bg-gradient-to-br from-white to-blue-50/50" />
      </div>

      {/* New Conservative Care Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Comprehensive Care Pathway</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white">
            <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-lg mb-4">1</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Non-Surgical Care</h3>
            <p className="text-gray-600 mb-4 text-sm">
              The first line of defense. 80-90% of patients recover at this stage.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Medication:</strong> Anti-inflammatories & muscle relaxants.</li>
              <li>• <strong>Physiotherapy:</strong> Strengthening core muscles & posture correction.</li>
              <li>• <strong>Activity Modification:</strong> Avoiding heavy lifting & bending.</li>
              <li>• <strong>Rest:</strong> Short period of relative rest (2-3 days).</li>
            </ul>
          </div>

          {/* Step 2 */}
          <div className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white">
            <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-lg mb-4">2</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Pain Management</h3>
            <p className="text-gray-600 mb-4 text-sm">
              For persistent pain that doesn't respond to oral medication.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Nerve Root Blocks:</strong> Targeted injections to calm inflamed nerves.</li>
              <li>• <strong>Epidural Steroid Injections:</strong> Reduces inflammation around the disc.</li>
              <li>• <strong>Pain Clinic Referral:</strong> Specialized multi-modal pain management.</li>
            </ul>
          </div>

          {/* Step 3 */}
          <div className="border border-blue-200 rounded-xl p-6 shadow-md bg-blue-50">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">3</div>
            <h3 className="text-xl font-bold text-blue-900 mb-3">Surgical Solution</h3>
            <p className="text-blue-800 mb-4 text-sm">
              When conservative care fails or neurological deficits appear.
            </p>
            <ul className="space-y-2 text-sm text-blue-900">
              <li>• <Link href="/services/endoscopic-spine-surgery-hyderabad" className="font-bold underline hover:text-blue-800">Endoscopic discectomy — most common treatment</Link>: Keyhole surgery (gold standard).</li>
              <li>• <strong>Microdiscectomy:</strong> Microscope-assisted removal.</li>
              <li>• <strong>Same-Day Discharge:</strong> Walk home within hours.</li>
              <li>• <strong>Tiny Incision:</strong> Minimal scarring (6-8mm).</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">The Endoscopic Advantage</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold mb-3 text-blue-700">Procedure Overview</h3>
            <p className="text-gray-700 mb-4">
              If surgery is required, Dr. Sayuj utilizes advanced <strong>Endoscopic Spine Surgery</strong>.
              Unlike open surgery, this technique does not cut muscle or bone. A thin tube with a camera
              is inserted through a tiny incision to precisely remove the herniated disc fragment pressing on the nerve.
            </p>
            <Link href="/services/minimally-invasive-spine-surgery" className="text-blue-600 font-medium hover:underline">
              Learn more about Endoscopic Spine Surgery →
            </Link>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
             <h3 className="text-lg font-semibold mb-3 text-blue-700">Why Patients Prefer It</h3>
             <ul className="space-y-2 text-gray-700">
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Local or General Anaesthesia options</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> No muscle tearing</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Minimal blood loss</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> High success rate (90%+)</li>
             </ul>
          </div>
        </div>
      </section>

      <CostTransparencySection
        costs={slipDiscCosts}
        disclaimer="Estimates for general guidance. Final cost depends on hospital category, room choice, and specific implants used. Insurance cashless facility available at Yashoda Hospital."
      />

      <section className="mb-12 rounded-lg border border-green-200 bg-green-50 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-green-800">Worried about general anaesthesia?</h2>
        <p className="text-gray-700 mb-4">
          For elderly or high-risk patients, Dr. Sayuj offers <strong>awake endoscopic spine surgery</strong> using spinal/epidural blocks with light sedation—minimising anaesthesia risk while keeping the incision tiny.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/services/awake-spine-surgery-hyderabad" className="rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700">
            Explore Awake Spine Surgery
          </Link>
          <a
            href="https://wa.me/919778280044"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-green-300 px-5 py-2 text-sm font-semibold text-green-800 hover:bg-green-100"
          >
            Share MRI on WhatsApp
          </a>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Candidates for Endoscopic Discectomy</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-700 mb-4">
            Ideal candidates for endoscopic discectomy include:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Patients with leg-dominant pain from herniated discs</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Those who haven't improved with conservative treatment (6+ weeks)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Patients with clear MRI evidence of disc herniation</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Those seeking faster recovery and minimal scarring</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Pre-FAQ CTA & Trust Signals */}
      <section className="mb-12 border border-blue-100 bg-blue-50 rounded-2xl p-8 shadow-sm">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Book Your Consultation</h2>
            <p className="text-gray-700 mb-6">
              Don't let slip disc pain limit your daily activities. Book a consultation with Dr. Sayuj Krishnan to discuss your treatment options and get back to your normal life.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/appointments"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full hover:-translate-y-1 hover:shadow-lg transition-all text-center font-semibold"
              >
                Book Appointment Online
              </Link>
              <a
                href={`https://wa.me/${getLocationById('hyderabad')?.whatsapp || '919778280044'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 py-3 rounded-full hover:-translate-y-1 hover:shadow-lg transition-all text-center font-semibold flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                Chat on WhatsApp
              </a>
              <a
                href={`tel:${getLocationById('hyderabad')?.telephone || '+919778280044'}`}
                className="bg-white border-2 border-slate-200 text-slate-600 px-6 py-3 rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all text-center font-semibold"
              >
                Call: {getLocationById('hyderabad')?.telephone || '+91 9778280044'}
              </a>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Clinic Information</h3>
            <NAP variant="default" showEmail={false} />
            <div className="mt-4 pt-3 border-t">
              <a
                href={getLocationById('hyderabad')?.directions_url || "https://maps.google.com/?q=Yashoda+Hospitals+Malakpet"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Frequently Asked Questions</h2>
        <div className="space-y-4">
      {FAQ.map(({ q, a }, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3 text-blue-700">{q}</h3>
          <p className="text-gray-700">{a}</p>
        </div>
      ))}
    </div>
  </section>

  <section className="mb-12 space-y-6">
    <ReviewedBy />
    <NAP />
  </section>

  {/* Schema Markup */}
  <MedicalWebPageSchema
        title="Slip Disc Treatment in Hyderabad | Endoscopic Discectomy"
        description="Expert slip disc treatment in Hyderabad. From conservative care to endoscopic discectomy. Same-day discharge, minimal pain. Book consultation with Dr. Sayuj Krishnan."
        pageSlug="/conditions/slip-disc-treatment-hyderabad/"
        pageType="condition"
        serviceOrCondition="Slip Disc Treatment"
        breadcrumbs={breadcrumbs}
      />

      <FAQPageSchema
        faqs={FAQ.map(item => ({ question: item.q, answer: item.a }))}
        pageUrl={`${SITE_URL}/conditions/slip-disc-treatment-hyderabad/`}
      />

      <AuthorByline
        publishedOn="2025-02-15"
        updatedOn="2025-10-19"
      />

      <div className="mt-12">
        <LocalPathways mode="condition" currentSlug="slip-disc-treatment-hyderabad" />
      </div>
      <SourceList sources={sources['slip-disc-treatment-hyderabad'] || []} />
</main>
  );
}
