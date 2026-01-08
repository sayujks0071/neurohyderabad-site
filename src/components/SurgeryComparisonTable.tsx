import React from 'react';

const SurgeryComparisonTable = () => {
  return (
    <div className="overflow-x-auto my-8 bg-white rounded-xl shadow-sm border border-blue-100">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-blue-50 text-blue-900 border-b border-blue-100">
            <th className="p-4 font-bold text-sm uppercase tracking-wide w-1/3">Feature</th>
            <th className="p-4 font-bold text-sm uppercase tracking-wide w-1/3 text-blue-700">Endoscopic (Keyhole) Surgery</th>
            <th className="p-4 font-bold text-sm uppercase tracking-wide w-1/3 text-gray-600">Traditional Open Surgery</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
          <tr>
            <td className="p-4 font-semibold text-blue-900 bg-blue-50/30">Incision Size</td>
            <td className="p-4 font-medium text-green-700">Tiny (&lt; 1 cm)</td>
            <td className="p-4 text-gray-500">Large (3-5 inches)</td>
          </tr>
          <tr>
            <td className="p-4 font-semibold text-blue-900 bg-blue-50/30">Muscle Damage</td>
            <td className="p-4 font-medium text-green-700">Minimal (muscles dilated, not cut)</td>
            <td className="p-4 text-gray-500">Significant (muscles stripped)</td>
          </tr>
          <tr>
            <td className="p-4 font-semibold text-blue-900 bg-blue-50/30">Blood Loss</td>
            <td className="p-4 font-medium text-green-700">Negligible</td>
            <td className="p-4 text-gray-500">Moderate</td>
          </tr>
          <tr>
            <td className="p-4 font-semibold text-blue-900 bg-blue-50/30">Hospital Stay</td>
            <td className="p-4 font-medium text-green-700">Day Care / 24 hours</td>
            <td className="p-4 text-gray-500">3-5 days</td>
          </tr>
          <tr>
            <td className="p-4 font-semibold text-blue-900 bg-blue-50/30">Post-op Pain</td>
            <td className="p-4 font-medium text-green-700">Mild (oral meds only)</td>
            <td className="p-4 text-gray-500">Moderate to Severe</td>
          </tr>
          <tr>
            <td className="p-4 font-semibold text-blue-900 bg-blue-50/30">Recovery Time</td>
            <td className="p-4 font-medium text-green-700">Return to work in 1-2 weeks</td>
            <td className="p-4 text-gray-500">4-6 weeks or more</td>
          </tr>
          <tr>
            <td className="p-4 font-semibold text-blue-900 bg-blue-50/30">Scarring</td>
            <td className="p-4 font-medium text-green-700">Almost invisible</td>
            <td className="p-4 text-gray-500">Noticeable scar</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SurgeryComparisonTable;
