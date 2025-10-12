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
    title: '15+ Years Experience',
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <span className="text-sm uppercase tracking-wide text-blue-600 font-semibold">
            Patient Trust & Reviews
          </span>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mt-3">
            <h2 className="text-3xl font-bold text-blue-900 max-w-3xl">
              Trusted by Patients Across Hyderabad
            </h2>
            <a
              href="https://www.google.com/search?q=dr+sayuj+krishnan+neurosurgeon+hyderabad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-colors"
            >
              Read More Reviews →
            </a>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {patientTestimonials.map((testimonial, index) => (
              <article
                key={index}
                className="bg-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-semibold text-blue-900">{testimonial.name}</p>
                    <p className="text-sm text-blue-600">{testimonial.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-900">{testimonial.rating}</p>
                    <p className="text-xs text-blue-500">⭐ Google Review</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3 font-medium">{testimonial.condition}</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  "{testimonial.testimonial}"
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-blue-900 mb-6">
              Why Patients Choose Dr. Sayuj Krishnan
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-3">{indicator.icon}</div>
                  <h4 className="font-semibold text-blue-900 mb-2">{indicator.title}</h4>
                  <p className="text-sm text-gray-600">{indicator.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                <strong>4.9/5</strong> average rating from <strong>150+</strong> verified patients on Google Reviews
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
