import { makeMetadata } from '@/app/_lib/meta';
import SchemaScript from '@/app/_schema/Script';
import { peripheralNerveSchemas } from '@/app/_schema/pages/peripheralNerve';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import SmartImage from '@/components/SmartImage';
import AuthorByline from '@/app/_components/AuthorByline';
import SourceList from '@/app/_components/SourceList';
import { getServiceSources } from '../sources';
import FAQPageSchema from '@/app/_components/FAQPageSchema';
import BreadcrumbSchema from '@/app/components/schemas/BreadcrumbSchema';

export const metadata = makeMetadata({
  title: 'Peripheral Nerve Surgery Hyderabad | Carpal & Ulnar',
  description: 'Day-care carpal tunnel, ulnar decompression, and nerve repair by Dr. Sayuj Krishnan at Yashoda Hospital Malakpet.',
  canonicalPath: '/services/peripheral-nerve-surgery',
});

const ARTICLE_SOURCES = getServiceSources('peripheral-nerve-surgery');

export default function Page() {
  const url = 'https://www.drsayuj.info/services/peripheral-nerve-surgery';
  const schemas = peripheralNerveSchemas(url);
  const faqs = [
    {
      question: 'How soon can I return to desk work after carpal tunnel surgery?',
      answer: 'Most patients resume desk work in 7–10 days once sutures are off and discomfort is controlled.',
    },
    {
      question: 'Do ulnar nerve symptoms always need surgery?',
      answer: 'No. Night splints and activity changes are tried first; surgery is recommended if weakness progresses or studies show significant block.',
    },
  ];

  return (
    <main id="main" className="prose">
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: 'Peripheral Nerve Surgery', path: '/services/peripheral-nerve-surgery' },
        ]}
      />
      <FAQPageSchema faqs={faqs} pageUrl={url} />
      <h1>Peripheral Nerve Surgery</h1>
      <AuthorByline
        publishedOn="2025-09-01"
        updatedOn="2025-10-19"
        className="mb-6"
      />

      <section className="not-prose mb-10 rounded-xl border border-emerald-100 bg-emerald-50 p-6 text-sm leading-6">
        <h2 className="mb-2 text-base font-semibold text-emerald-900">Fast facts</h2>
        <ul className="list-disc pl-5 text-emerald-900">
          <li>Persistent numbness, tingling, or weakness warrants early evaluation before the nerve suffers permanent damage.</li>
          <li>Most decompression surgeries (carpal tunnel, cubital tunnel) are day-care procedures with tiny incisions.</li>
          <li>Advanced imaging, nerve conduction studies, and ultrasound mapping guide targeted surgery.</li>
          <li>Hand therapy and ergonomic coaching are built into every recovery plan.</li>
        </ul>
      </section>

      <SmartImage
        src="https://images.unsplash.com/photo-1527169402691-feff5539e52c?auto=format&fit=crop&w=1400&q=80"
        width={1400}
        height={840}
        alt="Surgeon examining a patient's hand before nerve surgery"
        className="mb-10 rounded-xl"
        priority
      />

      <p>
        Entrapment neuropathies limit hand dexterity, grip strength, and quality of sleep. Dr. Sayuj Krishnan combines ultrasound-guided nerve
        assessment, precise microsurgical decompression, and coordinated rehabilitation so that patients regain function quickly while
        protecting long-term nerve health. Surgery is considered once splints, physiotherapy, workplace modification, and injectables fail to
        control symptoms—or when weakness appears on examination.
      </p>

      <h2 id="carpal-tunnel">Carpal Tunnel Release</h2>
      <p>
        Carpal tunnel syndrome occurs when the median nerve is compressed under the transverse carpal ligament. Early surgery prevents muscle
        wasting and improves nighttime numbness. Options include mini-open and endoscopic release; both are performed under regional or local
        anaesthesia with return home the same day.
      </p>
      <ul>
        <li><strong>Indicators:</strong> Weak pinch strength, persistent numbness despite splints, nerve conduction delay.</li>
        <li><strong>Technique:</strong> 2–3 cm palmar crease incision protecting sensory branches; endoscopic when anatomy allows.</li>
        <li><strong>Recovery:</strong> Gentle finger motion immediately, sutures off at 10–12 days, desk work in 7–10 days.</li>
      </ul>

      <h2 id="ulnar-nerve">Ulnar Nerve Decompression</h2>
      <p>
        Cubital tunnel syndrome causes tingling in the ring and little fingers, often worse when the elbow is bent. Surgical options include
        in-situ decompression or anterior transposition of the ulnar nerve, chosen based on nerve subluxation, elbow anatomy, and occupational
        demands.
      </p>
      <ul>
        <li><strong>Indicators:</strong> Intrinsic hand weakness, nerve conduction block across the elbow, failed night splints.</li>
        <li><strong>Technique:</strong> 4–5 cm incision along the medial elbow with protection of the medial antebrachial cutaneous nerve.</li>
        <li><strong>Recovery:</strong> Sling for comfort for 2–3 days, gradual elbow movements, strengthening from week three.</li>
      </ul>

      <h2>Other peripheral nerve procedures</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 p-5">
          <h3 className="mb-3 text-lg font-semibold text-emerald-800">Peroneal nerve decompression</h3>
          <p className="text-sm text-gray-700">
            Addresses foot drop caused by compression at the fibular neck. We release fascial bands, dynamic fibrous tissue, and utilise
            nerve wraps when scarring is present. Night splints and gait training follow immediately.
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 p-5">
          <h3 className="mb-3 text-lg font-semibold text-emerald-800">Nerve repair &amp; grafting</h3>
          <p className="text-sm text-gray-700">
            Traumatic nerve transections are repaired microscopically. For gaps, we use sural nerve grafts or processed nerve allografts. Early
            referral (within weeks) yields the best motor recovery.
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 p-5">
          <h3 className="mb-3 text-lg font-semibold text-emerald-800">Nerve tumour excision</h3>
          <p className="text-sm text-gray-700">
            Schwannomas and neurofibromas are removed using intra-operative nerve stimulation to identify functional fascicles. Enucleation
            preserves motor power while relieving pain and tingling.
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 p-5">
          <h3 className="mb-3 text-lg font-semibold text-emerald-800">Revision surgery</h3>
          <p className="text-sm text-gray-700">
            Recurrent symptoms after prior decompression are evaluated with ultrasound and MRI neurography. Scar release, nerve wrapping, or
            transposition are performed to restore glide and reduce pain.
          </p>
        </div>
      </div>

      <h2>Recovery &amp; rehabilitation</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-emerald-50 p-4">
          <h3 className="text-base font-semibold text-emerald-900">Day 0–3</h3>
          <p className="text-sm text-gray-700">Protect dressing, keep hand elevated, begin tendon-gliding and nerve-gliding drills taught before discharge.</p>
        </div>
        <div className="rounded-lg bg-emerald-50 p-4">
          <h3 className="text-base font-semibold text-emerald-900">Week 1–2</h3>
          <p className="text-sm text-gray-700">Suture removal, progressive grip exercises with therapy putty, scar desensitisation, ergonomic coaching.</p>
        </div>
        <div className="rounded-lg bg-emerald-50 p-4">
          <h3 className="text-base font-semibold text-emerald-900">Week 3–6</h3>
          <p className="text-sm text-gray-700">Strengthening, proprioception retraining, gradual return to manual duties after surgeon review.</p>
        </div>
      </div>

      <h2>Frequently asked questions</h2>
      <dl className="space-y-6">
        <div>
          <dt className="font-semibold text-emerald-900">Do I always need surgery for nerve compression?</dt>
          <dd className="text-gray-700">No. We begin with splints, physiotherapy, ergonomic changes, ultrasound-guided steroid injections, and diabetes control. Surgery is advised if symptoms persist or weakness appears.</dd>
        </div>
        <div>
          <dt className="font-semibold text-emerald-900">Will my numbness disappear immediately?</dt>
          <dd className="text-gray-700">Pins-and-needles often improve within days, but longstanding numbness may take months as the nerve recovers. Early surgery gives the best chance of full sensation.</dd>
        </div>
        <div>
          <dt className="font-semibold text-emerald-900">When can I drive again?</dt>
          <dd className="text-gray-700">Typically after the first post-op review once grip strength and reaction time are safe—usually 7–10 days for carpal tunnel and 14–21 days for elbow procedures.</dd>
        </div>
        <div>
          <dt className="font-semibold text-emerald-900">Is physiotherapy compulsory?</dt>
          <dd className="text-gray-700">Yes. Guided rehabilitation prevents stiffness, scar tethering, and strength loss. Our hand therapy partners provide home exercise videos and follow-ups.</dd>
        </div>
      </dl>

      <SourceList sources={ARTICLE_SOURCES} heading="Clinical References" />
      <ReviewedBy lastReviewed="2025-10-19" />
      <NAP />

      {schemas.map((schema, index) => (
        <SchemaScript key={index} data={schema} />
      ))}
    </main>
  );
}
