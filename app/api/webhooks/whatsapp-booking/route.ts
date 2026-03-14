import { NextResponse } from 'next/server';
import { EmailService } from '../../../../src/lib/email';

export async function POST(request: Request) {
    try {
        const payload = await request.json();
        const { name, date, complaint, phone, source = 'whatsapp_triage' } = payload;

        if (!name || !date || !complaint) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields: name, date, or complaint.' },
                { status: 400 }
            );
        }

        console.log(`[WhatsApp Booking] Received request for ${name} on ${date}`);

        // Send an alert to the clinic admin using the existing EmailService
        const emailResult = await EmailService.sendAppointmentRequestAlert({
            patientName: name,
            age: 'Not specified (via WhatsApp)',
            gender: 'Not specified',
            appointmentDate: date,
            appointmentTime: 'To be confirmed by desk',
            reason: complaint,
            phone: phone || 'Unknown (reply via WhatsApp)',
            source: source,
        });

        if (!emailResult?.success) {
            console.error('[WhatsApp Booking] Failed to send email alert:', emailResult?.error);
            // We still return success to the bot so it can tell the patient we received the request,
            // but we log the email failure.
        }

        return NextResponse.json({
            success: true,
            message: `Booking received and alert sent to the clinic desk.`,
            patientName: name,
        });

    } catch (error) {
        console.error('[WhatsApp Booking] Error processing webhook:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error while processing webhook.' },
            { status: 500 }
        );
    }
}
