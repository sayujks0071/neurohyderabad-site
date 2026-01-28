from __future__ import annotations

import argparse
import json
import os
import re
from collections import Counter
from datetime import timedelta
from pathlib import Path
from typing import Any
from urllib import parse, request

from local_log_utils import (
    append_ndjson,
    ensure_dir,
    isoformat_utc,
    parse_timestamp,
    redact_data,
    redact_string,
    rotate_file,
    utc_now,
)

ERROR_RE = (
    r"(ERROR|Unhandled|TypeError|ReferenceError|Function invocation failed|Edge error|Timeout|"
    r"504|503|502|500)"
)


def resolve_repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def query_loki(url: str, start_ns: int, end_ns: int, limit: int) -> list[str]:
    query = '{job="vercel"}'
    params = {
        "query": query,
        "start": str(start_ns),
        "end": str(end_ns),
        "limit": str(limit),
        "direction": "backward",
    }
    query_string = parse.urlencode(params)
    req = request.Request(f"{url}/loki/api/v1/query_range?{query_string}")
    with request.urlopen(req, timeout=20) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    lines: list[str] = []
    for stream in data.get("data", {}).get("result", []):
        for _, line in stream.get("values", []):
            lines.append(line)
    return lines


def read_local_logs(path: Path, since_dt) -> list[str]:
    if not path.exists():
        return []
    lines: list[str] = []
    with path.open("r", encoding="utf-8") as handle:
        for line in handle:
            try:
                obj = json.loads(line)
            except json.JSONDecodeError:
                continue
            ts = parse_timestamp(obj.get("ts"))
            if ts and ts >= since_dt:
                lines.append(line.strip())
    return lines


def extract_message(payload: Any) -> str:
    if isinstance(payload, dict):
        for key in ("message", "msg", "text", "error"):
            value = payload.get(key)
            if isinstance(value, str) and value:
                return value
        summary_parts = []
        for key in ("level", "status", "pathname", "deploymentId", "requestId"):
            value = payload.get(key)
            if value:
                summary_parts.append(f"{key}={value}")
        return " ".join(summary_parts) if summary_parts else "log entry"
    if isinstance(payload, str):
        return payload
    return str(payload)


def send_telegram(message: str) -> None:
    token = os.environ.get("TELEGRAM_BOT_TOKEN")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID")
    if not token or not chat_id:
        return
    payload = parse.urlencode({"chat_id": chat_id, "text": message}).encode("utf-8")
    req = request.Request(
        f"https://api.telegram.org/bot{token}/sendMessage",
        data=payload,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    try:
        with request.urlopen(req, timeout=10):
            return
    except Exception:
        return


def main() -> int:
    parser = argparse.ArgumentParser(description="Check logs for alert-worthy events.")
    parser.add_argument("--minutes", type=int, default=10)
    parser.add_argument("--threshold", type=int, default=10)
    parser.add_argument("--limit", type=int, default=2000)
    parser.add_argument("--loki-url", default="http://localhost:3100")
    args = parser.parse_args()

    root = resolve_repo_root()
    logs_dir = root / "logs"
    ensure_dir(logs_dir)

    rotate_file(logs_dir / "alerts.ndjson", 5 * 1024 * 1024, 10)
    rotate_file(logs_dir / "launchd.out.log", 5 * 1024 * 1024, 5)
    rotate_file(logs_dir / "launchd.err.log", 5 * 1024 * 1024, 5)

    end_dt = utc_now()
    start_dt = end_dt - timedelta(minutes=args.minutes)
    start_ns = int(start_dt.timestamp() * 1_000_000_000)
    end_ns = int(end_dt.timestamp() * 1_000_000_000)

    used_loki = False
    lines: list[str] = []
    try:
        lines = query_loki(args.loki_url, start_ns, end_ns, args.limit)
        used_loki = True
    except Exception:
        lines = read_local_logs(logs_dir / "vercel_prod.ndjson", start_dt)

    error_count = 0
    matched = False
    message_counter: Counter[str] = Counter()
    for line in lines:
        try:
            payload = json.loads(line)
        except json.JSONDecodeError:
            payload = line
        payload = redact_data(payload)
        message = redact_string(extract_message(payload))
        if not message:
            continue
        if re.search(ERROR_RE, message, re.IGNORECASE):
            matched = True
            error_count += 1
            message_counter[message] += 1

    top_messages = [msg[:160] for msg, _ in message_counter.most_common(5)]
    triggered = matched or error_count > args.threshold

    payload = {
        "ts": isoformat_utc(end_dt),
        "event": "alert_check",
        "triggered": triggered,
        "error_count": error_count,
        "threshold": args.threshold,
        "window_minutes": args.minutes,
        "source": "vercel",
        "used_loki": used_loki,
        "top_messages": top_messages,
    }
    append_ndjson(logs_dir / "alerts.ndjson", [payload])

    if triggered:
        summary = (
            f"Vercel log alert ({args.minutes}m)\n"
            f"Errors: {error_count} (threshold {args.threshold})\n"
            f"Top: {', '.join(top_messages[:3])}"
        )
        send_telegram(summary)

    return 0 if not triggered else 2


if __name__ == "__main__":
    raise SystemExit(main())
