#!/bin/bash
# Setup Middleware environment variables
# This script helps configure Middleware keys and tokens

echo "🔧 Middleware Configuration Setup"
echo "================================"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
  echo "Creating .env.local file..."
  touch .env.local
fi

# Agent API Key
echo "1. Agent API Key (for infrastructure monitoring)"
echo "   Key: fygjftkluglwjxlwyhqdwshcbwtvfavastli"
echo "   Used for: macOS/Kubernetes agent installation"
echo ""

# RUM Account Key
echo "2. RUM Account Key (for browser monitoring)"
echo "   Key: svxkmvkxzpkxtuyhsgmgdiyfjwkxtytiltea"
echo "   Used for: Browser RUM tracking and sourcemaps"
echo "   Location: app/_components/MiddlewareRUM.tsx, next.config.mjs"
echo ""

# API Access Token
echo "3. API Access Token (for programmatic API access)"
echo "   Generate from: https://hjptv.middleware.io → Settings → API Keys"
read -p "   Enter your API Access Token (or press Enter to skip): " access_token

if [ ! -z "$access_token" ]; then
  # Check if MIDDLEWARE_ACCESS_TOKEN already exists
  if grep -q "MIDDLEWARE_ACCESS_TOKEN" .env.local; then
    echo "   Updating existing MIDDLEWARE_ACCESS_TOKEN..."
    sed -i '' "s|MIDDLEWARE_ACCESS_TOKEN=.*|MIDDLEWARE_ACCESS_TOKEN=$access_token|" .env.local
  else
    echo "   Adding MIDDLEWARE_ACCESS_TOKEN..."
    echo "" >> .env.local
    echo "# Middleware API Configuration" >> .env.local
    echo "MIDDLEWARE_ACCESS_TOKEN=$access_token" >> .env.local
    echo "MIDDLEWARE_API_URL=https://hjptv.middleware.io/api/v1" >> .env.local
  fi
  echo "   ✅ API Access Token configured"
else
  echo "   ⏭️  Skipping API Access Token (add manually to .env.local)"
fi

echo ""
echo "📝 Configuration Summary:"
echo "   - Agent API Key: Configured in installation scripts"
echo "   - RUM Account Key: Configured in code"
if [ ! -z "$access_token" ]; then
  echo "   - API Access Token: Configured in .env.local"
else
  echo "   - API Access Token: Not configured (add to .env.local)"
fi

echo ""
echo "📚 Documentation:"
echo "   - Configuration Guide: docs/middleware-configuration.md"
echo "   - API Integration: docs/middleware-api-integration.md"
echo "   - RUM Integration: docs/middleware-rum-integration.md"
echo ""
echo "✅ Setup complete!"
