import React from 'react';
import { safeJsonLdStringify } from '@/src/lib/seo/jsonld';

interface SchemaScriptProps {
  data: any;
  id?: string;
}

export default function SchemaScript({ data, id }: SchemaScriptProps) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(data) }}
    />
  );
}
