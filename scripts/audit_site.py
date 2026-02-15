import os
import csv
import json
import re
import glob

# Configuration
APP_DIR = 'app'
DATA_DIR = 'src/data'
CONTENT_DIR = 'content/blog'
OUTPUT_CSV = 'audit/crawl/url_inventory.csv'
OUTPUT_JSON = 'audit/schema/schema_inventory.json'

inventory = []
schema_inventory = {}

def extract_metadata(filepath):
    """Extracts metadata from a TSX file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        title_match = re.search(r"title:\s*['\"](.*?)['\"]", content)
        desc_match = re.search(r"description:\s*['\"](.*?)['\"]", content)
        h1_match = re.search(r"<h1.*?>(.*?)</h1>", content, re.DOTALL)

        # Check for schema imports
        schema_types = []
        if "MedicalWebPageSchema" in content: schema_types.append("MedicalWebPage")
        if "MedicalClinic" in content: schema_types.append("MedicalClinic")
        if "Physician" in content: schema_types.append("Physician")
        if "FAQPage" in content: schema_types.append("FAQPage")
        if "BreadcrumbList" in content: schema_types.append("BreadcrumbList")
        if "Article" in content: schema_types.append("Article")

        return {
            'title': title_match.group(1) if title_match else "MISSING",
            'description': desc_match.group(1) if desc_match else "MISSING",
            'h1': h1_match.group(1).strip() if h1_match else "MISSING",
            'schema_types': schema_types,
            'word_count': len(content.split())
        }
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        return {
            'title': "ERROR",
            'description': "ERROR",
            'h1': "ERROR",
            'schema_types': [],
            'word_count': 0
        }

def scan_app_dir():
    """Scans the app directory for page.tsx files."""
    for root, dirs, files in os.walk(APP_DIR):
        if 'page.tsx' in files:
            filepath = os.path.join(root, 'page.tsx')
            # Infer URL from path
            rel_path = os.path.relpath(root, APP_DIR)
            if rel_path == '.':
                url = '/'
            else:
                url = '/' + rel_path.replace('\\', '/')

            # Skip dynamic routes for now (handled separately or noted)
            if '[' in url:
                continue

            meta = extract_metadata(filepath)
            inventory.append({
                'url': url,
                'type': 'static',
                'filepath': filepath,
                **meta
            })
            schema_inventory[url] = meta['schema_types']

def scan_blog_content():
    """Scans content/blog for MDX files."""
    if not os.path.exists(CONTENT_DIR):
        return

    for filepath in glob.glob(os.path.join(CONTENT_DIR, '*.md*')):
        filename = os.path.basename(filepath)
        slug = os.path.splitext(filename)[0]
        if slug in ['README', 'template']: continue

        url = f'/blog/{slug}'

        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Parse frontmatter (simple regex)
            title_match = re.search(r"^title:\s*(.*?)$", content, re.MULTILINE)
            desc_match = re.search(r"^description:\s*(.*?)$", content, re.MULTILINE) # varying keys
            if not desc_match:
                desc_match = re.search(r"^summary:\s*(.*?)$", content, re.MULTILINE)

            meta = {
                'title': title_match.group(1).strip().strip('"\'') if title_match else "MISSING",
                'description': desc_match.group(1).strip().strip('"\'') if desc_match else "MISSING",
                'h1': title_match.group(1).strip().strip('"\'') if title_match else "MISSING", # Usually same as title
                'schema_types': ['Article', 'BreadcrumbList'], # Assumed for blog
                'word_count': len(content.split())
            }

            inventory.append({
                'url': url,
                'type': 'blog',
                'filepath': filepath,
                **meta
            })
            schema_inventory[url] = meta['schema_types']

        except Exception as e:
            print(f"Error parsing blog {filepath}: {e}")

def scan_data_files():
    """Scans data files for dynamic routes."""
    # Locations
    try:
        with open('src/data/locations.ts', 'r', encoding='utf-8') as f:
            content = f.read()
            # Extract slugs mostly via regex looking for 'slug: "/..."'
            slugs = re.findall(r"slug:\s*['\"](.*?)['\"]", content)
            for slug in slugs:
                if not slug.startswith('/'): slug = '/' + slug
                inventory.append({
                    'url': slug,
                    'type': 'location',
                    'filepath': 'src/data/locations.ts',
                    'title': 'Dynamic (Location)',
                    'description': 'Dynamic (Location)',
                    'h1': 'Dynamic (Location)',
                    'schema_types': ['MedicalClinic', 'Physician', 'BreadcrumbList'],
                    'word_count': 0
                })
                schema_inventory[slug] = ['MedicalClinic', 'Physician', 'BreadcrumbList']
    except Exception as e:
        print(f"Error reading locations.ts: {e}")

    # Conditions
    try:
        with open('src/data/conditionsIndex.ts', 'r', encoding='utf-8') as f:
            content = f.read()
            # primaryPath: "/conditions/..."
            paths = re.findall(r"primaryPath:\s*['\"](.*?)['\"]", content)
            for path in paths:
                inventory.append({
                    'url': path,
                    'type': 'condition',
                    'filepath': 'src/data/conditionsIndex.ts',
                    'title': 'Dynamic (Condition)',
                    'description': 'Dynamic (Condition)',
                    'h1': 'Dynamic (Condition)',
                    'schema_types': ['MedicalWebPage', 'FAQPage', 'BreadcrumbList'],
                    'word_count': 0
                })
                schema_inventory[path] = ['MedicalWebPage', 'FAQPage', 'BreadcrumbList']
    except Exception as e:
        print(f"Error reading conditionsIndex.ts: {e}")

def main():
    print("Scanning app directory...")
    scan_app_dir()
    print("Scanning blog content...")
    scan_blog_content()
    print("Scanning data files...")
    scan_data_files()

    # Write CSV
    with open(OUTPUT_CSV, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=['url', 'type', 'title', 'description', 'h1', 'word_count', 'filepath', 'schema_types'])
        writer.writeheader()
        for item in inventory:
            # Flatten schema_types for CSV
            row = item.copy()
            row['schema_types'] = ", ".join(row['schema_types'])
            writer.writerow(row)

    # Write JSON
    with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
        json.dump(schema_inventory, f, indent=2)

    print(f"Inventory generated: {len(inventory)} URLs found.")

if __name__ == "__main__":
    main()
