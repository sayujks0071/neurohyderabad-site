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
        raise

    async with sandbox:
        logger.info(f"✅ Sandbox created (ID: {sandbox.id})")

        interpreter = await CodeInterpreter.create(sandbox)

        # Install beautifulsoup4 and requests inside the code-interpreter sandbox
        logger.info("Installing beautifulsoup4 and requests...")
        await sandbox.commands.run("pip install beautifulsoup4 requests")

        python_code = """
import json
import datetime
import requests
from bs4 import BeautifulSoup
import time

def check_url(url, timeout=10):
    try:
        start_time = time.time()
        response = requests.get(url, timeout=timeout, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        response_time = time.time() - start_time
        return response, response_time, None
    except requests.RequestException as e:
        return None, None, str(e)

def analyze_page(url, response, response_time):
    soup = BeautifulSoup(response.text, 'html.parser')

    title = soup.title.string.strip() if soup.title and soup.title.string else ""
    desc_tag = soup.find('meta', attrs={'name': 'description'})
    description = desc_tag['content'].strip() if desc_tag and 'content' in desc_tag.attrs else ""

    h1_tags = [h1.get_text(strip=True) for h1 in soup.find_all('h1')]
    h2_tags = [h2.get_text(strip=True) for h2 in soup.find_all('h2')]

    links = soup.find_all('a', href=True)
    internal_links = []
    external_links = []

    for link in links:
        href = link['href']
        if href.startswith('/') or url in href:
            internal_links.append(href)
        elif href.startswith('http'):
            external_links.append(href)

    images = soup.find_all('img')
    images_without_alt = [img['src'] for img in images if not img.get('alt')]

    recommendations = []
    if response_time > 2.0:
        recommendations.append(f"Page load time is {response_time:.2f}s. Consider optimizing images or server response time to get it under 2.0s.")

    if len(title) > 60:
        recommendations.append(f"Title is {len(title)} characters long. SEO best practices recommend keeping meta titles under 60 characters.")
    elif not title:
        recommendations.append("Title tag is missing or empty. Please add one.")

    if len(description) > 155:
        recommendations.append(f"Description is {len(description)} characters long. Keep meta descriptions under 155 characters.")
    elif not description:
        recommendations.append("Meta description is missing or empty. Please add one.")

    if len(h1_tags) == 0:
        recommendations.append("No H1 tag found on the page. Every page should have exactly one H1 tag summarizing its content.")
    elif len(h1_tags) > 1:
        recommendations.append(f"Found {len(h1_tags)} H1 tags. It is generally recommended to have only one H1 tag per page.")

    if len(images_without_alt) > 0:
        recommendations.append(f"Found {len(images_without_alt)} images without alt text. Add alt text for better accessibility and SEO.")

    return {
        "url": url,
        "status_code": response.status_code,
        "response_time_seconds": round(response_time, 2),
        "seo_data": {
            "title": title,
            "description": description,
            "h1_count": len(h1_tags),
            "h2_count": len(h2_tags),
            "internal_links_count": len(internal_links),
            "external_links_count": len(external_links),
            "images_without_alt_count": len(images_without_alt)
        },
        "recommendations": recommendations
    }

def generate_daily_report():
    base_url = "https://www.drsayuj.info"
    urls_to_check = [
        base_url,
        f"{base_url}/sitemap.xml",
        f"{base_url}/robots.txt"
    ]

    report = {
        "date": datetime.datetime.now().isoformat(),
        "site": base_url,
        "pages": [],
        "overall_recommendations": []
    }

    for url in urls_to_check:
        response, response_time, error = check_url(url)

        if error:
            report["pages"].append({
                "url": url,
                "status": "error",
                "error": error
            })
            report["overall_recommendations"].append(f"Failed to access {url}: {error}")
            continue

        if "sitemap" in url or "robots" in url:
            report["pages"].append({
                "url": url,
                "status": "success",
                "status_code": response.status_code,
                "response_time_seconds": round(response_time, 2)
            })
            if response.status_code != 200:
                report["overall_recommendations"].append(f"{url} returned status code {response.status_code}. Ensure it is accessible.")
        else:
            page_data = analyze_page(url, response, response_time)
            page_data["status"] = "success"
            report["pages"].append(page_data)

    with open("/tmp/daily_report.json", "w") as f:
        json.dump(report, f, indent=2)

    return "Comprehensive Report generated inside OpenSandbox."

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
