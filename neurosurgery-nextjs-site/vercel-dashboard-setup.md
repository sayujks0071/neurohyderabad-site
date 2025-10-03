# Vercel Dashboard Configuration for Optimal Apex Domain Handling

## Current Status ✅
The two-hop redirect chain is working perfectly:
1. `http://drsayuj.com` → `https://drsayuj.com/` (Vercel's automatic HTTPS)
2. `https://drsayuj.com/` → `https://www.drsayuj.com/` (our redirect)

This is **expected Vercel behavior** and is fine for SEO and users.

## Optimize Vercel Dashboard Settings

### Step 1: Set Primary Domain
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `neurosurgery-nextjs-site` project
3. Go to **Settings** → **Domains**
4. Set **Primary Domain** = `www.drsayuj.com`

### Step 2: Configure Apex Domain Redirect
1. Find `drsayuj.com` in the domains list
2. Click **"..."** menu → **"Configure"**
3. Set **Redirect to** = `https://www.drsayuj.com`
4. Keep it **permanent (308)**

### Step 3: Verify Both Domains Are Listed
Your domains should show:
- ✅ `www.drsayuj.com` (Primary)
- ✅ `drsayuj.com` (Redirects to www)

## Current Configuration (Already Optimized)

### vercel.json ✅
```json
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [{ "type": "host", "value": "drsayuj.com" }],
      "destination": "https://www.drsayuj.com/:path*",
      "permanent": true
    }
  ]
}
```

### middleware.ts ✅
```typescript
// Handles HTTPS apex → www redirect
if (host === APEX_HOST) {
  url.host = WWW_HOST
  url.protocol = 'https'
  return NextResponse.redirect(url, 308)
}
```

## Test Commands

### Test Full Redirect Chain
```bash
# Shows both hops
curl -I -L http://drsayuj.com

# Expected: HTTP/1.0 308 → HTTP/2 308 → HTTP/2 200
```

### Test Individual Redirects
```bash
# Hop 1: HTTP → HTTPS
curl -I http://drsayuj.com
# Expected: Location: https://drsayuj.com/

# Hop 2: HTTPS apex → www
curl -I https://drsayuj.com
# Expected: Location: https://www.drsayuj.com/

# Final destination
curl -I https://www.drsayuj.com
# Expected: HTTP/2 200
```

## SEO Impact
- ✅ **Two-hop redirects are SEO-friendly** (Google handles them well)
- ✅ **308 permanent redirects** preserve SEO value
- ✅ **Canonical domain** is clearly `www.drsayuj.com`
- ✅ **All paths preserved** in redirects

## Performance
- ✅ **Edge-level redirects** are fast
- ✅ **Minimal latency** added by two hops
- ✅ **CDN caching** optimizes subsequent requests

The current setup is **production-ready** and follows Vercel best practices!
