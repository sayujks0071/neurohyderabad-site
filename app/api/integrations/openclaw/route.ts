import { NextRequest, NextResponse } from 'next/server';
import { secureCompare } from '@/src/lib/security';
import { appointments, patients } from '@/src/lib/db';
import { processBooking } from '@/src/lib/appointments/service';
import { locations } from '@/src/data/locations';
import type { BookingData } from '@/packages/appointment-form/types';

export const dynamic = 'force-dynamic';

const SERVICES = [
  { name: 'Minimally Invasive Spine Surgery', url: '/services/minimally-invasive-spine-surgery' },
  { name: 'Endoscopic Discectomy', url: '/services/endoscopic-discectomy-hyderabad' },
  { name: 'Brain Tumor Surgery', url: '/services/brain-tumor-surgery-hyderabad' },
  { name: 'Awake Spine Surgery', url: '/services/awake-spine-surgery-hyderabad' },
  { name: 'Spinal Fusion Surgery', url: '/services/spinal-fusion-surgery-hyderabad' },
  { name: 'Kyphoplasty & Vertebroplasty', url: '/services/kyphoplasty-vertebroplasty-hyderabad' },
  { name: 'Epilepsy Surgery', url: '/services/epilepsy-surgery-hyderabad' },
  { name: 'Peripheral Nerve Surgery', url: '/services/peripheral-nerve-surgery-hyderabad' },
  { name: 'Cooled Radiofrequency Ablation', url: '/services/cooled-radiofrequency-ablation-hyderabad' },
  { name: 'Robotic Spine Surgery', url: '/services/robotic-spine-surgery-hyderabad' },
];

function validateApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-api-key');
  const validApiKey = process.env.OPENCLAW_API_KEY;
  if (!validApiKey || !apiKey) return false;
  return secureCompare(apiKey, validApiKey);
}

export async function GET(request: NextRequest) {
  try {
    if (!validateApiKey(request)) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid or missing API key' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const tool = searchParams.get('tool');

    if (!tool) {
      return NextResponse.json({
        message: 'OpenClaw Integration API',
        tools: ['dashboard', 'appointments', 'patients', 'get_services', 'get_locations', 'check_availability', 'book_appointment'],
        usage: '?tool=<tool_name> (use POST for book_appointment and check_availability)'
      });
    }

    switch (tool) {
      case 'get_services':
        return NextResponse.json({
          tool: 'get_services',
          data: SERVICES
        });

      case 'get_locations':
        return NextResponse.json({
          tool: 'get_locations',
          data: locations.map(loc => ({
            id: loc.id,
            name: loc.name,
            address: loc.address,
            phone: loc.telephone,
            slug: loc.slug
          }))
        });

      case 'dashboard': {
        const stats = await appointments.getStats();
        return NextResponse.json({
          tool: 'dashboard',
          data: stats
        });
      }

      case 'appointments': {
        let limit = parseInt(searchParams.get('limit') || '10');
        if (isNaN(limit)) limit = 10;

        // 🛡️ Sentinel: Enforce max limit to prevent DoS/data exfiltration
        if (limit > 100) limit = 100;
        if (limit < 1) limit = 1;

        const recent = await appointments.getRecent(limit);

        // Mask sensitive data if needed, or return as is (assuming API key holder is trusted)
        return NextResponse.json({
          tool: 'appointments',
          count: recent.length,
          data: recent
        });
      }

      case 'patients': {
        const email = searchParams.get('email');
        if (!email) {
          return NextResponse.json(
            { error: 'Missing Parameter', message: 'Email is required for patient lookup' },
            { status: 400 }
          );
        }

        const patient = await patients.findByEmail(email);
        if (!patient) {
          return NextResponse.json(
            { error: 'Not Found', message: `No patient found with email: ${email}` },
            { status: 404 }
          );
        }

        return NextResponse.json({
          tool: 'patients',
          data: patient
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid Tool', message: `Tool '${tool}' not supported via GET` },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('OpenClaw API Error (GET):', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!validateApiKey(request)) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid or missing API key' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const tool = searchParams.get('tool');
    const body = await request.json();

    if (!tool) {
       return NextResponse.json(
        { error: 'Missing Parameter', message: 'Tool parameter is required' },
        { status: 400 }
      );
    }

    switch (tool) {
      case 'book_appointment': {
        // Construct booking data from body
        const bookingData: BookingData = {
          patientName: body.patientName,
          email: body.email,
          phone: body.phone,
          age: body.age,
          gender: body.gender,
          appointmentDate: body.appointmentDate,
          appointmentTime: body.appointmentTime || '10:00',
          reason: body.reason,
          painScore: body.painScore ?? 0,
          mriScanAvailable: body.mriScanAvailable ?? false,
        };

        // Basic validation
        if (!bookingData.patientName || !bookingData.email || !bookingData.phone || !bookingData.appointmentDate) {
           return NextResponse.json(
              { error: 'Invalid Payload', message: 'Missing required booking fields (patientName, email, phone, appointmentDate)' },
              { status: 400 }
           );
        }

        const result = await processBooking(bookingData, {
            source: 'openclaw-agent',
            intakeNotes: body.intakeNotes,
            appointmentType: body.appointmentType
        });

        if (result.success) {
            return NextResponse.json({
                tool: 'book_appointment',
                status: 'success',
                data: result
            });
        } else {
             return NextResponse.json({
                tool: 'book_appointment',
                status: 'error',
                message: result.error || result.message
            }, { status: 500 });
        }
      }

      case 'check_availability': {
        const { date, time } = body;
        if (!date || !time) {
          return NextResponse.json(
            { error: 'Missing Parameter', message: 'date (YYYY-MM-DD) and time (HH:MM) are required' },
            { status: 400 }
          );
        }

        const count = await appointments.checkSlot(date, time);
        return NextResponse.json({
          tool: 'check_availability',
          data: {
            available: count === 0,
            date,
            time
          }
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid Tool', message: `Tool '${tool}' not supported via POST` },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('OpenClaw API Error (POST):', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
