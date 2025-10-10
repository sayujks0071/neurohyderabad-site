#!/bin/bash

echo "🔍 Testing DNS Configuration for drsayuj.com"
echo "=============================================="

echo ""
echo "1. Testing Apex Domain (drsayuj.com):"
echo "-------------------------------------"
APEX_IP=$(dig +short A drsayuj.com | head -1)
echo "Current A record: $APEX_IP"

if [ "$APEX_IP" = "76.76.21.21" ]; then
    echo "✅ CORRECT: Apex points to Vercel's apex IP"
else
    echo "❌ WRONG: Apex should point to 76.76.21.21"
    echo "   Current: $APEX_IP"
    echo "   Expected: 76.76.21.21"
fi

echo ""
echo "2. Testing WWW Domain (www.drsayuj.com):"
echo "----------------------------------------"
WWW_CNAME=$(dig +short CNAME www.drsayuj.com)
WWW_A=$(dig +short A www.drsayuj.com | head -1)

if [ -n "$WWW_CNAME" ]; then
    echo "✅ CORRECT: WWW has CNAME record: $WWW_CNAME"
elif [ "$WWW_A" = "76.76.21.21" ] || [[ "$WWW_A" == 216.150.* ]]; then
    echo "⚠️  PARTIAL: WWW has A record: $WWW_A"
    echo "   Should use CNAME to cname.vercel-dns.com instead"
else
    echo "❌ WRONG: WWW domain configuration unclear"
fi

echo ""
echo "3. Testing Redirects:"
echo "--------------------"
echo "Testing apex → www redirect:"
APEX_REDIRECT=$(curl -sIL https://drsayuj.com | grep -i "location:" | head -1)
if [[ "$APEX_REDIRECT" == *"www.drsayuj.com"* ]]; then
    echo "✅ CORRECT: Apex redirects to www"
else
    echo "❌ WRONG: Apex redirect not working"
    echo "   Response: $APEX_REDIRECT"
fi

echo ""
echo "Testing www domain accessibility:"
WWW_STATUS=$(curl -sIL https://www.drsayuj.com | head -1)
if [[ "$WWW_STATUS" == *"200"* ]]; then
    echo "✅ CORRECT: WWW domain returns 200 OK"
else
    echo "❌ WRONG: WWW domain not accessible"
    echo "   Response: $WWW_STATUS"
fi

echo ""
echo "4. Summary:"
echo "----------"
if [ "$APEX_IP" = "76.76.21.21" ] && [ -n "$WWW_CNAME" ]; then
    echo "🎉 DNS CONFIGURATION IS CORRECT!"
    echo "   All browsers should work properly now."
else
    echo "⚠️  DNS CONFIGURATION NEEDS FIXING"
    echo "   Please update DNS records as specified in DNS_FIX_REQUIRED.md"
fi

echo ""
echo "5. Browser Testing Commands:"
echo "---------------------------"
echo "Test in Chrome/Chromium:"
echo "  curl -IL https://drsayuj.com"
echo "  curl -IL https://www.drsayuj.com"
echo ""
echo "Test in browser:"
echo "  https://drsayuj.com (should redirect to www)"
echo "  https://www.drsayuj.com (should load normally)"
