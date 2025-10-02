export function parseJsonLd(raw: string): object[] {
  const lines = raw.split(/\n(?=\s*\{)/); // split on new object starts
  const blocks: object[] = [];
  for (const chunk of lines) {
    try { 
      const parsed = JSON.parse(chunk);
      if (parsed && typeof parsed === 'object') {
        blocks.push(parsed);
      }
    } catch {
      // Skip invalid JSON chunks
    }
  }
  return blocks;
}





