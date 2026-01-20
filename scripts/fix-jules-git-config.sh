#!/bin/bash
# Fix git config issues for Jules cloning
# This script removes problematic git config redirects that prevent cloning

set -e

echo "🔧 Fixing git config for Jules..."

# Remove all insteadOf redirects that point to internal servers
echo "Removing problematic git config redirects..."

# Get all insteadOf configs
INSTEADOF_CONFIGS=$(git config --global --get-regexp 'url\..*\.insteadof' 2>/dev/null || true)

if [ -z "$INSTEADOF_CONFIGS" ]; then
  echo "✅ No insteadOf redirects found"
else
  echo "Found insteadOf configs:"
  echo "$INSTEADOF_CONFIGS"
  
  # Extract keys and remove them
  echo "$INSTEADOF_CONFIGS" | while IFS= read -r line; do
    if [ -n "$line" ]; then
      KEY=$(echo "$line" | cut -d' ' -f1)
      echo "Removing: $KEY"
      git config --global --unset-all "$KEY" 2>/dev/null || true
    fi
  done
  
  echo "✅ Removed problematic redirects"
fi

# Verify GitHub URLs work directly
echo ""
echo "Testing GitHub clone access..."
if git ls-remote https://github.com/sayujks0071/neurohyderabad-site.git HEAD > /dev/null 2>&1; then
  echo "✅ GitHub access verified"
else
  echo "⚠️  Warning: GitHub access test failed"
  echo "   This may indicate network or authentication issues"
fi

echo ""
echo "✅ Git config fix complete"
