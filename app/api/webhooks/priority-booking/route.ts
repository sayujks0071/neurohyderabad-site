import { NextResponse } from 'next/server';
import { EmailService } from '../../../../src/lib/email';

/**
 * Priority booking webhook for urgent cases detected by the AI MRI Assessor.
 * OpenClaw calls this when it detects critical findings in a patient's report.
 * It sends a high-priority email alert to the clinic admin.
 */
export async function POST(request: Request) {
    try {
        const payload = await request.json();
        const {
            name,
            phone,
            findings,
            urgencyLevel = 'urgent',
            reportType = 'MRI',
            source = 'whatsapp_mri_assessor',
        } = payload;

        if (!name || !findings) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields: name or findings.' },
                { status: 400 }
            );
        }

        console.log(
            `[Priority Booking] ${urgencyLevel.toUpperCase()} case: ${name} — ${reportType}`
        );

        // Send a high-priority alert to the clinic admin
        const emailResult = await EmailService.sendAppointmentRequestAlert({
            patientName: name,
            age: 'Not specified (via WhatsApp report)',
            gender: 'Not specified',
            appointmentDate: 'URGENT — Earliest available',
            appointmentTime: 'Priority slot requested',
            reason: `[${reportType} REPORT ANALYSIS] ${findings}`,
            phone: phone || 'Reply via WhatsApp',
            source,
            triageResult: {
                urgencyLevel,
                urgencyScore: urgencyLevel === 'emergency' ? 10 : 7,
                recommendedAction:
                    urgencyLevel === 'emergency'
                        ? 'Immediate consultation required — call patient NOW'
                        : 'Priority slot within 24 hours recommended',
                reasoning: `AI analysis of ${reportType} report detected critical findings: ${findings}`,
            },
        });

        if (!emailResult?.success) {
            console.error('[Priority Booking] Email alert failed:', emailResult?.error);
        }

        return NextResponse.json({
            success: true,
            message: `Priority booking alert sent for ${name}.`,
            urgencyLevel,
        });
    } catch (error) {
        console.error('[Priority Booking] Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error.' },
            { status: 500 }
        );
    }
}
