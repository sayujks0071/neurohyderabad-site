import React from 'react';

const memberships = [
  {
    name: 'AO Spine International',
    url: 'https://www.aospine.org/',
    icon: '🌍',
  },
  {
    name: 'Neurological Society of India',
    url: 'https://neurosocietyindia.org/',
    icon: '🇮🇳',
  },
  {
    name: 'Congress of Neurological Surgeons',
    url: 'https://www.cns.org/',
    icon: '🧠',
  },
];

export default function Memberships() {
  return (
    <section className="py-12 relative bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center text-slate-800">Memberships & Certifications</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {memberships.map((member) => (
              <a
                key={member.name}
                href={member.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex flex-col items-center justify-center p-6 bg-white/50 border border-white/40 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:bg-white/80 hover:-translate-y-1 hover:scale-105 group min-w-[200px]"
                aria-label={`${member.name} (opens in a new tab)`}
              >
                <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 filter grayscale group-hover:grayscale-0">{member.icon}</span>
                <span className="font-semibold text-slate-600 group-hover:text-blue-700 text-center text-sm transition-colors duration-300">
                  {member.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
