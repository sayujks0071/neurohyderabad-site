import { safeJsonLdStringify } from '@/src/lib/seo/jsonld';
interface JsonLdProps {
  data: object;
  id?: string;
}

export default function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(data) }}
    />
  );
}
