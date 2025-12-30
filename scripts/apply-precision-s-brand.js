import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const projectRoot = process.cwd();
const brandRoot = path.join(projectRoot, 'docs/branding/dr-sayuj/exports');
const publicDir = path.join(projectRoot, 'public');
const publicImagesDir = path.join(publicDir, 'images');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

ensureDir(publicImagesDir);

const logoSourceSvgPath = path.join(brandRoot, 'svg', 'primary-horizontal-full-color.svg');
const logoSvgContent = fs.readFileSync(logoSourceSvgPath, 'utf8');
const logoBuffer = Buffer.from(logoSvgContent);
const sharpSvgOptions = { density: 600 };

fs.writeFileSync(path.join(publicImagesDir, 'logo.svg'), logoSvgContent);

async function generateLogoRasters() {
  await sharp(logoBuffer, sharpSvgOptions)
    .resize({ width: 1600 })
    .png({ compressionLevel: 8, adaptiveFiltering: true })
    .toFile(path.join(publicImagesDir, 'logo.png'));

  await sharp(logoBuffer, sharpSvgOptions)
    .resize({ width: 1600 })
    .webp({ quality: 92 })
    .toFile(path.join(publicImagesDir, 'logo.webp'));

  await sharp(logoBuffer, sharpSvgOptions)
    .resize({ width: 1600 })
    .avif({ quality: 80 })
    .toFile(path.join(publicImagesDir, 'logo.avif'));

  await sharp(logoBuffer, sharpSvgOptions)
    .resize({ width: 960 })
    .png({ compressionLevel: 8, adaptiveFiltering: true })
    .toFile(path.join(publicImagesDir, 'logo-optimized.png'));
}

const faviconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="44" fill="#0B2E4E" />
  <path d="M86 24 C46 24 46 90 86 112 C126 134 126 198 86 198" stroke="#FFFFFF" stroke-width="20" stroke-linecap="round" fill="none" />
  <path d="M114 24 C154 24 154 90 114 112 C74 134 74 198 114 198" stroke="#FFFFFF" stroke-width="20" stroke-linecap="round" fill="none" />
  <line x1="86" y1="112" x2="114" y2="112" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" />
</svg>`;

const faviconBuffer = Buffer.from(faviconSvg);

const faviconTargets = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'favicon-64x64.png', size: 64 },
  { name: 'favicon-128x128.png', size: 128 },
  { name: 'favicon-192x192.png', size: 192 },
  { name: 'favicon-256x256.png', size: 256 },
  { name: 'favicon-512x512.png', size: 512 },
];

async function generateFavicons() {
  for (const target of faviconTargets) {
    await sharp(faviconBuffer, { density: 600 })
      .resize(target.size, target.size)
      .png({ compressionLevel: 9 })
      .toFile(path.join(publicDir, target.name));
  }

  await sharp(faviconBuffer, { density: 600 })
    .resize(180, 180)
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  await sharp(faviconBuffer, { density: 600 })
    .resize(512, 512)
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'favicon.png'));

  // Generate app directory icons
  const appDir = path.join(projectRoot, 'app');
  const iconOutputs = [
    { file: path.join(appDir, 'icon.png'), size: 512 },
    { file: path.join(appDir, 'icon.svg'), size: null },
  ];

  await sharp(faviconBuffer, { density: 600 })
    .resize(512, 512)
    .png({ compressionLevel: 9 })
    .toFile(iconOutputs[0].file);

  fs.writeFileSync(
    iconOutputs[1].file,
    `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">\n  <rect width="200" height="200" rx="44" fill="#0B2E4E" />\n  <path d="M86 24 C46 24 46 90 86 112 C126 134 126 198 86 198" stroke="#FFFFFF" stroke-width="20" stroke-linecap="round" fill="none" />\n  <path d="M114 24 C154 24 154 90 114 112 C74 134 74 198 114 198" stroke="#FFFFFF" stroke-width="20" stroke-linecap="round" fill="none" />\n  <line x1="86" y1="112" x2="114" y2="112" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" />\n</svg>`
  );

  const icoPngs = [
    path.join(publicDir, 'favicon-16x16.png'),
    path.join(publicDir, 'favicon-32x32.png'),
    path.join(publicDir, 'favicon-48x48.png'),
  ];

  const ico = await pngToIco(icoPngs.map((p) => fs.readFileSync(p)));
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), ico);
}

(async () => {
  await generateLogoRasters();
  await generateFavicons();
  console.log('Precision S brand assets applied to public directory.');
})();
