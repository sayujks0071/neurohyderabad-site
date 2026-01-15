# Jules API Test Results

## Test Date
2026-01-15

## Test Status
❌ **Authentication Failed**

## Issue
The Jules API requires an **OAuth 2 access token**, not an API key. The provided token format appears to be an API key or identifier, not a valid OAuth 2 token.

## Error Message
```
401 Unauthorized
"Request had invalid authentication credentials. Expected OAuth 2 access token, login cookie or other valid authentication credential."
```

## Correct API Endpoint
✅ **Confirmed**: `https://jules.googleapis.com/v1alpha`

## Authentication Methods Tested
1. ❌ `X-Goog-Api-Key` header (API key method)
2. ❌ `Authorization: Bearer <token>` (OAuth 2 method)

Both methods failed with the same 401 error, indicating the token format is incorrect.

## How to Get a Valid OAuth 2 Token

### Option 1: Using Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Jules API for your project
3. Create OAuth 2 credentials
4. Use `gcloud auth print-access-token` to get a token

### Option 2: Using gcloud CLI
```bash
# Install gcloud CLI if not already installed
# https://cloud.google.com/sdk/docs/install

# Authenticate
gcloud auth login

# Get access token
gcloud auth print-access-token

# Use this token as JULES_API_TOKEN
```

### Option 3: Service Account (for automation)
1. Create a service account in Google Cloud Console
2. Download the JSON key file
3. Use the service account to generate tokens:
```bash
gcloud auth activate-service-account --key-file=service-account-key.json
gcloud auth print-access-token
```

## Updated Scripts
The following scripts have been updated to use the correct endpoint and authentication:

- ✅ `scripts/test-jules-api.ts` - Tests both API key and OAuth methods
- ✅ `scripts/jules-weekly-seo-automation.ts` - Uses OAuth Bearer token

## Next Steps
1. **Get a valid OAuth 2 access token** using one of the methods above
2. **Test again** with the new token:
   ```bash
   JULES_API_TOKEN="<oauth2-token>" npm run jules:test
   ```
3. **Update GitHub Secrets** with the OAuth 2 token once verified
4. **Verify the source ID** - The repo might need to be registered as a source first

## Source Registration
Before creating sessions, you may need to:
1. List sources: `GET https://jules.googleapis.com/v1alpha/sources`
2. Register your repo if not found
3. Use the correct source ID format: `sources/github-owner-repo`

## Testing Commands

### Test API Connection
```bash
JULES_API_TOKEN="<oauth2-token>" npm run jules:test
```

### Run Weekly Automation
```bash
JULES_API_TOKEN="<oauth2-token>" npm run jules:weekly-seo
```

## References
- [Jules API Documentation](https://developers.google.com/jules/api)
- [Google Cloud Authentication](https://cloud.google.com/docs/authentication)
- [OAuth 2.0 for Google APIs](https://developers.google.com/identity/protocols/oauth2)
