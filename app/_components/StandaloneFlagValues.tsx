import { Suspense } from 'react';
import { FlagValues } from 'flags/react';
import {
  seoNoindex,
  structuredDataEnabled,
  sitemapExtensions,
  crawlBudgetMode,
  ctaExperiment,
  stickyCtaEnabled,
  stickyCtaExperiment,
  chatWidgetEnabled,
  appointmentFormVariant,
  imageOptimization,
  fontDisplay,
  prefetchLinks,
  productionSourcemaps,
  showTestimonials,
  showVideoSection,
  showFaqSection,
  blogEnabled,
  locationPagesEnabled,
} from '@/flags';

/**
 * Server component that resolves the 18 standalone feature flags
 * and emits their values for the Vercel Flags Explorer toolbar.
 *
 * Rendered outside <HypertuneWrapper> since these flags don't depend
 * on Hypertune context. The existing FlagValuesEmitter inside the
 * wrapper handles the Hypertune-backed flags separately.
 *
 * Vercel Toolbar picks up all <script data-flag-values> tags via
 * MutationObserver, so both emitters coexist correctly.
 */
async function ResolvedStandaloneFlags() {
  const values = {
    'seo-noindex': await seoNoindex(),
    'structured-data-enabled': await structuredDataEnabled(),
    'sitemap-extensions': await sitemapExtensions(),
    'crawl-budget-mode': await crawlBudgetMode(),
    'cta-experiment': await ctaExperiment(),
    'sticky-cta-enabled': await stickyCtaEnabled(),
    'sticky-cta-experiment': await stickyCtaExperiment(),
    'chat-widget-enabled': await chatWidgetEnabled(),
    'appointment-form-variant': await appointmentFormVariant(),
    'image-optimization': await imageOptimization(),
    'font-display': await fontDisplay(),
    'prefetch-links': await prefetchLinks(),
    'production-sourcemaps': await productionSourcemaps(),
    'show-testimonials': await showTestimonials(),
    'show-video-section': await showVideoSection(),
    'show-faq-section': await showFaqSection(),
    'blog-enabled': await blogEnabled(),
    'location-pages-enabled': await locationPagesEnabled(),
  };

  return <FlagValues values={values} />;
}

export default function StandaloneFlagValues() {
  return (
    <Suspense fallback={null}>
      <ResolvedStandaloneFlags />
    </Suspense>
  );
}
