import { SITE_URL } from "../../../src/lib/seo";
import { makeMetadata } from "@/app/_lib/meta";
import type { Metadata } from "next";
import Breadcrumbs from "../../components/Breadcrumbs";
import SchemaScript from "@/app/_schema/Script";
import AuthorByline from "@/app/_components/AuthorByline";
import ReviewedBy from "@/app/_components/ReviewedBy";
import SourceList from "@/app/_components/SourceList";
import NAP from "@/app/_components/NAP";
import Link from "next/link";
import { getBlogSources } from "../sources";

const baseMetadata = makeMetadata({
  title: "World Stroke Day 2025 Hyderabad | BE-FAST Action Plan",
  description:
    "Hyderabad families: recognise stroke symptoms with BE-FAST, call 108, and learn Dr Sayuj Krishnan’s Stroke Code pathway, prevention tips, and rehab support for World Stroke Day 2025.",
  canonicalPath: "/blog/world-stroke-day-2025-hyderabad-stroke-code",
});

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: `${SITE_URL}/blog/world-stroke-day-2025-hyderabad-stroke-code/`,
    languages: {
      "en-IN": `${SITE_URL}/blog/world-stroke-day-2025-hyderabad-stroke-code/`,
      "x-default": `${SITE_URL}/blog/world-stroke-day-2025-hyderabad-stroke-code/`,
    },
  },
  openGraph: {
    title: baseMetadata.title,
    description: baseMetadata.description,
    url: `${SITE_URL}/blog/world-stroke-day-2025-hyderabad-stroke-code/`,
    images: [
      {
        url: `${SITE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "World Stroke Day awareness — Dr Sayuj Krishnan",
      },
    ],
  },
};

export const revalidate = 86400;

const ARTICLE_SOURCES = getBlogSources("world-stroke-day-2025-hyderabad-stroke-code");

const quickGlanceItems = [
  { label: "Balance", description: "Sudden dizziness, loss of balance, or stumbling" },
  { label: "Eyes", description: "Blurred, double, or loss of vision in one or both eyes" },
  { label: "Face", description: "Uneven smile or facial droop on one side" },
  { label: "Arms", description: "One arm feels weak, heavy, or drifts downward" },
  { label: "Speech", description: "Slurred, garbled, or difficulty finding words" },
  { label: "Time", description: "Note symptom onset, dial 108, reach a stroke-ready hospital" },
];

const whenNotToDelay = [
  "Sudden, severe headache unlike any previous pain",
  "Sudden loss of vision or double vision in either eye",
  "New one-sided weakness, numbness, or tingling",
  "Slurred or confused speech, or inability to understand",
  "First-time seizure, sudden collapse, or loss of consciousness",
];

const checklistItems = [
  {
    day: "Day 1 (Monday)",
    action:
      "Capture baseline vitals—blood pressure, pulse, fasting glucose—and schedule an overdue health review if needed.",
  },
  {
    day: "Day 2 (Tuesday)",
    action:
      "Swap packaged salty snacks for fruit, sprouts, and roasted chana; plan three low-salt, home-cooked meals.",
  },
  {
    day: "Day 3 (Wednesday)",
    action: "Block a 30-minute brisk walk with a family member; set alarms to break long sitting every 30 minutes.",
  },
  {
    day: "Day 4 (Thursday)",
    action:
      "Reconcile medications, refill prescriptions, and confirm with your doctor if you need statins, antiplatelets, or anticoagulants.",
  },
  {
    day: "Day 5 (Friday)",
    action: "Audit tobacco or alcohol use, set a quit date, and enlist support from a friend or counsellor.",
  },
  {
    day: "Day 6 (Saturday)",
    action:
      "Prepare an emergency grab file—ID proofs, recent scans, discharge summaries, and insurance cards ready by the door.",
  },
  {
    day: "Day 7 (Sunday)",
    action:
      "Teach BE-FAST to household members, building staff, and elder-care helpers; rehearse calling 108 with your address landmarks.",
  },
];

const faqItems = [
  {
    question: "What is a transient ischaemic attack (TIA) or “mini-stroke”?",
    answer:
      "A TIA happens when a temporary clot briefly blocks blood flow to the brain. Symptoms clear within minutes or hours, but a TIA signals a high risk of a full stroke in the next days. Treat it as an emergency and seek specialist review the same day.",
  },
  {
    question: "How is a stroke different from a seizure?",
    answer:
      "Stroke is a blood-flow emergency; brain tissue is starved of oxygen. A seizure is abnormal electrical activity and may follow a stroke, but the immediate management differs. Any first-time seizure, especially with weakness or speech change, needs emergency stroke evaluation.",
  },
  {
    question: "Can young adults or teenagers in India get a stroke?",
    answer:
      "Yes. Congenital heart conditions, uncontrolled hypertension, autoimmune disorders, pregnancy-related complications, sickle cell disease, COVID-19, or lifestyle risks can trigger stroke in the young. Awareness and fast hospital care matter for every age group.",
  },
  {
    question: "What blood pressure target should I aim for to prevent stroke?",
    answer:
      "Most high-risk adults benefit from keeping blood pressure below 130/80 mmHg. Individualise the goal with your physician, particularly if you live with diabetes, chronic kidney disease, or a past stroke.",
  },
  {
    question: "Should I take aspirin the moment I notice stroke symptoms?",
    answer:
      "No. Aspirin can worsen a haemorrhagic stroke. Let emergency physicians confirm the stroke type with a CT scan first—they will start antiplatelets or anticoagulants only when it is safe.",
  },
  {
    question: "How fast must I reach a hospital in Hyderabad if stroke is suspected?",
    answer:
      "Immediately. Thrombolysis works best within 4.5 hours, and mechanical thrombectomy can help selected patients up to 24 hours if imaging shows salvageable brain. Every minute of delay kills millions of neurons.",
  },
  {
    question: "How long does stroke recovery usually take?",
    answer:
      "Recovery timelines vary. Some regain independence in weeks, others need months of physiotherapy, speech therapy, and medication optimisation. Early rehab, caregiver engagement, and secondary prevention improve results.",
  },
];

const howToSteps = [
  {
    name: "Check balance",
    text: "Ask the person to stand or take a few steps. Sudden dizziness, loss of balance, or leaning to one side are red flags.",
  },
  {
    name: "Assess vision",
    text: "Look for abrupt blurred vision, double vision, or loss of sight in one or both eyes.",
  },
  {
    name: "Inspect the face",
    text: "Request a smile. Drooping on one side or an uneven grin suggests facial weakness.",
  },
  {
    name: "Test the arms",
    text: "Ask the person to lift both arms. A drifting, weak, or numb arm indicates possible stroke.",
  },
  {
    name: "Listen to speech",
    text: "Have them repeat a simple sentence. Slurred, garbled, or confused speech needs urgent attention.",
  },
  {
    name: "Call emergency services",
    text: "Note the time symptoms began and dial 108 immediately. Do not self-drive; head to a stroke-ready hospital.",
  },
];

export default function WorldStrokeDay2025Page() {
  const url = `${SITE_URL}/blog/world-stroke-day-2025-hyderabad-stroke-code/`;

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: "World Stroke Day 2025: Recognize Stroke Fast, Act Faster (Hyderabad, India)",
        description:
          "Hyderabad-focused World Stroke Day 2025 guide on BE-FAST recognition, calling 108, thrombolysis and thrombectomy timelines, prevention checklists, rehabilitation, and Dr Sayuj Krishnan’s Stroke Code pathway.",
        author: {
          "@type": "Person",
          name: "Dr Sayuj Krishnan",
        },
        publisher: {
          "@type": "Organization",
          name: "Yashoda Hospital, Malakpet",
          url: "https://www.drsayuj.info",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        datePublished: "2025-10-29",
        dateModified: "2025-10-29",
        inLanguage: "en-IN",
        url,
        image: `${SITE_URL}/images/og-default.jpg`,
        articleSection: [
          "Stroke awareness",
          "Emergency neurology",
          "Rehabilitation",
        ],
        keywords: [
          "World Stroke Day 2025",
          "stroke symptoms Hyderabad",
          "BE-FAST",
          "thrombolysis",
          "mechanical thrombectomy",
          "stroke rehabilitation Hyderabad",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "HowTo",
        "@id": `${url}#howto`,
        name: "How to use BE-FAST to spot a stroke",
        description: "Step-by-step BE-FAST actions for Hyderabad families to recognise stroke and call 108 quickly.",
        inLanguage: "en-IN",
        totalTime: "PT1M",
        supply: [
          { "@type": "HowToSupply", name: "Phone with emergency contacts saved" },
          { "@type": "HowToSupply", name: "BE-FAST reminder card visible at home or office" },
        ],
        step: howToSteps.map((step) => ({
          "@type": "HowToStep",
          name: step.name,
          text: step.text,
        })),
      },
    ],
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog/" },
          { name: "World Stroke Day 2025", href: "/blog/world-stroke-day-2025-hyderabad-stroke-code/" },
        ]}
      />
      <main className="container mx-auto px-4 py-16">
        <article className="max-w-4xl mx-auto">
          <SchemaScript data={schemaData} />
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              World Stroke Day 2025: Recognize Stroke Fast, Act Faster (Hyderabad, India)
            </h1>
            <AuthorByline publishedOn="2025-10-29" updatedOn="2025-10-29" className="mb-4" />
            <p className="text-lg text-gray-700">
              World Stroke Day is observed on <strong>29 October 2025</strong>, urging Hyderabad and Telangana residents to
              spot stroke symptoms promptly, dial 108, and reach stroke-ready hospitals without delay. While the World Stroke
              Organization has not formally announced a 2025 theme yet, its year-round call remains clear: stroke is preventable,
              treatable, and beatable when communities act fast
              (<a
                href="https://www.world-stroke.org/assets/downloads/WSO_Global_Stroke_Fact_Sheet.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline decoration-blue-300 hover:text-blue-900"
              >
                World Stroke Organization, 2023
              </a>
              ).
            </p>
          </header>

          <div className="prose max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900">
            <section className="not-prose mb-10 rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">Quick-Glance: BE-FAST & Call 108</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {quickGlanceItems.map((item) => (
                  <div key={item.label} className="rounded-xl bg-white/80 p-4 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">{item.label}</p>
                    <p className="text-sm text-gray-700 mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                Dial <strong>108</strong> immediately. Keep windows open for ambulance access and inform security or neighbours to guide paramedics.
              </div>
            </section>

            <section className="not-prose mb-8 rounded-xl border border-orange-200 bg-orange-50 p-6">
              <h2 className="text-lg font-semibold text-orange-900">When not to delay medical help</h2>
              <ul className="mt-3 space-y-2 text-sm text-orange-900">
                {whenNotToDelay.map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="mr-2 text-orange-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2>Hyderabad’s stroke reality: A preventable crisis</h2>
              <p>
                Stroke remains the second leading cause of death worldwide, and India shoulders a significant share of that burden.
                The India State-Level Disease Burden Initiative estimated roughly <strong>1.29 million new strokes and 0.65 million stroke-related deaths</strong> in India in 2019,
                with Telangana among the higher-burden states
                (<a
                  href="https://www.thelancet.com/journals/langlo/article/PIIS2214-109X(22)00067-3/fulltext"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline decoration-blue-300 hover:text-blue-900"
                >
                  Lancet Global Health, 2022
                </a>
                ). The World Health Organization reports that <strong>1 in 4 adults</strong> will experience a stroke in their lifetime, yet nearly <strong>90% of strokes link to modifiable risks</strong> such as hypertension, diabetes, tobacco use, harmful alcohol consumption, and sedentary lifestyles
                (<a
                  href="https://www.who.int/india/health-topics/stroke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline decoration-blue-300 hover:text-blue-900"
                >
                  WHO India, 2024
                </a>
                ). These numbers make rapid recognition, swift ambulance activation, and coordinated hospital protocols non-negotiable for Hyderabad families.
              </p>
              <p>
                Among Indian adults aged 30–69 years, the lifetime risk of stroke is projected to rise because of poorly controlled blood pressure,
                rising diabetes prevalence, and air pollution exposure. Yet, evidence shows that aggressive risk-factor control,
                combined with timely thrombolysis and thrombectomy, can dramatically reduce disability-adjusted life years lost to stroke
                (<a
                  href="https://journals.sagepub.com/doi/full/10.1177/09731499211021223"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline decoration-blue-300 hover:text-blue-900"
                >
                  Indian Stroke Association Guidelines, 2022
                </a>
                ). Public education is therefore the first and most important step.
              </p>
            </section>

            <section>
              <h2>Stroke basics: Two emergencies, one urgent response</h2>
              <p>
                An <strong>ischaemic stroke</strong> occurs when a clot blocks an artery supplying the brain, depriving tissues of oxygen-rich blood. A <strong>haemorrhagic stroke</strong> happens when a weakened blood vessel ruptures, causing bleeding inside or around the brain. Both types can strike without warning, and both demand immediate medical attention.
              </p>
              <p>
                Teach BE-FAST to every family member, domestic helper, driver, and office security guard. Print the checklist, post it on your fridge, and review it every quarter. Seconds of recognition translate to neurons saved, cognitive function preserved, and independence maintained.
              </p>
            </section>

            <blockquote className="border-l-4 border-blue-500 pl-6 italic text-lg text-blue-800">
              Every minute saves brain—Hyderabad’s stroke-ready teams are prepared 24/7.
            </blockquote>

            <section>
              <h2>What to do immediately: Hyderabad’s emergency playbook</h2>
              <div className="not-prose mb-6 rounded-2xl border border-red-300 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-red-900 mb-4">Do this the moment stroke is suspected</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li>
                    <strong>Call 108 at once:</strong> Provide the patient’s age, symptoms, and time of onset. Stay on the line for ambulance instructions.
                  </li>
                  <li>
                    <strong>Do not self-medicate:</strong> Avoid aspirin or home remedies until doctors confirm the stroke type with a CT scan.
                  </li>
                  <li>
                    <strong>Do not drive yourself:</strong> Ambulances offer en-route stabilisation and alert the hospital’s Stroke Code team before arrival.
                  </li>
                  <li>
                    <strong>Carry medical documents:</strong> Keep prescriptions, hospital discharge summaries, and allergy information handy.
                  </li>
                  <li>
                    <strong>Alert the hospital:</strong> Call the Emergency Department at Yashoda Hospital, Malakpet on the way so imaging and neuro teams stand by.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2>Time-critical stroke treatments: Windows still matter</h2>
              <p>
                Dr Sayuj Krishnan’s stroke team follows evidence-based timelines:
              </p>
              <ul>
                <li>
                  <strong>Intravenous thrombolysis (IV tPA):</strong> Can dissolve clots when administered within <strong>4.5 hours</strong> of symptom onset for eligible ischaemic strokes, after CT confirms no bleeding.
                </li>
                <li>
                  <strong>Mechanical thrombectomy:</strong> Catheter-based clot retrieval benefits selected large-vessel occlusions, sometimes up to <strong>24 hours</strong> when CT perfusion or MRI shows salvageable brain tissue.
                </li>
                <li>
                  <strong>Individualised decisions:</strong> Suitability depends on age, stroke severity, imaging, and comorbidities. Specialists individualise every intervention—never self-exclude from care.
                </li>
              </ul>
              <p>
                Even if you think you have crossed a “treatment window,” head to a stroke-ready hospital. Advanced imaging can still reveal interventions that prevent long-term disability.
              </p>
            </section>

            <section>
              <h2>Prevention first: Telangana risk factors you can control</h2>
              <p>
                Urban lifestyles in Hyderabad are pushing blood pressure, diabetes, and midlife obesity higher. Protect your brain with these evidence-backed steps:
              </p>
              <ul>
                <li>
                  <strong>Blood pressure control:</strong> Aim for <strong>&lt;130/80 mmHg</strong> when safe. Screen every 6–12 months or more often if hypertensive.
                </li>
                <li>
                  <strong>Diabetes management:</strong> Target HbA1c ≤7% if appropriate. Discuss GLP-1 receptor agonists or SGLT2 inhibitors for cardio-metabolic protection.
                </li>
                <li>
                  <strong>Atrial fibrillation:</strong> Request annual pulse checks after 40; irregular rhythms form clots without warning.
                </li>
                <li>
                  <strong>Tobacco and smokeless forms:</strong> Quit entirely. Combine counselling, nicotine replacement, or prescription aids.
                </li>
                <li>
                  <strong>Alcohol:</strong> Keep to ≤1 unit/day for women, ≤2 for men, with at least two alcohol-free days each week.
                </li>
                <li>
                  <strong>Weight and waist:</strong> Target waist circumference &lt;90 cm for men and &lt;80 cm for women; focus on strength and cardio twice weekly.
                </li>
                <li>
                  <strong>Sleep apnoea:</strong> Loud snoring or daytime sleepiness warrants a sleep study—treating apnoea improves blood pressure control.
                </li>
                <li>
                  <strong>Women’s health:</strong> Monitor blood pressure during pregnancy and postpartum if you had pre-eclampsia or gestational hypertension.
                </li>
                <li>
                  <strong>Diet:</strong> Choose fresh produce, millets, pulses, nuts, and heart-healthy oils; avoid trans-fats and repeated frying.
                </li>
              </ul>
            </section>

            <section>
              <h2>Seven-day stroke risk reset checklist</h2>
              <div className="not-prose grid gap-4 sm:grid-cols-2">
                {checklistItems.map((item) => (
                  <div key={item.day} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">{item.day}</p>
                    <p className="mt-2 text-sm text-gray-700">{item.action}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2>Recovery and rehabilitation: Build a resilient comeback</h2>
              <p>
                Stroke recovery starts in the ICU. Early mobilisation, within 24–48 hours when medically safe, shortens length of stay and accelerates independence. Comprehensive rehabilitation centres in Hyderabad offer:
              </p>
              <ul>
                <li>
                  <strong>Physiotherapy and occupational therapy:</strong> Restore strength, balance, and activities of daily living with task-specific training.
                </li>
                <li>
                  <strong>Speech and swallowing therapy:</strong> Improve communication, cognitive recovery, and protect against aspiration pneumonia.
                </li>
                <li>
                  <strong>Secondary prevention protocols:</strong> Optimise blood pressure, glucose, cholesterol, and antithrombotic therapy to avoid recurrence.
                </li>
                <li>
                  <strong>Caregiver support:</strong> Care teams teach safe transfers, medication schedules, and home modifications before discharge.
                </li>
                <li>
                  <strong>Mood and cognition screening:</strong> Identify post-stroke depression or cognitive changes early; integrate counselling, medication, or neuropsychology input.
                </li>
              </ul>
              <p>
                Plan for home adjustments—grab bars, non-slip flooring, raised toilet seats, and adequate lighting. Explore community nursing or tele-rehabilitation follow-ups when commuting is difficult.
              </p>
            </section>

            <section>
              <h2>Inside Dr Sayuj’s Stroke Code pathway at Yashoda Hospital, Malakpet</h2>
              <p>
                Our stroke-ready workflow is activated the moment 108 control alerts the Emergency Department:
              </p>
              <ol>
                <li>
                  <strong>Triage and stabilisation:</strong> Vital signs, glucose checks, airway support, and focused neurological assessment within minutes.
                </li>
                <li>
                  <strong>Rapid imaging:</strong> Non-contrast CT, CT angiography, and perfusion studies when indicated to map viable brain tissue.
                </li>
                <li>
                  <strong>Team huddle:</strong> Stroke neurologists, neurosurgeons, neurointerventionists, and critical-care specialists review imaging to decide thrombolysis or thrombectomy.
                </li>
                <li>
                  <strong>Acute intervention:</strong> IV thrombolysis begins in the emergency bay or catheter lab; thrombectomy proceeds in a biplane suite for large-vessel occlusions.
                </li>
                <li>
                  <strong>Neuro-ICU transfer:</strong> Continuous haemodynamic monitoring, neurosurgical backup, and intracranial pressure management.
                </li>
                <li>
                  <strong>Rehabilitation planning:</strong> Physiotherapy, speech therapy, dietetics, and social work teams engage within 24 hours to lay out recovery milestones.
                </li>
                <li>
                  <strong>Secondary prevention and follow-up:</strong> Discharge plans include medication titration, caregiver orientation, and tele-consults for patients across Telangana districts.
                </li>
              </ol>
              <p>
                This Stroke Code keeps door-to-needle and door-to-groin times tightly monitored, aligning with international quality benchmarks.
              </p>
            </section>

            <section>
              <h2>Frequently asked questions about stroke in Hyderabad</h2>
              <div className="not-prose divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
                {faqItems.map((item) => (
                  <div key={item.question} className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900">{item.question}</h3>
                    <p className="mt-2 text-sm text-gray-700">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2>Medical disclaimer</h2>
              <p>
                This article offers educational guidance for the public. It is not a substitute for personalised medical advice or emergency care. If you suspect a stroke, dial <strong>108</strong> or visit the nearest stroke-ready hospital immediately.
              </p>
            </section>

            <section className="not-prose mt-10 rounded-2xl border border-blue-200 bg-blue-900 p-8 text-white shadow-lg">
              <h2 className="text-2xl font-semibold">Get Stroke-Ready: Book a Consult or Learn Our Stroke Code</h2>
              <p className="mt-3 text-sm text-blue-100">
                Early planning saves lives. Schedule a preventive consult, organise a family awareness session, or understand how our Stroke Code supports faster recovery.
              </p>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="https://www.drsayuj.info?utm_source=blog&utm_medium=cta_button&utm_campaign=world_stroke_day_2025"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-900 shadow hover:bg-blue-100 transition-colors"
                >
                  Book a consultation
                </Link>
                <Link
                  href="/appointments"
                  className="inline-flex items-center justify-center rounded-xl border border-white px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-blue-900 transition-colors"
                >
                  Learn our Stroke Code pathway
                </Link>
              </div>
              <p className="mt-6 text-xs text-blue-100">
                Emergency reminder: Dial <strong>108</strong> without delay if stroke symptoms appear.
              </p>
            </section>

            <section>
              <h2>Related services and programmes in Hyderabad</h2>
              <ul>
                <li>
                  <Link
                    href="/brain-surgery"
                    className="text-blue-700 underline decoration-blue-300 hover:text-blue-900"
                  >
                    Comprehensive Brain & Stroke Surgery Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/emergency-rehabilitation"
                    className="text-blue-700 underline decoration-blue-300 hover:text-blue-900"
                  >
                    Emergency & Neurocritical Rehabilitation Programme
                  </Link>
                </li>
                <li>
                  <Link
                    href="/neurosurgeon-hyderabad"
                    className="text-blue-700 underline decoration-blue-300 hover:text-blue-900"
                  >
                    Meet Your Hyderabad Neurosurgery Team
                  </Link>
                </li>
                <li>
                  <Link
                    href="/appointments"
                    className="text-blue-700 underline decoration-blue-300 hover:text-blue-900"
                  >
                    Request an Urgent Appointment or Second Opinion
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/brain-tumor-surgery-hyderabad"
                    className="text-blue-700 underline decoration-blue-300 hover:text-blue-900"
                  >
                    Advanced Neuro-oncology & Stroke Prevention Clinics
                  </Link>
                </li>
              </ul>
            </section>

            <section>
              <h2>Trusted external resources</h2>
              <ul>
                <li>
                  <a
                    href="https://www.world-stroke.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline decoration-blue-300 hover:text-blue-900"
                  >
                    World Stroke Organization
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.who.int/india/health-topics/stroke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline decoration-blue-300 hover:text-blue-900"
                  >
                    WHO India – Stroke Care Programmes
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.icmr.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline decoration-blue-300 hover:text-blue-900"
                  >
                    Indian Council of Medical Research – Stroke Surveillance Updates
                  </a>
                </li>
              </ul>
            </section>
          </div>

          <ReviewedBy lastReviewed="2025-10-19" className="mt-12" />
          <SourceList sources={ARTICLE_SOURCES} />
          <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <NAP className="text-sm" />
          </section>
        </article>
      </main>
    </>
  );
}
