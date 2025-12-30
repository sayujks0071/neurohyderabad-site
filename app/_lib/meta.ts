import { SITE_URL } from '../../src/lib/seo';

export function clamp(s: string, n: number) {
  return s.length <= n ? s : s.slice(0, n - 1).trim() + '…';
}

export function makeMetadata(args: { title: string; description: string; canonicalPath: string }) {
  const title = clamp(args.title, 60);
  const description = clamp(args.description, 155);
  const canonicalUrl = args.canonicalPath.startsWith('http') ? args.canonicalPath : `${SITE_URL}${args.canonicalPath}`;
  
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
  };
}
