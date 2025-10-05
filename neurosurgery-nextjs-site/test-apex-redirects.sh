#!/bin/bash

echo "🧪 Testing Apex Domain Redirects"
echo "================================"

# Test 1: Full redirect chain (HTTP → HTTPS → www)
echo "Test 1: Full redirect chain (HTTP apex domain)"
echo "Expected: HTTP/1.0 308 → HTTP/2 308 → HTTP/2 200"
curl -I -L http://drsayuj.com 2>/dev/null | grep -E "(HTTP|Location|Server)" | head -6

echo ""

# Test 2: HTTPS apex domain (second hop)
echo "Test 2: HTTPS apex domain (second hop)"
curl -I https://drsayuj.com 2>/dev/null | grep -E "(HTTP|Location|Server)"

echo ""

# Test 3: HTTPS www domain (final destination)
echo "Test 3: HTTPS www domain (final destination)"
curl -I https://www.drsayuj.com 2>/dev/null | grep -E "(HTTP|Location|Server)"

echo ""

# Test 4: Apex with path
echo "Test 4: Apex with path"
curl -I https://drsayuj.com/about 2>/dev/null | grep -E "(HTTP|Location|Server)"

echo ""

echo "✅ Expected Results:"
echo "- Test 1: Two-hop redirect chain (HTTP→HTTPS→www)"
echo "- Test 2: Should show 'Location: https://www.drsayuj.com/...'"
echo "- Test 3: Should show 'HTTP/2 200' (no Location header)"
echo "- Test 4: Should show 'Location: https://www.drsayuj.com/about'"
echo ""
echo "This is the expected Vercel behavior with two-hop redirects."
echo "Both hops are SEO-friendly and preserve link equity."
