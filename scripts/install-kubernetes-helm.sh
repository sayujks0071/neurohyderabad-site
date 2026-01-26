#!/bin/bash
# Kubernetes Helm Installation Script
# Installs cert-manager and Middleware Labs Agent

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
CERT_MANAGER_VERSION="v1.14.5"
MW_API_KEY="fygjftkluglwjxlwyhqdwshcbwtvfavastli"
MW_TARGET="https://hjptv.middleware.io:443"
CLUSTER_NAME="my-k8s-cluster"

echo -e "${GREEN}🚀 Starting Kubernetes Helm Installation${NC}"
echo ""

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"
command -v helm >/dev/null 2>&1 || { echo -e "${RED}Error: helm is not installed${NC}" >&2; exit 1; }
command -v kubectl >/dev/null 2>&1 || { echo -e "${RED}Error: kubectl is not installed${NC}" >&2; exit 1; }

# Check kubectl connection
if ! kubectl cluster-info >/dev/null 2>&1; then
  echo -e "${RED}Error: kubectl is not connected to a cluster${NC}" >&2
  exit 1
fi

echo -e "${GREEN}✅ Prerequisites check passed${NC}"
echo ""

# Install cert-manager
echo -e "${YELLOW}📦 Installing cert-manager...${NC}"
helm repo add jetstack https://charts.jetstack.io --force-update
helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --version "${CERT_MANAGER_VERSION}" \
  --set installCRDs=true

echo -e "${YELLOW}⏳ Waiting for cert-manager to be ready...${NC}"
kubectl wait --for=condition=ready pod \
  -l app.kubernetes.io/instance=cert-manager \
  -n cert-manager \
  --timeout=300s || echo -e "${YELLOW}Warning: Timeout waiting for cert-manager${NC}"

echo -e "${GREEN}✅ cert-manager installed${NC}"
echo ""

# Install Middleware Labs Agent
echo -e "${YELLOW}📦 Installing Middleware Labs Agent...${NC}"
helm repo add middleware-labs https://helm.middleware.io
helm install mw-agent middleware-labs/mw-kube-agent-v3 \
  --set global.mw.apiKey="${MW_API_KEY}" \
  --set global.mw.target="${MW_TARGET}" \
  --set opsai.enabled=true \
  --set mw-autoinstrumentation.enabled=true \
  --set global.clusterMetadata.name="${CLUSTER_NAME}" \
  -n mw-agent-ns \
  --create-namespace

echo -e "${GREEN}✅ Middleware Labs Agent installed${NC}"
echo ""

# Verification
echo -e "${YELLOW}🔍 Verifying installations...${NC}"
echo ""
echo "cert-manager pods:"
kubectl get pods -n cert-manager || echo -e "${RED}Error checking cert-manager pods${NC}"

echo ""
echo "Middleware Agent pods:"
kubectl get pods -n mw-agent-ns || echo -e "${RED}Error checking Middleware Agent pods${NC}"

echo ""
echo -e "${GREEN}✅ Installation complete!${NC}"
echo ""
echo "Next steps:"
echo "  - Monitor cert-manager: kubectl get pods -n cert-manager"
echo "  - Monitor Middleware Agent: kubectl get pods -n mw-agent-ns"
echo "  - Check Middleware dashboard: ${MW_TARGET}"
