# Jules Pre-Clone Git Config Issue

## Analysis

The error originates from Jules's internal infrastructure, not your repository.

### Findings

1. `setup_git_config` and `preclean_git_config` are Jules internal functions that run before cloning.
2. The error occurs during Jules's pre-clone environment setup, before your repository is accessed.
3. These functions are not in your codebase; they're part of Jules's Docker/VM setup scripts.

### Why we can't fix it directly

- The error happens before your repo is cloned
- Your `.jules-setup.sh` runs after cloning, so it can't prevent the error
- We don't have access to Jules's internal setup scripts

## Solutions

### Option 1: Report to Google/Jules support (recommended)

This is a Jules infrastructure issue. Report:
- Jules's `setup_git_config` function is failing
- Git config has `insteadOf` redirects pointing to `http://git@192.168.0.1:8080`
- This prevents cloning from GitHub

### Option 2: Use Jules Configuration UI

1. Go to your repository in Jules
2. Click Configuration → Initial Setup → Environment
3. Add a setup script that fixes git config (see `docs/JULES_PRE_CLONE_GIT_CONFIG_ISSUE.md`)

Note: This may still run after the clone attempt, so it might not fully resolve the pre-clone issue.

### Option 3: Workaround in API prompt

I've updated `scripts/jules-weekly-seo-automation.ts` to include git config fix instructions in the prompt sent to Jules. This may help if Jules can execute them early enough.

## Recommendation

Report this to Google/Jules support as a bug in their infrastructure. The `preclean_git_config` function should handle these redirects, but it's failing. This is likely affecting other users too.

In the meantime, try Option 2 (Jules Configuration UI) to see if adding a setup script helps, though it may not fully resolve the pre-clone issue.
