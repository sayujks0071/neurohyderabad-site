import React from 'react';

const SurgeryComparisonTable = () => {
  return (
    <div className="relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 my-8">
      <div className="overflow-x-auto rounded-xl">
        <table className="w-full text-left border-collapse">
          <caption className="sr-only">Comparison of Endoscopic vs. Traditional Surgery</caption>
          <thead>
            <tr className="bg-blue-50 text-blue-900 border-b border-blue-100">
              <th scope="col" className="p-4 font-bold text-sm uppercase tracking-wide w-1/3">Feature</th>
              <th scope="col" className="p-4 font-bold text-sm uppercase tracking-wide w-1/3 text-blue-700">Endoscopic (Keyhole) Surgery</th>
              <th scope="col" className="p-4 font-bold text-sm uppercase tracking-wide w-1/3 text-gray-600">Traditional Open Surgery</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
            <tr>
              <th scope="row" className="p-4 font-semibold text-blue-900 bg-blue-50/30 text-left">Incision Size</th>
              <td className="p-4 font-medium text-green-700">Tiny (&lt; 1 cm)</td>
              <td className="p-4 text-gray-500">Large (3-5 inches)</td>
            </tr>
            <tr>
              <th scope="row" className="p-4 font-semibold text-blue-900 bg-blue-50/30 text-left">Muscle Damage</th>
              <td className="p-4 font-medium text-green-700">Minimal (muscles dilated, not cut)</td>
              <td className="p-4 text-gray-500">Significant (muscles stripped)</td>
            </tr>
            <tr>
              <th scope="row" className="p-4 font-semibold text-blue-900 bg-blue-50/30 text-left">Blood Loss</th>
              <td className="p-4 font-medium text-green-700">Negligible</td>
              <td className="p-4 text-gray-500">Moderate</td>
            </tr>
            <tr>
              <th scope="row" className="p-4 font-semibold text-blue-900 bg-blue-50/30 text-left">Hospital Stay</th>
              <td className="p-4 font-medium text-green-700">Day Care / 24 hours</td>
              <td className="p-4 text-gray-500">3-5 days</td>
            </tr>
            <tr>
              <th scope="row" className="p-4 font-semibold text-blue-900 bg-blue-50/30 text-left">Post-op Pain</th>
              <td className="p-4 font-medium text-green-700">Mild (oral meds only)</td>
              <td className="p-4 text-gray-500">Moderate to Severe</td>
            </tr>
            <tr>
              <th scope="row" className="p-4 font-semibold text-blue-900 bg-blue-50/30 text-left">Recovery Time</th>
              <td className="p-4 font-medium text-green-700">Return to work in 1-2 weeks</td>
              <td className="p-4 text-gray-500">4-6 weeks or more</td>
            </tr>
            <tr>
              <th scope="row" className="p-4 font-semibold text-blue-900 bg-blue-50/30 text-left">Scarring</th>
              <td className="p-4 font-medium text-green-700">Almost invisible</td>
              <td className="p-4 text-gray-500">Noticeable scar</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SurgeryComparisonTable;
