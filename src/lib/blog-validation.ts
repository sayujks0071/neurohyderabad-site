// src/lib/blog-validation.ts

export type BlogTopic = {
  id: string;
  title: string;
  category: string;
  primaryKeyword: string;
  targetLocations?: string[];
  focus: string;
  riskLevel?: "low" | "medium" | "high";
};

export type ArticleValidationResult = {
  ok: boolean;
  errors: string[];
  warnings: string[];
};

function normalize(text: string): string {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function extractLines(content: string): string[] {
  return content.replace(/\r\n/g, "\n").split("\n");
}

function countWords(content: string): number {
  return content
    .replace(/```[\s\S]*?```/g, "") // remove fenced code blocks
    .split(/\s+/)
    .filter(Boolean).length;
}

function hasHeading(
  lines: string[],
  level: number,
  contains: string
): boolean {
  const needle = normalize(contains);
  const prefix = "#".repeat(level) + " ";
  return lines.some((line) => {
    const trimmed = line.trim();
    if (!trimmed.startsWith(prefix)) return false;
    return normalize(trimmed.slice(prefix.length)).includes(needle);
  });
}

function findForbiddenPatterns(content: string): string[] {
  const errors: string[] = [];
  const lowered = content.toLowerCase();

  const hardForbidden = [
    "100% cure",
    "guaranteed cure",
    "permanent cure",
    "permanent solution",
    "completely cure",
    "sure cure",
    "zero risk",
  ];

  for (const phrase of hardForbidden) {
    if (lowered.includes(phrase)) {
      errors.push(`Uses forbidden promise language: "${phrase}"`);
    }
  }

  // Very basic dosage/prescription signals → treat as WARNING (not hard fail)
  // We won't fail here; we'll mark as warning upstream.
  return errors;
}

function hasExternalLinks(content: string): boolean {
  // Rough: any full URL
  return /(https?:\/\/|www\.)/i.test(content);
}

function containsMedicalDisclaimerSection(lines: string[]): boolean {
  return hasHeading(lines, 2, "medical disclaimer");
}

function containsEmergencySection(lines: string[]): boolean {
  return hasHeading(lines, 2, "when to seek emergency care");
}

function topLevelH1MatchesTitle(
  lines: string[],
  title: string
): { ok: boolean; message?: string } {
  const nonEmpty = lines.find((l) => l.trim().length > 0);
  if (!nonEmpty) {
    return { ok: false, message: "Article appears empty (no non-empty lines)" };
  }

  if (!nonEmpty.trim().startsWith("# ")) {
    return {
      ok: false,
      message: `First non-empty line must be an H1 starting with "# ". Found: "${nonEmpty.trim()}"`,
    };
  }

  const h1Text = nonEmpty.trim().slice(2).trim();
  const normH1 = normalize(h1Text);
  const normTitle = normalize(title);

  // Require that most of the title words appear in H1
  const titleTokens = normTitle.split(" ").filter(Boolean);
  const matchedWords = titleTokens.filter((t) => normH1.includes(t));
  const matchRatio = matchedWords.length / Math.max(titleTokens.length, 1);

  if (matchRatio < 0.6) {
    return {
      ok: false,
      message: `H1 does not closely match topic title.\nExpected approx: "${title}"\nFound: "${h1Text}"`,
    };
  }

  return { ok: true };
}

export function validateGeneratedArticle(
  content: string,
  topic: BlogTopic,
  minWords: number = 800
): ArticleValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!content || !content.trim()) {
    return {
      ok: false,
      errors: ["Generated content is empty"],
      warnings,
    };
  }

  const lines = extractLines(content);

  // 1) H1 check
  const h1Check = topLevelH1MatchesTitle(lines, topic.title);
  if (!h1Check.ok && h1Check.message) {
    errors.push(h1Check.message);
  }

  // 2) Required sections (flexible, but must exist)
  const requiredSections = [
    "introduction",
    "what has changed in recent years",
    "who might benefit",
    "risks, limits, and common misconceptions",
    "recovery, follow-up, and long-term care",
    "when to see a neurosurgeon or spine specialist",
    "when to seek emergency care",
    "summary",
    "medical disclaimer",
  ];

  for (const section of requiredSections) {
    if (!hasHeading(lines, 2, section)) {
      errors.push(
        `Missing required H2 section containing: "${section}". Check headings.`
      );
    }
  }

  // 3) Minimum length
  const words = countWords(content);
  if (words < minWords) {
    errors.push(
      `Article too short: ${words} words (minimum ${minWords} required)`
    );
  } else if (words < minWords + 200) {
    warnings.push(
      `Article is relatively short (${words} words); consider increasing length for depth.`
    );
  }

  // 4) Forbidden promise language
  const forbiddenErrors = findForbiddenPatterns(content);
  errors.push(...forbiddenErrors);

  // 5) External link check
  if (hasExternalLinks(content)) {
    warnings.push(
      "Detected possible external links (http/https/www). Only internal link placeholders like [[link:...]] are recommended."
    );
  }

  // 6) Section presence sanity checks
  if (!containsEmergencySection(lines)) {
    errors.push(
      'Missing clearly labeled "When to Seek Emergency Care" section (## ...).'
    );
  }
  if (!containsMedicalDisclaimerSection(lines)) {
    errors.push(
      'Missing clearly labeled "Medical Disclaimer" section (## Medical Disclaimer).'
    );
  }

  // 7) Mild keyword sanity check
  const normContent = normalize(content);
  const keyword = normalize(topic.primaryKeyword);
  const keyToken = keyword.split(" ")[0] || "";
  if (keyToken && !normContent.includes(keyToken)) {
    warnings.push(
      `Primary keyword root "${keyToken}" does not appear in article text; SEO impact may be suboptimal.`
    );
  }

  return {
    ok: errors.length === 0,
    errors,
    warnings,
  };
}

