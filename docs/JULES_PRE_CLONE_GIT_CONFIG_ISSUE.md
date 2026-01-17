# Jules Pre-Clone Git Config Issue

## Problem Analysis

The error you're seeing:
```
+ setup_git_config
+ preclean_git_config
fatal: could not read Password for 'http://git@192.168.0.1:8080': No such device or address
```

**This is NOT from our repository.** These functions (`setup_git_config`, `preclean_git_config`) are part of **Jules's own internal setup infrastructure** that runs **BEFORE** it clones your repository.

## Where the Error Originates

1. **Jules's Infrastructure**: Jules runs its own setup scripts in a Docker container/VM before cloning
2. **Pre-Clone Phase**: The error occurs during Jules's environment initialization, before our `.jules-setup.sh` can run
3. **Git Config Redirects**: Jules's environment has `git config` settings that redirect GitHub URLs to an internal server (`http://git@192.168.0.1:8080`)

## Why We Can't Fix It Directly

- ❌ The error happens **before** our repository is cloned
- ❌ We don't have access to Jules's internal setup scripts
- ❌ Our `.jules-setup.sh` runs **after** cloning, so it can't prevent the error
- ❌ The functions `setup_git_config` and `preclean_git_config` are not in our codebase

## Solutions

### Option 1: Report to Google/Jules Support (Recommended)

This is a **Jules infrastructure issue** that needs to be fixed by Google. Report it:

1. **Jules Support**: Contact Google Jules support about the git config redirect issue
2. **Issue Details**: 
   - Jules's internal `setup_git_config` function is failing
   - Git config has `insteadOf` redirects pointing to `http://git@192.168.0.1:8080`
   - This prevents cloning from GitHub
3. **Request**: Ask them to fix the `preclean_git_config` function to properly handle/remove these redirects

### Option 2: Include Instructions in API Session Prompt

We can try to include instructions in the Jules API session creation that tell Jules to fix git config first. However, this may not work if the error happens too early.

**Update the prompt** in `jules-prompts/weekly-seo-automation.md` to include:

```markdown
## Pre-requisite: Fix Git Config

Before starting any work, if you encounter git config issues preventing cloning:
1. Remove all `insteadOf` redirects: `git config --global --get-regexp 'url\..*\.insteadof' | while read line; do KEY=$(echo "$line" | cut -d' ' -f1); git config --global --unset-all "$KEY"; done`
2. Verify GitHub access: `git ls-remote https://github.com/sayujks0071/neurohyderabad-site.git HEAD`
```

### Option 3: Use Jules Configuration UI

According to Jules documentation, you can configure the environment through the Jules UI:

1. Go to your repository in Jules
2. Click **Configuration** → **Initial Setup** → **Environment**
3. Add a setup script that fixes git config **before** any operations:

```bash
#!/bin/bash
# Fix git config before any git operations
echo "Fixing git config..."
git config --global --get-regexp 'url\..*\.insteadof' | while IFS= read -r line; do
  if [ -n "$line" ]; then
    KEY=$(echo "$line" | cut -d' ' -f1)
    echo "Removing: $KEY"
    git config --global --unset-all "$KEY" 2>/dev/null || true
  fi
done
echo "Git config cleaned"
```

**Note**: This may still run after the clone attempt, so it might not solve the pre-clone issue.

### Option 4: Wait for Jules Infrastructure Fix

If this is a widespread issue, Google will likely fix it in a future Jules update. Monitor:
- Jules release notes
- Jules status page
- Jules community forums

## Current Status

✅ **What we've done:**
- Updated `.jules-setup.sh` to clean git config (runs after clone)
- Created `scripts/fix-jules-git-config.sh` (for manual fixes)
- Documented the issue

❌ **What we can't do:**
- Fix Jules's pre-clone setup scripts
- Prevent the error from occurring
- Access Jules's internal infrastructure

## Verification

To verify if the issue is resolved:

1. **Check Jules Logs**: Look for the `setup_git_config` and `preclean_git_config` functions in Jules's execution logs
2. **Test Clone**: If Jules can successfully clone, the issue is resolved
3. **Monitor**: Watch for similar errors in future Jules runs

## Next Steps

1. **Immediate**: Report this to Google/Jules support with the error details
2. **Short-term**: Try Option 3 (Jules Configuration UI) to see if it helps
3. **Long-term**: Wait for Jules infrastructure fix or workaround from Google

## References

- [Jules Environment Setup Documentation](https://jules.google/docs/environment)
- [Jules API Documentation](https://developers.google.com/jules/api)
- Our repository's `.jules-setup.sh` (runs after clone)
- Our repository's `docs/JULES_GIT_CONFIG_FIX.md` (post-clone fixes)

## Related Files

- `.jules-setup.sh` - Our setup script (runs after clone)
- `scripts/fix-jules-git-config.sh` - Manual fix script
- `docs/JULES_GIT_CONFIG_FIX.md` - Post-clone troubleshooting
- `jules-prompts/weekly-seo-automation.md` - Can be updated with git config instructions
