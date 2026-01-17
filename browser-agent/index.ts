import { Buffer } from "node:buffer";
// Polyfill SlowBuffer for dependencies that rely on it (e.g. jwa -> buffer-equal-constant-time)
if (typeof (globalThis as any).SlowBuffer === "undefined") {
  (globalThis as any).SlowBuffer = Buffer;
}

import "dotenv/config";
import { Stagehand } from "@browserbasehq/stagehand";
import { z } from "zod";

async function main() {
  // Initialize Stagehand
  // Note: Change env to "LOCAL" if you want to run Chrome locally on your machine
  const stagehand = new Stagehand({
    env: "BROWSERBASE",
  });

  await stagehand.init();
  const page = stagehand.context.pages()[0];

  console.log("🧠 Starting Neuro-Surgeon Agent...");
  console.log("📍 Navigating to https://www.drsayuj.info");

  await page.goto("https://www.drsayuj.info");

  // Wait for Vercel/Cloudflare security check to pass
  console.log("⏳ Waiting for security check...");
  await new Promise(r => setTimeout(r, 5000));

  // Use Case 1: Smart Profile Extraction
  // Instead of writing a fragile CSS selector like "div.profile > h1",
  // we just ask the AI to find the info.
  console.log("🔍 Extracting doctor profile...");
  const profile = await stagehand.extract(
    "Extract the doctor's name, years of experience, and list his main medical specializations (e.g. Spine, Brain).",
    z.object({
      name: z.string(),
      experience: z.string(),
      specializations: z.array(z.string()),
      qualifications: z.string().optional(),
    })
  );
  console.log("✅ Doctor Profile:", profile);

  // Use Case 2: Location Intelligence
  // Useful for patients wanting to know where to visit.
  console.log("🏥 Finding clinic locations...");
  const clinics = await stagehand.extract(
    "Extract the names and areas of the hospitals/clinics where the doctor practices.",
    z.object({
      locations: z.array(
        z.object({
          hospitalName: z.string(),
          area: z.string(),
          timing: z.string().optional(),
        })
      ),
    })
  );
  console.log("✅ Locations Found:", clinics);

  // Use Case 3: Interactive Navigation & Resource Discovery
  // The agent can "see" the page and decide how to interact.
  console.log("🖱️ Looking for educational resources...");

  // We'll try to observe what's available first
  const observations = await stagehand.observe("What are the main clickable sections related to patient education or media?");
  console.log("👀 Observations:", observations);

  // Then act on it
  await stagehand.act("Scroll to the 'Resources' or 'Media Coverage' section");

  const latestUpdate = await stagehand.extract(
    "Extract the title of the latest podcast, article, or media appearance featured on the page.",
    z.object({
      title: z.string(),
      description: z.string(),
    })
  );
  console.log("📰 Latest Media:", latestUpdate);

  await stagehand.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
