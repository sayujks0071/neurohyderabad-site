const patientTestimonials = [
  {
    name: 'Rajesh Kumar',
    location: 'Secunderabad',
    condition: 'Endoscopic Discectomy',
    rating: '5/5',
    testimonial: 'Dr. Sayuj performed my endoscopic spine surgery with minimal pain. I was walking the same day and back to work in 2 weeks. Highly recommend!'
  },
  {
    name: 'Priya Sharma',
    location: 'Banjara Hills',
    condition: 'Brain Tumor Surgery',
    rating: '5/5',
    testimonial: 'Dr. Sayuj\'s expertise in brain tumor surgery gave me confidence. The awake craniotomy was successful and my recovery was faster than expected.'
  },
  {
    name: 'Venkat Reddy',
    location: 'Gachibowli',
    condition: 'Spinal Stenosis Treatment',
    rating: '5/5',
    testimonial: 'Excellent care from consultation to recovery. Dr. Sayuj explained everything clearly and the minimally invasive approach worked perfectly.'
  }
];

const trustIndicators = [
  {
    icon: '🏥',
    title: 'Yashoda Hospital Malakpet',
    description: 'Associated with leading multi-specialty hospital in Hyderabad'
  },
  {
    icon: '📋',
    title: '9+ Years Experience',
    description: 'Extensive experience in neurosurgery and spine surgery'
  },
  {
    icon: '🎓',
    title: 'Advanced Training',
    description: 'Fellowship in minimally invasive surgery from Germany'
  },
  {
    icon: '⚡',
    title: 'Same-Day Discharge',
    description: 'Many procedures allow patients to go home the same day'
  }
];

export default function LocalReputationPanel() {
  return (
    <section className="py-16 bg-gradient-to-br from-[var(--color-primary-50)] via-white to-[var(--color-primary-50)]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <span className="text-sm uppercase tracking-wide text-[var(--color-primary-500)] font-semibold">
            Patient Trust & Reviews
          </span>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mt-3">
            <h2 className="text-3xl font-bold text-[var(--color-primary-900)] max-w-3xl">
              Trusted by Patients Across Hyderabad
            </h2>
            <a
              href="https://www.google.com/search?q=dr+sayuj+krishnan+neurosurgeon+hyderabad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-700)] text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98]"
              aria-label="Read more reviews on Google"
            >
              Read More Reviews →
            </a>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {patientTestimonials.map((testimonial, index) => (
              <article
                key={index}
                className="relative bg-[var(--color-surface)]/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-semibold text-[var(--color-primary-900)]">{testimonial.name}</p>
                    <p className="text-sm text-[var(--color-primary-500)]">{testimonial.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[var(--color-primary-900)]">{testimonial.rating}</p>
                    <p className="text-xs text-[var(--color-primary-500)]">⭐ Google Review</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-3 font-medium">{testimonial.condition}</p>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                  "{testimonial.testimonial}"
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-[var(--color-primary-50)] to-[var(--color-primary-100)] rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-[var(--color-primary-900)] mb-6">
              Why Patients Choose Dr. Sayuj Krishnan
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-3">{indicator.icon}</div>
                  <h4 className="font-semibold text-[var(--color-primary-900)] mb-2">{indicator.title}</h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">{indicator.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-[var(--color-text-secondary)]">
                <strong>4.9/5</strong> average rating from <strong>150+</strong> verified patients on Google Reviews
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
