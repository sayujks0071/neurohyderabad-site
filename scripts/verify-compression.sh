#!/usr/bin/env bash

# Compression and Caching Verification Script
# Verifies Brotli/Gzip compression and static asset caching

URL="https://www.drsayuj.com"

echo "🔍 Compression and Caching Verification"
echo "======================================="
echo "Site URL: $URL"
echo ""

# Check HTML compression
echo "📦 Checking HTML compression..."
content_encoding=$(curl -sI "$URL/" | grep -i "content-encoding" | cut -d' ' -f2- | tr -d '\r')
if [ -n "$content_encoding" ]; then
    echo "✅ Content Encoding: $content_encoding"
    if [[ "$content_encoding" == *"br"* ]]; then
        echo "   🎯 Brotli compression detected!"
    elif [[ "$content_encoding" == *"gzip"* ]]; then
        echo "   ✅ Gzip compression detected"
    fi
else
    echo "❌ No content encoding header found"
    echo "   ⚠️  Compression may not be working properly"
fi
echo ""

# Check static asset caching
echo "🗄️  Checking static asset caching..."
# Try to get a static asset URL (this might need adjustment based on actual build output)
static_url="$URL/_next/static/chunks/main.js"
cache_control=$(curl -sI "$static_url" | grep -i "cache-control" | cut -d' ' -f2- | tr -d '\r')

if [ -n "$cache_control" ]; then
    echo "✅ Cache Control: $cache_control"
    if [[ "$cache_control" == *"max-age=31536000"* ]] && [[ "$cache_control" == *"immutable"* ]]; then
        echo "   🎯 Optimal cache headers for static assets!"
    elif [[ "$cache_control" == *"max-age"* ]]; then
        echo "   ⚠️  Cache headers present but may not be optimal"
    fi
else
    echo "❌ No cache control header found for static assets"
    echo "   ⚠️  Static asset caching may not be configured properly"
fi
echo ""

# Check if static asset exists
echo "🔍 Verifying static asset accessibility..."
status_code=$(curl -sI "$static_url" | head -n 1 | cut -d' ' -f2)
if [ "$status_code" = "200" ] || [ "$status_code" = "304" ]; then
    echo "✅ Static assets accessible (HTTP $status_code)"
else
    echo "⚠️  Static asset not found (HTTP $status_code)"
    echo "   This is normal if the build output has different chunk names"
fi
echo ""

echo "📋 Verification Summary"
echo "======================"
if [ -n "$content_encoding" ]; then
    echo "✅ Compression: Working"
else
    echo "❌ Compression: Needs attention"
fi

if [ -n "$cache_control" ] && [[ "$cache_control" == *"immutable"* ]]; then
    echo "✅ Static Caching: Optimal"
elif [ -n "$cache_control" ]; then
    echo "⚠️  Static Caching: Present but suboptimal"
else
    echo "❌ Static Caching: Needs configuration"
fi

echo ""
echo "🎯 Next Steps:"
echo "1. If compression is missing, check that compress: true is set in next.config.mjs"
echo "2. If caching is suboptimal, verify Vercel deployment settings"
echo "3. Run this script after each deployment to ensure settings persist"
echo ""
echo "🔗 Useful Commands:"
echo "curl -sI $URL/ | grep -i 'content-encoding'"
echo "curl -sI $URL/_next/static/chunks/main.js | grep -i 'cache-control'"
