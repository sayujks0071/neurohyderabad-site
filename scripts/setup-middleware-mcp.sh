#!/bin/bash
# Setup Middleware MCP Server for Cursor
# This script configures the Middleware MCP server in Cursor's MCP configuration

echo "🔧 Setting up Middleware MCP Server for Cursor"
echo "=============================================="
echo ""

# Check if MCP config exists
MCP_CONFIG="$HOME/.cursor/mcp.json"
BACKUP_CONFIG="$HOME/.cursor/mcp.json.backup"

if [ ! -f "$MCP_CONFIG" ]; then
  echo "Creating new MCP configuration..."
  mkdir -p "$HOME/.cursor"
  echo '{"mcpServers": {}}' > "$MCP_CONFIG"
fi

# Backup existing config
echo "📋 Backing up existing configuration..."
cp "$MCP_CONFIG" "$BACKUP_CONFIG"
echo "   Backup saved to: $BACKUP_CONFIG"
echo ""

# Check for access token
echo "🔑 Middleware Access Token"
echo "   Get your token from: https://hjptv.middleware.io → Settings → API Keys"
read -p "   Enter your Middleware Access Token (or press Enter to skip): " access_token

if [ -z "$access_token" ]; then
  echo "   ⚠️  No token provided. You'll need to add it manually to the config."
  echo "   Location: $MCP_CONFIG"
  echo ""
  access_token="your_access_token_here"
fi

# Create updated config
echo "📝 Updating MCP configuration..."

# Use jq if available, otherwise use Python
if command -v jq &> /dev/null; then
  # Update using jq
  jq '.mcpServers.middleware = {
    "command": "npx",
    "args": ["-y", "@middleware.io/mcp-server"],
    "env": {
      "MIDDLEWARE_API_URL": "https://hjptv.middleware.io/api/v1",
      "MIDDLEWARE_ACCESS_TOKEN": "'"$access_token"'"
    }
  }' "$MCP_CONFIG" > "$MCP_CONFIG.tmp" && mv "$MCP_CONFIG.tmp" "$MCP_CONFIG"
else
  # Fallback to Python
  python3 << EOF
import json
import sys

config_path = "$MCP_CONFIG"
with open(config_path, 'r') as f:
    config = json.load(f)

if 'mcpServers' not in config:
    config['mcpServers'] = {}

config['mcpServers']['middleware'] = {
    "command": "npx",
    "args": ["-y", "@middleware.io/mcp-server"],
    "env": {
        "MIDDLEWARE_API_URL": "https://hjptv.middleware.io/api/v1",
        "MIDDLEWARE_ACCESS_TOKEN": "$access_token"
    }
}

with open(config_path, 'w') as f:
    json.dump(config, f, indent=2)
EOF
fi

echo "   ✅ Configuration updated"
echo ""

# Install package (optional, npx will install on first use)
echo "📦 Package Installation"
echo "   The MCP server will be installed automatically on first use via npx"
echo "   Or install manually: npm install -g @middleware.io/mcp-server"
echo ""

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Restart Cursor to load the new MCP server"
echo "   2. Test by asking: 'List my Middleware dashboards'"
echo "   3. Verify in Cursor: View → Output → MCP"
echo ""
echo "📚 Documentation:"
echo "   - docs/middleware-mcp-setup.md"
echo "   - docs/middleware-api-integration.md"
echo ""
echo "💡 To restore previous config:"
echo "   cp $BACKUP_CONFIG $MCP_CONFIG"
