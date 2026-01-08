#!/usr/bin/env python3

"""
Convenience runner for Bloom evaluations.

This script assumes Bloom is installed (see docs/BLOOM_EVALS.txt):
  pip install git+https://github.com/safety-research/bloom.git

Run:
  python3 scripts/bloom/run_bloom.py
"""

from __future__ import annotations

import os
import subprocess
import sys
from pathlib import Path


def main() -> int:
    repo_root = Path(__file__).resolve().parents[2]
    config_dir = repo_root / "bloom-data"

    if not config_dir.exists():
        print(f"Expected Bloom config directory at: {config_dir}", file=sys.stderr)
        return 2

    if not os.environ.get("OPENAI_API_KEY"):
        print("Missing environment variable: OPENAI_API_KEY", file=sys.stderr)
        print("Set it first, e.g.:\n  export OPENAI_API_KEY='...'\n", file=sys.stderr)
        return 2

    cmd = ["bloom", "run", str(config_dir)]
    print(f"Running: {' '.join(cmd)}")
    return subprocess.call(cmd, cwd=str(repo_root))


if __name__ == "__main__":
    raise SystemExit(main())

