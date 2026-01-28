from __future__ import annotations

import argparse
import json
import os
import time
from datetime import timedelta
from pathlib import Path
from typing import Any, Iterable
from urllib import request

from local_log_utils import (
    append_ndjson,
    ensure_dir,
    isoformat_utc,
    load_json,
    parse_timestamp,
    redact_data,
    redact_string,
    rotate_file,
    utc_now,
    write_json,
)

DEFAULT_PROJECT_ID = "prj_Sp8qt5LhVKzI077GMtUU0C5ZxZAd"
DEFAULT_PROJECT_NAME = "neurohyderabad-site"
DEFAULT_TEAM_ID = "sayujs-projects-4876d2b7"
LOG_FILE_NAME = "vercel_prod.ndjson"


def resolve_repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def load_mcp_http_url() -> str | None:
    for key in ("VERCEL_MCP_HTTP_URL", "VERCEL_MCP_URL", "MCP_HTTP_URL", "CURSOR_MCP_URL"):
        value = os.environ.get(key)
        if value:
            return value
    home = Path.home()
    candidates = [home / ".cursor" / "mcp.json", home / ".cursor" / "mcp-servers.json"]
    for cfg_path in candidates:
        if not cfg_path.exists():
            continue
        try:
            with cfg_path.open("r", encoding="utf-8") as handle:
                config = json.load(handle)
        except (OSError, json.JSONDecodeError):
            continue
        servers = config.get("mcpServers") or config.get("servers") or {}
        for name, server in servers.items():
            if "vercel" not in str(name).lower():
                continue
            args = server.get("args") or []
            if isinstance(args, list):
                for idx, arg in enumerate(args):
                    if arg == "--streamableHttp" and idx + 1 < len(args):
                        return args[idx + 1]
            url = server.get("url")
            if isinstance(url, str) and url.startswith("http"):
                return url
    return None


def mcp_call(url: str, method: str, params: dict[str, Any]) -> Any:
    payload = {"jsonrpc": "2.0", "id": int(time.time() * 1000), "method": method, "params": params}
    body = json.dumps(payload, ensure_ascii=True).encode("utf-8")
    req = request.Request(url, data=body, headers={"Content-Type": "application/json"})
    with request.urlopen(req, timeout=30) as resp:
        raw = resp.read()
    data = json.loads(raw.decode("utf-8"))
    if "error" in data:
        raise RuntimeError(data["error"])
    return data.get("result")


def select_log_tool(tools: Iterable[dict[str, Any]]) -> dict[str, Any] | None:
    override = os.environ.get("VERCEL_MCP_LOG_TOOL")
    if override:
        for tool in tools:
            if tool.get("name") == override:
                return tool
    scored: list[tuple[int, dict[str, Any]]] = []
    for tool in tools:
        name = str(tool.get("name", "")).lower()
        desc = str(tool.get("description", "")).lower()
        score = 0
        if "log" in name or "log" in desc:
            score += 5
        if "vercel" in name or "vercel" in desc:
            score += 3
        if "deployment" in name or "deployment" in desc:
            score += 1
        if score:
            scored.append((score, tool))
    if not scored:
        return None
    scored.sort(key=lambda item: item[0], reverse=True)
    return scored[0][1]


def build_tool_args(
    tool: dict[str, Any],
    since_iso: str,
    until_iso: str,
    project_id: str,
    project_name: str,
    team_id: str | None,
) -> dict[str, Any]:
    schema = tool.get("inputSchema") or {}
    properties = schema.get("properties") or {}
    args: dict[str, Any] = {}
    if properties:
        for prop in properties:
            key = str(prop)
            lowered = key.lower()
            if "project" in lowered and "id" in lowered:
                args[key] = project_id
            elif lowered in ("project", "projectname", "name") and project_name:
                args[key] = project_name
            elif lowered in ("environment", "env"):
                args[key] = "production"
            elif lowered in ("since", "start", "from", "starttime", "start_time"):
                args[key] = since_iso
            elif lowered in ("until", "end", "to", "endtime", "end_time"):
                args[key] = until_iso
            elif lowered == "limit":
                args[key] = 1000
            elif "team" in lowered and "id" in lowered and team_id:
                args[key] = team_id
    if not args:
        args = {
            "projectId": project_id,
            "project": project_name,
            "environment": "production",
            "since": since_iso,
            "until": until_iso,
            "limit": 1000,
        }
        if team_id:
            args["teamId"] = team_id
    return args


def extract_log_items(result: Any) -> list[Any]:
    if result is None:
        return []
    if isinstance(result, list):
        return result
    if isinstance(result, dict):
        for key in ("logs", "entries", "items", "data", "results"):
            if isinstance(result.get(key), list):
                return result[key]
        content = result.get("content")
        if isinstance(content, list):
            text_chunks = []
            for item in content:
                if isinstance(item, dict) and isinstance(item.get("text"), str):
                    text_chunks.append(item["text"])
                elif isinstance(item, str):
                    text_chunks.append(item)
            if text_chunks:
                return text_to_items("\n".join(text_chunks))
        if isinstance(result.get("text"), str):
            return text_to_items(result["text"])
    if isinstance(result, str):
        return text_to_items(result)
    return []


def text_to_items(text: str) -> list[Any]:
    items: list[Any] = []
    for line in text.splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            items.append(json.loads(line))
        except json.JSONDecodeError:
            items.append(line)
    return items


def normalize_entry(entry: Any, project_label: str) -> dict[str, Any]:
    if isinstance(entry, dict):
        normalized: dict[str, Any] = dict(entry)
    else:
        normalized = {"message": str(entry), "raw": str(entry), "meta": {}}
    normalized["source"] = "vercel"
    normalized["env"] = "production"
    normalized["project"] = project_label

    ts_value = normalized.get("ts") or normalized.get("timestamp") or normalized.get("time")
    ts_dt = parse_timestamp(ts_value) or utc_now()
    normalized["ts"] = isoformat_utc(ts_dt)

    level = normalized.get("level") or normalized.get("severity")
    if not level:
        level = "info"
    normalized["level"] = str(level).lower()

    if "message" not in normalized:
        for key in ("msg", "text", "event", "error"):
            if key in normalized:
                normalized["message"] = normalized.get(key)
                break
    return redact_data(normalized)


def dedupe_key(entry: dict[str, Any]) -> str:
    for key in ("requestId", "request_id", "id", "logId"):
        value = entry.get(key)
        if value:
            return f"{key}:{value}"
    parts = {
        "ts": entry.get("ts"),
        "message": entry.get("message"),
        "status": entry.get("status"),
        "pathname": entry.get("pathname"),
        "deploymentId": entry.get("deploymentId"),
    }
    return json.dumps(parts, sort_keys=True, ensure_ascii=True)


def load_watermark(path: Path) -> tuple[str | None, set[str]]:
    data = load_json(path) or {}
    last_seen_ts = data.get("last_seen_ts")
    keys = data.get("last_seen_keys") or []
    if not isinstance(keys, list):
        keys = []
    return last_seen_ts, set(str(item) for item in keys)


def save_watermark(path: Path, last_seen_ts: str, keys: Iterable[str]) -> None:
    payload = {"last_seen_ts": last_seen_ts, "last_seen_keys": sorted(set(keys))}
    write_json(path, payload)


def main() -> int:
    parser = argparse.ArgumentParser(description="Pull Vercel production logs via MCP.")
    parser.add_argument("--since-minutes", type=int, default=5)
    parser.add_argument("--project-id", default=os.environ.get("VERCEL_PROJECT_ID", DEFAULT_PROJECT_ID))
    parser.add_argument(
        "--project-name", default=os.environ.get("VERCEL_PROJECT_NAME", DEFAULT_PROJECT_NAME)
    )
    parser.add_argument("--team-id", default=os.environ.get("VERCEL_TEAM_ID", DEFAULT_TEAM_ID))
    args = parser.parse_args()

    root = resolve_repo_root()
    logs_dir = root / "logs"
    ensure_dir(logs_dir)

    rotate_file(logs_dir / LOG_FILE_NAME, 20 * 1024 * 1024, 10)
    rotate_file(logs_dir / "vercel_pull_health.ndjson", 5 * 1024 * 1024, 5)
    rotate_file(logs_dir / "launchd.out.log", 5 * 1024 * 1024, 5)
    rotate_file(logs_dir / "launchd.err.log", 5 * 1024 * 1024, 5)

    start_time = utc_now()
    watermark_path = logs_dir / ".vercel_watermark.json"
    last_seen_ts, last_seen_keys = load_watermark(watermark_path)
    last_seen_dt = parse_timestamp(last_seen_ts) if last_seen_ts else None
    since_dt = last_seen_dt
    if since_dt is None:
        since_dt = start_time - timedelta(minutes=args.since_minutes)
    since_iso = isoformat_utc(since_dt)
    until_iso = isoformat_utc(start_time)

    health_entry: dict[str, Any] = {
        "ts": isoformat_utc(start_time),
        "event": "vercel_pull",
        "since": since_iso,
        "until": until_iso,
    }

    try:
        mcp_url = load_mcp_http_url()
        if not mcp_url:
            raise RuntimeError(
                "No MCP HTTP URL found. Set VERCEL_MCP_HTTP_URL or configure a "
                "streamable HTTP MCP server."
            )
        tools_result = mcp_call(mcp_url, "tools/list", {})
        tools = tools_result.get("tools") if isinstance(tools_result, dict) else None
        if not isinstance(tools, list):
            raise RuntimeError("MCP tools/list did not return tools.")
        tool = select_log_tool(tools)
        if not tool:
            raise RuntimeError("No Vercel log tool found in MCP server.")
        tool_args = build_tool_args(
            tool, since_iso, until_iso, args.project_id, args.project_name, args.team_id
        )
        logs_result = mcp_call(
            mcp_url, "tools/call", {"name": tool.get("name"), "arguments": tool_args}
        )
        items = extract_log_items(logs_result)
        normalized: list[dict[str, Any]] = []
        seen_keys: set[str] = set()
        for item in items:
            entry = normalize_entry(item, args.project_name or "drsayuj.info")
            entry_ts = parse_timestamp(entry.get("ts"))
            entry_key = dedupe_key(entry)
            if entry_key in seen_keys:
                continue
            if last_seen_dt and entry_ts:
                if entry_ts < last_seen_dt:
                    continue
                if entry_ts == last_seen_dt and entry_key in last_seen_keys:
                    continue
            seen_keys.add(entry_key)
            normalized.append(entry)

        if normalized:
            normalized.sort(key=lambda row: row.get("ts", ""))
            append_ndjson(logs_dir / LOG_FILE_NAME, normalized)
            latest_ts = normalized[-1]["ts"]
            latest_keys = [dedupe_key(row) for row in normalized if row.get("ts") == latest_ts]
            save_watermark(watermark_path, latest_ts, latest_keys)

        duration_ms = int((utc_now() - start_time).total_seconds() * 1000)
        health_entry.update(
            {
                "ok": True,
                "count": len(normalized),
                "duration_ms": duration_ms,
            }
        )
    except Exception as exc:  # noqa: BLE001
        duration_ms = int((utc_now() - start_time).total_seconds() * 1000)
        health_entry.update(
            {
                "ok": False,
                "count": 0,
                "duration_ms": duration_ms,
                "error": redact_string(str(exc)),
            }
        )

    append_ndjson(logs_dir / "vercel_pull_health.ndjson", [health_entry])
    return 0 if health_entry.get("ok") else 1


if __name__ == "__main__":
    raise SystemExit(main())
