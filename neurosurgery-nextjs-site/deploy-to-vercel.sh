#!/bin/bash

echo "🚀 Deploying to Vercel..."
echo "========================="

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Deploy to Vercel
echo "Deploying current changes..."
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🧪 Test the apex domain redirect:"
echo "./test-apex-redirects.sh"
