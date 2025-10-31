#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const REPORT_DIR = path.join(process.cwd(), "reports", "seo");

async function run() {
  await fs.mkdir(REPORT_DIR, { recursive: true });

  const timestamp = new Date().toISOString();
  const reportPath = path.join(REPORT_DIR, `${timestamp}.json`);

  await fs.writeFile(
    reportPath,
    JSON.stringify({ generatedAt: timestamp, status: "placeholder" }, null, 2)
  );

  console.log(`[seo:report] generated placeholder report at ${reportPath}`);
}

run().catch((error) => {
  console.error("[seo:report] failed", error);
  process.exitCode = 1;
});
