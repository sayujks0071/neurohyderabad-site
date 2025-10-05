#!/bin/bash

echo "🧪 Testing Bulletproof Redirect System"
echo "======================================"

# Test 1: HTTP apex domain (should redirect to HTTPS www)
echo "Test 1: HTTP apex domain"
curl -I http://drsayuj.com 2>/dev/null | grep -E "(HTTP|Location)"
echo ""

# Test 2: HTTPS apex domain (should redirect to HTTPS www)
echo "Test 2: HTTPS apex domain"
curl -I https://drsayuj.com 2>/dev/null | grep -E "(HTTP|Location)"
echo ""

# Test 3: HTTPS www domain (should return 200)
echo "Test 3: HTTPS www domain"
curl -I https://www.drsayuj.com 2>/dev/null | grep -E "(HTTP|Location)"
echo ""

# Test 4: HTTP apex with path and query (should preserve path/query)
echo "Test 4: HTTP apex with path and query"
curl -I 'http://drsayuj.com/endoscopic-spine-surgery?ref=test' 2>/dev/null | grep -E "(HTTP|Location)"
echo ""

# Test 5: HTTPS apex with path and query (should preserve path/query)
echo "Test 5: HTTPS apex with path and query"
curl -I 'https://drsayuj.com/services/minimally-invasive-spine-surgery?utm_source=google' 2>/dev/null | grep -E "(HTTP|Location)"
echo ""

echo "✅ All tests completed!"
echo ""
echo "Expected results:"
echo "- Tests 1,2,4,5: Should show Location: https://www.drsayuj.com/..."
echo "- Test 3: Should show HTTP/2 200 (no Location header)"
