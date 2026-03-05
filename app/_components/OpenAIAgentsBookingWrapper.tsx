'use client';

import dynamic from 'next/dynamic';

const OpenAIAgentsBooking = dynamic(() => import('./OpenAIAgentsBooking'), {
  ssr: false,
  loading: () => (
    <div className="max-w-4xl mx-auto h-[500px] bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-lg animate-pulse">
      <div className="bg-[var(--color-border)] h-16 w-full rounded-t-2xl"></div>
      <div className="p-4 space-y-4">
        <div className="flex gap-2 mb-4">
           <div className="w-10 h-10 bg-[var(--color-border)] rounded-full"></div>
           <div className="space-y-2">
             <div className="h-4 w-32 bg-[var(--color-border)] rounded"></div>
             <div className="h-3 w-24 bg-[var(--color-border)] rounded"></div>
           </div>
        </div>
        <div className="bg-[var(--color-border)] h-10 w-3/4 rounded-lg"></div>
      </div>
    </div>
  )
});

interface OpenAIAgentsBookingWrapperProps {
  pageSlug: string;
  service?: string;
}

export default function OpenAIAgentsBookingWrapper(props: OpenAIAgentsBookingWrapperProps) {
  return <OpenAIAgentsBooking {...props} />;
}
