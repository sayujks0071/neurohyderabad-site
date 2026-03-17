import { SITE_URL } from "@/src/lib/seo";
import type { Metadata } from "next";
import Section from "../_components/Section";
import Card from "../_components/Card";
import Button from "../_components/Button";
import FollowUpForm from "@/components/forms/FollowUpForm";
import MedicalWebPageSchema from "../components/schemas/MedicalWebPageSchema";
import BreadcrumbSchema from "../components/schemas/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Post-Op Follow-Up | Dr. Sayuj Krishnan S",
  description: "Submit post-surgery queries or concerns to Dr. Sayuj's team.",
  alternates: { canonical: "/followup" },
  openGraph: {
    title: "Post-Op Follow-Up | Dr. Sayuj Krishnan S",
    description: "Submit post-surgery queries or concerns. Our team will review and respond promptly.",
    url: `${SITE_URL}/followup`,
    type: "website",
  },
};

export default function FollowUpPage() {
  return (
    <>
      <MedicalWebPageSchema
        pageType="about"
        pageSlug="/followup"
        title="Post-Op Follow-Up | Dr. Sayuj Krishnan S"
        description="Submit post-surgery queries to Dr. Sayuj Krishnan S."
        audience="Patients"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Post-Op Follow-Up", path: "/followup" }
        ]}
      />

      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950 -z-10" />
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10 -z-10" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight text-balance">
              Post-Surgery Follow-Up
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 font-medium text-balance leading-relaxed">
              We are here to support your recovery journey.
            </p>
          </div>
        </div>
      </section>

      <main>
        <Section className="bg-slate-50/50 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-10">
              <div className="order-2 lg:order-1">
                 <FollowUpForm />
              </div>

              <div className="order-1 lg:order-2 space-y-6">
                 <div>
                    <h2 className="text-3xl font-bold mb-4 text-slate-800">Your Recovery Matters</h2>
                    <p className="text-lg text-slate-600 mb-6">
                      After surgery, it's normal to have questions. Use this form to communicate non-urgent concerns with our clinical team. We will review your submission and provide guidance.
                    </p>

                    <Card padding="lg" className="bg-red-50/50 border-red-100">
                      <h3 className="font-semibold text-xl text-red-800 mb-2">Emergency Disclaimer</h3>
                      <p className="text-red-700 mb-4 font-bold">
                        Not for emergencies. If you are experiencing severe pain, bleeding, difficulty breathing, or sudden changes in your condition, do not wait for a response.
                      </p>
                      <Button
                        href="tel:+919778280044"
                        className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto"
                      >
                        Call Emergency: +91 9778280044
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
                          href="https://wa.me/919778280044?text=Hello+Dr.+Sayuj+I+have+a+post-surgery+query"
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
