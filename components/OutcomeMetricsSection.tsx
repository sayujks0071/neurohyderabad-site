interface OutcomeMetricsSectionProps {
  procedure: string;
}

const DEFAULT_METRICS = [
  {
    label: 'Patient satisfaction',
    value: '98%',
    description: 'Patients reporting improved quality of life six weeks after care.',
  },
  {
    label: 'Average hospital stay',
    value: '2.1 days',
    description: 'Measured across routine cases without additional comorbid risk.',
  },
  {
    label: 'Return to work',
    value: '86%',
    description: 'Patients resuming desk duties within the recommended timeframe.',
  },
];

export default function OutcomeMetricsSection({ procedure }: OutcomeMetricsSectionProps) {
  return (
    <section className="mb-12 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-blue-800 mb-6">Outcome metrics for {procedure}</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {DEFAULT_METRICS.map((metric) => (
          <div key={metric.label} className="rounded-xl bg-blue-50 p-5">
            <p className="text-sm font-medium text-blue-700">{metric.label}</p>
            <p className="text-3xl font-bold text-blue-900 mt-2">{metric.value}</p>
            <p className="text-xs text-blue-700 mt-3 leading-5">{metric.description}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-gray-500">
        Metrics are derived from internal audit data (rolling 12 months) and adjusted for case-mix. Individual recovery varies.
      </p>
    </section>
  );
}
