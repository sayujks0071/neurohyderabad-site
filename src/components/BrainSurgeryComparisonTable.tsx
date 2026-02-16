import React from 'react';

const BrainSurgeryComparisonTable = () => {
  return (
    <div className="my-8 relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="overflow-x-auto rounded-xl">
        <table className="w-full text-left border-collapse">
          <caption className="sr-only">Comparison of Traditional vs. Advanced Brain Tumor Surgery</caption>
          <thead>
            <tr className="bg-blue-50/50 text-blue-900 border-b border-blue-100/50">
              <th scope="col" className="p-4 font-bold text-sm uppercase tracking-wide w-1/3">Feature</th>
              <th scope="col" className="p-4 font-bold text-sm uppercase tracking-wide w-1/3 text-gray-600">Traditional Craniotomy</th>
              <th scope="col" className="p-4 font-bold text-sm uppercase tracking-wide w-1/3 text-blue-700">Neuronavigation / Awake Surgery</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 divide-y divide-blue-100/50">
            <tr className="hover:bg-blue-50/30 transition-colors">
              <th scope="row" className="p-4 font-semibold text-blue-900 bg-blue-50/30 text-left">Tumor Localization</th>
              <td className="p-4 text-gray-500">Based on anatomical landmarks (Less precise)</td>
              <td className="p-4 font-medium text-green-700">GPS-like precision with Neuronavigation</td>
            </tr>
            <tr className="hover:bg-blue-50/30 transition-colors">
              <th scope="row" className="p-4 font-semibold text-blue-900 bg-blue-50/30 text-left">Brain Function Safety</th>
              <td className="p-4 text-gray-500">Risk to speech/motor areas</td>
              <td className="p-4 font-medium text-green-700">Real-time mapping protects critical functions</td>
            </tr>
            <tr className="hover:bg-blue-50/30 transition-colors">
              <th scope="row" className="p-4 font-semibold text-blue-900 bg-blue-50/30 text-left">Incision Size</th>
              <td className="p-4 text-gray-500">Larger opening required</td>
              <td className="p-4 font-medium text-green-700">Smaller, targeted craniotomy</td>
            </tr>
            <tr className="hover:bg-blue-50/30 transition-colors">
              <th scope="row" className="p-4 font-semibold text-blue-900 bg-blue-50/30 text-left">ICU Stay</th>
              <td className="p-4 text-gray-500">2-3 Days</td>
              <td className="p-4 font-medium text-green-700">1 Day (Rapid Recovery Protocol)</td>
            </tr>
            <tr className="hover:bg-blue-50/30 transition-colors">
              <th scope="row" className="p-4 font-semibold text-blue-900 bg-blue-50/30 text-left">Total Recovery</th>
              <td className="p-4 text-gray-500">4-6 Weeks</td>
              <td className="p-4 font-medium text-green-700">2-3 Weeks</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrainSurgeryComparisonTable;
