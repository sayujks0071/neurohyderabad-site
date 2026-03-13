#!/bin/bash
set -e

# Create output directory for today's health reports
REPORT_DIR="health-reports/daily-automation/$(date +%F)"
mkdir -p "$REPORT_DIR"

echo "Starting Daily OpenClaw Automation for $(date +%F)..."

# 1. QA Testing for the Contact/Appointment Form
echo "Running Form QA Test..."
npx playwright-cli open https://www.drsayuj.info --headed
npx playwright-cli snapshot
npx playwright-cli fill e12 "Ravi Kumar"
npx playwright-cli fill e13 "ravi@gmail.com"
npx playwright-cli fill e14 "98XXXXXXXX"
npx playwright-cli select e15 "Consultation"
# Skipping actual submission to avoid spamming the live clinic system
# npx playwright-cli click e20
npx playwright-cli screenshot --filename="$REPORT_DIR/form_test_result.png"
npx playwright-cli pdf --filename="$REPORT_DIR/form_test.pdf"

# 2. Mobile Responsiveness Audit
echo "Running Mobile Responsiveness Audit..."
npx playwright-cli open https://www.drsayuj.info
npx playwright-cli resize 375 812
npx playwright-cli screenshot --filename="$REPORT_DIR/mobile_375.png"

npx playwright-cli resize 768 1024
npx playwright-cli screenshot --filename="$REPORT_DIR/tablet_768.png"

npx playwright-cli resize 1440 900
npx playwright-cli screenshot --filename="$REPORT_DIR/desktop_1440.png"

# 3. WhatsApp Web Appointment Reminder Automation
echo "Running WhatsApp Appointment Reminder Automation..."
# Load saved session state to avoid QR code login in CI
npx playwright-cli -s=whatsapp state-load whatsapp_session.json || echo "Warning: No saved WhatsApp session found. Please run locally to authenticate first."
npx playwright-cli -s=whatsapp open https://web.whatsapp.com --persistent

npx playwright-cli fill e1 "Ravi Kumar"
npx playwright-cli click e5
npx playwright-cli type "Hi Ravi, reminder: your appointment with Dr. Sayuj is tomorrow at 10 AM. Reply to confirm. 🏥"
npx playwright-cli press Enter
npx playwright-cli screenshot --filename="$REPORT_DIR/whatsapp_sent.png"

echo "Automation complete. Artifacts saved to $REPORT_DIR/"
