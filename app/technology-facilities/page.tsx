import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_URL } from '../../src/lib/seo';
import MedicalReviewNotice from '../../src/components/MedicalReviewNotice';
import TechnologyStructuredData from './structured-data';
import TechnologyImage from '../../src/components/TechnologyImage';

export const metadata: Metadata = {
  title: 'Neurosurgery Technology Hyderabad | Dr Sayuj',
  description: 'Explore our cutting-edge neurosurgery technology including 3T MRI, neuronavigation, endoscopic systems, intraoperative monitoring, and AI-assisted surgical planning in Hyderabad.',
  keywords: 'neurosurgery technology, MRI scanner, neuronavigation, endoscopic surgery, intraoperative monitoring, surgical robotics, AI neurosurgery, advanced medical equipment, Hyderabad',
  alternates: {
    canonical: `${SITE_URL}/technology-facilities/`,
    languages: {
      'en-IN': `${SITE_URL}/technology-facilities/`,
      'x-default': `${SITE_URL}/technology-facilities/`
    }
  },
  openGraph: {
    title: 'Advanced Technology & Facilities | Dr. Sayuj Krishnan',
    description: 'State-of-the-art neurosurgery technology including 3T MRI, neuronavigation, endoscopic systems, and AI-assisted surgical planning.',
    url: `${SITE_URL}/technology-facilities/`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Advanced%20Technology%20%26%20Facilities&subtitle=State-of-the-Art%20Neurosurgery%20Equipment`,
        width: 1200,
        height: 630,
        alt: 'Advanced Technology & Facilities - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

const technologyCategories = [
  {
    title: "Advanced Imaging Suites",
    icon: "🔬",
    description: "Cutting-edge diagnostic imaging for precise surgical planning",
    technologies: [
      {
        name: "3T MRI Scanner",
        description: "High-resolution magnetic resonance imaging for detailed brain and spine visualization",
        features: ["Diffusion tensor imaging", "Perfusion imaging", "Functional MRI", "Advanced spectroscopy"],
        image: "/images/technology/mri-scanner.jpg"
      },
      {
        name: "128-Slice CT Scanner",
        description: "Ultra-fast computed tomography with 3D reconstruction capabilities",
        features: ["Angiography", "Perfusion CT", "3D reconstruction", "Low-dose protocols"],
        image: "/images/technology/ct-scanner.jpg"
      },
      {
        name: "Digital X-Ray System",
        description: "High-resolution digital radiography with instant image processing",
        features: ["DR technology", "Low radiation dose", "Instant processing", "PACS integration"],
        image: "/images/technology/digital-xray.jpg"
      }
    ]
  },
  {
    title: "Neuronavigation & Surgical Planning",
    icon: "🧭",
    description: "Precision-guided surgery with real-time navigation",
    technologies: [
      {
        name: "StealthStation S8",
        description: "Advanced neuronavigation system for precise surgical guidance",
        features: ["Real-time tracking", "3D visualization", "Multi-modal imaging", "Accuracy <1mm"],
        image: "/images/technology/neuronavigation.jpg"
      },
      {
        name: "AI Surgical Planning",
        description: "Artificial intelligence-assisted surgical planning and simulation",
        features: ["Preoperative simulation", "Risk assessment", "Optimal approach planning", "Outcome prediction"],
        image: "/images/technology/ai-planning.jpg"
      },
      {
        name: "3D Printing Lab",
        description: "Patient-specific models and surgical guides",
        features: ["Anatomical models", "Surgical guides", "Custom implants", "Training models"],
        image: "/images/technology/3d-printing.jpg"
      }
    ]
  },
  {
    title: "Endoscopic & Minimally Invasive Systems",
    icon: "🔍",
    description: "Advanced endoscopic technology for minimally invasive procedures",
    technologies: [
      {
        name: "4K Endoscopic System",
        description: "Ultra-high definition endoscopic visualization",
        features: ["4K resolution", "3D visualization", "Narrow band imaging", "Fluorescence guidance"],
        image: "/images/technology/endoscopic-system.jpg"
      },
      {
        name: "Spine Endoscopy Suite",
        description: "Dedicated endoscopic spine surgery equipment",
        features: ["Full endoscopic discectomy", "Foraminotomy systems", "ULBD equipment", "Cervical endoscopy"],
        image: "/images/technology/spine-endoscopy.jpg"
      },
      {
        name: "Neuroendoscopy",
        description: "Specialized neuroendoscopic systems for brain surgery",
        features: ["Ventriculoscopy", "Transsphenoidal surgery", "Third ventriculostomy", "Tumor resection"],
        image: "/images/technology/neuroendoscopy.jpg"
      }
    ]
  },
  {
    title: "Intraoperative Monitoring",
    icon: "📊",
    description: "Real-time monitoring during surgery for patient safety",
    technologies: [
      {
        name: "IONM System",
        description: "Intraoperative neurophysiological monitoring",
        features: ["EMG monitoring", "SSEP monitoring", "MEP monitoring", "Cranial nerve monitoring"],
        image: "/images/technology/ionm-system.jpg"
      },
      {
        name: "Ultrasound Guidance",
        description: "Real-time ultrasound imaging during surgery",
        features: ["Doppler imaging", "3D ultrasound", "Contrast enhancement", "Portable systems"],
        image: "/images/technology/ultrasound.jpg"
      },
      {
        name: "Fluorescence Imaging",
        description: "Advanced fluorescence-guided surgery",
        features: ["5-ALA fluorescence", "ICG angiography", "Tumor visualization", "Vessel identification"],
        image: "/images/technology/fluorescence.jpg"
      }
    ]
  }
];

const partnerships = [
  {
    name: "Yashoda Hospital",
    type: "Primary Hospital Partner",
    description: "State-of-the-art tertiary care facility with comprehensive neurosurgery infrastructure",
    facilities: ["24/7 emergency services", "ICU with neuro-monitoring", "Rehabilitation center", "Advanced imaging suite"]
  },
  {
    name: "Siemens Healthineers",
    type: "Technology Partner",
    description: "Leading medical technology provider for imaging and surgical equipment",
    facilities: ["MRI/CT maintenance", "Software updates", "Technical support", "Training programs"]
  },
  {
    name: "Medtronic",
    type: "Surgical Equipment Partner",
    description: "Global leader in medical technology and surgical solutions",
    facilities: ["Neuronavigation systems", "Surgical instruments", "Training and education", "Research collaboration"]
  },
  {
    name: "Stryker",
    type: "Endoscopic Systems Partner",
    description: "Advanced endoscopic and minimally invasive surgery solutions",
    facilities: ["4K endoscopic systems", "Spine surgery equipment", "Training programs", "Technical support"]
  }
];

const upcomingTechnology = [
  {
    name: "Surgical Robotics",
    description: "Robotic-assisted neurosurgery for enhanced precision",
    timeline: "2024-2025",
    benefits: ["Sub-millimeter precision", "Reduced tremor", "3D visualization", "Minimal invasiveness"]
  },
  {
    name: "AI-Powered Diagnostics",
    description: "Machine learning algorithms for faster and more accurate diagnosis",
    timeline: "2024",
    benefits: ["Automated image analysis", "Pattern recognition", "Risk stratification", "Treatment recommendations"]
  },
  {
    name: "Virtual Reality Training",
    description: "VR-based surgical training and patient education",
    timeline: "2024",
    benefits: ["Immersive training", "Patient education", "Surgical simulation", "Skill assessment"]
  },
  {
    name: "Wearable Monitoring",
    description: "Continuous patient monitoring with IoT devices",
    timeline: "2025",
    benefits: ["Real-time monitoring", "Early warning systems", "Remote care", "Data analytics"]
  }
];

export default function TechnologyFacilitiesPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
            Advanced Technology & Facilities
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto">
            State-of-the-art neurosurgery technology and equipment for the most advanced, 
            minimally invasive, and precise surgical procedures in Hyderabad.
          </p>
          <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6 max-w-4xl mx-auto">
            <p className="text-lg text-blue-800 font-semibold">
              "Investing in cutting-edge technology ensures our patients receive the safest, 
              most effective, and least invasive treatments available."
            </p>
            <p className="text-blue-600 mt-2">— Dr. Sayuj Krishnan</p>
          </div>
        </section>

        {/* Technology Categories */}
        {technologyCategories.map((category, categoryIndex) => (
          <section key={categoryIndex} className="mb-16">
            <div className="text-center mb-12">
              <div className="text-4xl mb-4">{category.icon}</div>
              <h2 className="text-3xl font-bold text-blue-800 mb-4">{category.title}</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">{category.description}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.technologies.map((tech, techIndex) => (
                <div key={techIndex} className="relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  <TechnologyImage equipment={tech.image?.split('/').pop()?.split('.')[0] || 'default'} />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-blue-700 mb-3">{tech.name}</h3>
                    <p className="text-gray-600 mb-4">{tech.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">Key Features:</h4>
                      <ul className="space-y-1">
                        {tech.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-sm text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Partnerships Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Strategic Partnerships</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Collaborating with leading healthcare providers and technology companies 
              to bring you the most advanced treatment options.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {partnerships.map((partner, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 border-l-4 border-l-blue-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">{partner.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{partner.type}</p>
                <p className="text-gray-700 mb-4">{partner.description}</p>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Available Services:</h4>
                  <ul className="space-y-1">
                    {partner.facilities.map((facility, facilityIndex) => (
                      <li key={facilityIndex} className="text-sm text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {facility}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Technology Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Future Technology Roadmap</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Stay ahead with upcoming innovations in neurosurgery technology and AI-assisted procedures.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {upcomingTechnology.map((tech, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-blue-800">{tech.name}</h3>
                  <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-lg shadow-blue-500/30">
                    {tech.timeline}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{tech.description}</p>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Expected Benefits:</h4>
                  <ul className="space-y-1">
                    {tech.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="text-sm text-gray-700 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Safety & Quality Section */}
        <section className="mb-16">
          <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl">
            <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Safety & Quality Assurance</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">ISO Certified</h3>
                <p className="text-gray-600">All equipment meets international safety and quality standards</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🔧</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Regular Maintenance</h3>
                <p className="text-gray-600">Scheduled maintenance and calibration by certified technicians</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality Control</h3>
                <p className="text-gray-600">Continuous monitoring and quality assurance protocols</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-12 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          <h2 className="text-3xl font-bold mb-4 text-blue-800">Experience Advanced Neurosurgery Technology</h2>
          <p className="text-xl mb-8 text-gray-700 max-w-2xl mx-auto">
            Schedule a consultation to learn how our cutting-edge technology can help with your condition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/appointments"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98]"
            >
              Book Consultation
            </Link>
            <Link 
              href="/contact"
              className="bg-white border border-slate-200 text-slate-600 font-medium py-3 px-8 rounded-xl transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
            >
              Contact Us
            </Link>
          </div>
        </section>

        <MedicalReviewNotice />
      </div>

      {/* Structured Data */}
      <TechnologyStructuredData />
    </main>
  );
}
