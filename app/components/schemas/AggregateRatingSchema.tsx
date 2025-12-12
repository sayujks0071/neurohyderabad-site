import { SITE_URL } from '../../../src/lib/seo';

interface AggregateRatingSchemaProps {
  ratingValue?: string;
  reviewCount?: string;
  bestRating?: string;
  worstRating?: string;
}

/**
 * AggregateRating Schema Component
 * 
 * Displays aggregate rating from Google Reviews, Practo, and other platforms.
 * Update ratingValue and reviewCount with actual review data.
 * 
 * Usage:
 * <AggregateRatingSchema 
 *   ratingValue="4.8" 
 *   reviewCount="150" 
 * />
 */
export default function AggregateRatingSchema({
  ratingValue = "4.8",
  reviewCount = "150",
  bestRating = "5",
  worstRating = "1",
}: AggregateRatingSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "ratingValue": ratingValue,
    "reviewCount": reviewCount,
    "bestRating": bestRating,
    "worstRating": worstRating,
    "itemReviewed": {
      "@type": "Physician",
      "name": "Dr. Sayuj Krishnan",
      "url": SITE_URL,
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

















