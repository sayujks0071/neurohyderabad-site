# Jules Automations

This document explains the daily scheduled Jules automations inside this GitHub repository.

## How schedules work (UTC vs IST)

GitHub Actions cron schedules use UTC time. India Standard Time (IST) is UTC + 5:30.
Therefore, when setting a cron schedule, you need to subtract 5 hours and 30 minutes from the desired IST time to get the UTC equivalent.

Examples of configured schedules:
- `30 2 * * *` (02:30 UTC) = 08:00 IST
- `15 3 * * *` (03:15 UTC) = 08:45 IST
- `30 3 * * *` (03:30 UTC) = 09:00 IST
- `45 3 * * *` (03:45 UTC) = 09:15 IST
- `0 4 * * *` (04:00 UTC) = 09:30 IST

## How to edit prompt files

The prompt files are standard Markdown files located in the `/jules-prompts/` directory. Each workflow reads the body of an issue from the corresponding prompt file.
To edit the instructions given to Jules, simply edit the desired `.md` file in the `jules-prompts/` directory and push your changes. The next scheduled run will use the updated prompt.

Available prompt files include:
- `/jules-prompts/seo-reprint.md`
- `/jules-prompts/pr-deploy-check.md`
- `/jules-prompts/competitor-gap-scan.md`
- `/jules-prompts/rolling-7d-seo-summary.md`
- `/jules-prompts/local-seo-check.md`

## How to pause/disable workflows

If you need to temporarily pause an automation, you can do so from the GitHub Actions tab:
1. Go to the "Actions" tab in the repository.
2. Select the workflow you want to disable from the left sidebar.
3. Click the "..." (three dots) button in the upper right corner of the workflow runs list.
4. Click "Disable workflow".

To re-enable it, repeat the steps and click "Enable workflow".

Alternatively, you can modify the workflow file itself and comment out the `schedule` block.

## How Jules picks issues

The workflows create GitHub Issues with the body content from the prompt files. Each issue is automatically assigned the `jules` label.
Jules AI monitors the repository for issues with the `jules` label to pick up tasks and start working on them.
When a new issue is created, the title will include the current date to prevent confusion, and the workflow prevents duplicates by checking for existing open issues with the same title created in the last 24 hours.
