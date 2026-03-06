'use client';

import { ShieldCheck } from 'lucide-react';

interface ReassuranceMicrocopyProps {
  className?: string;
  serviceType?: 'spine' | 'brain' | 'epilepsy' | 'nerve';
}

const COPY_BY_SERVICE: Record<string, string> = {
  spine: 'Evidence-based protocols that prioritise minimally invasive options before considering fusion.',
  brain: 'Neuronavigation-guided surgery with personalised rehabilitation plans for every case.',
  epilepsy: 'Comprehensive seizure evaluation and surgery only when medications no longer work.',
  nerve: 'Targeted microsurgery aimed at restoring function while protecting delicate nerve pathways.',
};

export default function ReassuranceMicrocopy({
  className = '',
  serviceType = 'spine',
}: ReassuranceMicrocopyProps) {
  const copy = COPY_BY_SERVICE[serviceType] ?? COPY_BY_SERVICE.spine;

  return (
    <div
      className={`relative bg-[var(--color-surface)]/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex items-start gap-3 ${className}`}
      role="region"
      aria-label="Reassurance Information"
    >
      <ShieldCheck className="w-6 h-6 text-[var(--color-primary-500)] flex-shrink-0 mt-0.5" aria-hidden="true" />
      <p className="text-[var(--color-text-primary)] font-medium leading-relaxed">
        {copy}
      </p>
    </div>
  );
}
