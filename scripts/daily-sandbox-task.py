import asyncio
import os
import json
import logging
from datetime import timedelta
import httpx

from code_interpreter import CodeInterpreter, SupportedLanguage
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

        # 5. Create a code interpreter
        interpreter = await CodeInterpreter.create(sandbox)

        script_code = """
import json
import datetime
import urllib.request
from html.parser import HTMLParser

class SEOParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_title = False
        self.in_h1 = False
        self.title = ""
        self.meta_description = ""
        self.h1_tags = []

    def handle_starttag(self, tag, attrs):
        if tag == "title":
            self.in_title = True
        elif tag == "h1":
            self.in_h1 = True
        elif tag == "meta":
            attrs_dict = dict(attrs)
            if attrs_dict.get("name", "").lower() == "description":
                self.meta_description = attrs_dict.get("content", "")

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        elif tag == "h1":
            self.in_h1 = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        elif self.in_h1:
            self.h1_tags.append(data.strip())

def generate_daily_report():
    url = "https://www.drsayuj.info"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')

        parser = SEOParser()
        parser.feed(html)

        report = {
            "date": datetime.datetime.now().isoformat(),
            "status": "success",
            "url": url,
            "seo_data": {
                "title": parser.title.strip(),
                "meta_description": parser.meta_description,
                "h1_tags": [tag for tag in parser.h1_tags if tag]
            },
            "recommendation": "Review the extracted SEO tags for improvements."
        }
    except Exception as e:
        report = {
            "date": datetime.datetime.now().isoformat(),
            "status": "error",
            "error": str(e)
        }

    with open("/tmp/daily_report.json", "w") as f:
        json.dump(report, f, indent=2)
    return "Report generated inside OpenSandbox."

print(generate_daily_report())
"""

        # 6. Execute Python code using CodeInterpreter
        logger.info("Executing the script in the isolated environment using CodeInterpreter...")
        result = await interpreter.codes.run(
              script_code,
              language=SupportedLanguage.PYTHON,
        )

        if result.result and result.result[0].text:
            logger.info(f"Execution Result: {result.result[0].text.strip()}")
        if result.logs.stdout:
            logger.info(f"Sandbox Output: {result.logs.stdout[0].text.strip()}")
        if result.logs.stderr:
            logger.warning(f"Sandbox Errors: {result.logs.stderr[0].text.strip()}")

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
