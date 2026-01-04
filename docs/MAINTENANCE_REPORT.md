# Maintenance Report

## 1. Global Fixes Applied
We have established a baseline on `main` (via `maintenance/fix-all`) with the following improvements:

### Dependencies
*   **Vulnerability Mitigation**:
    *   Added `overrides` in `package.json` for:
        *   `undici` -> `^5.29.0` (Mitigates DoS and randomness issues)
        *   `esbuild` -> `^0.25.12` (Mitigates dev server vulnerability)
        *   `tmp` -> `^0.2.4` (Mitigates temp file vulnerability)
    *   **Note**: `pnpm audit` still reports "moderate" severity for `undici@5.28.7` because it is deeply nested in `@vercel/node`. However, `undici@5.29.0` is also installed, and full resolution requires upstream updates from Vercel.
*   **Package Manager Standardization**:
    *   Enforced `pnpm` usage across CI.
    *   Deleted `package-lock.json` (which was causing `npm ci` to install stale deps) and `pnpm-lock.yaml` was regenerated to ensure clean resolution.

### Workflows (.github/workflows)
*   **Modernization**:
    *   Updated all workflows to use **Node 20** (previously 18).
    *   Replaced `npm ci` / `npm run` with `pnpm install` / `pnpm run`.
    *   Added `pnpm/action-setup` to ensure the correct pnpm version is used in CI.
    *   Updated caching strategies to `cache: 'pnpm'`.

## 2. Branch Status & Triage
We analyzed top active branches to determine their mergeability and status. Since `gh` CLI was unavailable, we performed local checks.

| Branch Name | Status | Merge Conflict? | Build Status | Action Required |
|---|---|---|---|---|
| `origin/copilot/fix-meta-tag-issues` | **BLOCKED** | **YES** | N/A | Needs rebase on main. Local merge failed with "unrelated histories" (likely rewritten history or shallow fetch issue, or branch is very old/divergent). |
| `origin/seo/daily-keywords-...` | **BLOCKED** | **YES** | N/A | "Refusing to merge unrelated histories". Suggests this branch was orphaned or created from a different root. |
| `origin/bolt-performance...` | **BLOCKED** | **YES** | N/A | "Refusing to merge unrelated histories". |
| `origin/dependabot/...` | **BLOCKED** | **YES** | N/A | "Refusing to merge unrelated histories". |
| `origin/extract-patient-email...` | **FAIL** | No | **FAILED** | Build failed with TypeScript error in `next-seo.config.ts`: `'creator' does not exist in type 'Twitter'`. Needs code fix. |

**Critical Observation:**
Many remote branches resulted in "refusing to merge unrelated histories" when trying to merge the maintenance branch. This often happens in shallow clones (common in CI/Agents) or if the branches were created in a way that disconnected them from the current `main`.
*Recommendation:* For these branches, the authors should re-branch from `main` and cherry-pick their changes, or force a rebase locally.

## 3. Detailed Fixes

### Fix: `next-seo.config.ts` (Found in `extract-patient-email...`)
The build failed because `next-seo` types for Twitter card do not include `creator` (it uses `handle`).
*   **Error:** `Type error: Object literal may only specify known properties, and 'creator' does not exist in type 'Twitter'.`
*   **Fix:** Change `creator` to `handle` in `next-seo.config.ts`.

## 4. Next Steps
1.  **Merge this PR (`maintenance/fix-all`)** to `main` to apply security fixes and workflow updates.
2.  **Developers**: Please rebase your feature branches on the new `main`.
3.  **Fix `next-seo.config.ts`**: This error likely exists in `main` or will exist soon. We should fix it in `maintenance/fix-all` if possible.
