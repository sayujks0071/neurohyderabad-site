'use client';

import dynamic from 'next/dynamic';

const FloatingChatWidget = dynamic(() => import('./FloatingChatWidget'), {
  ssr: false,
});

export default function DynamicFloatingChatWidget() {
  return <FloatingChatWidget />;
}
