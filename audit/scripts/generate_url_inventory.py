import re
import json
import csv
import os

# Content of app/sitemap.ts is hardcoded here for simplicity in this environment
# In a real scenario, I would parse the file or import it if it was JS/TS execution environment.
# But since I am in Python, regex on the file content is easier.

SITEMAP_PATH = 'app/sitemap.ts'
OUTPUT_CSV = 'audit/crawl/url_inventory.csv'
OUTPUT_JSON = 'audit/crawl/url_inventory.json'

def extract_urls(content):
    urls = []
    # Extract arrays
    # Look for arrays like const corePages = [ ... ];

    # Simple regex to find strings inside arrays might be too loose, let's target specific variable names if possible
    # or just find all strings starting with /

    # Regex to find string literals in the file that look like paths
    matches = re.findall(r"['\"](/[\w\-/]*)['\"]", content)

    # Filter out common non-page paths
    clean_urls = []
    for url in matches:
        if url.startswith('/api') or url.startswith('/_next') or url.startswith('/images') or '.' in url:
            continue
        clean_urls.append(url)

    # Also handle the object structure in corePages: { url: '', ... }
    # The regex above captures '' as well if it's empty string, but let's be careful.

    # Let's try to be more specific based on the file structure I saw.

    # corePages
    core_pages = re.findall(r"\{ url: '([^']*)'", content)
    clean_urls.extend(core_pages) # This handles empty string '' too

    # Deduplicate and sort
    # valid URLs should be unique
    unique_urls = sorted(list(set(clean_urls)))

    # Remove empty string if present and replace with /
    final_urls = []
    for u in unique_urls:
        if u == '':
            final_urls.append('/')
        elif u.startswith('/'):
            final_urls.append(u)

    return sorted(list(set(final_urls)))

def main():
    try:
        with open(SITEMAP_PATH, 'r') as f:
            content = f.read()

        urls = extract_urls(content)

        # Write CSV
        with open(OUTPUT_CSV, 'w', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(['url', 'type', 'status'])
            for url in urls:
                # Determine type
                page_type = 'other'
                if url == '/': page_type = 'home'
                elif url.startswith('/services'): page_type = 'service'
                elif url.startswith('/conditions'): page_type = 'condition'
                elif url.startswith('/locations') or 'neurosurgeon-' in url: page_type = 'location'
                elif url.startswith('/blog'): page_type = 'blog'

                writer.writerow([url, page_type, '200']) # Assuming 200 for now as they are in sitemap

        # Write JSON
        with open(OUTPUT_JSON, 'w') as jsonfile:
            json.dump(urls, jsonfile, indent=2)

        print(f"Generated inventory with {len(urls)} URLs")

    except FileNotFoundError:
        print(f"Error: {SITEMAP_PATH} not found.")

if __name__ == "__main__":
    main()
