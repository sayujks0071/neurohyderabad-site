import React from "react";

const FAQS = [
  {
    question: "How quickly will I receive confirmation?",
    answer:
      "Most appointment requests are confirmed within 30–60 minutes during clinic hours. We will contact you by phone or WhatsApp.",
  },
  {
    question: "What documents should I bring?",
    answer:
      "Please bring any MRI/CT scans, previous reports, and a list of current medications.",
  },
  {
    question: "Can I reschedule after submitting?",
    answer:
      "Yes. If you need to change the date or time, reply to the confirmation message or call the clinic.",
  },
  {
    question: "Do you offer teleconsultations?",
    answer:
      "Teleconsultations are available for follow-ups and initial triage. Choose the teleconsult option during scheduling.",
  },
  {
    question: "Where is the clinic located?",
    answer:
      "Dr. Sayuj Krishnan practices at Yashoda Hospitals, Malakpet, Hyderabad. The address is listed on the confirmation screen.",
  },
];

export default function AppointmentFaq() {
  return (
    <section className="max-w-5xl mx-auto px-4 pb-16">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
          Appointment FAQs
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {FAQS.map((faq) => (
            <div key={faq.question} className="space-y-2">
              <h3 className="text-base font-semibold text-slate-900">
                {faq.question}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
