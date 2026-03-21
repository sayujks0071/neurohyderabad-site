import type { Metadata } from "next";
import { SITE_URL } from "@/src/lib/seo";
import { CANONICAL_TELEPHONE } from "@/src/data/locations";
import Section from "@/app/_components/Section";
import Card from "@/app/_components/Card";
import Button from "@/app/_components/Button";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import ReferralForm from "@/components/forms/ReferralForm";
import MedicalWebPageSchema from "@/app/components/schemas/MedicalWebPageSchema";
import BreadcrumbSchema from "@/app/components/schemas/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Refer a Patient | Dr. Sayuj Krishnan",
  description: "Refer a patient to Dr. Sayuj Krishnan for expert neurosurgical care in Hyderabad. Trusted by surgeons and specialists for complex brain and spine cases.",
  alternates: {
    canonical: "/refer",
  },
  openGraph: {
    title: "Refer a Patient | Dr. Sayuj Krishnan",
    description: "Refer a patient to Dr. Sayuj Krishnan for expert neurosurgical care in Hyderabad.",
    url: `${SITE_URL}/refer`,
  },
};

export default function ReferralPage() {
  return (
    <>
      <MedicalWebPageSchema
        pageType="contact"
        pageSlug="/refer"
        title="Refer a Patient | Dr. Sayuj Krishnan"
        description="Refer a patient to Dr. Sayuj Krishnan for expert neurosurgical care in Hyderabad."
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Refer a Patient", path: "/refer" }
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Refer a Patient", href: "/refer" }
        ]}
      />
      <main>
        <Section background="blue" className="py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Refer a Patient to Dr. Sayuj Krishnan S
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Trusted by surgeons and specialists across Hyderabad for complex neurosurgical cases, endoscopic spine surgery, and robotic brain procedures.
            </p>
            <div className="inline-flex items-center gap-3 bg-red-600/20 border border-red-500/30 text-white px-6 py-3 rounded-full font-medium">
              <span className="flex-shrink-0 text-xl">🚑</span>
              <span>For urgent referrals, please call <a href={`tel:${CANONICAL_TELEPHONE}`} className="font-bold underline underline-offset-2 hover:text-red-200">{CANONICAL_TELEPHONE}</a></span>
            </div>
          </div>
        </Section>

        <Section className="py-16">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8">
              <ReferralForm />
            </div>

            <div className="lg:col-span-4 space-y-8">
              <Card padding="lg">
                <h3 className="text-xl font-semibold mb-4 text-slate-800">Why Refer to Us?</h3>
                <ul className="space-y-4 text-slate-600">
                  <li className="flex gap-3">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span><strong>Complex Cases:</strong> Specialized in advanced endoscopic and robotic procedures.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span><strong>Rapid Access:</strong> Same-day slots guaranteed for urgent neurosurgical referrals.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span><strong>Collaborative Care:</strong> We maintain open communication and return patients to your primary care after specialized treatment.</span>
                  </li>
                </ul>
              </Card>

              <Card padding="lg" className="bg-green-50 border-green-100">
                <h3 className="font-semibold text-lg text-green-800 mb-2">Prefer WhatsApp?</h3>
                <p className="text-green-700 mb-4 text-sm">Send a quick message to our coordination team to initiate a referral.</p>
                <Button
                  href="https://wa.me/919778280044?text=Hello+Dr.+Sayuj+I+am+a+doctor+and+would+like+to+refer+a+patient"
                  variant="primary"
                  className="bg-green-600 hover:bg-green-700 w-full justify-center"
                >
                  Chat on WhatsApp →
                </Button>
              </Card>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}
