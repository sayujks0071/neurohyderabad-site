import csv
from collections import defaultdict

INPUT_CSV = 'audit/crawl/url_inventory.csv'
OUTPUT_CSV = 'audit/onpage/onpage_issues.csv'

def analyze():
    issues = []
    titles = defaultdict(list)

    with open(INPUT_CSV, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            url = row['url']
            title = row['title']
            desc = row['description']
            h1 = row['h1']
            wc = int(row['word_count'])

            # Check for missing title
            if not title or title == "MISSING" or title == "ERROR":
                issues.append({'url': url, 'issue_type': 'missing_title', 'severity': 'high', 'recommended_fix': 'Add unique title'})
            else:
                titles[title].append(url)

            # Check for missing description
            if not desc or desc == "MISSING" or desc == "ERROR":
                issues.append({'url': url, 'issue_type': 'missing_description', 'severity': 'medium', 'recommended_fix': 'Add meta description'})
            elif len(desc) < 50:
                issues.append({'url': url, 'issue_type': 'short_description', 'severity': 'low', 'recommended_fix': 'Expand meta description'})

            # Check for missing H1
            if not h1 or h1 == "MISSING" or h1 == "ERROR":
                # Some pages might intentionally not have H1 (e.g. redirect/utility)
                if '/api/' not in url and '/auth/' not in url:
                    issues.append({'url': url, 'issue_type': 'missing_h1', 'severity': 'high', 'recommended_fix': 'Add H1 tag'})

            # Check for thin content
            if wc < 200 and '/api/' not in url and '/auth/' not in url and 'contact' not in url:
                 issues.append({'url': url, 'issue_type': 'thin_content', 'severity': 'medium', 'recommended_fix': 'Add more content'})

    # Check duplicates
    for title, urls in titles.items():
        if len(urls) > 1:
            for u in urls:
                issues.append({'url': u, 'issue_type': 'duplicate_title', 'severity': 'high', 'recommended_fix': f'Differentiate title from {urls}'})

    # Write output
    with open(OUTPUT_CSV, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=['url', 'issue_type', 'severity', 'recommended_fix'])
        writer.writeheader()
        writer.writerows(issues)

    print(f"Analysis complete. {len(issues)} issues found.")

if __name__ == "__main__":
    analyze()
