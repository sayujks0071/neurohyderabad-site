# Jules Automations

This repository uses scheduled GitHub Actions to create "tasks" (GitHub Issues) for Jules (our AI engineer) to pick up daily. This ensures continuous maintenance and optimization of the codebase without manual intervention.

## Workflows

The workflows are located in `.github/workflows/` and are prefixed with `jules-`. They are configured to run on a daily schedule (IST mornings).

| Workflow | IST | UTC | Cron | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **SEO Reprint** | 08:00 | 02:30 | `30 2 * * *` | Identifies stale content for update. |
| **PR & Deploy Check** | 08:45 | 03:15 | `15 3 * * *` | Reviews recent PRs and deployments. |
| **Competitor Gap Scan** | 09:00 | 03:30 | `30 3 * * *` | Scans competitors for new content topics. |
| **Rolling 7-Day SEO** | 09:15 | 03:45 | `45 3 * * *` | Summarizes weekly SEO health. |
| **Local SEO Check** | 09:30 | 04:00 | `0 4 * * *` | Verifies local business signals. |

## How it works

1. **Schedule Trigger:** GitHub Actions triggers the workflow at the specified time.
2. **Read Prompt:** The workflow reads a markdown template from `jules-prompts/`.
3. **Check Duplicates:** It checks if an issue with the same title (including today's date) already exists to prevent spam.
4. **Create Issue:** If unique, it creates a new GitHub Issue with the content of the prompt file and applies the label `jules`.
5. **Jules Picks Up:** Jules (or an assigned engineer) monitors the `jules` label and executes the instructions in the issue body.

## Editing Prompts

To change what Jules does for a specific task, simply edit the corresponding markdown file in `jules-prompts/`.

Example: To add a new check to the "Local SEO Check", edit `jules-prompts/local-seo-check.md`.

## Pausing Automations

To pause a specific automation:
1. Go to the **Actions** tab in GitHub.
2. Select the workflow from the sidebar.
3. Click the **...** menu and select **Disable workflow**.

## Configuration

The prompt file path and the base title for the issue are configurable via the environment variables defined in each workflow file (e.g., `.github/workflows/jules-seo-reprint.yml`).

```yaml
env:
  PROMPT_FILE: jules-prompts/seo-reprint.md
  ISSUE_TITLE: "[Jules] SEO Reprint Task"
```

To change the schedule, you must edit the cron expression in the `on.schedule` section of the workflow YAML file.
Note: The schedule triggers are defined statically in the YAML `on: schedule` block and cannot be set via environment variables.

### Competitor Analysis
The "Competitor Gap Scan" workflow relies on the list of competitors defined in `AGENTS.md`. To add or remove competitors:
1. Edit `AGENTS.md` in the root directory.
2. Update the "Competitor Analysis" section.

## Troubleshooting

- **Issue not created:** Check the Action logs. Common reasons include GitHub API rate limits or the issue already existing.
- **Wrong Schedule:** Ensure you've converted IST to UTC correctly using a converter. GitHub Actions use UTC.
<!-- v1.4 - Verified -->
