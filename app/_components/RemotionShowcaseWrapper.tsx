'use client';

/**
 * RemotionShowcaseWrapper - Client component wrapper for RemotionShowcase
 * 
 * This wrapper handles the dynamic import with ssr: false, which is required
 * because Next.js 16+ doesn't allow ssr: false in server components.
 */
import dynamic from 'next/dynamic';

const RemotionShowcase = dynamic(
  () => import('./RemotionShowcase'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 bg-[var(--color-background)] rounded-xl animate-pulse flex items-center justify-center">
        <span className="text-[var(--color-text-secondary)] text-lg">Loading video previews...</span>
      </div>
    ),
  }
);

export default function RemotionShowcaseWrapper() {
  return <RemotionShowcase />;
}
