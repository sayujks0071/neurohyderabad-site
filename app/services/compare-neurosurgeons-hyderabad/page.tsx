import { Metadata } from 'next';
import { makeMetadata } from '@/app/_lib/meta';
import SchemaScript from '@/app/_schema/Script';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import MedicalCitations from '@/app/_components/MedicalCitations';
import SmartImage from '@/components/SmartImage';
import Link from 'next/link';

export const metadata: Metadata = makeMetadata({
  title: 'Best Neurosurgeon in Hyderabad: Compare Dr. Sayuj vs Apollo, KIMS, Yashoda',
  description: 'Compare the best neurosurgeons in Hyderabad. Dr. Sayuj Krishnan vs Apollo, KIMS, Yashoda hospitals. Expert comparison of experience, techniques, and patient outcomes for brain and spine surgery.',
  canonicalPath: '/services/compare-neurosurgeons-hyderabad',
});

const comparisonData = [
  {
    name: "Dr. Sayuj Krishnan",
    hospital: "Independent Practice",
    experience: "15+ years",
    specializations: ["Endoscopic Spine Surgery", "Minimally Invasive Brain Surgery", "Peripheral Nerve Surgery"],
    techniques: ["Endoscopic Discectomy", "TLIF/ACDF", "Microvascular Decompression", "Gamma Knife Radiosurgery"],
    advantages: [
      "Specialized in minimally invasive techniques",
      "Same-day discharge for many procedures",
      "Personalized patient care",
      "Advanced endoscopic spine surgery",
      "Comprehensive follow-up care"
    ],
    patientVolume: "Focused care approach",
    cost: "Transparent pricing",
    rating: "4.9/5"
  },
  {
    name: "Apollo Hospitals",
    hospital: "Apollo Health City",
    experience: "Multiple specialists",
    specializations: ["General Neurosurgery", "Brain Tumor Surgery", "Spine Surgery"],
    techniques: ["Traditional Open Surgery", "Minimally Invasive", "Robotic Surgery"],
    advantages: [
      "Large hospital infrastructure",
      "Multiple specialists available",
      "24/7 emergency services",
      "International patient services",
      "Advanced imaging facilities"
    ],
    patientVolume: "High volume center",
    cost: "Premium pricing",
    rating: "4.7/5"
  },
  {
    name: "KIMS Hospitals",
    hospital: "KIMS Secunderabad",
    experience: "Established team",
    specializations: ["Neurosurgery", "Spine Surgery", "Neuro-oncology"],
    techniques: ["Open Surgery", "Minimally Invasive", "Endoscopic Procedures"],
    advantages: [
      "Established reputation",
      "Comprehensive care team",
      "Good infrastructure",
      "Emergency services",
      "Insurance coverage"
    ],
    patientVolume: "High volume",
    cost: "Moderate to high",
    rating: "4.6/5"
  },
  {
    name: "Yashoda Hospitals",
    hospital: "Yashoda Group",
    experience: "Multiple locations",
    specializations: ["Neurosurgery", "Spine Surgery", "Pediatric Neurosurgery"],
    techniques: ["Traditional Surgery", "Minimally Invasive", "Advanced Imaging"],
    advantages: [
      "Multiple locations in Hyderabad",
      "Comprehensive services",
      "Good patient care",
      "Emergency services",
      "Insurance partnerships"
    ],
    patientVolume: "Very high volume",
    cost: "Competitive pricing",
    rating: "4.5/5"
  }
];

const faqs = [
  {
    question: "How do I choose the best neurosurgeon in Hyderabad?",
    answer: "Consider factors like experience, specialization in your condition, surgical techniques used, patient outcomes, and personalized care approach. Dr. Sayuj Krishnan specializes in minimally invasive techniques with 15+ years of experience."
  },
  {
    question: "What makes Dr. Sayuj different from Apollo or KIMS neurosurgeons?",
    answer: "Dr. Sayuj focuses on minimally invasive endoscopic spine surgery, offers same-day discharge for many procedures, and provides personalized care with direct access. Large hospitals may have more general approaches and longer wait times."
  },
  {
    question: "Which hospital has the best neurosurgery outcomes in Hyderabad?",
    answer: "Outcomes depend on the specific condition and surgeon expertise. Dr. Sayuj's specialized endoscopic techniques often result in faster recovery, less pain, and smaller scars compared to traditional open surgery approaches."
  },
  {
    question: "Is it better to go to a large hospital or a specialized neurosurgeon?",
    answer: "For complex conditions requiring specialized techniques like endoscopic spine surgery, a specialized neurosurgeon like Dr. Sayuj may offer better outcomes. Large hospitals are better for complex cases requiring multiple specialists."
  },
  {
    question: "What are the costs of neurosurgery in different hospitals in Hyderabad?",
    answer: "Costs vary based on procedure complexity and hospital type. Dr. Sayuj offers transparent pricing with many procedures costing less than large hospitals due to efficient minimally invasive techniques and shorter hospital stays."
  }
];

export default function CompareNeurosurgeonsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Best Neurosurgeon in Hyderabad: Compare Dr. Sayuj vs Apollo, KIMS, Yashoda",
    "description": "Compare the best neurosurgeons in Hyderabad. Expert comparison of experience, techniques, and patient outcomes for brain and spine surgery.",
    "url": "https://www.drsayuj.info/services/compare-neurosurgeons-hyderabad",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": comparisonData.map((neurosurgeon, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Person",
          "name": neurosurgeon.name,
          "worksFor": {
            "@type": "Organization",
            "name": neurosurgeon.hospital
          },
          "hasOccupation": {
            "@type": "Occupation",
            "name": "Neurosurgeon"
          }
        }
      }))
    }
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
            Best Neurosurgeon in Hyderabad: Compare Your Options
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto">
            Expert comparison of leading neurosurgeons in Hyderabad. Compare Dr. Sayuj Krishnan with 
            Apollo, KIMS, and Yashoda hospitals for brain and spine surgery expertise, techniques, and outcomes.
          </p>
          <div className="bg-blue-50 rounded-lg p-6 max-w-4xl mx-auto">
            <p className="text-lg text-blue-800 font-semibold">
              "Choosing the right neurosurgeon is crucial for your recovery. Compare experience, 
              techniques, and patient outcomes to make an informed decision."
            </p>
            <p className="text-blue-600 mt-2">— Dr. Sayuj Krishnan</p>
          </div>
        </section>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-yellow-800">
            <strong>Medical Disclaimer:</strong> This content is for informational purposes only and should not be considered medical advice. Please consult with Dr. Sayuj Krishnan for personalized medical guidance.
          </p>
        </div>

        {/* Comparison Table */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">
            Neurosurgeon Comparison in Hyderabad
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-gray-300 p-4 text-left font-semibold text-blue-800">Neurosurgeon</th>
                  <th className="border border-gray-300 p-4 text-left font-semibold text-blue-800">Experience</th>
                  <th className="border border-gray-300 p-4 text-left font-semibold text-blue-800">Specializations</th>
                  <th className="border border-gray-300 p-4 text-left font-semibold text-blue-800">Key Advantages</th>
                  <th className="border border-gray-300 p-4 text-left font-semibold text-blue-800">Rating</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((neurosurgeon, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="border border-gray-300 p-4">
                      <div>
                        <div className="font-semibold text-blue-800">{neurosurgeon.name}</div>
                        <div className="text-sm text-gray-600">{neurosurgeon.hospital}</div>
                      </div>
                    </td>
                    <td className="border border-gray-300 p-4">{neurosurgeon.experience}</td>
                    <td className="border border-gray-300 p-4">
                      <ul className="text-sm space-y-1">
                        {neurosurgeon.specializations.map((spec, i) => (
                          <li key={i} className="flex items-center">
                            <span className="text-blue-600 mr-2">•</span>
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="border border-gray-300 p-4">
                      <ul className="text-sm space-y-1">
                        {neurosurgeon.advantages.slice(0, 3).map((advantage, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-green-600 mr-2">✓</span>
                            {advantage}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="border border-gray-300 p-4 text-center">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                        {neurosurgeon.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Detailed Comparison */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">
            Detailed Comparison: Why Choose Dr. Sayuj Krishnan?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Dr. Sayuj Krishnan's Advantages</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span><strong>Specialized Techniques:</strong> Advanced endoscopic spine surgery with 6-8mm incisions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span><strong>Faster Recovery:</strong> Same-day discharge for many procedures</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span><strong>Personalized Care:</strong> Direct access to your surgeon throughout treatment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span><strong>Transparent Pricing:</strong> Clear cost structure without hidden fees</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span><strong>Comprehensive Follow-up:</strong> Detailed post-operative care and rehabilitation guidance</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Large Hospital Considerations</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span><strong>Multiple Specialists:</strong> Access to various medical specialties</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span><strong>24/7 Services:</strong> Round-the-clock emergency and ICU care</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span><strong>Advanced Infrastructure:</strong> Latest medical equipment and facilities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span><strong>Insurance Coverage:</strong> Wide acceptance of insurance plans</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span><strong>Wait Times:</strong> May have longer waiting periods for consultations</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Surgical Techniques Comparison */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">
            Surgical Techniques Comparison
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Minimally Invasive (Dr. Sayuj)</h3>
              <ul className="space-y-2 text-green-700">
                <li>• Endoscopic discectomy with 6-8mm incision</li>
                <li>• Same-day discharge for most procedures</li>
                <li>• Less post-operative pain</li>
                <li>• Faster return to daily activities</li>
                <li>• Minimal scarring</li>
                <li>• Lower infection risk</li>
              </ul>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-orange-800 mb-4">Traditional Open Surgery</h3>
              <ul className="space-y-2 text-orange-700">
                <li>• Larger incisions (3-5 inches)</li>
                <li>• 2-5 day hospital stay</li>
                <li>• More post-operative pain</li>
                <li>• Longer recovery period</li>
                <li>• Visible scarring</li>
                <li>• Higher blood loss</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cost Comparison */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">
            Cost Comparison for Common Procedures
          </h2>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold text-blue-800">Procedure</th>
                    <th className="text-left p-4 font-semibold text-blue-800">Dr. Sayuj (Minimally Invasive)</th>
                    <th className="text-left p-4 font-semibold text-blue-800">Large Hospitals (Traditional)</th>
                    <th className="text-left p-4 font-semibold text-blue-800">Savings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Endoscopic Discectomy</td>
                    <td className="p-4">₹1,50,000 - ₹2,00,000</td>
                    <td className="p-4">₹2,50,000 - ₹3,50,000</td>
                    <td className="p-4 text-green-600 font-semibold">₹1,00,000+</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Spinal Fusion (TLIF)</td>
                    <td className="p-4">₹3,00,000 - ₹4,00,000</td>
                    <td className="p-4">₹4,50,000 - ₹6,00,000</td>
                    <td className="p-4 text-green-600 font-semibold">₹1,50,000+</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Brain Tumor Surgery</td>
                    <td className="p-4">₹4,00,000 - ₹5,50,000</td>
                    <td className="p-4">₹5,50,000 - ₹8,00,000</td>
                    <td className="p-4 text-green-600 font-semibold">₹1,50,000+</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              *Costs are approximate and may vary based on case complexity. Dr. Sayuj's minimally invasive techniques often result in lower overall costs due to shorter hospital stays and faster recovery.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-blue-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            Ready to Choose Your Neurosurgeon?
          </h2>
          <p className="text-xl text-gray-700 mb-6">
            Schedule a consultation with Dr. Sayuj Krishnan to discuss your specific condition 
            and learn how minimally invasive techniques can benefit your recovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/appointments" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-center transition-colors"
            >
              Book Consultation
            </Link>
            <Link 
              href="/contact" 
              className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold text-center transition-colors"
            >
              Get Second Opinion
            </Link>
          </div>
        </section>
      </div>
      
      <NAP />
      <ReviewedBy />
      <MedicalCitations />
      
      <SchemaScript data={structuredData} />
    </main>
  );
}
