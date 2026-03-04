import React from 'react';

const MicroVsEndoTable = () => {
  return (
    <div className="my-8 relative bg-[var(--color-surface)]/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="overflow-x-auto rounded-xl">
        <table className="w-full text-left border-collapse">
          <caption className="sr-only">Comparison of Endoscopic vs. Microscopic Surgery</caption>
          <thead>
            <tr className="bg-[var(--color-primary-50)]/50 text-[var(--color-primary-900)] border-b border-[var(--color-primary-100)]/50">
              <th scope="col" className="p-4 font-bold text-sm uppercase tracking-wide w-1/3">Feature</th>
              <th scope="col" className="p-4 font-bold text-sm uppercase tracking-wide w-1/3 text-[var(--color-primary-700)]">Microdiscectomy (Gold Standard)</th>
              <th scope="col" className="p-4 font-bold text-sm uppercase tracking-wide w-1/3 text-[var(--color-success-700)]">Endoscopic (Keyhole)</th>
            </tr>
          </thead>
          <tbody className="text-sm text-[var(--color-text-secondary)] divide-y divide-[var(--color-primary-100)]/50">
            <tr className="hover:bg-[var(--color-primary-50)]/30 transition-colors">
              <th scope="row" className="p-4 font-semibold text-[var(--color-primary-900)] bg-[var(--color-primary-50)]/30 text-left">Incision Size</th>
              <td className="p-4 text-[var(--color-text-secondary)]">Small (2-3 cm)</td>
              <td className="p-4 font-medium text-[var(--color-success-700)]">Ultra-Small (0.8 cm)</td>
            </tr>
            <tr className="hover:bg-[var(--color-primary-50)]/30 transition-colors">
              <th scope="row" className="p-4 font-semibold text-[var(--color-primary-900)] bg-[var(--color-primary-50)]/30 text-left">Visualization</th>
              <td className="p-4 font-medium text-[var(--color-primary-700)]">3D (Microscope)</td>
              <td className="p-4 text-[var(--color-text-secondary)]">2D (Camera/Screen)</td>
            </tr>
            <tr className="hover:bg-[var(--color-primary-50)]/30 transition-colors">
              <th scope="row" className="p-4 font-semibold text-[var(--color-primary-900)] bg-[var(--color-primary-50)]/30 text-left">Muscle Trauma</th>
              <td className="p-4 text-[var(--color-text-secondary)]">Low (Split & Retracted)</td>
              <td className="p-4 font-medium text-[var(--color-success-700)]">Minimal (Dilated)</td>
            </tr>
            <tr className="hover:bg-[var(--color-primary-50)]/30 transition-colors">
              <th scope="row" className="p-4 font-semibold text-[var(--color-primary-900)] bg-[var(--color-primary-50)]/30 text-left">Hospital Stay</th>
              <td className="p-4 text-[var(--color-text-secondary)]">1-2 Days</td>
              <td className="p-4 font-medium text-[var(--color-success-700)]">Day Care / 24 Hours</td>
            </tr>
            <tr className="hover:bg-[var(--color-primary-50)]/30 transition-colors">
              <th scope="row" className="p-4 font-semibold text-[var(--color-primary-900)] bg-[var(--color-primary-50)]/30 text-left">Best For</th>
              <td className="p-4 font-medium text-[var(--color-primary-700)]">Complex/Calcified Discs, Recurrent Herniations</td>
              <td className="p-4 text-[var(--color-text-secondary)]">Soft Disc Herniations, Foraminal Stenosis</td>
            </tr>
            <tr className="hover:bg-[var(--color-primary-50)]/30 transition-colors">
              <th scope="row" className="p-4 font-semibold text-[var(--color-primary-900)] bg-[var(--color-primary-50)]/30 text-left">Anesthesia</th>
              <td className="p-4 text-[var(--color-text-secondary)]">General Anesthesia</td>
              <td className="p-4 text-[var(--color-text-secondary)]">Local or General</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MicroVsEndoTable;
