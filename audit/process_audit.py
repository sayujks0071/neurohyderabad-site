import json
import csv
import os
import sys
from urllib.parse import urlparse
from collections import defaultdict, Counter
import glob

# Configuration
REPORT_DIR = "reports/seo"
AUDIT_DIR = "audit"

def get_latest_report():
    files = glob.glob(os.path.join(REPORT_DIR, "comprehensive-seo-audit-*.json"))
    if not files:
        return None
    # Sort by modification time
    return max(files, key=os.path.getmtime)

def determine_page_type(url):
    path = urlparse(url).path
    if path == "/" or path == "":
        return "home"
    if "/services/" in path:
        return "service"
    if "/conditions/" in path:
        return "condition"
    if "/locations/" in path:
        return "location"
    if "/blog/" in path:
        return "blog"
    if "/appointments" in path:
        return "appointment"
    return "other"

def process_audit():
    json_file = get_latest_report()
    if not json_file:
        print("No audit report found.")
        sys.exit(1)

    print(f"Processing {json_file}...")

    with open(json_file, 'r') as f:
        data = json.load(f)

    pages = data.get('pages', [])
    if not pages:
        print("No page data found in report.")
        sys.exit(1)

    # Calculate inlinks
    inlinks = defaultdict(int)
    for page in pages:
        if 'internalLinks' in page:
            for link in page['internalLinks']:
                # Normalize link
                if link.startswith('/'):
                    full_link = data['site'] + link
                elif link.startswith(data['site']):
                    full_link = link
                else:
                    continue
                inlinks[full_link] += 1

    # Prepare data for inventory
    inventory = []
    onpage_issues = []
    tech_issues = []
    schema_inventory = {}
    schema_issues = []

    page_types = Counter()

    for page in pages:
        url = page['url']
        p_type = determine_page_type(url)
        page_types[p_type] += 1

        # Inventory Record
        h1 = page['h1Tags'][0] if page.get('h1Tags') else ""

        rec = {
            'url': url,
            'status_code': page.get('statusCode', 0),
            'canonical': page.get('canonical', ''),
            'robots': 'index,follow', # Assumed as crawler respected it
            'title': page.get('title', ''),
            'meta_description': page.get('metaDescription', ''),
            'h1': h1,
            'word_count': page.get('wordCount', 0),
            'page_type': p_type,
            'inlinks': inlinks.get(url, 0)
        }
        inventory.append(rec)

        # Schema Inventory
        if page.get('structuredData'):
            schema_types = []
            for sd in page['structuredData']:
                if '@type' in sd:
                    schema_types.append(sd['@type'])
                if '@graph' in sd:
                     for node in sd['@graph']:
                         if '@type' in node:
                             schema_types.append(node['@type'])
            schema_inventory[url] = schema_types

            # Basic Schema Checks
            if p_type in ['service', 'condition']:
                if 'FAQPage' not in schema_types:
                    schema_issues.append([url, 'Missing FAQPage Schema', 'Medium', 'Add FAQ schema'])
                if 'MedicalWebPage' not in schema_types and 'WebPage' not in schema_types:
                     pass # WebPage is common

            if 'Physician' not in schema_types and 'Person' not in schema_types:
                 # Check if it's implicitly part of MedicalClinic
                 pass

        else:
            schema_inventory[url] = []
            if p_type not in ['other']:
                schema_issues.append([url, 'No Structured Data', 'High', 'Implement Schema'])

        # OnPage Issues
        if page.get('issues'):
            for issue in page['issues']:
                severity = 'High' if 'Missing' in issue or 'Multiple' in issue else 'Medium'
                onpage_issues.append([url, issue, severity, 'Fix issue'])

        if len(page.get('title', '') or '') < 30:
            onpage_issues.append([url, 'Title too short', 'Low', 'Expand title'])

        # Tech Issues
        if page.get('statusCode') != 200:
            tech_issues.append([url, f"Status {page.get('statusCode')}", 'High', 'Fix error'])

        if not page.get('canonical'):
            tech_issues.append([url, 'Missing Canonical', 'High', 'Add canonical tag'])
        elif page.get('canonical') != url:
            # Self-referencing check
            pass # Non-self-referencing is fine if intentional, but check for conflicts

    # Write files

    # 1. URL Inventory CSV
    with open(os.path.join(AUDIT_DIR, 'crawl/url_inventory.csv'), 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=inventory[0].keys())
        writer.writeheader()
        writer.writerows(inventory)

    # 2. URL Inventory JSON
    with open(os.path.join(AUDIT_DIR, 'crawl/url_inventory.json'), 'w') as f:
        json.dump(inventory, f, indent=2)

    # 3. Crawl Summary MD
    with open(os.path.join(AUDIT_DIR, 'crawl/crawl_summary.md'), 'w') as f:
        f.write(f"# Crawl Summary\n\n")
        f.write(f"- **Total URLs**: {len(inventory)}\n")
        f.write(f"- **Indexable**: {len(inventory)} (Assumed)\n\n")
        f.write("## Page Types\n")
        for pt, count in page_types.items():
            f.write(f"- {pt}: {count}\n")

    # 4. OnPage Issues CSV
    with open(os.path.join(AUDIT_DIR, 'onpage/onpage_issues.csv'), 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['url', 'issue_type', 'severity', 'recommended_fix'])
        writer.writerows(onpage_issues)

    # 5. Tech Issues CSV
    with open(os.path.join(AUDIT_DIR, 'tech/tech_issues.csv'), 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['url', 'issue_type', 'severity', 'recommended_fix'])
        writer.writerows(tech_issues)

    # 6. Schema Inventory
    with open(os.path.join(AUDIT_DIR, 'schema/schema_inventory.json'), 'w') as f:
        json.dump(schema_inventory, f, indent=2)

    # 7. Schema Issues
    with open(os.path.join(AUDIT_DIR, 'schema/schema_issues.csv'), 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['url', 'issue_type', 'severity', 'recommended_fix'])
        writer.writerows(schema_issues)

    print("Processing complete. Artifacts generated.")

if __name__ == "__main__":
    process_audit()
