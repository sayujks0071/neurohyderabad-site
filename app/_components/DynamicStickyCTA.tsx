"use client";

import dynamic from 'next/dynamic';

const StickyCTA = dynamic(() => import('./StickyCTA'), { ssr: false });

export default function DynamicStickyCTA() {
  return <StickyCTA />;
}
