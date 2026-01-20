import time
import csv
import urllib.request
import urllib.error
import os

URLS = [
    "https://www.drsayuj.info",
    "https://www.drsayuj.info/services/minimally-invasive-spine-surgery",
    "https://www.drsayuj.info/conditions/brain-tumor-surgery-hyderabad",
    "https://www.drsayuj.info/neurosurgeon-hyderabad",
    "https://www.drsayuj.info/blog/meningioma-brain-tumor-treatment-hyderabad"
]

OUTPUT_DIR = "audit/headers"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def check_headers():
    report_md = "# Headers & Performance Report\n\n"
    ttfb_data = []

    for url in URLS:
        print(f"Checking {url}...")
        try:
            start_time = time.time()
            req = urllib.request.Request(url, headers={'User-Agent': 'SEO-Audit-Bot/1.0'})
            with urllib.request.urlopen(req) as response:
                end_time = time.time()
                ttfb = (end_time - start_time) * 1000 # ms
                headers = response.info()

                report_md += f"## {url}\n\n"
                report_md += f"- **TTFB**: {ttfb:.2f} ms\n"
                report_md += f"- **Status**: {response.getcode()}\n"
                report_md += "### Headers\n```\n"
                report_md += str(headers)
                report_md += "```\n\n"

                ttfb_data.append({
                    'url': url,
                    'ttfb_ms': round(ttfb, 2),
                    'cache_control': headers.get('Cache-Control', 'N/A'),
                    'content_encoding': headers.get('Content-Encoding', 'N/A'),
                    'server': headers.get('Server', 'N/A')
                })
        except Exception as e:
            report_md += f"## {url}\n\nError: {str(e)}\n\n"
            print(f"Error checking {url}: {e}")

    with open(os.path.join(OUTPUT_DIR, "headers_report.md"), "w") as f:
        f.write(report_md)

    with open(os.path.join(OUTPUT_DIR, "ttfb_table.csv"), "w", newline='') as f:
        writer = csv.DictWriter(f, fieldnames=['url', 'ttfb_ms', 'cache_control', 'content_encoding', 'server'])
        writer.writeheader()
        writer.writerows(ttfb_data)

if __name__ == "__main__":
    check_headers()
