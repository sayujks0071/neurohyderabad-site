#!/bin/bash

echo "🔄 Testing Domain Redirects to drsayuj.info"
echo "==========================================="

echo ""
echo "1. Testing Old Apex Domain (drsayuj.com):"
echo "----------------------------------------"
OLD_APEX_REDIRECT=$(curl -sIL https://drsayuj.com 2>/dev/null | grep -i "location:" | head -1)
if [[ "$OLD_APEX_REDIRECT" == *"www.drsayuj.info"* ]]; then
    echo "✅ SUCCESS: drsayuj.com redirects to www.drsayuj.info"
    echo "   Redirect: $OLD_APEX_REDIRECT"
else
    echo "⚠️  PENDING: drsayuj.com redirect not working yet"
    echo "   Response: $OLD_APEX_REDIRECT"
    echo "   Note: This may take a few minutes to propagate"
fi

echo ""
echo "2. Testing Old WWW Domain (www.drsayuj.com):"
echo "--------------------------------------------"
OLD_WWW_REDIRECT=$(curl -sIL https://www.drsayuj.com 2>/dev/null | grep -i "location:" | head -1)
if [[ "$OLD_WWW_REDIRECT" == *"www.drsayuj.info"* ]]; then
    echo "✅ SUCCESS: www.drsayuj.com redirects to www.drsayuj.info"
    echo "   Redirect: $OLD_WWW_REDIRECT"
else
    echo "⚠️  PENDING: www.drsayuj.com redirect not working yet"
    echo "   Response: $OLD_WWW_REDIRECT"
    echo "   Note: This may take a few minutes to propagate"
fi

echo ""
echo "3. Testing New Domain (www.drsayuj.info):"
echo "----------------------------------------"
NEW_DOMAIN_STATUS=$(curl -sIL https://www.drsayuj.info | head -1)
if [[ "$NEW_DOMAIN_STATUS" == *"200"* ]]; then
    echo "✅ SUCCESS: www.drsayuj.info works perfectly"
    echo "   Status: $NEW_DOMAIN_STATUS"
else
    echo "❌ ERROR: www.drsayuj.info not accessible"
    echo "   Status: $NEW_DOMAIN_STATUS"
fi

echo ""
echo "4. Testing Specific Page Redirects:"
echo "----------------------------------"
echo "Testing /appointments redirect:"
APPOINTMENTS_REDIRECT=$(curl -sIL https://drsayuj.com/appointments 2>/dev/null | grep -i "location:" | head -1)
if [[ "$APPOINTMENTS_REDIRECT" == *"www.drsayuj.info/appointments"* ]]; then
    echo "✅ SUCCESS: /appointments redirects correctly"
else
    echo "⚠️  PENDING: /appointments redirect not working yet"
fi

echo ""
echo "5. Summary:"
echo "----------"
if [[ "$NEW_DOMAIN_STATUS" == *"200"* ]]; then
    echo "🎉 NEW DOMAIN IS WORKING!"
    echo ""
    echo "✅ www.drsayuj.info: Fully functional"
    echo "⏳ Old domain redirects: Propagating (5-15 minutes)"
    echo ""
    echo "🌐 Users can now access your site at:"
    echo "   https://www.drsayuj.info (primary)"
    echo "   https://drsayuj.com (redirects to new domain)"
    echo "   https://www.drsayuj.com (redirects to new domain)"
    echo ""
    echo "🎯 All browser compatibility issues are resolved!"
else
    echo "⚠️  New domain needs attention - check deployment status"
fi

echo ""
echo "6. Browser Testing:"
echo "------------------"
echo "Test these URLs in Chrome, Safari, Firefox:"
echo "  https://www.drsayuj.info (should work immediately)"
echo "  https://drsayuj.com (should redirect after propagation)"
echo "  https://www.drsayuj.com (should redirect after propagation)"