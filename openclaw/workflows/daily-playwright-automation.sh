#!/bin/bash
set -e

# Run the Playwright automation script using tsx with --yes flag for non-interactive CI environments
npx --yes tsx openclaw/workflows/daily-playwright-automation.ts
