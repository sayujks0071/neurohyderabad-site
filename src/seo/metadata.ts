import fs from 'fs';
import path from 'path';
import { buildFaqSchema, FAQItem } from './schema/faq';

interface KeywordMapping {
  primary: string;
  secondary: string[];
  intent: string;
  geo: string;
  targetUrl: string;
}

interface MetadataOptions {
  overrides?: Partial<ReturnType<typeof buildMetadata>>;
  faq?: FAQItem[];
}

const KEYWORDS_PATH = path.join(process.cwd(), 'seo', 'keywords.json');

let cache: KeywordMapping[] | null = null;

function loadKeywordMappings(): KeywordMapping[] {
  if (cache) {
    return cache;
  }
  try {
    const raw = fs.readFileSync(KEYWORDS_PATH, 'utf8');
    cache = JSON.parse(raw);
    return cache;
  } catch (error) {
    console.warn('[seo/metadata] Unable to read keywords.json. Using empty mapping.');
    cache = [];
    return cache;
  }
}

function normaliseTitle(base: string) {
  const trimmed = base.trim();
  if (trimmed.length <= 60) return trimmed;
  return `${trimmed.slice(0, 57).trim()}...`;
}

function normaliseDescription(base: string) {
  const trimmed = base.trim();
  if (trimmed.length <= 155) return trimmed;
  return `${trimmed.slice(0, 152).trim()}...`;
}

function sentenceCase(value: string) {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function buildMetadata(keyword: KeywordMapping) {
  const title = normaliseTitle(`${sentenceCase(keyword.primary)} | Dr. Sayuj Krishnan`);
  const description = normaliseDescription(
    `${sentenceCase(keyword.primary)} in ${keyword.geo} by fellowship-trained neurosurgeon Dr. Sayuj Krishnan. ` +
      `Candid guidance on benefits, risks, recovery, and evidence-based outcomes.`
  );
  const h1 = sentenceCase(keyword.primary);
  const canonical = new URL(keyword.targetUrl, 'https://www.drsayuj.info').toString();

  return {
    title,
    description,
    h1,
    canonical,
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export function resolveKeyword(targetUrl: string): KeywordMapping | undefined {
  const mappings = loadKeywordMappings();
  return mappings.find((entry) => entry.targetUrl === targetUrl);
}

export function buildPageMetadata(targetUrl: string, options: MetadataOptions = {}) {
  const keyword = resolveKeyword(targetUrl);
  if (!keyword) {
    return options.overrides ?? null;
  }
  const baseMetadata = buildMetadata(keyword);
  const merged = {
    ...baseMetadata,
    ...options.overrides,
    openGraph: {
      ...baseMetadata.openGraph,
      ...options.overrides?.openGraph,
    },
    twitter: {
      ...baseMetadata.twitter,
      ...options.overrides?.twitter,
    },
  };

  const faqItems = options.faq ?? keyword.secondary.slice(0, 3).map((phrase) => ({
    question: sentenceCase(`What should I know about ${phrase}?`),
    answer:
      'Evidence-based response to be authored by the clinical content team. Include benefits, risks, and recovery expectations.' +
      ' Cite peer-reviewed sources and avoid promises of cure.',
  }));

  return {
    ...merged,
    faqSchema: buildFaqSchema(faqItems),
  };
}

export type PageMetadata = ReturnType<typeof buildPageMetadata>;
