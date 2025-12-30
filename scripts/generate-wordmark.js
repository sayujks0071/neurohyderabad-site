import fs from 'fs';
import path from 'path';
import opentype from 'opentype.js';

const root = path.resolve(process.cwd(), 'docs/branding/dr-sayuj');
const fontsDir = path.join(root, 'fonts');
const outDir = path.join(root, 'assets');
fs.mkdirSync(outDir, { recursive: true });

const montserratPath = path.join(fontsDir, 'Montserrat-SemiBold.ttf');
const interPath = path.join(fontsDir, 'Inter-Regular.ttf');

const montserrat = opentype.loadSync(montserratPath);
const inter = opentype.loadSync(interPath);

function makePathData(font, text, fontSize, letterSpacing = 0) {
  let x = 0;
  const y = fontSize; // baseline
  const pathCommands = [];

  for (const char of text) {
    const glyph = font.charToGlyph(char);
    const glyphPath = glyph.getPath(x, y, fontSize);
    pathCommands.push(...glyphPath.commands);
    const advance = glyph.advanceWidth * (fontSize / font.unitsPerEm);
    x += advance + letterSpacing;
  }

  const d = pathCommands.map((cmd) => {
    switch (cmd.type) {
      case 'M':
        return `M${cmd.x.toFixed(2)} ${cmd.y.toFixed(2)}`;
      case 'L':
        return `L${cmd.x.toFixed(2)} ${cmd.y.toFixed(2)}`;
      case 'C':
        return `C${cmd.x1.toFixed(2)} ${cmd.y1.toFixed(2)} ${cmd.x2.toFixed(2)} ${cmd.y2.toFixed(2)} ${cmd.x.toFixed(2)} ${cmd.y.toFixed(2)}`;
      case 'Q':
        return `Q${cmd.x1.toFixed(2)} ${cmd.y1.toFixed(2)} ${cmd.x.toFixed(2)} ${cmd.y.toFixed(2)}`;
      case 'Z':
        return 'Z';
      default:
        return '';
    }
  }).join(' ');

  return {
    d,
    width: x,
    height: fontSize,
  };
}

const wordmarkText = 'Dr Sayuj';
const descriptorText = 'Neurosurgeon • Endoscopic Spine Surgery';

const wordmark = makePathData(montserrat, wordmarkText, 72, 0);
const descriptor = makePathData(inter, descriptorText, 30, 0);

const payload = {
  metadata: {
    generated: new Date().toISOString(),
    fonts: {
      wordmark: {
        path: path.relative(root, montserratPath),
        ascender: montserrat.ascender,
        descender: montserrat.descender,
        unitsPerEm: montserrat.unitsPerEm,
      },
      descriptor: {
        path: path.relative(root, interPath),
        ascender: inter.ascender,
        descender: inter.descender,
        unitsPerEm: inter.unitsPerEm,
      },
    },
  },
  wordmark,
  descriptor,
};

fs.writeFileSync(path.join(outDir, 'type-outlines.json'), JSON.stringify(payload, null, 2));

const wordmarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${wordmark.width.toFixed(2)} ${wordmark.height.toFixed(2)}" fill="none">
  <path d="${wordmark.d}" fill="currentColor" />
</svg>`;

const descriptorSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${descriptor.width.toFixed(2)} ${descriptor.height.toFixed(2)}" fill="none">
  <path d="${descriptor.d}" fill="currentColor" />
</svg>`;

fs.writeFileSync(path.join(outDir, 'wordmark.svg'), wordmarkSvg);
fs.writeFileSync(path.join(outDir, 'descriptor.svg'), descriptorSvg);

console.log('Generated type outlines for wordmark and descriptor.');
