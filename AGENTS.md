# AGENTS.md - Your Workspace

This folder is home. Treat it that way.

## Every Session
Before doing anything else:
1. **Read `SOUL.md`** — this is who you are.
2. **Read `TOOLS.md`** — this is your toolset.
3. **Read `USER.md`** — this is who you’re helping (if it exists).

## Memory
You wake up fresh each session. These files are your continuity:
- **Daily notes:** Create a `memory/` folder if needed. Capture raw logs if useful.
- **Long-term:** Update `AGENTS.md` or `TOOLS.md` with distilled learnings.
- **Project Context:** Rely on the codebase as the ultimate source of truth.

## Safety
- **Medical Accuracy (YMYL):** All content must be medically accurate. No hallucinations.
- **Privacy:** Do not log PII. Respect HIPAA/GDPR.
- **Verification:** Always verify your work. `read_file` after `write_file`. Run tests.
- **Destructive Actions:** Ask before deleting significant files. `trash` > `rm`.

## External vs Internal
- **Safe (Internal):** Read files, explore, code, test, organize.
- **Ask First (External):** Sending emails, posting to social media, deploying to production (unless strictly automated).

## Tools
- Skills provide your tools. When you need one, check `TOOLS.md`.
- Use `scripts/` for complex tasks (see `TOOLS.md` for the list).
- **Package Manager:** `pnpm` only. Do not use `npm` or `yarn`.

## Heartbeats & Automation
- **Automated Tasks:** Driven by prompt files in `jules-prompts/`.
- **Periodic Checks:** Weekly SEO (`scripts/jules-weekly-seo-automation.ts`), Lighthouse checks.

## Project Guidelines

### Project Structure
- **App Router:** `app/` (Next.js 16).
  - Pages: `app/page.tsx`, `app/services/[slug]/page.tsx`.
  - API: `app/api/`.
  - Layouts: `app/layout.tsx`.
- **Source Code:** `src/`
  - Lib: `src/lib/` (Utilities, AI Gateway, Analytics).
  - Data: `src/data/` (Locations, Navigation, Static content).
  - Components: `app/_components/` (Private) or `components/` (Shared).
- **Scripts:** `scripts/` (Automation tools).
- **Content:** `content/blog/` (MDX Blog posts).
- **Video:** `remotion/` (Programmatic video generation).

### Coding Style & Naming
- **Language:** TypeScript. Strict mode. No `any`.
- **Framework:** Next.js App Router (React Server Components by default).
  - Use `'use client'` only when necessary (interactivity, hooks).
- **Styling:** Tailwind CSS v4.
  - Use the 'Modern Clean' design system (Glassmorphism, Gradients).
  - See `.Jules/palette.md` for design tokens (if available).
- **Linting:** `pnpm lint`.

### Testing
- **Unit/Integration:** Vitest.
  - Run: `pnpm test`.
  - Tests located in `__tests__/` or co-located with `*.test.ts`.
- **Verification:**
  - Deployment: `pnpm verify:deployment`.
  - Lighthouse: `pnpm check:lighthouse`.

### Multi-Agent Safety
- **State:** Be aware that other agents (or GitHub Actions) may be running `scripts/` concurrently.
- **Conflicts:** If you see uncommitted changes from "Jules" (via GitHub Actions), pull/rebase before pushing.
- **Git:** Use descriptive commit messages.

## Make It Yours
This file is yours to evolve. Add your own conventions as you learn what works for `www.drsayuj.info`.
