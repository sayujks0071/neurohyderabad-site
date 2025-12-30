#!/bin/bash

echo "🚀 Setting up Statsig MCP for www.drsayuj.com"
echo "=============================================="

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found. Creating one..."
    touch .env.local
fi

# Check if Statsig client key is already set
if grep -q "NEXT_PUBLIC_STATSIG_CLIENT_KEY" .env.local; then
    echo "✅ Statsig client key already exists in .env.local"
else
    echo "📝 Adding Statsig client key placeholder to .env.local"
    echo "NEXT_PUBLIC_STATSIG_CLIENT_KEY=client-your-key-here" >> .env.local
fi

echo ""
echo "🔧 Next Steps:"
echo "1. Get your Statsig client key from https://console.statsig.com/"
echo "2. Replace 'client-your-key-here' in .env.local with your actual key"
echo "3. Add the same key to Vercel environment variables"
echo "4. Deploy your changes"
echo ""
echo "📊 Statsig Features Enabled:"
echo "✅ Analytics & Page Tracking"
echo "✅ Session Replay"
echo "✅ A/B Testing & Feature Flags"
echo "✅ Medical Practice Specific Tracking"
echo "✅ Performance Monitoring"
echo "✅ Error Tracking"
echo ""
echo "🎯 Medical Practice Tracking:"
echo "• Appointment bookings"
echo "• Service inquiries"
echo "• Contact form submissions"
echo "• Phone call clicks"
echo "• Patient journey analysis"
echo ""
echo "📈 Expected Benefits:"
echo "• Real-time performance monitoring"
echo "• User experience insights"
echo "• Conversion optimization"
echo "• Technical issue detection"
echo "• A/B testing for better conversions"
echo ""
echo "🔗 Useful Links:"
echo "• Statsig Dashboard: https://console.statsig.com/"
echo "• Documentation: https://docs.statsig.com/"
echo "• React Integration: https://docs.statsig.com/client/react"
echo ""
echo "✅ Setup complete! Add your Statsig client key and deploy."
