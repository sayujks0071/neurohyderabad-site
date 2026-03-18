import asyncio
import os
import json
import logging
from datetime import timedelta

from opensandbox import Sandbox
from opensandbox.models import WriteEntry
from code_interpreter import CodeInterpreter, SupportedLanguage

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("daily-sandbox")

async def main() -> None:
    logger.info("🚀 Starting Daily OpenSandbox Improvement Task...")

    try:
        sandbox = await Sandbox.create(
            "opensandbox/code-interpreter:v1.0.1",
            entrypoint=["/opt/opensandbox/code-interpreter.sh"],
            timeout=timedelta(minutes=10),
            env={"PYTHON_VERSION": "3.11"},
        )
    except Exception as e:
        logger.error(f"❌ Sandbox creation failed: {e}")
        raise

    async with sandbox:
        logger.info(f"✅ Sandbox created (ID: {sandbox.id})")

        # 1. Read the keyword registry from the host repository
        try:
            with open("seo/keyword-registry.json", "r") as f:
                keyword_registry_data = f.read()
        except FileNotFoundError:
            logger.warning("seo/keyword-registry.json not found. Using an empty JSON array.")
            keyword_registry_data = "[]"

        # 2. Write the keyword registry into the sandbox filesystem
        logger.info("Writing keyword registry to the isolated environment...")
        await sandbox.files.write_files([
            WriteEntry(path="/tmp/keyword-registry.json", data=keyword_registry_data, mode=644)
        ])

        # 3. Create a Code Interpreter
        interpreter = await CodeInterpreter.create(sandbox)

        # 4. Execute a shell command to install dependencies
        logger.info("Installing beautifulsoup4 and requests inside the sandbox...")
        execution = await sandbox.commands.run("pip install beautifulsoup4 requests")
        if execution.logs.stdout:
            logger.info(f"Pip Output: {execution.logs.stdout[0].text.strip()}")

        # 5. Define Python code to run in the sandbox
        # This code reads the injected JSON, selects 5 target pages, fetches them, and analyzes them for SEO/CWV proxies.
        python_code = """
import json
import datetime
import requests
from bs4 import BeautifulSoup
import time
import random

def analyze_page(url, target_keyword):
    start_time = time.time()
    try:
        response = requests.get(url, timeout=10, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        response_time = time.time() - start_time
    except Exception as e:
        return {"url": url, "error": str(e), "status": "failed"}

    if response.status_code != 200:
        return {"url": url, "error": f"HTTP {response.status_code}", "status": "failed"}

    soup = BeautifulSoup(response.text, 'html.parser')

    title = soup.title.string.strip() if soup.title and soup.title.string else ""
    desc_tag = soup.find('meta', attrs={'name': 'description'})
    description = desc_tag['content'].strip() if desc_tag and 'content' in desc_tag.attrs else ""
    h1_tags = [h1.get_text(strip=True) for h1 in soup.find_all('h1')]

    recommendations = []

    # Check if target keyword is present in important elements
    kw_lower = target_keyword.lower()
    if kw_lower and kw_lower not in title.lower():
        recommendations.append(f"Target keyword '{target_keyword}' missing in <title>.")
    if kw_lower and not any(kw_lower in h1.lower() for h1 in h1_tags):
        recommendations.append(f"Target keyword '{target_keyword}' missing in <H1>.")

    # Core checks
    if len(title) > 60: recommendations.append("Title exceeds 60 characters.")
    if not title: recommendations.append("Missing <title> tag.")
    if not description: recommendations.append("Missing meta description.")
    if len(h1_tags) == 0: recommendations.append("Missing <H1> tag.")
    elif len(h1_tags) > 1: recommendations.append(f"Found {len(h1_tags)} <H1> tags; should be 1.")

    # YMYL / Medical safety check
    text_content = soup.get_text().lower()
    if "100% success" in text_content or "guarantee" in text_content:
        recommendations.append("YMYL Risk: Avoid absolute claims like '100% success' or 'guarantee'.")

    # Local SEO / Conversion
    has_booking_cta = any(x in text_content for x in ["book appointment", "schedule consultation", "book now", "book a consultation"])
    if not has_booking_cta:
        recommendations.append("Missing clear Booking CTA.")

    # Check internal booking link
    html_content = str(soup)
    has_internal_booking_link = "href=\"/appointments\"" in html_content or "href='/appointments'" in html_content or 'href="/appointments' in html_content or "/appointments" in html_content

    # Check WhatsApp CTA
    has_whatsapp_cta = "wa.me" in html_content or "api.whatsapp.com" in html_content or "whatsapp" in text_content

    if response_time > 2.0:
        recommendations.append(f"Page load time ({response_time:.2f}s) may impact Core Web Vitals (LCP).")

    return {
        "url": url,
        "status": "success",
        "target_keyword": target_keyword,
        "status_code": response.status_code,
        "response_time_seconds": round(response_time, 2),
        "seo_data": {
            "title": title,
            "description_length": len(description),
            "h1_count": len(h1_tags)
        },
        "has_booking_cta": has_booking_cta,
        "has_internal_booking_link": has_internal_booking_link,
        "has_whatsapp_cta": has_whatsapp_cta,
        "recommendations": recommendations
    }

def run_analysis():
    base_url = "https://www.drsayuj.info"

    try:
        with open("/tmp/keyword-registry.json", "r") as f:
            registry = json.load(f)
            keywords = registry.get("keywords", [])
    except Exception:
        keywords = []

    # Filter to items with a valid target_page and select 5 randomly for incremental daily checks
    valid_targets = [k for k in keywords if k.get("target_page")]
    if len(valid_targets) > 5:
        targets_to_check = random.sample(valid_targets, 5)
    else:
        targets_to_check = valid_targets

    report = {
        "date": datetime.datetime.now().isoformat(),
        "site": base_url,
        "pages_analyzed": [],
        "overall_summary": "Incremental daily SEO & YMYL check via OpenSandbox"
    }

    # Always check homepage
    report["pages_analyzed"].append(analyze_page(base_url, "neurosurgeon hyderabad"))

    for target in targets_to_check:
        full_url = base_url + target["target_page"] if target["target_page"].startswith("/") else target["target_page"]
        result = analyze_page(full_url, target.get("term", ""))
        report["pages_analyzed"].append(result)

    # Check 80% CTA coverage threshold
    total_pages = len(report["pages_analyzed"])
    successful_pages = [p for p in report["pages_analyzed"] if p.get("status") == "success"]
    if successful_pages:
        cta_count = sum(1 for p in successful_pages if p.get("has_booking_cta"))
        cta_coverage = cta_count / len(successful_pages)
        if cta_coverage < 0.8:
            report["overall_summary"] += " | WARNING: CTA coverage is below 80%."
            report["cta_coverage_warning"] = True
            for p in successful_pages:
                if not p.get("has_booking_cta"):
                    p["recommendations"].append("FLAGGED: Missing Booking CTA (Site coverage < 80%).")
        else:
            report["cta_coverage_warning"] = False

    with open("/tmp/daily_report.json", "w") as f:
        json.dump(report, f, indent=2)

    return "Analysis complete."

result_msg = run_analysis()
print(result_msg)
"""

        logger.info("Executing isolated Python analysis via CodeInterpreter...")
        # 6. Execute Python code (single-run, pass language directly)
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

        # 7. Read the generated file from the sandbox
        logger.info("Extracting the generated report from the sandbox...")
        try:
            report_content = await sandbox.files.read_file("/tmp/daily_report.json")

            os.makedirs("reports", exist_ok=True)
            report_path = "reports/daily_sandbox_report.json"
            with open(report_path, "w") as f:
                f.write(report_content)
            logger.info(f"✅ Successfully extracted and saved {report_path}")

        except Exception as e:
            logger.error(f"❌ Failed to retrieve report from sandbox: {e}")

    # 8. Cleanup the sandbox
    await sandbox.kill()
    logger.info("🛑 Sandbox terminated safely.")

if __name__ == "__main__":
    asyncio.run(main())
