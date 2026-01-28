from __future__ import annotations

import json
import os
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterable

SENSITIVE_KEY_RE = re.compile(
    r"(authorization|cookie|set-cookie|token|api_key|access_token|refresh_token|id_token|"
    r"enctoken|password)",
    re.IGNORECASE,
)
AUTH_HEADER_RE = re.compile(
    r"(?i)\b(authorization|cookie|set-cookie|x-api-key|api_key|access_token|refresh_token|"
    r"id_token|enctoken|password)\s*[:=]\s*([^\n,;]+)"
)
QUERY_TOKEN_RE = re.compile(
    r"(?i)\b(api_key|access_token|refresh_token|id_token|enctoken|password)=([^\s&#]+)"
)
JWT_RE = re.compile(r"\beyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\b")
EMAIL_RE = re.compile(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b")
PHONE_RE = re.compile(r"\b(?:\+?\d[\d\s().-]{8,}\d)\b")


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def isoformat_utc(dt: datetime) -> str:
    return dt.astimezone(timezone.utc).isoformat(timespec="milliseconds").replace("+00:00", "Z")


def parse_timestamp(value: Any) -> datetime | None:
    if value is None:
        return None
    if isinstance(value, (int, float)):
        seconds = float(value)
        if seconds > 1e12:
            seconds = seconds / 1000.0
        return datetime.fromtimestamp(seconds, tz=timezone.utc)
    if isinstance(value, str):
        text = value.strip()
        if not text:
            return None
        if text.isdigit():
            return parse_timestamp(int(text))
        try:
            if text.endswith("Z"):
                text = text[:-1] + "+00:00"
            return datetime.fromisoformat(text).astimezone(timezone.utc)
        except ValueError:
            return None
    return None


def ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def rotate_file(path: Path, max_bytes: int, backups: int) -> None:
    if not path.exists():
        return
    try:
        size = path.stat().st_size
    except OSError:
        return
    if size <= max_bytes:
        return
    for idx in range(backups, 0, -1):
        src = path.with_suffix(path.suffix + f".{idx}")
        dst = path.with_suffix(path.suffix + f".{idx + 1}")
        if dst.exists():
            dst.unlink()
        if src.exists():
            src.rename(dst)
    rotated = path.with_suffix(path.suffix + ".1")
    if rotated.exists():
        rotated.unlink()
    path.rename(rotated)


def load_json(path: Path) -> dict[str, Any] | None:
    if not path.exists():
        return None
    try:
        with path.open("r", encoding="utf-8") as handle:
            return json.load(handle)
    except (OSError, json.JSONDecodeError):
        return None


def write_json(path: Path, payload: dict[str, Any]) -> None:
    with path.open("w", encoding="utf-8") as handle:
        json.dump(payload, handle, ensure_ascii=True, indent=2)


def append_ndjson(path: Path, records: Iterable[dict[str, Any]]) -> None:
    with path.open("a", encoding="utf-8") as handle:
        for record in records:
            handle.write(json.dumps(record, ensure_ascii=True, separators=(",", ":")))
            handle.write("\n")


def redact_string(text: str) -> str:
    if not text:
        return text
    redacted = AUTH_HEADER_RE.sub(r"\1=[REDACTED]", text)
    redacted = QUERY_TOKEN_RE.sub(r"\1=[REDACTED]", redacted)
    redacted = JWT_RE.sub("[REDACTED_JWT]", redacted)
    redacted = EMAIL_RE.sub("[REDACTED_EMAIL]", redacted)
    redacted = PHONE_RE.sub("[REDACTED_PHONE]", redacted)
    return redacted


def redact_data(value: Any) -> Any:
    if isinstance(value, dict):
        redacted: dict[str, Any] = {}
        for key, item in value.items():
            if SENSITIVE_KEY_RE.search(str(key)):
                redacted[key] = "[REDACTED]"
            else:
                redacted[key] = redact_data(item)
        return redacted
    if isinstance(value, list):
        return [redact_data(item) for item in value]
    if isinstance(value, str):
        return redact_string(value)
    return value


def file_recent(path: Path, max_age_seconds: int) -> tuple[bool, float | None]:
    if not path.exists():
        return False, None
    try:
        mtime = path.stat().st_mtime
    except OSError:
        return False, None
    age = max(0.0, datetime.now().timestamp() - mtime)
    return age <= max_age_seconds, age


def safe_path(path: Path) -> str:
    try:
        return os.fspath(path)
    except TypeError:
        return str(path)
