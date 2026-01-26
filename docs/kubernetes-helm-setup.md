# Kubernetes Helm Installation Guide

## Overview

This document provides Helm installation commands for:
- **cert-manager**: Automatic TLS certificate management
- **Middleware Labs Agent**: Kubernetes monitoring and observability

## Prerequisites

- Kubernetes cluster access
- `kubectl` configured and connected to your cluster
- `helm` CLI installed (v3.x)

## Installation

### 1. Install cert-manager

cert-manager automatically manages TLS certificates in your Kubernetes cluster.

```bash
# Add Jetstack Helm repository
helm repo add jetstack https://charts.jetstack.io --force-update

# Install cert-manager
helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --version v1.14.5 \
  --set installCRDs=true
```

**Verify installation:**
```bash
kubectl get pods -n cert-manager
```

### 2. Install Middleware Labs Agent

Middleware Labs provides observability, monitoring, and AI-powered insights for Kubernetes clusters.

```bash
# Add Middleware Labs Helm repository
helm repo add middleware-labs https://helm.middleware.io

# Install Middleware Agent
helm install mw-agent middleware-labs/mw-kube-agent-v3 \
  --set global.mw.apiKey=fygjftkluglwjxlwyhqdwshcbwtvfavastli \
  --set global.mw.target=https://hjptv.middleware.io:443 \
  --set opsai.enabled=true \
  --set mw-autoinstrumentation.enabled=true \
  --set global.clusterMetadata.name=my-k8s-cluster \
  -n mw-agent-ns \
  --create-namespace
```

**Configuration Details:**
- **API Key**: `fygjftkluglwjxlwyhqdwshcbwtvfavastli`
- **Target**: `https://hjptv.middleware.io:443`
- **OpsAI**: Enabled (AI-powered operations)
- **Auto-instrumentation**: Enabled (automatic application instrumentation)
- **Cluster Name**: `my-k8s-cluster`

**Verify installation:**
```bash
kubectl get pods -n mw-agent-ns
```

## Complete Installation Script

For convenience, you can run all installations at once:

```bash
#!/bin/bash
set -e

echo "🚀 Installing cert-manager..."
helm repo add jetstack https://charts.jetstack.io --force-update
helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --version v1.14.5 \
  --set installCRDs=true

echo "⏳ Waiting for cert-manager to be ready..."
kubectl wait --for=condition=ready pod -l app.kubernetes.io/instance=cert-manager -n cert-manager --timeout=300s

echo "🚀 Installing Middleware Labs Agent..."
helm repo add middleware-labs https://helm.middleware.io
helm install mw-agent middleware-labs/mw-kube-agent-v3 \
  --set global.mw.apiKey=fygjftkluglwjxlwyhqdwshcbwtvfavastli \
  --set global.mw.target=https://hjptv.middleware.io:443 \
  --set opsai.enabled=true \
  --set mw-autoinstrumentation.enabled=true \
  --set global.clusterMetadata.name=my-k8s-cluster \
  -n mw-agent-ns \
  --create-namespace

echo "✅ Installation complete!"
echo ""
echo "Verify installations:"
echo "  kubectl get pods -n cert-manager"
echo "  kubectl get pods -n mw-agent-ns"
```

## Upgrading

### Upgrade cert-manager
```bash
helm repo update jetstack
helm upgrade cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --version v1.14.5
```

### Upgrade Middleware Agent
```bash
helm repo update middleware-labs
helm upgrade mw-agent middleware-labs/mw-kube-agent-v3 \
  -n mw-agent-ns \
  --reuse-values
```

## Uninstallation

### Uninstall cert-manager
```bash
helm uninstall cert-manager -n cert-manager
kubectl delete namespace cert-manager
```

### Uninstall Middleware Agent
```bash
helm uninstall mw-agent -n mw-agent-ns
kubectl delete namespace mw-agent-ns
```

## Security Notes

⚠️ **Important Security Considerations:**

1. **API Key Security**: The Middleware API key is sensitive. Consider:
   - Using Kubernetes Secrets instead of direct values
   - Using sealed-secrets or external-secrets operator
   - Rotating keys regularly

2. **Secret Management** (Recommended):
   ```bash
   # Create secret for API key
   kubectl create secret generic mw-api-key \
     --from-literal=apiKey=fygjftkluglwjxlwyhqdwshcbwtvfavastli \
     -n mw-agent-ns
   
   # Use in Helm install
   helm install mw-agent middleware-labs/mw-kube-agent-v3 \
     --set global.mw.apiKeySecretName=mw-api-key \
     --set global.mw.apiKeySecretKey=apiKey \
     ...
   ```

## Troubleshooting

### cert-manager Issues
```bash
# Check cert-manager logs
kubectl logs -n cert-manager -l app.kubernetes.io/instance=cert-manager

# Check CRDs
kubectl get crd | grep cert-manager
```

### Middleware Agent Issues
```bash
# Check agent logs
kubectl logs -n mw-agent-ns -l app=mw-agent

# Check agent status
kubectl get pods -n mw-agent-ns
kubectl describe pod -n mw-agent-ns -l app=mw-agent
```

## References

- [cert-manager Documentation](https://cert-manager.io/docs/)
- [Middleware Labs Documentation](https://docs.middleware.io/)
- [Helm Documentation](https://helm.sh/docs/)

## Last Updated
January 26, 2026
