import { safeJsonLdStringify } from '@/src/lib/seo/jsonld';
export default function SchemaScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Keep JSON compact to avoid layout shifts
      dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(data) }}
    />
  );
}
