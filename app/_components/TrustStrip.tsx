import { Hospital, Award, ShieldCheck, Microscope } from 'lucide-react';

interface TrustStripProps {
  className?: string;
}

const TRUST_POINTS = [
  { icon: Hospital, text: 'Yashoda Hospital Affiliation' },
  { icon: Award, text: '9+ Years Neurosurgical Experience' },
  { icon: ShieldCheck, text: 'AO Spine International Member' },
  { icon: Microscope, text: 'Neuronavigation & Intraoperative Monitoring' },
];

export default function TrustStrip({ className = '' }: TrustStripProps) {
  return (
    <div className={`w-full py-4 bg-gradient-to-r from-[var(--color-background)] to-[var(--color-background)] border-y border-white/20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative bg-[var(--color-surface)]/95 border border-white/20 shadow-xl rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          {TRUST_POINTS.map((item, index) => (
            <div key={index} className="flex items-center gap-3 group">
              <div className="p-2 rounded-lg bg-[var(--color-primary-50)] text-[var(--color-primary-500)] transition-colors duration-300 group-hover:bg-[var(--color-primary-100)] group-hover:text-[var(--color-primary-700)]">
                <item.icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="text-sm font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-300">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
