# Middleware Token Format Guide

## Token Types

Middleware uses different token types for different purposes:

### 1. Agent API Key
- **Format**: Alphanumeric string (e.g., `fygjftkluglwjxlwyhqdwshcbwtvfavastli`)
- **Used for**: Infrastructure agent installation (macOS, Kubernetes)
- **Location**: Agent configuration files
- **Example**: `fygjftkluglwjxlwyhqdwshcbwtvfavastli`

### 2. Access Token (API)
- **Format**: JWT (JSON Web Token) with 3 segments separated by dots
- **Structure**: `header.payload.signature`
- **Used for**: API authentication, MCP server
- **Location**: Generated from dashboard → Settings → API Keys
- **Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

### 3. RUM Account Key
- **Format**: Alphanumeric string
- **Used for**: Browser RUM tracking, sourcemap uploads
- **Location**: `app/_components/MiddlewareRUM.tsx`, `next.config.mjs`
- **Example**: `svxkmvkxzpkxtuyhsgmgdiyfjwkxtytiltea`

## Current Token Status

### Token Provided: `7f637f6eb5a355221ca803a82d4e4d7023ff78caa05f26194f0ecade513e87f7`

**Analysis:**
- **Length**: 64 characters
- **Format**: Hexadecimal string
- **Type**: Appears to be a hash or API key, not a JWT

**Issue**: The Middleware API is expecting a JWT format (3 segments with dots), but this token is a single hex string.

## Solutions

### Option 1: Verify Token Format

1. **Check the token in the dashboard:**
   - Go to: `https://hjptv.middleware.io`
   - Navigate to: Settings → API Keys
   - Look at the generated Access Token
   - JWT tokens have 3 parts separated by dots (`.`)

2. **If the token is correct but still not working:**
   - The token might need to be used with a different header
   - Try `X-API-Key` header instead of `Authorization: Bearer`
   - Check Middleware documentation for the correct format

### Option 2: Generate New Access Token

1. **In Middleware Dashboard:**
   - Go to: `https://hjptv.middleware.io`
   - Settings → API Keys
   - Generate a new Access Token
   - Copy the **full token** (should be a JWT with dots)

2. **Update Configuration:**
   ```bash
   # Update MCP config
   ./scripts/update-mcp-config.sh
   
   # Or update .env.local for API client
   echo "MIDDLEWARE_ACCESS_TOKEN=your_jwt_token_here" >> .env.local
   ```

### Option 3: Use Different Authentication Method

Some Middleware APIs might accept:
- `X-API-Key` header
- Query parameter: `?api_key=...`
- Different token format

Check Middleware API documentation for your specific endpoint.

## Token Storage

### Current Configuration

**MCP Server** (`~/.cursor/mcp.json`):
```json
{
  "mcpServers": {
    "middleware": {
      "env": {
        "MIDDLEWARE_ACCESS_TOKEN": "7f637f6eb5a355221ca803a82d4e4d7023ff78caa05f26194f0ecade513e87f7"
      }
    }
  }
}
```

**API Client** (`.env.local`):
```bash
MIDDLEWARE_ACCESS_TOKEN=7f637f6eb5a355221ca803a82d4e4d7023ff78caa05f26194f0ecade513e87f7
```

## Verification

### Test Token Format

```bash
# Check if token is JWT format (has 3 segments)
echo "7f637f6eb5a355221ca803a82d4e4d7023ff78caa05f26194f0ecade513e87f7" | grep -o '\.' | wc -l
# Should output: 2 (for JWT format)
```

### Test API Access

```bash
# Test with Bearer token
curl -H "Authorization: Bearer YOUR_TOKEN" \
     https://hjptv.middleware.io/api/v1/builder/report

# Test with X-API-Key header
curl -H "X-API-Key: YOUR_TOKEN" \
     https://hjptv.middleware.io/api/v1/builder/report
```

## Next Steps

1. **Verify token format** in Middleware dashboard
2. **Check Middleware documentation** for correct authentication method
3. **Try alternative headers** (`X-API-Key` instead of `Authorization: Bearer`)
4. **Contact Middleware support** if token format is unclear

## Related Documentation

- [Middleware Configuration](./middleware-configuration.md)
- [Middleware API Integration](./middleware-api-integration.md)
- [Middleware MCP Setup](./middleware-mcp-setup.md)

## Last Updated
January 26, 2026
