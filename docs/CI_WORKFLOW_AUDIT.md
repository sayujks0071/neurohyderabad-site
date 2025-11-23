# CI Workflow Audit

## Current State

### Blog Workflows
1. **`blog-auto-schedule.yml`**
   - **Trigger:** Schedule (Daily 6:00 AM IST), Manual.
   - **Action:** Runs `npm run blog:generate-today` and `npm run blog:auto-publish`.
   - **Issue:** Commits directly to `main`. No concurrency control.
2. **`blog-autodraft.yml`**
   - **Trigger:** Manual (`workflow_dispatch`).
   - **Action:** Runs `npm run new:blog`. Creates a PR.
   - **Status:** Good pattern (uses PRs).
3. **`blog-autopublish.yml`**
   - **Trigger:** Manual, Schedule (Hourly), Push to `main` (`content/blog/**`).
   - **Action:**
     - Manual: Generates post, commits directly to `main`.
     - Schedule/Push: Checks scheduled posts, publishes them, commits to `main`.
   - **Issue:** Direct push to `main`. Potential for infinite loops (though `GITHUB_TOKEN` pushes usually don't trigger workflows, it's fragile). Overlaps with `blog-auto-schedule.yml`.

### Audit & Quality Workflows
4. **`lighthouse-ci.yml`**
   - **Trigger:** Push/PR to `main`, Schedule (Daily).
   - **Action:** Builds app, runs Lighthouse.
   - **Issue:** Heavy build process. Runs on every push/PR.
5. **`auto-fix-ai.yml`**
   - **Trigger:** `workflow_run` (completed) of 7 other workflows.
   - **Action:** Aggregates artifacts, generates AI fixes, creates PR.
   - **Status:** Complex but innovative. High dependency on other workflows.

### Other Workflows (Inferred)
- `a11y-check.yml`, `broken-link-checker.yml`, `json-ld-validator.yml`, `meta-tag-checker.yml`, `image-optimization.yml`, `spell-check.yml`, `performance-monitor.yml`, `security-audit.yml`.
- **Observation:** Many separate workflows. Could potentially be grouped or optimized to avoid multiple `npm install` runs if they run on the same triggers.

## Proposed Strategy

### 1. Core CI (`ci.yml`)
- **Trigger:** PR to `main`, Push to `main`.
- **Jobs:**
  - `lint`: ESLint.
  - `build`: Next.js build (verifies buildability).
  - `test`: Unit tests (if available).
- **Optimization:** Cache `node_modules`. `concurrency` to cancel superseded runs.

### 2. Blog Pipeline
- **Refactor:** Consolidate into clearer flows.
- **`blog-generator.yml`**:
  - Trigger: Schedule (Daily), Manual.
  - Action: Generates content. **ALWAYS creates a PR**. No direct push to `main`.
- **`blog-publisher.yml`**:
  - Trigger: Schedule (Hourly).
  - Action: Checks for scheduled posts ready to publish. Updates frontmatter. Commits to `main` (acceptable for small metadata updates) or creates PR (safer).
  - **Constraint:** Ensure it doesn't trigger itself loop.

### 3. Scheduled Audits
- Keep existing audit workflows but ensure they don't run on every PR unless necessary.
- Maybe group lightweight checks (Lint, Spell, Links) into Core CI or a separate "Quality" workflow.

### 4. Deployment
- Assuming Vercel handles deployment automatically on push to `main`. No specific GitHub Action needed unless we want custom control.

## Next Steps
1. Create `ci.yml`.
2. Refactor blog workflows to use PRs and avoid direct pushes to `main` where possible.
3. Optimize caching and concurrency.
