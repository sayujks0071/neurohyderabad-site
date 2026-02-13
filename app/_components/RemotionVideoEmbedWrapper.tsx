'use client';

/**
 * RemotionVideoEmbedWrapper - Client component wrapper for RemotionVideoEmbed
 * 
 * This wrapper handles the dynamic import with ssr: false, which is required
 * because Next.js 16+ doesn't allow ssr: false in server components.
 */
import dynamic from 'next/dynamic';

const RemotionVideoEmbed = dynamic(
  () => import('./RemotionVideoEmbed'),
  {
    ssr: false,
    loading: () => (
      <div className="max-w-[800px] mx-auto w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-gray-200 animate-pulse">
        <div className="h-full w-full flex items-center justify-center text-gray-400">
          <span className="sr-only">Loading video...</span>
        </div>
      </div>
    ),
  }
);

// Re-export props type for convenience
export type CompositionId = 
  | 'ServiceShowcase'
  | 'OutcomeDashboard'
  | 'BlogToReel'
  | 'DoctorIntro'
  | 'PatientTestimonial';

interface RemotionVideoEmbedWrapperProps {
  compositionId: CompositionId;
  inputProps?: Record<string, unknown>;
  title?: string;
  description?: string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  className?: string;
  maxWidth?: string;
  immediate?: boolean;
}

export default function RemotionVideoEmbedWrapper(props: RemotionVideoEmbedWrapperProps) {
  return <RemotionVideoEmbed {...props} />;
}
