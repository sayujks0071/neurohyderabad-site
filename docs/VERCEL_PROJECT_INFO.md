# Vercel Project Configuration

## Project Information

**Project Name:** `neurohyderabad-site`  
**Project ID:** `prj_Sp8qt5LhVKzI077GMtUU0C5ZxZAd`  
**Team:** `sayujs-projects-4876d2b7`  
**Dashboard URL:** `https://vercel.com/sayujs-projects-4876d2b7/neurohyderabad-site`

## Vercel Toolbar

The Vercel Toolbar is enabled for both:
- ✅ **Pre-Production Deployments** - On
- ✅ **Production Deployments** - On

> **Note:** To use the toolbar in production, team members need the Chrome extension or to enable the toolbar for that domain in the toolbar menu.

## Project Settings

### Build Configuration
- **Framework:** Next.js
- **Build Command:** `pnpm run build`
- **Dev Command:** `pnpm run dev`
- **Install Command:** `pnpm install`
- **Output Directory:** `.next` (default)

### Deployment Region
- **Primary Region:** `bom1` (Mumbai, India)

### Environment Variables
Key environment variables are managed through Vercel Dashboard:
- `NEXT_PUBLIC_HYPERTUNE_TOKEN`
- `GOOGLE_INDEXING_KEY_JSON`
- `EDGE_CONFIG`
- `FLAGS_SECRET`
- And others (see `.env.development.local` for reference)

## API Usage

### Project ID in API Calls
When using the Vercel API, reference this project with:
```bash
# Project ID
prj_Sp8qt5LhVKzI077GMtUU0C5ZxZAd

# Or project name
neurohyderabad-site
```

### Example API Usage
```bash
# Get project info
curl -H "Authorization: Bearer $VERCEL_TOKEN" \
  https://api.vercel.com/v9/projects/prj_Sp8qt5LhVKzI077GMtUU0C5ZxZAd

# List deployments
curl -H "Authorization: Bearer $VERCEL_TOKEN" \
  https://api.vercel.com/v6/deployments?projectId=prj_Sp8qt5LhVKzI077GMtUU0C5ZxZAd
```

## Related Documentation

- [Vercel AI Gateway Setup](./VERCEL_AI_GATEWAY_SETUP.md)
- [Vercel Bot Protection Setup](./VERCEL_BOT_PROTECTION_SETUP.md)
- [Manual Vercel Deployment](./manual-vercel-deployment.md)

## Last Updated
January 25, 2026
