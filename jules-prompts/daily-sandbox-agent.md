# Daily Sandbox Agent Workflow

**Goal:** Use OpenSandbox as a secure evaluation environment for daily, incremental improvements to `www.drsayuj.info`.

## Why OpenSandbox?
OpenSandbox provides a Docker/Kubernetes-backed execution environment. Instead of pushing code directly and waiting for Vercel/GitHub Actions to fail, Jules can use OpenSandbox to:
1.  **Test Code Interpreters:** Run complex python scripts or data analysis safely.
2.  **Verify Build/Lint:** Mount the Next.js app, run `pnpm install`, `pnpm lint`, or `npm run check:schemas` to catch errors before creating a Pull Request.
3.  **Run Coding Agents:** Execute autonomous agents (like Claude Code) inside a sandbox.

## Daily Routine Instructions for Jules

When executing the daily sandbox improvement task:
1.  **Spin up a Sandbox:** Use the `opensandbox` Python SDK (e.g., `Sandbox.create()`).
2.  **Inject the Agent/Task:** Use `sandbox.files.write_files` to upload a task runner or the modified source code.
3.  **Execute the Check:** Use `sandbox.commands.run` to run a health check, verify a build, or scrape new competitor gaps.
4.  **Extract Results:** Use `sandbox.files.read_file` to pull back the generated reports or verified code diffs.
5.  **Commit/PR:** Create a PR with the verified changes.

---

*This prompt is intended for automated scripts inside `scripts/daily-sandbox-task.py` and GitHub Actions `jules-daily-opensandbox.yml`.*
