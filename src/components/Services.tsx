import Link from 'next/link';
import { Brain, Stethoscope, Heart, Zap, Shield, Clock } from 'lucide-react';

const services = [
  {
    icon: Brain,
    title: 'Brain Surgery',
    description: 'Advanced brain tumor removal, aneurysm repair, and cranial procedures with precision and care.',
    features: ['Tumor Removal', 'Aneurysm Repair', 'Craniotomy', 'Stereotactic Surgery'],
    link: '/services/brain-surgery'
  },
  {
    icon: Stethoscope,
    title: 'Spine Surgery',
    description: 'Comprehensive spinal treatments including minimally invasive procedures for optimal recovery.',
    features: ['Disc Replacement', 'Spinal Fusion', 'Scoliosis Correction', 'Minimally Invasive'],
    link: '/services/spine-surgery'
  },
  {
    icon: Zap,
    title: 'Neurological Disorders',
    description: 'Expert treatment for epilepsy, Parkinson\'s disease, and other neurological conditions.',
    features: ['Epilepsy Treatment', 'Movement Disorders', 'Nerve Repairs', 'Pain Management'],
    link: '/services/neurological-disorders'
  },
  {
    icon: Shield,
    title: 'Emergency Neurosurgery',
    description: '24/7 emergency care for traumatic brain injuries and urgent neurological conditions.',
    features: ['Trauma Care', 'Stroke Treatment', 'Emergency Surgery', 'Critical Care'],
    link: '/services/emergency'
  },
  {
    icon: Heart,
    title: 'Pediatric Neurosurgery',
    description: 'Specialized care for children with congenital and acquired neurological conditions.',
    features: ['Congenital Defects', 'Hydrocephalus', 'Brain Tumors', 'Spina Bifida'],
    link: '/services/pediatric'
  },
  {
    icon: Clock,
    title: 'Rehabilitation',
    description: 'Comprehensive post-surgical rehabilitation programs for optimal recovery.',
    features: ['Physical Therapy', 'Occupational Therapy', 'Speech Therapy', 'Follow-up Care'],
    link: '/services/rehabilitation'
  }
];

export function Services() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Medical Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive neurosurgical care with advanced technology and personalized treatment plans 
            for the best possible outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors duration-300">
                  <service.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Key Procedures:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Link 
                href={service.link}
                className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors duration-200"
              >
                Learn More
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/services" className="btn-primary">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}