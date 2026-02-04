import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Brain, Eye, Moon } from "lucide-react";
import ExpandedFAQ from "../../src/components/ExpandedFAQ";
import { SITE_URL } from "../../src/lib/seo";
import BreadcrumbSchema from "../components/schemas/BreadcrumbSchema";
import MedicalWebPageSchema from "../components/schemas/MedicalWebPageSchema";
import CostTransparencySection from "../../src/components/CostTransparencySection";
import { LocalPathways } from '@/src/components/locations/LocalPathways';

const spineCosts = [
  {
    procedure: "Endoscopic Discectomy (Slip Disc)",
    range: "₹2.50 Lakh - ₹4.00 Lakh",
    recovery: "1-2 Weeks",
    includes: ["Surgery", "1-night hospital stay", "Medications", "Follow-up"]
  },
  {
    procedure: "Endoscopic Decompression (Stenosis)",
    range: "₹2.50 Lakh - ₹4.50 Lakh",
    recovery: "2-3 Weeks",
    includes: ["Surgery", "1-2 night hospital stay", "Medications", "Follow-up"]
  },
  {
    procedure: "Minimally Invasive Fusion (TLIF)",
    range: "₹3.00 Lakh - ₹5.00 Lakh",
    recovery: "6-8 Weeks",
    includes: ["Surgery", "2-3 night hospital stay", "Implants", "Medications"]
  }
];

const SPINE_SURGERY_FAQS = [
  {
    question: "Is endoscopic spine surgery safe for elderly patients?",
    answer: "Yes, because it uses local anesthesia and smaller incisions, it lowers risks like blood loss and infection, making it safer for elderly patients with other health conditions.",
    category: "Safety"
  },
  {
    question: "How soon can I walk after endoscopic spine surgery?",
    answer: "Most patients walk within 3-4 hours after surgery. We encourage early mobilization to speed up recovery and prevent clots.",
    category: "Recovery"
  },
  {
    question: "Does insurance cover endoscopic spine surgery in Hyderabad?",
    answer: "Yes, most major insurance providers and TPA approvals cover endoscopic spine procedures at Yashoda Hospitals. We assist with the pre-authorization process.",
    category: "Cost & Insurance"
  },
  {
    question: "What is the success rate of endoscopic discectomy?",
    answer: "The success rate is over 90% for properly selected patients, with a recurrence rate of less than 5%, comparable to or better than traditional open surgery.",
    category: "Outcomes"
  },
  {
    question: "Will I need general anesthesia?",
    answer: "Many endoscopic procedures can be done under local anesthesia with conscious sedation, meaning you are awake but comfortable. This avoids the risks of general anesthesia.",
    category: "Procedure"
  },
  {
    question: "What is the cost of endoscopic spine surgery in Hyderabad?",
    answer: "The cost typically ranges from ₹1.5 Lakhs to ₹2.5 Lakhs, depending on the hospital room category and complexity. This is often cheaper than open surgery when considering the shorter hospital stay and faster return to work.",
    category: "Cost & Insurance"
  }
];

export const metadata: Metadata = {
  title: "Endoscopic Spine Surgery Hyderabad | Minimally Invasive Specialist",
  description: "Expert endoscopic spine surgery in Hyderabad. Minimally invasive slip disc & stenosis treatment. Same-day discharge. Dr. Sayuj Krishnan.",
  keywords: [
    "spine surgery hyderabad",
    "endoscopic spine surgery hyderabad",
    "minimally invasive spine surgery",
    "slip disc treatment hyderabad",
    "spinal stenosis treatment hyderabad",
    "sciatica treatment hyderabad",
    "same day spine surgery",
    "endoscopic discectomy hyderabad",
    "spine specialist hyderabad",
    "back pain treatment hyderabad",
    "tailbone pain treatment hyderabad",
    "coccydynia treatment hyderabad"
  ],
  alternates: {
    canonical: `${SITE_URL}/spine-surgery`,
    languages: {
      'en-IN': `${SITE_URL}/spine-surgery`,
      'x-default': `${SITE_URL}/spine-surgery`
    }
  },
  openGraph: {
    title: "Endoscopic Spine Surgery Hyderabad | Minimally Invasive Specialist",
    description: "Expert endoscopic spine surgery in Hyderabad. Minimally invasive slip disc & stenosis treatment. Same-day discharge. Dr. Sayuj Krishnan.",
    url: `${SITE_URL}/spine-surgery`,
    siteName: "Dr. Sayuj Krishnan - Premier Neurosurgeon Hyderabad",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Minimally Invasive Spine Surgery in Hyderabad - Dr. Sayuj Krishnan",
        type: "image/jpeg"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Spine Surgery Hyderabad | Minimally Invasive Endoscopic Spine Surgery",
    description: "Expert spine surgery in Hyderabad with Dr. Sayuj Krishnan. Specializing in minimally invasive endoscopic spine surgery, same-day discharge, and faster recovery."
  }
};

export default function SpineSurgeryPage() {
  return (
    <>
      <MedicalWebPageSchema
        title="Endoscopic Spine Surgery Hyderabad | Minimally Invasive Specialist"
        description="Expert endoscopic spine surgery in Hyderabad. Minimally invasive slip disc & stenosis treatment. Same-day discharge. Dr. Sayuj Krishnan."
        pageSlug="/spine-surgery"
        pageType="service"
        serviceOrCondition="Minimally Invasive Spine Surgery"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Spine Surgery", path: "/spine-surgery" }
        ]}
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Endoscopic Spine Surgery in Hyderabad
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-blue-100">
                    Advanced endoscopic techniques for faster recovery, same-day discharge, 
                    and better outcomes. 1,000+ successful procedures performed.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link 
                      href="/appointments"
                      className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Book Consultation
                    </Link>
                    <a 
                      href="tel:+919778280044"
                      className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      Call: +91 97782 80044
                    </a>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-80 h-80 bg-white/10 rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🦴</div>
                      <p className="text-lg font-semibold">Endoscopic Spine Surgery</p>
                      <p className="text-blue-200">Minimally Invasive</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Red Flags - YMYL Signal */}
        <section className="py-16 bg-red-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-8">
                <div className="bg-red-100 p-4 rounded-full">
                  <span className="text-4xl">⚠️</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-center mb-6 text-red-800">
                When is Spine Surgery an Emergency?
              </h2>
              <p className="text-center text-gray-700 mb-8 text-lg">
                Most back pain is not an emergency. However, if you experience any of the following
                "Red Flag" symptoms, you must seek immediate medical attention.
              </p>
              <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-red-500">
                <h3 className="text-xl font-bold mb-4 text-red-700">Cauda Equina Syndrome Warning Signs:</h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 text-xl">•</span>
                    <span><strong>Loss of Bowel or Bladder Control:</strong> Inability to hold urine/stool or inability to pass them.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 text-xl">•</span>
                    <span><strong>Saddle Anesthesia:</strong> Numbness in the groin, buttocks, or genital area.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 text-xl">•</span>
                    <span><strong>Severe Progressive Weakness:</strong> Sudden inability to lift your foot (foot drop) or inability to walk.</span>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-gray-100">
                   <p className="font-semibold text-gray-800">
                     If you have these symptoms, call our emergency line (+91 97782 80044) or visit Yashoda Hospital Malakpet Casualty immediately.
                   </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Safety & Protocols - Trust Signal */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">Safety Protocols & Risk Management</h2>
              <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
                Your safety is our priority. We use advanced German technology and strict protocols to minimize risks
                associated with spine surgery, making it safer than traditional open procedures.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <div className="mb-4 text-blue-600">
                    <ShieldCheck size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-blue-800">Infection Prevention</h3>
                  <p className="text-sm text-gray-700">
                    Our ultra-minimally invasive &quot;keyhole&quot; approach means less exposure to air and contaminants.
                    Infection rates are significantly lower (&lt;0.1%) compared to open surgery (2-5%).
                  </p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <div className="mb-4 text-blue-600">
                    <Brain size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-blue-800">Nerve Safety</h3>
                  <p className="text-sm text-gray-700">
                    We use real-time <strong>Neuromonitoring</strong> to track nerve function throughout the surgery,
                    drastically reducing the risk of nerve damage or weakness.
                  </p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <div className="mb-4 text-blue-600">
                    <Eye size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-blue-800">Precision Optics</h3>
                  <p className="text-sm text-gray-700">
                    High-Definition 4K Endoscopes provide crystal-clear visualization of the spinal canal,
                    allowing Dr. Sayuj to see nerves and discs with extreme clarity.
                  </p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <div className="mb-4 text-blue-600">
                    <Moon size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-blue-800">Anesthesia Safety</h3>
                  <p className="text-sm text-gray-700">
                    For elderly or high-risk patients, we offer &quot;Awake&quot; or &quot;Twilight&quot; sedation options,
                    avoiding the risks of general anesthesia and enabling faster recovery.
                  </p>
                </div>
              </div>
              <div className="mt-8 text-center">
                 <p className="text-xs text-gray-500 italic">
                   *While complications are rare, all surgeries carry some inherent risks. Dr. Sayuj will discuss your specific risk profile during consultation.
                 </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose Minimally Invasive Spine Surgery?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Same-Day Discharge</h3>
                  <p className="text-gray-700">
                    Most patients go home the same day, reducing hospital stay and costs.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">🔬</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Smaller Incisions</h3>
                  <p className="text-gray-700">
                    6-8mm incisions instead of traditional large cuts, reducing scarring.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">🏃</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Faster Recovery</h3>
                  <p className="text-gray-700">
                    Return to work in 1-3 weeks for desk jobs, much faster than traditional surgery.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">🛡️</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Less Pain</h3>
                  <p className="text-gray-700">
                    Reduced post-operative pain and faster healing with minimal tissue damage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">Endoscopic vs. Traditional Open Surgery</h2>
              <div className="overflow-x-auto shadow-xl rounded-2xl">
                <table className="w-full text-left border-collapse bg-white">
                  <thead>
                    <tr className="bg-blue-900 text-white">
                      <th className="p-4 md:p-6 text-lg font-semibold">Feature</th>
                      <th className="p-4 md:p-6 text-lg font-semibold bg-blue-700 border-l border-blue-600">
                        Endoscopic Spine Surgery
                        <span className="block text-xs md:text-sm font-normal text-blue-200 mt-1">(Dr. Sayuj's Technique)</span>
                      </th>
                      <th className="p-4 md:p-6 text-lg font-semibold border-l border-blue-800 text-gray-300">Traditional Open Surgery</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="p-4 md:p-6 font-medium text-gray-900">Incision Size</td>
                      <td className="p-4 md:p-6 text-blue-700 font-bold bg-blue-50/50 border-l border-gray-100">
                        &lt; 1 cm (Keyhole)
                      </td>
                      <td className="p-4 md:p-6 text-gray-600 border-l border-gray-100">5 - 8 cm (Large Cut)</td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="p-4 md:p-6 font-medium text-gray-900">Muscle Damage</td>
                      <td className="p-4 md:p-6 text-blue-700 font-bold bg-blue-50/50 border-l border-gray-100">
                        None (Muscles Dilated)
                      </td>
                      <td className="p-4 md:p-6 text-gray-600 border-l border-gray-100">Significant (Muscles Cut)</td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="p-4 md:p-6 font-medium text-gray-900">Blood Loss</td>
                      <td className="p-4 md:p-6 text-blue-700 font-bold bg-blue-50/50 border-l border-gray-100">
                        Negligible
                      </td>
                      <td className="p-4 md:p-6 text-gray-600 border-l border-gray-100">Moderate to High</td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="p-4 md:p-6 font-medium text-gray-900">Hospital Stay</td>
                      <td className="p-4 md:p-6 text-blue-700 font-bold bg-blue-50/50 border-l border-gray-100">
                        Same Day / 24 Hours
                      </td>
                      <td className="p-4 md:p-6 text-gray-600 border-l border-gray-100">3 - 5 Days</td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="p-4 md:p-6 font-medium text-gray-900">Return to Work</td>
                      <td className="p-4 md:p-6 text-blue-700 font-bold bg-blue-50/50 border-l border-gray-100">
                        1 - 2 Weeks
                      </td>
                      <td className="p-4 md:p-6 text-gray-600 border-l border-gray-100">3 - 6 Months</td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="p-4 md:p-6 font-medium text-gray-900">Post-op Pain</td>
                      <td className="p-4 md:p-6 text-blue-700 font-bold bg-blue-50/50 border-l border-gray-100">
                        Minimal
                      </td>
                      <td className="p-4 md:p-6 text-gray-600 border-l border-gray-100">Moderate to Severe</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-center mt-6 text-gray-500 text-sm">
                *Recovery times may vary based on individual patient condition and compliance with physiotherapy.
              </p>
            </div>
          </div>
        </section>

        {/* Conditions Treated */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Conditions We Treat</h2>
              <p className="text-center text-gray-600 mb-8">
                In addition to spine care, Dr. Sayuj specializes in <Link href="/services/brain-tumor-surgery-hyderabad" className="text-blue-600 hover:underline">Brain Tumor Surgery</Link> using advanced neuronavigation.
              </p>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-semibold mb-6 text-blue-700">Slip Disc (Herniated Disc)</h3>
                  <p className="text-gray-700 mb-6">
                    Endoscopic discectomy for herniated discs causing leg pain, numbness, and weakness. 
                    Our minimally invasive approach provides relief with minimal recovery time.
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Endoscopic Discectomy:</strong> 6-8mm incision for disc removal</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Same-day Discharge:</strong> Most patients go home the same day</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Faster Recovery:</strong> Return to work in 1-3 weeks</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link 
                      href="/conditions/slip-disc-treatment-hyderabad"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Learn More About Slip Disc Treatment →
                    </Link>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-semibold mb-6 text-blue-700">Spinal Stenosis</h3>
                  <p className="text-gray-700 mb-6">
                    Minimally invasive decompression for spinal stenosis causing leg pain, 
                    numbness, and difficulty walking. Our endoscopic approach preserves spinal stability.
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Endoscopic Decompression:</strong> Relief for leg pain and numbness</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Preserved Stability:</strong> Maintains spinal structure</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Better Outcomes:</strong> Improved walking and function</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link 
                      href="/conditions/spinal-stenosis-treatment-hyderabad"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Learn More About Spinal Stenosis →
                    </Link>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-semibold mb-6 text-blue-700">Sciatica & Leg Pain</h3>
                  <p className="text-gray-700 mb-6">
                    Sharp, shooting pain radiating down the leg. We treat the root cause—whether it's a disc bulge or stenosis—not just the symptoms.
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Precision Diagnosis:</strong> MRI-based nerve root targeting</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>90% Non-Surgical:</strong> Most cases resolve with injections</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link
                      href="/conditions/sciatica-pain-treatment-hyderabad"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Sciatica Treatment →
                    </Link>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-semibold mb-6 text-blue-700">Spondylolisthesis</h3>
                  <p className="text-gray-700 mb-6">
                    Slippage of one vertebra over another causing instability. We offer minimally invasive stabilization (MISS TLIF) for permanent relief.
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>MISS TLIF:</strong> Keyhole fusion technique</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Rapid Mobilization:</strong> Walk next day after fusion</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link
                      href="/conditions/spondylolisthesis-treatment-hyderabad"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Spondylolisthesis Treatment →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Patient Resources */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">Patient Resources</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/blog/cost-of-endoscopic-spine-surgery-hyderabad" className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-blue-100 group">
                  <h3 className="text-xl font-bold text-blue-700 mb-3 group-hover:text-blue-900">Cost Guide: Endoscopic Spine Surgery</h3>
                  <p className="text-gray-600">
                    A transparent breakdown of costs, insurance coverage, and packages for 2026. Understand what you are paying for.
                  </p>
                  <span className="inline-block mt-4 text-blue-600 font-semibold group-hover:underline">Read Cost Guide →</span>
                </Link>
                <Link href="/blog/endoscopic-spine-surgery-recovery-timeline" className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-blue-100 group">
                  <h3 className="text-xl font-bold text-blue-700 mb-3 group-hover:text-blue-900">Recovery Timeline Guide</h3>
                  <p className="text-gray-600">
                    Week-by-week guide on what to expect after surgery, from walking on day 1 to returning to the gym.
                  </p>
                  <span className="inline-block mt-4 text-blue-600 font-semibold group-hover:underline">View Recovery Plan →</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Procedures */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Spine Surgery Procedures</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Endoscopic Discectomy</h3>
                  <p className="text-gray-700 mb-4">
                    Minimally invasive removal of herniated disc material through a small incision.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 6-8mm incision</li>
                    <li>• Same-day discharge</li>
                    <li>• Faster recovery</li>
                    <li>• Less post-operative pain</li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Endoscopic Foraminotomy</h3>
                  <p className="text-gray-700 mb-4">
                    Decompression of nerve roots through endoscopic techniques for foraminal stenosis.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Nerve root decompression</li>
                    <li>• Preserved spinal stability</li>
                    <li>• Minimal tissue damage</li>
                    <li>• Quick recovery</li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Endoscopic ULBD</h3>
                  <p className="text-gray-700 mb-4">
                    Unilateral laminotomy bilateral decompression for spinal stenosis using endoscopic techniques.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Bilateral decompression</li>
                    <li>• Preserved spinal stability</li>
                    <li>• Minimal muscle damage</li>
                    <li>• Better outcomes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recovery Timeline */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Recovery Timeline</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-blue-700">What to Expect After Surgery</h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Day 0 (Surgery Day)</h4>
                        <p className="text-gray-600">Walk within 3 hours with physiotherapy support</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Week 1</h4>
                        <p className="text-gray-600">Wound inspection and initial recovery assessment</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Week 2-3</h4>
                        <p className="text-gray-600">Return to desk work once wound is healed</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Week 6-8</h4>
                        <p className="text-gray-600">Full recovery and return to normal activities</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Follow-up Care</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>48 hours:</strong> Tele-follow up call</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>7 days:</strong> Wound inspection and assessment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>30 days:</strong> Progress review and guidance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>8 weeks:</strong> Final assessment and clearance</span>
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>24/7 Support:</strong> Our team is available for any concerns or questions 
                      throughout your recovery journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Dr. Krishnan */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose Dr. Sayuj Krishnan for Spine Surgery?</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-blue-700">Exceptional Expertise</h3>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">1,000+ Endoscopic Surgeries</h4>
                        <p className="text-gray-600">Extensive experience in minimally invasive techniques</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">German Training</h4>
                        <p className="text-gray-600">International fellowship in endoscopic spine surgery</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">9+ Years Experience</h4>
                        <p className="text-gray-600">Comprehensive neurosurgical expertise</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">Same-day Discharge</h4>
                        <p className="text-gray-600">Most patients go home the same day</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Patient Success Stories</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <p className="text-gray-700 italic">
                        "Dr. Krishnan's endoscopic discectomy changed my life. I was back to work 
                        in 2 weeks and the pain was completely gone."
                      </p>
                      <p className="text-sm text-gray-500 mt-2">- Patient with L4-L5 herniated disc</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <p className="text-gray-700 italic">
                        "The recovery was so much faster than I expected. Same-day discharge 
                        and back to normal activities in 6 weeks."
                      </p>
                      <p className="text-sm text-gray-500 mt-2">- Patient with spinal stenosis</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-6xl">
          <CostTransparencySection
            costs={spineCosts}
            disclaimer="Estimates for general guidance. Final cost depends on hospital category, specific implants (if any), and medical complexity. Insurance cashless facility available."
          />
        </div>

        <ExpandedFAQ faqs={SPINE_SURGERY_FAQS} className="bg-white" />

        {/* Call to Action */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Discuss Your Spine Surgery Options?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Schedule a consultation with Dr. Sayuj Krishnan to discuss your spine condition 
                and explore minimally invasive treatment options.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="/appointments"
                  className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Book Consultation
                </Link>
                <a 
                  href="tel:+919778280044"
                  className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Call: +91 97782 80044
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 pb-16">
          <LocalPathways mode="service" />
        </div>
      </div>
    </>
  );
}
