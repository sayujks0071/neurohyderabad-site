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
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Related Content</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2 text-blue-700">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <Link href={item.href} className="text-blue-600 hover:underline font-medium">
                Learn More &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

