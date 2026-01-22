import Link from 'next/link';

interface RelatedContentProps {
  title?: string;
  items: Array<{
    title: string;
    description: string;
    href: string;
    category: 'procedure' | 'condition';
  }>;
}

export default function RelatedContent({ 
  title = "Related Procedures and Conditions",
  items 
}: RelatedContentProps) {
  const procedures = items.filter(item => item.category === 'procedure');
  const conditions = items.filter(item => item.category === 'condition');

  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">{title}</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Procedures */}
          {procedures.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-6 px-2">Related Procedures</h3>
              <div className="space-y-6">
                {procedures.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="group block relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                    aria-label={`Learn more about ${item.title}`}
                  >
                    <h4 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                    <span className="inline-flex items-center mt-4 text-blue-600 font-medium group-hover:text-blue-800 transition-colors">
                        Learn More
                        <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Conditions */}
          {conditions.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-6 px-2">Related Conditions</h3>
              <div className="space-y-6">
                {conditions.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="group block relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                    aria-label={`Learn more about ${item.title}`}
                  >
                    <h4 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                    <span className="inline-flex items-center mt-4 text-blue-600 font-medium group-hover:text-blue-800 transition-colors">
                        Learn More
                        <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
