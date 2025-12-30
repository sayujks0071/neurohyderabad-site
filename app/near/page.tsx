import Link from 'next/link';
import { Metadata } from 'next';
import { makeMetadata } from '@/app/_lib/meta';

const AREAS = [
  { slug: 'banjara-hills', name: 'Banjara Hills' },
  { slug: 'jubilee-hills', name: 'Jubilee Hills' },
  { slug: 'hitech-city', name: 'HITEC City' },
  { slug: 'madhapur', name: 'Madhapur' },
  { slug: 'gachibowli', name: 'Gachibowli' },
  { slug: 'secunderabad', name: 'Secunderabad' },
];

export const metadata: Metadata = makeMetadata({
  title: 'Neurosurgeon Near You in Hyderabad | Travel to Malakpet',
  description: 'Find directions from Banjara Hills, Jubilee Hills, HITEC City, Madhapur, Gachibowli, and Secunderabad to Dr. Sayuj Krishnan at Yashoda Hospital Malakpet.',
  canonicalPath: '/near',
});

export default function NearIndexPage() {
  return (
    <main className="prose mx-auto max-w-3xl px-4 py-16">
      <h1>Dr. Sayuj Krishnan Near You</h1>
      <p>
        Consultations and surgeries are performed at Yashoda Hospital, Malakpet. Choose your neighbourhood below to view travel tips,
        parking information, and tele-consult options before you visit the OPD.
      </p>
      <ul className="list-disc pl-5">
        {AREAS.map((area) => (
          <li key={area.slug}>
            <Link href={`/near/${area.slug}`} className="text-emerald-700 underline">
              Brain &amp; spine care near {area.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
