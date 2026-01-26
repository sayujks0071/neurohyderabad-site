# Middleware MCP Server Setup

## Overview

The Middleware MCP Server enables AI assistants (like Claude in Cursor) to interact with Middleware's observability platform through structured tool calls. This provides a clean interface for monitoring, dashboards, widgets, metrics, alerts, and error management.

## Installation

### 1. Install the MCP Server Package

```bash
npm install -g @middleware.io/mcp-server
# or
pnpm add -g @middleware.io/mcp-server
```

### 2. Configure Environment Variables

Create or update `~/.cursor/mcp.json` with your Middleware credentials:

```json
{
  "mcpServers": {
    "middleware": {
      "command": "npx",
      "args": [
        "-y",
        "@middleware.io/mcp-server"
      ],
      "env": {
        "MIDDLEWARE_API_URL": "https://hjptv.middleware.io/api/v1",
        "MIDDLEWARE_ACCESS_TOKEN": "your_access_token_here"
      }
    }
  }
}
```

**Get your Access Token:**
1. Login to `https://hjptv.middleware.io`
2. Navigate to Settings → API Keys
3. Generate a new Access Token
4. Copy and add to the config above

### 3. Restart Cursor

After updating the MCP configuration, restart Cursor to load the new server.

## Available Tools

The Middleware MCP Server provides 21 tools organized by product area:

### Dashboard Management (7 tools)

- `list_dashboards` - List all dashboards with filtering and pagination
- `get_dashboard` - Get a specific dashboard by key
- `create_dashboard` - Create a new dashboard
- `update_dashboard` - Update an existing dashboard
- `delete_dashboard` - Delete a dashboard
- `clone_dashboard` - Clone an existing dashboard
- `set_dashboard_favorite` - Mark dashboard as favorite or unfavorite

### Widget Management (6 tools)

- `list_widgets` - List widgets for a report or display scope
- `create_widget` - Create or update a widget
- `delete_widget` - Delete a widget
- `get_widget_data` - Get data for a specific widget
- `get_multi_widget_data` - Get data for multiple widgets at once
- `update_widget_layouts` - Update widget layout positions

### Metrics and Resources (3 tools)

- `get_metrics` - Get metrics, filters, or groupby tags
- `get_resources` - Get available resources for queries
- `query` - Execute flexible queries to retrieve logs, metrics, traces, and other data

### Alerts (3 tools)

- `list_alerts` - List alerts for a specific rule
- `create_alert` - Create a new alert
- `get_alert_stats` - Get alert statistics

### Error and Incident Management (2 tools)

- `list_errors` - List all errors and incidents with filtering and pagination (includes clickable issue_url)
- `get_error_details` - Get detailed information about a specific error or incident by fingerprint

## Usage Examples

### List Dashboards

Ask your AI assistant:
```
"List all dashboards in Middleware"
```

The assistant will use the `list_dashboards` tool to fetch and display your dashboards.

### Create a Dashboard

```
"Create a dashboard for monitoring website performance with LCP, CLS, and INP metrics"
```

The assistant will use `create_dashboard` and `create_widget` tools to build the dashboard.

### Check Errors

```
"Show me the top 10 errors from the last 24 hours"
```

The assistant will use `list_errors` to fetch and display error information.

### Query Metrics

```
"What's the average response time for the appointment API in the last hour?"
```

The assistant will use the `query` tool to fetch metrics.

## Transport Modes

The server supports three transport modes:

1. **stdio** (default) - Standard input/output for command-line usage
2. **http** - Streamable HTTP transport for web-based clients
3. **sse** - Server-Sent Events for real-time streaming

The Cursor configuration uses `stdio` by default, which is suitable for AI assistant integration.

## Safer Deployments

For read-only or restricted access, you can exclude specific tools using environment variables:

```json
{
  "mcpServers": {
    "middleware": {
      "command": "npx",
      "args": [
        "-y",
        "@middleware.io/mcp-server"
      ],
      "env": {
        "MIDDLEWARE_API_URL": "https://hjptv.middleware.io/api/v1",
        "MIDDLEWARE_ACCESS_TOKEN": "your_access_token_here",
        "EXCLUDED_TOOLS": "delete_dashboard,delete_widget,create_alert"
      }
    }
  }
}
```

This creates a read-only instance that prevents destructive operations.

## Integration with Existing Setup

This MCP server complements:
- **Middleware API Client** (`src/lib/middleware/api-client.ts`) - Programmatic API access
- **Middleware RUM** - Browser monitoring
- **Middleware Agent** - Infrastructure monitoring
- **Webhook Handlers** - Alert processing

## Verification

After setup, test the integration:

1. **In Cursor**, ask: "What dashboards do I have in Middleware?"
2. The AI should use the MCP tools to fetch and display your dashboards
3. If it works, you'll see a structured response with dashboard information

## Troubleshooting

### MCP Server Not Loading

1. Check that the package is installed: `npm list -g @middleware.io/mcp-server`
2. Verify environment variables are set correctly
3. Check Cursor's MCP server logs (View → Output → MCP)

### Authentication Errors

1. Verify `MIDDLEWARE_ACCESS_TOKEN` is correct
2. Check that the token hasn't expired
3. Regenerate token from dashboard if needed

### Tool Not Available

1. Check if the tool is excluded in `EXCLUDED_TOOLS`
2. Verify the tool name matches the documentation
3. Check MCP server logs for errors

## Related Documentation

- [Middleware API Integration](./middleware-api-integration.md)
- [Middleware Configuration](./middleware-configuration.md)
- [Middleware Use Cases](./middleware-use-cases.md)
- [Middleware RUM Integration](./middleware-rum-integration.md)

## Last Updated
January 26, 2026
