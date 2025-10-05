export function clamp(s: string, n: number) {
  return s.length <= n ? s : s.slice(0, n - 1).trim() + '…';
}

export function makeMetadata(args: { title: string; description: string; canonicalPath: string }) {
  const title = clamp(args.title, 60);
  const description = clamp(args.description, 155);
  return {
    title,
    description,
    alternates: {
      canonical: args.canonicalPath,
      languages: {
        'x-default': args.canonicalPath,
        'en-IN': args.canonicalPath,
      },
    },
  };
}
