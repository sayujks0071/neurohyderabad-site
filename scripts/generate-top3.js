import fs from 'fs';
import path from 'path';

const root = path.resolve(process.cwd(), 'docs/branding/dr-sayuj');
const topDir = path.join(root, 'top3');
const assetsDir = path.join(root, 'assets');

const typeData = JSON.parse(fs.readFileSync(path.join(assetsDir, 'type-outlines.json'), 'utf8'));
const wordmarkPath = typeData.wordmark.d;
const descriptorPath = typeData.descriptor.d;

const palette = {
  navy: '#0B2E4E',
  teal: '#0FA3B1',
  gray: '#6A7A8C',
  white: '#FFFFFF',
  sand: '#F5F7FA',
  slate: '#1C3A57',
};

const topConcepts = [
  {
    id: 'precision-s',
    name: 'Precision S Spine',
    summary: 'Dual-stroke spine monogram forming an S, highlighting minimally invasive precision with balanced curvature.',
    symbolFull: `      <path d="M120 30 C88 30 88 82 120 104 C152 126 152 178 120 198" stroke="${palette.navy}" stroke-width="12" stroke-linecap="round" fill="none" />\n      <path d="M168 30 C200 30 200 82 168 104 C136 126 136 178 168 198" stroke="${palette.teal}" stroke-width="12" stroke-linecap="round" fill="none" />\n      <path d="M124 116 H164" stroke="${palette.gray}" stroke-width="6" stroke-linecap="round" />`,
    symbolMono: (color) => `      <path d="M120 30 C88 30 88 82 120 104 C152 126 152 178 120 198" stroke="${color}" stroke-width="12" stroke-linecap="round" fill="none" />\n      <path d="M168 30 C200 30 200 82 168 104 C136 126 136 178 168 198" stroke="${color}" stroke-width="12" stroke-linecap="round" fill="none" />\n      <path d="M124 116 H164" stroke="${color}" stroke-width="6" stroke-linecap="round" />`,
  },
  {
    id: 'portal-arc',
    name: 'Portal Arc Access',
    summary: 'Endoscope arc embracing a vertebral disc, telegraphing minimally invasive access and guided precision.',
    symbolFull: `      <path d="M100 190 C96 110 170 60 230 100" stroke="${palette.navy}" stroke-width="12" stroke-linecap="round" fill="none" />\n      <path d="M230 100 C270 140 230 190 188 176" stroke="${palette.teal}" stroke-width="12" stroke-linecap="round" fill="none" />\n      <circle cx="230" cy="100" r="16" fill="${palette.gray}" />\n      <path d="M244 92 L278 78" stroke="${palette.navy}" stroke-width="6" stroke-linecap="round" />`,
    symbolMono: (color) => `      <path d="M100 190 C96 110 170 60 230 100" stroke="${color}" stroke-width="12" stroke-linecap="round" fill="none" />\n      <path d="M230 100 C270 140 230 190 188 176" stroke="${color}" stroke-width="12" stroke-linecap="round" fill="none" />\n      <circle cx="230" cy="100" r="16" fill="${color}" />\n      <path d="M244 92 L278 78" stroke="${color}" stroke-width="6" stroke-linecap="round" />`,
  },
  {
    id: 'axon-flow',
    name: 'Axon Flow Spine',
    summary: 'Interwoven neuron path mapping into a spinal curve, merging neurological expertise with spine care.',
    symbolFull: `      <path d="M120 190 C100 130 150 90 120 40" stroke="${palette.navy}" stroke-width="12" stroke-linecap="round" fill="none" />\n      <path d="M120 40 C170 70 160 130 212 170" stroke="${palette.teal}" stroke-width="12" stroke-linecap="round" fill="none" />\n      <circle cx="120" cy="40" r="10" fill="${palette.teal}" />\n      <circle cx="156" cy="108" r="8" fill="${palette.gray}" />\n      <circle cx="212" cy="170" r="14" fill="${palette.navy}" />`,
    symbolMono: (color) => `      <path d="M120 190 C100 130 150 90 120 40" stroke="${color}" stroke-width="12" stroke-linecap="round" fill="none" />\n      <path d="M120 40 C170 70 160 130 212 170" stroke="${color}" stroke-width="12" stroke-linecap="round" fill="none" />\n      <circle cx="120" cy="40" r="10" fill="${color}" />\n      <circle cx="156" cy="108" r="8" fill="${color}" />\n      <circle cx="212" cy="170" r="14" fill="${color}" />`,
  },
];

const ensureDir = (dir) => fs.mkdirSync(dir, { recursive: true });

ensureDir(topDir);

const makeHorizontal = (concept, background, colors) => {
  const { id } = concept;
  const symbolMarkup = background === palette.navy ? concept.symbolMono(colors.symbol) : concept.symbolFull;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" fill="none">
  <rect width="100%" height="100%" fill="${background}" rx="40" />
  <g transform="translate(220 200)">
${symbolMarkup}
  </g>
  <g transform="translate(560 370) scale(1.35)">
    <path d="${wordmarkPath}" fill="${colors.wordmark}" />
  </g>
  <g transform="translate(560 470) scale(1.1)">
    <path d="${descriptorPath}" fill="${colors.descriptor}" />
  </g>
</svg>`;
};

const makeHeaderMock = (concept) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" fill="none">
  <rect width="100%" height="100%" fill="${palette.sand}" />
  <rect x="0" y="0" width="1600" height="120" fill="${palette.white}" />
  <g transform="translate(120 60) scale(0.9)">
${concept.symbolFull}
  </g>
  <g transform="translate(260 70) scale(1.05)">
    <path d="${wordmarkPath}" fill="${palette.navy}" />
  </g>
  <text x="620" y="80" font-family="'Inter', 'Helvetica Neue', Arial" font-size="30" fill="${palette.navy}">Home</text>
  <text x="720" y="80" font-family="'Inter', 'Helvetica Neue', Arial" font-size="30" fill="${palette.gray}">Services</text>
  <text x="860" y="80" font-family="'Inter', 'Helvetica Neue', Arial" font-size="30" fill="${palette.gray}">About</text>
  <text x="980" y="80" font-family="'Inter', 'Helvetica Neue', Arial" font-size="30" fill="${palette.gray}">Resources</text>
  <rect x="1180" y="40" width="200" height="56" rx="28" fill="${palette.teal}" />
  <text x="1218" y="78" font-family="'Inter', 'Helvetica Neue', Arial" font-size="26" fill="${palette.white}">Book Consultation</text>
  <rect x="0" y="120" width="1600" height="560" fill="${palette.white}" />
  <g transform="translate(200 260)">
${concept.symbolFull}
  </g>
  <g transform="translate(520 380) scale(1.4)">
    <path d="${wordmarkPath}" fill="${palette.navy}" />
  </g>
  <text x="520" y="480" font-family="'Inter', 'Helvetica Neue', Arial" font-size="32" fill="${palette.gray}">Neurosurgeon • Endoscopic Spine Surgery</text>
  <text x="520" y="540" font-family="'Inter', 'Helvetica Neue', Arial" font-size="24" fill="${palette.navy}">www.drsayuj.info</text>
  <rect x="520" y="580" width="360" height="64" rx="32" fill="${palette.navy}" />
  <text x="540" y="622" font-family="'Inter', 'Helvetica Neue', Arial" font-size="26" fill="${palette.white}">Explore Spine Solutions</text>
</svg>`;
};

const makeAvatar = (concept) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="none">
  <rect width="100%" height="100%" fill="${palette.navy}" rx="160" />
  <g transform="translate(312 248)">
${concept.symbolMono(palette.white)}
  </g>
</svg>`;
};

for (const concept of topConcepts) {
  const lightSvg = makeHorizontal(concept, palette.white, { wordmark: palette.navy, descriptor: palette.gray, symbol: palette.white });
  const navySvg = makeHorizontal(concept, palette.navy, { wordmark: palette.white, descriptor: palette.teal, symbol: palette.white });
  fs.writeFileSync(path.join(topDir, `${concept.id}-light.svg`), lightSvg);
  fs.writeFileSync(path.join(topDir, `${concept.id}-navy.svg`), navySvg);
  fs.writeFileSync(path.join(topDir, `${concept.id}-header.svg`), makeHeaderMock(concept));
  fs.writeFileSync(path.join(topDir, `${concept.id}-avatar.svg`), makeAvatar(concept));
}

const rationaleLines = topConcepts.map((concept, index) => `${index + 1}. ${concept.name}: ${concept.summary}`);
fs.writeFileSync(path.join(topDir, 'top3-rationale.txt'), rationaleLines.join('\n'));

console.log('Top three presentations generated.');
