import React from 'react';
import Link from 'next/link';

interface Blog {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
}

interface RelatedMedicalInsightsProps {
  blogs: Blog[];
}

export default function RelatedMedicalInsights({ blogs }: RelatedMedicalInsightsProps) {
  if (!blogs || blogs.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Related Medical Insights</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blog/${blog.slug}`}
            className="group block p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
          >
            <div className="mb-3">
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                Medical Guide
              </span>
              <span className="text-xs text-gray-500 ml-2">{blog.date}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
              {blog.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-3">
              {blog.excerpt}
            </p>
            <span className="inline-block mt-4 text-blue-600 text-sm font-medium group-hover:underline">
              Read Article →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
