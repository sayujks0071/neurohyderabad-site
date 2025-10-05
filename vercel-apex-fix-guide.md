# Vercel Apex Domain Redirect Fix

## Current Issue
- ✅ `https://drsayuj.com` → `https://www.drsayuj.com/` (working correctly)
- ❌ `http://drsayuj.com` → `https://drsayuj.com/` (should go to www)
- ✅ `https://www.drsayuj.com` → Works perfectly

## Root Cause
Vercel's edge network is handling HTTP→HTTPS redirects before our middleware runs, and it's redirecting to the same domain instead of www.

## Solution: Configure in Vercel Dashboard

### Step 1: Go to Vercel Dashboard
1. Visit [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your `neurosurgery-nextjs-site` project
3. Go to **Settings** → **Domains**

### Step 2: Configure Domain Redirects
1. Find `drsayuj.com` in the domains list
2. Click the **"..."** menu next to it
3. Select **"Configure"**
4. Look for **"Redirect"** or **"Redirect to"** option
5. Set redirect to: `https://www.drsayuj.com`

### Step 3: Alternative - Use Vercel Edge Config
If the above doesn't work, add this to your `vercel.json`:

```json
{
  "redirects": [
    {
      "source": "/(.*)",
      "has": [
        {
          "type": "host",
          "value": "drsayuj.com"
        }
      ],
      "destination": "https://www.drsayuj.com/$1",
      "permanent": true
    }
  ]
}
```

### Step 4: Test the Fix
```bash
./test-apex-redirects.sh
```

**Expected Results:**
- `http://drsayuj.com` → `https://www.drsayuj.com/` (308)
- `https://drsayuj.com` → `https://www.drsayuj.com/` (308)
- `https://www.drsayuj.com` → Works perfectly (200)

## Current Status
✅ **HTTPS redirect working** - middleware is handling this correctly
❌ **HTTP redirect needs Vercel dashboard configuration**

The middleware fix we deployed is working for HTTPS, but Vercel's edge network needs to be configured for HTTP redirects.
