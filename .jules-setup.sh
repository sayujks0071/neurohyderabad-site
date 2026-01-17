#!/bin/bash
# Jules Environment Setup Script for neurohyderabad-site
# This script prepares the environment for Jules AI agent tasks

set -x  # Print commands
# Note: We don't use set -e because we want to continue even if checks have warnings

echo "🚀 Setting up neurohyderabad-site environment for Jules"
echo "=========================================================="

# Fix git config issues first (before any git operations)
echo ""
echo "🔧 Fixing git config for cloning..."
# Remove problematic insteadOf redirects that prevent GitHub cloning
INSTEADOF_CONFIGS=$(git config --global --get-regexp 'url\..*\.insteadof' 2>/dev/null || true)
if [ -n "$INSTEADOF_CONFIGS" ]; then
  echo "$INSTEADOF_CONFIGS" | while IFS= read -r line; do
    if [ -n "$line" ]; then
      KEY=$(echo "$line" | cut -d' ' -f1)
      echo "Removing git config: $KEY"
      git config --global --unset-all "$KEY" 2>/dev/null || true
    fi
  done
  echo "✅ Git config cleaned"
fi

# Display environment info
echo ""
echo "📋 Environment Information:"
echo "  Node.js: $(node -v)"
echo "  pnpm: $(pnpm -v 2>/dev/null || echo 'not installed')"
echo "  Python: $(python3 --version)"
echo "  Git: $(git --version)"
echo ""

# Verify Node.js version (Next.js 15 requires Node.js 18.17+)
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
  echo "⚠️  Warning: Node.js 18+ recommended for Next.js 15"
fi

# Install/use correct pnpm version
echo ""
echo "📦 Installing pnpm@9.15.0 (as specified in package.json)..."
if ! command -v pnpm &> /dev/null || [ "$(pnpm -v)" != "9.15.0" ]; then
  npm install -g pnpm@9.15.0
fi
pnpm --version

# Install dependencies
echo ""
echo "📦 Installing project dependencies..."
pnpm install --frozen-lockfile

# Verify installation
echo ""
echo "✅ Verifying installation..."
echo "  Installed packages: $(pnpm list --depth=0 2>/dev/null | wc -l) packages"

# Type checking (if TypeScript is available)
echo ""
echo "🔍 Running TypeScript type check..."
if pnpm exec tsc --noEmit > /tmp/tsc-output.log 2>&1; then
  echo "✅ TypeScript check passed"
else
  echo "⚠️  TypeScript check found issues (showing first 20 lines):"
  head -20 /tmp/tsc-output.log || true
fi

# Linting check
echo ""
echo "🔍 Running ESLint..."
if pnpm exec next lint > /tmp/lint-output.log 2>&1; then
  echo "✅ Linting passed"
else
  echo "⚠️  Linting found issues (showing first 30 lines):"
  head -30 /tmp/lint-output.log || true
fi

# Build verification (this validates the entire setup)
echo ""
echo "🏗️  Running build verification (this may take a few minutes)..."
BUILD_EXIT_CODE=0
pnpm run build > /tmp/build-output.log 2>&1 || BUILD_EXIT_CODE=$?

if [ $BUILD_EXIT_CODE -eq 0 ]; then
  echo "✅ Build completed successfully"
else
  echo "⚠️  Build encountered issues (showing last 50 lines):"
  tail -50 /tmp/build-output.log || true
  echo ""
  echo "⚠️  Build failed with exit code: $BUILD_EXIT_CODE"
  echo "   Full build log available at: /tmp/build-output.log"
fi

# Final status
echo ""
echo "=========================================================="
if [ $BUILD_EXIT_CODE -eq 0 ]; then
  echo "✅ Environment setup complete!"
  echo ""
  echo "📊 Summary:"
  echo "  ✓ Dependencies installed"
  echo "  ✓ Type checking completed"
  echo "  ✓ Linting completed"
  echo "  ✓ Build verification passed"
  echo ""
  echo "🎯 Ready for Jules tasks!"
else
  echo "⚠️  Environment setup completed with warnings"
  echo ""
  echo "📊 Summary:"
  echo "  ✓ Dependencies installed"
  echo "  ⚠️  Some checks had issues (see logs above)"
  echo ""
  echo "💡 Review the logs above to identify any issues"
fi
echo "=========================================================="

