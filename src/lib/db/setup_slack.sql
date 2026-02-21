-- Create tables for Slack Integration

-- Map Slack threads to Application threads (e.g. Booking Thread ID)
CREATE TABLE IF NOT EXISTS slack_mappings (
  slack_thread_ts VARCHAR(50) PRIMARY KEY,
  application_thread_id VARCHAR(100) NOT NULL,
  channel_id VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_slack_mappings_app_thread ON slack_mappings(application_thread_id);

-- Store pending replies from Admin (via Slack) to be delivered to User
CREATE TABLE IF NOT EXISTS pending_admin_replies (
  id SERIAL PRIMARY KEY,
  application_thread_id VARCHAR(100) NOT NULL,
  message_text TEXT NOT NULL,
  admin_name VARCHAR(100),
  slack_ts VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_pending_replies_thread ON pending_admin_replies(application_thread_id);
