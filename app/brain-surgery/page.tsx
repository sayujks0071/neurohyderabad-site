import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../../src/lib/seo";
import BreadcrumbSchema from "../components/schemas/BreadcrumbSchema";
import { serviceJsonLd } from "../../src/lib/seo";

export const metadata: Metadata = {
  title: "Brain Surgery Hyderabad | Awake Brain Surgery & Brain Tumor Surgery | Dr. Sayuj Krishnan",
  description: "Expert brain surgery in Hyderabad with Dr. Sayuj Krishnan. Specializing in awake brain surgery, brain tumor surgery, ROSA DBS, and advanced microsurgical techniques with neuronavigation.",
  keywords: [
    "brain surgery hyderabad",
    "awake brain surgery hyderabad",
    "brain tumor surgery hyderabad",
    "ROSA DBS hyderabad",
    "deep brain stimulation hyderabad",
    "neuronavigation hyderabad",
    "brain surgeon hyderabad",
    "microsurgical techniques",
    "intraoperative monitoring",
    "brain tumor treatment hyderabad"
  ],
  alternates: {
    canonical: `${SITE_URL}/brain-surgery`,
    languages: {
      'en-IN': `${SITE_URL}/brain-surgery`,
      'x-default': `${SITE_URL}/brain-surgery`
    }
  },
  openGraph: {
    title: "Brain Surgery Hyderabad | Awake Brain Surgery & Brain Tumor Surgery",
    description: "Expert brain surgery in Hyderabad with Dr. Sayuj Krishnan. Specializing in awake brain surgery, brain tumor surgery, ROSA DBS, and advanced microsurgical techniques.",
    url: `${SITE_URL}/brain-surgery`,
    siteName: "Dr. Sayuj Krishnan - Premier Neurosurgeon Hyderabad",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Brain Surgery in Hyderabad - Awake Brain Surgery & Brain Tumor Surgery - Dr. Sayuj Krishnan",
        type: "image/jpeg"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Brain Surgery Hyderabad | Awake Brain Surgery & Brain Tumor Surgery",
    description: "Expert brain surgery in Hyderabad with Dr. Sayuj Krishnan. Specializing in awake brain surgery, brain tumor surgery, ROSA DBS, and advanced microsurgical techniques."
  }
};

export default function BrainSurgeryPage() {
  const brainServiceJsonLd = serviceJsonLd({
    name: "Brain Surgery",
    description: "Advanced brain surgery including awake brain surgery, brain tumor surgery, ROSA DBS, and microsurgical techniques with neuronavigation and intraoperative monitoring.",
    url: `${SITE_URL}/brain-surgery`,
    areaServed: "Hyderabad, Telangana, India"
  });

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", path: "/" },
        { name: "Brain Surgery", path: "/brain-surgery" }
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brainServiceJsonLd) }}
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Advanced Brain Surgery
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-blue-100">
                    Expert brain surgery with awake procedures, neuronavigation, and 
                    intraoperative monitoring for optimal outcomes and brain function preservation.
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
                      <div className="text-6xl mb-4">🧠</div>
                      <p className="text-lg font-semibold">Brain Surgery</p>
                      <p className="text-blue-200">Advanced Techniques</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Techniques */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Advanced Brain Surgery Techniques</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">🧭</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Neuronavigation</h3>
                  <p className="text-gray-700">
                    Precise tumor localization and removal using advanced imaging technology for maximum safety.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Intraoperative Monitoring</h3>
                  <p className="text-gray-700">
                    Real-time brain function monitoring during surgery to protect critical neurological pathways.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">👁️</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Awake Brain Surgery</h3>
                  <p className="text-gray-700">
                    Patient remains awake during surgery for tumors near speech and motor areas.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">🤖</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">ROSA DBS</h3>
                  <p className="text-gray-700">
                    Robotic-assisted deep brain stimulation for movement disorders with precise electrode placement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brain Tumor Surgery */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Brain Tumor Surgery</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-semibold mb-6 text-blue-700">Comprehensive Brain Tumor Care</h3>
                  <p className="text-gray-700 mb-6">
                    Dr. Sayuj Krishnan provides comprehensive brain tumor surgery using advanced 
                    microsurgical techniques, neuronavigation, and intraoperative monitoring to 
                    safely remove tumors while preserving brain function.
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Neuronavigation:</strong> Precise tumor localization and removal</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Intraoperative Monitoring:</strong> Real-time brain function protection</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Awake Craniotomy:</strong> For tumors near speech/motor areas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Minimal Access:</strong> Smaller incisions, faster recovery</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Types of Brain Tumors Treated</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span><strong>Gliomas:</strong> Primary brain tumors</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span><strong>Meningiomas:</strong> Benign brain tumors</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span><strong>Metastatic Tumors:</strong> Cancer spread to brain</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span><strong>Pituitary Tumors:</strong> Hormone-producing tumors</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span><strong>Acoustic Neuromas:</strong> Vestibular schwannomas</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link 
                      href="/services/brain-tumor-surgery-hyderabad"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Learn More About Brain Tumor Surgery →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Awake Brain Surgery */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Awake Brain Surgery</h2>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-blue-700">Revolutionary Approach to Brain Surgery</h3>
                  <p className="text-lg text-gray-700 mb-6">
                    Awake brain surgery is a specialized technique where the patient remains 
                    conscious during surgery. This allows for real-time monitoring of brain 
                    function, ensuring maximum tumor removal while preserving critical functions.
                  </p>
                  <div className="bg-blue-50 p-6 rounded-lg mb-6">
                    <h4 className="font-semibold text-blue-800 mb-3">When is Awake Brain Surgery Used?</h4>
                    <ul className="space-y-2 text-blue-700">
                      <li>• Tumors near speech areas (Broca's area)</li>
                      <li>• Tumors near motor cortex</li>
                      <li>• Tumors in language-dominant hemisphere</li>
                      <li>• Epilepsy surgery in eloquent areas</li>
                    </ul>
                  </div>
                  <p className="text-gray-700">
                    This technique allows Dr. Krishnan to map brain function in real-time, 
                    ensuring the safest possible tumor removal while preserving your ability 
                    to speak, move, and think clearly.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Benefits of Awake Brain Surgery</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Real-time Function Mapping:</strong> Identify critical brain areas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Maximum Tumor Removal:</strong> Safe resection boundaries</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Function Preservation:</strong> Protect speech and movement</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Better Outcomes:</strong> Improved quality of life</span>
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Patient Comfort:</strong> Our team ensures you are comfortable 
                      and well-informed throughout the procedure.
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
              <h2 className="text-3xl font-bold text-center mb-12">ROSA DBS (Deep Brain Stimulation)</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-semibold mb-6 text-blue-700">Robotic-Assisted Deep Brain Stimulation</h3>
                  <p className="text-gray-700 mb-6">
                    ROSA DBS is a revolutionary robotic-assisted procedure for treating 
                    movement disorders like Parkinson's disease, essential tremor, and dystonia. 
                    The robotic system ensures precise electrode placement for optimal results.
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Robotic Precision:</strong> Sub-millimeter accuracy in electrode placement</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Real-time Imaging:</strong> Continuous monitoring during surgery</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Reduced Risk:</strong> Minimized complications and side effects</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Better Outcomes:</strong> Improved symptom control</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Conditions Treated with ROSA DBS</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span><strong>Parkinson's Disease:</strong> Motor symptoms and dyskinesia</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span><strong>Essential Tremor:</strong> Hand and arm tremors</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span><strong>Dystonia:</strong> Involuntary muscle contractions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span><strong>Obsessive-Compulsive Disorder:</strong> Treatment-resistant OCD</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span><strong>Epilepsy:</strong> Drug-resistant epilepsy</span>
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Comprehensive Evaluation:</strong> Our team conducts thorough 
                      assessments to determine if DBS is the right treatment for you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Epilepsy Surgery */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Epilepsy Surgery</h2>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-blue-700">Comprehensive Epilepsy Evaluation</h3>
                  <p className="text-lg text-gray-700 mb-6">
                    For patients with drug-resistant epilepsy, surgical treatment can offer 
                    the best chance for seizure freedom. Dr. Krishnan provides comprehensive 
                    evaluation and advanced surgical options.
                  </p>
                  <div className="bg-blue-50 p-6 rounded-lg mb-6">
                    <h4 className="font-semibold text-blue-800 mb-3">Evaluation Process:</h4>
                    <ul className="space-y-2 text-blue-700">
                      <li>• Video-EEG monitoring</li>
                      <li>• Advanced brain imaging (MRI, PET)</li>
                      <li>• Neuropsychological testing</li>
                      <li>• Wada test when indicated</li>
                      <li>• Invasive monitoring (SEEG)</li>
                    </ul>
                  </div>
                  <p className="text-gray-700">
                    Our comprehensive approach ensures the best possible outcome for 
                    patients with drug-resistant epilepsy.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Surgical Options</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Temporal Lobectomy:</strong> Most common epilepsy surgery</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Laser Ablation (LITT):</strong> Minimally invasive approach</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Vagus Nerve Stimulation:</strong> Non-resective option</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Corpus Callosotomy:</strong> For generalized seizures</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Multiple Subpial Transection:</strong> For eloquent areas</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link 
                      href="/services/epilepsy-surgery-hyderabad"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Learn More About Epilepsy Surgery →
                    </Link>
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
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose Dr. Sayuj Krishnan for Brain Surgery?</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-blue-700">Exceptional Expertise</h3>
                  <ul className="space-y-4 text-gray-700">
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
                        <h4 className="font-semibold text-gray-800">Advanced Training</h4>
                        <p className="text-gray-600">German fellowship and international experience</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">State-of-the-art Technology</h4>
                        <p className="text-gray-600">Neuronavigation, monitoring, and robotic systems</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">Comprehensive Care</h4>
                        <p className="text-gray-600">From diagnosis to recovery</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Patient Success Stories</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <p className="text-gray-700 italic">
                        "Dr. Krishnan's awake brain surgery saved my ability to speak. 
                        The tumor was completely removed and I'm back to normal life."
                      </p>
                      <p className="text-sm text-gray-500 mt-2">- Patient with temporal lobe tumor</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <p className="text-gray-700 italic">
                        "ROSA DBS changed my life. My Parkinson's symptoms are much better 
                        and I can do things I couldn't do for years."
                      </p>
                      <p className="text-sm text-gray-500 mt-2">- Patient with Parkinson's disease</p>
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
              <h2 className="text-3xl font-bold mb-6">Ready to Discuss Your Brain Surgery Options?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Schedule a consultation with Dr. Sayuj Krishnan to discuss your brain condition 
                and explore the best treatment options for your specific needs.
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

