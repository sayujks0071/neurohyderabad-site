# 🆕 Setting Up drsayuj.info Domain

## Current Status
✅ **Domain Registered**: `drsayuj.info` is registered with Vercel  
❌ **DNS Not Configured**: Nameservers not set up yet  
❌ **Not Assigned**: Domain needs to be assigned to the neurosurgery project  

## Steps to Complete Setup

### 1. Configure Nameservers (Choose One Option)

#### Option A: Use Vercel Nameservers (Recommended)
Set these nameservers in your domain registrar:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

#### Option B: Use A Record (Alternative)
If you can't change nameservers, add this A record:
```
drsayuj.info    A    76.76.21.21
```

### 2. Assign Domain to Project

**Via Vercel Dashboard:**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `neurosurgery-nextjs-site` project
3. Go to Settings → Domains
4. Add `drsayuj.info` and `www.drsayuj.info`

**Or via CLI (after nameservers are configured):**
```bash
npx vercel domains add drsayuj.info
npx vercel domains add www.drsayuj.info
```

### 3. Update Next.js Configuration

Add the new domain to your redirects in `next.config.mjs`:

```javascript
async redirects() {
  return [
    // Existing redirects...
    
    // Add redirect for new domain
    {
      source: '/((?!api|_next|images|favicon.ico|robots.txt|sitemap.xml|site.webmanifest).*)',
      has: [{ type: 'host', value: 'drsayuj.info' }],
      destination: 'https://www.drsayuj.info/$1',
      permanent: true,
    },
  ];
}
```

### 4. Test the Setup

After DNS propagation (5-60 minutes), test with:

```bash
# Test DNS resolution
dig +short A drsayuj.info
# Should return: 76.76.21.21

dig +short CNAME www.drsayuj.info
# Should return: cname.vercel-dns.com

# Test website access
curl -IL https://drsayuj.info
# Should redirect to www.drsayuj.info

curl -IL https://www.drsayuj.info
# Should return 200 OK
```

## Expected Timeline

- **DNS Propagation**: 5-60 minutes after nameserver change
- **SSL Certificate**: Automatic (Vercel handles this)
- **Full Setup**: ~1 hour total

## Benefits of New Domain

✅ **Correct DNS Configuration**: Will use proper Vercel apex IP  
✅ **No Browser Issues**: Chrome, Safari, Firefox will all work  
✅ **Clean Setup**: No legacy DNS problems  
✅ **Better Performance**: Optimized Vercel routing  

## Current vs New Domain

| Aspect | drsayuj.com (Current) | drsayuj.info (New) |
|--------|----------------------|-------------------|
| DNS | ❌ Wrong (CDN IPs) | ✅ Correct (Apex IP) |
| Chrome | ❌ Blank page | ✅ Will work |
| Safari | ✅ Works (cached) | ✅ Will work |
| Setup | ❌ Needs DNS fix | ✅ Clean setup |

## Next Steps

1. **Configure nameservers** in your domain registrar
2. **Wait for DNS propagation** (check with `dig drsayuj.info`)
3. **Assign domain** to neurosurgery project in Vercel
4. **Test in browser** - should work perfectly!

The new domain will solve all the browser compatibility issues you're experiencing with the current domain.
