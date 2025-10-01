/** @type {import('@lhci/cli').LHCIConfig} */
module.exports = {
  ci: {
    collect: {
      // Start your Next app locally in CI:
      startServerCommand: "pnpm build && pnpm start",
      startServerReadyPattern: "started server on",
      url: [
        "http://localhost:3000/",
        // add key service pages you promote from drafts:
        "http://localhost:3000/endoscopic-spine-surgery-hyderabad",
        "http://localhost:3000/awake-brain-surgery-hyderabad"
      ],
      numberOfRuns: 2,
      settings: { budgetsPath: "budgets.json" }
    },
    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        // Core Web Vitals-ish thresholds
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["error", { "maxNumericValue": 200 }],
        // Keep accessibility high
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        // Keep SEO high
        "categories:seo": ["error", { "minScore": 0.95 }],
        // Performance overall
        "categories:performance": ["warn", { "minScore": 0.9 }]
      }
    },
    upload: {
      target: "temporary-public-storage"
    }
  }
};
