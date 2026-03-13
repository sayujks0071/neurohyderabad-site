import Link from "next/link";

interface RelatedContentItem {
  title: string;
  description: string;
  href: string;
  category: "procedure" | "condition" | "action";
}

interface RelatedContentProps {
  items: RelatedContentItem[];
}

export default function RelatedContent({ items }: RelatedContentProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Related Content</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div key={index} className="relative flex flex-col h-full bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-2 text-blue-700">{item.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{item.description}</p>
              <Link
                href={item.href}
                className="mt-auto inline-block text-center bg-white border border-slate-200 text-slate-600 font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                aria-label={`Learn more about ${item.title}`}
              >
                Learn More &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

