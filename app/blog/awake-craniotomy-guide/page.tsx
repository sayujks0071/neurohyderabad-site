import { makeMetadata } from '@/app/_lib/meta';
import SchemaScript from '@/app/_schema/Script';
import { awakeCraniotomySchemas } from '@/app/_schema/pages/awakeCraniotomy';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import SmartImage from '@/components/SmartImage';

export const metadata = makeMetadata({
  title: 'Awake Craniotomy Guide Hyderabad | Dr. Sayuj',
  description: 'Why awake brain surgery is chosen, mapping process, recovery, and FAQs for Hyderabad patients.',
  canonicalPath: '/blog/awake-craniotomy-guide',
});

export default function Page() {
  const url = 'https://www.drsayuj.com/blog/awake-craniotomy-guide';
  const schemas = awakeCraniotomySchemas(url);

  return (
    <main id="main" className="prose">
      <h1>Awake Craniotomy: A Patient Guide</h1>

      <section className="not-prose mb-10 rounded-xl border border-rose-100 bg-rose-50 p-6 text-sm leading-6">
        <h2 className="mb-2 text-base font-semibold text-rose-900">At a glance</h2>
        <ul className="list-disc pl-5 text-rose-900">
          <li>Awake craniotomy allows the surgical team to map speech, movement, and memory in real time while removing tumours or seizure foci.</li>
          <li>Modern anaesthesia keeps you comfortable—you do not feel pain, and you are asleep for the opening and closing steps.</li>
          <li>Continuous neuropsychology support and neuronavigation technology make the operation both safe and collaborative.</li>
          <li>Most patients go home in 3–4 days and begin light activity once fatigue settles; complex cases receive inpatient rehabilitation.</li>
        </ul>
      </section>

      <SmartImage
        src="https://images.unsplash.com/photo-1576765607924-3f7b8410b099?auto=format&fit=crop&w=1400&q=80"
        width={1400}
        height={840}
        alt="Neurosurgery team preparing for an awake craniotomy"
        className="mb-10 rounded-xl"
        priority
      />

      <p>
        Awake craniotomy is a specialised brain surgery technique where you participate during critical portions of the operation. It is used
        for tumours, cavernomas, arteriovenous malformations, and epilepsy focus resections located near areas controlling speech, movement,
        or sensation. Being responsive allows Dr. Sayuj Krishnan and the neurophysiology team to test function moment-to-moment, ensuring only
        diseased tissue is removed.
      </p>

      <h2>When is it recommended?</h2>
      <ul>
        <li><strong>Tumours in eloquent cortex:</strong> Low-grade gliomas, metastases, and meningiomas close to speech or motor areas.</li>
        <li><strong>Epilepsy surgery:</strong> Cortical mapping guides resection while avoiding essential language or sensory zones.</li>
        <li><strong>Functional preservation:</strong> Professional voice users, musicians, teachers, or caregivers needing rapid cognitive recovery.</li>
        <li><strong>Re-do operations:</strong> Prior surgeries with scar tissue demand real-time mapping to prevent deficits.</li>
      </ul>

      <h2>Step-by-step: what to expect</h2>
      <ol className="space-y-3 text-gray-700">
        <li><strong>1. Pre-operative rehearsal:</strong> You meet our neuropsychologist to practise language or motor tasks that will be repeated during surgery.</li>
        <li><strong>2. Asleep for opening:</strong> In the operating theatre, anaesthesia places you under light general anaesthesia. The scalp is numbed, and the bone opening is made.</li>
        <li><strong>3. Wake-and-test phase:</strong> Anaesthesia lightens sedation. You feel relaxed but alert enough to count, name objects, move your hand, or read aloud.</li>
        <li><strong>4. Mapping &amp; tumour removal:</strong> Gentle electrical stimulation identifies crucial areas. Tissue is removed only when it is safe.</li>
        <li><strong>5. Closure under sedation:</strong> Once resection is complete, you are re-sedated and remain asleep while the bone flap and skin are closed.</li>
      </ol>

      <h2>Comfort and safety measures</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 p-5">
          <h3 className="mb-3 text-lg font-semibold text-rose-900">Anaesthesia support</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>Scalp blocks eliminate pain at fixation points.</li>
            <li>Short-acting sedatives maintain calm without grogginess.</li>
            <li>Pain and anxiety medication is adjusted instantly based on feedback.</li>
            <li>Warm blankets, music, and guided breathing reduce stress.</li>
          </ul>
        </div>
        <div className="rounded-lg border border-gray-200 p-5">
          <h3 className="mb-3 text-lg font-semibold text-rose-900">Technology</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>Neuronavigation overlays MRI data to guide millimetre-level accuracy.</li>
            <li>Intra-operative ultrasound or MRI checks for residual tumour.</li>
            <li>Electrocorticography monitors seizure onset zones.</li>
            <li>Continuous neuro-monitoring tracks limb strength and speech fluency.</li>
          </ul>
        </div>
      </div>

      <h2>Recovery timeline</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-rose-50 p-4">
          <h3 className="text-base font-semibold text-rose-900">Days 0–3</h3>
          <p className="text-sm text-gray-700">ICU observation for 24 hours, speech/physio assessments, MRI confirmation of resection, gradual mobilisation.</p>
        </div>
        <div className="rounded-lg bg-rose-50 p-4">
          <h3 className="text-base font-semibold text-rose-900">Weeks 1–3</h3>
          <p className="text-sm text-gray-700">Staple removal, fatigue management, anti-epileptic titration, cognitive rest followed by graded return to reading or screen time.</p>
        </div>
        <div className="rounded-lg bg-rose-50 p-4">
          <h3 className="text-base font-semibold text-rose-900">Weeks 4–8</h3>
          <p className="text-sm text-gray-700">Speech therapy when needed, guided return to work, driving clearance only after seizure-free interval and neurologist approval.</p>
        </div>
      </div>

      <h2>Preparing for an awake craniotomy</h2>
      <p>
        Our team provides checklists covering medication adjustments, fasting, hair preparation, and caregiver planning. Patients are encouraged
        to practise the cognitive tasks we will use during mapping, bring personal music playlists, and identify the friend or family member who
        will stay with them during the initial recovery week.
      </p>

      <h2>Frequently asked questions</h2>
      <dl className="space-y-6">
        <div>
          <dt className="font-semibold text-rose-900">Why keep me awake during brain surgery?</dt>
          <dd className="text-gray-700">Being responsive lets us monitor language, movement, and sensation continuously. It is the safest way to remove tissue near critical brain areas without causing disability.</dd>
        </div>
        <div>
          <dt className="font-semibold text-rose-900">Will I feel pain?</dt>
          <dd className="text-gray-700">No. The scalp is fully numbed and you receive IV medications. Patients usually describe the experience as strange but not painful.</dd>
        </div>
        <div>
          <dt className="font-semibold text-rose-900">Could I have a seizure on the table?</dt>
          <dd className="text-gray-700">A brief seizure may occur during mapping, but the team is prepared with cold saline and medications. Mapping pauses and resumes only when it is safe.</dd>
        </div>
        <div>
          <dt className="font-semibold text-rose-900">How soon can I speak normally?</dt>
          <dd className="text-gray-700">Most patients speak immediately after surgery. Mild word-finding difficulty or fatigue resolves in days. Speech therapy support is available if needed.</dd>
        </div>
      </dl>

      <ReviewedBy />
      <NAP />

      {schemas.map((schema, index) => (
        <SchemaScript key={index} data={schema} />
      ))}
    </main>
  );
}
