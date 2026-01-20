/**
 * Competitor Monitoring Workflow
 * 
 * Track and analyze competitors in Hyderabad neurosurgery market:
 * - drraveesh.com
 * - spinesurgeon.in
 * - Hospital websites
 */

import { sleep, FatalError, fetch, getWritable } from "workflow";

const SITE_URL = "https://www.drsayuj.info";

// Primary competitors to monitor
const COMPETITORS = {
  direct: [
    { name: "Dr. Raveesh", domain: "drraveesh.com", type: "neurosurgeon" },
    { name: "Spine Surgeon India", domain: "spinesurgeon.in", type: "spine" },
  ],
  hospitals: [
    { name: "Apollo Hospitals", domain: "apollohospitals.com", type: "hospital" },
    { name: "Yashoda Hospitals", domain: "yashoda-hospitals.org", type: "hospital" },
    { name: "KIMS Hospital", domain: "kimshospitals.com", type: "hospital" },
    { name: "Continental Hospitals", domain: "continentalhospitals.com", type: "hospital" },
  ],
};

// Keywords to track rankings for
const TRACKED_KEYWORDS = [
  "neurosurgeon hyderabad",
  "best neurosurgeon in hyderabad",
  "spine surgeon hyderabad",
  "brain surgeon hyderabad",
  "endoscopic spine surgery hyderabad",
  "brain tumor surgery hyderabad",
  "slip disc treatment hyderabad",
  "minimally invasive spine surgery hyderabad",
  "spine surgery cost hyderabad",
  "neurosurgeon kondapur",
  "neurosurgeon gachibowli",
  "neurosurgeon hitech city",
];

interface CompetitorReport {
  runId: string;
  timestamp: string;
  competitors: CompetitorAnalysis[];
  marketShare: MarketShareAnalysis;
  contentGaps: ContentGap[];
  opportunities: Opportunity[];
  threats: Threat[];
}

interface CompetitorAnalysis {
  name: string;
  domain: string;
  rankings: { keyword: string; position: number | null }[];
  estimatedTraffic: number;
  contentCount: number;
  backlinks: number;
  domainAuthority: number;
  recentChanges: string[];
}

interface MarketShareAnalysis {
  ourShare: number;
  topCompetitor: string;
  topCompetitorShare: number;
  totalMarketKeywords: number;
  keywordsWeRank: number;
}

interface ContentGap {
  topic: string;
  competitors: string[];
  searchVolume: number;
  difficulty: "easy" | "medium" | "hard";
  recommendation: string;
}

interface Opportunity {
  type: "keyword" | "content" | "backlink" | "feature";
  description: string;
  impact: "high" | "medium" | "low";
  effort: "low" | "medium" | "high";
  competitor: string;
}

interface Threat {
  type: "ranking" | "content" | "feature" | "reputation";
  description: string;
  severity: "high" | "medium" | "low";
  competitor: string;
  recommendation: string;
}

/**
 * Main competitor monitoring workflow - runs weekly
 */
export async function runCompetitorAnalysis(): Promise<CompetitorReport> {
  "use workflow";
  globalThis.fetch = fetch;

  const runId = `comp-${Date.now()}`;
  const timestamp = new Date().toISOString();
  console.log(`[Competitor Monitor] Starting analysis ${runId}`);

  try {
    // Phase 1: Gather competitor data in parallel
    const allCompetitors = [...COMPETITORS.direct, ...COMPETITORS.hospitals];
    const competitorAnalyses = await analyzeAllCompetitors(allCompetitors);

    // Phase 2: Analyze market share
    const marketShare = await calculateMarketShare(competitorAnalyses);

    // Phase 3: Identify content gaps
    const contentGaps = await findContentGaps(competitorAnalyses);

    // Phase 4: Generate opportunities and threats
    const { opportunities, threats } = await generateInsights(
      competitorAnalyses,
      contentGaps
    );

    console.log(`[Competitor Monitor] Completed ${runId}`);

    return {
      runId,
      timestamp,
      competitors: competitorAnalyses,
      marketShare,
      contentGaps,
      opportunities,
      threats,
    };
  } catch (error) {
    console.error(`[Competitor Monitor] Error:`, error);
    throw new FatalError(`Competitor analysis failed: ${error}`);
  }
}

/**
 * Analyze all competitors
 */
async function analyzeAllCompetitors(
  competitors: { name: string; domain: string; type: string }[]
): Promise<CompetitorAnalysis[]> {
  "use step";

  console.log(`[Competitor Monitor] Analyzing ${competitors.length} competitors`);

  const analyses: CompetitorAnalysis[] = [];

  for (const competitor of competitors) {
    const analysis = await analyzeSingleCompetitor(competitor);
    analyses.push(analysis);
  }

  return analyses;
}

async function analyzeSingleCompetitor(
  competitor: { name: string; domain: string; type: string }
): Promise<CompetitorAnalysis> {
  // Simulated data - in production, use SEO APIs
  const mockData: Record<string, Partial<CompetitorAnalysis>> = {
    "drraveesh.com": {
      estimatedTraffic: 3500,
      contentCount: 45,
      backlinks: 1200,
      domainAuthority: 35,
      rankings: [
        { keyword: "neurosurgeon hyderabad", position: 5 },
        { keyword: "spine surgeon hyderabad", position: 2 },
        { keyword: "slip disc treatment hyderabad", position: 4 },
      ],
      recentChanges: [
        "Added new blog post about spine surgery",
        "Updated homepage with patient testimonials",
      ],
    },
    "spinesurgeon.in": {
      estimatedTraffic: 5200,
      contentCount: 78,
      backlinks: 2100,
      domainAuthority: 42,
      rankings: [
        { keyword: "spine surgeon hyderabad", position: 1 },
        { keyword: "endoscopic spine surgery hyderabad", position: 4 },
        { keyword: "minimally invasive spine surgery hyderabad", position: 5 },
      ],
      recentChanges: [
        "Launched video testimonials section",
        "Added cost calculator feature",
      ],
    },
  };

  const data = mockData[competitor.domain] || {
    estimatedTraffic: Math.floor(Math.random() * 10000),
    contentCount: Math.floor(Math.random() * 100),
    backlinks: Math.floor(Math.random() * 5000),
    domainAuthority: Math.floor(Math.random() * 50) + 20,
    rankings: [],
    recentChanges: [],
  };

  return {
    name: competitor.name,
    domain: competitor.domain,
    rankings: data.rankings || [],
    estimatedTraffic: data.estimatedTraffic || 0,
    contentCount: data.contentCount || 0,
    backlinks: data.backlinks || 0,
    domainAuthority: data.domainAuthority || 0,
    recentChanges: data.recentChanges || [],
  };
}

/**
 * Calculate market share based on keyword rankings
 */
async function calculateMarketShare(
  competitors: CompetitorAnalysis[]
): Promise<MarketShareAnalysis> {
  "use step";

  console.log("[Competitor Monitor] Calculating market share");

  // Our simulated rankings
  const ourRankings = new Map([
    ["neurosurgeon hyderabad", 3],
    ["best neurosurgeon in hyderabad", 5],
    ["brain surgeon hyderabad", 4],
    ["spine surgeon hyderabad", 6],
    ["endoscopic spine surgery hyderabad", 2],
    ["brain tumor surgery hyderabad", 4],
  ]);

  const keywordsWeRank = ourRankings.size;
  const totalKeywords = TRACKED_KEYWORDS.length;

  // Calculate share based on top 10 rankings
  let ourPoints = 0;
  let totalPoints = 0;
  const competitorPoints = new Map<string, number>();

  for (const keyword of TRACKED_KEYWORDS) {
    // Points: Position 1 = 10 points, Position 10 = 1 point
    const ourPosition = ourRankings.get(keyword);
    if (ourPosition && ourPosition <= 10) {
      ourPoints += 11 - ourPosition;
    }
    totalPoints += 10; // Max points per keyword

    // Calculate competitor points
    for (const comp of competitors) {
      const ranking = comp.rankings.find(r => r.keyword === keyword);
      if (ranking?.position && ranking.position <= 10) {
        const current = competitorPoints.get(comp.name) || 0;
        competitorPoints.set(comp.name, current + (11 - ranking.position));
      }
    }
  }

  // Find top competitor
  let topCompetitor = "";
  let topCompetitorPoints = 0;
  for (const [name, points] of competitorPoints) {
    if (points > topCompetitorPoints) {
      topCompetitor = name;
      topCompetitorPoints = points;
    }
  }

  return {
    ourShare: Math.round((ourPoints / totalPoints) * 100),
    topCompetitor,
    topCompetitorShare: Math.round((topCompetitorPoints / totalPoints) * 100),
    totalMarketKeywords: totalKeywords,
    keywordsWeRank,
  };
}

/**
 * Find content gaps compared to competitors
 */
async function findContentGaps(
  competitors: CompetitorAnalysis[]
): Promise<ContentGap[]> {
  "use step";

  console.log("[Competitor Monitor] Finding content gaps");

  // Topics competitors cover that we might be missing
  const gaps: ContentGap[] = [
    {
      topic: "Spine Surgery Cost Calculator",
      competitors: ["spinesurgeon.in"],
      searchVolume: 1200,
      difficulty: "medium",
      recommendation: "Create interactive cost estimator tool",
    },
    {
      topic: "Video Patient Testimonials",
      competitors: ["spinesurgeon.in", "drraveesh.com"],
      searchVolume: 800,
      difficulty: "medium",
      recommendation: "Add video testimonials section with real patients",
    },
    {
      topic: "Virtual Consultation",
      competitors: ["apollohospitals.com"],
      searchVolume: 2500,
      difficulty: "easy",
      recommendation: "Prominently feature online consultation option",
    },
    {
      topic: "Surgery Recovery Timeline",
      competitors: ["spinesurgeon.in"],
      searchVolume: 1800,
      difficulty: "easy",
      recommendation: "Create detailed recovery guides for each procedure",
    },
    {
      topic: "Insurance & Payment Options",
      competitors: ["yashoda-hospitals.org", "apollohospitals.com"],
      searchVolume: 3200,
      difficulty: "easy",
      recommendation: "Add comprehensive insurance and payment info page",
    },
    {
      topic: "Before/After Surgery Photos",
      competitors: ["drraveesh.com"],
      searchVolume: 950,
      difficulty: "hard",
      recommendation: "Create case studies with imaging (MRI/CT) comparisons",
    },
  ];

  return gaps;
}

/**
 * Generate opportunities and threats from analysis
 */
async function generateInsights(
  competitors: CompetitorAnalysis[],
  contentGaps: ContentGap[]
): Promise<{ opportunities: Opportunity[]; threats: Threat[] }> {
  "use step";

  console.log("[Competitor Monitor] Generating insights");

  const opportunities: Opportunity[] = [];
  const threats: Threat[] = [];

  // Content opportunities from gaps
  for (const gap of contentGaps) {
    if (gap.difficulty === "easy" && gap.searchVolume > 1000) {
      opportunities.push({
        type: "content",
        description: `Create content for "${gap.topic}" - ${gap.searchVolume} monthly searches`,
        impact: "high",
        effort: "low",
        competitor: gap.competitors[0],
      });
    }
  }

  // Keyword opportunities
  opportunities.push({
    type: "keyword",
    description: "Target 'spine surgery cost hyderabad' - competitors ranking but low competition",
    impact: "high",
    effort: "medium",
    competitor: "spinesurgeon.in",
  });

  opportunities.push({
    type: "feature",
    description: "Add surgery cost calculator - major differentiator",
    impact: "high",
    effort: "medium",
    competitor: "spinesurgeon.in",
  });

  opportunities.push({
    type: "backlink",
    description: "Guest post opportunities on health portals (Practo, Lybrate)",
    impact: "medium",
    effort: "medium",
    competitor: "All",
  });

  // Threats from competitor activities
  for (const comp of competitors) {
    if (comp.recentChanges.length > 0) {
      for (const change of comp.recentChanges) {
        if (change.toLowerCase().includes("video") || change.toLowerCase().includes("testimonial")) {
          threats.push({
            type: "content",
            description: `${comp.name} added video content - may improve engagement`,
            severity: "medium",
            competitor: comp.name,
            recommendation: "Prioritize video testimonials and educational content",
          });
        }
      }
    }

    // Check for ranking threats
    for (const ranking of comp.rankings) {
      if (ranking.position && ranking.position <= 3) {
        threats.push({
          type: "ranking",
          description: `${comp.name} ranks #${ranking.position} for "${ranking.keyword}"`,
          severity: ranking.position === 1 ? "high" : "medium",
          competitor: comp.name,
          recommendation: `Optimize content and build backlinks for "${ranking.keyword}"`,
        });
      }
    }
  }

  return { opportunities, threats };
}

/**
 * Stream competitor monitoring updates in real-time
 */
export async function streamCompetitorUpdates(
  durationMinutes: number = 60
): Promise<void> {
  "use workflow";
  globalThis.fetch = fetch;

  const writable = getWritable();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();

  const write = async (data: object) => {
    await writer.write(encoder.encode(JSON.stringify(data) + "\n"));
  };

  try {
    await write({ type: "start", message: "Starting competitor monitoring" });

    const iterations = Math.ceil(durationMinutes / 15); // Check every 15 mins
    
    for (let i = 0; i < iterations; i++) {
      // Run quick competitor check
      const quickCheck = await runQuickCompetitorCheck();
      
      await write({
        type: "update",
        timestamp: new Date().toISOString(),
        data: quickCheck,
      });

      if (i < iterations - 1) {
        await sleep("15 minutes");
      }
    }

    await write({ type: "complete", message: "Monitoring session complete" });
  } finally {
    await writer.close();
  }
}

async function runQuickCompetitorCheck(): Promise<{
  changes: { competitor: string; change: string }[];
  alerts: string[];
}> {
  "use step";

  // Quick check for major changes
  return {
    changes: [],
    alerts: [],
  };
}

/**
 * Get actionable competitor intelligence
 */
export async function getCompetitorIntelligence(): Promise<{
  topOpportunity: string;
  urgentThreat: string | null;
  weeklyFocus: string;
  keywordToTarget: string;
}> {
  "use workflow";
  globalThis.fetch = fetch;

  return await generateIntelligenceSummary();
}

async function generateIntelligenceSummary(): Promise<{
  topOpportunity: string;
  urgentThreat: string | null;
  weeklyFocus: string;
  keywordToTarget: string;
}> {
  "use step";

  return {
    topOpportunity: "Create spine surgery cost calculator - spinesurgeon.in's top converting feature",
    urgentThreat: "spinesurgeon.in ranks #1 for 'spine surgeon hyderabad' - need content optimization",
    weeklyFocus: "Publish 2 blog posts targeting long-tail spine surgery keywords",
    keywordToTarget: "minimally invasive spine surgery cost hyderabad",
  };
}
