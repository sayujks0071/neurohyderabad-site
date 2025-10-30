'use client';

import Link from 'next/link';

interface TrustBridgeLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  eventLabel: string;
}

export default function TrustBridgeLink({ href, className, children, eventLabel }: TrustBridgeLinkProps) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'trust_signal_click', {
        event_category: 'trust_pathway',
        event_label: eventLabel,
        value: 1
      });
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}


