#!/bin/bash
# Update Cursor MCP config to include Middleware MCP Server
# This preserves existing MCP servers and adds Middleware

MCP_CONFIG="$HOME/.cursor/mcp.json"
BACKUP_CONFIG="$HOME/.cursor/mcp.json.backup"

echo "🔧 Updating Cursor MCP Configuration"
echo "======================================"
echo ""

# Backup
if [ -f "$MCP_CONFIG" ]; then
  cp "$MCP_CONFIG" "$BACKUP_CONFIG"
  echo "✅ Backed up existing config to: $BACKUP_CONFIG"
else
  mkdir -p "$HOME/.cursor"
  echo '{"mcpServers": {}}' > "$MCP_CONFIG"
  echo "✅ Created new MCP config"
fi

# Get access token
echo ""
echo "🔑 Middleware Access Token"
echo "   Get from: https://hjptv.middleware.io → Settings → API Keys"
read -p "   Enter token (or press Enter to use placeholder): " token

if [ -z "$token" ]; then
  token="your_access_token_here"
  echo "   ⚠️  Using placeholder - update manually in $MCP_CONFIG"
fi

# Update config using Python (more reliable than jq for nested JSON)
python3 << EOF
import json
import os

config_path = os.path.expanduser("$MCP_CONFIG")
token = "$token"

# Read existing config
with open(config_path, 'r') as f:
    config = json.load(f)

# Ensure mcpServers exists
if 'mcpServers' not in config:
    config['mcpServers'] = {}

# Add Middleware MCP server (preserve existing servers)
config['mcpServers']['middleware'] = {
    "command": "npx",
    "args": ["-y", "@middleware.io/mcp-server"],
    "env": {
        "MIDDLEWARE_API_URL": "https://hjptv.middleware.io/api/v1",
        "MIDDLEWARE_ACCESS_TOKEN": token
    }
}

# Write updated config
with open(config_path, 'w') as f:
    json.dump(config, f, indent=2)

print("✅ Configuration updated successfully")
EOF

echo ""
echo "📋 Configuration saved to: $MCP_CONFIG"
echo ""
echo "🔄 Next steps:"
echo "   1. Restart Cursor"
echo "   2. Test: Ask 'List my Middleware dashboards'"
echo "   3. Check MCP logs: View → Output → MCP"
echo ""
echo "💡 To restore: cp $BACKUP_CONFIG $MCP_CONFIG"
