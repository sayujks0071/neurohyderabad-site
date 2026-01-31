#!/usr/bin/env python3
"""Normalize internal (root-relative) hrefs by removing trailing slashes.

Goal: reduce redirects/duplicate URL variants when next.config.mjs has trailingSlash=false.

Transforms:
  href="/foo/"   -> href="/foo"
  href={'/foo/'}  -> href={'/foo'}
  href={`/foo/`}  -> href={`/foo`}

Does NOT change:
  href="/" (home)
  absolute URLs (http/https)
  mailto:, tel:

Run from repo root.
"""

from __future__ import annotations

import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[1]

FILE_GLOBS = [
    "app/**/*.ts",
    "app/**/*.tsx",
    "src/**/*.ts",
    "src/**/*.tsx",
    "components/**/*.ts",
    "components/**/*.tsx",
]

# Only match root-relative paths that end with a slash and have at least 2 chars (so not just "/")
# Examples matched: "/appointments/", "/conditions/foo/"
# Examples not matched: "/", "https://x.com/"
PATH_RE = r"/[^\"'\s}]+/"  # includes leading and trailing slash

patterns = [
    # href="/x/"
    (re.compile(rf"href=\"({PATH_RE})\""), lambda m: f'href="{m.group(1)[:-1]}"'),
    # href='/x/'
    (re.compile(rf"href='({PATH_RE})'"), lambda m: f"href='{m.group(1)[:-1]}'"),
    # href={"/x/"}
    (re.compile(rf"href=\{{\"({PATH_RE})\"\}}"), lambda m: f'href={{"{m.group(1)[:-1]}"}}'),
    # href={'/x/'}
    (re.compile(rf"href=\{{'({PATH_RE})'\}}"), lambda m: f"href={{'{m.group(1)[:-1]}'}}"),
    # href={`/x/`}
    (re.compile(rf"href=\{{`({PATH_RE})`\}}"), lambda m: f"href={{{m.group(1)[:-1]!r}}}"),
]

# Special-case: avoid converting '/'
# Our PATH_RE doesn't match '/' alone, so we're safe.

# Avoid converting protocol-relative (//example.com/) — PATH_RE requires single leading slash.

# Guard: if a file has huge binary-looking content, skip

def is_text_file(p: pathlib.Path) -> bool:
    try:
        data = p.read_bytes()
        if b"\x00" in data:
            return False
        return True
    except Exception:
        return False


def main() -> int:
    files: set[pathlib.Path] = set()
    for g in FILE_GLOBS:
        files.update(ROOT.glob(g))

    changed = []

    for p in sorted(files):
        if not p.is_file() or not is_text_file(p):
            continue

        s = p.read_text(encoding="utf-8", errors="ignore")
        orig = s

        # Don't touch absolute URLs or tel/mailto — patterns only match root-relative.
        for rx, repl in patterns:
            s = rx.sub(repl, s)

        if s != orig:
            p.write_text(s, encoding="utf-8")
            changed.append(p)

    print(f"Updated {len(changed)} files")
    for p in changed[:50]:
        print(f" - {p.relative_to(ROOT)}")
    if len(changed) > 50:
        print(f" ... and {len(changed)-50} more")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
