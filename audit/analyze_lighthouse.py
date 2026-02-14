import json
import os
import glob

LIGHTHOUSE_DIR = "audit/lighthouse"
SUMMARY_FILE = f"{LIGHTHOUSE_DIR}/summary.md"

def analyze_report(filepath):
    with open(filepath, 'r') as f:
        data = json.load(f)

    categories = data['categories']
    audits = data['audits']

    scores = {
        'performance': categories['performance']['score'] * 100,
        'accessibility': categories['accessibility']['score'] * 100,
        'best-practices': categories['best-practices']['score'] * 100,
        'seo': categories['seo']['score'] * 100,
    }

    metrics = {
        'LCP': audits['largest-contentful-paint']['displayValue'],
        'CLS': audits['cumulative-layout-shift']['displayValue'],
        'TBT': audits['total-blocking-time']['displayValue'],
        'FCP': audits['first-contentful-paint']['displayValue'],
        'SI': audits['speed-index']['displayValue'],
    }

    # Extract opportunities
    opportunities = []
    for key, audit in audits.items():
        if audit.get('details', {}).get('type') == 'opportunity' and audit.get('score') is not None and audit.get('score') < 0.9:
            opportunities.append({
                'title': audit['title'],
                'savings': audit.get('details', {}).get('overallSavingsMs', 0)
            })

    opportunities.sort(key=lambda x: x['savings'], reverse=True)

    return {
        'url': data['finalUrl'],
        'scores': scores,
        'metrics': metrics,
        'opportunities': opportunities[:5]
    }

def main():
    report_files = glob.glob(f"{LIGHTHOUSE_DIR}/*.report.json")
    results = []

    for file in report_files:
        try:
            results.append(analyze_report(file))
        except Exception as e:
            print(f"Error analyzing {file}: {e}")

    with open(SUMMARY_FILE, 'w') as f:
        f.write("# Lighthouse Audit Summary\n\n")

        for res in results:
            f.write(f"## {res['url']}\n")
            f.write("### Scores\n")
            f.write(f"- Performance: {res['scores']['performance']:.0f}\n")
            f.write(f"- Accessibility: {res['scores']['accessibility']:.0f}\n")
            f.write(f"- Best Practices: {res['scores']['best-practices']:.0f}\n")
            f.write(f"- SEO: {res['scores']['seo']:.0f}\n\n")

            f.write("### Core Web Vitals\n")
            f.write(f"- LCP: {res['metrics']['LCP']}\n")
            f.write(f"- CLS: {res['metrics']['CLS']}\n")
            f.write(f"- TBT: {res['metrics']['TBT']}\n\n")

            f.write("### Top Opportunities\n")
            for opp in res['opportunities']:
                f.write(f"- {opp['title']} (Savings: {opp['savings']:.0f}ms)\n")
            f.write("\n---\n\n")

    print(f"Summary written to {SUMMARY_FILE}")

if __name__ == "__main__":
    main()
