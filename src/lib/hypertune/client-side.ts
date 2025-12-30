"use client";

import { createHypertuneSource } from "./source";

let hypertuneSource: ReturnType<typeof createHypertuneSource> | null = null;

function getHypertuneSource() {
  if (!hypertuneSource) {
    hypertuneSource = createHypertuneSource();
  }
  return hypertuneSource;
}

export default async function getHypertuneClient() {
  const source = getHypertuneSource();
  try {
    await source.initIfNeeded();
  } catch (error) {
    console.warn('Hypertune client initialization failed; using fallback values.', error);
  }

  return source;
}
