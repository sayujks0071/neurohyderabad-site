# Jules Automations

This document explains the automated workflows managed by Jules for https://www.drsayuj.info.

## Overview

Jules runs scheduled GitHub Actions workflows to perform routine tasks such as SEO checks, PR reviews, and competitor analysis. These workflows automatically create GitHub issues with instructions (prompts) for Jules to execute.

## Schedules (UTC vs IST)

The workflows are scheduled using `cron` syntax based on UTC (Coordinated Universal Time). India Standard Time (IST) is UTC + 5:30.

Here is the current schedule for the automated tasks:

| Workflow | IST Time | UTC Time | Cron Expression |
| :--- | :--- | :--- | :--- |
| **SEO Reprint** | 08:00 | 02:30 | `30 2 * * *` |
| **PR & Deploy Check** | 08:45 | 03:15 | `15 3 * * *` |
| **Competitor Gap Scan** | 09:00 | 03:30 | `30 3 * * *` |
| **Rolling 7-Day SEO Summary** | 09:15 | 03:45 | `45 3 * * *` |
| **Local SEO Check** | 09:30 | 04:00 | `0 4 * * *` |

## Editing Prompt Files

The instructions (issue bodies) for each task are stored as Markdown files in the `jules-prompts/` directory.

To update the instructions for a specific task, simply edit the corresponding file:
- `jules-prompts/seo-reprint.md`
- `jules-prompts/pr-deploy-check.md`
- `jules-prompts/competitor-gap-scan.md`
- `jules-prompts/rolling-7d-seo-summary.md`
- `jules-prompts/local-seo-check.md`

Commit and push your changes. The next time the workflow runs, it will use the updated prompt.

## Pausing or Disabling Workflows

To pause or disable a specific workflow:
1. Go to the **Actions** tab in the GitHub repository.
2. Select the workflow you want to disable from the left sidebar.
3. Click the `...` (three dots) menu on the top right of the workflow runs list.
4. Select **Disable workflow**.

You can re-enable it later using the same menu.

## How Jules Picks Issues

Jules is configured to monitor the repository for new issues. When a scheduled workflow creates an issue, it automatically applies the label `jules`.

Jules identifies issues that need its attention by looking for this `jules` label. Once Jules picks up the issue, it will execute the instructions provided in the issue body. To prevent duplicates, the workflows check if an open issue with the same base title has been created in the last 24 hours before creating a new one.

## Note on Configurable Schedules

GitHub Actions does not natively support using workflow environment variables within the `on.schedule.cron` block. The cron schedule must be a hardcoded string in the YAML file. Therefore, to change a schedule, you must edit the cron string directly in the corresponding `.github/workflows/jules-*.yml` file.
