#!/bin/bash
# Middleware Agent Installation Script for macOS
# Installs Middleware Host Agent on macOS (Ventura 13+)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
MW_API_KEY="${MW_API_KEY:-""}"
MW_TARGET="${MW_TARGET:-"https://hjptv.middleware.io"}"
INSTALL_SCRIPT_URL="https://install.middleware.io/scripts/mw-macos-agent-install.sh"

if [ -z "$MW_API_KEY" ]; then
  echo -e "${RED}❌ Error: MW_API_KEY environment variable is not set.${NC}"
  echo -e "${RED}   Please set it before running this script:${NC}"
  echo -e "${BLUE}   export MW_API_KEY=\"your_api_key\"${NC}"
  exit 1
fi

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🚀 Middleware Agent Installation for macOS${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Check macOS version
echo -e "${YELLOW}📋 Checking prerequisites...${NC}"
OS_VERSION=$(sw_vers -productVersion | cut -d. -f1)
if [ "$OS_VERSION" -lt 13 ]; then
  echo -e "${RED}❌ Error: macOS 13 (Ventura) or above is required${NC}"
  echo -e "${RED}   Current version: $(sw_vers -productVersion)${NC}"
  exit 1
fi
echo -e "${GREEN}✅ macOS version: $(sw_vers -productVersion)${NC}"

# Check architecture
ARCH=$(uname -m)
if [ "$ARCH" = "arm64" ]; then
  echo -e "${GREEN}✅ Architecture: Apple Silicon (ARM64)${NC}"
elif [ "$ARCH" = "x86_64" ]; then
  echo -e "${GREEN}✅ Architecture: Intel (x86_64)${NC}"
else
  echo -e "${YELLOW}⚠️  Unknown architecture: $ARCH${NC}"
fi

# Check sudo access
if ! sudo -n true 2>/dev/null; then
  echo -e "${YELLOW}⚠️  Administrator privileges required${NC}"
  echo -e "${YELLOW}   You may be prompted for your password${NC}"
fi

echo ""
echo -e "${YELLOW}📦 Installing Middleware Agent...${NC}"
echo -e "${BLUE}   API Key: ${MW_API_KEY:0:10}...${NC}"
echo -e "${BLUE}   Target: ${MW_TARGET}${NC}"
echo ""

# Run installation
export MW_API_KEY
export MW_TARGET

if bash -c "$(curl -L ${INSTALL_SCRIPT_URL})"; then
  echo ""
  echo -e "${GREEN}✅ Installation completed successfully!${NC}"
else
  echo ""
  echo -e "${RED}❌ Installation failed${NC}"
  exit 1
fi

echo ""
echo -e "${YELLOW}🔍 Verifying installation...${NC}"

# Wait a moment for service to start
sleep 3

# Check agent status
if sudo launchctl list | grep -q mw-agent; then
  echo -e "${GREEN}✅ Middleware Agent is running${NC}"
  echo ""
  echo "Agent Status:"
  sudo launchctl list | grep mw-agent
else
  echo -e "${YELLOW}⚠️  Agent service not found in launchctl${NC}"
  echo -e "${YELLOW}   This may be normal if the service hasn't started yet${NC}"
  echo -e "${YELLOW}   Check again in a few moments:${NC}"
  echo -e "${BLUE}   sudo launchctl list | grep mw-agent${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Installation complete!${NC}"
echo ""
echo "Next steps:"
echo "  - Check agent status: sudo launchctl list | grep mw-agent"
echo "  - View agent logs: log show --predicate 'process == \"mw-agent\"' --last 5m"
echo "  - Access dashboard: ${MW_TARGET}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
