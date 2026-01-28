SHELL := /bin/bash

.PHONY: obs-up obs-down vercel-pull check alert-once launchd-on launchd-off status

obs-up:
	cd observability && docker compose up -d

obs-down:
	cd observability && docker compose down

vercel-pull:
	python3 scripts/pull_vercel_logs.py

check:
	python3 scripts/healthcheck_site_and_stack.py

alert-once:
	python3 scripts/alert_check.py

launchd-on:
	bash scripts/install_launchd.sh

launchd-off:
	bash scripts/uninstall_launchd.sh

status:
	@echo "Log files:"
	@ls -lt logs/*.ndjson 2>/dev/null | head -n 5 || true
	@echo ""
	@echo "Watermark:"
	@cat logs/.vercel_watermark.json 2>/dev/null || true
	@echo ""
	@echo "Docker:"
	@docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
