#!/bin/bash
set -euo pipefail

PLIST_NAME="info.drsayuj.vercel-log-drain"
PLIST_PATH="$HOME/Library/LaunchAgents/${PLIST_NAME}.plist"

if [ -f "$PLIST_PATH" ]; then
  launchctl unload "$PLIST_PATH" >/dev/null 2>&1 || true
  rm -f "$PLIST_PATH"
  echo "LaunchAgent removed: $PLIST_PATH"
else
  echo "LaunchAgent not found: $PLIST_PATH"
fi
