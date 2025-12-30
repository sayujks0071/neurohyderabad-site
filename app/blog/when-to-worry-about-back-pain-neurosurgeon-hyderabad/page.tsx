import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/src/lib/seo';

export const metadata: Metadata = {
  title: 'When to Worry About Back Pain and See a Neurosurgeon in Hyderabad',
  description: 'Learn the red flags for back pain, how MRIs and nerve tests help diagnosis, and when early consultation can prevent nerve damage in Hyderabad.',
  alternates: { canonical: `${SITE_URL}/blog/when-to-worry-about-back-pain-neurosurgeon-hyderabad/` },
  openGraph: {
    title: 'Back Pain Red Flags in Hyderabad – When to See a Neurosurgeon',
    description: 'Understand symptoms that need urgent attention and how early evaluation enables minimally invasive treatment options.',
    url: `${SITE_URL}/blog/when-to-worry-about-back-pain-neurosurgeon-hyderabad/`,
    type: 'article'
  }
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">When to Worry About Back Pain and See a Neurosurgeon in Hyderabad</h1>
      <p className="text-lg text-gray-700 mb-6">
        Most backaches improve with rest, posture correction and physiotherapy. But some symptoms suggest nerve compression or a more serious cause
        that benefits from early specialist evaluation. Recognising these red flags helps prevent permanent nerve damage and may allow outpatient,
        minimally invasive treatment.
      </p>
      <h2 className="text-2xl font-semibold text-blue-800 mb-3">Red‑Flag Symptoms</h2>
      <ul className="list-disc pl-6 text-gray-700 mb-6">
        <li>New leg weakness, foot drop, or progressive numbness</li>
        <li>Loss of bladder or bowel control, saddle anaesthesia</li>
        <li>Severe night pain, fever, history of cancer or unexplained weight loss</li>
      </ul>
      <h2 className="text-2xl font-semibold text-blue-800 mb-3">How Diagnosis Works</h2>
      <p className="text-gray-700 mb-4">
        Depending on your symptoms, your doctor may recommend an <strong>MRI</strong> to look for disc herniation or stenosis and occasionally nerve conduction
        studies to confirm the level of compression. Correlating scan findings with a focused neurological exam is key to choosing the right treatment.
      </p>
      <h2 className="text-2xl font-semibold text-blue-800 mb-3">Why Early Consultation Matters</h2>
      <p className="text-gray-700 mb-6">
        If nerve pressure is caught early, you may qualify for <strong>endoscopic discectomy</strong> or <strong>foraminotomy</strong>—procedures performed through a
        tiny incision with same‑day discharge. Delaying care can prolong pain and recovery time.
      </p>
      <div className="bg-blue-50 rounded-lg p-5">
        <p className="text-blue-900">
          New leg weakness or numbness? Don’t delay – contact our Malakpet clinic today for prompt assessment.
          {' '}<Link href="/appointments" className="text-blue-700 underline">Book a consultation →</Link>
        </p>
      </div>
    </main>
  );
}




