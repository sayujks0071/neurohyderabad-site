import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Star, Award, Users } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-medical-50 py-16 lg:py-24">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Award className="h-6 w-6 text-primary-600" />
                <span className="text-primary-600 font-semibold">Best Neurosurgeon in Hyderabad</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Advanced 
                <span className="text-primary-600"> Neurosurgery</span> 
                {' '}Care in Hyderabad
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Providing world-class brain and spine surgery with cutting-edge technology, 
                compassionate care, and decades of expertise. Your health is our priority.
              </p>
            </div>

            {/* Key benefits */}
            <div className="space-y-3">
              {[
                '25+ Years of Neurosurgical Excellence',
                'State-of-the-Art Surgical Facilities',
                'Minimally Invasive Procedures',
                '24/7 Emergency Care Available'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/appointment" className="btn-primary">
                Book Consultation
              </Link>
              <Link href="/services" className="btn-secondary">
                Our Services
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary-600" />
                <span className="text-sm font-semibold text-gray-900">5000+</span>
                <span className="text-sm text-gray-600">Successful Surgeries</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-900">4.9/5</span>
                <span className="text-sm text-gray-600">Patient Rating</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Modern neurosurgery operating room"
                width={800}
                height={500}
                className="w-full h-[500px] object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-lg font-semibold">State-of-the-Art Facilities</p>
                <p className="text-sm opacity-90">Advanced surgical technology for optimal outcomes</p>
              </div>
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-6 z-20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Emergency Care</p>
                  <p className="text-sm text-gray-600">Available 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}