# Middleware Configuration Guide

## API Keys and Tokens

Middleware uses different keys for different purposes:

### 1. Agent API Key (Infrastructure Monitoring)

**Key**: `fygjftkluglwjxlwyhqdwshcbwtvfavastli`

**Used for:**
- macOS Agent installation
- Kubernetes Agent installation
- Infrastructure monitoring
- Host/agent management

**Configuration:**
```bash
# macOS Agent
MW_API_KEY="fygjftkluglwjxlwyhqdwshcbwtvfavastli"
MW_TARGET="https://hjptv.middleware.io"

# Kubernetes Agent (Helm)
--set global.mw.apiKey=fygjftkluglwjxlwyhqdwshcbwtvfavastli
--set global.mw.target=https://hjptv.middleware.io:443
```

**Location in code:**
- `docs/middleware-macos-installation.md`
- `docs/kubernetes-helm-setup.md`
- Installation scripts

### 2. RUM Account Key (Real User Monitoring)

**Key**: `svxkmvkxzpkxtuyhsgmgdiyfjwkxtytiltea`

**Used for:**
- Browser RUM tracking
- Sourcemap uploads
- Client-side error tracking
- Real user monitoring

**Configuration:**
- `app/_components/MiddlewareRUM.tsx`
- `next.config.mjs` (sourcemap uploader)

### 3. API Access Token (Programmatic API Access)

**Token**: Generated from Middleware dashboard

**Used for:**
- Dashboard management API
- Widget management API
- Alert configuration API
- Metrics querying API

**Configuration:**
```bash
# .env.local
MIDDLEWARE_ACCESS_TOKEN=your_access_token_here
MIDDLEWARE_API_URL=https://hjptv.middleware.io/api/v1
```

**How to generate:**
1. Login to `https://hjptv.middleware.io`
2. Navigate to Settings → API Keys
3. Generate a new Access Token
4. Copy and add to `.env.local`

## Environment Variables

### Complete Configuration

Create `.env.local` with:

```bash
# Middleware API Access (for programmatic API calls)
MIDDLEWARE_ACCESS_TOKEN=your_access_token_here
MIDDLEWARE_API_URL=https://hjptv.middleware.io/api/v1

# Middleware Agent (for infrastructure monitoring)
MW_API_KEY=fygjftkluglwjxlwyhqdwshcbwtvfavastli
MW_TARGET=https://hjptv.middleware.io

# Optional: Webhook URL for alerts
MONITORING_WEBHOOK_URL=https://www.drsayuj.info/api/webhooks/middleware
```

## Key Usage Summary

| Key Type | Value | Used For | Location |
|----------|-------|----------|----------|
| Agent API Key | `fygjftkluglwjxlwyhqdwshcbwtvfavastli` | Infrastructure agents | Installation scripts, docs |
| RUM Account Key | `svxkmvkxzpkxtuyhsgmgdiyfjwkxtytiltea` | Browser monitoring | `MiddlewareRUM.tsx`, `next.config.mjs` |
| API Access Token | Generated from dashboard | API client | `.env.local` → `MIDDLEWARE_ACCESS_TOKEN` |

## Configuration Files

### 1. Agent Installation

**macOS:**
```bash
MW_API_KEY="fygjftkluglwjxlwyhqdwshcbwtvfavastli" \
MW_TARGET="https://hjptv.middleware.io" \
bash -c "$(curl -L https://install.middleware.io/scripts/mw-macos-agent-install.sh)"
```

**Kubernetes:**
```bash
helm install mw-agent middleware-labs/mw-kube-agent-v3 \
  --set global.mw.apiKey=fygjftkluglwjxlwyhqdwshcbwtvfavastli \
  --set global.mw.target=https://hjptv.middleware.io:443
```

### 2. RUM Configuration

**Sourcemap Uploader** (`next.config.mjs`):
```javascript
new MiddlewareWebpackPlugin(
  "svxkmvkxzpkxtuyhsgmgdiyfjwkxtytiltea", // RUM Account Key
  "1.0.0",
  ".next/",
  "_next/",
  "https://hjptv.middleware.io/api/v1/rum/getSasUrl"
)
```

**RUM Script** (`app/_components/MiddlewareRUM.tsx`):
```typescript
Middleware.track({
  accountKey: "svxkmvkxzpkxtuyhsgmgdiyfjwkxtytiltea", // RUM Account Key
  target: "https://hjptv.middleware.io",
  // ...
})
```

### 3. API Client

**Usage** (`src/lib/middleware/api-client.ts`):
```typescript
import { middlewareApi } from '@/src/lib/middleware/api-client';

// Uses MIDDLEWARE_ACCESS_TOKEN from .env.local
const dashboards = await middlewareApi.getDashboards();
```

## Security Best Practices

1. **Never commit API keys to version control**
   - Use `.env.local` for local development
   - Use Vercel environment variables for production

2. **Rotate keys regularly**
   - Generate new access tokens periodically
   - Update environment variables when rotating

3. **Use different keys for different purposes**
   - Agent API key for infrastructure
   - RUM account key for browser monitoring
   - API access token for programmatic access

4. **Restrict API token permissions**
   - Only grant necessary permissions
   - Use read-only tokens when possible

## Verification

### Check Agent Connection

```bash
# macOS
sudo launchctl list | grep mw-agent

# Check logs
log show --predicate 'process == "mw-agent"' --last 5m
```

### Check RUM Integration

1. Open website in browser
2. Check Network tab for requests to `hjptv.middleware.io`
3. Verify `window.Middleware` exists in console

### Check API Access

```bash
# Test API client
pnpm tsx scripts/middleware-api-examples.ts dashboards
```

## Troubleshooting

### Agent Not Connecting

1. Verify API key: `fygjftkluglwjxlwyhqdwshcbwtvfavastli`
2. Check target URL: `https://hjptv.middleware.io`
3. Verify agent is running: `sudo launchctl list | grep mw-agent`

### RUM Not Working

1. Verify account key: `svxkmvkxzpkxtuyhsgmgdiyfjwkxtytiltea`
2. Check browser console for errors
3. Verify script is loading: Network tab → `middleware-rum.min.js`

### API Client Errors

1. Verify `MIDDLEWARE_ACCESS_TOKEN` in `.env.local`
2. Check token hasn't expired
3. Verify base URL: `https://hjptv.middleware.io/api/v1`

## Related Documentation

- [Middleware RUM Integration](./middleware-rum-integration.md)
- [Middleware API Integration](./middleware-api-integration.md)
- [Middleware Website Improvement Guide](./middleware-website-improvement-guide.md)
- [Middleware macOS Installation](./middleware-macos-installation.md)
- [Kubernetes Helm Setup](./kubernetes-helm-setup.md)

## Last Updated
January 26, 2026
