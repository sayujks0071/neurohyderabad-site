# Jules Automations

This document explains the setup and usage of the scheduled GitHub Actions workflows that automatically create issues for Jules to work on.

## Overview

We have several scheduled workflows that run daily to automate SEO and repository health tasks. These workflows read markdown prompt files from the `/jules-prompts/` directory and create GitHub issues with the `jules` label.

## Schedules (UTC vs IST)

GitHub Actions cron schedules run in UTC. To convert IST (Indian Standard Time) to UTC, subtract 5 hours and 30 minutes.

*Note: GitHub Actions does not support using environment variables to configure cron schedules directly. These values must be hardcoded strings in the `.yml` workflow files. If you need to change a schedule, you must edit the `cron` value in the respective workflow file.*

The current schedules are:
- **SEO Reprint:** Daily at 08:00 IST (02:30 UTC) -> `30 2 * * *`
- **PR Deploy Check:** Daily at 08:45 IST (03:15 UTC) -> `15 3 * * *`
- **Competitor Gap Scan:** Daily at 09:00 IST (03:30 UTC) -> `30 3 * * *`
- **Rolling 7D SEO Summary:** Daily at 09:15 IST (03:45 UTC) -> `45 3 * * *`
- **Local SEO Check:** Daily at 09:30 IST (04:00 UTC) -> `0 4 * * *`

## How to Edit Prompt Files

To change what Jules does for a specific task, simply edit the corresponding markdown file in the `/jules-prompts/` directory:
- `/jules-prompts/seo-reprint.md`
- `/jules-prompts/pr-deploy-check.md`
- `/jules-prompts/competitor-gap-scan.md`
- `/jules-prompts/rolling-7d-seo-summary.md`
- `/jules-prompts/local-seo-check.md`

The contents of these files are directly used as the body of the generated GitHub issues.

## How to Pause/Disable Workflows

If you need to temporarily stop a workflow from running:
1. Go to the **Actions** tab in the GitHub repository.
2. Select the workflow you want to disable from the left sidebar.
3. Click the `...` (three dots) menu in the upper right corner of the workflow page.
4. Select **Disable workflow**.

You can re-enable it later using the same menu.

## How Jules Picks Issues

Jules is configured to look for issues with the `jules` label. The automated workflows automatically apply this label when creating new issues.

To prevent duplicate work, each workflow checks if an open issue with the same base title already exists (created within the last 24 hours) before creating a new one.
