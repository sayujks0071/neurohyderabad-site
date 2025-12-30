interface TrustStripProps {
  className?: string;
}

const TRUST_POINTS = [
  { icon: '🏥', text: 'Yashoda Hospital Affiliation' },
  { icon: '🎓', text: '9+ Years Neurosurgical Experience' },
  { icon: '🏅', text: 'AO Spine International Member' },
  { icon: '🔬', text: 'Neuronavigation & Intraoperative Monitoring' },
];

export default function TrustStrip({ className = '' }: TrustStripProps) {
  return (
    <div className={`bg-gray-50 border-t border-b border-gray-200 py-3 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-6 rounded-xl px-4 py-3 text-sm text-gray-700 bg-white border border-black shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]">
          {TRUST_POINTS.map((element, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-lg" aria-hidden>{element.icon}</span>
              <span className="font-medium">{element.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
