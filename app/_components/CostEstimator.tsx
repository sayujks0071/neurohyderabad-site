'use client';

import { useMemo, useState } from 'react';

type ProcedureKey =
  | 'endoscopicDiscectomy'
  | 'endoscopicDecompression'
  | 'brainTumor'
  | 'microvascularDecompression'
  | 'epilepsySurgery';

type CoverageKey = 'selfPay' | 'insuranceCashless' | 'corporate';
type SeverityKey = 'mild' | 'moderate' | 'complex';

const procedures: Record<
  ProcedureKey,
  {
    name: string;
    baseRange: [number, number];
    highlight: string;
  }
> = {
  endoscopicDiscectomy: {
    name: 'Endoscopic Discectomy',
    baseRange: [95000, 135000],
    highlight: 'Same-day discharge, physiotherapy starter kit included'
  },
  endoscopicDecompression: {
    name: 'Endoscopic Decompression (ULBD)',
    baseRange: [145000, 185000],
    highlight: 'Includes intraoperative neuromonitoring and one review MRI'
  },
  brainTumor: {
    name: 'Brain Tumour Surgery with Navigation',
    baseRange: [340000, 480000],
    highlight: 'Neuronavigation, ICU monitoring, and multidisciplinary tumour board consult'
  },
  microvascularDecompression: {
    name: 'Microvascular Decompression',
    baseRange: [265000, 345000],
    highlight: 'Dedicated pain management follow-up with neurology team'
  },
  epilepsySurgery: {
    name: 'Epilepsy Surgery Programme',
    baseRange: [420000, 560000],
    highlight: 'Pre-surgical video EEG, neuropsychology testing, and rehabilitation sessions'
  }
};

const coverageAdjustments: Record<CoverageKey, number> = {
  selfPay: 0,
  insuranceCashless: -0.12,
  corporate: 0.08
};

const coverageLabels: Record<CoverageKey, string> = {
  selfPay: 'Self-pay / TPA reimbursement',
  insuranceCashless: 'Insurance (cashless)',
  corporate: 'Corporate network / international'
};

const severityAdjustments: Record<SeverityKey, number> = {
  mild: -0.05,
  moderate: 0,
  complex: 0.18
};

const severityLabels: Record<SeverityKey, string> = {
  mild: 'Early stage / single level',
  moderate: 'Standard complexity',
  complex: 'Revision / multi-level / comorbid'
};

const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
});

function calculateEstimate(
  procedureKey: ProcedureKey,
  coverage: CoverageKey,
  severity: SeverityKey
): { low: number; high: number } {
  const { baseRange } = procedures[procedureKey];
  const coverageModifier = coverageAdjustments[coverage];
  const severityModifier = severityAdjustments[severity];

  const modifier = 1 + coverageModifier + severityModifier;
  const low = Math.round(baseRange[0] * modifier);
  const high = Math.round(baseRange[1] * modifier);

  return { low, high };
}

export default function CostEstimator() {
  const [procedure, setProcedure] = useState<ProcedureKey>('endoscopicDiscectomy');
  const [coverage, setCoverage] = useState<CoverageKey>('selfPay');
  const [severity, setSeverity] = useState<SeverityKey>('moderate');

  const estimate = useMemo(
    () => calculateEstimate(procedure, coverage, severity),
    [procedure, coverage, severity]
  );

  const highlight = procedures[procedure].highlight;

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
              Transparent Pricing
            </span>
            <h2 className="text-3xl font-bold text-blue-900 mt-4">
              Tailored Neurosurgery Cost Estimate
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl">
              Select your procedure, coverage preference, and complexity level to understand the expected package
              range. Every quote includes surgeon fees, anesthesia, OT charges, implants, and 30-day follow-up.
            </p>

            <form className="mt-8 grid gap-6 md:grid-cols-2" aria-label="Neurosurgery cost estimator form">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-blue-800">Procedure</span>
                <select
                  className="rounded-xl border border-blue-200 px-3 py-3 text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  value={procedure}
                  onChange={(event) => setProcedure(event.target.value as ProcedureKey)}
                >
                  {Object.entries(procedures).map(([key, meta]) => (
                    <option key={key} value={key}>
                      {meta.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-blue-800">Coverage Type</span>
                <select
                  className="rounded-xl border border-blue-200 px-3 py-3 text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  value={coverage}
                  onChange={(event) => setCoverage(event.target.value as CoverageKey)}
                >
                  {Object.entries(coverageLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>

              <fieldset className="md:col-span-2">
                <legend className="text-sm font-medium text-blue-800 mb-3">
                  Condition Complexity
                </legend>
                <div className="grid gap-3 md:grid-cols-3">
                  {(Object.keys(severityLabels) as SeverityKey[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSeverity(key)}
                      className={`rounded-xl border px-4 py-4 text-left transition ${
                        severity === key
                          ? 'border-blue-500 bg-blue-50 text-blue-900 shadow-inner'
                          : 'border-blue-200 bg-white text-gray-700 hover:border-blue-400'
                      }`}
                      aria-pressed={severity === key}
                    >
                      <span className="block font-semibold text-base text-blue-900">
                        {severityLabels[key].split(' / ')[0]}
                      </span>
                      <span className="block text-sm text-gray-500 mt-1">
                        {severityLabels[key].split(' / ').slice(1).join(' / ') || 'Standard complexity'}
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>
            </form>
          </div>

          <aside className="bg-blue-900 text-blue-50 rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold">Estimated Package</h3>
              <p className="text-blue-100 mt-2 text-sm">
                Based on preferred coverage and complexity. Final quote follows clinical assessment and imaging
                review.
              </p>
              <div className="mt-6 bg-blue-800 rounded-2xl p-6 shadow-inner">
                <p className="text-sm uppercase tracking-wide text-blue-200">Estimated Range</p>
                <p className="text-3xl font-bold mt-2">
                  {formatter.format(estimate.low)} – {formatter.format(estimate.high)}
                </p>
                <p className="text-sm text-blue-200 mt-3">
                  {highlight}
                </p>
              </div>

              <ul className="mt-6 space-y-3 text-sm text-blue-100 list-disc list-inside">
                <li>Dedicated insurance helpdesk for pre-authorisations and document support</li>
                <li>Physiotherapy, diet, and wound-care consultations included in discharge kit</li>
                <li>Tele-follow up at 48 hours, 7 days, and 30 days post-procedure</li>
              </ul>
            </div>

            <div className="mt-8">
              <a
                href="/appointments"
                className="inline-flex w-full items-center justify-center rounded-full bg-white text-blue-700 font-semibold py-3 shadow-lg hover:bg-blue-100 transition"
              >
                Request Detailed Quote →
              </a>
              <p className="text-xs text-blue-200 mt-3">
                Need immediate clarity? Call <a href="tel:+919778280044" className="text-white underline">+91 97782 80044</a> —
                ask for the neurosurgery coordinator.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
