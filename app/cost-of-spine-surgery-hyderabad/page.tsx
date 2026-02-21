import type { Metadata } from 'next';
import { makeMetadata } from '@/app/_lib/meta';
import FAQPageSchema from '@/app/_components/FAQPageSchema';
import MedicalWebPageSchema from '@/app/components/schemas/MedicalWebPageSchema';
import Link from 'next/link';

export const metadata: Metadata = makeMetadata({
    title: 'Cost of Endoscopic Spine Surgery in Hyderabad | Dr. Sayuj Krishnan',
    description: 'Transparent pricing for minimally invasive and full endoscopic spine surgery in Hyderabad. Compare costs, recovery times, and insurance options for procedures with Dr. Sayuj Krishnan.',
    canonicalPath: '/cost-of-spine-surgery-hyderabad',
});

const PRICING_FAQS = [
    {
        question: "Does insurance cover endoscopic spine surgery?",
        answer: "Yes, most major health insurance providers (both corporate and retail policies) cover endoscopic spine surgery. We offer cashless facilities at Yashoda Hospital, Malakpet. Our team assists with the pre-authorization process to minimize your out-of-pocket expenses.",
        category: "Cost & Insurance"
    },
    {
        question: "Are there any hidden costs involved?",
        answer: "No. Our estimates are comprehensive and transparent. They typically include the surgeon's fee, anesthesia, operation theater charges, standard medications during the stay, and room rent for the specified duration (usually 1-2 days). We clearly outline what is included before admission.",
        category: "Cost & Insurance"
    },
    {
        question: "Why is Dr. Sayuj's endoscopic surgery cost competitive?",
        answer: "Full endoscopic spine surgery utilizes highly specialized equipment but drastically reduces the length of hospital stay (often same-day discharge or 1 day), minimizes post-operative medication needs, and lowers infection risks. This efficiency often makes the overall cost highly competitive compared to prolonged stays required for traditional open surgeries.",
        category: "Cost & Insurance"
    },
    {
        question: "Can I pay via EMI or financing options?",
        answer: "Yes, Yashoda Hospital offers various patient financing and EMI options through partnered financial institutions. Our billing coordinators can guide you through the available zero-interest or low-interest financing schemes during your consultation.",
        category: "Cost & Insurance"
    }
];

export default function CostOfSpineSurgeryPage() {
    return (
        <div className="bg-slate-50 min-h-screen pb-16">
            <FAQPageSchema faqs={PRICING_FAQS} pageUrl="/cost-of-spine-surgery-hyderabad" />
            <MedicalWebPageSchema
                pageType="service"
                pageSlug="/cost-of-spine-surgery-hyderabad"
                title="Cost of Endoscopic Spine Surgery in Hyderabad | Dr. Sayuj Krishnan"
                description="Transparent pricing for minimally invasive and full endoscopic spine surgery in Hyderabad."
                serviceOrCondition="Cost of Spine Surgery"
                breadcrumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Cost of Spine Surgery in Hyderabad', path: '/cost-of-spine-surgery-hyderabad' }
                ]}
                medicalSpecialty={["Spine Surgery", "Endoscopic Surgery"]}
                audience="Patients researching the cost of spine surgery in Hyderabad"
            />

            {/* Hero Section */}
            <header className="bg-blue-900 text-white pt-24 pb-16 px-4">
                <div className="container mx-auto max-w-5xl text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Cost of Endoscopic Spine Surgery in Hyderabad
                    </h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                        Transparent pricing, faster recovery, and world-class care by German-Trained Neurosurgeon Dr. Sayuj Krishnan at Yashoda Hospital, Malakpet.
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 -mt-8">
                <div className="max-w-5xl mx-auto">
                    {/* Introduction Card */}
                    <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border-t-4 border-blue-500">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Pricing Transparency Matters</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Navigating healthcare costs can be overwhelming. We believe patients deserve absolute clarity regarding the financial aspects of their neurosurgical care. Unlike traditional open surgeries that often involve unpredictable prolonged hospital stays and hidden costs, <strong>Full Endoscopic Spine Surgery</strong> offers a predictable, streamlined recovery pathway.
                        </p>
                        <p className="text-gray-700 leading-relaxed text-sm bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <strong>Note:</strong> The costs mentioned below are estimates for self-pay patients and vary based on room category, specific implants used (if any), and individual patient medical profiles. Cashless insurance approvals reduce out-of-pocket expenses for covered policies.
                        </p>
                    </div>

                    {/* Comparison Table Section */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Endoscopic Surgery vs. Traditional Costs in Hyderabad</h2>
                        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-blue-900 text-white">
                                        <th className="p-4 border-b border-blue-800 font-semibold w-1/4">Procedure Type</th>
                                        <th className="p-4 border-b border-blue-800 font-semibold w-1/4">Hyderabad Market Average (INR)</th>
                                        <th className="p-4 border-b border-blue-800 font-semibold bg-blue-800 w-1/4">Dr. Sayuj Estimate (INR)</th>
                                        <th className="p-4 border-b border-blue-800 font-semibold w-1/4">Dr. Sayuj Recovery Milestone</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="hover:bg-blue-50 transition-colors">
                                        <td className="p-4 border-b border-gray-200 font-medium text-gray-800">Endoscopic Lumbar Discectomy</td>
                                        <td className="p-4 border-b border-gray-200 text-gray-600">1,50,000 – 3,50,000</td>
                                        <td className="p-4 border-b border-gray-200 font-bold text-blue-700 bg-blue-50/50">95,000 – 1,35,000</td>
                                        <td className="p-4 border-b border-gray-200 text-gray-700">Walk in 2 hrs; Discharge in 24 hrs</td>
                                    </tr>
                                    <tr className="hover:bg-blue-50 transition-colors">
                                        <td className="p-4 border-b border-gray-200 font-medium text-gray-800">Endoscopic Cervical Surgery</td>
                                        <td className="p-4 border-b border-gray-200 text-gray-600">3,00,000 – 5,00,000</td>
                                        <td className="p-4 border-b border-gray-200 font-bold text-blue-700 bg-blue-50/50">1,20,000 – 1,70,000</td>
                                        <td className="p-4 border-b border-gray-200 text-gray-700">Resume light work in 2-3 weeks</td>
                                    </tr>
                                    <tr className="hover:bg-blue-50 transition-colors">
                                        <td className="p-4 border-b border-gray-200 font-medium text-gray-800">MIS TLIF (Spinal Fusion)</td>
                                        <td className="p-4 border-b border-gray-200 text-gray-600">2,50,000 – 4,00,000</td>
                                        <td className="p-4 border-b border-gray-200 font-bold text-blue-700 bg-blue-50/50">2,50,000 – 3,50,000</td>
                                        <td className="p-4 border-b border-gray-200 text-gray-700">Mobilization Day 1; Discharge Day 2-3</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Value Proposition */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
                            <div className="text-3xl mb-4">🏥</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Shorter Hospital Stay</h3>
                            <p className="text-gray-600">
                                Because full endoscopic surgery causes minimal muscle disruption, post-operative pain is significantly lower. This enables discharge within 24 hours for most discectomies, saving patients substantial room and nursing charges compared to the 4-6 day stay required for open surgeries.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
                            <div className="text-3xl mb-4">🛡️</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Cashless Insurance Support</h3>
                            <p className="text-gray-600">
                                We are empanelled with all major TPA and corporate insurance networks at Yashoda Hospital. Our dedicated insurance desk handles pre-authorizations smoothly, ensuring your focus remains entirely on recovery rather than administrative paperwork.
                            </p>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Frequently Asked Questions About Costs</h2>
                        <div className="space-y-6">
                            {PRICING_FAQS.map((faq, index) => (
                                <div key={index}>
                                    <h3 className="text-lg font-semibold text-blue-900 mb-2">{faq.question}</h3>
                                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-blue-600 rounded-2xl p-10 text-center text-white shadow-xl">
                        <h2 className="text-3xl font-bold mb-4">Get a Personalized Estimate</h2>
                        <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                            Every spine is unique. Bring in your MRI scans for a comprehensive clinical pathway and a transparent financial estimate tailored to your exact condition.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/appointments" className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-colors">
                                Book a Consultation
                            </Link>
                            <a href="https://wa.me/919778280044?text=Hello,%20I%20would%20like%20to%20inquire%20about%20the%20cost%20of%20spine%20surgery" target="_blank" rel="noopener noreferrer" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-full transition-colors">
                                WhatsApp for Second Opinion
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
