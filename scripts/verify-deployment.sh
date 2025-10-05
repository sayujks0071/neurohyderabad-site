#!/bin/bash

# Deployment Verification Script
# Tests Brotli compression, cache headers, and performance metrics

SITE_URL="https://www.drsayuj.com"
STATIC_ASSETS_URL="https://www.drsayuj.com/_next/static/"

echo "🚀 Deployment Verification Script"
echo "================================="
echo "Site URL: $SITE_URL"
echo "Static Assets URL: $STATIC_ASSETS_URL"
echo ""

# Function to check HTTP status and headers
check_headers() {
    local url=$1
    local description=$2
    
    echo "🔍 Checking $description..."
    echo "URL: $url"
    
    # Get HTTP status and headers
    response=$(curl -sI "$url" 2>/dev/null)
    status_code=$(echo "$response" | head -n 1 | cut -d' ' -f2)
    
    if [ "$status_code" = "200" ] || [ "$status_code" = "304" ]; then
        echo "✅ Status: $status_code"
        
        # Check for Brotli compression
        content_encoding=$(echo "$response" | grep -i "content-encoding" | cut -d' ' -f2- | tr -d '\r')
        if [ -n "$content_encoding" ]; then
            echo "✅ Content Encoding: $content_encoding"
            if [[ "$content_encoding" == *"br"* ]]; then
                echo "   🎯 Brotli compression detected!"
            elif [[ "$content_encoding" == *"gzip"* ]]; then
                echo "   ⚠️  Gzip compression detected (Brotli preferred)"
            fi
        else
            echo "❌ No content encoding header found"
        fi
        
        # Check cache headers
        cache_control=$(echo "$response" | grep -i "cache-control" | cut -d' ' -f2- | tr -d '\r')
        if [ -n "$cache_control" ]; then
            echo "✅ Cache Control: $cache_control"
            if [[ "$cache_control" == *"max-age=31536000"* ]] && [[ "$cache_control" == *"immutable"* ]]; then
                echo "   🎯 Optimal cache headers for static assets!"
            elif [[ "$cache_control" == *"max-age"* ]]; then
                echo "   ⚠️  Cache headers present but may not be optimal"
            fi
        else
            echo "❌ No cache control header found"
        fi
        
        # Check for security headers
        security_headers=("x-frame-options" "x-content-type-options" "referrer-policy" "permissions-policy")
        for header in "${security_headers[@]}"; do
            header_value=$(echo "$response" | grep -i "$header" | cut -d' ' -f2- | tr -d '\r')
            if [ -n "$header_value" ]; then
                echo "✅ $header: $header_value"
            else
                echo "⚠️  Missing $header header"
            fi
        done
        
    else
        echo "❌ Status: $status_code"
    fi
    
    echo ""
}

# Function to test page load performance
test_performance() {
    local url=$1
    local description=$2
    
    echo "⚡ Testing $description performance..."
    
    # Use curl to measure load time
    start_time=$(date +%s%N)
    response=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    end_time=$(date +%s%N)
    
    if [ "$response" = "200" ]; then
        load_time=$(( (end_time - start_time) / 1000000 ))
        echo "✅ Load time: ${load_time}ms"
        
        if [ $load_time -lt 2000 ]; then
            echo "   🎯 Excellent load time!"
        elif [ $load_time -lt 3000 ]; then
            echo "   ✅ Good load time"
        else
            echo "   ⚠️  Load time could be improved"
        fi
    else
        echo "❌ Failed to load: HTTP $response"
    fi
    
    echo ""
}

# Function to check Core Web Vitals indicators
check_core_web_vitals() {
    echo "📊 Core Web Vitals Indicators..."
    
    # Check for optimized images
    echo "🔍 Checking image optimization..."
    image_response=$(curl -sI "$SITE_URL/images/og-default.jpg" 2>/dev/null)
    image_status=$(echo "$image_response" | head -n 1 | cut -d' ' -f2)
    
    if [ "$image_status" = "200" ]; then
        content_type=$(echo "$image_response" | grep -i "content-type" | cut -d' ' -f2- | tr -d '\r')
        echo "✅ Image accessible: $content_type"
        
        # Check for modern image formats
        if [[ "$content_type" == *"webp"* ]] || [[ "$content_type" == *"avif"* ]]; then
            echo "   🎯 Modern image format detected!"
        else
            echo "   ⚠️  Consider using WebP/AVIF for better performance"
        fi
    else
        echo "❌ Image not accessible: HTTP $image_status"
    fi
    
    echo ""
}

# Main verification
main() {
    echo "Starting deployment verification..."
    echo ""
    
    # Check main page
    check_headers "$SITE_URL" "Main Page"
    test_performance "$SITE_URL" "Main Page"
    
    # Check static assets
    check_headers "$STATIC_ASSETS_URL" "Static Assets"
    
    # Check specific service page
    check_headers "$SITE_URL/services/minimally-invasive-spine-surgery" "Service Page"
    test_performance "$SITE_URL/services/minimally-invasive-spine-surgery" "Service Page"
    
    # Check neighbourhood page
    check_headers "$SITE_URL/near/banjara-hills" "Neighbourhood Page"
    test_performance "$SITE_URL/near/banjara-hills" "Neighbourhood Page"
    
    # Check Core Web Vitals indicators
    check_core_web_vitals
    
    echo "🎯 Deployment Verification Summary"
    echo "================================="
    echo "✅ Main page accessibility verified"
    echo "✅ Static assets compression checked"
    echo "✅ Cache headers analyzed"
    echo "✅ Security headers reviewed"
    echo "✅ Performance metrics measured"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Monitor Core Web Vitals in Google Search Console"
    echo "2. Set up automated performance monitoring"
    echo "3. Optimize any slow-loading pages"
    echo "4. Consider implementing a CDN for global performance"
    echo ""
    echo "🔗 Useful Links:"
    echo "- Google PageSpeed Insights: https://pagespeed.web.dev/"
    echo "- GTmetrix: https://gtmetrix.com/"
    echo "- WebPageTest: https://www.webpagetest.org/"
}

# Run main function
main
