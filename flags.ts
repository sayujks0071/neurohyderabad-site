/**
 * Vercel Feature Flags for www.drsayuj.info
 *
 * Standalone flag definitions using the Vercel Flags SDK (`flags/next`).
 * These complement the Hypertune-backed flags in `hypertune-flags.ts` and
 * are surfaced in the Vercel Flags Explorer toolbar for one-click overrides.
 *
 * Categories:
 *   1. SEO & Crawl        – indexing, structured data, sitemap behaviour
 *   2. UX & Conversion    – CTA experiments, widgets, form variants
 *   3. Performance         – image, font, prefetch tuning
 *   4. Content & Features  – section visibility, blog, locations
 *
 * Usage in a Server Component / Route Handler:
 *   import { seoNoindex } from "@/flags";
 *   const noindex = await seoNoindex();
 */

import { flag } from "flags/next";

// ─────────────────────────────────────────────
// 1. SEO & Crawl
// ─────────────────────────────────────────────

/** Emergency noindex kill-switch — blocks all search-engine indexing. */
export const seoNoindex = flag({
  key: "seo-noindex",
  defaultValue: false,
  description: "Set noindex meta tag sitewide (staging / emergency use)",
  options: [
    { label: "Indexable (production)", value: false },
    { label: "Noindex (block crawlers)", value: true },
  ],
  decide() {
    return this.defaultValue;
  },
});

/** Toggle JSON-LD structured data (MedicalBusiness, FAQPage, Physician, etc.) */
export const structuredDataEnabled = flag({
  key: "structured-data-enabled",
  defaultValue: true,
  description: "Emit JSON-LD structured data on service and condition pages",
  options: [
    { label: "Enabled", value: true },
    { label: "Disabled", value: false },
  ],
  decide() {
    return this.defaultValue;
  },
});

/** Toggle image + video sitemaps alongside the main sitemap. */
export const sitemapExtensions = flag({
  key: "sitemap-extensions",
  defaultValue: true,
  description: "Include image-sitemap and video-sitemap alongside sitemap.xml",
  options: [
    { label: "Enabled", value: true },
    { label: "Disabled", value: false },
  ],
  decide() {
    return this.defaultValue;
  },
});

/** Crawl-budget mode — how aggressively bots are throttled via robots.txt. */
export const crawlBudgetMode = flag({
  key: "crawl-budget-mode",
  defaultValue: "standard" as string,
  description: "Robots.txt crawl-budget posture: standard, aggressive, or conservative",
  options: [
    { label: "Standard", value: "standard" },
    { label: "Aggressive (allow all)", value: "aggressive" },
    { label: "Conservative (restrict)", value: "conservative" },
  ],
  decide() {
    return this.defaultValue;
  },
});

// ─────────────────────────────────────────────
// 2. UX & Conversion
// ─────────────────────────────────────────────

/**
 * Hero CTA experiment.
 *
 * Maps to the existing experiment config in
 * `src/lib/hypertune/experiments-config.ts` → CTA_VARIANTS.
 */
export const ctaExperiment = flag({
  key: "cta-experiment",
  defaultValue: "control" as string,
  description: "Hero CTA button order and copy variant",
  options: [
    { label: "Control", value: "control" },
    { label: "Teleconsult First", value: "teleconsult_first" },
    { label: "WhatsApp First", value: "whatsapp_first" },
  ],
  decide() {
    return this.defaultValue;
  },
});

/** Show or hide the sticky CTA bar that appears on scroll. */
export const stickyCtaEnabled = flag({
  key: "sticky-cta-enabled",
  defaultValue: true,
  description: "Show the sticky CTA bar on scroll",
  options: [
    { label: "Visible", value: true },
    { label: "Hidden", value: false },
  ],
  decide() {
    return this.defaultValue;
  },
});

/**
 * Sticky CTA variant experiment.
 *
 * Maps to STICKY_CTA_VARIANTS in experiments-config.ts.
 */
export const stickyCtaExperiment = flag({
  key: "sticky-cta-experiment",
  defaultValue: "control" as string,
  description: "Sticky CTA bar variant: default, MRI-review, or coordinator-first",
  options: [
    { label: "Control", value: "control" },
    { label: "MRI Review", value: "mri_review" },
    { label: "Coordinator First", value: "coordinator_first" },
  ],
  decide() {
    return this.defaultValue;
  },
});

/** Toggle the floating WhatsApp / chat widget in the bottom-right corner. */
export const chatWidgetEnabled = flag({
  key: "chat-widget-enabled",
  defaultValue: true,
  description: "Show the floating WhatsApp / chat widget",
  options: [
    { label: "Visible", value: true },
    { label: "Hidden", value: false },
  ],
  decide() {
    return this.defaultValue;
  },
});

/** Appointment booking form layout variant. */
export const appointmentFormVariant = flag({
  key: "appointment-form-variant",
  defaultValue: "standard" as string,
  description: "Booking form layout: full-field standard or streamlined 3-field",
  options: [
    { label: "Standard (all fields)", value: "standard" },
    { label: "Streamlined (name + phone + condition)", value: "streamlined" },
  ],
  decide() {
    return this.defaultValue;
  },
});

// ─────────────────────────────────────────────
// 3. Performance
// ─────────────────────────────────────────────

/** Preferred image formats served by the Next.js Image component. */
export const imageOptimization = flag({
  key: "image-optimization",
  defaultValue: "avif_webp" as string,
  description: "Image format preference for Next.js Image optimisation",
  options: [
    { label: "AVIF + WebP (best quality/size)", value: "avif_webp" },
    { label: "WebP only", value: "webp_only" },
    { label: "No optimisation", value: "unoptimized" },
  ],
  decide() {
    return this.defaultValue;
  },
});

/** CSS font-display strategy for web fonts. */
export const fontDisplay = flag({
  key: "font-display",
  defaultValue: "swap" as string,
  description: "Font loading strategy: swap (fast FCP), optional (stable CLS), block (no FOUT)",
  options: [
    { label: "Swap (fast FCP)", value: "swap" },
    { label: "Optional (stable CLS)", value: "optional" },
    { label: "Block (no FOUT)", value: "block" },
  ],
  decide() {
    return this.defaultValue;
  },
});

/** Next.js automatic link prefetching on viewport entry. */
export const prefetchLinks = flag({
  key: "prefetch-links",
  defaultValue: true,
  description: "Enable Next.js automatic link prefetching on viewport entry",
  options: [
    { label: "Enabled", value: true },
    { label: "Disabled", value: false },
  ],
  decide() {
    return this.defaultValue;
  },
});

/** Emit browser source maps in production (for Middleware.io error tracking). */
export const productionSourcemaps = flag({
  key: "production-sourcemaps",
  defaultValue: true,
  description: "Emit browser source maps in production for error tracking",
  options: [
    { label: "Enabled", value: true },
    { label: "Disabled", value: false },
  ],
  decide() {
    return this.defaultValue;
  },
});

// ─────────────────────────────────────────────
// 4. Content & Features
// ─────────────────────────────────────────────

/** Patient testimonials / Google reviews section on service pages. */
export const showTestimonials = flag({
  key: "show-testimonials",
  defaultValue: true,
  description: "Display patient testimonials section on service and condition pages",
  options: [
    { label: "Visible", value: true },
    { label: "Hidden", value: false },
  ],
  decide() {
    return this.defaultValue;
  },
});

/** Embedded surgery/explainer video section. */
export const showVideoSection = flag({
  key: "show-video-section",
  defaultValue: true,
  description: "Display embedded video section on service pages",
  options: [
    { label: "Visible", value: true },
    { label: "Hidden", value: false },
  ],
  decide() {
    return this.defaultValue;
  },
});

/** FAQ section with FAQPage structured data. */
export const showFaqSection = flag({
  key: "show-faq-section",
  defaultValue: true,
  description: "Display FAQ section with FAQPage schema markup",
  options: [
    { label: "Visible", value: true },
    { label: "Hidden", value: false },
  ],
  decide() {
    return this.defaultValue;
  },
});

/** Blog feature toggle — controls /blog routes and sidebar links. */
export const blogEnabled = flag({
  key: "blog-enabled",
  defaultValue: true,
  description: "Enable the /blog section, sidebar links, and blog schema",
  options: [
    { label: "Enabled", value: true },
    { label: "Disabled", value: false },
  ],
  decide() {
    return this.defaultValue;
  },
});

/** Location-specific landing pages (/neurosurgeon-jubilee-hills, etc.). */
export const locationPagesEnabled = flag({
  key: "location-pages-enabled",
  defaultValue: true,
  description: "Enable location-specific landing pages (/neurosurgeon-*)",
  options: [
    { label: "Enabled", value: true },
    { label: "Disabled", value: false },
  ],
  decide() {
    return this.defaultValue;
  },
});
