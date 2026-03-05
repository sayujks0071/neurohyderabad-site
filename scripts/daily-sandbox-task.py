import asyncio
import os
import json
import logging
from datetime import timedelta
import httpx

from opensandbox import Sandbox
from code_interpreter import CodeInterpreter, SupportedLanguage

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
import urllib.request
from html.parser import HTMLParser
import json

class SEOHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_title = False
        self.in_h1 = False
        self.title = ""
        self.h1 = ""
        self.meta_desc = ""

    def handle_starttag(self, tag, attrs):
        if tag == "title":
            self.in_title = True
        elif tag == "h1":
            self.in_h1 = True
        elif tag == "meta":
            attrs_dict = dict(attrs)
            if attrs_dict.get("name", "").lower() == "description":
                self.meta_desc = attrs_dict.get("content", "")

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        elif tag == "h1":
            self.in_h1 = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        elif self.in_h1:
            self.h1 += data

url = "https://www.drsayuj.info"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        html_content = response.read().decode('utf-8')

    parser = SEOHTMLParser()
    parser.feed(html_content)

    seo_data = {
        "url": url,
        "title": parser.title.strip(),
        "h1": parser.h1.strip(),
        "meta_description": parser.meta_desc.strip()
    }

    with open("/tmp/daily_report.json", "w") as f:
        json.dump(seo_data, f, indent=2)
    print("SEO data generated successfully inside OpenSandbox.")
except Exception as e:
    print(f"Error: {e}")
"""
        # 3. Create a code interpreter and execute Python code
        logger.info("Executing the script in the isolated environment using CodeInterpreter...")
        interpreter = await CodeInterpreter.create(sandbox)

        execution = await interpreter.codes.run(
            script_code,
            language=SupportedLanguage.PYTHON,
        )

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
