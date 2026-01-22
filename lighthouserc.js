/** @type {import('@lhci/cli').LHCIConfig} */
module.exports = {
  ci: {
    collect: {
      // Start your Next app locally in CI:
      startServerCommand: "npm start",
      startServerReadyPattern: "Ready in|started server on|Local:|compiled|started",
      startServerReadyTimeout: 180000,
      url: [
        "http://localhost:3000/",
        // add key service pages you promote from drafts:
        "http://localhost:3000/services/endoscopic-spine-surgery-hyderabad",
        "http://localhost:3000/services/awake-spine-surgery-hyderabad"
      ],
      numberOfRuns: 2,
      settings: { 
        budgetsPath: "budgets.json",
        chromeFlags: "--no-sandbox --headless"
      }
    },
    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        // Core Web Vitals-ish thresholds (warnings instead of errors for CI resilience)
        "largest-contentful-paint": ["warn", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["warn", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["warn", { "maxNumericValue": 200 }],
        // Keep accessibility high
        "categories:accessibility": ["warn", { "minScore": 0.95 }],
        // Keep SEO high
        "categories:seo": ["warn", { "minScore": 0.95 }],
        // Performance overall
        "categories:performance": ["warn", { "minScore": 0.9 }]
      }
    },
    upload: {
      target: "temporary-public-storage"
    }
  }
};
