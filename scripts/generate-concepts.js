import fs from 'fs';
import path from 'path';

const root = path.resolve(process.cwd(), 'docs/branding/dr-sayuj');
const assetsDir = path.join(root, 'assets');
const conceptsDir = path.join(root, 'concepts');

const typeData = JSON.parse(fs.readFileSync(path.join(assetsDir, 'type-outlines.json'), 'utf8'));
const wordmarkPath = typeData.wordmark.d;
const wordmarkWidth = typeData.wordmark.width;
const wordmarkHeight = typeData.wordmark.height;
const descriptorPath = typeData.descriptor.d;
const descriptorWidth = typeData.descriptor.width;
const descriptorHeight = typeData.descriptor.height;

const palette = {
  navy: '#0B2E4E',
  teal: '#0FA3B1',
  gray: '#6A7A8C',
  black: '#000000',
  white: '#FFFFFF',
};

const baseView = {
  width: 960,
  height: 540,
};

const wordmarkGroup = ({ fill = palette.navy, x = 260, y = 250, scale = 1 }) => {
  const translate = `translate(${x} ${y}) scale(${scale})`;
  return `    <g transform="${translate}">
      <path d="${wordmarkPath}" fill="${fill}" />
    </g>`;
};

const descriptorGroup = ({ fill = palette.gray, x = 260, y = 320, scale = 1 }) => {
  const translate = `translate(${x} ${y}) scale(${scale})`;
  return `    <g transform="${translate}">
      <path d="${descriptorPath}" fill="${fill}" />
    </g>`;
};

const symbolBase = (content) => `    <g transform="translate(120 110)">
${content}
    </g>`;

const makeSvg = (symbol, options = {}) => {
  const {
    background = palette.white,
    wordmark = true,
    descriptor = true,
    wordmarkFill,
    descriptorFill,
    wordmarkX,
    wordmarkY,
    descriptorX,
    descriptorY,
    wordmarkScale,
    descriptorScale,
  } = options;

  const parts = [`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${baseView.width} ${baseView.height}" fill="none">`, `  <rect width="100%" height="100%" fill="${background}" rx="32"/>`, symbol];

  if (wordmark) {
    parts.push(wordmarkGroup({ fill: wordmarkFill ?? palette.navy, x: wordmarkX ?? 360, y: wordmarkY ?? 275, scale: wordmarkScale ?? 1 }));
  }

  if (descriptor) {
    parts.push(descriptorGroup({ fill: descriptorFill ?? palette.gray, x: descriptorX ?? 360, y: descriptorY ?? 345, scale: descriptorScale ?? 1 }));
  }

  parts.push('</svg>');
  return parts.join('\n');
};

const concepts = [
  {
    id: 'route1-s-curve-01',
    label: 'S-curve Spine A',
    symbol: symbolBase(`      <path d="M140 20 C100 20 100 80 140 80 C180 80 180 140 140 140" stroke="${palette.navy}" stroke-width="12" stroke-linecap="round" fill="none" />
      <path d="M126 50 H154" stroke="${palette.teal}" stroke-width="6" stroke-linecap="round" />
      <path d="M122 86 H158" stroke="${palette.teal}" stroke-width="6" stroke-linecap="round" />
      <path d="M130 120 H150" stroke="${palette.teal}" stroke-width="6" stroke-linecap="round" />`),
  },
  {
    id: 'route1-s-curve-02',
    label: 'S-curve Spine B',
    symbol: symbolBase(`      <path d="M140 20 C95 20 95 70 140 90 C185 110 185 160 140 160" stroke="${palette.teal}" stroke-width="12" stroke-linecap="round" fill="none" />
      <path d="M110 65 C140 60 160 70 180 90" stroke="${palette.navy}" stroke-width="10" stroke-linecap="round" fill="none" />
      <circle cx="140" cy="55" r="6" fill="${palette.gray}" />
      <circle cx="150" cy="110" r="6" fill="${palette.gray}" />`),
  },
  {
    id: 'route1-s-curve-03',
    label: 'S-curve Spine C',
    symbol: symbolBase(`      <path d="M120 24 C90 24 90 70 120 90 C150 110 150 156 120 156" stroke="${palette.navy}" stroke-width="10" stroke-linecap="round" fill="none" />
      <path d="M160 24 C190 24 190 70 160 90 C130 110 130 156 160 156" stroke="${palette.teal}" stroke-width="10" stroke-linecap="round" fill="none" />
      <path d="M120 90 H160" stroke="${palette.gray}" stroke-width="5" stroke-linecap="round" />`),
  },
  {
    id: 'route1-s-curve-04',
    label: 'S-curve Spine D',
    symbol: symbolBase(`      <circle cx="140" cy="90" r="84" stroke="${palette.navy}" stroke-width="6" fill="none" />
      <path d="M140 30 C108 40 108 72 140 90 C172 108 172 140 140 150" stroke="${palette.teal}" stroke-width="10" stroke-linecap="round" fill="none" />
      <path d="M124 68 H156" stroke="${palette.gray}" stroke-width="5" stroke-linecap="round" />
      <path d="M128 112 H152" stroke="${palette.gray}" stroke-width="5" stroke-linecap="round" />`),
  },
  {
    id: 'route2-endoscope-01',
    label: 'Endoscope Arc A',
    symbol: symbolBase(`      <path d="M70 140 C70 60 150 20 210 90" stroke="${palette.navy}" stroke-width="12" stroke-linecap="round" fill="none" />
      <path d="M210 90 C250 140 210 180 170 160" stroke="${palette.teal}" stroke-width="12" stroke-linecap="round" fill="none" />
      <circle cx="210" cy="90" r="14" fill="${palette.gray}" />
      <path d="M220 84 L250 72" stroke="${palette.navy}" stroke-width="6" stroke-linecap="round" />`),
  },
  {
    id: 'route2-endoscope-02',
    label: 'Endoscope Arc B',
    symbol: symbolBase(`      <path d="M80 150 A100 100 0 0 1 230 60" stroke="${palette.navy}" stroke-width="10" stroke-linecap="round" fill="none" />
      <path d="M110 120 A70 70 0 0 1 200 90" stroke="${palette.teal}" stroke-width="10" stroke-linecap="round" fill="none" />
      <circle cx="230" cy="60" r="10" fill="${palette.teal}" />
      <path d="M240 58 L262 58" stroke="${palette.gray}" stroke-width="6" stroke-linecap="round" />`),
  },
  {
    id: 'route2-endoscope-03',
    label: 'Endoscope Arc C',
    symbol: symbolBase(`      <path d="M100 140 A90 90 0 0 1 220 80" stroke="${palette.teal}" stroke-width="12" stroke-linecap="round" fill="none" />
      <path d="M220 80 A60 60 0 0 1 160 150" stroke="${palette.navy}" stroke-width="12" stroke-linecap="round" fill="none" />
      <circle cx="220" cy="80" r="12" fill="${palette.gray}" />
      <path d="M235 70 L262 60" stroke="${palette.navy}" stroke-width="6" stroke-linecap="round" />
      <circle cx="160" cy="150" r="8" fill="${palette.teal}" />`),
  },
  {
    id: 'route2-endoscope-04',
    label: 'Endoscope Arc D',
    symbol: symbolBase(`      <path d="M80 150 A110 110 0 0 1 230 50" stroke="${palette.navy}" stroke-width="10" stroke-linecap="round" fill="none" />
      <path d="M120 140 A70 70 0 0 1 200 70" stroke="${palette.gray}" stroke-width="8" stroke-linecap="round" fill="none" />
      <path d="M200 70 L248 40" stroke="${palette.teal}" stroke-width="10" stroke-linecap="round" />
      <circle cx="248" cy="40" r="12" stroke="${palette.navy}" stroke-width="4" fill="${palette.white}" />`),
  },
  {
    id: 'route3-neuron-01',
    label: 'Neuron Spine A',
    symbol: symbolBase(`      <path d="M120 150 C100 110 140 70 120 30" stroke="${palette.navy}" stroke-width="10" stroke-linecap="round" fill="none" />
      <path d="M120 30 C160 60 150 110 190 140" stroke="${palette.teal}" stroke-width="10" stroke-linecap="round" fill="none" />
      <circle cx="120" cy="30" r="8" fill="${palette.teal}" />
      <circle cx="150" cy="90" r="6" fill="${palette.gray}" />
      <circle cx="190" cy="140" r="10" fill="${palette.navy}" />`),
  },
  {
    id: 'route3-neuron-02',
    label: 'Neuron Spine B',
    symbol: symbolBase(`      <path d="M120 40 C160 70 130 110 170 140" stroke="${palette.teal}" stroke-width="10" stroke-linecap="round" fill="none" />
      <path d="M120 40 C90 80 140 120 110 160" stroke="${palette.navy}" stroke-width="10" stroke-linecap="round" fill="none" />
      <circle cx="110" cy="160" r="12" fill="${palette.gray}" />
      <line x1="150" y1="100" x2="198" y2="118" stroke="${palette.gray}" stroke-width="6" stroke-linecap="round" />
      <circle cx="198" cy="118" r="8" fill="${palette.teal}" />`),
  },
  {
    id: 'route3-neuron-03',
    label: 'Neuron Spine C',
    symbol: symbolBase(`      <path d="M110 150 C110 110 150 90 150 50" stroke="${palette.navy}" stroke-width="12" stroke-linecap="round" fill="none" />
      <path d="M150 50 C150 90 190 110 190 150" stroke="${palette.teal}" stroke-width="12" stroke-linecap="round" fill="none" />
      <circle cx="150" cy="50" r="10" fill="${palette.teal}" />
      <circle cx="150" cy="100" r="8" fill="${palette.gray}" />
      <circle cx="190" cy="150" r="10" fill="${palette.navy}" />
      <path d="M150 100 L210 120" stroke="${palette.gray}" stroke-width="6" stroke-linecap="round" />
      <circle cx="210" cy="120" r="6" fill="${palette.teal}" />`),
  },
  {
    id: 'route3-neuron-04',
    label: 'Neuron Spine D',
    symbol: symbolBase(`      <path d="M120 30 C100 70 150 110 130 150" stroke="${palette.navy}" stroke-width="10" stroke-linecap="round" fill="none" />
      <path d="M120 30 C150 65 170 110 210 140" stroke="${palette.teal}" stroke-width="10" stroke-linecap="round" fill="none" />
      <circle cx="120" cy="30" r="8" fill="${palette.gray}" />
      <circle cx="150" cy="80" r="6" fill="${palette.teal}" />
      <circle cx="180" cy="120" r="8" fill="${palette.gray}" />
      <circle cx="210" cy="140" r="12" fill="${palette.navy}" />`),
  },
];

for (const concept of concepts) {
  const svg = makeSvg(concept.symbol);
  fs.writeFileSync(path.join(conceptsDir, `${concept.id}.svg`), svg);
}

const sheetColumns = 4;
const sheetRows = 3;
const thumbWidth = 280;
const thumbHeight = 200;
const gapX = 40;
const gapY = 40;
const startX = 60;
const startY = 70;

const sheetParts = [`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" fill="none">`, `  <rect width="100%" height="100%" fill="${palette.white}" />`, `  <text x="96" y="96" fill="${palette.navy}" font-family="'Inter', 'Helvetica Neue', Arial" font-size="48" font-weight="600">Concept Routes — Dr Sayuj</text>`];

concepts.forEach((concept, index) => {
  const col = index % sheetColumns;
  const row = Math.floor(index / sheetColumns);
  const x = startX + col * (thumbWidth + gapX);
  const y = startY + row * (thumbHeight + gapY);
  sheetParts.push(`  <g transform="translate(${x} ${y})">
    <rect width="${thumbWidth}" height="${thumbHeight}" fill="#F7FAFC" rx="24" />
    <text x="32" y="48" fill="${palette.navy}" font-family="'Inter', 'Helvetica Neue', Arial" font-size="20" font-weight="500">${concept.label}</text>
    <image href="${concept.id}.svg" x="20" y="60" width="${thumbWidth - 40}" height="${thumbHeight - 80}" preserveAspectRatio="xMidYMid meet" />
  </g>`);
});

sheetParts.push('</svg>');
fs.writeFileSync(path.join(conceptsDir, 'concept-sheet.svg'), sheetParts.join('\n'));

console.log('Generated concept logos and sheet.');
