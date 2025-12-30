import FAQSchema from "../../app/components/schemas/FAQSchema";

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
  emphasis?: string;
}

interface ExpandedFAQProps {
  faqs?: FAQItem[];
  title?: string;
  className?: string;
}

const defaultFAQLibrary: FAQItem[] = [
  {
    question: 'What is the difference between degenerative disc disease and normal aging?',
    answer: [
      'While some disc degeneration is expected with aging, degenerative disc disease (DDD) causes persistent pain, stiffness, and loss of function.',
      'With DDD, the disc loses water content, develops tears in the outer wall, and can irritate nearby nerves. Treatment focuses on pain relief, mobility, and preventing further degeneration.'
    ].join('\n'),
    category: 'Degenerative Disc Disease'
  },
  {
    question: 'Can degenerative disc disease be cured?',
    answer: [
      'Disc degeneration cannot be reversed, but symptoms can be managed effectively.',
      'Our protocol combines physiotherapy, posture correction, weight management, and where needed, endoscopic decompression for long-term relief.'
    ].join('\n'),
    category: 'Degenerative Disc Disease'
  },
  {
    question: 'What is endoscopic discectomy and how effective is it?',
    answer: [
      'Endoscopic discectomy removes damaged disc material through a 6–8 mm port using a camera-guided system.',
      'It delivers 85–90% success rates for DDD with same-day mobilization and a 2–4 week return to activity.'
    ].join('\n'),
    category: 'Degenerative Disc Disease',
    emphasis: 'Same-day discharge protocol available'
  },
  {
    question: 'What causes spinal stenosis and can it be prevented?',
    answer: [
      'Spinal stenosis is usually caused by arthritis, ligament thickening, and age-related bone changes.',
      'Regular core strengthening, posture training, and avoiding smoking can slow progression even though aging cannot be stopped.'
    ].join('\n'),
    category: 'Spinal Stenosis'
  },
  {
    question: 'How is spinal stenosis diagnosed?',
    answer: [
      'Diagnosis relies on a focused neurological examination, MRI/CT imaging to measure canal diameter, and occasionally EMG nerve testing.',
      'We also evaluate walking tolerance and symptom progression to individualize treatment.'
    ].join('\n'),
    category: 'Spinal Stenosis'
  },
  {
    question: 'What is the success rate of endoscopic decompression for spinal stenosis?',
    answer: [
      'Endoscopic decompression improves walking tolerance and relieves leg pain in 85–90% of appropriately selected patients.',
      'Patients typically resume light activity in 2–4 weeks with a rehab plan focused on core and gluteal strength.'
    ].join('\n'),
    category: 'Spinal Stenosis'
  },
  {
    question: 'What triggers trigeminal neuralgia pain?',
    answer: [
      'The facial pain can be triggered by talking, chewing, brushing teeth, or even wind on the face.',
      'Identifying specific triggers helps tailor medication and surgical plans to protect quality of life.'
    ].join('\n'),
    category: 'Trigeminal Neuralgia'
  },
  {
    question: 'What is microvascular decompression and when is it recommended?',
    answer: [
      'Microvascular decompression (MVD) separates the trigeminal nerve from a compressing blood vessel using a cushioning pad.',
      'It is recommended when medications no longer control pain or cause significant side effects.'
    ].join('\n'),
    category: 'Trigeminal Neuralgia'
  },
  {
    question: 'How effective is Gamma Knife radiosurgery for trigeminal neuralgia?',
    answer: [
      'Gamma Knife radiosurgery provides 70–80% success with pain relief emerging over 2–6 weeks.',
      'It is a non-invasive outpatient alternative for patients who prefer to avoid traditional surgery.'
    ].join('\n'),
    category: 'Trigeminal Neuralgia'
  },
  {
    question: 'When is epilepsy surgery considered?',
    answer: [
      'Surgery is considered for drug-resistant epilepsy when the seizure focus can be clearly mapped and safely addressed.',
      'Our multidisciplinary team reviews neuroimaging, EEG, and neuropsychological tests before recommending surgery.'
    ].join('\n'),
    category: 'Epilepsy Surgery'
  },
  {
    question: 'What types of epilepsy surgery are available?',
    answer: [
      'Depending on seizure origin, options include temporal lobectomy, lesionectomy, responsive nerve stimulation, and corpus callosotomy.',
      'Each plan is individualized after seizure-mapping studies and counselling.'
    ].join('\n'),
    category: 'Epilepsy Surgery'
  },
  {
    question: 'What is the success rate of epilepsy surgery?',
    answer: [
      'Temporal lobe procedures can achieve 60–80% seizure freedom, with other approaches tailored to balance efficacy and safety.',
      'Post-operative rehab focuses on cognitive and occupational therapy for a confident return to routines.'
    ].join('\n'),
    category: 'Epilepsy Surgery'
  },
  {
    question: 'What causes a herniated disc?',
    answer: [
      'Herniated discs result from age-related wear, lifting injuries, repetitive strain, obesity, or sudden trauma.',
      'The outer disc wall weakens, allowing the inner nucleus pulposus to protrude and compress nerves.'
    ].join('\n'),
    category: 'Herniated Disc'
  },
  {
    question: 'How long does it take to recover from endoscopic discectomy?',
    answer: [
      'Patients walk within hours, return to desk work in 1–2 weeks, and resume heavier duties in 4–6 weeks with guided physiotherapy.',
      'Our rehab team provides a phased plan with tele-follow-ups for posture, ergonomics, and strength.'
    ].join('\n'),
    category: 'Herniated Disc',
    emphasis: '90% of patients resume daily routines within 3 weeks'
  },
  {
    question: 'Can a herniated disc heal on its own?',
    answer: [
      'Many discs improve with six weeks of conservative therapy including medication, physiotherapy, and lifestyle changes.',
      'Surgery is reserved for persistent pain, recurrent episodes, or nerve deficit threatening long-term function.'
    ].join('\n'),
    category: 'Herniated Disc'
  },
  {
    question: 'What should I expect during my first consultation?',
    answer: [
      'The consultation covers history, focused neurological examination, imaging review, and clarification of goals.',
      'We conclude with a personalized treatment roadmap, cost estimate, and next steps for investigations or surgery.'
    ].join('\n'),
    category: 'Care Journey'
  },
  {
    question: 'How do I prepare for neurosurgery?',
    answer: [
      'Preparation includes pre-anesthesia evaluation, medication adjustments, fasting instructions, and arranging post-operative support.',
      'You receive a written checklist and tele-support to clarify doubts before admission.'
    ].join('\n'),
    category: 'Care Journey'
  },
  {
    question: 'What are the risks of neurosurgery?',
    answer: [
      'Modern minimally invasive techniques significantly reduce infection, bleeding, and nerve injury risks.',
      'We discuss procedure-specific risks, mitigation strategies, and recovery expectations during informed consent.'
    ].join('\n'),
    category: 'Care Journey'
  },
  {
    question: 'How long will I stay in the hospital?',
    answer: [
      'Same-day discharge is common for endoscopic spine procedures. Complex surgeries may need 2–5 days of observation.',
      'Discharge planning includes pain control, wound care guidance, and physiotherapy scheduling.'
    ].join('\n'),
    category: 'Care Journey'
  },
  {
    question: 'When can I return to work after surgery?',
    answer: [
      'Desk work often resumes within 1–2 weeks. Manual roles require 4–6 weeks with graded strengthening.',
      'We provide tailored fitness-to-work letters and ergonomic advice for a safe return.'
    ].join('\n'),
    category: 'Care Journey'
  }
];

export default function ExpandedFAQ({
  faqs = defaultFAQLibrary,
  title = 'Frequently Asked Questions',
  className = ''
}: ExpandedFAQProps) {
  const groupedByCategory = faqs.reduce<Record<string, FAQItem[]>>((acc, item) => {
    const key = item.category || 'General Guidance';
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <section className={`py-16 ${className}`} aria-labelledby="faq-section-title">
      {/* FAQ Schema for SEO */}
      <FAQSchema 
        faqs={faqs.map(faq => ({
          question: faq.question,
          answer: faq.answer
        }))}
        pageTitle={title}
      />
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 
            id="faq-section-title"
            className="text-3xl font-bold text-center mb-12 text-blue-800"
          >
            {title}
          </h2>
          <ul className="space-y-12" aria-label="Frequently asked questions">
            {Object.entries(groupedByCategory).map(([category, items]) => (
              <li key={category} className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-700">
                  {category}
                </h3>
                <ul className="space-y-4" aria-label={`${category} questions`}>
                  {items.map((faq, index) => {
                    const faqId = faq.question
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/(^-|-$)/g, '');

                    return (
                      <li key={`${faqId}-${index}`}>
                        <details
                          data-faq-item
                          data-faq-id={faqId}
                          className="group bg-white rounded-lg shadow-md border border-gray-200 transition-shadow hover:shadow-lg"
                        >
                          <summary
                            className="flex items-start justify-between px-6 py-4 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg"
                            aria-controls={`faq-answer-${faqId}-${index}`}
                          >
                            <div className="pr-6">
                              <span
                                id={`faq-question-${faqId}-${index}`}
                                className="font-semibold text-lg text-blue-900 block"
                              >
                                {faq.question}
                              </span>
                              {faq.emphasis && (
                                <span className="text-sm text-emerald-700 font-medium">
                                  {faq.emphasis}
                                </span>
                              )}
                            </div>
                            <span
                              aria-hidden="true"
                              className="ml-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-transform duration-200 group-open:rotate-45"
                            >
                              +
                            </span>
                          </summary>
                          <div
                            id={`faq-answer-${faqId}-${index}`}
                            className="px-6 pb-5 text-gray-700 leading-relaxed space-y-3 border-t border-gray-100"
                            role="region"
                            aria-labelledby={`faq-question-${faqId}-${index}`}
                          >
                            {faq.answer.split('\n').map((paragraph, paragraphIndex) => (
                              <p key={paragraphIndex}>{paragraph}</p>
                            ))}
                          </div>
                        </details>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
