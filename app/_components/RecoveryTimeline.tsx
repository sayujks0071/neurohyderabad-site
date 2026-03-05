export interface RecoveryMilestone {
  phase: string;
  title: string;
  highlights: string[];
}

interface RecoveryTimelineProps {
  title?: string;
  description?: string;
  milestones?: RecoveryMilestone[];
  className?: string;
}

const DEFAULT_MILESTONES: RecoveryMilestone[] = [
  {
    phase: 'Day 0 • Procedure Day',
    title: 'Mobilise within 3 hours of surgery',
    highlights: [
      'Protected ambulation with physiotherapist supervision',
      'Oral feeds initiated once fully awake; pain managed with multimodal regimen',
      'Discharge planning, wound-care briefing, and take-home medication pack handed over'
    ]
  },
  {
    phase: 'Days 1–7',
    title: 'At-home recovery & remote monitoring',
    highlights: [
      'Tele-follow up at 48 hours to review wound, hydration, and pain scores',
      'Daily breathing and ankle-pump exercises to prevent stiffness and DVT',
      'Ergonomic counselling for sleep and sitting postures'
    ]
  },
  {
    phase: 'Week 2',
    title: 'Return to desk duties',
    highlights: [
      'Scar evaluation and suture removal if applicable',
      'Progressive core-strengthening regimen introduced by physiotherapist',
      'Green signal for light office work with posture modifications'
    ]
  },
  {
    phase: 'Week 4',
    title: 'Functional strength & cardio',
    highlights: [
      'Low-impact cardio (stationary cycling, brisk walk) added to daily plan',
      'Neural gliding and dynamic stretches to restore flexibility',
      'Nutritional review to support bone and nerve healing'
    ]
  },
  {
    phase: 'Weeks 6–8',
    title: 'Graduated return to full activity',
    highlights: [
      'Sports-specific conditioning once pain-free range of motion achieved',
      'Workplace ergonomic audit and customised back-care plan',
      'Final assessment with surgeon; MRI only if clinically indicated'
    ]
  }
];

export default function RecoveryTimeline({
  title = "What Your First Eight Weeks Look Like After Minimally Invasive Spine Surgery",
  description = "Every patient receives a personalised rehab manual, tele-follow up schedule, and physiotherapy support. Use this timeline to set expectations and prepare your support system.",
  milestones = DEFAULT_MILESTONES,
  className = ""
}: RecoveryTimelineProps) {
  return (
    <section className={`py-16 bg-[#0B1120] text-[var(--color-surface)] ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <span className="text-sm uppercase tracking-wide text-[var(--color-success-light)] font-semibold">
            Recovery Roadmap
          </span>
          <h2 className="text-3xl font-bold mt-3 text-[var(--color-surface)]">
            {title}
          </h2>
          <p className="text-[var(--color-border)] mt-4 max-w-3xl">
            {description}
          </p>

          <div className="mt-10 relative">
            <div className="absolute left-4 top-0 bottom-0 hidden lg:block">
              <span className="block h-full w-0.5 bg-gradient-to-b from-[var(--color-success-light)] via-blue-400 to-[var(--color-primary-900)]" />
            </div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.phase}
                  className="lg:pl-16 bg-[#0F172A] border border-[#334155] rounded-2xl p-6 shadow-xl"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-success-light)]0/15 text-[var(--color-success-light)] text-sm font-semibold">
                      {milestone.phase}
                    </span>
                    <span className="text-sm text-[#CBD5E1]">
                      Milestone {index + 1} of {milestones.length}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold mt-4 text-[var(--color-surface)]">
                    {milestone.title}
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm text-[var(--color-border)]">
                    {milestone.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-[var(--color-success-light)] mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 bg-[#0F172A] border border-[#334155] rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-[var(--color-surface)]">
              Remote Care Support
            </h3>
            <p className="text-[var(--color-border)] mt-3">
              WhatsApp helpline (<a href="https://wa.me/919778280044" className="text-[var(--color-success-light)] underline hover:text-[var(--color-success-light)]">
                +91 97782 80044
              </a>) is staffed 24/7 for wound photos, medication clarifications, and physiotherapy escalations.
              International patients receive additional telehealth touchpoints for travel clearance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
