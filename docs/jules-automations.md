# Jules Automations

This document describes the daily scheduled automations managed by Jules (AI Agent) for SEO and maintenance tasks.

## Workflows & Schedules

The automations are defined in `.github/workflows/jules-*.yml` and run on the following daily schedule:

| Workflow | IST Time | UTC Time | Cron |
|----------|----------|----------|------|
| **SEO Reprint** | 08:00 AM | 02:30 | `30 2 * * *` |
| **PR & Deploy Check** | 08:45 AM | 03:15 | `15 3 * * *` |
| **Competitor Gap Scan** | 09:00 AM | 03:30 | `30 3 * * *` |
| **Rolling 7d Summary** | 09:15 AM | 03:45 | `45 3 * * *` |
| **Local SEO Check** | 09:30 AM | 04:00 | `0 4 * * *` |

*Note: GitHub Actions run in UTC. IST is UTC+5:30.*

## How it Works

1. **Schedule Trigger:** The workflow wakes up at the specified time.
2. **Read Prompt:** It reads the content of the corresponding markdown file in `jules-prompts/`.
3. **Create Issue:** It uses a GitHub Script to create a new Issue in this repository.
   - **Title:** Includes the workflow name and the current date (YYYY-MM-DD).
   - **Body:** The content of the prompt file.
   - **Label:** Adds the `jules` label.
4. **Duplicate Check:** If an open issue with the same title already exists (created within the last 24h usually), it skips creation to avoid noise.

## Editing Prompts

To change what Jules does for a specific task, simply edit the corresponding markdown file in `jules-prompts/`.
- Commit the changes to the `main` branch.
- The next scheduled run will pick up the new instructions.

## Pausing or Disabling

To stop a workflow from running:
1. Go to the **Actions** tab in the GitHub repository.
2. Select the workflow from the left sidebar.
3. Click the **...** (three dots) menu in the top right.
4. Select **Disable workflow**.

Alternatively, you can delete the workflow file from `.github/workflows/` or comment out the `schedule` block in the YAML file.

## Jules & The "jules" Label

Jules (the AI agent) monitors issues with the label `jules`. When a scheduled workflow creates an issue with this label, Jules will detect it, read the instructions, and attempt to perform the task (e.g., creating a PR, running an audit, etc.).
