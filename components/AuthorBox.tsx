import Image from "next/image";

const QUALIFICATIONS = [
  "MBBS, MS (General Surgery), MCh (Neurosurgery)",
  "Fellowship in Endoscopic Spine Surgery — Germany",
  "Ex-Consultant, Apollo Hospitals, Hyderabad",
];

const MEMBERSHIPS = [
  "Neurological Society of India",
  "AO Spine International",
  "Congress of Neurological Surgeons",
];

export default function AuthorBox() {
  return (
    <section
      className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900"
      aria-labelledby="author-box-heading"
    >
      <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center">
        <div className="shrink-0">
          <Image
            src="/images/dr-sayuj-krishnan-portrait.webp"
            alt="Portrait of Dr. Sayuj Krishnan, neurosurgeon in Hyderabad"
            width={144}
            height={144}
            className="rounded-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
              Medically Reviewed By
            </p>
            <h2 id="author-box-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Dr. Sayuj Krishnan
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Consultant Neurosurgeon — Yashoda Hospital Malakpet, Hyderabad
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Credentials</h3>
              <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                {QUALIFICATIONS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Memberships</h3>
              <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                {MEMBERSHIPS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Dr. Sayuj brings over 12 years of neurosurgical experience with a focus on minimally invasive spine and complex brain
            tumor surgery. All patient-facing content is reviewed for accuracy, risk disclosure, and realistic outcomes.
          </p>
        </div>
      </div>
    </section>
  );
}
