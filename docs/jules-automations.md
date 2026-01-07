# Jules Automations

This repository uses GitHub Actions to schedule daily tasks for Jules (the AI software engineer). These automations create GitHub Issues labeled `jules` containing specific instructions (prompts) for maintenance, SEO, and quality assurance.

## How It Works

1.  **Scheduled Workflows**: GitHub Actions run on a defined cron schedule (UTC).
2.  **Prompt Files**: Each workflow reads a Markdown file from `jules-prompts/`.
3.  **Issue Creation**: The workflow creates a new Issue with the content of the prompt file and applies the label `jules`.
4.  **Jules Pick-up**: Jules (or a developer) checks the `jules` label to find pending tasks.

## Schedules

The schedules are set in UTC to correspond to morning hours in IST (India Standard Time).

| Workflow | IST Time | UTC Time | Cron | Prompt File |
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

## Pausing or Disabling

To stop a specific automation:
1.  Go to the **Actions** tab in the GitHub repository.
2.  Select the workflow (e.g., "Jules SEO Reprint").
3.  Click the **...** (three dots) menu and select **Disable workflow**.

## Duplicate Prevention

The workflows are designed to check for existing **open** issues with the same title (e.g., `[Jules] SEO Reprint Task - YYYY-MM-DD`). If one exists, a new one will *not* be created. This prevents spamming if tasks are not completed immediately.
