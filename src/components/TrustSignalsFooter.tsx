import Link from "next/link";

export default function TrustSignalsFooter() {
  return (
    <footer className="bg-[var(--color-text-primary)] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Practice Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Dr Sayuj Krishnan</h3>
            <p className="text-[var(--color-border)] text-sm mb-4">
              Expert neurosurgeon specializing in endoscopic spine surgery and brain surgery in Hyderabad.
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Phone:</strong> <a href="tel:+919778280044" className="text-[var(--color-primary-300)] hover:underline">+91 9778280044</a></p>
              <p><strong>Email:</strong> <a href="mailto:hellodr@drsayuj.info" className="text-[var(--color-primary-300)] hover:underline">hellodr@drsayuj.info</a></p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services/minimally-invasive-spine-surgery" className="text-[var(--color-border)] hover:text-white">Endoscopic Spine Surgery</Link></li>
              <li><Link href="/services/brain-tumor-surgery-hyderabad" className="text-[var(--color-border)] hover:text-white">Brain Tumor Surgery</Link></li>
              <li><Link href="/services/epilepsy-surgery-hyderabad" className="text-[var(--color-border)] hover:text-white">Epilepsy Surgery</Link></li>
              <li><Link href="/conditions/trigeminal-neuralgia-treatment" className="text-[var(--color-border)] hover:text-white">Trigeminal Neuralgia</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-[var(--color-border)] hover:text-white">About Dr Sayuj</Link></li>
              <li><Link href="/appointments" className="text-[var(--color-border)] hover:text-white">Book Appointment</Link></li>
              <li><Link href="/contact" className="text-[var(--color-border)] hover:text-white">Contact</Link></li>
              <li><Link href="/patient-stories" className="text-[var(--color-border)] hover:text-white">Patient Stories</Link></li>
              <li><Link href="/best-neurosurgeon-in-hyderabad" className="text-[var(--color-border)] hover:text-white">Best Neurosurgeon in Hyderabad</Link></li>
            </ul>
          </div>

          {/* Trust & Policies */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Trust & Policies</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy-policy" className="text-[var(--color-border)] hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-[var(--color-border)] hover:text-white">Terms of Service</Link></li>
              <li><Link href="/medical-disclaimer" className="text-[var(--color-border)] hover:text-white">Medical Disclaimer</Link></li>
              <li><Link href="/editorial-policy" className="text-[var(--color-border)] hover:text-white">Editorial Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[var(--color-text-secondary)] mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-[var(--color-text-secondary)] mb-4 md:mb-0">
              <p>&copy; 2025 Dr Sayuj Krishnan. All rights reserved.</p>
              <p className="mt-1">
                <strong>Credentials:</strong> MBBS, DNB Neurosurgery, Fellowship in Minimally Invasive Spine Surgery
              </p>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/sitemap-main.xml" className="text-[var(--color-text-secondary)] hover:text-white">Sitemap</Link>
              <Link href="/robots.txt" className="text-[var(--color-text-secondary)] hover:text-white">Robots.txt</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
