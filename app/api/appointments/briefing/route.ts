import { NextRequest, NextResponse } from 'next/server';
import { sendPreAppointmentBriefingEmail } from '@/lib/email';
import { generatePatientEducation } from '@/src/lib/gemini/file-search';
import { rateLimit } from '@/src/lib/rate-limit';

// 🛡️ Sentinel: Ensure Node.js runtime for Gemini libraries
export const runtime = 'nodejs';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type BriefingRequestBody = {
  patientEmail: string;
  patientName: string;
  condition: string;
  procedureType: string;
  appointmentDate?: string;
};

const SECTION_HEADINGS = {
  preparation: ['Preparation', 'How to prepare'],
  whatToExpect: ['What to expect', 'During the procedure'],
  recovery: ['Recovery', 'After the procedure'],
  questionsToAsk: ['Questions', 'Questions to ask'],
};

export async function POST(request: NextRequest) {
  try {
    // 🛡️ Sentinel: Rate limit to prevent spam (5 requests per 10 mins per IP)
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
    const { success } = rateLimit(ip, 5, 10 * 60 * 1000);

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = (await request.json()) as Partial<BriefingRequestBody>;
    const { patientEmail, patientName, condition, procedureType, appointmentDate } = body;
    const trimmedEmail = patientEmail?.trim();
    const trimmedName = patientName?.trim();
    const trimmedCondition = condition?.trim();
    const trimmedProcedure = procedureType?.trim();

    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        { error: 'A valid patientEmail is required' },
        { status: 400 }
      );
    }

    if (!trimmedName || !trimmedCondition || !trimmedProcedure) {
      return NextResponse.json(
        { error: 'patientName, condition, and procedureType are required' },
        { status: 400 }
      );
    }

    // 🛡️ Sentinel: Call internal logic directly instead of insecure/failing fetch
    // Using explicit procedure + condition context for better content generation
    const searchContext = `${trimmedProcedure} for ${trimmedCondition}`;
    const { answer: briefingContent, sources: searchSources } = await generatePatientEducation(searchContext, []);

    if (!briefingContent) {
      throw new Error('Gemini generation returned empty content');
    }

    const sections = {
      preparation: extractSection(briefingContent, SECTION_HEADINGS.preparation),
      whatToExpect: extractSection(briefingContent, SECTION_HEADINGS.whatToExpect),
      recovery: extractSection(briefingContent, SECTION_HEADINGS.recovery),
      questionsToAsk: extractSection(briefingContent, SECTION_HEADINGS.questionsToAsk),
    };

    // Map sources from search result if available
    const sources: string[] = searchSources?.map(s => s.displayName) || [];

    const emailResult = await sendPreAppointmentBriefingEmail({
      patientEmail: trimmedEmail,
      patientName: trimmedName,
      condition: trimmedCondition,
      procedureType: trimmedProcedure,
      appointmentDate,
      briefingContent,
      sections,
      sources,
    });

    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send briefing email' },
        { status: 502 }
      );
    }

    // 🛡️ Sentinel: Log success with redacted PII
    console.log(`Briefing sent successfully to ${trimmedEmail[0]}***@${trimmedEmail.split('@')[1]}`);

    return NextResponse.json({
      success: true,
      messageId: 'messageId' in emailResult ? emailResult.messageId : undefined,
      sources,
      briefingLength: briefingContent.length,
    });
  } catch (error) {
    console.error('Pre-appointment briefing error:', error);
    return NextResponse.json(
      {
        error: 'Failed to send briefing',
        // 🛡️ Sentinel: Don't expose internal error details to client
        details: 'An internal error occurred',
      },
      { status: 500 }
    );
  }
}

function extractSection(content: string, headings: string[]): string | undefined {
  for (const heading of headings) {
    const regex = new RegExp(`${heading}:?\\s*\\n([\\s\\S]*?)(?=\\n\\s*\\n|$)`, 'i');
    const match = content.match(regex);
    if (match?.[1]) {
      return match[1].trim();
    }
  }
  return undefined;
}
