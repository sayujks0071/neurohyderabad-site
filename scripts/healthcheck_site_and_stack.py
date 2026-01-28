from __future__ import annotations

import time
from pathlib import Path
from typing import Any
from urllib import request

from local_log_utils import (
    append_ndjson,
    ensure_dir,
    file_recent,
    isoformat_utc,
    redact_string,
    rotate_file,
    utc_now,
)


def resolve_repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def select_secondary_path(root: Path) -> str | None:
    candidates = ["/appointment", "/contact", "/services"]
    for route in candidates:
        slug = route.strip("/").split("/")[0]
        if list(root.glob(f"app/**/{slug}/page.tsx")):
            return route
    return None


def check_url(url: str, timeout: int = 10) -> dict[str, Any]:
    start = time.monotonic()
    try:
        req = request.Request(url, method="GET", headers={"User-Agent": "vercel-local-drain/1.0"})
        with request.urlopen(req, timeout=timeout) as resp:
            status = resp.getcode()
            resp.read(128)
        latency_ms = int((time.monotonic() - start) * 1000)
        return {"ok": 200 <= status < 400, "status": status, "latency_ms": latency_ms}
    except Exception as exc:  # noqa: BLE001
        latency_ms = int((time.monotonic() - start) * 1000)
        return {"ok": False, "status": None, "latency_ms": latency_ms, "error": redact_string(str(exc))}


def main() -> int:
    root = resolve_repo_root()
    logs_dir = root / "logs"
    ensure_dir(logs_dir)

    rotate_file(logs_dir / "healthcheck.ndjson", 5 * 1024 * 1024, 5)
    rotate_file(logs_dir / "launchd.out.log", 5 * 1024 * 1024, 5)
    rotate_file(logs_dir / "launchd.err.log", 5 * 1024 * 1024, 5)

    checks: dict[str, Any] = {}
    checks["site_root"] = check_url("https://www.drsayuj.info/")

    secondary = select_secondary_path(root)
    if secondary:
        checks["site_secondary"] = check_url(f"https://www.drsayuj.info{secondary}")

    checks["loki_ready"] = check_url("http://localhost:3100/ready")
    checks["grafana_login"] = check_url("http://localhost:3000/login")

    is_fresh, age_seconds = file_recent(logs_dir / "vercel_prod.ndjson", 600)
    checks["log_freshness"] = {
        "ok": is_fresh,
        "age_seconds": age_seconds,
    }

    ok = all(value.get("ok") for value in checks.values())
    payload = {
        "ts": isoformat_utc(utc_now()),
        "event": "healthcheck",
        "ok": ok,
        "checks": checks,
    }
    append_ndjson(logs_dir / "healthcheck.ndjson", [payload])
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
