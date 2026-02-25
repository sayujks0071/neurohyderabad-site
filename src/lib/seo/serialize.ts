export function serializeJsonLd(...args: Parameters<typeof JSON.stringify>): string {
  return JSON.stringify(...args).replace(/</g, '\\u003c');
}
