import Link from 'next/link'
import { Metadata } from 'next'
import { JsonLd } from '../../../src/lib/seo/jsonld'
import ReviewedBy from '@/app/_components/ReviewedBy'
import NAP from '@/app/_components/NAP'
import { makeMetadata } from '@/app/_lib/meta'

const baseMetadata = makeMetadata({
  title: 'Return to Work After Endoscopic Discectomy in Hyderabad',
  description: 'Week-by-week recovery timelines, activity progression, and workplace planning after endoscopic discectomy in Hyderabad.',
  canonicalPath: '/blog/return-to-work-after-endoscopic-discectomy-hyderabad',
})

export const metadata: Metadata = {
  ...baseMetadata,
  keywords: [
    'return to work after endoscopic discectomy hyderabad',
    'endoscopic discectomy recovery hyderabad',
    'spine surgery recovery timeline',
    'work after spine surgery hyderabad',
    'endoscopic discectomy rehabilitation',
    'spine surgery return to work'
  ],
  openGraph: {
    title: baseMetadata.title,
    description: baseMetadata.description,
    url: 'https://www.drsayuj.com/blog/return-to-work-after-endoscopic-discectomy-hyderabad/',
    type: 'article',
    publishedTime: '2025-10-01T00:00:00.000Z',
    modifiedTime: '2025-10-01T00:00:00.000Z',
    authors: ['Dr Sayuj Krishnan'],
    section: 'Spine Surgery',
    tags: ['endoscopic discectomy', 'recovery', 'return to work', 'hyderabad', 'rehabilitation']
  },
  alternates: {
    canonical: 'https://www.drsayuj.com/blog/return-to-work-after-endoscopic-discectomy-hyderabad/',
    languages: {
      'en-IN': 'https://www.drsayuj.com/blog/return-to-work-after-endoscopic-discectomy-hyderabad/',
      'x-default': 'https://www.drsayuj.com/blog/return-to-work-after-endoscopic-discectomy-hyderabad/'
    }
  }
}

const blogPostingSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Return to Work After Endoscopic Discectomy in Hyderabad: A Practical Guide",
  "description": "Week‑by‑week recovery, desk vs manual timelines, red flags, and safe progressions after endoscopic discectomy in Hyderabad.",
  "mainEntityOfPage": "https://www.drsayuj.com/blog/return-to-work-after-endoscopic-discectomy-hyderabad/",
  "url": "https://www.drsayuj.com/blog/return-to-work-after-endoscopic-discectomy-hyderabad/",
  "datePublished": "2025-10-01",
  "dateModified": "2025-10-01",
  "author": { "@id": "https://www.drsayuj.com/#physician" },
  "publisher": { "@id": "https://www.drsayuj.com/#hospital" },
  "articleSection": "Spine Surgery",
  "wordCount": "1200",
  "citation": [
    "https://www.aans.org/patients/conditions-and-treatments",
    "https://www.ninds.nih.gov/health-information/disorders",
    "https://www.nhs.uk/conditions/sciatica/treatment/",
    "https://www.mayoclinic.org/diseases-conditions/herniated-disk/symptoms-causes/syc-20354095"
  ]
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Will I need physiotherapy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. After the wound check, a graded plan builds core and hip strength and posture control to reduce recurrence risk."
      }
    },
    {
      "@type": "Question",
      "name": "Can the disc re‑herniate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Recurrence can occur after any decompression. Technique and adherence to rehab reduce risk, but no approach eliminates it."
      }
    },
    {
      "@type": "Question",
      "name": "Is endoscopic recovery always faster?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Many eligible patients mobilize sooner, but recovery varies. Plans are individualized to safety and symptoms."
      }
    }
  ]
}

export default function ReturnToWorkAfterEndoscopicDiscectomyPage() {
  return (
    <>
      <JsonLd json={blogPostingSchema} />
      <JsonLd json={faqSchema} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link href="/blog/" className="hover:text-blue-600">Blog</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">Return to Work After Endoscopic Discectomy</li>
          </ol>
        </nav>

        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Return to Work After Endoscopic Discectomy in Hyderabad: A Practical Guide
            </h1>
            <p className="text-lg text-gray-700">
              Week-by-week recovery timeline and practical guidance for returning to work after endoscopic discectomy
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Published: October 1, 2025 | Last reviewed: October 1, 2025
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
              <p className="mb-4">
                Endoscopic discectomy decompresses the pinched nerve through a 6–8 mm portal, often enabling earlier mobilization—when clinically appropriate. Recovery is personal, but having a structured plan reduces anxiety, speeds safe return to work, and minimizes setbacks. Here's a week‑by‑week guide we use at Yashoda Hospitals – Malakpet, Hyderabad.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Who This Guide Is For</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Patients with a confirmed herniated (slip) disc causing leg pain/sciatica</li>
                <li>Those who underwent (or are considering) endoscopic discectomy</li>
                <li>Desk, field, and manual workers seeking clear, realistic timelines</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Week-by-Week Recovery Overview</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Day 0–2</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Walk short distances with support once fully awake.</li>
                    <li>Pain control: multimodal regimen as prescribed; ice for wound comfort.</li>
                    <li>Red flags: fever &gt;38°C, increasing weakness, new numbness, wound drainage—call immediately.</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Week 1</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Gentle walking 3–5×/day; avoid bending, twisting, heavy lifting.</li>
                    <li>Wound care per instructions; keep incision dry as advised.</li>
                    <li>Light chores allowed if pain‑free and within restrictions.</li>
                  </ul>
                </div>

                <div className="border-l-4 border-yellow-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Week 2</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Desk/remote work: many patients resume with frequent micro‑breaks.</li>
                    <li>Start guided core activation and gentle stretches after wound check.</li>
                    <li>Short commute okay; use lumbar support; avoid long rides without breaks.</li>
                  </ul>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Weeks 3–4</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Increase sitting tolerance gradually (20–30 min blocks, walk between).</li>
                    <li>Begin structured physiotherapy for core and hip‑glute strength.</li>
                    <li>Light field work can resume if pain‑free and strength improving.</li>
                  </ul>
                </div>

                <div className="border-l-4 border-red-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Weeks 5–8</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Progress to lifting in therapy; emphasize posture and ergonomics.</li>
                    <li>Manual workers: phased return with load and twist restrictions.</li>
                    <li>Start low‑impact cardio (walking/cycle) as comfort allows.</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gray-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">8+ Weeks</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Transition to full duties if pain‑free with normal strength and endurance.</li>
                    <li>Continue home exercise to prevent recurrence.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Desk vs Manual Roles: Sample Timelines</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Desk Work</h3>
                  <p className="text-blue-700 font-semibold">1–2 weeks</p>
                  <p className="text-blue-600 text-sm">Earlier with WFH flexibility and micro‑breaks</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">Light Field Work</h3>
                  <p className="text-green-700 font-semibold">2–4 weeks</p>
                  <p className="text-green-600 text-sm">Limit lifting; frequent breaks</p>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-orange-800 mb-3">Manual/Industrial</h3>
                  <p className="text-orange-700 font-semibold">4–8+ weeks</p>
                  <p className="text-orange-600 text-sm">Graded loads, precise technique coaching</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ergonomics and Movement Hygiene</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Sit‑stand alternation; neutral spine; hips/knees at 90°</li>
                <li>Micro‑breaks (2–3 minutes) each 20–30 minutes of sitting</li>
                <li>Avoid sustained flexion; hinge from hips with neutral back</li>
                <li>Lift close to the body; avoid twist with load</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Medication and Wound Care</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Follow the prescribed taper; avoid NSAIDs if advised by your surgeon</li>
                <li>Watch for redness, discharge, or rising pain at the incision</li>
                <li>Avoid non‑prescribed topical applications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">When to Call the Clinic Urgently</h2>
              <div className="bg-red-50 border-l-4 border-red-400 p-6">
                <ul className="list-disc pl-6 space-y-2 text-red-800">
                  <li>Fever, wound drainage, new or worsening weakness</li>
                  <li>Loss of bowel/bladder control</li>
                  <li>Leg pain that is worse than before surgery or not improving over 2–3 weeks</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Return to Sports</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">Early Return (2-4 weeks)</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Walking/cycling: generally within 2–4 weeks</li>
                    <li>Swimming (once wound fully healed): ~3–4 weeks</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">Later Return (6+ weeks)</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Running/impact: 6–10+ weeks depending on symptoms and strength</li>
                    <li>Gym: graded return with spine‑neutral technique and professional supervision</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Will I need physiotherapy?</h3>
                  <p className="text-gray-700">Yes—after the wound check. Core stabilization, hip‑glute strength, and posture training reduce recurrence risk.</p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Can the disc re‑herniate?</h3>
                  <p className="text-gray-700">Recurrence can happen after any decompression. Precise technique and adherence to rehab lower risk, but no approach eliminates it.</p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Is endoscopic recovery always faster?</h3>
                  <p className="text-gray-700">Many eligible patients mobilize sooner, but outcomes vary. Your plan is individualized to safety and symptoms.</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Related Services</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">
                    <a href="/services/endoscopic-discectomy-hyderabad/" className="text-blue-600 hover:text-blue-800">
                      Endoscopic Discectomy
                    </a>
                  </h3>
                  <p className="text-sm text-gray-600">Minimally invasive treatment for herniated discs</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">
                    <a href="/services/minimally-invasive-spine-surgery/" className="text-blue-600 hover:text-blue-800">
                      Minimally Invasive Spine Surgery
                    </a>
                  </h3>
                  <p className="text-sm text-gray-600">Comprehensive MISS techniques and recovery planning</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">
                    <a href="/conditions/sciatica-treatment-hyderabad/" className="text-blue-600 hover:text-blue-800">
                      Sciatica Treatment
                    </a>
                  </h3>
                  <p className="text-sm text-gray-600">Conservative to surgical treatment options</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">
                    <a href="/appointments/" className="text-blue-600 hover:text-blue-800">
                      Book Consultation
                    </a>
                  </h3>
                  <p className="text-sm text-gray-600">Schedule your personalized recovery plan</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Call to Action</h2>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
                <p className="text-lg text-blue-800 mb-4">
                  Book a consultation at Yashoda Hospitals – Malakpet. Bring your MRI and job details; we'll tailor an RTW plan that fits your role.
                </p>
                <a 
                  href="/appointments/" 
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Schedule Consultation
                </a>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">References</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <a href="https://www.aans.org/patients/conditions-and-treatments" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                    AANS: Conditions and Treatments
                  </a>
                </li>
                <li>
                  <a href="https://www.ninds.nih.gov/health-information/disorders" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                    NINDS: Neurological Disorders
                  </a>
                </li>
                <li>
                  <a href="https://www.nhs.uk/conditions/sciatica/treatment/" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                    NHS: Sciatica Treatment
                  </a>
                </li>
                <li>
                  <a href="https://www.mayoclinic.org/diseases-conditions/herniated-disk/symptoms-causes/syc-20354095" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                    Mayo Clinic: Herniated Disk
                  </a>
                </li>
              </ul>
            </section>

            <section className="border-t pt-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">Disclaimer</h3>
                <p className="text-yellow-700 text-sm">
                  Educational only; not a substitute for clinical advice. Timelines vary; safety first.
                </p>
                <p className="text-yellow-700 text-sm mt-2">
                  Last medically reviewed: October 1, 2025 by Dr Sayuj Krishnan
                </p>
              </div>
            </section>

            <section className="mt-8 space-y-4">
              <ReviewedBy />
              <NAP />
            </section>
          </div>
        </article>
      </div>
    </>
  )
}
