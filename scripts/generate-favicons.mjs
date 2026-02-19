import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '../public');
const sourceFile = path.join(publicDir, 'favicon.png');

async function generateFavicons() {
  if (!fs.existsSync(sourceFile)) {
    console.error('Source file not found:', sourceFile);
    process.exit(1);
  }

  const sizes = [48, 192, 512];

  for (const size of sizes) {
    const outFile = path.join(publicDir, `favicon-${size}x${size}.png`);
    if (fs.existsSync(outFile)) {
      console.log(`Skipping existing file: ${outFile}`);
      continue;
    }

    try {
      await sharp(sourceFile)
        .resize(size, size)
        .toFile(outFile);
      console.log(`Generated: ${outFile}`);
    } catch (err) {
      console.error(`Error generating ${outFile}:`, err);
    }
  }
}

generateFavicons();
