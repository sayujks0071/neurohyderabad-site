# Jules Automations

This document explains the daily scheduled GitHub Actions workflows configured to run Jules automations.

## How Schedules Work (UTC vs IST)

GitHub Actions schedule workflows using UTC (Coordinated Universal Time).
Indian Standard Time (IST) is UTC + 5:30.
Therefore, if we want an action to run at 08:00 IST, we schedule it for 02:30 UTC.

Here is the current schedule mapping for Jules automations:
- **SEO Reprint**: Daily 08:00 IST -> 02:30 UTC -> `cron: "30 2 * * *"`
- **PR Deploy Check**: Daily 08:45 IST -> 03:15 UTC -> `cron: "15 3 * * *"`
- **Competitor Gap Scan**: Daily 09:00 IST -> 03:30 UTC -> `cron: "30 3 * * *"`
- **Rolling 7D SEO Summary**: Daily 09:15 IST -> 03:45 UTC -> `cron: "45 3 * * *"`
- **Local SEO Check**: Daily 09:30 IST -> 04:00 UTC -> `cron: "0 4 * * *"`

## How to Edit Prompt Files

The content for each automated issue is driven by Markdown prompt files stored in the `/jules-prompts/` directory:
- `/jules-prompts/seo-reprint.md`
- `/jules-prompts/pr-deploy-check.md`
- `/jules-prompts/competitor-gap-scan.md`
- `/jules-prompts/rolling-7d-seo-summary.md`
- `/jules-prompts/local-seo-check.md`

To change the instructions Jules receives, simply modify these files in a PR and merge them into `main`. The next scheduled workflow run will automatically pick up the updated content.

## How to Pause or Disable Workflows

If you need to temporarily pause a workflow:
1. Navigate to the **Actions** tab in this GitHub repository.
2. Select the specific workflow on the left sidebar (e.g., "Jules: SEO Reprint").
3. Click the **...** menu in the top right corner of the workflow runs list.
4. Select **Disable workflow**.

To re-enable it, follow the same steps and select **Enable workflow**.

## How Jules Picks Issues

These workflows automatically apply the label `jules` to the created issues.
The Jules agent (or the GitHub App instance of Jules) is configured to look for issues with the `jules` label to automatically process and work on the tasks described in the issue body. The workflows also include logic to prevent duplicate issues if an open issue with the same base title already exists within the last 24 hours.
