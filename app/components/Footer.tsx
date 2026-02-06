import Link from "next/link";
import NewsletterSignup from "./NewsletterSignup";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-100" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4" id="footer-contact-heading">Clinic Details</h3>
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
                  className="inline-flex items-center min-h-[44px] px-1 -mx-1 text-blue-100 hover:text-white underline underline-offset-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
                  aria-label="Call clinic at +91 9778280044"
                >
                  +91 9778280044
                </a>{" "}
                ·{" "}
                <a
                  href="mailto:hellodr@drsayuj.info"
                  className="inline-flex items-center min-h-[44px] px-1 -mx-1 text-blue-100 hover:text-white underline underline-offset-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
                  aria-label="Email clinic at hellodr@drsayuj.info"
                >
                  hellodr@drsayuj.info
                </a>
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.drsayuj.info/appointments?utm_source=site&utm_medium=cta&utm_campaign=footer_nap"
                  aria-label="Book Consultation (from footer contact section)"
                  className="rounded-full bg-blue-700 px-4 py-3 min-h-[44px] text-sm font-semibold text-white hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950"
                >
                  Book Consultation
                </a>
                <a
                  href="https://wa.me/919778280044"
                  className="rounded-full border border-blue-300 px-4 py-3 min-h-[44px] text-sm font-semibold text-blue-100 hover:bg-blue-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950"
                  aria-label="Contact via WhatsApp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
                <a
                  href="https://www.drsayuj.info/locations?utm_source=site&utm_medium=cta&utm_campaign=footer_nap"
                  className="rounded-full border border-gray-500 px-4 py-3 min-h-[44px] text-sm font-semibold text-gray-100 hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950"
                  aria-label="Get directions to clinic"
                >
                  Get Directions
                </a>
              </div>
              <p className="text-xs text-gray-300 pt-2">
                For sudden weakness, loss of vision or consciousness, please call emergency services immediately before booking an appointment.
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4" id="footer-services-heading">Services</h3>
            <nav 
              className="space-y-2 text-sm"
              aria-labelledby="footer-services-heading"
            >
              <Link 
                href="/services" 
                className="flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                All Treatments & Services
              </Link>
              <Link 
                href="/services/minimally-invasive-spine-surgery" 
                className="flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Minimally Invasive Spine Surgery
              </Link>
              <Link 
                href="/services/endoscopic-discectomy-hyderabad" 
                className="flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Endoscopic Discectomy
              </Link>
              <Link 
                href="/services/brain-tumor-surgery-hyderabad" 
                className="flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Brain Tumor Surgery
              </Link>
              <Link 
                href="/services/spinal-fusion-surgery-hyderabad" 
                className="flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Spinal Fusion Surgery
              </Link>
              <Link 
                href="/services/epilepsy-surgery-hyderabad" 
                className="flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Epilepsy Surgery
              </Link>
              <Link 
                href="/services/peripheral-nerve-surgery-hyderabad" 
                className="flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Peripheral Nerve Surgery
              </Link>
            </nav>
          </div>

          {/* Conditions */}
          <div>
            <h3 className="text-lg font-semibold mb-4" id="footer-conditions-heading">Conditions</h3>
            <nav 
              className="space-y-2 text-sm"
              aria-labelledby="footer-conditions-heading"
            >
              <Link
                href="/conditions/"
                className="flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                All Conditions
              </Link>
              <Link
                href="/conditions/brain-tumor-surgery-hyderabad"
                className="flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Brain Tumor Surgery
              </Link>
              <Link
                href="/conditions/sciatica-pain-treatment-hyderabad"
                className="flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Sciatica Treatment
              </Link>
              <Link
                href="/conditions/spinal-stenosis-treatment-hyderabad"
                className="flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Lumbar Spinal Stenosis Treatment
              </Link>
              <Link
                href="/conditions/trigeminal-neuralgia-treatment-hyderabad"
                className="flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Trigeminal Neuralgia Treatment
              </Link>
              <Link
                href="/conditions/cervical-radiculopathy-treatment-hyderabad"
                className="flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Cervical Radiculopathy Treatment
              </Link>
            </nav>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4" id="footer-quick-links-heading">Quick Links</h3>
            <nav 
              className="space-y-2 text-sm"
              aria-labelledby="footer-quick-links-heading"
            >
              <Link 
                href="/about" 
                className="flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                About Dr. Sayuj
              </Link>
              <Link 
                href="/appointments" 
                className="flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Book Appointment
              </Link>
              <Link 
                href="/knowledge-base" 
                className="flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Medical Knowledge Base
              </Link>
              <Link 
                href="/blog" 
                className="flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Blog
              </Link>
              <Link
                href="/patient-stories"
                className="flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Patient Stories
              </Link>
              <Link
                href="/remotion-showcase"
                className="flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Video Showcase
              </Link>
              <Link
                href="/contact"
                className="flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Contact
              </Link>
              <Link 
                href="/locations" 
                className="flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Clinic Locations
              </Link>
              <Link 
                href="/symptoms/signs-of-brain-tumor" 
                className="flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Signs of Brain Tumor
              </Link>
              <Link 
                href="/symptoms/pain-on-top-of-head-causes" 
                className="flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Pain on Top of Head Causes
              </Link>
              <Link 
                href="/neurosurgeon-jubilee-hills" 
                className="flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Near Jubilee Hills
              </Link>
              <Link 
                href="/neurosurgeon-banjara-hills" 
                className="flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Near Banjara Hills
              </Link>
              <Link 
                href="/neurosurgeon-hitech-city" 
                className="flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Near HITEC City
              </Link>
            </nav>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="max-w-md mx-auto mb-8">
            <NewsletterSignup variant="card" />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-300 mb-4 md:mb-0">
              <p>© 2024 Dr Sayuj Krishnan. All rights reserved.</p>
              <p className="mt-1">
                MBBS, DNB Neurosurgery (Direct 6 years) | Fellowship in Minimally Invasive and Advanced Spine Surgery
              </p>
            </div>
            <nav 
              className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm"
              aria-label="Legal and policy links"
            >
              <Link 
                href="/privacy" 
                className="inline-flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/cookies" 
                className="inline-flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Cookie Policy
              </Link>
              <Link 
                href="/terms" 
                className="inline-flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Terms of Service
              </Link>
              <Link 
                href="/disclaimer" 
                className="inline-flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Medical Disclaimer
              </Link>
              <Link 
                href="/content-integrity" 
                className="inline-flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Content Integrity
              </Link>
              <Link 
                href="/editorial-policy" 
                className="inline-flex items-center min-h-[44px] text-gray-200 underline underline-offset-4 decoration-gray-700 decoration-1 hover:text-gray-100 hover:decoration-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              >
                Editorial Policy
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
