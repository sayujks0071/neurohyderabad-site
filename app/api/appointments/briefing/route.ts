import { NextRequest, NextResponse } from 'next/server';
import { sendPreAppointmentBriefingEmail } from '@/lib/email';

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

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    const geminiResponse = await fetch(`${baseUrl}/api/gemini-files/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchType: 'patient-education',
        condition: trimmedCondition,
        query: `${trimmedProcedure} preparation and recovery for ${trimmedCondition}`,
        tone: 'friendly',
        readingLevel: 'patient',
        temperature: 0.4,
      }),
    });

    if (!geminiResponse.ok) {
      throw new Error(`Gemini search failed with status ${geminiResponse.status}`);
    }

    const geminiData = await geminiResponse.json();
    const briefingContent = geminiData?.answer?.trim();

    if (!briefingContent) {
      throw new Error('Gemini search did not return briefing content');
    }

    const sections = {
      preparation: extractSection(briefingContent, SECTION_HEADINGS.preparation),
      whatToExpect: extractSection(briefingContent, SECTION_HEADINGS.whatToExpect),
      recovery: extractSection(briefingContent, SECTION_HEADINGS.recovery),
      questionsToAsk: extractSection(briefingContent, SECTION_HEADINGS.questionsToAsk),
    };
    const sources = formatSources(geminiData);

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
      return NextResponse.json(
        { error: emailResult.error || 'Failed to send briefing email' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: emailResult.messageId,
      sources,
      briefingLength: briefingContent.length,
    });
  } catch (error) {
    console.error('Pre-appointment briefing error:', error);
    return NextResponse.json(
      {
        error: 'Failed to send briefing',
        details: error instanceof Error ? error.message : 'Unknown error',
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

function formatSources(geminiData: any): string[] | undefined {
  if (Array.isArray(geminiData?.sources) && geminiData.sources.length > 0) {
    return geminiData.sources.map(
      (source: { fileName?: string; uri?: string }) => source.fileName || source.uri
    );
  }

  if (Array.isArray(geminiData?.usedFiles) && geminiData.usedFiles.length > 0) {
    return geminiData.usedFiles;
  }

  return undefined;
}
