import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const projectRoot = process.cwd();
const assetsDir = path.join(projectRoot, 'docs/branding/dr-sayuj/assets');
const typeData = JSON.parse(fs.readFileSync(path.join(assetsDir, 'type-outlines.json'), 'utf8'));
const wordmarkPath = typeData.wordmark.d;
const descriptorPath = typeData.descriptor.d;

const palette = {
  navy: '#0B2E4E',
  teal: '#0FA3B1',
  gray: '#6A7A8C',
  white: '#FFFFFF',
  slate: '#102b46',
};

const ogSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0B2E4E" />
      <stop offset="100%" stop-color="#0F5970" />
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0FA3B1" />
      <stop offset="100%" stop-color="#8FE3EB" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" />
  <rect x="48" y="48" width="1104" height="534" rx="36" fill="${palette.white}" opacity="0.12" />
  <rect x="72" y="86" width="1056" height="458" rx="28" fill="${palette.white}" opacity="0.08" />
  <g transform="translate(160 140)">
    <rect x="0" y="0" width="320" height="320" rx="72" fill="${palette.navy}" />
    <g transform="translate(60 44)">
      <path d="M120 30 C88 30 88 82 120 104 C152 126 152 178 120 198" stroke="${palette.white}" stroke-width="12" stroke-linecap="round" fill="none" />
      <path d="M168 30 C200 30 200 82 168 104 C136 126 136 178 168 198" stroke="${palette.teal}" stroke-width="12" stroke-linecap="round" fill="none" />
      <path d="M124 116 H164" stroke="${palette.white}" stroke-width="6" stroke-linecap="round" />
    </g>
  </g>
  <g transform="translate(520 200) scale(0.9)">
    <path d="${wordmarkPath}" fill="${palette.navy}" />
  </g>
  <g transform="translate(520 320) scale(0.7)">
    <path d="${descriptorPath}" fill="${palette.gray}" />
  </g>
  <g transform="translate(520 430)">
    <rect x="0" y="0" width="360" height="64" rx="32" fill="url(#accent)" />
    <text x="32" y="42" font-family="'Inter', 'Helvetica Neue', Arial" font-size="32" font-weight="600" fill="${palette.white}">
      Precision care for brain &amp; spine
    </text>
  </g>
  <text x="520" y="390" font-family="'Inter', 'Helvetica Neue', Arial" font-size="30" fill="${palette.navy}" opacity="0.78">
    Consultant Neurosurgeon · Hyderabad
  </text>
</svg>`;

(async () => {
  const buffer = Buffer.from(ogSvg);
  await sharp(buffer, { density: 300 })
    .resize(1200, 630)
    .jpeg({ quality: 88 })
    .toFile(path.join(projectRoot, 'public/images/og-default.jpg'));
  console.log('Generated updated default OG image.');
})();
