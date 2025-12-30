import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const root = path.resolve(process.cwd(), 'docs/branding/dr-sayuj');
const assetsDir = path.join(root, 'assets');
const exportsDir = path.join(root, 'exports');
const typeData = JSON.parse(fs.readFileSync(path.join(assetsDir, 'type-outlines.json'), 'utf8'));
const wordmarkPath = typeData.wordmark.d;
const descriptorPath = typeData.descriptor.d;

const palette = {
  navy: '#0B2E4E',
  teal: '#0FA3B1',
  gray: '#6A7A8C',
  black: '#000000',
  white: '#FFFFFF',
};

const outputSvgDir = path.join(exportsDir, 'svg');
const outputPdfDir = path.join(exportsDir, 'pdf');
const outputPngDir = path.join(exportsDir, 'png');
const outputFaviconDir = path.join(exportsDir, 'favicons');

[outputSvgDir, outputPdfDir, outputPngDir, outputFaviconDir].forEach((dir) => fs.mkdirSync(dir, { recursive: true }));

const symbol = (mode, color) => {
  if (mode === 'full') {
    return `      <path d="M120 30 C88 30 88 82 120 104 C152 126 152 178 120 198" stroke="${palette.navy}" stroke-width="12" stroke-linecap="round" fill="none" />
      <path d="M168 30 C200 30 200 82 168 104 C136 126 136 178 168 198" stroke="${palette.teal}" stroke-width="12" stroke-linecap="round" fill="none" />
      <path d="M124 116 H164" stroke="${palette.gray}" stroke-width="6" stroke-linecap="round" />`;
  }
  return `      <path d="M120 30 C88 30 88 82 120 104 C152 126 152 178 120 198" stroke="${color}" stroke-width="12" stroke-linecap="round" fill="none" />
      <path d="M168 30 C200 30 200 82 168 104 C136 126 136 178 168 198" stroke="${color}" stroke-width="12" stroke-linecap="round" fill="none" />
      <path d="M124 116 H164" stroke="${color}" stroke-width="6" stroke-linecap="round" />`;
};

const variants = [
  {
    id: 'primary-horizontal',
    viewBox: '0 0 1600 600',
    layout: (content) => `  <g transform="translate(200 108)">\n${content}\n  </g>\n  <g transform="translate(500 270) scale(1.25)">\n    <path d="${wordmarkPath}" fill="{WORDMARK_COLOR}" />\n  </g>\n  <g transform="translate(500 360) scale(1.05)">\n    <path d="${descriptorPath}" fill="{DESCRIPTOR_COLOR}" />\n  </g>`,
  },
  {
    id: 'stacked',
    viewBox: '0 0 960 960',
    layout: (content) => `  <g transform="translate(260 120)">\n${content}\n  </g>\n  <g transform="translate(180 520) scale(1.3)">\n    <path d="${wordmarkPath}" fill="{WORDMARK_COLOR}" />\n  </g>\n  <g transform="translate(60 640) scale(1.0)">\n    <path d="${descriptorPath}" fill="{DESCRIPTOR_COLOR}" />\n  </g>`,
  },
  {
    id: 'icon',
    viewBox: '0 0 400 400',
    layout: (content) => `  <g transform="translate(60 60)">\n${content}\n  </g>`,
  },
];

const colorways = [
  {
    id: 'full-color',
    mode: 'full',
    wordmarkColor: palette.navy,
    descriptorColor: palette.gray,
    background: 'none',
  },
  {
    id: 'navy',
    mode: 'mono',
    monoColor: palette.navy,
    wordmarkColor: palette.navy,
    descriptorColor: palette.navy,
    background: 'none',
  },
  {
    id: 'black',
    mode: 'mono',
    monoColor: palette.black,
    wordmarkColor: palette.black,
    descriptorColor: palette.black,
    background: 'none',
  },
  {
    id: 'white',
    mode: 'mono',
    monoColor: palette.white,
    wordmarkColor: palette.white,
    descriptorColor: palette.white,
    background: 'none',
  },
];

const pngSizes = [4096, 1024, 512, 256, 64];
const faviconSizes = [512, 192];

async function generate() {
  for (const variant of variants) {
    for (const colorway of colorways) {
      const symbolContent = symbol(colorway.mode, colorway.monoColor);
      const svgBody = variant.layout(symbolContent)
        .replace('{WORDMARK_COLOR}', colorway.wordmarkColor)
        .replace('{DESCRIPTOR_COLOR}', colorway.descriptorColor);
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${variant.viewBox}" fill="none">\n${svgBody}\n</svg>`;
      const fileBase = `${variant.id}-${colorway.id}`;
      const svgPath = path.join(outputSvgDir, `${fileBase}.svg`);
      fs.writeFileSync(svgPath, svg);

      const sharpInstance = sharp(Buffer.from(svg));
      await sharpInstance.clone().toFile(path.join(outputPdfDir, `${fileBase}.pdf`));

      for (const size of pngSizes) {
        await sharpInstance.clone().resize({ width: size }).png({ compressionLevel: 8 }).toFile(path.join(outputPngDir, `${fileBase}-${size}.png`));
      }

      if (variant.id === 'icon') {
        for (const size of faviconSizes) {
          await sharpInstance.clone().resize({ width: size, height: size, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png({ compressionLevel: 8 }).toFile(path.join(outputFaviconDir, `${fileBase}-${size}.png`));
        }
      }
    }
  }

  console.log('Brand kit assets generated.');
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
