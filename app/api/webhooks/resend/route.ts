import { NextResponse } from 'next/server';
import * as crypto from 'crypto';

const WEBHOOK_SECRET = process.env.RESEND_WEBHOOK_SECRET;

/**
 * Verify the Resend webhook signature using HMAC-SHA256.
 * Docs: https://resend.com/docs/dashboard/webhooks/verify-signature
 */
async function verifyResendSignature(request: Request, rawBody: string): Promise<boolean> {
    if (!WEBHOOK_SECRET) {
        console.error('[Resend Webhook] RESEND_WEBHOOK_SECRET is not configured.');
        return false;
    }

    const svixId = request.headers.get('svix-id');
    const svixTimestamp = request.headers.get('svix-timestamp');
    const svixSignature = request.headers.get('svix-signature');

    if (!svixId || !svixTimestamp || !svixSignature) {
        console.error('[Resend Webhook] Missing signature headers.');
        return false;
    }

    // Reject old messages (> 5 minutes) to prevent replay attacks
    const timestampMs = parseInt(svixTimestamp, 10) * 1000;
    if (Math.abs(Date.now() - timestampMs) > 5 * 60 * 1000) {
        console.error('[Resend Webhook] Timestamp too old — possible replay attack.');
        return false;
    }

    const signedContent = `${svixId}.${svixTimestamp}.${rawBody}`;
    // The secret is base64 encoded after the 'whsec_' prefix
    const secretBytes = Buffer.from(WEBHOOK_SECRET.replace('whsec_', ''), 'base64');
    const expectedSignature = crypto
        .createHmac('sha256', secretBytes)
        .update(signedContent)
        .digest('base64');

    // svix-signature can contain multiple signatures (e.g. "v1,<sig>")
    const signatures = svixSignature.split(' ').map((s) => s.split(',')[1]);
    const isValid = signatures.some((sig) => sig === expectedSignature);

    if (!isValid) {
        console.error('[Resend Webhook] Signature mismatch.');
    }
    return isValid;
}

export async function POST(request: Request) {
    try {
        const rawBody = await request.text();

        const isValid = await verifyResendSignature(request, rawBody);
        if (!isValid) {
            return NextResponse.json({ error: 'Unauthorized: Invalid signature.' }, { status: 401 });
        }

        const payload = JSON.parse(rawBody);
        const { type, data } = payload;

        console.log(`[Resend Webhook] Event: ${type}`, JSON.stringify(data, null, 2));

        // Route event types to handlers
        switch (type) {
            case 'email.sent':
            case 'email.delivered':
            case 'email.bounced':
            case 'email.complained':
                console.log(`[Resend Webhook] Email event: ${type} — ID: ${data?.email_id}`);
                break;
            case 'contact.created':
            case 'contact.deleted':
                console.log(`[Resend Webhook] Contact event: ${type} — ${data?.email}`);
                break;
            default:
                console.log(`[Resend Webhook] Unhandled event type: ${type}`);
        }

        return NextResponse.json({ success: true, received: type });
    } catch (error) {
        console.error('[Resend Webhook] Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error while processing webhook' },
            { status: 500 }
        );
    }
}
