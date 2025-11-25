import { NextResponse } from "next/server";
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/src/lib/seo";
import { CONDITION_RESOURCES } from "@/src/data/conditionsIndex";
import { patientStories } from "@/src/content/stories";

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

interface RouteConfig {
  path: string;
  priority?: number;
  changeFrequency?: ChangeFrequency;
}

export const revalidate = 86400; // regenerate once per day

const NOW = new Date();

const CORE_ROUTES: RouteConfig[] = [
  { path: "/", priority: 1.0, changeFrequency: "daily" },
  { path: "/specializations", priority: 0.85, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/german-training", priority: 0.85, changeFrequency: "monthly" },
  { path: "/appointments", priority: 0.9, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.8, changeFrequency: "weekly" },
  { path: "/ai-chat", priority: 0.6, changeFrequency: "weekly" },
  { path: "/best-neurosurgeon-in-hyderabad", priority: 0.8 },
  { path: "/brain-surgery", priority: 0.85 },
  { path: "/spine-surgery", priority: 0.85 },
  { path: "/pediatric-neurosurgery", priority: 0.75 },
  { path: "/endoscopic-spine-surgery-hyderabad", priority: 0.85 },
  { path: "/emergency-rehabilitation", priority: 0.7 },
  { path: "/technology-innovation", priority: 0.65, changeFrequency: "monthly" },
  { path: "/technology-facilities", priority: 0.65, changeFrequency: "monthly" },
  { path: "/research", priority: 0.7, changeFrequency: "monthly" },
  { path: "/patient-stories", priority: 0.75, changeFrequency: "weekly" },
  { path: "/stories/endoscopic-discectomy-same-day-hyderabad", priority: 0.65 },
  { path: "/stories/endoscopic-ulbd-stenosis-hyderabad", priority: 0.65 },
  { path: "/stories/mvd-trigeminal-neuralgia-hyderabad", priority: 0.65 },
  { path: "/blog", priority: 0.75, changeFrequency: "weekly" },
  { path: "/disease-guides", priority: 0.7, changeFrequency: "weekly" },
  { path: "/disease-guides/degenerative-disc-disease", priority: 0.65 },
  { path: "/symptoms/signs-of-brain-tumor", priority: 0.65 },
  { path: "/symptoms/pain-on-top-of-head-causes", priority: 0.65 },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/disclaimer", priority: 0.3, changeFrequency: "yearly" },
  { path: "/medical-disclaimer", priority: 0.3, changeFrequency: "yearly" },
];

const SERVICE_ROUTES: RouteConfig[] = [
  { path: "/services", priority: 0.85, changeFrequency: "weekly" },
  { path: "/services/brain-tumor-surgery-hyderabad", priority: 0.9 },
  { path: "/services/endoscopic-discectomy-hyderabad", priority: 0.9 },
  { path: "/services/endoscopic-spine-surgery-hyderabad", priority: 0.9 },
  { path: "/services/epilepsy-surgery-hyderabad", priority: 0.88 },
  { path: "/services/minimally-invasive-spine-surgery", priority: 0.9 },
  { path: "/services/peripheral-nerve-surgery", priority: 0.8 },
  { path: "/services/peripheral-nerve-surgery-hyderabad", priority: 0.8 },
  { path: "/services/spinal-fusion", priority: 0.8 },
  { path: "/services/spinal-fusion-surgery-hyderabad", priority: 0.8 },
  { path: "/services/spine-surgery-hyderabad", priority: 0.9 },
  { path: "/services/compare-neurosurgeons-hyderabad", priority: 0.6 },
  { path: "/services/dr-sayuj-vs-apollo-neuro-icu", priority: 0.6 },
  { path: "/services/kims-spine-surgery-second-opinion", priority: 0.6 },
];

const PROCEDURE_ROUTES: RouteConfig[] = [
  { path: "/awake-brain-surgery", priority: 0.85 },
  { path: "/brain-tumor-surgery", priority: 0.85 },
  { path: "/cervical-disc-replacement", priority: 0.8 },
  { path: "/craniovertebral-junction-surgery", priority: 0.75 },
  { path: "/endoscopic-cervical-spine-surgery", priority: 0.8 },
  { path: "/endoscopic-discectomy", priority: 0.85 },
  { path: "/endoscopic-lumbar-fusion", priority: 0.75 },
  { path: "/lumbar-stenosis-surgery", priority: 0.8 },
  { path: "/minimally-invasive-spine-surgery", priority: 0.85 },
  { path: "/neuro-endoscopy", priority: 0.75 },
  { path: "/spinal-cord-compression-surgery", priority: 0.8 },
  { path: "/spinal-fracture-fixation", priority: 0.8 },
];

const BLOG_ROUTES: RouteConfig[] = [
  { path: "/blog/awake-craniotomy-guide", priority: 0.7 },
  { path: "/blog/brain-tumor-surgery-cost-hyderabad", priority: 0.7 },
  { path: "/blog/day-care-endoscopic-spine-surgery-eligibility", priority: 0.7 },
  { path: "/blog/day-care-spine-surgery-insurance-hyderabad", priority: 0.7 },
  { path: "/blog/disc-replacement-vs-fusion", priority: 0.7 },
  { path: "/blog/endoscopic-discectomy-cost-hyderabad", priority: 0.7 },
  { path: "/blog/endoscopic-spine-surgery-cost-hyderabad", priority: 0.7 },
  { path: "/blog/endoscopic-vs-microdiscectomy-hyderabad", priority: 0.7 },
  { path: "/blog/mvd-vs-radiosurgery-trigeminal-neuralgia", priority: 0.7 },
  { path: "/blog/return-to-work-after-endoscopic-discectomy-hyderabad", priority: 0.7 },
  { path: "/blog/sciatica-pain-management-hyderabad", priority: 0.7 },
  { path: "/blog/spinal-fusion-cost-hyderabad", priority: 0.7 },
  { path: "/blog/spine-health-maintenance-hyderabad", priority: 0.7 },
  { path: "/blog/spine-surgery-recovery-timeline-hyderabad", priority: 0.7 },
  { path: "/blog/how-much-does-brain-surgery-cost-hyderabad", priority: 0.7 },
];

const LOCATION_ROUTES: RouteConfig[] = [
  { path: "/locations", priority: 0.75, changeFrequency: "monthly" },
  { path: "/locations/malakpet", priority: 0.65 },
  { path: "/locations/banjara-hills", priority: 0.65 },
  { path: "/locations/brain-spine-surgeon-banjara-hills", priority: 0.65 },
  { path: "/locations/brain-spine-surgeon-hitec-city", priority: 0.65 },
  { path: "/locations/brain-spine-surgeon-jubilee-hills", priority: 0.65 },
  { path: "/locations/hitech-city", priority: 0.6 },
  { path: "/locations/lb-nagar", priority: 0.6 },
  { path: "/locations/neurosurgeon-kukatpally", priority: 0.6 },
  { path: "/locations/neurosurgeon-manikonda", priority: 0.6 },
  { path: "/locations/neurosurgeon-near-kachiguda-faq", priority: 0.6 },
  { path: "/locations/neurosurgeon-near-kondapur-faq", priority: 0.6 },
  { path: "/locations/neurosurgeon-near-jubilee-hills", priority: 0.6 },
  { path: "/locations/neurosurgeon-near-jubilee-hills-faq", priority: 0.6 },
  { path: "/locations/neurosurgeon-nizampet", priority: 0.6 },
  { path: "/locations/secunderabad", priority: 0.6 },
];

const LOCAL_AREA_ROUTES: RouteConfig[] = [
  { path: "/neurosurgeon-hyderabad", priority: 0.75 },
  { path: "/neurosurgeon-banjara-hills", priority: 0.7 },
  { path: "/neurosurgeon-jubilee-hills", priority: 0.7 },
  { path: "/neurosurgeon-gachibowli", priority: 0.7 },
  { path: "/neurosurgeon-hitech-city", priority: 0.7 },
  { path: "/neurosurgeon-secunderabad", priority: 0.7 },
  { path: "/near", priority: 0.5 },
];

function getConditionRoutes(): RouteConfig[] {
  const conditionPaths = new Map<string, RouteConfig>();

  for (const condition of CONDITION_RESOURCES) {
    if (condition.primaryPath) {
      conditionPaths.set(condition.primaryPath, {
        path: condition.primaryPath,
        priority: condition.primaryPath.startsWith("/services/") ? 0.85 : 0.8,
        changeFrequency: "weekly",
      });
    }
  }

  return Array.from(conditionPaths.values());
}

function getDedicatedConditionRoutes(): RouteConfig[] {
  return [
    { path: "/conditions/brain-tumor-surgery-hyderabad", priority: 0.8 },
    { path: "/conditions/sciatica-treatment-hyderabad", priority: 0.8 },
    { path: "/conditions/slip-disc-treatment-hyderabad", priority: 0.8 },
    { path: "/conditions/spinal-stenosis-treatment-hyderabad", priority: 0.8 },
    { path: "/conditions/cervical-radiculopathy-treatment-hyderabad", priority: 0.8 },
    { path: "/conditions/trigeminal-neuralgia-treatment-hyderabad", priority: 0.8 },
  ];
}

function getPatientStoryRoutes(): RouteConfig[] {
  return patientStories.map((story) => ({
    path: `/patient-stories/${story.slug}`,
    priority: 0.6,
    changeFrequency: "monthly",
  }));
}

function generateSitemapEntries(): Array<{
  url: string;
  lastModified: Date;
  changeFrequency: ChangeFrequency;
  priority: number;
}> {
  const routeMap = new Map<
    string,
    { priority?: number; changeFrequency?: ChangeFrequency }
  >();

  const register = ({ path, priority, changeFrequency }: RouteConfig) => {
    if (!path) return;
    const normalized =
      path === "/" ? "/" : `/${path.replace(/^\/+/, "").replace(/\/+$/, "")}`;

    const existing = routeMap.get(normalized);
    if (
      existing &&
      existing.priority !== undefined &&
      priority !== undefined &&
      existing.priority >= priority
    ) {
      return;
    }

    routeMap.set(normalized, { priority, changeFrequency });
  };

  [
    ...CORE_ROUTES,
    ...SERVICE_ROUTES,
    ...PROCEDURE_ROUTES,
    ...BLOG_ROUTES,
    ...LOCATION_ROUTES,
    ...LOCAL_AREA_ROUTES,
    ...getConditionRoutes(),
    ...getDedicatedConditionRoutes(),
    ...getPatientStoryRoutes(),
  ].forEach(register);

  return Array.from(routeMap.entries()).map(([path, config]) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified: NOW,
    changeFrequency: config.changeFrequency ?? "weekly",
    priority: config.priority ?? 0.7,
  }));
}

export async function GET() {
  const entries = generateSitemapEntries();

  // Generate clean XML without line breaks in namespace
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map((entry) => {
      const lastmod =
        entry.lastModified instanceof Date
          ? entry.lastModified.toISOString()
          : entry.lastModified;
      return [
        "<url>",
        `<loc>${escapeXml(entry.url)}</loc>`,
        `<lastmod>${lastmod}</lastmod>`,
        `<changefreq>${entry.changeFrequency}</changefreq>`,
        `<priority>${entry.priority?.toFixed(1) ?? "0.7"}</priority>`,
        "</url>",
      ].join("");
    }),
    "</urlset>",
  ].join("\n");

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
