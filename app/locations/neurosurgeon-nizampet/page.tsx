import { Metadata } from 'next';
import Link from 'next/link';
import StandardCTA from '@/app/_components/StandardCTA';
import NAP from '@/app/_components/NAP';
import ReviewedBy from '@/app/_components/ReviewedBy';
import SchemaScript from '@/app/_components/SchemaScript';

export const metadata: Metadata = {
  title: 'Best Neurosurgeon near Nizampet, Hyderabad | Dr. Sayuj Krishnan',
  description: 'Expert neurosurgeon near Nizampet, Hyderabad. Dr. Sayuj Krishnan provides advanced brain and spine surgery with minimally invasive techniques. Book consultation today.',
  keywords: 'neurosurgeon Nizampet, brain surgeon Nizampet, spine surgeon Nizampet, neurosurgeon near Nizampet, back pain doctor Nizampet, slip disc treatment Nizampet',
  alternates: {
    canonical: 'https://www.drsayuj.com/locations/neurosurgeon-nizampet',
    languages: {
      'en-IN': 'https://www.drsayuj.com/locations/neurosurgeon-nizampet',
      'x-default': 'https://www.drsayuj.com/locations/neurosurgeon-nizampet',
    },
  },
  openGraph: {
    title: 'Best Neurosurgeon near Nizampet, Hyderabad | Dr. Sayuj Krishnan',
    description: 'Expert neurosurgeon near Nizampet, Hyderabad. Dr. Sayuj Krishnan provides advanced brain and spine surgery with minimally invasive techniques.',
    type: 'website',
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Dr. Sayuj Krishnan - Neurosurgeon",
  "image": "https://www.drsayuj.com/images/og-default.jpg",
  "url": "https://www.drsayuj.com/locations/neurosurgeon-nizampet",
  "telephone": "+919778280044",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "OPD Block, Room No 317, Yashoda Hospital, Malakpet",
    "addressLocality": "Hyderabad",
    "addressRegion": "Telangana",
    "postalCode": "500036",
    "addressCountry": "IN"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Nizampet"
    },
    {
      "@type": "City", 
      "name": "Hyderabad"
    }
  ],
  "department": {
    "@type": "Hospital",
    "name": "Yashoda Hospital - Malakpet"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "17.3850",
    "longitude": "78.4867"
  }
};

export default function NeurosurgeonNizampetPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
            Best Neurosurgeon near Nizampet, Hyderabad
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Expert brain and spine surgery care accessible from Nizampet. 
            Dr. Sayuj Krishnan provides advanced minimally invasive neurosurgical treatments.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Why Choose Dr. Sayuj for Neurosurgery near Nizampet?</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Advanced Techniques</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span>Endoscopic spine surgery with 6-8mm incisions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span>Minimally invasive brain tumor surgery</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span>Same-day discharge for many procedures</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span>Faster recovery and less pain</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Convenient Location</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span>Easy access from Nizampet via ORR</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span>Ample parking available</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span>Public transport connectivity</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span>Flexible appointment timings</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Common Conditions Treated near Nizampet</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Spine Conditions</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Slip disc (herniated disc)</li>
                <li>• Spinal stenosis</li>
                <li>• Spondylolisthesis</li>
                <li>• Sciatica</li>
                <li>• Cervical radiculopathy</li>
                <li>• Spinal tumors</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Brain Conditions</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Brain tumors</li>
                <li>• Trigeminal neuralgia</li>
                <li>• Hydrocephalus</li>
                <li>• Aneurysms</li>
                <li>• Arteriovenous malformations</li>
                <li>• Traumatic brain injuries</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">How to Reach from Nizampet</h2>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">By Road</h3>
                <p className="text-gray-700 mb-2">
                  <strong>Distance:</strong> Approximately 30-35 km
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Travel Time:</strong> 50-70 minutes (depending on traffic)
                </p>
                <p className="text-gray-700">
                  <strong>Route:</strong> Nizampet → ORR → Malakpet → Yashoda Hospital
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Public Transport</h3>
                <p className="text-gray-700 mb-2">
                  <strong>Metro:</strong> Nizampet → Malakpet Metro (35-45 minutes)
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Bus:</strong> TSRTC buses available from Nizampet to Malakpet
                </p>
                <p className="text-gray-700">
                  <strong>Auto/Cab:</strong> Ola, Uber, and local autos available
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Patient Success Stories from Nizampet</h2>
          
          <div className="bg-blue-50 rounded-lg p-6">
            <blockquote className="text-lg text-gray-700 mb-4">
              "I traveled from Nizampet for my spinal fusion surgery with Dr. Sayuj. The endoscopic approach 
              meant minimal pain and I was back to my normal activities in just 4 weeks. Highly recommended!"
            </blockquote>
            <cite className="text-blue-600 font-semibold">— Suresh Reddy, Business Owner, Nizampet</cite>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Emergency Neurosurgery near Nizampet</h2>
          
          <div className="bg-red-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-red-800 mb-4">24/7 Emergency Services</h3>
            <p className="text-gray-700 mb-4">
              For urgent neurosurgical emergencies, Dr. Sayuj provides round-the-clock consultation and emergency surgery services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="tel:+919778280044" 
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold text-center"
              >
                Emergency: +91 97782 80044
              </a>
              <Link 
                href="/appointments" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-center"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </section>

        <NAP />
        <StandardCTA />
        <ReviewedBy />
      </div>
      
      <SchemaScript data={localBusinessSchema} />
    </main>
  );
}
