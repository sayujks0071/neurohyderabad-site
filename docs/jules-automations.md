# Jules Automations

This repository uses **Vercel Cron Jobs** to schedule daily tasks for Jules (the AI software engineer). These automations create GitHub Issues labeled `jules` containing specific instructions (prompts) for maintenance, SEO, and quality assurance.

## How It Works

1.  **Scheduled Crons**: Vercel triggers the cron endpoint `/api/cron/jules` at specific times (defined in `vercel.json`).
2.  **API Route**: The endpoint (`app/api/cron/jules/route.ts`) reads the corresponding prompt file from `jules-prompts/`.
3.  **Issue Creation**: The API uses the GitHub API to create a new Issue with the prompt content and applies the label `jules`.
    - It requires the `GITHUB_TOKEN` environment variable to be set in Vercel.
    - It uses `VERCEL_GIT_REPO_OWNER` and `VERCEL_GIT_REPO_SLUG` to identify the repository.
4.  **Jules Pick-up**: Jules (or a developer) checks the `jules` label to find pending tasks.

## Schedules

The schedules are set in UTC to correspond to morning hours in IST (India Standard Time).

| Task | IST Time | UTC Time | Cron | Prompt File |
| :--- | :--- | :--- | :--- | :--- |
| **SEO Reprint** | 08:00 AM | 02:30 AM | `30 2 * * *` | `jules-prompts/seo-reprint.md` |
| **PR & Deploy Check** | 08:45 AM | 03:15 AM | `15 3 * * *` | `jules-prompts/pr-deploy-check.md` |
| **Competitor Gap Scan** | 09:00 AM | 03:30 AM | `30 3 * * *` | `jules-prompts/competitor-gap-scan.md` |
| **Rolling 7-Day Summary** | 09:15 AM | 03:45 AM | `45 3 * * *` | `jules-prompts/rolling-7d-seo-summary.md` |
| **Local SEO Check** | 09:30 AM | 04:00 AM | `0 4 * * *` | `jules-prompts/local-seo-check.md` |

## Editing Prompts

To change what Jules does for a specific task:
1.  Open the corresponding file in `jules-prompts/` (e.g., `jules-prompts/seo-reprint.md`).
2.  Edit the instructions. Markdown is supported.
3.  Commit and push the changes. The next scheduled run will use the updated content.

## Setup Requirements

For the automations to work, the following Environment Variables must be set in your Vercel Project Settings:

- `GITHUB_TOKEN`: A Personal Access Token (or similar) with `repo` (issues) permissions.

## Pausing or Disabling

To stop a specific automation:
1.  Remove the corresponding entry from `crons` in `vercel.json`.
2.  Deploy the change.

## Duplicate Prevention

The API checks for existing **open** issues with the same title (e.g., `[Jules] SEO Reprint Task - YYYY-MM-DD`). If one exists, a new one will *not* be created.
