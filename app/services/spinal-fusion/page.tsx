import { makeMetadata } from '@/app/_lib/meta';
import SchemaScript from '@/app/_schema/Script';
import { spinalFusionSchemas } from '@/app/_schema/pages/spinalFusion';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import SmartImage from '@/components/SmartImage';
import AuthorByline from '@/app/_components/AuthorByline';
import SourceList from '@/app/_components/SourceList';
import { getServiceSources } from '../sources';
import BreadcrumbSchema from '@/app/components/schemas/BreadcrumbSchema';

export const metadata = makeMetadata({
  title: 'Spinal Fusion Surgery in Hyderabad | TLIF & ACDF',
  description: 'TLIF and ACDF for instability, recovery timelines, and insurance support with Dr. Sayuj Krishnan.',
  canonicalPath: '/services/spinal-fusion',
});

const ARTICLE_SOURCES = getServiceSources('spinal-fusion');

export default function Page() {
  const url = 'https://www.drsayuj.info/services/spinal-fusion';
  const schemas = spinalFusionSchemas(url);

  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Spinal Fusion Surgery', path: '/services/spinal-fusion' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <main id="main" className="prose">
      <h1>Spinal Fusion Surgery (TLIF/ACDF)</h1>
      <AuthorByline
        publishedOn="2025-09-07"
        updatedOn="2025-10-19"
        className="mb-6"
      />

      <section className="not-prose mb-10 rounded-xl border border-blue-100 bg-blue-50 p-6 text-sm leading-6">
        <h2 className="mb-2 text-base font-semibold text-blue-900">Patient summary</h2>
        <ul className="list-disc pl-5 text-blue-900">
          <li>Fusion stabilizes a painful or unstable segment to protect the spinal cord and nerves.</li>
          <li>Minimally invasive TLIF for lumbar issues and ACDF for cervical disc disease are the most common approaches.</li>
          <li>Most patients walk the day after surgery; desk work usually resumes in 2–4 weeks with guided physiotherapy.</li>
          <li>Insurance pre-authorisation, implant selection, and rehab planning are coordinated for you by our team.</li>
        </ul>
      </section>

      <SmartImage
        src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80"
        width={1400}
        height={780}
        alt="Spinal surgery instrumentation in an operating theatre"
        className="mb-10 rounded-xl"
        priority
      />

      <p>
        Spinal fusion connects two or more vertebrae so that they heal as one solid bone. It is recommended when disc collapse, slippage, or
        deformity causes persistent pain or neurological symptoms despite comprehensive conservative care. Dr. Sayuj Krishnan tailors each
        fusion—posterior TLIF, cervical ACDF, lateral or anterior approaches—based on imaging, bone quality, and long-term functional goals.
      </p>

      <h2 id="tlif">TLIF (Transforaminal Lumbar Interbody Fusion)</h2>
      <p>
        TLIF uses a single-sided posterior corridor to remove the damaged lumbar disc, decompress the nerve root, and place an interbody cage
        with screws for stability. The technique preserves midline muscles, reduces blood loss, and suits recurrent slip disc, low-grade
        spondylolisthesis, and foraminal stenosis.
      </p>
      <ul>
        <li><strong>Benefits:</strong> Unilateral approach, minimal muscle disruption, faster mobilisation.</li>
        <li><strong>Ideal candidates:</strong> Single-level disease, leg-dominant pain, preserved bone density.</li>
        <li><strong>Hospital stay:</strong> 48–72 hours depending on pain control and physiotherapy targets.</li>
      </ul>

      <h2 id="acdf">ACDF (Anterior Cervical Discectomy &amp; Fusion)</h2>
      <p>
        ACDF is performed through a small neck incision to remove a cervical disc that is compressing the spinal cord or exiting nerves. A
        cage or spacer restores disc height and is secured with a plate. The procedure relieves arm pain and numbness, protects the spinal
        cord, and stabilises the segment.
      </p>
      <ul>
        <li><strong>Benefits:</strong> Minimal muscle cutting, predictable pain relief, rapid return to light activity.</li>
        <li><strong>Ideal candidates:</strong> Cervical radiculopathy or myelopathy confirmed on MRI, failed non-surgical care.</li>
        <li><strong>Collar protocol:</strong> Usually 2–4 weeks in a soft collar, guided weaning thereafter.</li>
      </ul>

      <h2>Other techniques we perform</h2>
      <p>
        Posterior lumbar interbody fusion (PLIF), anterior or lateral lumbar interbody fusion (ALIF/LLIF), and hybrid constructs are chosen
        when multi-level disease, deformity correction, or revision surgery demands broader exposure. Navigation and neuromonitoring are used
        in complex cases to maximise safety.
      </p>

      <h2>Pre-operative optimisation</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-800">Clinical preparation</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>Detailed neurological examination and pain mapping.</li>
            <li>Standing X-rays, MRI ± CT to assess instability and nerve compression.</li>
            <li>Bone health optimisation and smoking cessation when relevant.</li>
            <li>Medical clearance for diabetes, hypertension, or cardiac concerns.</li>
          </ul>
        </div>
        <div className="rounded-lg border border-gray-200 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-800">Patient guidance</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>Prehabilitation: targeted core strengthening and gait training.</li>
            <li>Education on walker/collar use, wound care, and travel planning.</li>
            <li>Coordinated insurance pre-authorisation and implant selection.</li>
            <li>Discussion of realistic timelines for return to work and sport.</li>
          </ul>
        </div>
      </div>

      <h2>Recovery timeline</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-slate-50 p-4">
          <h3 className="text-base font-semibold text-blue-800">Week 0–1</h3>
          <p className="text-sm text-gray-700">Walk with support within 24 hours, focus on pain control, begin ankle pumps and breathing exercises.</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-4">
          <h3 className="text-base font-semibold text-blue-800">Week 2–4</h3>
          <p className="text-sm text-gray-700">Transition to independence, start core activation, resume desk work as advised, collar weaning after review.</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-4">
          <h3 className="text-base font-semibold text-blue-800">Week 6–12</h3>
          <p className="text-sm text-gray-700">Progressive strength training, low-impact cardio, imaging review before higher-impact activities.</p>
        </div>
      </div>

      <h2>Costs &amp; insurance coordination</h2>
      <p>
        Fusion packages depend on implant systems, bone graft options, room preference, and post-operative physiotherapy needs. Our coordination
        desk handles TPA submissions, provides detailed written estimates with inclusions/exclusions, and helps you plan for reimbursable
        consumables. Corporate and cashless insurance patients receive dedicated documentation assistance.
      </p>

      <h2>Frequently asked questions</h2>
      <dl className="space-y-6">
        <div>
          <dt className="font-semibold text-blue-900">How long does a fusion last?</dt>
          <dd className="text-gray-700">Fusion is intended to be lifelong. Implants provide stability while the bone knits. Routine follow-up ensures adjacent levels remain healthy.</dd>
        </div>
        <div>
          <dt className="font-semibold text-blue-900">Will I lose mobility?</dt>
          <dd className="text-gray-700">The fused segment stops moving, but most patients do not notice day-to-day restriction. Physiotherapy protects neighbouring joints and maintains core flexibility.</dd>
        </div>
        <div>
          <dt className="font-semibold text-blue-900">Is bone graft taken from my hip?</dt>
          <dd className="text-gray-700">Many cases use synthetic or donor graft substitutes. When iliac crest graft is recommended, we minimise donor-site discomfort with meticulous technique.</dd>
        </div>
        <div>
          <dt className="font-semibold text-blue-900">What about minimally invasive fusion?</dt>
          <dd className="text-gray-700">MISS TLIF or percutaneous screw placement is considered when anatomy and goals allow. Smaller incisions mean less muscle disruption and often faster recovery.</dd>
        </div>
      </dl>

      <SourceList sources={ARTICLE_SOURCES} heading="Clinical References" />
      <ReviewedBy lastReviewed="2025-10-19" />
      <NAP />

      {schemas.map((schema, index) => (
        <SchemaScript key={index} data={schema} />
      ))}
    </main>
    </>
  );
}
