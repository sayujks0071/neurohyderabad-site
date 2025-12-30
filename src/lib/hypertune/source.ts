import { create, VercelEdgeConfigInitDataProvider } from 'hypertune';
import { createClient } from '@vercel/edge-config';

import { getHypertuneToken } from './edge-config';

type CreateSourceOptions = {
  useEdgeConfig?: boolean;
};

export function createHypertuneSource({
  useEdgeConfig = false,
}: CreateSourceOptions = {}) {
  const token = getHypertuneToken() ?? '';

  const configUrl =
    process.env.EXPERIMENTATION_CONFIG ||
    process.env.drsayuj_EXPERIMENTATION_CONFIG;
  const itemKey =
    process.env.EXPERIMENTATION_CONFIG_ITEM_KEY ||
    process.env.drsayuj_EXPERIMENTATION_CONFIG_ITEM_KEY;

  const initDataProvider =
    useEdgeConfig && configUrl && itemKey
      ? new VercelEdgeConfigInitDataProvider({
          edgeConfigClient: createClient(configUrl),
          itemKey,
        })
      : undefined;

  return create({
    token,
    options: {
      initDataProvider,
      shouldRefreshInitData: Boolean(initDataProvider),
      shouldRefreshInitDataOnCreate: Boolean(initDataProvider),
      remoteLogging: {
        mode: process.env.NODE_ENV === 'production' ? 'session' : 'off',
      },
    },
  });
}
