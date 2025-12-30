#!/bin/bash

# Analytics Activation Script
echo "🚀 Activating Analytics for Dr. Sayuj Krishnan Website"
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✅ .env.local file exists"
    echo "📋 Current configuration:"
    cat .env.local
    echo ""
else
    echo "⚠️  .env.local file not found"
    echo "📝 Creating .env.local file..."
fi

echo "🔧 Choose your analytics provider:"
echo "1) Google Analytics 4 (Recommended)"
echo "2) Statsig"
echo "3) Skip (manual setup)"
echo ""

read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo "📊 Setting up Google Analytics 4..."
        echo ""
        read -p "Enter your GA4 Measurement ID (G-XXXXXXXXXX): " ga4_id
        if [ ! -z "$ga4_id" ]; then
            echo "NEXT_PUBLIC_GA4_MEASUREMENT_ID=$ga4_id" > .env.local
            echo "✅ GA4 configuration saved to .env.local"
        else
            echo "❌ No GA4 ID provided"
        fi
        ;;
    2)
        echo "📊 Setting up Statsig..."
        echo ""
        read -p "Enter your Statsig Client Key: " statsig_key
        if [ ! -z "$statsig_key" ]; then
            echo "NEXT_PUBLIC_STATSIG_CLIENT_KEY=$statsig_key" > .env.local
            echo "✅ Statsig configuration saved to .env.local"
        else
            echo "❌ No Statsig key provided"
        fi
        ;;
    3)
        echo "📝 Manual setup selected"
        echo "Please create .env.local with one of these options:"
        echo "NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX"
        echo "NEXT_PUBLIC_STATSIG_CLIENT_KEY=your-statsig-key"
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "🔄 Restarting development server..."
echo "Run: npm run dev"
echo ""
echo "🎯 Analytics will start tracking immediately:"
echo "   • Page views and scroll depth"
echo "   • CTA clicks (phone, WhatsApp, appointments)"
echo "   • Core Web Vitals performance"
echo "   • Error tracking"
echo ""
echo "📊 Check browser console for 'Analytics Event' logs"
echo "🚀 Ready to track conversions!"
