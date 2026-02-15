'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Don't show on homepage
  if (pathname === '/') {
    return null;
  }

  const segments = pathname.split('/').filter(Boolean);

  // Map of segment overrides for better readability
  const labelMap: Record<string, string> = {
    'services': 'Services',
    'conditions': 'Conditions',
    'locations': 'Locations',
    'blog': 'Blog',
    'about': 'About',
    'contact': 'Contact',
    'appointments': 'Appointments',
    'media': 'Media',
    'patient-stories': 'Patient Stories',
    'technology-facilities': 'Technology',
    'privacy': 'Privacy Policy',
    'terms': 'Terms of Service',
  };

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-3">
        <ol className="flex flex-wrap items-center text-sm text-gray-600">
          <li>
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          </li>
          {segments.map((segment, index) => {
            const href = `/${segments.slice(0, index + 1).join('/')}`;
            const isLast = index === segments.length - 1;

            // Format label: use map or convert slug to Title Case
            let label = labelMap[segment] || segment
              .replace(/-hyderabad$/, '') // Remove -hyderabad suffix for cleaner display
              .replace(/-/g, ' ')
              .replace(/\b\w/g, c => c.toUpperCase());

            // Truncate very long labels
            if (label.length > 30) {
              label = label.substring(0, 27) + '...';
            }

            return (
              <li key={href} className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                {isLast ? (
                  <span className="font-medium text-gray-900" aria-current="page">
                    {label}
                  </span>
                ) : (
                  <Link href={href} className="hover:text-blue-600 transition-colors">
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
