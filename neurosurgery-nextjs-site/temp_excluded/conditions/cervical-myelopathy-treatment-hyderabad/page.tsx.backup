import { SITE_URL, webPageJsonLd, serviceJsonLd, medicalGuidelineJsonLd, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, procedureJsonLd, itemListJsonLd, idFor } from "../../../../src/lib/seo";
import type { Metadata } from "next";
import RelatedContent from "../../../components/RelatedContent";
import Breadcrumbs from "../../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Cervical Myelopathy Treatment in Hyderabad | Dr Sayuj Krishnan - Expert Spine Surgery",
  description: "Expert cervical myelopathy treatment in Hyderabad by Dr Sayuj Krishnan. Advanced surgical options including ACDF, cervical disc replacement, and endoscopic decompression. Book consultation.",
  alternates: { 
    canonical: "/conditions/cervical-myelopathy-treatment-hyderabad/",
    languages: {
      'en-IN': 'https://www.drsayuj.com/conditions/cervical-myelopathy-treatment-hyderabad/',
      'x-default': 'https://www.drsayuj.com/conditions/cervical-myelopathy-treatment-hyderabad/'
    }
  },
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Cervical Myelopathy Treatment in Hyderabad")}&subtitle=${encodeURIComponent("Dr Sayuj Krishnan - Expert Spine Surgery")}`,
        width: 1200,
        height: 630,
        alt: "Cervical Myelopathy Treatment — Dr Sayuj Krishnan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Cervical Myelopathy Treatment in Hyderabad")}&subtitle=${encodeURIComponent("Dr Sayuj Krishnan - Expert Spine Surgery")}`,
        alt: "Cervical Myelopathy Treatment — Dr Sayuj Krishnan",
      },
    ],
  },
};

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

export default function CervicalMyelopathyPage() {
  const canonical = `${SITE_URL}/conditions/cervical-myelopathy-treatment-hyderabad`;
  const WEB_ID = idFor(canonical, "webpage");
  const PROC_ID = idFor(canonical, "procedure");
  const BREAD_ID = idFor(canonical, "breadcrumbs");
  const RELATED_ID = idFor(canonical, "related");
  const CONTACT_ID = idFor(canonical, "contact");
  const PHYS_ID = idFor(SITE_URL, "physician");
  const FAQ_ID = idFor(canonical, "faqs");

  const ldProc: any = {
    "@type": "MedicalProcedure",
    "@id": PROC_ID,
    name: "Cervical Myelopathy Treatment",
    description: "Advanced treatment for cervical myelopathy including ACDF, cervical disc replacement, and endoscopic decompression",
    bodyLocation: "Cervical spine",
    preparation: "Comprehensive evaluation including MRI, CT myelogram, and neurological assessment",
    procedureType: "Surgical",
    followup: "Regular follow-up with neurological monitoring and rehabilitation",
    outcome: "Prevention of further neurological deterioration and improvement in function",
    contraindication: "Patients with severe medical comorbidities or advanced age with minimal symptoms",
    indication: [
      { "@type": "MedicalIndication", name: "Cervical myelopathy" },
      { "@type": "MedicalIndication", name: "Spinal cord compression" },
      { "@type": "MedicalIndication", name: "Progressive neurological deficits" }
    ]
  };

  const relatedItemsAbs = [
    {
      title: "Cervical Radiculopathy Treatment",
      description: "Treatment for nerve root compression in the cervical spine.",
      href: "/conditions/cervical-radiculopathy-treatment-hyderabad",
      category: "condition" as const
    },
    {
      title: "Endoscopic Cervical Discectomy",
      description: "Minimally invasive cervical spine surgery for disc herniation.",
      href: "/services/endoscopic-cervical-discectomy-hyderabad",
      category: "procedure" as const
    },
    {
      title: "Cervical Disc Replacement",
      description: "Motion-preserving surgery for cervical disc disease.",
      href: "/services/cervical-disc-replacement-hyderabad",
      category: "procedure" as const
    }
  ];
  const ldRelatedList = itemListJsonLd({
    name: "Related content",
    items: relatedItemsAbs.map(item => ({ name: item.title, url: `${SITE_URL}${item.href}`, description: item.description })),
    id: RELATED_ID
  });

  // FAQPage JSON-LD
  const ldFaq = {
    "@type": "FAQPage",
    "@id": FAQ_ID,
    mainEntity: [
      {
        "@type": "Question",
        name: "What is cervical myelopathy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cervical myelopathy is a condition where the spinal cord in the neck is compressed, leading to neurological symptoms like weakness, numbness, and coordination problems."
        }
      },
      {
        "@type": "Question",
        name: "What are the symptoms of cervical myelopathy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Symptoms include neck pain, weakness in arms and legs, numbness, difficulty with fine motor skills, balance problems, and in severe cases, bowel or bladder dysfunction."
        }
      },
      {
        "@type": "Question",
        name: "When is surgery needed for cervical myelopathy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Surgery is typically recommended when there is progressive neurological deterioration, severe spinal cord compression, or when conservative treatments fail to prevent further damage."
        }
      }
    ]
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Conditions", href: "/conditions/" },
          { name: "Cervical Myelopathy Treatment", href: "/conditions/cervical-myelopathy-treatment-hyderabad/" }
        ]}
      />
      <main className="container mx-auto px-4 py-16">
        <article className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Cervical Myelopathy Treatment in Hyderabad</h1>
          <p className="text-lg text-gray-600">Expert treatment for spinal cord compression in the neck</p>
        </header>

        <section className="bg-blue-50 p-6 rounded-lg mb-8">
          <p className="text-center">
            <strong>Contact:</strong> 
            <a href="tel:+919778280044" className="text-blue-600 hover:underline ml-2">+91-9778280044</a> • 
            <a href="mailto:neurospinehyd@drsayuj.com" className="text-blue-600 hover:underline ml-2">neurospinehyd@drsayuj.com</a> • 
            <a href="/appointments" className="text-blue-600 hover:underline ml-2">Appointments</a>
          </p>
        </section>

        <div className="prose max-w-none">
          {/* Medical Review Notice */}
          <div className="bg-blue-50 p-4 rounded-lg mb-8">
            <p className="text-sm text-gray-700">
              <strong>Medically reviewed by Dr Sayuj Krishnan</strong> — MBBS, DNB Neurosurgery (Direct 6 years), Fellowship in Minimally Invasive and Advanced Spine Surgery<br/>
              <strong>Last reviewed:</strong> October 1, 2025
            </p>
          </div>

          <section className="mb-8">
            <h2>What is Cervical Myelopathy?</h2>
            <p>
              Cervical myelopathy is a serious condition where the spinal cord in the neck (cervical spine) 
              becomes compressed. This compression can damage the spinal cord and cause neurological problems 
              that affect your arms, legs, and even your ability to walk.
            </p>
            <p>
              Dr Sayuj Krishnan specializes in treating cervical myelopathy with advanced surgical techniques 
              to relieve pressure on the spinal cord and prevent further neurological damage.
            </p>
          </section>

          <section className="mb-8">
            <h2>What Causes Cervical Myelopathy?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Common Causes</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Cervical stenosis:</strong> Narrowing of the spinal canal</li>
                  <li>• <strong>Disc herniation:</strong> Bulging or ruptured discs</li>
                  <li>• <strong>Bone spurs:</strong> Extra bone growth (osteophytes)</li>
                  <li>• <strong>Ligament thickening:</strong> Thickened ligaments pressing on the cord</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Risk Factors</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Age:</strong> More common in people over 50</li>
                  <li>• <strong>Previous neck injury:</strong> Trauma to the cervical spine</li>
                  <li>• <strong>Arthritis:</strong> Degenerative changes in the spine</li>
                  <li>• <strong>Genetics:</strong> Family history of spine problems</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2>Symptoms of Cervical Myelopathy</h2>
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500 mb-6">
              <p className="text-red-800 font-semibold">
                <strong>Warning:</strong> If you experience sudden weakness, numbness, or difficulty walking, 
                seek immediate medical attention. These could be signs of serious spinal cord compression.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Early Symptoms</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Neck pain and stiffness</li>
                  <li>• Tingling or numbness in hands and fingers</li>
                  <li>• Difficulty with fine motor skills (buttoning shirts, writing)</li>
                  <li>• Weakness in arms or hands</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Advanced Symptoms</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Weakness in legs</li>
                  <li>• Difficulty walking or balance problems</li>
                  <li>• Loss of coordination</li>
                  <li>• Bowel or bladder problems (in severe cases)</li>
                  <li>• Muscle spasms or stiffness</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2>How is Cervical Myelopathy Diagnosed?</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Diagnostic Process</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Physical Examination</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Neurological examination</li>
                    <li>• Reflex testing</li>
                    <li>• Strength and sensation testing</li>
                    <li>• Balance and coordination tests</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Imaging Studies</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• MRI of cervical spine</li>
                    <li>• CT myelogram (if needed)</li>
                    <li>• X-rays of the neck</li>
                    <li>• Electromyography (EMG)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2>Treatment Options</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Conservative Treatment</h3>
                <p className="text-gray-700 mb-3">
                  For mild cases or when surgery isn't immediately needed:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Physical therapy and exercises</li>
                  <li>• Pain medications and anti-inflammatory drugs</li>
                  <li>• Cervical collar or brace</li>
                  <li>• Activity modification</li>
                  <li>• Regular monitoring with imaging</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Surgical Treatment</h3>
                <p className="text-gray-700 mb-3">
                  Surgery is recommended when there is progressive neurological deterioration or severe compression:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>ACDF (Anterior Cervical Discectomy and Fusion):</strong> Removes disc and fuses vertebrae</li>
                  <li>• <strong>Cervical Disc Replacement:</strong> Replaces damaged disc with artificial disc</li>
                  <li>• <strong>Posterior Decompression:</strong> Removes bone and ligament from behind</li>
                  <li>• <strong>Endoscopic Decompression:</strong> Minimally invasive approach</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2>Surgical Procedures for Cervical Myelopathy</h2>
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">ACDF (Anterior Cervical Discectomy and Fusion)</h3>
                <p className="text-gray-700 mb-4">
                  The most common surgery for cervical myelopathy. Dr Sayuj approaches the spine from the front 
                  of the neck to remove the compressed disc and fuse the vertebrae together.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Benefits:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Direct access to the problem area</li>
                      <li>• High success rate</li>
                      <li>• Relieves pressure on spinal cord</li>
                      <li>• Prevents further damage</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Recovery:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Hospital stay: 1-2 days</li>
                      <li>• Return to work: 2-4 weeks</li>
                      <li>• Full recovery: 3-6 months</li>
                      <li>• Physical therapy recommended</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">Cervical Disc Replacement</h3>
                <p className="text-gray-700 mb-4">
                  A newer procedure that replaces the damaged disc with an artificial disc, preserving 
                  motion in the neck while relieving pressure on the spinal cord.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Benefits:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Preserves neck motion</li>
                      <li>• Reduces stress on adjacent discs</li>
                      <li>• Faster recovery than fusion</li>
                      <li>• Natural feel and movement</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Recovery:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Hospital stay: 1-2 days</li>
                      <li>• Return to work: 1-2 weeks</li>
                      <li>• Full recovery: 2-3 months</li>
                      <li>• Less physical therapy needed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2>What to Expect After Surgery</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Immediate Recovery</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Hospital stay:</strong> 1-2 days for monitoring</li>
                  <li>• <strong>Pain management:</strong> Medications to keep you comfortable</li>
                  <li>• <strong>Neck brace:</strong> May be needed for support</li>
                  <li>• <strong>Activity restrictions:</strong> No heavy lifting or bending</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Long-term Recovery</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Physical therapy:</strong> To restore strength and function</li>
                  <li>• <strong>Follow-up visits:</strong> Regular check-ups with Dr Sayuj</li>
                  <li>• <strong>Gradual return:</strong> Slowly resume normal activities</li>
                  <li>• <strong>Monitoring:</strong> Watch for any new symptoms</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2>Risks and Complications</h2>
            <p>
              Like all surgeries, cervical myelopathy surgery has some risks. Dr Sayuj will discuss these 
              with you before the procedure:
            </p>
            <ul className="space-y-2">
              <li>• <strong>Infection:</strong> Rare, but possible at the surgical site</li>
              <li>• <strong>Bleeding:</strong> Uncommon, but may require additional treatment</li>
              <li>• <strong>Nerve damage:</strong> Rare, but could cause temporary or permanent problems</li>
              <li>• <strong>Difficulty swallowing:</strong> Temporary, usually improves within weeks</li>
              <li>• <strong>Voice changes:</strong> Rare, usually temporary</li>
              <li>• <strong>Hardware problems:</strong> Rare issues with plates, screws, or artificial discs</li>
            </ul>
            <p>
              <strong>Important:</strong> Dr Sayuj uses advanced techniques and careful planning to minimize 
              these risks and maximize your chances of a successful outcome.
            </p>
          </section>

          <section id="faqs" className="mb-8">
            <h2>Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Can cervical myelopathy be treated without surgery?</h3>
                <p>
                  In mild cases, conservative treatment may help manage symptoms. However, if there is 
                  progressive neurological deterioration or severe spinal cord compression, surgery is 
                  usually recommended to prevent permanent damage.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">How long does it take to recover from cervical myelopathy surgery?</h3>
                <p>
                  Recovery time varies depending on the procedure and individual factors. Most patients 
                  can return to light activities within 2-4 weeks, but full recovery may take 3-6 months. 
                  Dr Sayuj will provide a personalized recovery plan.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Will I be able to move my neck normally after surgery?</h3>
                <p>
                  With ACDF, there may be some loss of motion at the fused level, but this is usually 
                  minimal and doesn't affect daily activities. With cervical disc replacement, neck 
                  motion is preserved. Dr Sayuj will discuss the best option for your specific case.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">What happens if cervical myelopathy is not treated?</h3>
                <p>
                  Untreated cervical myelopathy can lead to progressive neurological deterioration, 
                  permanent disability, and in severe cases, paralysis. Early diagnosis and treatment 
                  are crucial for the best outcomes.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8 bg-blue-50 p-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-4">Ready to Discuss Your Cervical Myelopathy Treatment?</h3>
            <p className="mb-4">
              Dr Sayuj Krishnan provides expert evaluation and advanced surgical treatment for cervical myelopathy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/appointments" className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors">
                Book Consultation
              </a>
              <a href="/about" className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                About Dr Sayuj
              </a>
            </div>
          </section>

          <section className="mb-8">
            <h2>Medical disclaimer</h2>
            <p>Educational only; not medical advice. Decisions require clinical exam and comprehensive review.</p>
          </section>
        </div>
      </article>

      <RelatedContent items={relatedItemsAbs} />

      {/* JSON-LD (single @graph for clean de-duplication) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            "mainEntityOfPage": "https://www.drsayuj.com/conditions/cervical-myelopathy-treatment-hyderabad",
            "name": "Cervical Myelopathy Treatment in Hyderabad",
            "description": "Expert treatment for cervical myelopathy including ACDF, cervical disc replacement, and endoscopic decompression.",
            "medicalSpecialty": "Neurosurgery",
            "about": {
              "@type": "MedicalProcedure",
              "name": "Cervical Myelopathy Treatment",
              "indication": [{"@type": "MedicalIndication", "name": "Cervical myelopathy"}]
            },
            "provider": {
              "@type": "Physician",
              "name": "Dr Sayuj Krishnan",
              "medicalSpecialty": "Neurosurgery"
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.drsayuj.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Conditions",
                  "item": "https://www.drsayuj.com/conditions"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Cervical Myelopathy Treatment",
                  "item": "https://www.drsayuj.com/conditions/cervical-myelopathy-treatment-hyderabad"
                }
              ]
            }
          })
        }}
      />
    </>
  );
}
