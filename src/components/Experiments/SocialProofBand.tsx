"use client";
import { useSafeExperiment } from '@/src/hooks/useSafeExperiment';

interface SocialProofBandProps {
  className?: string;
}

export default function SocialProofBand({ className = "" }: SocialProofBandProps) {
  const socialProofVariant = useSafeExperiment<string>('exp_social_proof_band', 'default');

  const getSocialProofContent = () => {
    switch (socialProofVariant) {
      case 'variant_b':
        return {
          title: "Trusted by 1000+ Patients",
          subtitle: "Advanced neurosurgical care in Hyderabad",
          stats: ["15+ Years Experience", "500+ Successful Surgeries", "Minimally Invasive Techniques"]
        };
      default:
        return {
          title: "Leading Neurosurgeon in Hyderabad",
          subtitle: "Evidence-based brain and spine care",
          stats: ["Expert Training", "State-of-the-art Technology", "Patient-Centered Care"]
        };
    }
  };

  const content = getSocialProofContent();

  return (
    <div className={`bg-blue-50 py-8 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">{content.title}</h3>
          <p className="text-blue-600">{content.subtitle}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {content.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-blue-600 font-semibold">{stat}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
