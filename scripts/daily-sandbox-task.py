import asyncio
import os
import json
import logging
from datetime import timedelta
import httpx

from opensandbox import Sandbox
from opensandbox.models import WriteEntry
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
    except Exception as e:
        logger.error(f"❌ Sandbox creation failed: {e}")
        return

    async with sandbox:
        logger.info(f"✅ Sandbox created (ID: {sandbox.id})")

        interpreter = await CodeInterpreter.create(sandbox)

        python_code = """
import json
import datetime
import urllib.request
from html.parser import HTMLParser

class SEOParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.description = ""
        self.h1_tags = []
        self.in_title = False
        self.in_h1 = False

    def handle_starttag(self, tag, attrs):
        if tag == "title":
            self.in_title = True
        elif tag == "meta":
            attrs_dict = dict(attrs)
            if attrs_dict.get("name") == "description":
                self.description = attrs_dict.get("content", "")
        elif tag == "h1":
            self.in_h1 = True

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

        title = parser.title.strip()
        description = parser.description.strip()
        h1_tags = [tag for tag in parser.h1_tags if tag]

        recommendations = []
        if len(title) > 60:
            recommendations.append(f"Title is {len(title)} characters long. SEO best practices recommend keeping meta titles under 60 characters to avoid truncation on search engines. Consider shortening it.")
        elif not title:
            recommendations.append("Title tag is missing or empty. A title tag is crucial for SEO and user experience. Please add one.")

        if len(description) > 155:
            recommendations.append(f"Description is {len(description)} characters long. SEO best practices recommend keeping meta descriptions under 155 characters. Consider shortening it.")
        elif not description:
            recommendations.append("Meta description is missing or empty. A well-written description improves click-through rates. Please add one.")

        if len(h1_tags) == 0:
            recommendations.append("No H1 tag found on the page. Every page should have exactly one H1 tag summarizing its content for better SEO.")
        elif len(h1_tags) > 1:
            recommendations.append(f"Found {len(h1_tags)} H1 tags. It is generally recommended to have only one H1 tag per page to maintain clear document structure.")

        report = {
            "date": datetime.datetime.now().isoformat(),
            "status": "success",
            "url": url,
            "seo_data": {
                "title": title,
                "description": description,
                "h1_tags": h1_tags
            },
            "recommendations": recommendations
        }
    except Exception as e:
        report = {
            "date": datetime.datetime.now().isoformat(),
            "status": "error",
            "url": url,
            "error": str(e)
        }

    with open("/tmp/daily_report.json", "w") as f:
        json.dump(report, f, indent=2)

    return "Report generated inside OpenSandbox."

generate_daily_report()
"""

        logger.info("Executing Python code via CodeInterpreter...")
        result = await interpreter.codes.run(
            python_code,
            language=SupportedLanguage.PYTHON,
        )

        if result.result and result.result[0].text:
            logger.info(f"Interpreter Result: {result.result[0].text.strip()}")
        if result.logs.stdout and result.logs.stdout[0].text:
            logger.info(f"Sandbox Output: {result.logs.stdout[0].text.strip()}")
        if result.logs.stderr and result.logs.stderr[0].text:
            logger.warning(f"Sandbox Errors: {result.logs.stderr[0].text.strip()}")

        # Read the generated report back to the host filesystem
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
