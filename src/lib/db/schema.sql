-- Schema for Analytics Tracking
-- This table stores page views and enriched analytics data

CREATE TABLE IF NOT EXISTS analytics_events (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL, -- e.g. 'page-view', 'conversion'
  page_path VARCHAR(2048) NOT NULL,
  session_id VARCHAR(100),
  user_agent TEXT,
  referrer TEXT,
  timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

  -- Enriched Data
  is_mobile BOOLEAN,
  is_tablet BOOLEAN,
  browser VARCHAR(50),
  os VARCHAR(50),

  page_category VARCHAR(50),
  user_intent VARCHAR(50),

  -- Metadata
  meta JSONB DEFAULT '{}'::jsonb,

  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Index for querying by session
CREATE INDEX IF NOT EXISTS idx_analytics_session ON analytics_events(session_id);

-- Index for querying by page path
CREATE INDEX IF NOT EXISTS idx_analytics_page ON analytics_events(page_path);

-- Index for querying by timestamp (for time-series analysis)
CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON analytics_events(timestamp);
