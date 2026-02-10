import { Hospital, Trophy, Activity, GraduationCap } from 'lucide-react';

interface TrustStripProps {
  className?: string;
}

const TRUST_POINTS = [
  { icon: GraduationCap, text: 'German Trained' },
  { icon: Activity, text: '1000+ Endoscopic Surgeries' },
  { icon: Hospital, text: 'Yashoda Hospitals Affiliation' },
  { icon: Trophy, text: 'Award Winning (2019)' },
];

export default function TrustStrip({ className = '' }: TrustStripProps) {
  return (
    <div className={`w-full py-4 bg-gradient-to-r from-slate-50 to-slate-100 border-y border-white/20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative bg-white/95 border border-white/20 shadow-xl rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          {TRUST_POINTS.map((item, index) => (
            <div key={index} className="flex items-center gap-3 group">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-100 group-hover:text-blue-700">
                <item.icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors duration-300">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
