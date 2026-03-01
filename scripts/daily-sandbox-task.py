import asyncio
import os
import json
import logging
from datetime import timedelta
import httpx

from opensandbox import Sandbox
from opensandbox.models import WriteEntry

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("daily-sandbox")

async def main() -> None:
    logger.info("🚀 Starting Daily OpenSandbox Improvement Task...")

    # 1. Create a sandbox for safe execution
    # We use a code-interpreter image which has python pre-installed.
    # We must ensure the server is accessible (running locally on port 8000 by default in the GHA workflow).
    try:
        sandbox = await Sandbox.create(
            "opensandbox/code-interpreter:v1.0.1",
            entrypoint=["/opt/opensandbox/code-interpreter.sh"],
            timeout=timedelta(minutes=10),
            env={"PYTHON_VERSION": "3.11"},
        )
    except httpx.ConnectError:
        logger.error("❌ Failed to connect to OpenSandbox server. Is it running on http://127.0.0.1:8000 ?")
        return
    except Exception as e:
        logger.error(f"❌ Sandbox creation failed: {e}")
        return

    async with sandbox:
        logger.info(f"✅ Sandbox created (ID: {sandbox.id})")

        # 2. Example Daily Task: Verify health, run a mock script, or use an LLM
        # For this example, we'll write a python script into the sandbox that simulates a code analysis
        # or SEO verification step, reporting findings back.

        script_code = """
import json
import datetime
import os

def generate_daily_report():
    report = {
        "date": datetime.datetime.now().isoformat(),
        "status": "healthy",
        "sandbox_checks": [
            {"name": "Python Execution Environment", "passed": True},
            {"name": "Security Check (Isolated)", "passed": True}
        ],
        "recommendation": "Integrate Claude Code or AI Gateway for autonomous file modifications inside this sandbox."
    }
    with open("/tmp/daily_report.json", "w") as f:
        json.dump(report, f, indent=2)
    return "Report generated inside OpenSandbox."

print(generate_daily_report())
"""
        logger.info("Writing execution script to the sandbox...")
        await sandbox.files.write_files([
            WriteEntry(path="/tmp/generate_report.py", data=script_code, mode=644)
        ])

        # 3. Execute the python script inside the sandbox
        logger.info("Executing the script in the isolated environment...")
        execution = await sandbox.commands.run("python /tmp/generate_report.py")

        if execution.logs.stdout:
            logger.info(f"Sandbox Output: {execution.logs.stdout[0].text.strip()}")
        if execution.logs.stderr:
            logger.warning(f"Sandbox Errors: {execution.logs.stderr[0].text.strip()}")

        # 4. Read the generated report back to the host filesystem
        try:
            report_content = await sandbox.files.read_file("/tmp/daily_report.json")

            os.makedirs("reports", exist_ok=True)
            report_path = "reports/daily_sandbox_report.json"
            with open(report_path, "w") as f:
                f.write(report_content)
            logger.info(f"✅ Successfully extracted and saved {report_path}")

        except Exception as e:
            logger.error(f"❌ Failed to retrieve report from sandbox: {e}")

    # 5. Cleanup
    await sandbox.kill()
    logger.info("🛑 Sandbox terminated safely.")

if __name__ == "__main__":
    asyncio.run(main())
