# Google Jules API Setup Guide

This guide explains how to set up automated weekly SEO improvements using the Google Jules API.

## Overview

The Google Jules API automation runs weekly to:
- Improve SEO metadata and CTR
- Strengthen content clusters with internal links
- Monitor competitors and implement counter-changes
- Enhance technical SEO (schema, sitemaps, citations)

## Setup Steps

### 1. Add API Token to GitHub Secrets

1. Go to your GitHub repository: `https://github.com/sayujks0071/neurohyderabad-site`
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

   - **Name:** `JULES_API_TOKEN`
   - **Value:** `AQ.Ab8RN6ISWY-sH5Dkokv1VuYaHsWeMSkCtgcMHZQ-sSjEdas6Yg`
   
   (Optional) If using a custom API endpoint:
   - **Name:** `JULES_API_URL`
   - **Value:** `https://your-custom-jules-api-endpoint.com/v1/automations`

### 2. Verify Workflow File

The workflow file `.github/workflows/jules-weekly-seo-automation.yml` is already configured to:
- Run every Monday at 09:00 IST (03:30 UTC)
- Use the token from GitHub Secrets
- Automatically commit and push changes
- Create a PR if changes are made

### 3. Test the Script Locally (Optional)

```bash
# Set the token in your environment
export JULES_API_TOKEN="AQ.Ab8RN6ISWY-sH5Dkokv1VuYaHsWeMSkCtgcMHZQ-sSjEdas6Yg"

# Run the script
npx tsx scripts/jules-weekly-seo-automation.ts
```

### 4. Manual Trigger

You can manually trigger the workflow:
1. Go to **Actions** tab in GitHub
2. Select **Jules Weekly SEO Automation**
3. Click **Run workflow** → **Run workflow**

## How It Works

1. **Scheduled Run**: Every Monday at 09:00 IST, GitHub Actions triggers the workflow
2. **API Call**: The script calls Google Jules API with the weekly SEO prompt
3. **Changes Made**: Jules analyzes the repo and makes improvements
4. **Auto-Commit**: Changes are automatically committed with message `SEO: weekly maintenance YYYY-MM-DD`
5. **PR Created**: If significant changes are made, a PR is created for review

## Customizing the Prompt

Edit `jules-prompts/weekly-seo-automation.md` to change what Jules does each week.

## Monitoring

- **Workflow Runs**: Check `.github/workflows/jules-weekly-seo-automation.yml` runs in Actions tab
- **Commits**: Look for commits with message pattern `SEO: weekly maintenance *`
- **PRs**: Review PRs created by the automation

## Troubleshooting

### API Token Not Working
- Verify the token is correct in GitHub Secrets
- Check if the token has expired
- Ensure `JULES_API_TOKEN` secret name matches exactly

### No Changes Made
- Check the workflow logs in Actions tab
- Verify the API endpoint is correct
- Review the prompt file for clarity

### Build Failures
- The workflow runs `npm run build` to verify changes
- Check build logs for TypeScript or linting errors
- Fix any errors before the next run

## Security Notes

- ✅ API token is stored in GitHub Secrets (encrypted)
- ✅ Token is never exposed in logs or commits
- ✅ Only the workflow has access to the token
- ⚠️ Never commit the token to the repository

## Next Steps

1. Add the token to GitHub Secrets
2. Wait for the next scheduled run (Monday 09:00 IST)
3. Or trigger manually from Actions tab
4. Review the changes and merge PRs as needed
