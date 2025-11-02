import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test Routes | Internal Testing',
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestRoutesPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold mb-6">Route Accessibility Test</h1>
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold mb-2">Critical Trust Pages:</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="text-blue-600 hover:underline">
                /about - About Dr. Sayuj Krishnan
              </Link>
            </li>
            <li>
              <Link href="/patient-stories" className="text-blue-600 hover:underline">
                /patient-stories - Patient Success Stories
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Service Pages:</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/services/endoscopic-spine-surgery-hyderabad" className="text-blue-600 hover:underline">
                /services/endoscopic-spine-surgery-hyderabad
              </Link>
            </li>
            <li>
              <Link href="/services/brain-tumor-surgery-hyderabad" className="text-blue-600 hover:underline">
                /services/brain-tumor-surgery-hyderabad
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

