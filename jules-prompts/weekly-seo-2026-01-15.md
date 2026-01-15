
## PRE-TASK CRITICAL FIX

Before starting the SEO tasks, please execute the following command to fix the git configuration issue that prevents cloning/fetching:

```bash
git config --global --unset-all url.http://git@192.168.0.1:8080/.insteadOf
```

Verify the fix by running:
```bash
git config --list | grep insteadOf
```
(It should not show the 192.168.0.1 address).


## Weekly SEO Automation Task for 2026-01-15

1. **Site Performance Analysis**
   - Run the site performance analysis script: `pnpm analyze-performance`
   - Check the generated reports in `reports/performance/`

2. **Broken Link Check**
   - Run the broken link checker: `pnpm check-links`
   - Investigate any 404s found.

3. **Sitemap Verification**
   - Verify sitemap submission status using: `npx tsx scripts/google-seo-automation.ts --list`
   - Ensure `sitemap.xml` and `sitemap-blog.xml` are healthy.

4. **Keyword Research Update**
   - Check for new keyword opportunities in `seo/keyword-research/latest/`.
   - Update `seo/keyword-registry.json` if needed.

5. **Content Gap Analysis**
   - Review `seo/content-gaps.md` (if available) and propose 3 new blog topics.

Please execute these steps and report the results.
