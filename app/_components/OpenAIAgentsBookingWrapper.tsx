'use client';

import dynamic from 'next/dynamic';

const OpenAIAgentsBooking = dynamic(() => import('./OpenAIAgentsBooking'), {
  ssr: false,
  loading: () => (
    <div className="max-w-4xl mx-auto h-[500px] bg-white rounded-2xl border border-gray-200 shadow-lg animate-pulse">
      <div className="bg-gray-200 h-16 w-full rounded-t-2xl"></div>
      <div className="p-4 space-y-4">
        <div className="flex gap-2 mb-4">
           <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
           <div className="space-y-2">
             <div className="h-4 w-32 bg-gray-300 rounded"></div>
             <div className="h-3 w-24 bg-gray-200 rounded"></div>
           </div>
        </div>
        <div className="bg-gray-200 h-10 w-3/4 rounded-lg"></div>
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
