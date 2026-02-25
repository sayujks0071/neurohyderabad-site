import { serializeJsonLd } from '@/src/lib/seo/serialize';
interface JsonLdProps {
  data: object;
  id?: string;
}

export default function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
