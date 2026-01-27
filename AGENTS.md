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

## Troubleshooting
- **Build Failures:** Check `pnpm build`. ensure memory limits are respected (`max-old-space-size`).
- **Middleware:** If monitoring fails, run `pnpm middleware:setup` to refresh dashboards.
