# Local Observability Stack (Loki + Promtail + Grafana)

## Prerequisites
- Docker Desktop for macOS
- This repo checked out locally

## Start the stack
```bash
make obs-up
```

Services:
- Loki: http://localhost:3100
- Grafana: http://localhost:3000 (default admin/admin)

## Verify logs in Grafana Explore
1. Open Grafana at http://localhost:3000
2. Go to **Explore**
3. Select **Loki** datasource
4. Query:
   ```
   {job="vercel"}
   ```
5. If logs are present, you should see NDJSON entries from `logs/*.ndjson`.

## Dashboard
The dashboard **"Vercel Prod - Errors & Latency"** is auto-provisioned.
Open it from the **Vercel** folder in Grafana.

## Launchd scheduling
Launchd runs every 5 minutes and executes:
- `scripts/pull_vercel_logs.py`
- `scripts/healthcheck_site_and_stack.py`
- `scripts/alert_check.py`

Install or remove the agent:
```bash
make launchd-on
make launchd-off
```

Logs are written to:
- `logs/vercel_prod.ndjson`
- `logs/vercel_pull_health.ndjson`
- `logs/healthcheck.ndjson`
- `logs/alerts.ndjson`
- `logs/launchd.out.log`
- `logs/launchd.err.log`

## Troubleshooting
- Check Grafana datasource: **Configuration > Data sources**
- Verify Loki readiness:
  ```bash
  curl http://localhost:3100/ready
  ```
- Verify log freshness:
  ```bash
  ls -lt logs/*.ndjson
  ```
- Launchd state:
  ```bash
  launchctl list | grep vercel-log-drain
  ```

## Safety and redaction
All logs are redacted before writing to disk:
- Authorization headers, cookies, and token-like fields
- JWTs
- Emails and phone numbers (to avoid PII leakage)

Do not add secrets to the repo. Configure MCP and Telegram tokens via env vars only.
