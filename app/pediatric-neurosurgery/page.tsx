import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../../src/lib/seo";
import BreadcrumbSchema from "../components/schemas/BreadcrumbSchema";
import { serviceJsonLd } from "../../src/lib/seo";

export const metadata: Metadata = {
  title: "Pediatric Neurosurgery Hyderabad | Children's Brain & Spine Surgery | Dr. Sayuj Krishnan",
  description: "Expert pediatric neurosurgery in Hyderabad with Dr. Sayuj Krishnan. Specializing in children's brain surgery, spine surgery, and neurological conditions with compassionate care.",
  keywords: [
    "pediatric neurosurgeon hyderabad",
    "children brain surgery hyderabad",
    "pediatric spine surgery hyderabad",
    "kids neurosurgeon hyderabad",
    "pediatric brain tumor surgery",
    "children epilepsy surgery hyderabad",
    "pediatric neurosurgery hyderabad",
    "kids spine surgery hyderabad",
    "pediatric neurosurgeon",
    "children neurological conditions"
  ],
  alternates: {
    canonical: `${SITE_URL}/pediatric-neurosurgery`,
    languages: {
      'en-IN': `${SITE_URL}/pediatric-neurosurgery`,
      'x-default': `${SITE_URL}/pediatric-neurosurgery`
    }
  },
  openGraph: {
    title: "Pediatric Neurosurgery Hyderabad | Children's Brain & Spine Surgery",
    description: "Expert pediatric neurosurgery in Hyderabad with Dr. Sayuj Krishnan. Specializing in children's brain surgery, spine surgery, and neurological conditions with compassionate care.",
    url: `${SITE_URL}/pediatric-neurosurgery`,
    siteName: "Dr. Sayuj Krishnan - Premier Neurosurgeon Hyderabad",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/pediatric-neurosurgery-hyderabad.jpg`,
        width: 1200,
        height: 630,
        alt: "Pediatric Neurosurgery in Hyderabad - Children's Brain & Spine Surgery",
        type: "image/jpeg"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Pediatric Neurosurgery Hyderabad | Children's Brain & Spine Surgery",
    description: "Expert pediatric neurosurgery in Hyderabad with Dr. Sayuj Krishnan. Specializing in children's brain surgery, spine surgery, and neurological conditions with compassionate care."
  }
};

export default function PediatricNeurosurgeryPage() {
  const pediatricServiceJsonLd = serviceJsonLd({
    name: "Pediatric Neurosurgery",
    description: "Specialized neurosurgical care for children with brain and spine conditions. Expert treatment with compassionate care and family-centered approach.",
    url: `${SITE_URL}/pediatric-neurosurgery`,
    areaServed: "Hyderabad, Telangana, India"
  });

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", path: "/" },
        { name: "Pediatric Neurosurgery", path: "/pediatric-neurosurgery" }
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pediatricServiceJsonLd) }}
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Pediatric Neurosurgery
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-blue-100">
                    Specialized neurosurgical care for children with brain and spine conditions. 
                    Expert treatment with compassionate care and family-centered approach.
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
                      <div className="text-6xl mb-4">👶</div>
                      <p className="text-lg font-semibold">Pediatric Care</p>
                      <p className="text-blue-200">Compassionate Treatment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specialized Care */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Specialized Pediatric Care</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">🧠</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Brain Tumors</h3>
                  <p className="text-gray-700">
                    Specialized treatment for pediatric brain tumors with age-appropriate care and family support.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">🦴</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Spine Conditions</h3>
                  <p className="text-gray-700">
                    Treatment for scoliosis, spina bifida, and other spinal conditions in children.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Epilepsy Surgery</h3>
                  <p className="text-gray-700">
                    Advanced epilepsy surgery for children with drug-resistant seizures.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">💧</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Hydrocephalus</h3>
                  <p className="text-gray-700">
                    Treatment for hydrocephalus with shunt placement and endoscopic procedures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conditions Treated */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Pediatric Conditions We Treat</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-semibold mb-6 text-blue-700">Brain Conditions</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Brain Tumors:</strong> Gliomas, medulloblastomas, ependymomas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Hydrocephalus:</strong> Shunt placement and endoscopic treatment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Epilepsy:</strong> Surgical treatment for drug-resistant seizures</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Chiari Malformation:</strong> Decompression surgery</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Craniosynostosis:</strong> Skull reconstruction surgery</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-semibold mb-6 text-blue-700">Spine Conditions</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Scoliosis:</strong> Spinal deformity correction</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Spina Bifida:</strong> Myelomeningocele repair</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Spinal Cord Tumors:</strong> Tumor removal and reconstruction</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Syringomyelia:</strong> Syrinx drainage procedures</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Spinal Trauma:</strong> Emergency spine surgery</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Family-Centered Care */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Family-Centered Care Approach</h2>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-blue-700">Compassionate Care for Children and Families</h3>
                  <p className="text-lg text-gray-700 mb-6">
                    Pediatric neurosurgery requires special expertise and a compassionate approach. 
                    Dr. Krishnan understands the unique needs of children and their families, 
                    providing comprehensive care that addresses both medical and emotional needs.
                  </p>
                  <div className="bg-blue-50 p-6 rounded-lg mb-6">
                    <h4 className="font-semibold text-blue-800 mb-3">Our Approach:</h4>
                    <ul className="space-y-2 text-blue-700">
                      <li>• Child-friendly environment and procedures</li>
                      <li>• Family involvement in treatment decisions</li>
                      <li>• Age-appropriate explanations and care</li>
                      <li>• Comprehensive support for parents and caregivers</li>
                      <li>• Long-term follow-up and monitoring</li>
                    </ul>
                  </div>
                  <p className="text-gray-700">
                    We work closely with pediatricians, oncologists, and other specialists 
                    to ensure the best possible outcomes for your child.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Support Services</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Child Life Specialists:</strong> Emotional support and preparation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Family Counseling:</strong> Support for parents and siblings</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Educational Support:</strong> School coordination and planning</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Rehabilitation Services:</strong> Physical and occupational therapy</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Long-term Follow-up:</strong> Ongoing monitoring and care</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Techniques */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Advanced Pediatric Techniques</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Minimally Invasive Surgery</h3>
                  <p className="text-gray-700 mb-4">
                    Smaller incisions and faster recovery for children, reducing pain and 
                    hospital stay while maintaining excellent outcomes.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Endoscopic procedures</li>
                    <li>• Smaller incisions</li>
                    <li>• Faster recovery</li>
                    <li>• Less pain</li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Neuronavigation</h3>
                  <p className="text-gray-700 mb-4">
                    Precise surgical planning and execution using advanced imaging technology 
                    to ensure the safest possible procedures.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 3D surgical planning</li>
                    <li>• Real-time guidance</li>
                    <li>• Precise tumor removal</li>
                    <li>• Reduced complications</li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Intraoperative Monitoring</h3>
                  <p className="text-gray-700 mb-4">
                    Real-time monitoring of brain and nerve function during surgery to 
                    protect critical neurological pathways.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Brain function monitoring</li>
                    <li>• Nerve protection</li>
                    <li>• Safer procedures</li>
                    <li>• Better outcomes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recovery and Follow-up */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Recovery and Long-term Care</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-blue-700">Comprehensive Recovery Support</h3>
                  <p className="text-lg text-gray-700 mb-6">
                    Recovery from pediatric neurosurgery requires specialized care and support. 
                    Our team provides comprehensive follow-up care to ensure the best possible 
                    outcomes for your child.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Immediate Post-Surgery</h4>
                        <p className="text-gray-600">Close monitoring and pain management</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Early Recovery</h4>
                        <p className="text-gray-600">Physical therapy and rehabilitation</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Long-term Follow-up</h4>
                        <p className="text-gray-600">Ongoing monitoring and support</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Follow-up Care Plan</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Regular Check-ups:</strong> Scheduled follow-up visits</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Imaging Studies:</strong> MRI and CT scans as needed</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Developmental Assessment:</strong> Monitoring growth and development</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Family Support:</strong> Ongoing support for parents and caregivers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>School Coordination:</strong> Educational support and planning</span>
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>24/7 Support:</strong> Our team is available for any concerns 
                      or questions throughout your child's recovery journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Dr. Krishnan */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose Dr. Sayuj Krishnan for Pediatric Neurosurgery?</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-blue-700">Specialized Pediatric Expertise</h3>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">15+ Years Experience</h4>
                        <p className="text-gray-600">Comprehensive neurosurgical expertise</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">Pediatric Specialization</h4>
                        <p className="text-gray-600">Specialized training in children's neurosurgery</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">Family-Centered Care</h4>
                        <p className="text-gray-600">Compassionate approach for children and families</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">Advanced Technology</h4>
                        <p className="text-gray-600">State-of-the-art equipment and techniques</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Family Testimonials</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <p className="text-gray-700 italic">
                        "Dr. Krishnan's care for our daughter was exceptional. He explained 
                        everything clearly and made us feel confident throughout the process."
                      </p>
                      <p className="text-sm text-gray-500 mt-2">- Parent of 8-year-old with brain tumor</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <p className="text-gray-700 italic">
                        "The minimally invasive approach meant our son was back to school 
                        much faster than we expected. We're so grateful for Dr. Krishnan's expertise."
                      </p>
                      <p className="text-sm text-gray-500 mt-2">- Parent of 12-year-old with spine surgery</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Discuss Your Child's Neurosurgical Needs?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Schedule a consultation with Dr. Sayuj Krishnan to discuss your child's condition 
                and explore the best treatment options with compassionate, family-centered care.
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
      </div>
    </>
  );
}

