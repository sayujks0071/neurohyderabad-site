import { SITE_URL } from "../../src/lib/seo";
import { getPostBySlug, getPosts } from "../../../src/lib/wordpress";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

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

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  // Extract title from content if WordPress title is empty
  const postTitle = post.title.rendered || extractTitleFromContent(post.content.rendered, `Post ${post.id}`);

  const featuredImage = post._embedded && post._embedded['wp:featuredmedia'] 
    ? post._embedded['wp:featuredmedia'][0].source_url 
    : null;

  return {
    title: `${postTitle} | Dr Sayuj Krishnan Blog`,
    description: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160),
    openGraph: {
      title: postTitle,
      description: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160),
      images: featuredImage ? [
        {
          url: featuredImage,
          width: 1200,
          height: 630,
          alt: postTitle,
        },
      ] : [
        {
          url: `${SITE_URL}/api/og?title=${encodeURIComponent(postTitle)}&subtitle=${encodeURIComponent("Dr Sayuj Krishnan Blog")}`,
          width: 1200,
          height: 630,
          alt: postTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: postTitle,
      description: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160),
      images: featuredImage ? [featuredImage] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getPosts(100); // Get all posts for static generation
  
  if (!posts) return [];
  
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  // Extract title from content if WordPress title is empty
  const postTitle = post.title.rendered || extractTitleFromContent(post.content.rendered, `Post ${post.id}`);

  const featuredImage = post._embedded && post._embedded['wp:featuredmedia'] 
    ? post._embedded['wp:featuredmedia'][0].source_url 
    : null;

  const author = post._embedded && post._embedded.author 
    ? post._embedded.author[0] 
    : null;

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/blog" className="text-blue-600 hover:text-blue-800">Blog</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">{postTitle}</span>
        </nav>

        {/* Featured Image */}
        {featuredImage && (
          <div className="aspect-video relative mb-8 rounded-lg overflow-hidden">
            <Image
              src={featuredImage}
              alt={postTitle}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            {postTitle}
          </h1>
          
          <div className="flex items-center text-gray-600 mb-6">
            {author && (
              <div className="flex items-center mr-6">
                <span className="font-medium">By {author.name}</span>
              </div>
            )}
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <div 
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </article>

        {/* Categories and Tags */}
        {(post.categories && post.categories.length > 0) || (post.tags && post.tags.length > 0) ? (
          <div className="mt-8 pt-8 border-t border-gray-200">
            {post.categories && post.categories.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Categories:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((categoryId: number) => {
                    const category = post._embedded && post._embedded['wp:term'] 
                      ? post._embedded['wp:term'].find((term: any) => 
                          term.taxonomy === 'category' && term.id === categoryId
                        )
                      : null;
                    
                    return category ? (
                      <span 
                        key={categoryId}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {category.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            )}
            
            {post.tags && post.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tagId: number) => {
                    const tag = post._embedded && post._embedded['wp:term'] 
                      ? post._embedded['wp:term'].find((term: any) => 
                          term.taxonomy === 'post_tag' && term.id === tagId
                        )
                      : null;
                    
                    return tag ? (
                      <span 
                        key={tagId}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        #{tag.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        ) : null}

        {/* Call to Action */}
        <div className="mt-12 p-8 bg-blue-50 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Need Expert Neurosurgical Care?</h2>
          <p className="text-gray-600 mb-6">
            Contact Dr Sayuj Krishnan for a consultation and personalized treatment plan.
          </p>
          <Link 
            href="/appointments"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors text-lg"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </main>
  );
}
