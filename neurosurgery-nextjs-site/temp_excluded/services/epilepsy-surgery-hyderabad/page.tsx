import { SITE_URL, webPageJsonLd, serviceJsonLd, medicalGuidelineJsonLd, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, procedureJsonLd, itemListJsonLd, idFor } from "../../src/lib/seo";
import type { Metadata } from "next";
import RelatedContent from "../../components/RelatedContent";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Epilepsy Surgery in Hyderabad | Dr Sayuj Krishnan - Advanced Seizure Treatment",
  description: "Expert epilepsy surgery in Hyderabad including LITT, VNS, and resection. Dr Sayuj Krishnan provides comprehensive evaluation and treatment for drug-resistant seizures.",
  alternates: { 
    canonical: "/services/epilepsy-surgery-hyderabad/",
    languages: {
      'en-IN': 'https://www.drsayuj.com/services/epilepsy-surgery-hyderabad/',
      'x-default': 'https://www.drsayuj.com/services/epilepsy-surgery-hyderabad/'
    }
  },
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Epilepsy Surgery in Hyderabad")}&subtitle=${encodeURIComponent("Advanced Seizure Treatment • LITT • VNS • Resection")}`,
        width: 1200,
        height: 630,
        alt: "Epilepsy Surgery — Dr Sayuj Krishnan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Epilepsy Surgery in Hyderabad")}&subtitle=${encodeURIComponent("Advanced Seizure Treatment • LITT • VNS • Resection")}`,
        alt: "Epilepsy Surgery — Dr Sayuj Krishnan",
      },
    ],
  },
};

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

export default function EpilepsySurgeryPage() {
  const canonical = `${SITE_URL}/services/epilepsy-surgery-hyderabad`;
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
    name: "Epilepsy Surgery",
    description: "Advanced surgical treatment for drug-resistant epilepsy including LITT, VNS, and resection techniques",
    bodyLocation: "Brain",
    preparation: "Comprehensive epilepsy evaluation including video EEG monitoring, neuropsychological testing, and advanced brain imaging",
    procedureType: "Surgical",
    followup: "Regular follow-up with seizure monitoring and medication adjustment",
    outcome: "Reduction or elimination of seizures in appropriately selected patients",
    contraindication: "Patients who respond well to medications or have seizures originating from multiple brain areas",
    indication: [
      { "@type": "MedicalIndication", name: "Drug-resistant epilepsy" },
      { "@type": "MedicalIndication", name: "Focal seizures" },
      { "@type": "MedicalIndication", name: "Seizures with identifiable focus" }
    ]
  };

  const relatedItemsAbs = [
    {
      title: "Brain Tumor Surgery",
      description: "Advanced microsurgical treatment for brain tumors with neuronavigation.",
      href: "/services/brain-tumor-surgery-hyderabad",
      category: "procedure" as const
    },
    {
      title: "Trigeminal Neuralgia Treatment",
      description: "Advanced treatment for trigeminal neuralgia including microvascular decompression.",
      href: "/conditions/trigeminal-neuralgia-treatment-hyderabad",
      category: "condition" as const
    },
    {
      title: "Minimally Invasive Spine Surgery",
      description: "Endoscopic spine surgery for faster recovery and better outcomes.",
      href: "/services/minimally-invasive-spine-surgery",
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
        name: "Who is a candidate for epilepsy surgery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Candidates for epilepsy surgery typically have drug-resistant epilepsy with seizures that originate from a specific, identifiable area of the brain that can be safely removed or treated."
        }
      },
      {
        "@type": "Question",
        name: "What types of epilepsy surgery are available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Epilepsy surgery options include resection (removing the seizure focus), LITT (laser ablation), VNS (vagus nerve stimulation), and other neuromodulation techniques."
        }
      },
      {
        "@type": "Question",
        name: "What is the success rate of epilepsy surgery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Success rates vary by procedure type and patient selection, but many patients experience significant reduction in seizures or become seizure-free after appropriate epilepsy surgery."
        }
      }
    ]
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services/" },
          { name: "Epilepsy Surgery", href: "/services/epilepsy-surgery-hyderabad/" }
        ]}
      />
      <main className="container mx-auto px-4 py-16">
        <article className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Epilepsy Surgery in Hyderabad</h1>
          <p className="text-lg text-gray-600">Advanced treatment for drug-resistant seizures</p>
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
            <h2>What is Epilepsy Surgery?</h2>
            <p>
              Epilepsy surgery is a treatment option for people with drug-resistant epilepsy (seizures that don't 
              respond to medications). The goal is to reduce or eliminate seizures by removing or treating the 
              specific area of the brain where seizures start.
            </p>
            <p>
              Dr Sayuj Krishnan provides comprehensive epilepsy evaluation and offers advanced surgical techniques 
              including resection, laser ablation (LITT), and neuromodulation devices.
            </p>
          </section>

          <section className="mb-8">
            <h2>Who is a Candidate for Epilepsy Surgery?</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <p className="mb-4">
                You may be a candidate for epilepsy surgery if you have:
              </p>
              <ul className="space-y-2">
                <li>• <strong>Drug-resistant epilepsy:</strong> Seizures that continue despite trying multiple medications</li>
                <li>• <strong>Focal seizures:</strong> Seizures that start in one specific area of the brain</li>
                <li>• <strong>Identifiable seizure focus:</strong> A clear area in the brain where seizures begin</li>
                <li>• <strong>Safe to remove:</strong> The seizure focus can be removed without causing serious problems</li>
                <li>• <strong>Quality of life impact:</strong> Seizures significantly affect your daily life</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2>Types of Epilepsy Surgery</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Resection Surgery</h3>
                <p>
                  The most common type of epilepsy surgery. Dr Sayuj removes the specific area of the brain 
                  where seizures start. This is done using advanced techniques to protect important brain functions.
                </p>
                <ul className="mt-3 space-y-1">
                  <li>• Temporal lobectomy (most common)</li>
                  <li>• Frontal lobectomy</li>
                  <li>• Parietal or occipital resection</li>
                  <li>• Lesionectomy (removing scar tissue or malformations)</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Laser Interstitial Thermal Therapy (LITT)</h3>
                <p>
                  A minimally invasive procedure that uses laser heat to destroy the seizure focus. This is 
                  done through a small hole in the skull, making it less invasive than traditional surgery.
                </p>
                <ul className="mt-3 space-y-1">
                  <li>• Smaller incision and faster recovery</li>
                  <li>• Real-time MRI guidance during the procedure</li>
                  <li>• Good option for deep or hard-to-reach areas</li>
                  <li>• Lower risk of complications</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Vagus Nerve Stimulation (VNS)</h3>
                <p>
                  A device is implanted under the skin that sends electrical signals to the vagus nerve. 
                  This can help reduce seizure frequency and severity.
                </p>
                <ul className="mt-3 space-y-1">
                  <li>• Device implanted in the chest</li>
                  <li>• Wire connects to the vagus nerve in the neck</li>
                  <li>• Can be adjusted without additional surgery</li>
                  <li>• Often used when resection isn't possible</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2>Epilepsy Evaluation Process</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Comprehensive Assessment</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Initial Evaluation</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Detailed seizure history</li>
                    <li>• Current medications and response</li>
                    <li>• Neurological examination</li>
                    <li>• Brain imaging (MRI, CT)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Advanced Testing</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Video EEG monitoring</li>
                    <li>• Neuropsychological testing</li>
                    <li>• Functional MRI (fMRI)</li>
                    <li>• PET scan (if needed)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2>What to Expect During Surgery</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">1</div>
                <div>
                  <h3 className="font-semibold">Preparation</h3>
                  <p>You'll receive general anesthesia and be positioned for the procedure. Advanced monitoring equipment will track brain function.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">2</div>
                <div>
                  <h3 className="font-semibold">Surgical Approach</h3>
                  <p>Dr Sayuj will use the most appropriate technique based on your evaluation - resection, LITT, or device implantation.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">3</div>
                <div>
                  <h3 className="font-semibold">Monitoring</h3>
                  <p>Throughout the procedure, brain function is monitored to ensure important areas are protected.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">4</div>
                <div>
                  <h3 className="font-semibold">Closure</h3>
                  <p>The procedure is completed and you're moved to recovery for monitoring.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2>Recovery and Follow-up</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Hospital Stay</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>ICU monitoring:</strong> 1-2 days for close observation</li>
                  <li>• <strong>Regular ward:</strong> 3-5 days depending on procedure</li>
                  <li>• <strong>Seizure monitoring:</strong> Continuous EEG monitoring</li>
                  <li>• <strong>Medication adjustment:</strong> Gradual changes to seizure medications</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">At Home Recovery</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Rest:</strong> Avoid heavy activities for 4-6 weeks</li>
                  <li>• <strong>Seizure diary:</strong> Keep track of any seizures</li>
                  <li>• <strong>Follow-up visits:</strong> Regular check-ups with Dr Sayuj</li>
                  <li>• <strong>Medication management:</strong> Gradual adjustment of seizure medications</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2>Success Rates and Outcomes</h2>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-700">Expected Outcomes</h3>
              <ul className="space-y-2">
                <li>• <strong>Seizure-free:</strong> 60-80% of patients become seizure-free after temporal lobectomy</li>
                <li>• <strong>Significant improvement:</strong> Most patients experience major reduction in seizure frequency</li>
                <li>• <strong>Quality of life:</strong> Improved daily functioning and independence</li>
                <li>• <strong>Medication reduction:</strong> Many patients can reduce or stop seizure medications</li>
              </ul>
              <p className="mt-3 text-sm text-gray-600">
                <strong>Note:</strong> Success rates vary based on the type of epilepsy, location of seizure focus, 
                and surgical approach used.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2>Risks and Complications</h2>
            <p>
              Like all brain surgeries, epilepsy surgery has some risks. Dr Sayuj will discuss these with you 
              before the procedure:
            </p>
            <ul className="space-y-2">
              <li>• <strong>Infection:</strong> Rare, but possible at the surgical site</li>
              <li>• <strong>Bleeding:</strong> Uncommon, but may require additional treatment</li>
              <li>• <strong>Memory problems:</strong> Temporary or permanent changes in memory function</li>
              <li>• <strong>Speech or language changes:</strong> Rare, but possible with certain procedures</li>
              <li>• <strong>Continued seizures:</strong> Some patients may still have seizures after surgery</li>
            </ul>
            <p>
              <strong>Important:</strong> Dr Sayuj uses advanced techniques and careful evaluation to minimize 
              these risks and maximize your chances of success.
            </p>
          </section>

          <section id="faqs" className="mb-8">
            <h2>Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">How do I know if I'm a candidate for epilepsy surgery?</h3>
                <p>
                  You'll need a comprehensive evaluation including video EEG monitoring, brain imaging, and 
                  neuropsychological testing. Dr Sayuj will review your case and determine if surgery is 
                  appropriate for your specific type of epilepsy.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Will I still need to take seizure medications after surgery?</h3>
                <p>
                  This depends on your individual case. Some patients can reduce or stop medications, while 
                  others may need to continue them. Dr Sayuj will work with you to find the best medication 
                  plan after surgery.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">How long does it take to see results after epilepsy surgery?</h3>
                <p>
                  Some patients see immediate improvement, while others may take several months. It's important 
                  to be patient and follow Dr Sayuj's recommendations for recovery and follow-up care.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">What if epilepsy surgery doesn't work?</h3>
                <p>
                  If the first surgery doesn't provide the desired results, Dr Sayuj may recommend additional 
                  evaluation or different treatment approaches. There are multiple options available for 
                  drug-resistant epilepsy.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8 bg-blue-50 p-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-4">Ready to Explore Epilepsy Surgery Options?</h3>
            <p className="mb-4">
              Dr Sayuj Krishnan provides comprehensive evaluation and advanced surgical treatment for drug-resistant epilepsy.
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
            "mainEntityOfPage": "https://www.drsayuj.com/services/epilepsy-surgery-hyderabad",
            "name": "Epilepsy Surgery in Hyderabad",
            "description": "Advanced surgical treatment for drug-resistant epilepsy including LITT, VNS, and resection techniques.",
            "medicalSpecialty": "Neurosurgery",
            "about": {
              "@type": "MedicalProcedure",
              "name": "Epilepsy Surgery",
              "indication": [{"@type": "MedicalIndication", "name": "Drug-resistant epilepsy"}]
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
                  "name": "Services",
                  "item": "https://www.drsayuj.com/services"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Epilepsy Surgery",
                  "item": "https://www.drsayuj.com/services/epilepsy-surgery-hyderabad"
                }
              ]
            }
          })
        }}
      />
    </>
  );
}