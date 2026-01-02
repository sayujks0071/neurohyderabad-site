# Maintenance Report

Generated: 2026-01-01

## Scope
- Merge Medic cleanup focused on dependency management and CI workflows.

## Fixes Applied
- Dependency management: removed package-lock.json and standardized on pnpm.
- Security overrides: undici ^5.29.0, esbuild ^0.25.0, tmp ^0.2.4 (plus existing path-to-regexp override).
- CI workflows: pnpm/action-setup + pnpm install, Node.js 20, and pnpm exec/dlx in place of npm/npx.

## Branch Status
- Current branch: main (local).
- Local branches present: copilot/fix-0f63a329-bdbb-4c72-a3fb-697c12f16736, deploy/button-fixes, pr-22-resolve, pr-33-resolve, pr-57, pr-6-resolve, pr-8-resolve.
- Remote branches: multiple feature/automation branches exist; not audited for parity with the changes above.
- Recommendation: rebase active PR branches or cherry-pick the CI/dependency changes if they touch workflows or package management.
