# CRM Apps Script Security Implementation

## Overview

This document describes the security measures implemented to protect the Google Apps Script CRM Web App from unauthorized access and abuse.

## Security Vulnerability (Addressed)

**Original Issue:** The Apps Script Web App was deployed with `Access: Anyone` and the `doPost` endpoint did not enforce authentication. This created an open mail relay vulnerability where attackers could:
- Send arbitrary emails from the organization's Google Workspace identity
- Mass-trigger internal notifications
- Create unauthorized Drive folders and calendar events
- Abuse other privileged side effects

## Security Solution

### 1. API Token Authentication

**Implementation Location:** `CRM_WebApp.gs` lines 28-32

```javascript
// --- Auth (REQUIRED) ---
const expectedToken = PROPS.getProperty("API_TOKEN");
if (!expectedToken || data.apiToken !== expectedToken) {
  return json({ ok: false, error: "Unauthorized" });
}
```

**How It Works:**
- Every request must include a valid `apiToken` in the payload
- The token is validated against the `API_TOKEN` Script Property
- Unauthorized requests are rejected before any data processing
- No emails, Drive operations, or calendar events are created without valid token

### 2. Server-Side Token Injection

**Implementation Location:** `app/api/lead/route.ts` lines 34-39

```typescript
// 4. Inject API Token
// We only inject this if it exists.
// If it's missing in Production, we'll fail below.
if (API_TOKEN) {
  body.apiToken = API_TOKEN;
}
```

**How It Works:**
- The API token is injected server-side by the Next.js API route
- Token is read from environment variable `GOOGLE_APPS_SCRIPT_API_TOKEN`
- **Token is never exposed to the client browser**
- Only the authorized Vercel deployment can inject the correct token

### 3. Token Sanitization

**Implementation Location:** `CRM_WebApp.gs` lines 167-172

```javascript
function sanitizeRaw(data) {
  // Never store token in sheet
  const copy = JSON.parse(JSON.stringify(data));
  delete copy.apiToken;
  return copy;
}
```

**How It Works:**
- Removes the `apiToken` field before storing data in the spreadsheet
- Prevents token leakage through sheet logs or exports
- Only sanitized data is stored in the "rawJson" column

### 4. Production Safeguards

**Implementation Location:** `app/api/lead/route.ts` lines 66-78

```typescript
// 6. Security Check for Token
if (!API_TOKEN) {
  // In production, we MUST have a token for the new secure script
  if (process.env.NODE_ENV === "production") {
    console.error("GOOGLE_APPS_SCRIPT_API_TOKEN is not set in production.");
    return NextResponse.json(
      { error: "Internal Server Configuration Error" },
      { status: 500 }
    );
  }
  // In dev, we might just be testing connectivity...
  console.warn("GOOGLE_APPS_SCRIPT_API_TOKEN is unset...");
}
```

**How It Works:**
- Fails fast if token is not configured in production
- Prevents accidental deployment without security configuration
- Development mode allows testing with warnings

### 5. Concurrency Control

**Implementation Location:** `CRM_WebApp.gs` lines 13-14, 110-112

```javascript
const lock = LockService.getScriptLock();
lock.waitLock(30000);
try {
  // ... process request ...
} finally {
  lock.releaseLock();
}
```

**How It Works:**
- Uses Google Apps Script's `LockService` to prevent race conditions
- Ensures atomic operations during concurrent requests
- 30-second timeout prevents deadlocks

## Setup Instructions

### Step 1: Configure Apps Script

1. Open your Google Apps Script project
2. Go to **Project Settings** > **Script properties**
3. Add the following property:
   - Key: `API_TOKEN`
   - Value: Generate a secure random token (e.g., `openssl rand -hex 32`)

### Step 2: Configure Vercel Environment Variables

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add the following variables:
   - `GOOGLE_APPS_SCRIPT_WEBAPP_URL`: Your Apps Script Web App URL
   - `GOOGLE_APPS_SCRIPT_API_TOKEN`: Same token as in Apps Script properties

### Step 3: Deploy Apps Script

1. In Apps Script editor, click **Deploy** > **New deployment**
2. Select type: **Web app**
3. Configure:
   - **Execute as**: Me
   - **Who has access**: Anyone (authentication is handled by token)
4. Deploy and copy the Web App URL

### Step 4: Verify Security

Test that unauthorized requests are blocked:

```bash
# This should return "Unauthorized"
curl -X POST https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test","phone":"1234567890","requestId":"test123"}'
```

Test through your authorized API:

```bash
# This should succeed (token injected server-side)
curl -X POST https://your-site.vercel.app/api/lead \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","phone":"1234567890"}'
```

## Security Best Practices

1. **Never commit tokens to version control**
   - Use environment variables only
   - Never hardcode tokens in source code

2. **Rotate tokens regularly**
   - Update both Apps Script property and Vercel env var
   - Consider monthly rotation for high-security environments

3. **Monitor access logs**
   - Check Apps Script execution logs regularly
   - Watch for unauthorized access attempts

4. **Use HTTPS only**
   - Vercel enforces HTTPS by default
   - Apps Script Web Apps use HTTPS

5. **Rate limiting**
   - The Next.js API route implements rate limiting (5 requests/minute per IP)
   - Prevents brute force token guessing attacks

## Attack Surface Analysis

### What Is Protected ✅

- ✅ Email sending (MailApp.sendEmail)
- ✅ Drive folder creation and sharing
- ✅ Calendar event creation
- ✅ Staff notification emails
- ✅ Spreadsheet data insertion
- ✅ All privileged operations

### What Is NOT Protected ⚠️

- ⚠️ The Web App URL itself is public (but useless without token)
- ⚠️ doGet endpoint returns basic status (by design, no sensitive data)

### Threat Model

| Threat | Mitigated? | How |
|--------|-----------|-----|
| Attacker discovers Web App URL | ✅ Yes | Token authentication required |
| Attacker tries to send spam emails | ✅ Yes | Requests without valid token are rejected |
| Attacker tries to brute force token | ✅ Yes | Rate limiting + long token (256-bit) |
| Token leakage via logs | ✅ Yes | Token sanitized before storage |
| Token exposure to client | ✅ Yes | Token injected server-side only |
| Replay attacks | ⚠️ Partial | Idempotency via requestId (but tokens don't expire) |

## Future Enhancements

Consider implementing these additional security measures:

1. **Token Expiration**
   - Add timestamp validation for time-limited tokens
   - Use JWT with expiration claims

2. **Request Signing**
   - HMAC signatures to prevent tampering
   - Nonce to prevent replay attacks

3. **IP Whitelisting**
   - Restrict to Vercel IP ranges (if static)
   - Additional layer of defense

4. **Audit Logging**
   - Log all authentication attempts
   - Alert on repeated failures

5. **Token Rotation**
   - Automatic token rotation mechanism
   - Support for multiple active tokens during rotation

## References

- Original vulnerability report: PR #82 review comment r2658135148
- Security fix commit: 1354c68
- Google Apps Script Security Best Practices: https://developers.google.com/apps-script/guides/security
