import React from 'react';

const SurgeryComparisonTable = () => {
  return (
    <div className="my-8 relative bg-[var(--color-surface)]/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="overflow-x-auto rounded-xl">
        <table className="w-full text-left border-collapse">
          <caption className="sr-only">Comparison of Endoscopic vs. Traditional Surgery</caption>
          <thead>
            <tr className="bg-[var(--color-primary-50)]/50 text-[var(--color-primary-900)] border-b border-[var(--color-primary-100)]/50">
              <th scope="col" className="p-4 font-bold text-sm uppercase tracking-wide w-1/3">Feature</th>
              <th scope="col" className="p-4 font-bold text-sm uppercase tracking-wide w-1/3 text-[var(--color-primary-700)]">Endoscopic (Keyhole) Surgery</th>
              <th scope="col" className="p-4 font-bold text-sm uppercase tracking-wide w-1/3 text-[var(--color-text-secondary)]">Traditional Open Surgery</th>
            </tr>
          </thead>
          <tbody className="text-sm text-[var(--color-text-secondary)] divide-y divide-[var(--color-primary-100)]/50">
            <tr className="hover:bg-[var(--color-primary-50)]/30 transition-colors">
              <th scope="row" className="p-4 font-semibold text-[var(--color-primary-900)] bg-[var(--color-primary-50)]/30 text-left">Incision Size</th>
              <td className="p-4 font-medium text-[var(--color-success-700)]">Tiny (&lt; 1 cm)</td>
              <td className="p-4 text-[var(--color-text-secondary)]">Large (3-5 inches)</td>
            </tr>
            <tr className="hover:bg-[var(--color-primary-50)]/30 transition-colors">
              <th scope="row" className="p-4 font-semibold text-[var(--color-primary-900)] bg-[var(--color-primary-50)]/30 text-left">Muscle Damage</th>
              <td className="p-4 font-medium text-[var(--color-success-700)]">Minimal (muscles dilated, not cut)</td>
              <td className="p-4 text-[var(--color-text-secondary)]">Significant (muscles stripped)</td>
            </tr>
            <tr className="hover:bg-[var(--color-primary-50)]/30 transition-colors">
              <th scope="row" className="p-4 font-semibold text-[var(--color-primary-900)] bg-[var(--color-primary-50)]/30 text-left">Blood Loss</th>
              <td className="p-4 font-medium text-[var(--color-success-700)]">Negligible</td>
              <td className="p-4 text-[var(--color-text-secondary)]">Moderate</td>
            </tr>
            <tr className="hover:bg-[var(--color-primary-50)]/30 transition-colors">
              <th scope="row" className="p-4 font-semibold text-[var(--color-primary-900)] bg-[var(--color-primary-50)]/30 text-left">Hospital Stay</th>
              <td className="p-4 font-medium text-[var(--color-success-700)]">Day Care / 24 hours</td>
              <td className="p-4 text-[var(--color-text-secondary)]">3-5 days</td>
            </tr>
            <tr className="hover:bg-[var(--color-primary-50)]/30 transition-colors">
              <th scope="row" className="p-4 font-semibold text-[var(--color-primary-900)] bg-[var(--color-primary-50)]/30 text-left">Post-op Pain</th>
              <td className="p-4 font-medium text-[var(--color-success-700)]">Mild (oral meds only)</td>
              <td className="p-4 text-[var(--color-text-secondary)]">Moderate to Severe</td>
            </tr>
            <tr className="hover:bg-[var(--color-primary-50)]/30 transition-colors">
              <th scope="row" className="p-4 font-semibold text-[var(--color-primary-900)] bg-[var(--color-primary-50)]/30 text-left">Recovery Time</th>
              <td className="p-4 font-medium text-[var(--color-success-700)]">Return to work in 1-2 weeks</td>
              <td className="p-4 text-[var(--color-text-secondary)]">4-6 weeks or more</td>
            </tr>
            <tr className="hover:bg-[var(--color-primary-50)]/30 transition-colors">
              <th scope="row" className="p-4 font-semibold text-[var(--color-primary-900)] bg-[var(--color-primary-50)]/30 text-left">Scarring</th>
              <td className="p-4 font-medium text-[var(--color-success-700)]">Almost invisible</td>
              <td className="p-4 text-[var(--color-text-secondary)]">Noticeable scar</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SurgeryComparisonTable;
