'use client';

import dynamic from 'next/dynamic';

const RecoveryTimeline = dynamic(() => import('../RecoveryTimeline'), {
  ssr: false,
  loading: () => (
    <div className="py-16 bg-[#0B1120]">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* CLS Optimization: Explicit height matches 5 vertical milestones + header */}
          <div className="animate-pulse bg-[#1E293B] h-[1500px] md:h-[1400px] rounded-lg"></div>
        </div>
      </div>
    </div>
  )
});

export default function RecoveryTimelineWrapper() {
  return <RecoveryTimeline />;
}
