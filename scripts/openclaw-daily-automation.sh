#!/bin/bash
set -e

echo "Starting Combined OpenClaw Daily Automation..."

# Create a directory for today's artifacts
ARTIFACT_DIR="reports/openclaw-daily-$(date +%F)"
mkdir -p "$ARTIFACT_DIR"

echo "=== 1. Form QA Testing ==="
playwright-cli open https://www.drsayuj.info --headed
playwright-cli snapshot
playwright-cli fill e12 "Ravi Kumar"
playwright-cli fill e13 "ravi@gmail.com"
playwright-cli fill e14 "98XXXXXXXX"
playwright-cli select e15 "Consultation"
playwright-cli click e20
playwright-cli screenshot --filename="$ARTIFACT_DIR/form_test_result.png"
playwright-cli pdf --filename="$ARTIFACT_DIR/form_test.pdf"

echo "=== 2. Mobile Responsiveness Audit ==="
playwright-cli open https://www.drsayuj.info
playwright-cli resize 375 812
playwright-cli screenshot --filename="$ARTIFACT_DIR/mobile_375.png"

playwright-cli resize 768 1024
playwright-cli screenshot --filename="$ARTIFACT_DIR/tablet_768.png"

playwright-cli resize 1440 900
playwright-cli screenshot --filename="$ARTIFACT_DIR/desktop_1440.png"

echo "=== 3. WhatsApp Web Appointment Reminder ==="
playwright-cli -s=whatsapp open https://web.whatsapp.com --persistent
playwright-cli state-save whatsapp_session.json

playwright-cli fill e1 "Ravi Kumar"
playwright-cli click e5
playwright-cli type "Hi Ravi, reminder: your appointment with Dr. Sayuj is tomorrow at 10 AM. Reply to confirm. 🏥"
playwright-cli press Enter
playwright-cli screenshot --filename="$ARTIFACT_DIR/whatsapp_sent.png"

echo "Automation completed successfully. Artifacts saved in $ARTIFACT_DIR."
