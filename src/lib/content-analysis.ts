// Content Analysis System for SEO Optimization and Performance Tracking
export const CONTENT_ANALYSIS_CONFIG = {
  // Content Quality Metrics
  content_quality_metrics: {
    word_count: {
      thresholds: {
        minimum: 300,
        optimal: 1000,
        maximum: 3000
      },
      weight: 0.15
    },
    readability_score: {
      thresholds: {
        minimum: 30,
        optimal: 60,
        maximum: 100
      },
      weight: 0.20
    },
    heading_structure: {
      h1_count: { optimal: 1, weight: 0.10 },
      h2_count: { minimum: 2, optimal: 5, weight: 0.10 },
      h3_count: { minimum: 3, optimal: 8, weight: 0.05 }
    },
    keyword_density: {
      primary_keyword: { optimal: 0.5, maximum: 2.0, weight: 0.15 },
      secondary_keywords: { optimal: 0.3, maximum: 1.5, weight: 0.10 }
    },
    content_freshness: {
      last_updated: { weight: 0.05 },
      content_age: { weight: 0.05 }
    }
  },

  // SEO Content Requirements
  seo_content_requirements: {
    title_tag: {
      length: { minimum: 30, optimal: 50, maximum: 60 },
      includes_primary_keyword: true,
      includes_location: true,
      weight: 0.20
    },
    meta_description: {
      length: { minimum: 120, optimal: 150, maximum: 160 },
      includes_primary_keyword: true,
      includes_call_to_action: true,
      weight: 0.15
    },
    h1_tag: {
      length: { minimum: 20, optimal: 40, maximum: 60 },
      includes_primary_keyword: true,
      includes_location: true,
      weight: 0.15
    },
    internal_linking: {
      minimum_links: 3,
      optimal_links: 8,
      maximum_links: 15,
      weight: 0.10
    },
    external_linking: {
      minimum_links: 1,
      optimal_links: 3,
      maximum_links: 8,
      weight: 0.05
    }
  },

  // Content Performance Metrics
  content_performance_metrics: {
    engagement_metrics: {
      time_on_page: { optimal: 180, weight: 0.20 },
      bounce_rate: { optimal: 0.4, maximum: 0.7, weight: 0.15 },
      scroll_depth: { optimal: 0.7, weight: 0.15 },
      page_views: { weight: 0.10 }
    },
    conversion_metrics: {
      cta_click_rate: { optimal: 0.15, weight: 0.20 },
      form_submission_rate: { optimal: 0.05, weight: 0.15 },
      phone_call_rate: { optimal: 0.03, weight: 0.10 }
    },
    seo_metrics: {
      organic_traffic: { weight: 0.25 },
      keyword_rankings: { weight: 0.20 },
      backlinks: { weight: 0.15 }
    }
  }
};

// Content Analysis Functions
export const contentAnalysis = {
  // Analyze content quality
  analyzeContentQuality: (content: string, metadata: any) => {
    const analysis = {
      word_count: content.split(/\s+/).length,
      readability_score: contentAnalysis.calculateReadabilityScore(content),
      heading_structure: contentAnalysis.analyzeHeadingStructure(content),
      keyword_density: contentAnalysis.calculateKeywordDensity(content, metadata.primary_keyword),
      content_freshness: contentAnalysis.analyzeContentFreshness(metadata.last_updated),
      overall_score: 0
    };

    // Calculate overall content quality score
    analysis.overall_score = contentAnalysis.calculateContentQualityScore(analysis);
    
    return analysis;
  },

  // Calculate readability score (Flesch Reading Ease)
  calculateReadabilityScore: (content: string) => {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = content.split(/\s+/).filter(w => w.length > 0);
    const syllables = words.reduce((acc, word) => acc + contentAnalysis.countSyllables(word), 0);
    
    if (sentences.length === 0 || words.length === 0) return 0;
    
    const avgWordsPerSentence = words.length / sentences.length;
    const avgSyllablesPerWord = syllables / words.length;
    
    return 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
  },

  // Count syllables in a word
  countSyllables: (word: string) => {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    
    const vowels = 'aeiouy';
    let syllableCount = 0;
    let previousWasVowel = false;
    
    for (let i = 0; i < word.length; i++) {
      const isVowel = vowels.includes(word[i]);
      if (isVowel && !previousWasVowel) {
        syllableCount++;
      }
      previousWasVowel = isVowel;
    }
    
    // Handle silent 'e'
    if (word.endsWith('e') && syllableCount > 1) {
      syllableCount--;
    }
    
    return Math.max(1, syllableCount);
  },

  // Analyze heading structure
  analyzeHeadingStructure: (content: string) => {
    const h1Matches = content.match(/<h1[^>]*>(.*?)<\/h1>/gi) || [];
    const h2Matches = content.match(/<h2[^>]*>(.*?)<\/h2>/gi) || [];
    const h3Matches = content.match(/<h3[^>]*>(.*?)<\/h3>/gi) || [];
    
    return {
      h1_count: h1Matches.length,
      h2_count: h2Matches.length,
      h3_count: h3Matches.length,
      h1_text: h1Matches.map(h => h.replace(/<[^>]*>/g, '')),
      h2_text: h2Matches.map(h => h.replace(/<[^>]*>/g, '')),
      h3_text: h3Matches.map(h => h.replace(/<[^>]*>/g, ''))
    };
  },

  // Calculate keyword density
  calculateKeywordDensity: (content: string, primaryKeyword: string) => {
    if (!primaryKeyword) return { primary: 0, secondary: {} };
    
    const words = content.toLowerCase().split(/\s+/);
    const totalWords = words.length;
    const keywordCount = words.filter(word => word.includes(primaryKeyword.toLowerCase())).length;
    
    return {
      primary: totalWords > 0 ? (keywordCount / totalWords) * 100 : 0,
      secondary: {} // Could be expanded to include secondary keywords
    };
  },

  // Analyze content freshness
  analyzeContentFreshness: (lastUpdated: string) => {
    if (!lastUpdated) return { age_days: 0, freshness_score: 0 };
    
    const lastUpdateDate = new Date(lastUpdated);
    const now = new Date();
    const ageDays = Math.floor((now.getTime() - lastUpdateDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Freshness score: 100 for content less than 30 days old, decreasing to 0 for content older than 365 days
    const freshnessScore = Math.max(0, 100 - (ageDays / 365) * 100);
    
    return {
      age_days: ageDays,
      freshness_score: freshnessScore
    };
  },

  // Calculate overall content quality score
  calculateContentQualityScore: (analysis: any) => {
    const config = CONTENT_ANALYSIS_CONFIG.content_quality_metrics;
    let score = 0;
    
    // Word count score
    const wordCountScore = analysis.word_count >= config.word_count.thresholds.optimal ? 100 : 
                          (analysis.word_count / config.word_count.thresholds.optimal) * 100;
    score += wordCountScore * config.word_count.weight;
    
    // Readability score
    const readabilityScore = Math.min(100, Math.max(0, analysis.readability_score));
    score += readabilityScore * config.readability_score.weight;
    
    // Heading structure score
    const h1Score = analysis.heading_structure.h1_count === config.heading_structure.h1_count.optimal ? 100 : 0;
    const h2Score = analysis.heading_structure.h2_count >= config.heading_structure.h2_count.minimum ? 100 : 
                   (analysis.heading_structure.h2_count / config.heading_structure.h2_count.minimum) * 100;
    score += h1Score * config.heading_structure.h1_count.weight;
    score += h2Score * config.heading_structure.h2_count.weight;
    
    // Keyword density score
    const keywordScore = analysis.keyword_density.primary >= 0.5 && analysis.keyword_density.primary <= 2.0 ? 100 : 50;
    score += keywordScore * config.keyword_density.primary_keyword.weight;
    
    // Content freshness score
    score += analysis.content_freshness.freshness_score * config.content_freshness.content_age.weight;
    
    return Math.round(score);
  },

  // Generate content recommendations
  generateContentRecommendations: (analysis: any, metadata: any) => {
    const recommendations = [];
    const config = CONTENT_ANALYSIS_CONFIG;
    
    // Word count recommendations
    if (analysis.word_count < config.content_quality_metrics.word_count.thresholds.minimum) {
      recommendations.push({
        type: "content_length",
        priority: "high",
        message: `Content is too short (${analysis.word_count} words). Add more valuable content to reach at least ${config.content_quality_metrics.word_count.thresholds.minimum} words.`,
        action: "Expand content with more detailed information, examples, and explanations."
      });
    }
    
    // Readability recommendations
    if (analysis.readability_score < config.content_quality_metrics.readability_score.thresholds.minimum) {
      recommendations.push({
        type: "readability",
        priority: "high",
        message: `Content readability is poor (${analysis.readability_score.toFixed(1)}). Aim for a score above ${config.content_quality_metrics.readability_score.thresholds.minimum}.`,
        action: "Use shorter sentences, simpler words, and better paragraph structure."
      });
    }
    
    // Heading structure recommendations
    if (analysis.heading_structure.h1_count !== 1) {
      recommendations.push({
        type: "heading_structure",
        priority: "high",
        message: `Page has ${analysis.heading_structure.h1_count} H1 tags. Should have exactly 1 H1 tag.`,
        action: "Ensure only one H1 tag per page for better SEO structure."
      });
    }
    
    if (analysis.heading_structure.h2_count < 2) {
      recommendations.push({
        type: "heading_structure",
        priority: "medium",
        message: `Page has only ${analysis.heading_structure.h2_count} H2 tags. Consider adding more H2 tags for better content organization.`,
        action: "Add more H2 tags to break up content into logical sections."
      });
    }
    
    // Keyword density recommendations
    if (analysis.keyword_density.primary < 0.5) {
      recommendations.push({
        type: "keyword_density",
        priority: "medium",
        message: `Primary keyword density is low (${analysis.keyword_density.primary.toFixed(2)}%). Aim for 0.5-2.0%.`,
        action: "Naturally incorporate the primary keyword more frequently throughout the content."
      });
    } else if (analysis.keyword_density.primary > 2.0) {
      recommendations.push({
        type: "keyword_density",
        priority: "medium",
        message: `Primary keyword density is too high (${analysis.keyword_density.primary.toFixed(2)}%). Aim for 0.5-2.0%.`,
        action: "Reduce keyword usage to avoid keyword stuffing."
      });
    }
    
    // Content freshness recommendations
    if (analysis.content_freshness.age_days > 365) {
      recommendations.push({
        type: "content_freshness",
        priority: "medium",
        message: `Content is ${analysis.content_freshness.age_days} days old. Consider updating for better SEO performance.`,
        action: "Update content with new information, statistics, or examples."
      });
    }
    
    return recommendations;
  },

  // Track content performance
  trackContentPerformance: (pageSlug: string, metrics: any) => {
    const performanceData = {
      page_slug: pageSlug,
      timestamp: new Date().toISOString(),
      engagement_metrics: {
        time_on_page: metrics.time_on_page || 0,
        bounce_rate: metrics.bounce_rate || 0,
        scroll_depth: metrics.scroll_depth || 0,
        page_views: metrics.page_views || 0
      },
      conversion_metrics: {
        cta_click_rate: metrics.cta_click_rate || 0,
        form_submission_rate: metrics.form_submission_rate || 0,
        phone_call_rate: metrics.phone_call_rate || 0
      },
      seo_metrics: {
        organic_traffic: metrics.organic_traffic || 0,
        keyword_rankings: metrics.keyword_rankings || [],
        backlinks: metrics.backlinks || 0
      }
    };
    
    // This would send data to Statsig
    console.log('Content performance data:', performanceData);
    
    return performanceData;
  }
};
