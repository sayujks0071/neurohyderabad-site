# Maintenance Report

## Scope
This document tracks maintenance activities and improvements made to the codebase.

## Recent Fixes

### Dependency Management
- Removed package-lock.json and standardized on pnpm
- Security overrides: undici ^5.29.0, esbuild ^0.25.0, tmp ^0.2.4 (plus existing path-to-regexp override)

### CI/CD Workflows
- Updated to use pnpm/action-setup + pnpm install
- Standardized on Node.js 20
- Replaced npm/npx with pnpm exec/dlx commands

## Notes
- This is a living document and should be updated as maintenance work is completed
- Branch-specific information should not be included here as it becomes stale quickly
