import Link from 'next/link';
import Image from 'next/image';
import { GraduationCap, Award, MapPin, Calendar } from 'lucide-react';

const doctors = [
  {
    name: 'Dr. Rajesh Kumar',
    title: 'Chief Neurosurgeon & Director',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    experience: '25+ Years',
    education: 'MBBS, MS, MCh (Neurosurgery)',
    specialization: 'Brain Tumors, Vascular Neurosurgery',
    awards: ['Best Neurosurgeon Award 2023', 'Excellence in Healthcare'],
    description: 'Leading neurosurgeon with expertise in complex brain surgeries and minimally invasive procedures.',
    location: 'Jubilee Hills, Hyderabad'
  },
  {
    name: 'Dr. Priya Sharma',
    title: 'Senior Spine Surgeon',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    experience: '18+ Years',
    education: 'MBBS, MS, DNB (Neurosurgery)',
    specialization: 'Spine Surgery, Pediatric Neurosurgery',
    awards: ['Women in Medicine Excellence Award', 'Research Publication Honor'],
    description: 'Specialist in complex spinal disorders and pediatric neurosurgical conditions.',
    location: 'Banjara Hills, Hyderabad'
  },
  {
    name: 'Dr. Arun Reddy',
    title: 'Neurosurgical Consultant',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    experience: '15+ Years',
    education: 'MBBS, MS, MCh (Neurosurgery)',
    specialization: 'Trauma, Emergency Neurosurgery',
    awards: ['Emergency Care Excellence', 'Life Saver Award'],
    description: 'Expert in emergency neurosurgical procedures and traumatic brain injury management.',
    location: 'Secunderabad, Hyderabad'
  }
];

export function Doctors() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Expert Neurosurgeons
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our team of highly qualified neurosurgeons brings decades of experience and 
            cutting-edge expertise to provide you with the best possible care.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Doctor Image */}
              <div className="relative h-80">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center space-x-1">
                  <Calendar className="h-4 w-4 text-primary-600" />
                  <span className="text-sm font-semibold text-primary-600">{doctor.experience}</span>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
                  <p className="text-primary-600 font-semibold mb-3">{doctor.title}</p>
                  <p className="text-gray-600 leading-relaxed">{doctor.description}</p>
                </div>

                {/* Education */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <GraduationCap className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-semibold text-gray-900">Education</span>
                  </div>
                  <p className="text-sm text-gray-600">{doctor.education}</p>
                </div>

                {/* Specialization */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-semibold text-gray-900">Specialization</span>
                  </div>
                  <p className="text-sm text-gray-600">{doctor.specialization}</p>
                </div>

                {/* Location */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-semibold text-gray-900">Location</span>
                  </div>
                  <p className="text-sm text-gray-600">{doctor.location}</p>
                </div>

                {/* Awards */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Recent Awards</h4>
                  <div className="space-y-1">
                    {doctor.awards.map((award, awardIndex) => (
                      <div key={awardIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span className="text-sm text-gray-600">{award}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="space-y-3">
                  <Link 
                    href={`/doctors/${doctor.name.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '')}`}
                    className="block w-full text-center btn-primary"
                  >
                    View Profile
                  </Link>
                  <Link 
                    href="/appointment"
                    className="block w-full text-center btn-secondary"
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/doctors" className="btn-primary">
            View All Doctors
          </Link>
        </div>
      </div>
    </section>
  );
}