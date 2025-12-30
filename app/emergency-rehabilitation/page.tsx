import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../src/lib/seo';
import MedicalReviewNotice from '../../src/components/MedicalReviewNotice';
import EmergencyRehabilitationStructuredData from './structured-data';
import JsonLd from '@/components/JsonLd';
import MapEmbed from '@/components/MapEmbed';
import { CLINIC_INFO, getMedicalClinicSchema } from '../../src/lib/clinic';

const clinicSchema = getMedicalClinicSchema();

export const metadata: Metadata = {
  title: 'Emergency Neurosurgery & Rehabilitation Services | Dr. Sayuj Krishnan | 24/7 Care',
  description: '24/7 emergency neurosurgical consultation, hotline support, and comprehensive rehabilitation partnerships in Hyderabad. Immediate care for brain and spine emergencies.',
  keywords: 'emergency neurosurgery, 24/7 neurosurgeon, brain emergency, spine emergency, rehabilitation services, physiotherapy, post-surgical care, Hyderabad',
  alternates: {
    canonical: `${SITE_URL}/emergency-rehabilitation/`,
    languages: {
      'en-IN': `${SITE_URL}/emergency-rehabilitation/`,
      'x-default': `${SITE_URL}/emergency-rehabilitation/`
    }
  },
  openGraph: {
    title: 'Emergency Neurosurgery & Rehabilitation Services | Dr. Sayuj Krishnan',
    description: '24/7 emergency neurosurgical consultation and comprehensive rehabilitation partnerships in Hyderabad.',
    url: `${SITE_URL}/emergency-rehabilitation/`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Emergency%20Neurosurgery%20%26%20Rehabilitation&subtitle=24/7%20Care%20%26%20Recovery%20Services`,
        width: 1200,
        height: 630,
        alt: 'Emergency Neurosurgery & Rehabilitation Services - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

const emergencyServices = [
  {
    title: "24/7 Emergency Hotline",
    description: "Direct access to Dr. Sayuj Krishnan for urgent neurosurgical consultations",
    contact: CLINIC_INFO.telephone,
    availability: "24/7, 365 days",
    icon: "🚨",
    features: [
      "Immediate consultation for brain emergencies",
      "Spine injury assessment and triage",
      "Pre-operative planning for urgent cases",
      "Coordination with emergency departments"
    ]
  },
  {
    title: "Emergency Triage Service",
    description: "Rapid assessment and prioritization of neurosurgical emergencies",
    contact: "Yashoda Hospital Emergency: +91-40-2455-5555",
    availability: "24/7 at Yashoda Hospital",
    icon: "⚡",
    features: [
      "Traumatic brain injury assessment",
      "Spinal cord injury evaluation",
      "Stroke and aneurysm emergencies",
      "Immediate surgical intervention when needed"
    ]
  },
  {
    title: "Teleconsultation Emergency",
    description: "Remote consultation for urgent neurosurgical cases",
    contact: `WhatsApp: ${CLINIC_INFO.telephone}`,
    availability: "24/7 via WhatsApp",
    icon: "📱",
    features: [
      "Image sharing for rapid diagnosis",
      "Video consultation for assessment",
      "Treatment recommendations",
      "Hospital admission coordination"
    ]
  }
];

const rehabilitationPartners = [
  {
    name: "Yashoda Rehabilitation Center",
    type: "Primary Rehabilitation Partner",
    location: "Yashoda Hospital, Malakpet",
    services: [
      "Post-neurosurgical rehabilitation",
      "Physical therapy for spine patients",
      "Occupational therapy",
      "Speech therapy for brain injury patients",
      "Cognitive rehabilitation"
    ],
    contact: "+91-40-2455-5555",
    specialties: ["Brain injury recovery", "Spine rehabilitation", "Stroke recovery"]
  },
  {
    name: "Apollo Rehabilitation Services",
    type: "Comprehensive Rehabilitation Partner",
    location: "Apollo Hospitals, Jubilee Hills",
    services: [
      "Advanced neurorehabilitation",
      "Robotic-assisted therapy",
      "Aquatic therapy",
      "Pain management programs",
      "Psychological counseling"
    ],
    contact: "+91-40-2360-7777",
    specialties: ["Complex neurological conditions", "Chronic pain management", "Mental health support"]
  },
  {
    name: "Continental Rehabilitation Center",
    type: "Specialized Rehabilitation Partner",
    location: "Continental Hospitals, Gachibowli",
    services: [
      "Spine rehabilitation programs",
      "Sports injury rehabilitation",
      "Work-related injury recovery",
      "Ergonomic assessments",
      "Return-to-work programs"
    ],
    contact: "+91-40-6719-1919",
    specialties: ["Spine surgery recovery", "Sports medicine", "Occupational rehabilitation"]
  },
  {
    name: "PhysioCare Plus",
    type: "Outpatient Physiotherapy Partner",
    location: "Multiple locations across Hyderabad",
    services: [
      "Home-based physiotherapy",
      "Outpatient rehabilitation",
      "Exercise prescription",
      "Mobility training",
      "Pain relief techniques"
    ],
    contact: "+91-98480-12345",
    specialties: ["Home care", "Outpatient therapy", "Exercise programs"]
  }
];

const emergencyConditions = [
  {
    condition: "Traumatic Brain Injury (TBI)",
    urgency: "Immediate",
    symptoms: ["Loss of consciousness", "Severe headache", "Nausea/vomiting", "Confusion", "Seizures"],
    action: "Call emergency hotline immediately"
  },
  {
    condition: "Spinal Cord Injury",
    urgency: "Immediate",
    symptoms: ["Loss of movement/sensation", "Severe back/neck pain", "Difficulty breathing", "Loss of bladder/bowel control"],
    action: "Do not move patient, call emergency services"
  },
  {
    condition: "Stroke",
    urgency: "Immediate",
    symptoms: ["Facial drooping", "Arm weakness", "Speech difficulty", "Sudden severe headache"],
    action: "Call emergency services immediately (golden hour)"
  },
  {
    condition: "Brain Aneurysm",
    urgency: "Immediate",
    symptoms: ["Sudden severe headache", "Nausea/vomiting", "Stiff neck", "Loss of consciousness"],
    action: "Emergency hospital admission required"
  }
];

export default function EmergencyRehabilitationPage() {
  const { telephone, email, streetAddress, addressLocality, addressRegion, postalCode } = CLINIC_INFO;
  const telephoneHref = `tel:${telephone.replace(/[^\\d+]/g, '')}`;

  return (
    <>
      <JsonLd data={clinicSchema} />
      <main className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
            Emergency & Rehabilitation Services
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto">
            Comprehensive 24/7 emergency neurosurgical care and specialized rehabilitation 
            partnerships to ensure complete patient recovery and optimal outcomes.
          </p>
          <div className="bg-red-50 border-l-4 border-red-500 p-6 max-w-4xl mx-auto">
            <div className="flex items-center">
              <div className="text-3xl mr-4">🚨</div>
              <div>
                <h2 className="text-xl font-bold text-red-800 mb-2">Emergency Hotline</h2>
                <p className="text-red-700 font-semibold text-lg">{telephone}</p>
                <p className="text-red-600 text-sm">Available 24/7 for urgent neurosurgical consultations</p>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Services */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Emergency Neurosurgical Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {emergencyServices.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-blue-700 mb-3">{service.title}</h3>
                <p className="text-gray-700 mb-4">{service.description}</p>
                <div className="mb-4">
                  <p className="font-semibold text-gray-800">Contact:</p>
                  <p className="text-blue-600 font-medium">{service.contact}</p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold text-gray-800">Availability:</p>
                  <p className="text-green-600 font-medium">{service.availability}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Services:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency Conditions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Recognize Emergency Conditions</h2>
          <div className="bg-red-50 rounded-lg p-8">
            <p className="text-lg text-red-800 font-semibold mb-6 text-center">
              If you experience any of these symptoms, seek immediate medical attention:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {emergencyConditions.map((condition, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border border-red-200">
                  <div className="flex items-center mb-3">
                    <h3 className="text-lg font-semibold text-red-800">{condition.condition}</h3>
                    <span className="ml-auto bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                      {condition.urgency}
                    </span>
                  </div>
                  <div className="mb-3">
                    <h4 className="font-semibold text-gray-800 mb-1">Symptoms:</h4>
                    <ul className="text-sm text-gray-700">
                      {condition.symptoms.map((symptom, symptomIndex) => (
                        <li key={symptomIndex} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-100 p-3 rounded">
                    <p className="text-sm font-semibold text-red-800">{condition.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rehabilitation Partners */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Rehabilitation Partners</h2>
          <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
            Comprehensive rehabilitation services through our network of specialized partners 
            to ensure complete recovery and optimal outcomes for all patients.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {rehabilitationPartners.map((partner, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">{partner.name}</h3>
                <p className="text-green-600 font-medium mb-3">{partner.type}</p>
                <p className="text-gray-700 mb-4">{partner.location}</p>
                <div className="mb-4">
                  <p className="font-semibold text-gray-800 mb-2">Contact:</p>
                  <p className="text-blue-600 font-medium">{partner.contact}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Services:</h4>
                  <ul className="space-y-1">
                    {partner.services.map((service, serviceIndex) => (
                      <li key={serviceIndex} className="text-sm text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {partner.specialties.map((specialty, specialtyIndex) => (
                      <span key={specialtyIndex} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recovery Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Recovery Timeline & Support</h2>
          <div className="bg-blue-50 rounded-lg p-8">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">🏥</div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Immediate Post-Surgery</h3>
                <p className="text-sm text-gray-700">ICU monitoring, pain management, initial assessment</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Early Rehabilitation</h3>
                <p className="text-sm text-gray-700">Mobility training, basic exercises, wound care</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💪</div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Active Recovery</h3>
                <p className="text-sm text-gray-700">Intensive therapy, strength training, functional activities</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🏠</div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Return to Life</h3>
                <p className="text-sm text-gray-700">Home care, work readiness, long-term follow-up</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-blue-600 text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Need Emergency Care or Rehabilitation Support?</h2>
          <p className="text-xl mb-6 opacity-90">
            Our 24/7 emergency services and rehabilitation partnerships ensure you receive 
            the best possible care at every stage of your recovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={telephoneHref}
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              🚨 Emergency Hotline
            </a>
            <Link 
              href="/appointments"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Book Consultation
            </Link>
            <Link 
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8 mt-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Visit Our Clinic</h2>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Clinic Address</h3>
                <p>{streetAddress}</p>
                <p>{addressLocality}, {addressRegion}</p>
                <p>{postalCode}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Contact</h3>
                <p>
                  <a href={telephoneHref} className="text-blue-600 hover:underline" aria-label={`Call ${telephone}`}>
                    {telephone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${email}`} className="text-blue-600 hover:underline" aria-label={`Email ${email}`}>
                    {email}
                  </a>
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Clinic Hours</h3>
                <ul className="space-y-1">
                  <li>Monday – Friday: 9:00 AM – 5:00 PM</li>
                  <li>Saturday: 9:00 AM – 1:00 PM</li>
                  <li>Sunday: Emergency coverage</li>
                </ul>
              </div>
            </div>
            <MapEmbed />
          </div>
        </section>

        <MedicalReviewNotice />
      </div>

      {/* Structured Data */}
      <EmergencyRehabilitationStructuredData />
    </main>
    </>
  );
}
