import { SITE_URL } from "../../src/lib/seo";
import { getPosts } from "../../src/lib/wordpress";
import { getAllBlogPosts } from "../../src/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Blog | Dr Sayuj Krishnan - Neurosurgery Insights",
  description: "Latest insights, research, and updates in neurosurgery from Dr Sayuj Krishnan. Expert articles on brain and spine conditions, treatments, and innovations.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Dr Sayuj Krishnan - Neurosurgery Insights",
    description: "Latest insights, research, and updates in neurosurgery from Dr Sayuj Krishnan. Expert articles on brain and spine conditions, treatments, and innovations.",
    url: `${SITE_URL}/blog`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon Hyderabad',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Neurosurgery Blog")}&subtitle=${encodeURIComponent("Expert insights & research")}`,
        width: 1200,
        height: 630,
        alt: "Neurosurgery Blog — Dr Sayuj Krishnan",
        type: 'image/jpeg'
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Dr Sayuj Krishnan - Neurosurgery Insights',
    description: 'Latest insights, research, and updates in neurosurgery from Dr Sayuj Krishnan. Expert articles on brain and spine conditions, treatments, and innovations.',
    images: [`${SITE_URL}/images/og-default.jpg`],
    site: '@drsayuj',
    creator: '@drsayuj',
  },
};

// Helper function to extract title from content
function extractTitleFromContent(content: string, fallbackTitle: string): string {
  if (!content) return fallbackTitle;
  
  // Try to extract H1 tag content
  const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/i);
  if (h1Match && h1Match[1]) {
    return h1Match[1].replace(/<[^>]*>/g, '').trim();
  }
  
  // Try to extract title from SEO comment
  const seoMatch = content.match(/Title:\s*([^\n]+)/i);
  if (seoMatch && seoMatch[1]) {
    return seoMatch[1].trim();
  }
  
  return fallbackTitle;
}

export default async function BlogPage() {
  // Load blog posts from new content system
  let mdxPosts: any[] = [];
  try {
    const posts = await getAllBlogPosts();
    mdxPosts = posts.map(post => ({
      id: post.slug,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      date: post.publishedAt,
      featuredImage: post.heroImage || '/images/og-default.jpg',
      category: post.category,
      tags: post.tags,
      featured: post.featured,
    }));
  } catch (error) {
    console.error('Error loading MDX blog posts:', error);
  }

  // Static blog posts (legacy, can be combined with WordPress posts later)
  const staticPosts = [
    {
      id: 'endoscopic-discectomy-cost-hyderabad',
      title: 'Endoscopic Discectomy Cost in Hyderabad: Complete Pricing Guide',
      slug: 'endoscopic-discectomy-cost-hyderabad',
      excerpt: 'Complete guide to endoscopic discectomy costs in Hyderabad. Insurance coverage, factors affecting price, and payment options.',
      date: '2025-09-30',
      featuredImage: '/images/og-default.jpg'
    },
    {
      id: 'endoscopic-spine-surgery-cost-hyderabad',
      title: 'Endoscopic Spine Surgery Cost in Hyderabad: What Affects Your Final Bill',
      slug: 'endoscopic-spine-surgery-cost-hyderabad',
      excerpt: 'Transparent overview of endoscopic spine surgery costs in Hyderabad—what affects price, insurance, day-care eligibility, and recovery planning.',
      date: '2025-09-30',
      featuredImage: '/images/og-default.jpg'
    },
    {
      id: 'return-to-work-after-endoscopic-discectomy-hyderabad',
      title: 'Return to Work After Endoscopic Discectomy in Hyderabad: A Practical Guide',
      slug: 'return-to-work-after-endoscopic-discectomy-hyderabad',
      excerpt: 'Week‑by‑week recovery after endoscopic discectomy in Hyderabad. Desk vs manual timelines, red flags, and safe activity progressions.',
      date: '2025-10-01',
      featuredImage: '/images/og-default.jpg'
    },
    {
      id: 'endoscopic-vs-microdiscectomy-hyderabad',
      title: 'Endoscopic vs Microdiscectomy in Hyderabad: Which Approach Suits You?',
      slug: 'endoscopic-vs-microdiscectomy-hyderabad',
      excerpt: 'Compare endoscopic discectomy and microdiscectomy in Hyderabad: candidacy, incision size, hospital stay, recovery, risks, and costs.',
      date: '2025-10-01',
      featuredImage: '/images/og-default.jpg'
    },
    {
      id: 'day-care-endoscopic-spine-surgery-eligibility',
      title: 'Day-Care Eligibility for Endoscopic Spine Surgery in Hyderabad',
      slug: 'day-care-endoscopic-spine-surgery-eligibility',
      excerpt: 'Understanding day-care eligibility for endoscopic spine surgery in Hyderabad. Criteria, benefits, and what to expect.',
      date: '2025-10-01',
      featuredImage: '/images/og-default.jpg'
    },
    {
      id: 'mvd-vs-radiosurgery-trigeminal-neuralgia',
      title: 'MVD vs Radiosurgery vs Percutaneous for Trigeminal Neuralgia',
      slug: 'mvd-vs-radiosurgery-trigeminal-neuralgia',
      excerpt: 'Compare MVD, radiosurgery, and percutaneous procedures for trigeminal neuralgia treatment. Success rates, risks, and recovery.',
      date: '2025-10-01',
      featuredImage: '/images/og-default.jpg'
    }
  ];

  // Try to fetch posts from WordPress (fallback to static posts)
  let wordpressPosts = [];
  try {
    const ENDPOINT = process.env.WORDPRESS_API_URL;
    if (ENDPOINT) {
      const res = await fetch(ENDPOINT, { 
        next: { revalidate: 3600 },
        headers: {
          'Accept': 'application/json',
        }
      });
      if (res.ok) {
        wordpressPosts = await res.json();
      }
    }
  } catch (error) {
    console.log('WordPress posts not available, using static posts');
  }

  // Combine all posts: MDX (new system) first, then static, then WordPress
  const allPosts = [...mdxPosts, ...staticPosts, ...(wordpressPosts || [])];
  
  // Sort by date (newest first)
  allPosts.sort((a, b) => {
    const dateA = new Date(a.date || 0).getTime();
    const dateB = new Date(b.date || 0).getTime();
    return dateB - dateA;
  });

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Neurosurgery Blog</h1>
      <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
        Stay updated with the latest insights, research, and developments in neurosurgery. 
        Expert articles on brain and spine conditions, treatments, and innovations.
      </p>
      
      {allPosts && allPosts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {allPosts.map((post: any) => {
            const postTitle = post.title || post.title?.rendered || `Post ${post.id}`;
            const postExcerpt = post.excerpt || post.excerpt?.rendered || 'Read more about this topic...';
            const postDate = post.date || new Date().toISOString();
            const postSlug = post.slug || post.id;
            
            return (
              <article key={post.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                {post.featuredImage && (
                  <div className="aspect-video relative">
                    <Image
                      src={post.featuredImage}
                      alt={postTitle}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-3 text-blue-700 line-clamp-2">
                    <Link 
                      href={`/blog/${postSlug}`}
                      className="hover:text-blue-800 transition-colors"
                    >
                      {postTitle}
                    </Link>
                  </h2>
                  <div className="text-gray-600 mb-4 line-clamp-3">
                    {typeof postExcerpt === 'string' 
                      ? postExcerpt.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
                      : postExcerpt
                    }
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>
                      {new Date(postDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <Link 
                      href={`/blog/${postSlug}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                      aria-label={`Read more about ${postTitle}`}
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No blog posts found</h2>
          <p className="text-gray-600 mb-6">
            Blog posts will appear here once they are published in WordPress.
          </p>
          <Link 
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      )}
      
      <div className="text-center mt-12">
        <h2 className="text-2xl font-semibold mb-4">Stay Updated</h2>
        <p className="text-gray-600 mb-6">Get the latest neurosurgery insights delivered to your inbox</p>
        <Link 
          href="/contact"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors text-lg"
        >
          Contact Us
        </Link>
      </div>
    </main>
  );
}
