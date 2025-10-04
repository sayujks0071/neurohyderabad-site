"use client";
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface ExpandedFAQProps {
  faqs: FAQItem[];
  title?: string;
  className?: string;
}

export default function ExpandedFAQ({ faqs, title = "Frequently Asked Questions", className = "" }: ExpandedFAQProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const conditionSpecificFAQs = [
    {
      condition: 'Degenerative Disc Disease',
      questions: [
        {
          question: 'What is the difference between degenerative disc disease and normal aging?',
          answer: 'While some disc degeneration is normal with aging, degenerative disc disease (DDD) causes significant pain and functional limitations. DDD involves the breakdown of disc structure, loss of water content, and development of tears or cracks in the disc wall, leading to chronic pain and reduced mobility.'
        },
        {
          question: 'Can degenerative disc disease be cured?',
          answer: 'While the disc degeneration itself cannot be reversed, symptoms can be effectively managed. Treatment focuses on pain relief, improving function, and preventing further degeneration. Many patients achieve significant improvement with conservative treatment, while others benefit from minimally invasive procedures.'
        },
        {
          question: 'What is endoscopic discectomy and how effective is it for DDD?',
          answer: 'Endoscopic discectomy is a minimally invasive procedure that removes damaged disc material through a small incision using specialized instruments and a camera. It has a success rate of 85-90% for degenerative disc disease, with patients typically experiencing significant pain relief and returning to normal activities within 2-4 weeks.'
        }
      ]
    },
    {
      condition: 'Spinal Stenosis',
      questions: [
        {
          question: 'What causes spinal stenosis and can it be prevented?',
          answer: 'Spinal stenosis is primarily caused by aging, arthritis, and bone spurs. While aging cannot be prevented, maintaining good posture, regular exercise, and avoiding smoking can help slow progression.'
        },
        {
          question: 'How is spinal stenosis diagnosed?',
          answer: 'Diagnosis involves physical examination, MRI or CT scans to visualize the spinal canal, and sometimes nerve conduction studies to assess nerve function.'
        },
        {
          question: 'What is the success rate of endoscopic decompression for spinal stenosis?',
          answer: 'Endoscopic decompression has a success rate of 85-90% for spinal stenosis, with patients typically experiencing significant pain relief and improved mobility within 2-4 months.'
        }
      ]
    },
    {
      condition: 'Trigeminal Neuralgia',
      questions: [
        {
          question: 'What triggers trigeminal neuralgia pain?',
          answer: 'Common triggers include light touch, eating, talking, brushing teeth, or even a breeze on the face. The pain is often described as electric shock-like and can be debilitating.'
        },
        {
          question: 'What is microvascular decompression and when is it recommended?',
          answer: 'Microvascular decompression (MVD) is a surgical procedure that relieves pressure on the trigeminal nerve by placing a cushion between the nerve and compressing blood vessel. It\'s recommended when medications fail to control pain.'
        },
        {
          question: 'How effective is Gamma Knife radiosurgery for trigeminal neuralgia?',
          answer: 'Gamma Knife radiosurgery has a 70-80% success rate for trigeminal neuralgia, with pain relief typically occurring within 2-6 weeks. It\'s a non-invasive alternative to traditional surgery.'
        }
      ]
    },
    {
      condition: 'Epilepsy',
      questions: [
        {
          question: 'When is epilepsy surgery considered?',
          answer: 'Epilepsy surgery is considered when seizures are not controlled by medications (drug-resistant epilepsy) and the seizure focus can be identified and safely removed without affecting critical brain functions.'
        },
        {
          question: 'What types of epilepsy surgery are available?',
          answer: 'Surgical options include temporal lobectomy, lesionectomy, corpus callosotomy, and vagus nerve stimulation. The choice depends on the location and type of seizures.'
        },
        {
          question: 'What is the success rate of epilepsy surgery?',
          answer: 'Epilepsy surgery has a 60-80% success rate for achieving seizure freedom, with temporal lobectomy showing the highest success rates for temporal lobe epilepsy.'
        }
      ]
    },
    {
      condition: 'Herniated Disc',
      questions: [
        {
          question: 'What causes a herniated disc?',
          answer: 'Herniated discs are commonly caused by aging, lifting injuries, repetitive motion, obesity, and sudden trauma. The disc\'s outer layer weakens, allowing the inner material to bulge or rupture.'
        },
        {
          question: 'How long does it take to recover from endoscopic discectomy?',
          answer: 'Recovery from endoscopic discectomy is typically 2-6 weeks, with most patients returning to light activities within 1-2 weeks and full activities within 4-6 weeks.'
        },
        {
          question: 'Can a herniated disc heal on its own?',
          answer: 'Many herniated discs improve with conservative treatment over 4-6 weeks. However, if symptoms persist or worsen, surgical intervention may be necessary to prevent permanent nerve damage.'
        }
      ]
    },
    {
      condition: 'General Neurosurgery',
      questions: [
        {
          question: 'What should I expect during my first consultation?',
          answer: 'During your first consultation, Dr. Sayuj will review your medical history, perform a physical examination, discuss your symptoms, and may order imaging studies. He will then explain your condition and recommend the best treatment approach.'
        },
        {
          question: 'How do I prepare for neurosurgery?',
          answer: 'Preparation includes stopping certain medications, fasting before surgery, arranging for post-operative care, and following pre-operative instructions. Dr. Sayuj will provide detailed preparation guidelines specific to your procedure.'
        },
        {
          question: 'What are the risks of neurosurgery?',
          answer: 'While neurosurgery carries some risks, Dr. Sayuj uses advanced minimally invasive techniques to minimize complications. Common risks include infection, bleeding, and nerve damage, but these are rare with modern techniques.'
        },
        {
          question: 'How long will I need to stay in the hospital?',
          answer: 'Hospital stay varies by procedure. Minimally invasive endoscopic procedures often allow same-day discharge, while complex surgeries may require 2-5 days of hospitalization.'
        },
        {
          question: 'When can I return to work after surgery?',
          answer: 'Return to work depends on the procedure and your job requirements. Most patients can return to desk work within 1-2 weeks after endoscopic procedures, while physically demanding jobs may require 4-6 weeks.'
        }
      ]
    }
  ];

  // Flatten all FAQs from all conditions
  const allFAQs = conditionSpecificFAQs.flatMap(condition => 
    condition.questions.map(faq => ({
      ...faq,
      category: condition.condition
    }))
  );

  const displayFAQs = faqs.length > 0 ? faqs : allFAQs;

  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">{title}</h2>
          
          <div className="space-y-4">
            {displayFAQs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                    {faq.category && (
                      <span className="text-sm text-blue-600 font-medium">{faq.category}</span>
                    )}
                  </div>
                  <div className="ml-4">
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        openItems.includes(index) ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
