import type { Metadata } from 'next';
import { SITE_URL } from '../../src/lib/seo';

const SITE_NAME = 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.jpg`;
const DEFAULT_KEYWORDS = [
  'neurosurgeon hyderabad',
  'brain surgeon hyderabad',
  'spine specialist hyderabad',
  'endoscopic spine surgery hyderabad',
  'minimally invasive spine surgery',
  'brain tumor surgery hyderabad',
  'dr sayuj krishnan',
  'yashoda hospital malakpet',
  'best neurosurgeon hyderabad',
  'spine surgery hyderabad'
];

export function clamp(s: string, n: number) {
  return s.length <= n ? s : s.slice(0, n - 1).trim() + '…';
}

type MakeMetadataArgs = {
  title: string;
  description: string;
  canonicalPath: string;
  image?: string;
  keywords?: string[];
  type?: 'website' | 'article' | 'profile';
  locale?: string;
};

function normalizeKeywords(input?: string[]) {
  const merged = [...DEFAULT_KEYWORDS, ...(input || [])];
  const seen = new Set<string>();
  return merged.filter((keyword) => {
    const normalized = keyword.trim().toLowerCase();
    if (!normalized || seen.has(normalized)) {
      return false;
    }
    seen.add(normalized);
    return true;
  });
}

export function makeMetadata(args: MakeMetadataArgs): Metadata {
  const title = clamp(args.title, 60);
  const description = clamp(args.description, 155);
  const canonicalUrl = args.canonicalPath.startsWith('http') ? args.canonicalPath : `${SITE_URL}${args.canonicalPath}`;
  const imageUrl = args.image || DEFAULT_OG_IMAGE;
  const isBlogPost = args.canonicalPath.startsWith('/blog/') && args.canonicalPath !== '/blog';
  const type = args.type || (isBlogPost ? 'article' : 'website');
  const locale = args.locale || 'en_IN';

  return {
    title,
    description,
    keywords: normalizeKeywords(args.keywords),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': canonicalUrl,
        'en-IN': canonicalUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/jpeg',
        },
      ],
      locale,
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      site: '@drsayuj',
      creator: '@drsayuj',
    },
  };
}
