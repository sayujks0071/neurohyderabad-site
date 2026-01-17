# Fixing Jules Git Config Issues

## Problem

Jules encounters an error when cloning the repository:
```
fatal: could not read Password for 'http://git@192.168.0.1:8080': No such device or address
```

This happens when git config has `insteadOf` redirects that point to internal git servers, preventing direct GitHub access.

## Solution

The `.jules-setup.sh` script has been updated to automatically fix this issue. However, if you still encounter problems:

### Manual Fix (if needed)

Run this before Jules clones:

```bash
# Remove all insteadOf redirects
git config --global --get-regexp 'url\..*\.insteadof' | while read line; do
  KEY=$(echo "$line" | cut -d' ' -f1)
  git config --global --unset-all "$KEY"
done

# Verify GitHub access
git ls-remote https://github.com/sayujks0071/neurohyderabad-site.git HEAD
```

### Alternative: Use the Fix Script

```bash
chmod +x scripts/fix-jules-git-config.sh
./scripts/fix-jules-git-config.sh
```

## What Changed

1. **Updated `.jules-setup.sh`**: Now removes problematic git config redirects before any git operations
2. **Created fix script**: `scripts/fix-jules-git-config.sh` for manual fixes
3. **Documentation**: This guide for troubleshooting

## Verification

After the fix, Jules should be able to clone:
```bash
git clone https://github.com/sayujks0071/neurohyderabad-site.git
```

If cloning still fails, check:
- Network connectivity to GitHub
- GitHub authentication (if using private repos)
- Firewall/proxy settings
