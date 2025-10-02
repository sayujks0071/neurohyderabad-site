#!/bin/bash

echo "🧪 Testing Apex Domain Redirects"
echo "================================"

# Test 1: HTTP apex domain
echo "Test 1: HTTP apex domain"
curl -I http://drsayuj.com 2>/dev/null | grep -E "(HTTP|Location|Server)"

echo ""

# Test 2: HTTPS apex domain  
echo "Test 2: HTTPS apex domain"
curl -I https://drsayuj.com 2>/dev/null | grep -E "(HTTP|Location|Server)"

echo ""

# Test 3: HTTPS www domain (should work)
echo "Test 3: HTTPS www domain"
curl -I https://www.drsayuj.com 2>/dev/null | grep -E "(HTTP|Location|Server)"

echo ""

# Test 4: Apex with path
echo "Test 4: Apex with path"
curl -I https://drsayuj.com/about 2>/dev/null | grep -E "(HTTP|Location|Server)"

echo ""

echo "✅ Expected Results:"
echo "- Tests 1,2,4: Should show 'Location: https://www.drsayuj.com/...'"
echo "- Test 3: Should show 'HTTP/2 200' (no Location header)"
echo ""
echo "If any test shows 'Internal Error' or '500', the apex domain"
echo "is not properly configured in Vercel. Add drsayuj.com to your"
echo "Vercel project domains in Settings → Domains."
