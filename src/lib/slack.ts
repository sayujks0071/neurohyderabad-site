import { db } from '@/src/lib/db';

interface SlackMessage {
    channel: string;
    text: string;
    thread_ts?: string;
    blocks?: any[];
}

export class SlackClient {
    private token: string;
    private signingSecret: string;
    private defaultChannel: string;

    constructor() {
        this.token = process.env.SLACK_BOT_TOKEN || '';
        this.signingSecret = process.env.SLACK_SIGNING_SECRET || '';
        this.defaultChannel = process.env.SLACK_DEFAULT_CHANNEL || '#general';

        if (!this.token) {
            console.warn('⚠️ SLACK_BOT_TOKEN is not set. Slack integration will be disabled.');
        }
    }

    /**
     * Post a message to a Slack channel
     */
    async postMessage(message: SlackMessage): Promise<any> {
        if (!this.token) return null;

        try {
            const response = await fetch('https://slack.com/api/chat.postMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                },
                body: JSON.stringify(message),
            });

            const data = await response.json();
            if (!data.ok) {
                console.error('Slack API error:', data.error);
                return null;
            }
            return data;
        } catch (error) {
            console.error('Error posting to Slack:', error);
            return null;
        }
    }

    /**
     * Post a system notification (e.g., error, new booking)
     */
    async notify(text: string, blocks?: any[]): Promise<any> {
        return this.postMessage({
            channel: this.defaultChannel,
            text,
            blocks,
        });
    }

    /**
     * Verify the request signature from Slack
     */
    verifySignature(signature: string, timestamp: string, body: string): boolean {
        if (!this.signingSecret) return false;

        const crypto = require('crypto');
        const hmac = crypto.createHmac('sha256', this.signingSecret);
        const [version, hash] = signature.split('=');

        // Check if timestamp is too old (replay attack)
        const fiveMinutesAgo = Math.floor(Date.now() / 1000) - 60 * 5;
        if (parseInt(timestamp) < fiveMinutesAgo) return false;

        const base = `${version}:${timestamp}:${body}`;
        hmac.update(base);
        const generatedHash = hmac.digest('hex');

        return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(generatedHash));
    }

    /**
     * Save mapping between Slack thread and App thread
     */
    async saveThreadMapping(slackThreadTs: string, appThreadId: string, channelId: string) {
        try {
            await db.query(`
        INSERT INTO slack_mappings (slack_thread_ts, application_thread_id, channel_id)
        VALUES ($1, $2, $3)
        ON CONFLICT (slack_thread_ts) DO NOTHING
      `, [slackThreadTs, appThreadId, channelId]);
        } catch (error) {
            console.error('Error saving Slack thread mapping:', error);
        }
    }

    /**
     * Save admin reply from Slack
     */
    async saveAdminReply(slackThreadTs: string, message: string, adminName?: string) {
        try {
            // Find app thread ID from mapping
            const mapping = await db.queryOne<{ application_thread_id: string }>(`
        SELECT application_thread_id FROM slack_mappings WHERE slack_thread_ts = $1
      `, [slackThreadTs]);

            if (mapping) {
                await db.query(`
          INSERT INTO pending_admin_replies (application_thread_id, message_text, admin_name, slack_ts)
          VALUES ($1, $2, $3, $4)
        `, [mapping.application_thread_id, message, adminName, slackThreadTs]);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error saving admin reply:', error);
            return false;
        }
    }

    /**
     * Get pending admin reply for an app thread
     */
    async getPendingReply(appThreadId: string) {
        try {
            const reply = await db.queryOne<{ id: number; message_text: string; admin_name: string }>(`
        SELECT id, message_text, admin_name 
        FROM pending_admin_replies 
        WHERE application_thread_id = $1 AND read_at IS NULL
        ORDER BY created_at ASC 
        LIMIT 1
      `, [appThreadId]);

            if (reply) {
                // Mark as read
                await db.query('UPDATE pending_admin_replies SET read_at = CURRENT_TIMESTAMP WHERE id = $1', [reply.id]);
                return reply;
            }
            return null;
        } catch (error) {
            console.error('Error getting pending reply:', error);
            return null;
        }
    }
}

export const slack = new SlackClient();
