import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');
const fs = require('fs');

const INPUT_FILE = 'input.pdf';
const MAX_CHARS = 120000;

async function main() {
  try {
    if (!fs.existsSync(INPUT_FILE)) {
      console.error('Input file not found');
      process.exit(1);
    }

    const dataBuffer = fs.readFileSync(INPUT_FILE);

    const data = await pdf(dataBuffer);

    const text = data.text || '';
    const numpages = data.numpages || 0;

    const sanitized = text.replace(/[\\x00-\\x08\\x0B-\\x1F\\x7F]/g, '');

    const truncated = sanitized.length > MAX_CHARS;
    const finalText = sanitized.slice(0, MAX_CHARS);

    console.log(JSON.stringify({
      text: finalText,
      numpages,
      truncated
    }));

  } catch (error) {
    console.error('Extraction failed:', error);
    process.exit(1);
  }
}

main();
