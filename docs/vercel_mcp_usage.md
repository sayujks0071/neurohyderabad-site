# Vercel MCP Usage (Local Log Drain)

These scripts pull Vercel production logs via the Vercel MCP server that is already
configured in Cursor. The scripts **do not** use the Vercel REST API directly.

## How the scripts call MCP
`scripts/pull_vercel_logs.py` uses JSON-RPC over HTTP:
- `tools/list` to discover available tools
- `tools/call` to invoke the log retrieval tool

The script expects a **streamable HTTP** MCP endpoint. Provide it with:
```bash
export VERCEL_MCP_HTTP_URL="http://localhost:PORT/api/mcp"
```

If you are using Cursor's MCP servers, expose a streamable HTTP endpoint in your
local MCP configuration (outside the repo). The script will also attempt to read
`~/.cursor/mcp.json` or `~/.cursor/mcp-servers.json` and use any Vercel server entry
that defines `--streamableHttp`.

## Verify MCP connectivity
You can sanity-check the MCP endpoint with curl:
```bash
curl -sS -X POST "$VERCEL_MCP_HTTP_URL" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'
```

If tools are returned, the log puller can run.

## Safety
- **Never** commit tokens or MCP config to git.
- Logs are redacted before writing to disk (auth headers, cookies, tokens, JWTs, emails, phones).
- Optional Telegram alerts only use env vars:
  - `TELEGRAM_BOT_TOKEN`
  - `TELEGRAM_CHAT_ID`
