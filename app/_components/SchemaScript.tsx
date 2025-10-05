import React from 'react';

interface SchemaScriptProps {
  data: any;
  id?: string;
}

export default function SchemaScript({ data, id }: SchemaScriptProps) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 0)
      }}
    />
  );
}
