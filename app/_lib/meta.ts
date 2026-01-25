import { SITE_URL } from '../../src/lib/seo';

const DEFAULT_SITE_NAME = 'Dr. Sayuj Krishnan - Neurosurgeon Hyderabad';
const DEFAULT_LOCALE = 'en_IN';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.jpg`;
const DEFAULT_OG_IMAGE_ALT =
  'Dr Sayuj Krishnan - Neurosurgeon and Endoscopic Spine Surgeon in Hyderabad';

export function clamp(s: string, n: number) {
  return s.length <= n ? s : s.slice(0, n - 1).trim() + '…';
}

type MakeMetadataArgs = {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogImageType?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogType?: string;
  locale?: string;
  siteName?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  section?: string;
};

function resolveAbsoluteUrl(url: string) {
  return url.startsWith('http') ? url : `${SITE_URL}${url}`;
}

export function makeMetadata(args: MakeMetadataArgs) {
  const title = clamp(args.title, 60);
  const description = clamp(args.description, 155);
  const canonicalUrl = resolveAbsoluteUrl(args.canonicalPath);
  const ogImageUrl = resolveAbsoluteUrl(args.ogImage ?? DEFAULT_OG_IMAGE);
  const ogImageAlt = args.ogImageAlt ?? (args.ogImage ? title : DEFAULT_OG_IMAGE_ALT);
  const ogType = args.ogType ?? 'website';
  const locale = args.locale ?? DEFAULT_LOCALE;
  const siteName = args.siteName ?? DEFAULT_SITE_NAME;
  const ogImageWidth = args.ogImageWidth ?? 1200;
  const ogImageHeight = args.ogImageHeight ?? 630;
  const ogImageType = args.ogImageType ?? 'image/jpeg';
  const openGraph = {
    title,
    description,
    url: canonicalUrl,
    siteName,
    locale,
    type: ogType,
    images: [
      {
        url: ogImageUrl,
        secureUrl: ogImageUrl,
        width: ogImageWidth,
        height: ogImageHeight,
        alt: ogImageAlt,
        type: ogImageType,
      },
    ],
    ...(args.publishedTime ? { publishedTime: args.publishedTime } : {}),
    ...(args.modifiedTime ? { modifiedTime: args.modifiedTime } : {}),
    ...(args.section ? { section: args.section } : {}),
    ...(args.tags ? { tags: args.tags } : {}),
    ...(args.authors ? { authors: args.authors } : {}),
  };
  
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': canonicalUrl,
        'en-IN': canonicalUrl,
      },
    },
    openGraph,
  };
}
