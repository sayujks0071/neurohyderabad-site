import { SITE_URL } from "@/src/lib/seo";
import type { Metadata } from "next";
import Section from "../_components/Section";
import Card from "../_components/Card";
import Button from "../_components/Button";
import ReferralForm from "@/components/forms/ReferralForm";
import MedicalWebPageSchema from "../components/schemas/MedicalWebPageSchema";
import BreadcrumbSchema from "../components/schemas/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Refer a Patient | Dr. Sayuj Krishnan S",
  description: "Refer a patient to Dr. Sayuj Krishnan S, Neurosurgeon in Hyderabad. Trusted by specialists for complex and urgent neurosurgical cases.",
  alternates: { canonical: "/refer" },
  openGraph: {
    title: "Refer a Patient | Dr. Sayuj Krishnan S",
    description: "Trusted by surgeons and specialists across Hyderabad for complex cases. Submit a secure patient referral.",
    url: `${SITE_URL}/refer`,
    type: "website",
  },
};

export default function ReferralPage() {
  return (
    <>
      <MedicalWebPageSchema
        pageType="about"
        pageSlug="/refer"
        title="Refer a Patient | Dr. Sayuj Krishnan S"
        description="Refer a patient to Dr. Sayuj Krishnan S, Neurosurgeon in Hyderabad."
        audience="Physicians"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Refer a Patient", path: "/refer" }
        ]}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950 -z-10" />
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10 -z-10" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight text-balance">
              Refer a Patient to Dr. Sayuj Krishnan S
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 font-medium text-balance leading-relaxed">
              Trusted by surgeons and specialists across Hyderabad for complex cases
            </p>
          </div>
        </div>
      </section>

      <main>
        <Section className="bg-slate-50/50 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-10">
              <div className="order-2 lg:order-1">
                 <ReferralForm />
              </div>

              <div className="order-1 lg:order-2 space-y-6">
                 <div>
                    <h2 className="text-3xl font-bold mb-4 text-slate-800">Why Refer to Us?</h2>
                    <ul className="space-y-4 text-slate-600 mb-8 list-disc list-inside">
                        <li><strong>Advanced Techniques:</strong> Expertise in endoscopic, minimally invasive, and robotic-assisted spine and brain surgeries.</li>
                        <li><strong>Complex Cases:</strong> Specialized in managing high-risk and complex neurosurgical pathologies.</li>
                        <li><strong>Prompt Communication:</strong> We prioritize clear and timely updates to referring physicians regarding patient status and treatment plans.</li>
                        <li><strong>Urgent Access:</strong> Same-day slots are reserved for urgent and emergent cases.</li>
                    </ul>

                    <Card padding="lg" className="bg-blue-50/50 border-blue-100">
                      <h3 className="font-semibold text-xl text-blue-800 mb-2">Urgent Referrals</h3>
                      <p className="text-blue-700 mb-4">
                        For emergencies or time-sensitive referrals requiring immediate attention, please contact us directly.
                      </p>
                      <Button
                        href="tel:+919778280044"
                        className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto"
                      >
                        Call +91 9778280044
                      </Button>
                    </Card>

                    {/* WhatsApp Fallback */}
                    <Card padding="lg" className="mt-8 bg-green-50/50 border-green-100">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-lg text-green-800">Prefer to message?</h3>
                          <p className="text-green-700">Chat directly with our coordination team on WhatsApp.</p>
                        </div>
                        <Button
                          href="https://wa.me/919778280044?text=Hello+Dr.+Sayuj+I+am+a+doctor+and+would+like+to+refer+a+patient"
                          variant="primary"
                          className="bg-green-600 hover:bg-green-700 w-full sm:w-auto text-center"
                        >
                          Chat on WhatsApp →
                        </Button>
                      </div>
                    </Card>
                 </div>
              </div>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}
