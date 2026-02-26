# Jules Automations

This repository uses GitHub Actions to schedule daily SEO and maintenance tasks managed by the Jules AI agent.

## Schedules (UTC vs IST)

GitHub Actions schedules run in UTC. We have configured them to map to Indian Standard Time (IST), which is UTC + 5:30.

| Workflow | IST Time | UTC Time | Cron Expression |
| :--- | :--- | :--- | :--- |
| **SEO Reprint** | 08:00 IST | 02:30 UTC | `30 2 * * *` |
| **PR & Deploy Check** | 08:45 IST | 03:15 UTC | `15 3 * * *` |
| **Competitor Gap Scan** | 09:00 IST | 03:30 UTC | `30 3 * * *` |
| **Rolling 7-Day SEO Summary** | 09:15 IST | 03:45 UTC | `45 3 * * *` |
| **Local SEO Check** | 09:30 IST | 04:00 UTC | `0 4 * * *` |

*Note: GitHub Actions schedules are approximate and may be delayed during periods of high load.*

## Editing Prompts

Each scheduled workflow creates a GitHub Issue using a prompt template located in the `jules-prompts/` directory.

To change the instructions given to Jules:
1. Edit the corresponding Markdown file in `jules-prompts/` (e.g., `jules-prompts/seo-reprint.md`).
2. Commit and push the changes to the `main` branch.
3. The next scheduled run will use the updated content as the issue body.

## Pausing or Disabling Workflows

You can pause or disable the workflows in two ways:

**Option 1: Using the Environment Variable (Recommended)**
1. Edit the workflow file in `.github/workflows/`.
2. Change the `JULES_ENABLED` environment variable to `false`.
   ```yaml
   env:
     JULES_ENABLED: false
   ```
3. Commit and push. The workflow will still trigger but will exit immediately without creating an issue.

**Option 2: GitHub UI**
1. Go to the **Actions** tab in the repository.
2. Select the workflow from the left sidebar.
3. Click the **...** (three dots) menu in the top right.
4. Select **Disable workflow**.

## How Jules Works

1. **Trigger:** At the scheduled time, the workflow runs.
2. **Enabled Check:** It checks if `JULES_ENABLED` is `true`.
3. **Duplicate Check:** It checks if an **open** issue already exists with the same title (which includes the current date, e.g., `[Jules] SEO Reprint Task - 2023-10-27`).
   - If found, it skips creation to avoid spam.
4. **Issue Creation:** If no duplicate exists, it creates a new issue.
5. **Labeling:** It applies the label `jules`.
   - Jules (the agent) monitors issues with this label to pick up tasks.

<!-- Documentation v2.4 - Verified setup -->
