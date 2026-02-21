import { NextRequest, NextResponse } from 'next/server';
import { slack } from '@/src/lib/slack';
import { db } from '@/src/lib/db';

export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.text();
        const headers = {
            'x-slack-signature': req.headers.get('x-slack-signature') || '',
            'x-slack-request-timestamp': req.headers.get('x-slack-request-timestamp') || '',
        };

        // 1. Verify Request
        if (!slack.verifySignature(headers['x-slack-signature'], headers['x-slack-request-timestamp'], rawBody)) {
            // Allow challenge verification even if signature fails locally during dev/test if strict verification is off
            // But for production, this should return 401
            // For now, we'll log and assume failure unless it's a challenge
            const body = JSON.parse(rawBody);
            if (body.type === 'url_verification') {
                return NextResponse.json({ challenge: body.challenge });
            }

            console.error('❌ Invalid Slack signature');
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }

        const body = JSON.parse(rawBody);

        // 2. Handle URL Verification Challenge
        if (body.type === 'url_verification') {
            return NextResponse.json({ challenge: body.challenge });
        }

        // 3. Handle Event Callback
        if (body.type === 'event_callback') {
            const event = body.event;

            // Handle App Mention or Message
            if (event.type === 'app_mention' || (event.type === 'message' && !event.bot_id)) {
                await handleSlackMessage(event);
            }
        }

        return NextResponse.json({ ok: true });

    } catch (error) {
        console.error('Error handling Slack webhook:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

async function handleSlackMessage(event: any) {
    // Logic to handle reply from admin
    if (event.thread_ts) {
        console.log('🧵 Admin Reply in thread:', event.thread_ts);
        // Save the reply for the user
        // We assume the user is polling or will check on next message
        const saved = await slack.saveAdminReply(event.thread_ts, event.text, 'Dr. Sayuj (via Slack)');

        if (saved) {
            await slack.postMessage({
                channel: event.channel,
                text: "✅ Reply saved and queued for the user.",
                thread_ts: event.ts // Confirm in the reply thread
            });
        } else {
            await slack.postMessage({
                channel: event.channel,
                text: "⚠️ Could not find active session for this thread. Reply not delivered.",
                thread_ts: event.ts
            });
        }
    } else {
        // Direct message in channel (not a reply)
        // Could be a broadcast or command
        console.log('📬 Direct message:', event.text);
    }
}
