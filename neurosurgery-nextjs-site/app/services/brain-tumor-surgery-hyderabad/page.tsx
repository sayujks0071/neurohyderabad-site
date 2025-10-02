import { SITE_URL, webPageJsonLd, serviceJsonLd, medicalGuidelineJsonLd, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, procedureJsonLd, itemListJsonLd, idFor } from "../../../src/lib/seo";
import type { Metadata } from "next";
import RelatedContent from "../../components/RelatedContent";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Brain Tumor Surgery in Hyderabad | Microsurgery",
  description: "Neuronavigation‑guided microsurgery with neuromonitoring for maximal safe resection when appropriate. Multidisciplinary care. Book a consultation.",
  alternates: { 
    canonical: "/services/brain-tumor-surgery-hyderabad/",
    languages: {
      'en-IN': 'https://www.drsayuj.com/services/brain-tumor-surgery-hyderabad/',
      'x-default': 'https://www.drsayuj.com/services/brain-tumor-surgery-hyderabad/'
    }
  },
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Brain Tumor Surgery in Hyderabad")}&subtitle=${encodeURIComponent("Microsurgery • Maximal safe resection")}`,
        width: 1200,
        height: 630,
        alt: "Brain Tumor Surgery — Dr Sayuj Krishnan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Brain Tumor Surgery in Hyderabad")}&subtitle=${encodeURIComponent("Microsurgery • Maximal safe resection")}`,
        alt: "Brain Tumor Surgery — Dr Sayuj Krishnan",
      },
    ],
  },
};

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

export default function BrainTumorSurgeryPage() {
  const canonical = `${SITE_URL}/services/brain-tumor-surgery-hyderabad`;
  const WEB_ID = idFor(canonical, "webpage");
  const PROC_ID = idFor(canonical, "procedure");
  const BREAD_ID = idFor(canonical, "breadcrumbs");
  const RELATED_ID = idFor(canonical, "related");
  const CONTACT_ID = idFor(canonical, "contact");
  const PHYS_ID = idFor(SITE_URL, "physician");
  const FAQ_ID = idFor(canonical, "faqs");

  const ldProc: any = {
    ...procedureJsonLd({
      name: "Brain Tumor Surgery",
      description: "Advanced microsurgical techniques for brain tumor removal with maximal safe resection while preserving neurological function.",
      bodyLocation: "Brain",
      preparation: "Preoperative imaging, medical evaluation, anesthesia consultation",
      procedureType: "Surgical procedure"
    }),
    url: canonical
  };
  ldProc["@id"] = PROC_ID;

  const ldWeb = webPageJsonLd({
    name: "Brain Tumor Surgery in Hyderabad",
    description: metadata.description ?? "",
    url: canonical,
    dateModified: new Date().toISOString(),
    mainEntity: { "@id": PROC_ID },
    about: { "@id": PROC_ID },
    mentions: [{ "@id": PROC_ID }]
  });
  (ldWeb as any)["@id"] = WEB_ID;

  const ldPhys: any = physicianJsonLd();
  ldPhys["@id"] = PHYS_ID;

  const ldCrumbs: any = breadcrumbJsonLd([
    { name: "Home", url: SITE_URL + "/" },
    { name: "Services", url: SITE_URL + "/services" },
    { name: "Brain Tumor Surgery", url: canonical }
  ]);
  ldCrumbs["@id"] = BREAD_ID;

  const ldGuideline = medicalGuidelineJsonLd({
    name: "AANS guidelines on brain tumor surgery",
    url: "https://www.aans.org/",
    subject: { name: "Brain Tumor Surgery", type: "MedicalProcedure" }
  });

  const ldContact = contactPointJsonLd({
    phone: "+91 9778280044",
    contactType: "appointments",
    areaServed: "IN",
    languages: ["en", "hi", "te"],
    id: CONTACT_ID
  });

  const relatedItemsAbs = [
    {
      title: "Trigeminal Neuralgia Treatment",
      description: "Advanced treatment for trigeminal neuralgia including microvascular decompression.",
      href: "/conditions/trigeminal-neuralgia-treatment-hyderabad",
      category: "condition" as const
    },
    {
      title: "Epilepsy Surgery",
      description: "Comprehensive epilepsy surgery for drug-resistant seizures.",
      href: "/services/epilepsy-surgery-hyderabad",
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
        name: "What types of brain tumors can be treated with surgery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Both primary brain tumors (gliomas, meningiomas, pituitary tumors) and metastatic brain tumors can often be treated with surgery, depending on location, size, and patient factors."
        }
      },
      {
        "@type": "Question",
        name: "What is maximal safe resection in brain tumor surgery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Maximal safe resection means removing as much of the tumor as possible while preserving critical brain functions like speech, movement, and cognition through advanced monitoring techniques."
        }
      },
      {
        "@type": "Question",
        name: "What advanced techniques are used in brain tumor surgery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Advanced techniques include neuronavigation for precise tumor localization, intraoperative monitoring to protect brain function, and awake craniotomy for tumors near critical areas."
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
          { name: "Brain Tumor Surgery", href: "/services/brain-tumor-surgery-hyderabad/" }
        ]}
      />
      <main className="container mx-auto px-4 py-16">
        <article className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Brain Tumor Surgery in Hyderabad</h1>
          <p className="text-lg text-gray-600">Microsurgery, neuronavigation, and multidisciplinary care</p>
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
            <h2>What is Brain Tumor Surgery?</h2>
            <p>
              Brain tumor surgery is a procedure to remove abnormal growths in the brain. These growths can be 
              cancerous (malignant) or non-cancerous (benign). The goal is to remove as much of the tumor as 
              possible while protecting healthy brain tissue.
            </p>
            <p>
              Dr Sayuj Krishnan uses advanced techniques including neuronavigation and intraoperative monitoring 
              to ensure the safest possible surgery with the best outcomes.
            </p>
          </section>

          <section className="mb-8">
            <h2>Types of Brain Tumors We Treat</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Primary Brain Tumors</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Gliomas:</strong> Tumors that start in brain cells</li>
                  <li>• <strong>Meningiomas:</strong> Tumors in the brain's outer covering</li>
                  <li>• <strong>Pituitary tumors:</strong> Growths in the pituitary gland</li>
                  <li>• <strong>Acoustic neuromas:</strong> Tumors on the hearing nerve</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Metastatic Brain Tumors</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Cancer spread:</strong> Tumors that spread from other body parts</li>
                  <li>• <strong>Common sources:</strong> Lung, breast, kidney, or skin cancer</li>
                  <li>• <strong>Treatment:</strong> Often combined with other cancer treatments</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2>When is Brain Tumor Surgery Recommended?</h2>
            <p>
              Surgery may be recommended when:
            </p>
            <ul className="space-y-2">
              <li>• The tumor is causing symptoms like headaches, seizures, or weakness</li>
              <li>• The tumor is growing and could damage healthy brain tissue</li>
              <li>• We need a tissue sample to determine the exact type of tumor</li>
              <li>• The tumor can be safely removed without harming critical brain functions</li>
              <li>• Other treatments like radiation or chemotherapy aren't enough</li>
            </ul>
            <p>
              <strong>Important:</strong> Not all brain tumors need surgery. Some small, slow-growing tumors 
              may be monitored with regular scans instead.
            </p>
          </section>

          <section className="mb-8">
            <h2>Advanced Surgical Techniques</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Neuronavigation</h3>
                <p>
                  Like GPS for the brain, this technology helps Dr Sayuj locate the exact position of the tumor 
                  during surgery. It uses 3D imaging to guide the surgical instruments precisely.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Intraoperative Monitoring</h3>
                <p>
                  Special monitoring equipment watches brain function during surgery. This helps protect 
                  important areas that control speech, movement, and thinking.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Awake Craniotomy</h3>
                <p>
                  For tumors near speech or movement areas, you may be awake during part of the surgery. 
                  This allows Dr Sayuj to test brain function while removing the tumor safely.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2>What to Expect Before Surgery</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Pre-Surgery Evaluation</h3>
              <ul className="space-y-2">
                <li>• <strong>Detailed brain imaging:</strong> MRI and CT scans to map the tumor</li>
                <li>• <strong>Neurological exam:</strong> Tests of brain function and symptoms</li>
                <li>• <strong>Medical history review:</strong> Understanding your overall health</li>
                <li>• <strong>Team consultation:</strong> Meeting with oncology, radiology, and other specialists</li>
                <li>• <strong>Risk assessment:</strong> Discussion of potential benefits and risks</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2>The Surgery Process</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">1</div>
                <div>
                  <h3 className="font-semibold">Preparation</h3>
                  <p>You'll receive general anesthesia and be positioned carefully for the procedure.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">2</div>
                <div>
                  <h3 className="font-semibold">Opening the Skull</h3>
                  <p>A small section of skull is removed to access the brain (craniotomy).</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">3</div>
                <div>
                  <h3 className="font-semibold">Tumor Removal</h3>
                  <p>Using advanced techniques, Dr Sayuj removes as much of the tumor as safely possible.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">4</div>
                <div>
                  <h3 className="font-semibold">Closure</h3>
                  <p>The skull is replaced and the incision is closed with stitches or staples.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2>Recovery and What to Expect</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Hospital Stay</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>ICU monitoring:</strong> 1-2 days for close observation</li>
                  <li>• <strong>Regular ward:</strong> 3-7 days depending on recovery</li>
                  <li>• <strong>Pain management:</strong> Medications to keep you comfortable</li>
                  <li>• <strong>Physical therapy:</strong> Help with movement and strength</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">At Home Recovery</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Rest:</strong> Avoid heavy lifting for 4-6 weeks</li>
                  <li>• <strong>Wound care:</strong> Keep incision clean and dry</li>
                  <li>• <strong>Follow-up visits:</strong> Regular check-ups with Dr Sayuj</li>
                  <li>• <strong>Gradual return:</strong> Slowly resume normal activities</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2>Risks and Complications</h2>
            <p>
              Like all surgeries, brain tumor surgery has some risks. Dr Sayuj will discuss these with you 
              before the procedure:
            </p>
            <ul className="space-y-2">
              <li>• <strong>Infection:</strong> Rare, but possible at the surgical site</li>
              <li>• <strong>Bleeding:</strong> Uncommon, but may require additional treatment</li>
              <li>• <strong>Brain swelling:</strong> Temporary swelling that usually improves</li>
              <li>• <strong>Neurological changes:</strong> Temporary or permanent changes in brain function</li>
              <li>• <strong>Seizures:</strong> May occur after surgery, usually temporary</li>
            </ul>
            <p>
              <strong>Important:</strong> Dr Sayuj uses advanced techniques to minimize these risks and 
              maximize your safety.
            </p>
          </section>

          <section className="mb-8">
            <h2>Cost and Insurance</h2>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-700">Insurance Coverage</h3>
              <p>
                Brain tumor surgery is typically covered by most health insurance plans. We work with 
                major insurance providers and can help you understand your coverage.
              </p>
              <ul className="mt-3 space-y-1">
                <li>• Most insurance plans cover brain tumor surgery</li>
                <li>• Pre-authorization may be required</li>
                <li>• We can help with insurance paperwork</li>
                <li>• Payment plans available for self-pay patients</li>
              </ul>
            </div>
          </section>

          <section id="faqs" className="mb-8">
            <h2>Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Do all brain tumors need surgery?</h3>
                <p>
                  No, not all brain tumors require surgery. Some small, slow-growing tumors may be monitored 
                  with regular scans. Others may be treated with radiation therapy, chemotherapy, or other 
                  non-surgical methods. Dr Sayuj will recommend the best treatment approach for your specific situation.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">How long is the recovery after brain tumor surgery?</h3>
                <p>
                  Recovery time varies depending on the tumor type, location, and size. Most patients stay in 
                  the hospital for 3-7 days. Full recovery may take 4-8 weeks, with gradual return to normal 
                  activities. Dr Sayuj will provide a personalized recovery plan based on your specific case.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Will I need additional treatment after surgery?</h3>
                <p>
                  This depends on the type of tumor. Some tumors may require radiation therapy or chemotherapy 
                  after surgery. Dr Sayuj works with a team of oncologists to coordinate any additional treatments 
                  that may be needed for the best outcomes.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">What are the chances of the tumor coming back?</h3>
                <p>
                  The risk of tumor recurrence depends on the type of tumor and how completely it was removed. 
                  Dr Sayuj uses advanced techniques to remove as much of the tumor as safely possible. Regular 
                  follow-up scans help monitor for any changes.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Can I drive after brain tumor surgery?</h3>
                <p>
                  Driving restrictions vary by case and local regulations. Generally, you should not drive for 
                  at least 4-6 weeks after surgery, or until Dr Sayuj clears you. This is for your safety and 
                  the safety of others on the road.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8 bg-blue-50 p-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-4">Ready to Discuss Your Brain Tumor Treatment Options?</h3>
            <p className="mb-4">
              Dr Sayuj Krishnan provides expert evaluation and personalized treatment plans for brain tumors.
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
            "mainEntityOfPage": "https://www.drsayuj.com/services/brain-tumor-surgery-hyderabad",
            "name": "Brain Tumor Surgery in Hyderabad",
            "description": "Microsurgical brain tumor care with multidisciplinary coordination.",
            "medicalSpecialty": "Neurosurgery",
            "about": {
              "@type": "MedicalProcedure",
              "name": "Brain Tumor Surgery",
              "indication": [{"@type": "MedicalIndication", "name": "Brain tumor"}]
            },
            "provider": {"@id": "https://www.drsayuj.com/#physician"},
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.drsayuj.com/"},
                {"@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.drsayuj.com/services/"},
                {"@type": "ListItem", "position": 3, "name": "Brain Tumor Surgery", "item": "https://www.drsayuj.com/services/brain-tumor-surgery-hyderabad"}
              ]
            },
            "inLanguage": "en-IN"
          })
        }}
      />
      
      {/* Service JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://www.drsayuj.com/services/brain-tumor-surgery-hyderabad/#service",
            "serviceType": "Brain Tumor Surgery",
            "areaServed": {"@type": "City", "name": "Hyderabad"},
            "provider": {"@type": "Physician", "@id": "https://www.drsayuj.com/#physician"},
            "description": "Microsurgical brain tumor surgery in Hyderabad with neuronavigation and monitoring for maximal safe resection.",
            "availableChannel": {"@type": "ServiceChannel", "serviceUrl": "https://www.drsayuj.com/services/brain-tumor-surgery-hyderabad/"},
            "offers": {"@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "INR", "url": "https://www.drsayuj.com/appointments"}
          })
        }}
      />
      
      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {"@type": "Question", "name": "What is the recovery time after brain tumor surgery?", "acceptedAnswer": {"@type": "Answer", "text": "Recovery varies by tumor type and location. Most patients stay 3-7 days in hospital, with gradual return to activities over 4-8 weeks."}},
              {"@type": "Question", "name": "Is brain tumor surgery covered by insurance?", "acceptedAnswer": {"@type": "Answer", "text": "Most major insurers cover brain tumor surgery. Our team assists with pre-authorization and documentation."}}
            ]
          })
        }}
      />
      </main>
    </>
  );
}