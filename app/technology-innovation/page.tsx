import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../../src/lib/seo";
import BreadcrumbSchema from "../components/schemas/BreadcrumbSchema";
import { serviceJsonLd } from "../../src/lib/seo";

export const metadata: Metadata = {
  title: "Technology & Innovation | Advanced Neurosurgical Equipment | Dr. Sayuj Krishnan",
  description: "State-of-the-art neurosurgical technology and innovation with Dr. Sayuj Krishnan. Advanced equipment including neuronavigation, ROSA DBS, intraoperative monitoring, and minimally invasive techniques.",
  keywords: [
    "neurosurgical technology hyderabad",
    "neuronavigation hyderabad",
    "ROSA DBS hyderabad",
    "intraoperative monitoring hyderabad",
    "advanced neurosurgery equipment",
    "minimally invasive technology",
    "robotic neurosurgery hyderabad",
    "brain surgery technology",
    "spine surgery technology",
    "neurosurgical innovation hyderabad"
  ],
  alternates: {
    canonical: `${SITE_URL}/technology-innovation`,
    languages: {
      'en-IN': `${SITE_URL}/technology-innovation`,
      'x-default': `${SITE_URL}/technology-innovation`
    }
  },
  openGraph: {
    title: "Technology & Innovation | Advanced Neurosurgical Equipment",
    description: "State-of-the-art neurosurgical technology and innovation with Dr. Sayuj Krishnan. Advanced equipment including neuronavigation, ROSA DBS, intraoperative monitoring, and minimally invasive techniques.",
    url: `${SITE_URL}/technology-innovation`,
    siteName: "Dr. Sayuj Krishnan - Premier Neurosurgeon Hyderabad",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Advanced Neurosurgical Technology and Innovation - Dr. Sayuj Krishnan",
        type: "image/jpeg"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Technology & Innovation | Advanced Neurosurgical Equipment",
    description: "State-of-the-art neurosurgical technology and innovation with Dr. Sayuj Krishnan. Advanced equipment including neuronavigation, ROSA DBS, intraoperative monitoring, and minimally invasive techniques."
  }
};

export default function TechnologyInnovationPage() {
  const technologyServiceJsonLd = serviceJsonLd({
    name: "Advanced Neurosurgical Technology",
    description: "State-of-the-art neurosurgical technology and innovation including neuronavigation, ROSA DBS, intraoperative monitoring, and minimally invasive techniques for optimal patient outcomes.",
    url: `${SITE_URL}/technology-innovation`,
    areaServed: "Hyderabad, Telangana, India"
  });

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", path: "/" },
        { name: "Technology & Innovation", path: "/technology-innovation" }
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(technologyServiceJsonLd) }}
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Technology & Innovation
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-blue-100">
                    State-of-the-art neurosurgical technology and innovation for optimal 
                    patient outcomes. Advanced equipment and techniques for safer, more 
                    effective procedures.
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
                      <div className="text-6xl mb-4">🔬</div>
                      <p className="text-lg font-semibold">Advanced Technology</p>
                      <p className="text-blue-200">Innovation in Neurosurgery</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Technologies */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Advanced Neurosurgical Technologies</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">🧭</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Neuronavigation</h3>
                  <p className="text-gray-700">
                    GPS-like guidance system for precise brain and spine surgery with real-time imaging.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Intraoperative Monitoring</h3>
                  <p className="text-gray-700">
                    Real-time monitoring of brain and nerve function during surgery for maximum safety.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">🤖</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">ROSA DBS</h3>
                  <p className="text-gray-700">
                    Robotic-assisted deep brain stimulation for precise electrode placement.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">🔬</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Endoscopic Systems</h3>
                  <p className="text-gray-700">
                    Minimally invasive endoscopic equipment for spine and brain surgery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Neuronavigation */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Neuronavigation Technology</h2>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-blue-700">GPS for Brain Surgery</h3>
                  <p className="text-lg text-gray-700 mb-6">
                    Neuronavigation is like GPS for brain surgery, providing real-time guidance 
                    to help surgeons navigate precisely through the brain and spine. This 
                    technology combines preoperative imaging with real-time tracking to ensure 
                    the safest possible procedures.
                  </p>
                  <div className="bg-blue-50 p-6 rounded-lg mb-6">
                    <h4 className="font-semibold text-blue-800 mb-3">How Neuronavigation Works:</h4>
                    <ul className="space-y-2 text-blue-700">
                      <li>• Preoperative MRI/CT scans create a 3D map</li>
                      <li>• Real-time tracking of surgical instruments</li>
                      <li>• Precise localization of tumors and critical structures</li>
                      <li>• Continuous guidance throughout the procedure</li>
                    </ul>
                  </div>
                  <p className="text-gray-700">
                    This technology allows Dr. Krishnan to remove tumors with millimeter 
                    precision while avoiding critical brain areas responsible for speech, 
                    movement, and other vital functions.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Benefits of Neuronavigation</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Precision:</strong> Sub-millimeter accuracy in tumor removal</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Safety:</strong> Real-time avoidance of critical structures</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Efficiency:</strong> Reduced surgery time and complications</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Outcomes:</strong> Better preservation of brain function</span>
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Patient Benefit:</strong> Neuronavigation significantly improves 
                      surgical outcomes and reduces the risk of complications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Intraoperative Monitoring */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Intraoperative Monitoring</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-semibold mb-6 text-blue-700">Real-time Brain Function Monitoring</h3>
                  <p className="text-gray-700 mb-6">
                    Intraoperative monitoring provides real-time feedback about brain and 
                    nerve function during surgery. This technology helps protect critical 
                    neurological pathways and ensures the safest possible procedures.
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>EEG Monitoring:</strong> Continuous brain wave monitoring</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Motor Evoked Potentials:</strong> Motor pathway protection</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Somatosensory Evoked Potentials:</strong> Sensory pathway monitoring</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Cranial Nerve Monitoring:</strong> Nerve function protection</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Monitoring Applications</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span><strong>Brain Tumor Surgery:</strong> Motor and sensory pathway protection</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span><strong>Spine Surgery:</strong> Spinal cord function monitoring</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span><strong>Epilepsy Surgery:</strong> Seizure focus localization</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span><strong>Vascular Surgery:</strong> Blood flow and function monitoring</span>
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Safety First:</strong> Intraoperative monitoring provides 
                      an extra layer of safety during complex neurosurgical procedures.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ROSA DBS */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">ROSA DBS Robotic System</h2>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-blue-700">Revolutionary Robotic Precision</h3>
                  <p className="text-lg text-gray-700 mb-6">
                    The ROSA DBS system represents the cutting edge of robotic-assisted 
                    neurosurgery. This advanced technology provides sub-millimeter accuracy 
                    in electrode placement for deep brain stimulation procedures.
                  </p>
                  <div className="bg-blue-50 p-6 rounded-lg mb-6">
                    <h4 className="font-semibold text-blue-800 mb-3">ROSA DBS Advantages:</h4>
                    <ul className="space-y-2 text-blue-700">
                      <li>• Sub-millimeter accuracy in electrode placement</li>
                      <li>• Real-time imaging and guidance</li>
                      <li>• Reduced procedure time and complications</li>
                      <li>• Better patient outcomes and symptom control</li>
                    </ul>
                  </div>
                  <p className="text-gray-700">
                    This robotic system allows Dr. Krishnan to place electrodes with 
                    unprecedented precision, leading to better outcomes for patients with 
                    movement disorders like Parkinson's disease and essential tremor.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">ROSA DBS Applications</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Parkinson's Disease:</strong> Motor symptoms and dyskinesia control</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Essential Tremor:</strong> Hand and arm tremor reduction</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Dystonia:</strong> Involuntary muscle contraction control</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Epilepsy:</strong> Seizure control in drug-resistant cases</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>OCD:</strong> Treatment-resistant obsessive-compulsive disorder</span>
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Precision Matters:</strong> The accuracy of electrode placement 
                      directly impacts the effectiveness of deep brain stimulation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Endoscopic Technology */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Endoscopic Technology</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-semibold mb-6 text-blue-700">Minimally Invasive Endoscopic Systems</h3>
                  <p className="text-gray-700 mb-6">
                    Advanced endoscopic technology allows for minimally invasive procedures 
                    with smaller incisions, faster recovery, and better outcomes. This 
                    technology is particularly beneficial for spine surgery and certain 
                    brain procedures.
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>High-Definition Imaging:</strong> Crystal-clear visualization</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Flexible Instruments:</strong> Precise maneuverability</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Minimal Access:</strong> Smaller incisions, less trauma</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Faster Recovery:</strong> Reduced pain and healing time</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Endoscopic Applications</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span><strong>Spine Surgery:</strong> Discectomy, decompression, fusion</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span><strong>Brain Surgery:</strong> Tumor removal, cyst drainage</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span><strong>Hydrocephalus:</strong> Shunt placement and revision</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span><strong>Pituitary Surgery:</strong> Transsphenoidal approaches</span>
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Patient Benefits:</strong> Endoscopic procedures typically 
                      result in less pain, faster recovery, and better cosmetic outcomes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Future Innovations */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Future of Neurosurgical Technology</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Artificial Intelligence</h3>
                  <p className="text-gray-700 mb-4">
                    AI-assisted surgical planning and real-time decision support for 
                    more precise and personalized treatments.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Predictive modeling</li>
                    <li>• Automated image analysis</li>
                    <li>• Personalized treatment plans</li>
                    <li>• Outcome prediction</li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Virtual Reality</h3>
                  <p className="text-gray-700 mb-4">
                    VR-based surgical planning and training for enhanced precision and 
                    improved surgical outcomes.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 3D surgical planning</li>
                    <li>• Virtual surgery simulation</li>
                    <li>• Enhanced visualization</li>
                    <li>• Training and education</li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Nanotechnology</h3>
                  <p className="text-gray-700 mb-4">
                    Nanoscale devices and drug delivery systems for targeted treatment 
                    and minimal side effects.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Targeted drug delivery</li>
                    <li>• Nanoscale imaging</li>
                    <li>• Smart implants</li>
                    <li>• Regenerative medicine</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Dr. Krishnan */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose Dr. Sayuj Krishnan for Advanced Technology?</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-blue-700">Cutting-Edge Technology Access</h3>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">Latest Equipment</h4>
                        <p className="text-gray-600">State-of-the-art neurosurgical technology</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">Expert Training</h4>
                        <p className="text-gray-600">Advanced training in new technologies</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">Continuous Innovation</h4>
                        <p className="text-gray-600">Regular updates and technology upgrades</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">Proven Results</h4>
                        <p className="text-gray-600">Excellent outcomes with advanced technology</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Technology Benefits</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <p className="text-gray-700 italic">
                        "The precision of the ROSA DBS system was incredible. My Parkinson's 
                        symptoms improved dramatically with the robotic-assisted procedure."
                      </p>
                      <p className="text-sm text-gray-500 mt-2">- Patient with Parkinson's disease</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <p className="text-gray-700 italic">
                        "The neuronavigation made me feel confident about the surgery. 
                        Dr. Krishnan could see exactly where the tumor was and avoid 
                        critical brain areas."
                      </p>
                      <p className="text-sm text-gray-500 mt-2">- Patient with brain tumor</p>
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
              <h2 className="text-3xl font-bold mb-6">Experience Advanced Neurosurgical Technology</h2>
              <p className="text-xl mb-8 text-blue-100">
                Schedule a consultation with Dr. Sayuj Krishnan to learn about the latest 
                neurosurgical technologies and how they can benefit your treatment.
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

