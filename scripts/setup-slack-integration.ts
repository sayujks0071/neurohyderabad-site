import { db } from '@/src/lib/db';

async function main() {
    console.log('🔌 Setting up Slack integration tables...');

    if (!db.isConfigured()) {
        console.error('❌ Database not configured. Please set POSTGRES_URL.');
        process.exit(1);
    }

    try {
        await db.query(`
      CREATE TABLE IF NOT EXISTS slack_mappings (
        slack_thread_ts VARCHAR(50) PRIMARY KEY,
        application_thread_id VARCHAR(100) NOT NULL,
        channel_id VARCHAR(50) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_slack_mappings_app_thread ON slack_mappings(application_thread_id);

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
    `);

        console.log('✅ Tables `slack_mappings` and `pending_admin_replies` created successfully.');
    } catch (error) {
        console.error('❌ Error creating tables:', error);
        process.exit(1);
    }
}

main().then(() => process.exit(0));
