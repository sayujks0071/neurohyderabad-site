import json
import datetime
import requests
from bs4 import BeautifulSoup
import time
import random
import os

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

    kw_lower = target_keyword.lower()
    if kw_lower and kw_lower not in title.lower():
        recommendations.append(f"Target keyword '{target_keyword}' missing in <title>.")
    if kw_lower and not any(kw_lower in h1.lower() for h1 in h1_tags):
        recommendations.append(f"Target keyword '{target_keyword}' missing in <H1>.")

    if len(title) > 60: recommendations.append("Title exceeds 60 characters.")
    if not title: recommendations.append("Missing <title> tag.")
    if not description: recommendations.append("Missing meta description.")
    if len(h1_tags) == 0: recommendations.append("Missing <H1> tag.")
    elif len(h1_tags) > 1: recommendations.append(f"Found {len(h1_tags)} <H1> tags; should be 1.")

    text_content = soup.get_text().lower()
    if "100% success" in text_content or "guarantee" in text_content:
        recommendations.append("YMYL Risk: Avoid absolute claims like '100% success' or 'guarantee'.")

    has_booking_cta = any(cta in text_content for cta in ["book appointment", "schedule consultation", "book now", "book a consultation"])
    has_internal_booking_link = "/appointments" in response.text or "book-appointment" in response.text
    has_whatsapp_cta = "wa.me" in response.text or "api.whatsapp.com" in response.text or "whatsapp" in text_content

    if not has_booking_cta:
        recommendations.append("Missing clear Booking CTA.")

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
            "h1_count": len(h1_tags),
            "has_booking_cta": has_booking_cta,
            "has_internal_booking_link": has_internal_booking_link,
            "has_whatsapp_cta": has_whatsapp_cta
        },
        "recommendations": recommendations
    }

def run_analysis(is_local=False):
    base_url = "https://www.drsayuj.info"

    registry_path = "seo/keyword-registry.json" if is_local else "/tmp/keyword-registry.json"

    try:
        with open(registry_path, "r") as f:
            registry = json.load(f)
            keywords = registry.get("keywords", [])
    except Exception:
        keywords = []

    valid_targets = [k for k in keywords if k.get("target_page")]
    if len(valid_targets) > 5:
        targets_to_check = random.sample(valid_targets, 5)
    else:
        targets_to_check = valid_targets

    report = {
        "date": datetime.datetime.now().isoformat(),
        "site": base_url,
        "pages_analyzed": [],
        "overall_summary": "Incremental daily SEO & YMYL check via OpenSandbox" + (" (Local Fallback)" if is_local else "")
    }

    report["pages_analyzed"].append(analyze_page(base_url, "neurosurgeon hyderabad"))

    for target in targets_to_check:
        full_url = base_url + target["target_page"] if target["target_page"].startswith("/") else target["target_page"]
        result = analyze_page(full_url, target.get("term", ""))
        report["pages_analyzed"].append(result)

    total_pages = len(report["pages_analyzed"])
    pages_with_cta = sum(1 for p in report["pages_analyzed"] if p.get("seo_data", {}).get("has_booking_cta", False))
    cta_coverage = (pages_with_cta / total_pages) * 100 if total_pages > 0 else 0

    report["cta_coverage_percent"] = round(cta_coverage, 2)
    if cta_coverage < 80.0:
        report["overall_summary"] += f" | WARNING: CTA coverage is {round(cta_coverage, 1)}%, which is below the 80% threshold."

    output_path = "reports/daily_sandbox_report.json" if is_local else "/tmp/daily_report.json"

    if is_local:
        os.makedirs("reports", exist_ok=True)

    with open(output_path, "w") as f:
        json.dump(report, f, indent=2)

    return "Analysis complete."

if __name__ == "__main__":
    print(run_analysis(is_local=True))
