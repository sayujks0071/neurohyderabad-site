import urllib.request
import urllib.parse
import urllib.error
import re
import csv
import json
import time
import os
import xml.etree.ElementTree as ET
from html.parser import HTMLParser

BASE_URL = "http://localhost:3000"
PROD_URL = "https://www.drsayuj.info"
SITEMAP_URL = f"{BASE_URL}/sitemap.xml"

CRAWL_DIR = "audit/crawl"
ONPAGE_DIR = "audit/onpage"
TECH_DIR = "audit/tech"
SCHEMA_DIR = "audit/schema"
HEADERS_DIR = "audit/headers"

os.makedirs(CRAWL_DIR, exist_ok=True)
os.makedirs(ONPAGE_DIR, exist_ok=True)
os.makedirs(TECH_DIR, exist_ok=True)
os.makedirs(SCHEMA_DIR, exist_ok=True)
os.makedirs(HEADERS_DIR, exist_ok=True)

class MetadataParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = None
        self.meta_description = None
        self.h1 = []
        self.h1_count = 0
        self.canonical = None
        self.robots = None
        self.scripts = []
        self.text_content = []
        self.links = []
        self.in_script = False
        self.in_title = False
        self.in_h1 = False
        self.script_type = None

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag == 'title':
            self.in_title = True
        elif tag == 'meta':
            name = attrs_dict.get('name', '').lower()
            if name == 'description':
                self.meta_description = attrs_dict.get('content')
            elif name == 'robots':
                self.robots = attrs_dict.get('content')
        elif tag == 'h1':
            self.in_h1 = True
            self.h1_count += 1
        elif tag == 'link':
            rel = attrs_dict.get('rel', '').lower()
            if rel == 'canonical':
                self.canonical = attrs_dict.get('href')
        elif tag == 'script':
            self.in_script = True
            self.script_type = attrs_dict.get('type')
        elif tag == 'a':
            href = attrs_dict.get('href')
            if href:
                self.links.append(href)

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False
        elif tag == 'h1':
            self.in_h1 = False
        elif tag == 'script':
            self.in_script = False

    def handle_data(self, data):
        if self.in_title:
            self.title = data.strip()
        elif self.in_h1:
            self.h1.append(data.strip())
        elif self.in_script and self.script_type == 'application/ld+json':
            self.scripts.append(data.strip())
        elif not self.in_script:
            if data.strip():
                self.text_content.append(data.strip())

def fetch_url(url):
    try:
        req = urllib.request.Request(
            url,
            headers={'User-Agent': 'SEO-Audit-Bot/1.0'}
        )
        with urllib.request.urlopen(req, timeout=10) as response:
            headers = dict(response.info())
            content = response.read().decode('utf-8')
            return {
                'status': response.status,
                'headers': headers,
                'content': content,
                'url': response.url,
                'ttfb': 0 # Basic placeholder
            }
    except urllib.error.HTTPError as e:
        return {'status': e.code, 'headers': {}, 'content': '', 'url': url, 'error': str(e)}
    except Exception as e:
        return {'status': 0, 'headers': {}, 'content': '', 'url': url, 'error': str(e)}

def parse_sitemap(sitemap_content):
    urls = []
    is_index = False
    try:
        root = ET.fromstring(sitemap_content)
        if 'sitemapindex' in root.tag:
            is_index = True

        for elem in root.iter():
            if elem.tag.endswith('loc'):
                if elem.text:
                    urls.append(elem.text.strip())

    except Exception as e:
        print(f"Error parsing sitemap: {e}")
    return urls, is_index

def get_all_sitemap_urls(start_url):
    all_urls = []
    queue = [start_url]
    processed_sitemaps = set()

    while queue:
        url = queue.pop(0)
        if url in processed_sitemaps:
            continue
        processed_sitemaps.add(url)

        print(f"Fetching sitemap: {url}")
        res = fetch_url(url)
        if res['status'] == 200:
            urls, is_index = parse_sitemap(res['content'])

            # If it's an index, add child sitemaps to queue
            # Note: The parsed URLs are PROD URLs usually. We need to map them to local if needed for fetching.
            if is_index:
                print(f"Found sitemap index with {len(urls)} sitemaps")
                for u in urls:
                    # Convert to local URL for fetching
                    local_u = u.replace(PROD_URL, BASE_URL)
                    queue.append(local_u)
            else:
                print(f"Found {len(urls)} URLs in sitemap")
                # Filter out XML files (like other sitemaps or image/video sitemaps if they got mixed in)
                page_urls = [u for u in urls if not u.endswith('.xml')]
                all_urls.extend(page_urls)
        else:
            print(f"Failed to fetch sitemap {url}: {res['status']}")

    return list(set(all_urls))

def run_audit():
    print(f"Starting sitemap discovery from {SITEMAP_URL}")
    urls = get_all_sitemap_urls(SITEMAP_URL)

    # Process URLs: replace prod domain with localhost
    local_urls = []
    for u in urls:
        if u.startswith(PROD_URL):
            local_urls.append(u.replace(PROD_URL, BASE_URL))
        elif u.startswith(BASE_URL):
            local_urls.append(u)
        else:
            if u.startswith('/'):
                local_urls.append(f"{BASE_URL}{u}")
            else:
                local_urls.append(u)

    local_urls = list(set(local_urls))

    crawl_results = []
    onpage_issues = []
    tech_issues = []
    schema_inventory = {}
    headers_report = []

    print(f"Starting crawl of {len(local_urls)} pages...")

    count = 0
    max_pages = 20

    for url in local_urls:
        if count >= max_pages: break
        count += 1

        print(f"Crawling {count}/{len(local_urls)}: {url}")
        start_time = time.time()
        res = fetch_url(url)
        end_time = time.time()
        ttfb = int((end_time - start_time) * 1000)

        prod_url_report = url.replace(BASE_URL, PROD_URL)

        result = {
            'url': prod_url_report,
            'local_url': url,
            'status': res['status'],
            'ttfb': ttfb,
            'headers': res.get('headers', {})
        }

        content_type = res.get('headers', {}).get('Content-Type', '').lower()
        if 'text/html' not in content_type:
            print(f"Skipping non-HTML content: {content_type}")
            continue

        if res['status'] == 200:
            parser = MetadataParser()
            try:
                parser.feed(res['content'])
            except Exception as e:
                print(f"Error parsing HTML for {url}: {e}")

            result['title'] = parser.title
            result['meta_description'] = parser.meta_description
            result['h1'] = parser.h1
            result['canonical'] = parser.canonical
            result['robots'] = parser.robots
            result['word_count'] = len(' '.join(parser.text_content).split())
            result['inlinks_count'] = 0
            result['schema_types'] = []

            schemas = []
            for script in parser.scripts:
                try:
                    data = json.loads(script)
                    schemas.append(data)
                    def extract_types(obj):
                        types = []
                        if isinstance(obj, dict):
                            t = obj.get('@type')
                            if t:
                                if isinstance(t, list): types.extend(t)
                                else: types.append(t)
                            for k, v in obj.items():
                                types.extend(extract_types(v))
                        elif isinstance(obj, list):
                            for item in obj:
                                types.extend(extract_types(item))
                        return types
                    result['schema_types'].extend(extract_types(data))
                except:
                    pass

            schema_inventory[result['url']] = schemas
            result['schema_types'] = list(set([str(x) for x in result['schema_types']]))

            if not result['title']:
                onpage_issues.append([result['url'], 'Missing Title', 'High', 'Add title tag'])
            elif len(result['title']) > 60:
                onpage_issues.append([result['url'], 'Title Too Long', 'Medium', 'Shorten title'])

            if not result['meta_description']:
                onpage_issues.append([result['url'], 'Missing Meta Description', 'High', 'Add meta description'])

            if not result['h1']:
                onpage_issues.append([result['url'], 'Missing H1', 'High', 'Add H1 tag'])
            elif parser.h1_count > 1:
                onpage_issues.append([result['url'], 'Multiple H1', 'Medium', 'Use only one H1'])

            if not result['canonical']:
                onpage_issues.append([result['url'], 'Missing Canonical', 'High', 'Add canonical tag'])

            if result['word_count'] < 300:
                onpage_issues.append([result['url'], 'Thin Content', 'Medium', 'Add more content'])

            if result['canonical'] and result['canonical'] != result['url']:
                 tech_issues.append([result['url'], 'Canonical Mismatch', 'Medium', f"Canonical points to {result['canonical']}"])

        else:
            tech_issues.append([result['url'], f"Status {res['status']}", 'High', 'Check server logs'])
            result['error'] = res.get('error')

        headers_report.append({
            'url': result['url'],
            'status': result['status'],
            'cache_control': result['headers'].get('Cache-Control', 'N/A'),
            'content_type': result['headers'].get('Content-Type', 'N/A'),
            'ttfb': ttfb
        })

        crawl_results.append(result)

        if len(local_urls) < max_pages and res['status'] == 200:
            for link in parser.links:
                if link.startswith('/'):
                    full_link = f"{BASE_URL}{link}"
                    if full_link not in local_urls:
                        local_urls.append(full_link)
                elif link.startswith(BASE_URL):
                    if link not in local_urls:
                        local_urls.append(link)
                elif link.startswith(PROD_URL):
                    mapped = link.replace(PROD_URL, BASE_URL)
                    if mapped not in local_urls:
                        local_urls.append(mapped)

    with open(f'{CRAWL_DIR}/url_inventory.csv', 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['URL', 'Status', 'Title', 'Meta Description', 'H1', 'Word Count', 'Canonical', 'Robots', 'Schema Types'])
        for r in crawl_results:
            writer.writerow([
                r['url'],
                r['status'],
                r.get('title', ''),
                r.get('meta_description', ''),
                ';'.join(r.get('h1', [])),
                r.get('word_count', 0),
                r.get('canonical', ''),
                r.get('robots', ''),
                ';'.join(r.get('schema_types', []))
            ])

    with open(f'{CRAWL_DIR}/url_inventory.json', 'w') as f:
        json.dump(crawl_results, f, indent=2)

    with open(f'{ONPAGE_DIR}/onpage_issues.csv', 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['URL', 'Issue Type', 'Severity', 'Recommended Fix'])
        writer.writerows(onpage_issues)

    with open(f'{TECH_DIR}/tech_issues.csv', 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['URL', 'Issue', 'Severity', 'Details'])
        writer.writerows(tech_issues)

    with open(f'{SCHEMA_DIR}/schema_inventory.json', 'w') as f:
        json.dump(schema_inventory, f, indent=2)

    with open(f'{HEADERS_DIR}/headers_report.md', 'w') as f:
        f.write("# Headers Report\n\n")
        f.write("| URL | Status | TTFB (ms) | Cache-Control | Content-Type |\n")
        f.write("|---|---|---|---|---|\n")
        for h in headers_report:
            f.write(f"| {h['url']} | {h['status']} | {h['ttfb']} | {h['cache_control']} | {h['content_type']} |\n")

    with open(f'{CRAWL_DIR}/crawl_summary.md', 'w') as f:
        f.write("# Crawl Summary\n\n")
        f.write(f"- Total URLs Discovered: {len(local_urls)}\n")
        f.write(f"- URLs Crawled: {len(crawl_results)}\n")
        f.write(f"- Successful (200 OK): {len([r for r in crawl_results if r['status'] == 200])}\n")
        f.write(f"- Errors: {len([r for r in crawl_results if r['status'] != 200])}\n")
        f.write(f"- Pages with On-Page Issues: {len(set([x[0] for x in onpage_issues]))}\n")

    print("Audit Complete. Artifacts saved.")

if __name__ == "__main__":
    run_audit()
