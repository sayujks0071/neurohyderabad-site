import { SITE_URL } from "@/src/lib/seo";
import type { Metadata } from "next";
import Section from "../_components/Section";
import Card from "../_components/Card";
import Button from "../_components/Button";
import InternationalForm from "@/components/forms/InternationalForm";
import MedicalWebPageSchema from "../components/schemas/MedicalWebPageSchema";
import BreadcrumbSchema from "../components/schemas/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "International & NRI Patient Services | Dr. Sayuj Krishnan S",
  description: "Dedicated medical services for international and NRI patients seeking neurosurgical care in Hyderabad. Telemedicine, visa assistance, and specialized care plans.",
  alternates: { canonical: "/international" },
  openGraph: {
    title: "International & NRI Patient Services | Dr. Sayuj Krishnan S",
    description: "Dedicated medical services for international and NRI patients seeking neurosurgical care in Hyderabad. Get personalized treatment plans and travel assistance.",
    url: `${SITE_URL}/international`,
    type: "website",
  },
};

export default function InternationalPage() {
  return (
    <>
      <MedicalWebPageSchema
        pageType="about"
        pageSlug="/international"
        title="International & NRI Patient Services | Dr. Sayuj Krishnan S"
        description="Dedicated medical services for international and NRI patients seeking neurosurgical care in Hyderabad."
        audience="Patients"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "International Patients", path: "/international" }
        ]}
      />

      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 -z-10" />
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10 -z-10" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight text-balance">
              International & NRI Patient Services
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 font-medium text-balance leading-relaxed">
              World-class neurosurgical care in Hyderabad, tailored for patients traveling from abroad.
            </p>
          </div>
        </div>
      </section>

      <main>
        <Section className="bg-slate-50/50 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-10">
              <div className="order-2 lg:order-1">
                 <InternationalForm />
              </div>

              <div className="order-1 lg:order-2 space-y-6">
                 <div>
                    <h2 className="text-3xl font-bold mb-4 text-slate-800">Your Health, Our Priority</h2>
                    <p className="text-lg text-slate-600 mb-6">
                      We understand that seeking medical treatment far from home can be daunting. Our dedicated international patient coordination team ensures a seamless experience from initial consultation to post-operative recovery.
                    </p>

                    <h3 className="text-2xl font-bold mt-8 mb-4 text-slate-800">Services We Provide</h3>
                    <ul className="space-y-4 text-slate-600 mb-8 list-disc list-inside">
                        <li><strong>Telemedicine Consultations:</strong> Discuss your diagnosis and treatment options before traveling.</li>
                        <li><strong>Medical Visa Assistance:</strong> Official invitation letters and documentation support for visa applications.</li>
                        <li><strong>Dedicated Coordinator:</strong> A single point of contact to assist with all logistics and clinical scheduling.</li>
                        <li><strong>Airport & Travel Coordination:</strong> Assistance with airport transfers and accommodation near Yashoda Hospitals.</li>
                        <li><strong>English Medical Records:</strong> Comprehensive discharge summaries and operative notes provided in English.</li>
                    </ul>

                    {/* WhatsApp Fallback */}
                    <Card padding="lg" className="mt-8 bg-green-50/50 border-green-100">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-lg text-green-800">Prefer to message?</h3>
                          <p className="text-green-700">Chat directly with our coordination team on WhatsApp.</p>
                        </div>
                        <Button
                          href="https://wa.me/919778280044?text=Hello+Dr.+Sayuj+I+am+an+international+patient+seeking+consultation"
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
