import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-2">
              <p>
                <strong>Call:</strong>{" "}
                <a 
                  href="tel:+919778280044" 
                  className="text-blue-300 hover:text-blue-200 transition-colors"
                >
                  +91-9778280044
                </a>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a 
                  href="mailto:neurospinehyd@drsayuj.com" 
                  className="text-blue-300 hover:text-blue-200 transition-colors"
                >
                  neurospinehyd@drsayuj.com
                </a>
              </p>
              <p className="text-sm text-gray-300">
                <strong>Address:</strong> Room No 317, OPD Block, Yashoda Hospital, Malakpet, Hyderabad, Telangana 500036
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <nav className="space-y-2">
              <Link href="/services" className="block text-gray-300 hover:text-white transition-colors">
                All Services
              </Link>
              <Link href="/services/minimally-invasive-spine-surgery" className="block text-gray-300 hover:text-white transition-colors">
                Minimally Invasive Spine Surgery
              </Link>
              <Link href="/services/brain-tumor-surgery-hyderabad" className="block text-gray-300 hover:text-white transition-colors">
                Brain Tumor Surgery
              </Link>
              <Link href="/services/epilepsy-surgery-hyderabad" className="block text-gray-300 hover:text-white transition-colors">
                Epilepsy Surgery
              </Link>
            </nav>
          </div>

          {/* Conditions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Conditions</h3>
            <nav className="space-y-2">
              <Link href="/conditions" className="block text-gray-300 hover:text-white transition-colors">
                All Conditions
              </Link>
              <Link href="/conditions/slip-disc-treatment-hyderabad" className="block text-gray-300 hover:text-white transition-colors">
                Slip Disc Treatment
              </Link>
              <Link href="/conditions/spinal-stenosis-treatment-hyderabad" className="block text-gray-300 hover:text-white transition-colors">
                Spinal Stenosis Treatment
              </Link>
              <Link href="/conditions/trigeminal-neuralgia-treatment-hyderabad" className="block text-gray-300 hover:text-white transition-colors">
                Trigeminal Neuralgia Treatment
              </Link>
            </nav>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="space-y-2">
              <Link href="/about" className="block text-gray-300 hover:text-white transition-colors">
                About Dr. Sayuj
              </Link>
              <Link href="/appointments" className="block text-gray-300 hover:text-white transition-colors">
                Book Appointment
              </Link>
              <Link href="/blog" className="block text-gray-300 hover:text-white transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              <p>© 2024 Dr Sayuj Krishnan. All rights reserved.</p>
              <p className="mt-1">
                MBBS, DNB Neurosurgery (Direct 6 years) | Fellowship in Minimally Invasive and Advanced Spine Surgery
              </p>
            </div>
            <nav className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/disclaimer" className="text-gray-400 hover:text-white transition-colors">
                Medical Disclaimer
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

