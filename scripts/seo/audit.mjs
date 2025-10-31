#!/usr/bin/env node

import { globby } from "globby";

async function run() {
  const pages = await globby(["app/**/*.tsx", "app/**/*.ts"], {
    gitignore: true,
  });

  console.log("[seo:audit] inspected", pages.length, "route files");
  console.log("[seo:audit] TODO: implement deep SEO audit checks");
}

run().catch((error) => {
  console.error("[seo:audit] failed", error);
  process.exitCode = 1;
});
