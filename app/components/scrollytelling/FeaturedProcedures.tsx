import Image from 'next/image';
import Link from 'next/link';

interface Procedure {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    link: string;
}

const procedures: Procedure[] = [
    {
        id: 'endoscopic',
        title: 'Endoscopic Spine Surgery',
        subtitle: 'Minimally Invasive',
        image: '/images/procedures/endoscopic.jpg',
        link: '/services/minimally-invasive-spine-surgery'
    },
    {
        id: 'brain-tumor',
        title: 'Brain Tumor Surgery',
        subtitle: 'Advanced Techniques',
        image: '/images/procedures/brain-tumor.jpg',
        link: '/services/brain-tumor-surgery-hyderabad'
    },
    {
        id: 'cervical',
        title: 'Cervical Disc Replacement',
        subtitle: 'Motion Preservation',
        image: '/images/procedures/cervical.jpg',
        link: '/services/cervical-disc-replacement-hyderabad'
    },
    {
        id: 'fusion',
        title: 'Spinal Fusion',
        subtitle: 'Complex Reconstruction',
        image: '/images/procedures/fusion.jpg',
        link: '/services/spinal-fusion-surgery-hyderabad'
    }
];

export default function FeaturedProcedures() {
    return (
        <section className="relative bg-gradient-to-b from-slate-50 to-white py-24 min-h-screen text-slate-900">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="mb-20 max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 border-l-4 border-blue-600 pl-6 text-slate-900">
                        Featured Procedures
                    </h2>
                    <p className="text-xl text-slate-600 pl-7">
                        Advanced surgical care for complex neurological conditions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {procedures.map((proc) => (
                        <Link href={proc.link} key={proc.id} className="group block" aria-label={`Learn more about ${proc.title}`}>
                            <article className="relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-[600px] flex flex-col">
                                <div className="relative flex-grow bg-slate-100 rounded-xl mb-6 overflow-hidden">
                                    <Image
                                        src={proc.image}
                                        alt={proc.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                    {/* Fallback for missing images */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-400 -z-10">
                                        <span>Image Placeholder</span>
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {proc.title}
                                    </h3>
                                    <p className="text-slate-600 font-medium text-lg">
                                        {proc.subtitle}
                                    </p>
                                    <span className="inline-flex items-center text-blue-600 font-medium mt-4 group-hover:text-blue-800 transition-colors">
                                        Learn More
                                        <svg
                                            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
