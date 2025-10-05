// SEO Configuration for Statsig Analytics
export const SEO_CONFIG = {
  // Core Web Vitals thresholds
  CORE_WEB_VITALS: {
    LCP: {
      GOOD: 2500,
      NEEDS_IMPROVEMENT: 4000
    },
    FID: {
      GOOD: 100,
      NEEDS_IMPROVEMENT: 300
    },
    CLS: {
      GOOD: 0.1,
      NEEDS_IMPROVEMENT: 0.25
    },
    FCP: {
      GOOD: 1800,
      NEEDS_IMPROVEMENT: 3000
    },
    TTFB: {
      GOOD: 800,
      NEEDS_IMPROVEMENT: 1800
    }
  },

  // Content optimization thresholds
  CONTENT: {
    TITLE_LENGTH: {
      MIN: 30,
      MAX: 60,
      OPTIMAL: 50
    },
    META_DESCRIPTION_LENGTH: {
      MIN: 120,
      MAX: 160,
      OPTIMAL: 150
    },
    WORD_COUNT: {
      MIN: 300,
      OPTIMAL: 1000
    },
    READABILITY_SCORE: {
      GOOD: 60,
      NEEDS_IMPROVEMENT: 30
    },
    HEADING_STRUCTURE: {
      MAX_H1: 1,
      MIN_H2: 2
    }
  },

  // Technical SEO requirements
  TECHNICAL_SEO: {
    REQUIRED_META_TAGS: [
      'title',
      'description',
      'canonical',
      'robots',
      'viewport'
    ],
    REQUIRED_OPEN_GRAPH: [
      'og:title',
      'og:description',
      'og:image',
      'og:url',
      'og:type'
    ],
    REQUIRED_TWITTER_CARD: [
      'twitter:card',
      'twitter:title',
      'twitter:description',
      'twitter:image'
    ]
  },

  // Page type configurations
  PAGE_TYPES: {
    home: {
      priority: 1.0,
      changeFrequency: 'daily',
      expectedWordCount: 800,
      requiredSections: ['hero', 'services', 'about', 'contact']
    },
    service: {
      priority: 0.9,
      changeFrequency: 'weekly',
      expectedWordCount: 1200,
      requiredSections: ['hero', 'procedure', 'benefits', 'faq', 'contact']
    },
    condition: {
      priority: 0.9,
      changeFrequency: 'weekly',
      expectedWordCount: 1000,
      requiredSections: ['hero', 'symptoms', 'treatment', 'faq', 'contact']
    },
    blog: {
      priority: 0.8,
      changeFrequency: 'monthly',
      expectedWordCount: 1500,
      requiredSections: ['hero', 'content', 'references', 'author']
    },
    location: {
      priority: 0.8,
      changeFrequency: 'monthly',
      expectedWordCount: 600,
      requiredSections: ['hero', 'directions', 'contact', 'faq']
    }
  },

  // SEO scoring weights
  SCORING_WEIGHTS: {
    CORE_WEB_VITALS: 0.3,
    CONTENT_QUALITY: 0.25,
    TECHNICAL_SEO: 0.2,
    MOBILE_OPTIMIZATION: 0.15,
    STRUCTURED_DATA: 0.1
  }
};

// SEO audit functions
export const seoAudit = {
  // Calculate overall SEO score
  calculateScore: (metrics: any): number => {
    let score = 0;
    const weights = SEO_CONFIG.SCORING_WEIGHTS;

    // Core Web Vitals score (0-100)
    const cwvScore = seoAudit.calculateCoreWebVitalsScore(metrics);
    score += cwvScore * weights.CORE_WEB_VITALS;

    // Content quality score (0-100)
    const contentScore = seoAudit.calculateContentScore(metrics);
    score += contentScore * weights.CONTENT_QUALITY;

    // Technical SEO score (0-100)
    const technicalScore = seoAudit.calculateTechnicalScore(metrics);
    score += technicalScore * weights.TECHNICAL_SEO;

    // Mobile optimization score (0-100)
    const mobileScore = seoAudit.calculateMobileScore(metrics);
    score += mobileScore * weights.MOBILE_OPTIMIZATION;

    // Structured data score (0-100)
    const structuredDataScore = seoAudit.calculateStructuredDataScore(metrics);
    score += structuredDataScore * weights.STRUCTURED_DATA;

    return Math.round(score);
  },

  // Calculate Core Web Vitals score
  calculateCoreWebVitalsScore: (metrics: any): number => {
    let score = 0;
    const thresholds = SEO_CONFIG.CORE_WEB_VITALS;

    // LCP score
    if (metrics.lcp) {
      if (metrics.lcp <= thresholds.LCP.GOOD) score += 25;
      else if (metrics.lcp <= thresholds.LCP.NEEDS_IMPROVEMENT) score += 15;
      else score += 5;
    }

    // FID score
    if (metrics.fid) {
      if (metrics.fid <= thresholds.FID.GOOD) score += 25;
      else if (metrics.fid <= thresholds.FID.NEEDS_IMPROVEMENT) score += 15;
      else score += 5;
    }

    // CLS score
    if (metrics.cls) {
      if (metrics.cls <= thresholds.CLS.GOOD) score += 25;
      else if (metrics.cls <= thresholds.CLS.NEEDS_IMPROVEMENT) score += 15;
      else score += 5;
    }

    // TTFB score
    if (metrics.ttfb) {
      if (metrics.ttfb <= thresholds.TTFB.GOOD) score += 25;
      else if (metrics.ttfb <= thresholds.TTFB.NEEDS_IMPROVEMENT) score += 15;
      else score += 5;
    }

    return score;
  },

  // Calculate content quality score
  calculateContentScore: (metrics: any): number => {
    let score = 0;
    const thresholds = SEO_CONFIG.CONTENT;

    // Title length score
    if (metrics.titleLength >= thresholds.TITLE_LENGTH.MIN && 
        metrics.titleLength <= thresholds.TITLE_LENGTH.MAX) {
      score += 20;
    } else if (metrics.titleLength > 0) {
      score += 10;
    }

    // Meta description score
    if (metrics.metaDescriptionLength >= thresholds.META_DESCRIPTION_LENGTH.MIN && 
        metrics.metaDescriptionLength <= thresholds.META_DESCRIPTION_LENGTH.MAX) {
      score += 20;
    } else if (metrics.metaDescriptionLength > 0) {
      score += 10;
    }

    // Word count score
    if (metrics.wordCount >= thresholds.WORD_COUNT.OPTIMAL) {
      score += 20;
    } else if (metrics.wordCount >= thresholds.WORD_COUNT.MIN) {
      score += 15;
    } else if (metrics.wordCount > 0) {
      score += 5;
    }

    // Readability score
    if (metrics.readabilityScore >= thresholds.READABILITY_SCORE.GOOD) {
      score += 20;
    } else if (metrics.readabilityScore >= thresholds.READABILITY_SCORE.NEEDS_IMPROVEMENT) {
      score += 15;
    } else if (metrics.readabilityScore > 0) {
      score += 5;
    }

    // Heading structure score
    if (metrics.h1Count === thresholds.HEADING_STRUCTURE.MAX_H1 && 
        metrics.h2Count >= thresholds.HEADING_STRUCTURE.MIN_H2) {
      score += 20;
    } else if (metrics.h1Count > 0 && metrics.h2Count > 0) {
      score += 10;
    }

    return score;
  },

  // Calculate technical SEO score
  calculateTechnicalScore: (metrics: any): number => {
    let score = 0;

    // Required meta tags
    if (metrics.hasCanonical) score += 20;
    if (metrics.hasRobotsMeta) score += 20;
    if (metrics.hasOpenGraph) score += 20;
    if (metrics.hasTwitterCard) score += 20;
    if (metrics.hasStructuredData) score += 20;

    return score;
  },

  // Calculate mobile optimization score
  calculateMobileScore: (metrics: any): number => {
    let score = 0;

    if (metrics.isMobileFriendly) score += 50;
    if (metrics.viewportMeta) score += 50;

    return score;
  },

  // Calculate structured data score
  calculateStructuredDataScore: (metrics: any): number => {
    let score = 0;

    if (metrics.hasStructuredData) score += 100;

    return score;
  }
};

// SEO recommendations generator
export const seoRecommendations = {
  generateRecommendations: (metrics: any, pageType: string): string[] => {
    const recommendations: string[] = [];
    const thresholds = SEO_CONFIG.CONTENT;
    const cwvThresholds = SEO_CONFIG.CORE_WEB_VITALS;

    // Core Web Vitals recommendations
    if (metrics.lcp && metrics.lcp > cwvThresholds.LCP.NEEDS_IMPROVEMENT) {
      recommendations.push('Optimize LCP: Consider image optimization, preloading critical resources, or reducing server response time');
    }

    if (metrics.fid && metrics.fid > cwvThresholds.FID.NEEDS_IMPROVEMENT) {
      recommendations.push('Improve FID: Reduce JavaScript execution time, optimize third-party scripts, or use web workers');
    }

    if (metrics.cls && metrics.cls > cwvThresholds.CLS.NEEDS_IMPROVEMENT) {
      recommendations.push('Fix CLS: Add size attributes to images, avoid inserting content above existing content, or use CSS transforms');
    }

    // Content recommendations
    if (metrics.titleLength < thresholds.TITLE_LENGTH.MIN) {
      recommendations.push('Title too short: Add more descriptive keywords to improve search visibility');
    } else if (metrics.titleLength > thresholds.TITLE_LENGTH.MAX) {
      recommendations.push('Title too long: Shorten title to avoid truncation in search results');
    }

    if (metrics.metaDescriptionLength < thresholds.META_DESCRIPTION_LENGTH.MIN) {
      recommendations.push('Meta description too short: Add more compelling description to improve click-through rates');
    } else if (metrics.metaDescriptionLength > thresholds.META_DESCRIPTION_LENGTH.MAX) {
      recommendations.push('Meta description too long: Shorten to avoid truncation in search results');
    }

    if (metrics.wordCount < thresholds.WORD_COUNT.MIN) {
      recommendations.push('Content too thin: Add more valuable content to improve search rankings');
    }

    if (metrics.readabilityScore < thresholds.READABILITY_SCORE.NEEDS_IMPROVEMENT) {
      recommendations.push('Improve readability: Use shorter sentences, simpler words, and better paragraph structure');
    }

    // Technical SEO recommendations
    if (!metrics.hasCanonical) {
      recommendations.push('Add canonical URL to prevent duplicate content issues');
    }

    if (!metrics.hasOpenGraph) {
      recommendations.push('Add Open Graph meta tags for better social media sharing');
    }

    if (!metrics.hasStructuredData) {
      recommendations.push('Add structured data (JSON-LD) to help search engines understand your content');
    }

    // Mobile optimization recommendations
    if (!metrics.isMobileFriendly) {
      recommendations.push('Improve mobile optimization: Ensure responsive design and touch-friendly interface');
    }

    if (!metrics.viewportMeta) {
      recommendations.push('Add viewport meta tag for proper mobile rendering');
    }

    // Image optimization recommendations
    if (metrics.imageCount > 0 && metrics.imageAltCount < metrics.imageCount) {
      recommendations.push('Add alt text to all images for better accessibility and SEO');
    }

    return recommendations;
  }
};
