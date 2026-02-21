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
        <section className="relative bg-[#0B0B0D] py-24 min-h-screen text-white">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="mb-20 max-w-2xl">
                    <h3 className="text-3xl md:text-4xl font-light mb-4 border-l-4 border-red-600 pl-6">
                        Featured Procedures
                    </h3>
                    <p className="text-xl text-gray-400 pl-7">
                        Advanced surgical care for complex neurological conditions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {procedures.map((proc) => (
                        <Link href={proc.link} key={proc.id} className="group block">
                            <article className="relative border-t border-white/10 pt-6 cursor-pointer overflow-hidden flex flex-col h-[600px]">
                                <div className="relative flex-grow bg-gray-900 mb-6 overflow-hidden">
                                    <Image
                                        src={proc.image}
                                        alt={proc.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                    {/* Fallback for missing images */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-600 -z-10">
                                        <span>Image Placeholder</span>
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <h4 className="text-2xl font-medium mb-2 group-hover:text-red-500 transition-colors">
                                        {proc.title}
                                    </h4>
                                    <p className="font-serif italic text-gray-500">
                                        {proc.subtitle}
                                    </p>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
