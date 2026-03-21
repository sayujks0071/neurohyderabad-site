import type { Metadata } from "next";
import { SITE_URL } from "@/src/lib/seo";
import { CANONICAL_TELEPHONE } from "@/src/data/locations";
import Section from "@/app/_components/Section";
import Card from "@/app/_components/Card";
import Button from "@/app/_components/Button";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import InternationalForm from "@/components/forms/InternationalForm";
import MedicalWebPageSchema from "@/app/components/schemas/MedicalWebPageSchema";
import BreadcrumbSchema from "@/app/components/schemas/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "International Patients | Dr. Sayuj Krishnan",
  description: "Dedicated neurosurgical care and coordination for international and NRI patients traveling to Hyderabad.",
  alternates: {
    canonical: "/international",
  },
  openGraph: {
    title: "International Patients | Dr. Sayuj Krishnan",
    description: "Dedicated neurosurgical care and coordination for international and NRI patients traveling to Hyderabad.",
    url: `${SITE_URL}/international`,
  },
};

export default function InternationalPage() {
  return (
    <>
      <MedicalWebPageSchema
        pageType="service"
        pageSlug="/international"
        title="International Patients | Dr. Sayuj Krishnan"
        description="Dedicated neurosurgical care and coordination for international and NRI patients traveling to Hyderabad."
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "International Patients", path: "/international" }
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "International Patients", href: "/international" }
        ]}
      />
      <main>
        <Section background="blue" className="py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              International & NRI Patient Services
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              World-class neurosurgical care in Hyderabad. We provide end-to-end coordination for patients traveling from abroad, ensuring a seamless experience from consultation to recovery.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button href="#form" variant="primary" className="bg-white text-blue-900 hover:bg-blue-50">Request Consultation</Button>
              <Button href="https://wa.me/919778280044?text=Hello+Dr.+Sayuj+I+am+an+international+patient+seeking+consultation" className="bg-green-500 hover:bg-green-600 border-none text-white">WhatsApp Us</Button>
            </div>
          </div>
        </Section>

        <Section className="py-16">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8" id="form">
              <InternationalForm />
            </div>

            <div className="lg:col-span-4 space-y-8">
              <Card padding="lg">
                <h3 className="text-xl font-semibold mb-4 text-slate-800">Our Services Include:</h3>
                <ul className="space-y-4 text-slate-600">
                  <li className="flex gap-3 items-start">
                    <span className="text-blue-600 flex-shrink-0 mt-1">✓</span>
                    <div>
                      <strong>Dedicated Coordinator</strong>
                      <p className="text-sm">A single point of contact for all your needs.</p>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-blue-600 flex-shrink-0 mt-1">✓</span>
                    <div>
                      <strong>Telemedicine Consultations</strong>
                      <p className="text-sm">Pre-travel video consultations to review MRI/CT scans.</p>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-blue-600 flex-shrink-0 mt-1">✓</span>
                    <div>
                      <strong>Visa Letter Support</strong>
                      <p className="text-sm">Medical visa invitation letters provided promptly.</p>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-blue-600 flex-shrink-0 mt-1">✓</span>
                    <div>
                      <strong>Airport Transfer</strong>
                      <p className="text-sm">Complimentary airport pickup and coordination.</p>
                    </div>
                  </li>
                </ul>
              </Card>

              <Card padding="lg" className="bg-green-50 border-green-100">
                <h3 className="font-semibold text-lg text-green-800 mb-2">Prefer WhatsApp?</h3>
                <p className="text-green-700 mb-4 text-sm">Our international coordinator is available on WhatsApp for quick responses.</p>
                <Button
                  href="https://wa.me/919778280044?text=Hello+Dr.+Sayuj+I+am+an+international+patient+seeking+consultation"
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
