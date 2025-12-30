/**
 * Blog Post Content Model
 * 
 * Canonical schema for all blog posts on drsayuj.info
 * Ensures consistency, SEO optimization, and medical accuracy
 */

export type BlogCategory = 
  | 'spine' 
  | 'brain' 
  | 'epilepsy' 
  | 'general' 
  | 'recovery' 
  | 'cost-guide' 
  | 'patient-education'
  | 'technology'
  | 'research';

export type CTAType = 
  | 'book-consult' 
  | 'ai-assistant' 
  | 'whatsapp' 
  | 'call'
  | 'learn-more';

export type SchemaType = 
  | 'Article' 
  | 'MedicalWebPage' 
  | 'BlogPosting';

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  // Core identification
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string; // Short summary for listings (150-160 chars)
  description: string; // Meta description (155 chars max)
  
  // Categorization
  category: BlogCategory;
  tags: string[];
  primaryKeyword: string;
  secondaryKeywords?: string[];
  
  // Visual assets
  heroImage?: string; // Path to hero image
  ogImage?: string; // Custom OG image (defaults to generated)
  
  // Dates & Review
  publishedAt: string; // ISO date string
  scheduledAt?: string; // ISO date string - for future publishing
  updatedAt?: string; // ISO date string
  lastReviewedAt?: string; // ISO date string
  lastReviewedBy?: string; // Default: "Dr. Sayuj Krishnan"
  
  // Content metadata
  readingTimeMinutes?: number; // Auto-calculated if not provided
  featured?: boolean; // Show on homepage/featured section
  
  // Localization & Targeting
  targetLocations?: string[]; // e.g. ['Hyderabad', 'Malakpet', 'Dilsukhnagar']
  
  // SEO & Schema
  schemaType?: SchemaType; // Default: 'BlogPosting'
  faq?: BlogFAQ[]; // For FAQPage schema
  
  // Internal linking
  relatedConditions?: string[]; // Slugs from /conditions/[slug]
  relatedTreatments?: string[]; // Slugs from /services/[slug]
  
  // Call-to-action
  ctaType?: CTAType; // Default: 'book-consult'
  ctaOverrideText?: string; // Custom CTA text
  
  // E-E-A-T
  sources?: Array<{
    label: string;
    href: string;
  }>;
  
  // Content (in MDX body, not frontmatter)
  // The MDX content follows the frontmatter
}

/**
 * Default values for BlogPost fields
 */
export const BLOG_DEFAULTS = {
  lastReviewedBy: 'Dr. Sayuj Krishnan',
  schemaType: 'BlogPosting' as SchemaType,
  ctaType: 'book-consult' as CTAType,
  category: 'general' as BlogCategory,
} as const;

/**
 * Validation helpers
 */
export function validateBlogPost(post: Partial<BlogPost>): string[] {
  const errors: string[] = [];
  
  if (!post.slug) errors.push('slug is required');
  if (!post.title) errors.push('title is required');
  if (!post.excerpt) errors.push('excerpt is required');
  if (!post.description) errors.push('description is required');
  if (!post.category) errors.push('category is required');
  if (!post.primaryKeyword) errors.push('primaryKeyword is required');
  if (!post.publishedAt) errors.push('publishedAt is required');
  
  if (post.excerpt && post.excerpt.length > 200) {
    errors.push('excerpt should be 150-160 characters for optimal SEO');
  }
  
  if (post.description && post.description.length > 160) {
    errors.push('description should be 155 characters or less for meta tags');
  }
  
  return errors;
}

