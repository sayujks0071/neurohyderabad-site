import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const quickLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Our Services', href: '/services' },
  { name: 'Our Doctors', href: '/doctors' },
  { name: 'Patient Resources', href: '/resources' },
  { name: 'Insurance', href: '/insurance' },
  { name: 'Careers', href: '/careers' },
];

const services = [
  { name: 'Brain Surgery', href: '/services/brain-surgery' },
  { name: 'Spine Surgery', href: '/services/spine-surgery' },
  { name: 'Neurological Disorders', href: '/services/neurological-disorders' },
  { name: 'Emergency Care', href: '/services/emergency' },
  { name: 'Pediatric Neurosurgery', href: '/services/pediatric' },
  { name: 'Rehabilitation', href: '/services/rehabilitation' },
];

const locations = [
  {
    name: 'Main Center - Jubilee Hills',
    address: 'Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033',
    phone: '+91-40-1234-5678',
  },
  {
    name: 'Branch - Banjara Hills',
    address: 'Road No. 12, Banjara Hills, Hyderabad, Telangana 500034',
    phone: '+91-40-1234-5679',
  },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Emergency banner */}
      <div className="bg-red-600 py-3">
        <div className="section-container">
          <div className="flex items-center justify-center space-x-4 text-center">
            <Phone className="h-5 w-5" />
            <span className="font-semibold">24/7 Emergency Neurosurgery Hotline:</span>
            <a href="tel:+914012345678" className="font-bold text-lg hover:underline">
              +91-40-1234-5678
            </a>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">NH</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">NeuroHyderabad</h3>
                  <p className="text-gray-400 text-sm">Advanced Neurosurgery Care</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Leading neurosurgery practice in Hyderabad, providing world-class brain and spine surgery 
                with cutting-edge technology and compassionate care.
              </p>
              
              {/* Social links */}
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Our Services</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link href={service.href} className="text-gray-400 hover:text-white transition-colors duration-200">
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
              <div className="space-y-4">
                {locations.map((location, index) => (
                  <div key={index} className="border-b border-gray-800 pb-4 last:border-b-0">
                    <h5 className="font-semibold mb-2">{location.name}</h5>
                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>{location.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 flex-shrink-0" />
                        <a href={`tel:${location.phone}`} className="hover:text-white">
                          {location.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <a href="mailto:contact@neurohyderabad.com" className="hover:text-white">
                      contact@neurohyderabad.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <span>24/7 Emergency Care</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="section-container">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 NeuroHyderabad. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/disclaimer" className="text-gray-400 hover:text-white transition-colors duration-200">
                Medical Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}