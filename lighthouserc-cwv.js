/** @type {import('@lhci/cli').LHCIConfig} */
module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm start",
      startServerReadyPattern: "Ready in|started server on|Local:|compiled|started",
      startServerReadyTimeout: 180000,
      url: [
        "http://localhost:3000/",
        "http://localhost:3000/appointments",
        "http://localhost:3000/locations/banjara-hills",
        "http://localhost:3000/conditions/sciatica-pain-treatment-hyderabad"
      ],
      numberOfRuns: 1,
      settings: {
        chromeFlags: "--no-sandbox --headless"
      }
    },
    assert: {
      preset: "lighthouse:recommended",
    },
    upload: {
      target: "temporary-public-storage"
    }
  }
};
