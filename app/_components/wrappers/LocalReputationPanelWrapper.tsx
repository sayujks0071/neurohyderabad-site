'use client';

import dynamic from 'next/dynamic';

const LocalReputationPanel = dynamic(() => import('../LocalReputationPanel'), {
  ssr: false,
  loading: () => (
    <div className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* CLS Optimization: Explicit height matches testimonials grid + trust indicators */}
          <div className="animate-pulse bg-gray-200 h-[1100px] md:h-[600px] rounded-lg"></div>
        </div>
      </div>
    </div>
  )
});

export default function LocalReputationPanelWrapper() {
  return <LocalReputationPanel />;
}
