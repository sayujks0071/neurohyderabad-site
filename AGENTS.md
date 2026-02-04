# Repository Guidelines
- **Repo:** www.drsayuj.info
- **Persona:** See `SOUL.md` for the "Jules" agent persona.
- **Tools:** See `TOOLS.md` for available automation scripts.

## Project Structure & Module Organization
- **App Router:** `app/` (Next.js 16).
  - Pages: `app/page.tsx`, `app/services/[slug]/page.tsx`.
  - API: `app/api/`.
  - Layouts: `app/layout.tsx`.
- **Source Code:** `src/`
  - Lib: `src/lib/` (Utilities, AI Gateway, Analytics).
  - Data: `src/data/` (Locations, Navigation, Static content).
  - Components: `app/_components/` (Private components) or `components/` (Shared).
- **Scripts:** `scripts/` (Automation tools). See `TOOLS.md`.
- **Content:** `content/blog/` (MDX Blog posts).
- **Video:** `remotion/` (Programmatic video generation).
- **Agent Prompts:** `jules-prompts/` (Markdown prompts for automated workflows).

## Coding Style & Naming Conventions
- **Language:** TypeScript. Strict mode. No `any`.
- **Framework:** Next.js App Router (React Server Components by default).
  - Use `'use client'` only when necessary (interactivity, hooks).
- **Styling:** Tailwind CSS v4.
  - Use the 'Modern Clean' design system (Glassmorphism, Gradients).
  - See `.Jules/palette.md` for design tokens (if available).
- **Package Manager:** `pnpm`. Do not use `npm` or `yarn`.
- **Linting:** `pnpm lint`.

## Testing Guidelines
- **Unit/Integration:** Vitest.
  - Run: `pnpm test`.
  - Tests located in `__tests__/` or co-located with `*.test.ts`.
- **Verification:**
  - Deployment: `pnpm verify:deployment`.
  - Lighthouse: `pnpm check:lighthouse`.

## Medical & Safety Guidelines (YMYL)
- **Medical Accuracy:** All content must be medically accurate. No hallucinations.
- **Privacy:** Do not log PII. Respect HIPAA/GDPR.
- **Skeletons:** Use high-fidelity skeletons for lazy-loaded components to prevent CLS.

## Multi-Agent Safety
- **State:** Be aware that other agents (or GitHub Actions) may be running `scripts/` concurrently.
- **Conflicts:** If you see uncommitted changes from "Jules" (via GitHub Actions), pull/rebase before pushing.
- **Git:** Use descriptive commit messages.

## Agent Workflows (Jules Automations)
Automated tasks are driven by the prompt files in `jules-prompts/`.
- When asked to "run the weekly SEO check", refer to `jules-prompts/weekly-seo-automation.md` and `scripts/jules-weekly-seo-automation.ts`.
- When asked to "scan for competitor gaps", refer to `jules-prompts/competitor-gap-scan.md`.

## Subagents
Specialized automated agents for specific website improvement areas:
- **Content Quality Assurance:** `jules-prompts/content-quality-assurance.md` - Ensures content quality, readability, and SEO
- **Patient Engagement Optimization:** `jules-prompts/patient-engagement-optimization.md` - Optimizes patient experience and conversions
- **Technical Performance:** `jules-prompts/technical-performance-agent.md` - Monitors and improves site performance
- **Conversion Optimization:** `jules-prompts/conversion-optimization-agent.md` - Maximizes appointment bookings
- **Medical Accuracy Verification:** `jules-prompts/medical-accuracy-verification.md` - Ensures medical content accuracy
- **Remotion Video Enhancement:** `jules-prompts/remotion-video-enhancement.md` - Optimizes video quality, animations, and rendering
- **Daily Blog Posts:** `jules-prompts/daily-blog-posts.md` - Creates and optimizes daily medical blog posts
- **Sitemap & URL Indexing:** `jules-prompts/sitemap-url-indexing.md` - Submits sitemaps and indexes URLs via APIs
- **Jules MCP Bridge:** `jules-prompts/jules-mcp-bridge.md` - Uses external Jules MCP server for deep repository analysis
- **Jules Daily Tasks Analysis:** `jules-prompts/jules-daily-tasks-analysis.md` - Analyzes and optimizes daily scheduled tasks via Jules MCP
- **Jules-Vercel Integration:** `jules-prompts/jules-vercel-integration.md` - Coordinates Jules MCP (code analysis) and Vercel MCP (deployment management)
- **Deployment Monitor & Troubleshoot:** `jules-prompts/deployment-monitor-troubleshoot.md` - Monitors deployments, detects errors, and troubleshoots issues automatically

See `docs/SUBAGENTS-AND-SKILLS.md` for complete documentation.

## Daily Scheduled Tasks

Jules runs multiple daily automated tasks via GitHub Actions. See `docs/jules-automations.md` for the complete schedule including:
- SEO Reprint
- PR & Deploy Check
- Competitor Gap Scan
- Rolling 7-Day SEO Summary
- Local SEO Check

All tasks create GitHub issues that Jules processes to improve the website.

## Cursor Skills
AI assistants for development tasks (automatically available in Cursor):
- **SEO Optimization:** `.cursor/skills/seo-optimization/` - Optimize SEO for pages
- **Medical Content Validation:** `.cursor/skills/medical-content-validation/` - Validate medical content accuracy
- **Performance Optimization:** `.cursor/skills/performance-optimization/` - Optimize site performance
- **Conversion Funnel Analysis:** `.cursor/skills/conversion-funnel-analysis/` - Analyze conversion funnels
- **Patient Experience Optimization:** `.cursor/skills/patient-experience-optimization/` - Improve patient experience
- **Remotion Video Development:** `.cursor/skills/remotion-video-development/` - Develop and optimize Remotion videos
- **Daily Blog Posts:** `.cursor/skills/daily-blog-posts/` - Create and optimize daily medical blog posts
- **Sitemap & URL Indexing:** `.cursor/skills/sitemap-url-indexing/` - Submit sitemaps and index URLs via APIs
- **Jules MCP Bridge:** `.cursor/skills/jules-mcp-bridge/` - Connect to external Jules MCP server for deep analysis
- **Jules-Vercel Integration:** `.cursor/skills/jules-vercel-integration/` - Coordinate Jules MCP and Vercel MCP for end-to-end workflows
- **Deployment Monitor & Troubleshoot:** `.cursor/skills/deployment-monitor-troubleshoot/` - Monitor deployments, detect errors, and troubleshoot issues automatically

Skills are automatically triggered based on context and queries. See `docs/SUBAGENTS-AND-SKILLS.md` for details.

## MCP Integrations

### Jules MCP Integration

For deep repository analysis using Google Jules via MCP:

- **Setup Guide:** `docs/JULES-MCP-SETUP.md` - Installation and configuration instructions
- **Subagent:** `jules-prompts/jules-mcp-bridge.md` - Automated Jules analysis workflow
- **Skill:** `.cursor/skills/jules-mcp-bridge/SKILL.md` - AI assistance for Jules MCP operations

**Note:** Requires external `jules-mcp` server installation. See setup guide for details.

### Vercel MCP Integration

For managing Vercel deployments and projects via MCP:

- **Setup Guide:** `docs/VERCEL-MCP-SETUP.md` - Configuration and authentication instructions
- **Configuration:** `.cursor/mcp-servers.json` - Project-specific URL configured
- **Features:** Deployment management, log analysis, project monitoring, documentation search

**Note:** Uses OAuth authentication. First-time setup requires authorization via Cursor's MCP interface.

### Jules-Vercel Integration

For coordinated workflows between code analysis and deployment management:

- **Subagent:** `jules-prompts/jules-vercel-integration.md` - Coordinates Jules MCP and Vercel MCP workflows
- **Skill:** `.cursor/skills/jules-vercel-integration/SKILL.md` - AI assistance for coordinated analysis and deployment

**Features:**
- Code analysis (Jules MCP) → Deployment verification (Vercel MCP)
- Failed deployment recovery workflows
- Performance optimization coordination
- Pre-deployment analysis and post-deployment verification

**Note:** Requires both `jules-mcp` and `vercel` MCP servers configured and authenticated.

### Deployment Monitoring & Troubleshooting

For automated deployment monitoring and error troubleshooting:

- **Subagent:** `jules-prompts/deployment-monitor-troubleshoot.md` - Automated deployment monitoring and troubleshooting workflow
- **Skill:** `.cursor/skills/deployment-monitor-troubleshoot/SKILL.md` - AI assistance for deployment monitoring and error fixing

**Features:**
- Continuous deployment health monitoring
- Automatic error detection and categorization
- TypeScript/build/runtime error analysis
- Coordinated fix workflows (direct fixes + Jules MCP analysis)
- Deployment health metrics and reporting

**Note:** Requires `project-0-neurohyderabad-site-vercel` (Vercel MCP) server. Optionally uses `user-jules-mcp` for complex error analysis.

## Troubleshooting
- **Build Failures:** Check `pnpm build`. ensure memory limits are respected (`max-old-space-size`).
- **Middleware:** If monitoring fails, run `pnpm middleware:setup` to refresh dashboards.
