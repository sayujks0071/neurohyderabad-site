#!/bin/bash

echo "🧪 Testing SEO Optimization Deployment"
echo "======================================"

# Test new pages
echo "Testing new pages..."
curl -I https://www.drsayuj.com/best-neurosurgeon-in-hyderabad
echo ""

curl -I https://www.drsayuj.com/locations/banjara-hills
echo ""

curl -I https://www.drsayuj.com/locations/hitech-city
echo ""

curl -I https://www.drsayuj.com/locations/malakpet
echo ""

curl -I https://www.drsayuj.com/conditions/cervical-myelopathy-treatment-hyderabad
echo ""

curl -I https://www.drsayuj.com/services/epilepsy-surgery-hyderabad
echo ""

curl -I https://www.drsayuj.com/medical-disclaimer
echo ""

curl -I https://www.drsayuj.com/editorial-policy
echo ""

# Test HTML compression
echo "Testing HTML compression..."
curl -I -H "Accept-Encoding: gzip, deflate, br" https://www.drsayuj.com
echo ""

# Test enhanced pages
echo "Testing enhanced pages..."
curl -I https://www.drsayuj.com/services/brain-tumor-surgery-hyderabad
echo ""

echo "✅ Deployment test completed!"
echo ""
echo "Expected results:"
echo "- All new pages should return HTTP 200"
echo "- HTML compression should show Content-Encoding: gzip"
echo "- Enhanced pages should load with new content"
echo ""
echo "Next steps:"
echo "1. Implement GBP optimization using GBP_OPTIMIZATION_GUIDE.md"
echo "2. Monitor rankings for target keywords"
echo "3. Track performance in Google Search Console"
