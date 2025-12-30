import 'server-only';

import { unstable_noStore as noStore } from 'next/cache';

import { createHypertuneSource } from './source';

const hypertuneSource = createHypertuneSource({ useEdgeConfig: true });

export default async function getHypertune() {
  noStore();

  try {
    await hypertuneSource.initIfNeeded();
  } catch (error) {
    console.warn('Hypertune server initialization failed; serving fallback values.', error);
  }

  return hypertuneSource;
}
