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
      <div className="py-12">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse bg-gray-200 aspect-video w-full max-w-[800px] mx-auto rounded-xl"></div>
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
