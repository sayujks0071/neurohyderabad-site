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
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">{title}</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Procedures */}
          {procedures.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Related Procedures</h3>
              <div className="space-y-4">
                {procedures.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-medium text-blue-600 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Conditions */}
          {conditions.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Related Conditions</h3>
              <div className="space-y-4">
                {conditions.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-medium text-blue-600 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
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
