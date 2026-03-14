# OpenClaw: Best Use Cases for drsayuj.info

This document describes the six production automations running via [OpenClaw](https://openclaw.ai) for www.drsayuj.info — Dr. Sayuj Krishnan's neurosurgery practice site. OpenClaw runs inside a persistent **Vercel Sandbox** (isolated Linux MicroVM with HTTPS port 18789) so the agent stays online 24/7 without tying up the development machine.

---

## Architecture Overview

```
WhatsApp ──┐
           │        Vercel Sandbox
Cron ──────┤  ┌──────────────────────────────┐
           │  │  OpenClaw Gateway :18789      │
Webhooks ──┘  │  └─ Agent (claude-opus-4-6) │
              │     └─ Skills: web, cron, wa │
              └──────────────────────────────┘
                         │
              ┌──────────┴──────────────┐
              │   drsayuj.info + Resend │
              └─────────────────────────┘
```

---

## Sandbox Setup

### Prerequisites
```bash
npm i -g sandbox          # Vercel Sandbox CLI
sandbox login             # Authenticate with Vercel account
```

### Create the Sandbox
```bash
sandbox create \
  --timeout 4h \
  --publish-port 18789 \
  --connect
export SANDBOX_ID=sbx_xxxxxxxx   # Save from output
```

### Inside the Sandbox Shell
```bash
npm install -g openclaw
openclaw onboard          # Quickstart → Vercel AI Gateway → Skip WhatsApp for now
nohup openclaw gateway run > /tmp/gateway.log 2>&1 &
cat /tmp/gateway.log      # Should show: [gateway] listening on ws://127.0.0.1:18789
```

### Configure WhatsApp (inside sandbox)
```bash
openclaw config --section channels
# → Local → Configure/link → WhatsApp (QR link) → scan with +91 97782 80044
openclaw gateway stop
nohup openclaw gateway run > /tmp/gateway.log 2>&1 &
```

### Lock Egress (from local terminal)
```bash
sandbox config network-policy $SANDBOX_ID \
  --network-policy restricted \
  --allowed-domain ai-gateway.vercel.sh \
  --allowed-domain api.anthropic.com \
  --allowed-domain web.whatsapp.com \
  --allowed-domain mmg.whatsapp.net
```

### Snapshot (for fast restarts)
```bash
sandbox snapshot $SANDBOX_ID --stop
# Next start: sandbox create --snapshot snap_xxx --timeout 4h --publish-port 18789
```

---

## Use Case 1 — 🚑 Patient WhatsApp Triage Bot

**Goal:** Triage inbound WhatsApp messages from patients 24/7 — route emergencies to the hotline and routine queries to the booking page.

**DM Policy:** `pairing` — unknown senders get a one-time code; allowlist can be used for known numbers.

```bash
openclaw config set channels.whatsapp.dmPolicy pairing
```

**System Prompt (add to `~/.openclaw/agents/main/BOOTSTRAP.md`):**
```markdown
You are the patient coordinator for Dr. Sayuj Krishnan, neurosurgeon at Yashoda Hospital, Malakpet, Hyderabad.

EMERGENCY keywords — respond IMMEDIATELY with the emergency message below if any apply:
seizure, fit, convulsion, paralysis, sudden weakness, stroke, coma, blackout, aneurysm, head trauma, sudden blindness, meningitis

Emergency reply:
"⚠️ This sounds urgent. Please call our emergency line immediately: +91 97782 80044, or go to Yashoda Hospital Emergency, Malakpet. Do not wait."

APPOINTMENT / BOOKING requests:
Reply: "You can book a consultation with Dr. Sayuj online: https://www.drsayuj.info/appointments/ 📅 or call +91 97782 80044 (Mon–Sat, 9 AM–5 PM)."

GENERAL QUERIES (spine, brain tumor, surgery, cost, second opinion):
Answer concisely and accurately. Always recommend an in-person consultation for diagnosis.
Never hallucinate clinical advice. Cite drsayuj.info pages where relevant.

Language: Respond in the same language the patient uses (English, Telugu, or Hindi).
```

**Test:**
```bash
# Send "I have a seizure" from your allowlisted number → expect emergency reply < 5s
# Send "book appointment" → expect booking link reply
```

---

## Use Case 2 — 📊 Daily SEO Digest (7 AM IST)

**Goal:** Every morning, check site health and send a 5-bullet WhatsApp summary: top pages, any issues, and one action item.

```bash
openclaw cron add \
  --name "daily-seo-digest" \
  --schedule "30 1 * * *" \
  --message "1) curl -s https://www.drsayuj.info/sitemap.xml to check it loads. 2) curl -o /dev/null -s -w 'Home: %{http_code} in %{time_total}s' https://www.drsayuj.info. 3) Summarize site health in 5 bullets. 4) Suggest one SEO improvement based on recent content. Send result as WhatsApp message to +919778280044." \
  --deliver whatsapp
```

---

## Use Case 3 — 📅 Appointment Lead Capture (WhatsApp Flow)

**Goal:** When a patient messages asking to book, guide them through a structured 4-step conversation: Name → Phone → Preferred Date → Chief Complaint, then POST to `/api/appointments` and confirm.

This is event-driven (not cron) — handled by the triage bot system prompt in Use Case 1. Add to BOOTSTRAP.md:

```markdown
BOOKING FLOW — if a patient says they want to book:
Step 1: Ask "What is your name?"
Step 2: Ask "What is your preferred date? (We're open Mon–Sat)"
Step 3: Ask "Briefly, what is your main concern? (back pain, brain tumor, etc.)"
Step 4: Confirm — "Thank you [name]. Dr. Sayuj's team will call you within 2 hours to confirm your [date] appointment for [concern]. For urgent help: +91 97782 80044."

Then POST this data to: https://www.drsayuj.info/api/appointments
{
  "name": "...",
  "preferredDate": "...",
  "chiefComplaint": "...",
  "source": "whatsapp"
}
```

---

## Use Case 4 — 🖊️ Weekly Blog Draft (Monday 6 AM IST)

**Goal:** Every Monday, auto-draft a medically-accurate patient-facing blog post on a trending neurosurgery topic and create a **draft GitHub PR** for review before publishing.

```bash
openclaw cron add \
  --name "weekly-blog-draft" \
  --schedule "30 0 * * 1" \
  --message "Fetch top result from https://pubmed.ncbi.nlm.nih.gov/rss/search/?term=spine+surgery+hyderabad&limit=3. Write a 650-word patient-friendly blog post in MDX format with frontmatter (title, description, date, tags). Save to content/blog/YYYY-MM-DD-[slug].mdx. Git commit on a new branch blog/auto-YYYY-MM-DD and open a GitHub draft PR with title '[Draft] Blog: [title]'. Never publish directly to main."
```

---

## Use Case 5 — 🔔 Uptime Alert (Every 15 Minutes)

**Goal:** Ping the site every 15 minutes; if it's down or slow (>3s), immediately WhatsApp alert.

```bash
openclaw cron add \
  --name "uptime-check" \
  --schedule "*/15 * * * *" \
  --message "curl -o /dev/null -s -w '%{http_code}|%{time_total}' https://www.drsayuj.info — if HTTP code is not 200 OR total time > 3.0 seconds, send WhatsApp to +919778280044: '🚨 ALERT: drsayuj.info appears DOWN or very slow (${http_code}, ${time_total}s). Check Vercel dashboard: https://vercel.com/sayujs-projects-4876d2b7/neurohyderabad-site immediately.'"
```

---

## Use Case 6 — 🔍 Weekly Competitor Gap Scanner (Sunday 8 PM IST)

**Goal:** Every Sunday, crawl top 3 competitor neurosurgeon sites in Hyderabad, compare with drsayuj.info, identify top 3 content gaps, and send a WhatsApp digest.

```bash
openclaw cron add \
  --name "competitor-scan" \
  --schedule "30 14 * * 0" \
  --message "Compare the service pages of www.drsayuj.info against these Hyderabad neurosurgeon competitors: 1) https://www.yashodahospitals.com/neuro-sciences/ 2) https://www.apollohospitals.com/hyderabad/specialities/neurosciences/. Identify 3 specific content or service gaps. Send a 3-bullet WhatsApp to +919778280044 with actionable recommendations."
```

---

## Cron Schedule Summary

| Job | Schedule | IST Time |
|-----|----------|----------|
| `daily-seo-digest` | `30 1 * * *` | 7:00 AM daily |
| `uptime-check` | `*/15 * * * *` | Every 15 min |
| `weekly-blog-draft` | `30 0 * * 1` | Mon 6:00 AM |
| `competitor-scan` | `30 14 * * 0` | Sun 8:00 PM |

---

## Verifying Setup

```bash
openclaw cron list              # Show all registered cron jobs
openclaw cron status            # Scheduler health
openclaw status                 # Channel + session health
openclaw cron run uptime-check  # Manual trigger for spot-test
```

---

## Security Notes

- **Egress locked** via `sandbox config network-policy` to only WhatsApp + AI provider domains
- **DM pairing** required for unknown WhatsApp senders
- **Blog PRs** are always draft — never auto-merged to `main`
- **No PII logged** — patient names/phone numbers from booking flow go directly to `/api/appointments` endpoint, not stored in OpenClaw state
- **Gateway token** set in `openclaw.json` prevents unauthorized dashboard access

---

## Resources

- [OpenClaw Docs](https://docs.openclaw.ai)
- [Vercel Sandbox Docs](https://vercel.com/docs/sandbox)
- [ClawHub Skills Registry](https://clawhub.com)
- [Deployment Monitor Skill](.cursor/skills/deployment-monitor-troubleshoot/SKILL.md)
