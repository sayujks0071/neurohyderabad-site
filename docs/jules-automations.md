# Jules Automations

This repository uses scheduled GitHub Actions to create daily tasks for Jules (the AI agent). These tasks are created as GitHub Issues with the label `jules`.

## How it works

1.  **Schedules**: Several workflows run daily (early morning UTC, which is morning IST) defined in `.github/workflows/jules-*.yml`.
2.  **Issue Creation**: Each workflow uses `actions/github-script` to verify if an issue for "today" already exists (to prevent duplicates).
3.  **Prompts**: If no issue exists, it reads the content from the corresponding markdown file in `jules-prompts/` and creates a new issue.
4.  **Execution**: Jules (or an external listener) picks up issues with the `jules` label and executes the instructions found in the body.

## Workflows & Schedules

| Workflow | IST | UTC | Cron | Prompt File |
| :--- | :--- | :--- | :--- | :--- |
| **SEO Reprint** | 08:00 | 02:30 | `30 2 * * *` | `jules-prompts/seo-reprint.md` |
| **PR Deploy Check** | 08:45 | 03:15 | `15 3 * * *` | `jules-prompts/pr-deploy-check.md` |
| **Competitor Gap** | 09:00 | 03:30 | `30 3 * * *` | `jules-prompts/competitor-gap-scan.md` |
| **SEO Summary (7d)** | 09:15 | 03:45 | `45 3 * * *` | `jules-prompts/rolling-7d-seo-summary.md` |
| **Local SEO Check** | 09:30 | 04:00 | `0 4 * * *` | `jules-prompts/local-seo-check.md` |

## Editing Prompts

To change what Jules does for a specific task, simply edit the corresponding markdown file in `jules-prompts/`.
For example, to change the instructions for the "Local SEO Check", edit `jules-prompts/local-seo-check.md`. The next time the workflow runs, it will use the new content.

## Pausing/Disabling

To stop a specific automation:
1.  Go to the "Actions" tab in GitHub.
2.  Select the workflow (e.g., "Jules SEO Reprint").
3.  Click the "..." menu and select "Disable workflow".

Alternatively, you can delete the workflow file or comment out the `schedule` trigger in the YAML file.

## Manual Trigger

All workflows are configured with `workflow_dispatch`, meaning you can manually trigger them from the "Actions" tab to test them or run them on-demand.
