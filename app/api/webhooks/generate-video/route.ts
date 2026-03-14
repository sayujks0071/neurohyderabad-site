import { NextResponse } from 'next/server';

/**
 * Video generation webhook for OpenClaw.
 *
 * Accepts a topic, script key-points, and optional CTA from the AI agent,
 * then triggers a Remotion render of the BlogToReel composition (vertical
 * 1080×1920 for Instagram Reels / YouTube Shorts).
 *
 * The render runs as a background child-process and writes the MP4 to
 * `public/generated-videos/`.  Once the video is ready, the agent can
 * deliver the download link via WhatsApp.
 */
export async function POST(request: Request) {
    try {
        const payload = await request.json();
        const {
            title,
            subtitle = 'Evidence-based insights from Dr. Sayuj Krishnan',
            category = 'Neurosurgery',
            keyPoints,
            callToAction = 'Book a consultation at www.drsayuj.info/appointments',
        } = payload;

        if (!title || !keyPoints || !Array.isArray(keyPoints) || keyPoints.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Missing required fields: title (string) and keyPoints (array of {heading, body, icon}).',
                },
                { status: 400 }
            );
        }

        // Sanitise the slug for the output file name
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
            .slice(0, 60);
        const datestamp = new Date().toISOString().slice(0, 10);
        const outputFileName = `${datestamp}-${slug}.mp4`;

        // Construct the Remotion input-props JSON
        const inputProps = {
            title,
            subtitle,
            category,
            readTime: '30 sec',
            authorName: 'Dr. Sayuj Krishnan',
            callToAction,
            keyPoints: keyPoints.map(
                (kp: { heading: string; body: string; icon?: string }) => ({
                    heading: kp.heading,
                    body: kp.body,
                    icon: kp.icon || '💡',
                })
            ),
        };

        // Start the Remotion render as a background child-process.
        // We use the Remotion CLI (`npx remotion render`) which is already
        // installed as a project-level dependency.
        const { exec } = await import('child_process');

        const renderCommand = [
            'npx remotion render',
            'BlogToReel',
            `public/generated-videos/${outputFileName}`,
            `--props='${JSON.stringify(inputProps)}'`,
            '--timeout=120000',
        ].join(' ');

        console.log(`[Video Generate] Starting render: ${outputFileName}`);
        console.log(`[Video Generate] Command: ${renderCommand}`);

        exec(
            renderCommand,
            { cwd: process.cwd(), maxBuffer: 10 * 1024 * 1024 },
            (error, stdout, stderr) => {
                if (error) {
                    console.error(`[Video Generate] Render FAILED for ${outputFileName}:`, error.message);
                    console.error('[Video Generate] stderr:', stderr);
                } else {
                    console.log(`[Video Generate] Render SUCCESS: ${outputFileName}`);
                    console.log('[Video Generate] stdout:', stdout.slice(-500));
                }
            }
        );

        // Return immediately — render runs in background
        const videoUrl = `https://www.drsayuj.info/generated-videos/${outputFileName}`;

        return NextResponse.json({
            success: true,
            message: `Video render started. It will be available at the URL below in ~2-5 minutes.`,
            videoUrl,
            outputFileName,
        });
    } catch (error) {
        console.error('[Video Generate] Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error while generating video.' },
            { status: 500 }
        );
    }
}
