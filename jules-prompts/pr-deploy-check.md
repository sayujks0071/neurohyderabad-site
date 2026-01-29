# Daily PR & Deploy Check

Review the PRs merged in the last 24 hours.
1. Check for any build failures or reported regressions.
2. Verify that `AGENTS.md` instructions were followed (e.g., verifying work).
3. Check `reports/cwv-sentinel.json` for any performance regressions.
4. Briefly check for any new console errors in production if accessible.

**Action:**
- If issues are found, create a new bug report issue.
- If everything looks good, close this issue with a comment summarizing the check.

<!-- Jules Automation -->
