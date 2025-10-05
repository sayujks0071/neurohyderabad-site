# Fix Apex Domain Redirect - Vercel Configuration

## Current Issue
- ✅ `www.drsayuj.com` works perfectly (Vercel site)
- ❌ `drsayuj.com` returns Internal Error (not configured in Vercel)
- ✅ WordPress subpages work (e.g., `/60`, `/1073`)

## Solution: Add Apex Domain to Vercel Project

### Step 1: Add Domain in Vercel Dashboard
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `neurosurgery-nextjs-site` project
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter: `drsayuj.com`
6. Click **Add**

### Step 2: Configure DNS (if not already done)
**If DNS is managed by Vercel:**
- Apex domain should automatically get A/ALIAS record
- www should have CNAME to `cname.vercel-dns.com`

**If DNS is elsewhere:**
- Apex: A/ALIAS record pointing to Vercel's IP
- www: CNAME record pointing to `cname.vercel-dns.com`

### Step 3: Test the Fix
```bash
# These should all redirect to https://www.drsayuj.com/
curl -I http://drsayuj.com
curl -I https://drsayuj.com
curl -I http://drsayuj.com/
curl -I https://drsayuj.com/

# This should return 200
curl -I https://www.drsayuj.com/
```

## Current Configuration (Already Correct)

### middleware.ts ✅
```typescript
// Apex -> www redirect with HTTPS
if (host === APEX_HOST) {
  url.host = WWW_HOST
  url.protocol = 'https'
  return NextResponse.redirect(url, 308)
}
```

### vercel.json ✅
```json
{
  "redirects": [
    {
      "source": "/(.*)",
      "has": [{ "type": "host", "value": "drsayuj.com" }],
      "destination": "https://www.drsayuj.com/$1",
      "permanent": true
    }
  ]
}
```

## Expected Result
After adding `drsayuj.com` to Vercel:
- `drsayuj.com` → `https://www.drsayuj.com/` (308 redirect)
- `drsayuj.com/any-path` → `https://www.drsayuj.com/any-path` (308 redirect)
- All SEO benefits consolidated on `www.drsayuj.com`

## Alternative: Force Deploy
If you want to trigger a fresh deployment with current config:
```bash
# In your project directory
git add .
git commit -m "Fix apex domain redirect configuration"
git push origin main
```

The middleware and vercel.json are already correctly configured - you just need to add the apex domain to your Vercel project!
