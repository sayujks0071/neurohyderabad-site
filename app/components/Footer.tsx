import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Clinic Details</h3>
            <div className="space-y-3 text-gray-200">
              <p className="font-semibold text-gray-100">
                Dr. Sayuj Krishnan, Neurosurgeon
              </p>
              <p className="text-sm leading-6">
                Room 317, OPD Block, Yashoda Hospital, Malakpet, Hyderabad, Telangana 500036
              </p>
              <p className="text-sm text-gray-300">
                <strong>Landmark:</strong> Near Malakpet Railway Station, opposite Yashoda Out‑Patient Block
              </p>
              <p>
                <a
                  href="tel:+919778280044"
                  className="text-blue-200 hover:text-blue-100 transition-colors"
                >
                  +91 9778280044
                </a>{" "}
                ·{" "}
                <a
                  href="mailto:neurospinehyd@drsayuj.com"
                  className="text-blue-200 hover:text-blue-100 transition-colors"
                >
                  neurospinehyd@drsayuj.com
                </a>
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.drsayuj.info/appointments?utm_source=site&utm_medium=cta&utm_campaign=footer_nap"
                  aria-label="Book a consultation from the footer contact section"
                  className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
                >
                  Book Consultation
                </a>
                <a
                  href="https://wa.me/919778280044"
                  className="rounded-full border border-blue-300 px-4 py-2 text-sm font-semibold text-blue-100 hover:bg-blue-900"
                >
                  WhatsApp
                </a>
                <a
                  href="https://www.drsayuj.info/locations?utm_source=site&utm_medium=cta&utm_campaign=footer_nap"
                  className="rounded-full border border-gray-500 px-4 py-2 text-sm font-semibold text-gray-100 hover:bg-gray-800"
                >
                  Get Directions
                </a>
              </div>
              <p className="text-xs text-gray-400 pt-2">
                For sudden weakness, loss of vision or consciousness, please call emergency services immediately before booking an appointment.
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <nav className="space-y-2 text-sm">
              <Link href="/specializations" className="block text-gray-300 hover:text-gray-100 transition-colors">
                Specializations Overview
              </Link>
              <Link href="/services/minimally-invasive-spine-surgery" className="block text-gray-300 hover:text-gray-100 transition-colors">
                Minimally Invasive Spine Surgery
              </Link>
              <Link href="/services/endoscopic-discectomy-hyderabad" className="block text-gray-300 hover:text-gray-100 transition-colors">
                Endoscopic Discectomy
              </Link>
              <Link href="/services/brain-tumor-surgery-hyderabad" className="block text-gray-300 hover:text-gray-100 transition-colors">
                Brain Tumor Surgery
              </Link>
              <Link href="/services/spinal-fusion-surgery-hyderabad" className="block text-gray-300 hover:text-gray-100 transition-colors">
                Spinal Fusion Surgery
              </Link>
              <Link href="/services/epilepsy-surgery-hyderabad" className="block text-gray-300 hover:text-gray-100 transition-colors">
                Epilepsy Surgery
              </Link>
              <Link href="/services/peripheral-nerve-surgery-hyderabad" className="block text-gray-300 hover:text-gray-100 transition-colors">
                Peripheral Nerve Surgery
              </Link>
            </nav>
          </div>

          {/* Conditions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Conditions</h3>
            <nav className="space-y-2 text-sm">
              <Link href="/conditions/" className="block text-gray-300 hover:text-gray-100 transition-colors">
                All Conditions
              </Link>
              <Link href="/conditions/brain-tumor-surgery-hyderabad" className="block text-gray-300 hover:text-gray-100 transition-colors">
                Brain Tumor Surgery
              </Link>
              <Link href="/conditions/sciatica-treatment-hyderabad" className="block text-gray-300 hover:text-gray-100 transition-colors">
                Sciatica Treatment
              </Link>
              <Link href="/conditions/spinal-stenosis-treatment-hyderabad" className="block text-gray-300 hover:text-gray-100 transition-colors">
                Lumbar Spinal Stenosis Treatment
              </Link>
              <Link href="/conditions/trigeminal-neuralgia-treatment-hyderabad" className="block text-gray-300 hover:text-gray-100 transition-colors">
                Trigeminal Neuralgia Treatment
              </Link>
              <Link href="/conditions/cervical-radiculopathy-treatment-hyderabad" className="block text-gray-300 hover:text-gray-100 transition-colors">
                Cervical Radiculopathy Treatment
              </Link>
            </nav>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <Link href="/about" className="block text-gray-300 hover:text-gray-100 transition-colors">
                About Dr. Sayuj
              </Link>
              <Link href="/appointments" className="block text-gray-300 hover:text-gray-100 transition-colors">
                Book Appointment
              </Link>
              <Link href="/blog" className="block text-gray-300 hover:text-gray-100 transition-colors">
                Blog
              </Link>
              <Link href="/patient-stories" className="block text-gray-300 hover:text-gray-100 transition-colors">
                Patient Stories
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-gray-100 transition-colors">
                Contact
              </Link>
              <Link href="/locations" className="block text-gray-300 hover:text-gray-100 transition-colors">
                Clinic Locations
              </Link>
              <Link href="/symptoms/signs-of-brain-tumor" className="block text-gray-300 hover:text-gray-100 transition-colors">
                Signs of Brain Tumor
              </Link>
              <Link href="/symptoms/pain-on-top-of-head-causes" className="block text-gray-300 hover:text-gray-100 transition-colors">
                Pain on Top of Head Causes
              </Link>
              <Link href="/locations/brain-spine-surgeon-jubilee-hills" className="block text-gray-300 hover:text-gray-100 transition-colors">
                Near Jubilee Hills
              </Link>
              <Link href="/locations/brain-spine-surgeon-banjara-hills" className="block text-gray-300 hover:text-gray-100 transition-colors">
                Near Banjara Hills
              </Link>
              <Link href="/locations/brain-spine-surgeon-hitec-city" className="block text-gray-300 hover:text-gray-100 transition-colors">
                Near HITEC City
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              <p>© 2024 Dr Sayuj Krishnan. All rights reserved.</p>
              <p className="mt-1">
                MBBS, DNB Neurosurgery (Direct 6 years) | Fellowship in Minimally Invasive and Advanced Spine Surgery
              </p>
            </div>
            <nav className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-gray-200 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-gray-200 transition-colors">
                Cookie Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-gray-200 transition-colors">
                Terms of Service
              </Link>
              <Link href="/disclaimer" className="text-gray-400 hover:text-gray-200 transition-colors">
                Medical Disclaimer
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
