const reviewSnapshots = [
  {
    platform: 'Google Reviews',
    rating: '4.9/5',
    count: '150+ verified patient stories',
    highlight: 'Patients praise transparent counselling and rapid pain relief post endoscopic surgery.'
  },
  {
    platform: 'Practo',
    rating: '4.8/5',
    count: 'Top neurosurgeon in Hyderabad category',
    highlight: 'Recognised for same-day consults and minimally invasive treatment pathways.'
  },
  {
    platform: 'Google My Business',
    rating: 'Live updates',
    count: 'Weekly FAQ posts & recovery tips',
    highlight: 'Optimised listing with appointment link, driving-map pins, and Q&A for local patients.'
  }
];

const outreachChecklist = [
  'Publish two new Google Posts every week featuring recovery tips and patient education videos.',
  'Automate review requests 48 hours after discharge with WhatsApp + email follow-up.',
  'Ensure NAP consistency across Justdial, Practo, Lybrate, Credihealth, and hospital microsites.',
  'Tag photos with “Hyderabad neurosurgeon” alt text for better local image search visibility.'
];

export default function LocalReputationPanel() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <span className="text-sm uppercase tracking-wide text-blue-600 font-semibold">
            Local SEO Momentum
          </span>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mt-3">
            <h2 className="text-3xl font-bold text-blue-900 max-w-3xl">
              Strengthen Google My Business Signals & Patient Trust in Hyderabad
            </h2>
            <a
              href="https://www.google.com/search?q=dr+sayuj+krishnan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-colors"
            >
              View Live Google Profile →
            </a>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {reviewSnapshots.map((snapshot) => (
              <article
                key={snapshot.platform}
                className="bg-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm"
              >
                <p className="text-sm text-blue-600 font-semibold uppercase tracking-wide">
                  {snapshot.platform}
                </p>
                <p className="text-3xl font-bold text-blue-900 mt-2">{snapshot.rating}</p>
                <p className="text-sm text-blue-500 mt-1">{snapshot.count}</p>
                <p className="text-gray-700 mt-4 text-sm leading-relaxed">
                  {snapshot.highlight}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 bg-gray-900 text-gray-100 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-white">
              Weekly Local SEO Action Checklist
            </h3>
            <ul className="mt-4 grid gap-4 md:grid-cols-2">
              {outreachChecklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 text-emerald-300">•</span>
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-400 mt-6">
              Tip: Upload geo-tagged clinic photos monthly and respond to every Google review within 24 hours to
              reinforce prominence signals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
