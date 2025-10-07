import Script from "next/script";

type JsonLdProps = {
  id: string;
  data: any;
};

/**
 * Injects a JSON-LD script tag safely. Pass an array of schema objects in `data`.
 */
export default function JsonLd({ id, data }: JsonLdProps) {
  if (!data) return null;

  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
