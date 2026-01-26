#!/bin/bash
# Check website performance using Middleware insights
# This script helps correlate Middleware infrastructure metrics with website performance

echo "🔍 Website Performance Analysis with Middleware"
echo "================================================"
echo ""

# Check if Middleware Agent is running
echo "1. Middleware Agent Status:"
if sudo launchctl list | grep -q mw-agent 2>/dev/null; then
  echo "   ✅ Middleware Agent is running"
  sudo launchctl list | grep mw-agent | sed 's/^/      /'
else
  echo "   ❌ Middleware Agent not running"
  echo "   💡 Install with: ./scripts/install-middleware-macos.sh"
fi
echo ""

# Check website performance endpoints
echo "2. Website Performance Endpoints:"
echo "   - Core Web Vitals: Tracked via PerformanceMonitor component"
echo "   - API Health: https://www.drsayuj.info/api/search-console?action=health"
echo "   - Deployment Status: https://www.drsayuj.info/api/webhooks/vercel/status"
echo ""

# Check current performance metrics
echo "3. Current Performance Metrics:"
echo "   Checking API health..."
API_HEALTH=$(curl -s "https://www.drsayuj.info/api/search-console?action=health" 2>/dev/null | jq -r '.status // "unknown"' 2>/dev/null || echo "unknown")
if [ "$API_HEALTH" = "ok" ]; then
  echo "   ✅ API is healthy"
else
  echo "   ⚠️  API status: $API_HEALTH"
fi
echo ""

# Provide Middleware dashboard link
echo "4. Middleware Dashboard:"
echo "   🌐 Access: https://hjptv.middleware.io"
echo "   📊 Monitor: Infrastructure metrics, application performance, alerts"
echo ""

# Recommendations
echo "5. Improvement Recommendations:"
echo "   📈 Use Middleware to:"
echo "      - Monitor CPU/memory usage during peak traffic"
echo "      - Track API response times"
echo "      - Identify resource bottlenecks"
echo "      - Correlate infrastructure metrics with Core Web Vitals"
echo "      - Set up alerts for performance degradation"
echo ""

echo "💡 Next Steps:"
echo "   1. Access Middleware dashboard: https://hjptv.middleware.io"
echo "   2. Review infrastructure metrics"
echo "   3. Set up alerts for critical thresholds"
echo "   4. Correlate with website performance data"
echo "   5. Implement optimizations based on findings"
