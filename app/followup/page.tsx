import type { Metadata } from "next";
import { SITE_URL } from "@/src/lib/seo";
import { CANONICAL_TELEPHONE } from "@/src/data/locations";
import Section from "@/app/_components/Section";
import Card from "@/app/_components/Card";
import Button from "@/app/_components/Button";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import FollowUpForm from "@/components/forms/FollowUpForm";
import MedicalWebPageSchema from "@/app/components/schemas/MedicalWebPageSchema";
import BreadcrumbSchema from "@/app/components/schemas/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Post-Surgery Follow-Up | Dr. Sayuj Krishnan",
  description: "Submit a post-operative query to Dr. Sayuj's team for guidance during your recovery after neurosurgery.",
  alternates: {
    canonical: "/followup",
  },
  openGraph: {
    title: "Post-Surgery Follow-Up | Dr. Sayuj Krishnan",
    description: "Submit a post-operative query to Dr. Sayuj's team for guidance during your recovery.",
    url: `${SITE_URL}/followup`,
  },
};

export default function FollowUpPage() {
  return (
    <>
      <MedicalWebPageSchema
        pageType="contact"
        pageSlug="/followup"
        title="Post-Surgery Follow-Up | Dr. Sayuj Krishnan"
        description="Submit a post-operative query to Dr. Sayuj's team."
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Post-Op Follow-Up", path: "/followup" }
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Post-Op Follow-Up", href: "/followup" }
        ]}
      />
      <main>
        <Section background="blue" className="py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Post-Surgery Follow-Up
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Your recovery is our priority. Please use this portal to share any concerns, questions, or updates about your post-operative healing.
            </p>
            <div className="inline-flex items-center gap-3 bg-red-600/20 border border-red-500/30 text-white px-6 py-3 rounded-full font-medium shadow-lg animate-pulse-slow">
              <span className="flex-shrink-0 text-xl">⚠️</span>
              <span>Not for emergencies — call <a href={`tel:${CANONICAL_TELEPHONE}`} className="font-bold underline underline-offset-2 hover:text-red-200">{CANONICAL_TELEPHONE}</a> for urgent concerns.</span>
            </div>
          </div>
        </Section>

        <Section className="py-16">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8">
              <FollowUpForm />
            </div>

            <div className="lg:col-span-4 space-y-8">
              <Card padding="lg">
                <h3 className="text-xl font-semibold mb-4 text-slate-800">When to call immediately</h3>
                <p className="text-sm text-slate-600 mb-4 border-b border-slate-100 pb-4">Do not use this form if you are experiencing any of the following:</p>
                <ul className="space-y-3 text-red-700 text-sm font-medium">
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 mt-0.5">•</span>
                    <span>Sudden, severe, or worsening pain</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 mt-0.5">•</span>
                    <span>High fever or chills</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 mt-0.5">•</span>
                    <span>Difficulty breathing or chest pain</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 mt-0.5">•</span>
                    <span>New weakness, numbness, or loss of function</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 mt-0.5">•</span>
                    <span>Significant swelling, redness, or drainage at the surgical site</span>
                  </li>
                </ul>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <a href={`tel:${CANONICAL_TELEPHONE}`} className="block text-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors">Call {CANONICAL_TELEPHONE}</a>
                </div>
              </Card>

              <Card padding="lg" className="bg-green-50 border-green-100">
                <h3 className="font-semibold text-lg text-green-800 mb-2">Prefer WhatsApp?</h3>
                <p className="text-green-700 mb-4 text-sm">Send a quick message to our care team regarding your recovery.</p>
                <Button
                  href="https://wa.me/919778280044?text=Hello+Dr.+Sayuj+I+have+a+post-surgery+query"
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
