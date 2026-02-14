import json
import csv
import os

# Load JSON
audit_file = "reports/seo/comprehensive-seo-audit-2026-02-13.json"
try:
    with open(audit_file, 'r') as f:
        audit_data = json.load(f)
except FileNotFoundError:
    print(f"Error: File {audit_file} not found.")
    exit(1)

# Initialize data structures
url_inventory = []
onpage_issues = []
schema_inventory = {}
schema_issues = []

def extract_types(data):
    types = []
    if isinstance(data, dict):
        if '@type' in data:
            val = data['@type']
            if isinstance(val, list):
                types.extend(val)
            else:
                types.append(val)
        if '@graph' in data:
            types.extend(extract_types(data['@graph']))
    elif isinstance(data, list):
        for item in data:
            types.extend(extract_types(item))
    return types

# Process pages
for page in audit_data.get('pages', []):
    url = page.get('url', '')
    status = page.get('statusCode', 0)
    title = page.get('title', '')
    meta_desc = page.get('metaDescription', '')
    h1_tags = page.get('h1Tags', [])
    word_count = page.get('wordCount', 0)
    issues = page.get('issues', [])
    structured_data = page.get('structuredData', [])

    # URL Inventory
    url_inventory.append({
        'URL': url,
        'Status': status,
        'Title': title,
        'Meta Description': meta_desc,
        'H1': h1_tags[0] if h1_tags else '',
        'Word Count': word_count
    })

    # On-Page Issues
    for issue in issues:
        severity = 'High' if 'missing' in issue.lower() else 'Medium'
        onpage_issues.append({
            'URL': url,
            'Issue': issue,
            'Severity': severity
        })

    # Schema Inventory & Issues
    if structured_data:
        schema_types = extract_types(structured_data)
    else:
        schema_types = []

    schema_inventory[url] = list(set(schema_types)) # Unique types

    # Schema Validation logic
    required = []
    # Location/Contact pages need MedicalClinic
    if 'locations' in url or 'contact' in url or 'neurosurgeon-' in url:
        required.append('MedicalClinic')

    # Physician on most pages except maybe plain info pages?
    # Actually Physician schema is usually good to have on all pages for E-E-A-T if authored/reviewed by them.
    required.append('Physician')
    required.append('BreadcrumbList')

    missing = [req for req in required if req not in schema_types]
    if missing:
        schema_issues.append({
            'URL': url,
            'Missing Schemas': ', '.join(missing),
            'Severity': 'Medium'
        })

# Output CSVs
def write_csv(filename, data, fieldnames):
    with open(filename, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for row in data:
            writer.writerow(row)

# Ensure directories exist
os.makedirs('audit/crawl', exist_ok=True)
os.makedirs('audit/onpage', exist_ok=True)
os.makedirs('audit/schema', exist_ok=True)

write_csv('audit/crawl/url_inventory.csv', url_inventory, ['URL', 'Status', 'Title', 'Meta Description', 'H1', 'Word Count'])
write_csv('audit/onpage/onpage_issues.csv', onpage_issues, ['URL', 'Issue', 'Severity'])
write_csv('audit/schema/schema_issues.csv', schema_issues, ['URL', 'Missing Schemas', 'Severity'])

# Output JSON
with open('audit/schema/schema_inventory.json', 'w') as f:
    json.dump(schema_inventory, f, indent=2)

print("Processing complete. Generated artifacts in audit/ directory.")
