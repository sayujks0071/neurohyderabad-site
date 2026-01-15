import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const task = searchParams.get('task');

  if (!task) {
    return NextResponse.json({ error: 'Missing task parameter' }, { status: 400 });
  }

  const promptFileMap: Record<string, string> = {
    'seo-reprint': 'seo-reprint.md',
    'pr-deploy-check': 'pr-deploy-check.md',
    'competitor-gap-scan': 'competitor-gap-scan.md',
    'rolling-7d-seo-summary': 'rolling-7d-seo-summary.md',
    'local-seo-check': 'local-seo-check.md',
  };

  const fileName = promptFileMap[task];
  if (!fileName) {
    return NextResponse.json({ error: 'Invalid task' }, { status: 400 });
  }

  // Read Prompt File
  // Note: This relies on the file being available in the serverless environment.
  const promptPath = path.join(process.cwd(), 'jules-prompts', fileName);
  let promptContent = '';
  try {
    promptContent = fs.readFileSync(promptPath, 'utf8');
  } catch (error) {
    console.error(`Error reading prompt file: ${error}`);
    return NextResponse.json({ error: 'Failed to read prompt file. Ensure jules-prompts/ is included in the build.' }, { status: 500 });
  }

  // GitHub API Interaction
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  // Fallback defaults if env vars are missing
  const REPO_OWNER = process.env.VERCEL_GIT_REPO_OWNER || 'sayujks0071';
  const REPO_NAME = process.env.VERCEL_GIT_REPO_SLUG || 'neurohyderabad-site';

  if (!GITHUB_TOKEN) {
    return NextResponse.json({ error: 'Missing GITHUB_TOKEN environment variable' }, { status: 500 });
  }

  const date = new Date().toISOString().split('T')[0];
  const title = `[Jules] ${task.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} - ${date}`;

  try {
    // Check for existing issues
    const issuesRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues?state=open`, {
        headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
        }
    });

    if (!issuesRes.ok) {
        throw new Error(`Failed to fetch issues: ${issuesRes.statusText}`);
    }

    const issues = await issuesRes.json();
    const duplicate = issues.find((issue: any) => issue.title === title);

    if (duplicate) {
      return NextResponse.json({ message: 'Issue already exists', url: duplicate.html_url });
    }

    // Check if 'jules' label exists, create if not
    try {
        const labelRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/labels/jules`, {
            headers: { 'Authorization': `Bearer ${GITHUB_TOKEN}` }
        });
        if (labelRes.status === 404) {
            await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/labels`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${GITHUB_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: 'jules',
                    color: '000000',
                    description: 'Jules Automation'
                })
            });
        }
    } catch (e) {
        console.error('Error checking/creating label:', e);
        // Continue anyway
    }

    // Create Issue
    const createRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body: promptContent,
        labels: ['jules']
      })
    });

    if (!createRes.ok) {
         const err = await createRes.text();
         throw new Error(`Failed to create issue: ${err}`);
    }

    const newIssue = await createRes.json();
    return NextResponse.json({ message: 'Issue created', url: newIssue.html_url });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
