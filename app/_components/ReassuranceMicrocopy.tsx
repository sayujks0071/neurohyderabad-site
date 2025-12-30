'use client';

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
    <div className={`bg-blue-50 border-l-4 border-blue-500 p-4 ${className}`}>
      <p className="text-blue-800 font-medium">
        {copy}
      </p>
    </div>
  );
}
