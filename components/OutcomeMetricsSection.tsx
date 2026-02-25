interface MetricItem {
  label: string;
  value: string;
  description: string;
}

interface OutcomeMetricsSectionProps {
  procedure: string;
  metrics?: MetricItem[];
}

const DEFAULT_METRICS: MetricItem[] = [
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

export default function OutcomeMetricsSection({ procedure, metrics }: OutcomeMetricsSectionProps) {
  const displayMetrics = metrics || DEFAULT_METRICS;

  return (
    <section className="mb-12 py-4" aria-labelledby="outcome-metrics-title">
      <h2
        id="outcome-metrics-title"
        className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center md:text-left"
      >
        Outcome metrics for {procedure}
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {displayMetrics.map((metric) => (
          <div
            key={metric.label}
            className="relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <p className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">
              {metric.label}
            </p>
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
              {metric.value}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {metric.description}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs text-slate-500 text-center md:text-left max-w-4xl">
        Metrics are derived from internal audit data (rolling 12 months) and adjusted for case-mix. Individual recovery varies.
      </p>
    </section>
  );
}
