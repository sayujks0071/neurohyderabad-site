import json
import glob
import os

LIGHTHOUSE_DIR = "audit/lighthouse"
SUMMARY_FILE = f"{LIGHTHOUSE_DIR}/summary.md"

def analyze_report(filepath):
    with open(filepath, 'r') as f:
        data = json.load(f)

    categories = data.get('categories', {})
    audits = data.get('audits', {})

    def get_score(cat):
        return categories.get(cat, {}).get('score', 0) * 100

    scores = {
        'performance': get_score('performance'),
        'accessibility': get_score('accessibility'),
        'best-practices': get_score('best-practices'),
        'seo': get_score('seo'),
    }

    def get_display_value(audit_id):
        return audits.get(audit_id, {}).get('displayValue', 'N/A')

    def get_numeric_value(audit_id):
        return audits.get(audit_id, {}).get('numericValue', 0)

    metrics = {
        'LCP': get_display_value('largest-contentful-paint'),
        'CLS': get_display_value('cumulative-layout-shift'),
        'TBT': get_display_value('total-blocking-time'),
        'FCP': get_display_value('first-contentful-paint'),
        'SI': get_display_value('speed-index'),
        'INP': get_display_value('interaction-to-next-paint'),
    }

    opportunities = []
    for key, audit in audits.items():
        if audit.get('score') is not None and audit.get('score') < 0.9:
             details = audit.get('details', {})
             if details and details.get('type') == 'opportunity':
                 savings = details.get('overallSavingsMs', 0)
                 if savings > 0:
                     opportunities.append({
                         'title': audit.get('title', key),
                         'savings': savings
                     })

    opportunities.sort(key=lambda x: x['savings'], reverse=True)

    return {
        'file': os.path.basename(filepath),
        'url': data.get('finalUrl', 'Unknown URL'),
        'scores': scores,
        'metrics': metrics,
        'opportunities': opportunities[:5]
    }

def main():
    report_files = glob.glob(f"{LIGHTHOUSE_DIR}/*.report.json")
    results = []

    print(f"Found {len(report_files)} reports in {LIGHTHOUSE_DIR}")

    for file in report_files:
        try:
            results.append(analyze_report(file))
        except Exception as e:
            print(f"Error analyzing {file}: {e}")

    with open(SUMMARY_FILE, 'w') as f:
        f.write("# Lighthouse Audit Summary\n\n")

        for res in results:
            f.write(f"## {res['file'].replace('.report.json', '')}\n")
            f.write(f"**URL:** {res['url']}\n\n")

            f.write("### Scores\n")
            f.write(f"- **Performance:** {res['scores']['performance']:.0f}\n")
            f.write(f"- **Accessibility:** {res['scores']['accessibility']:.0f}\n")
            f.write(f"- **Best Practices:** {res['scores']['best-practices']:.0f}\n")
            f.write(f"- **SEO:** {res['scores']['seo']:.0f}\n\n")

            f.write("### Core Web Vitals\n")
            f.write(f"- **LCP:** {res['metrics']['LCP']}\n")
            f.write(f"- **CLS:** {res['metrics']['CLS']}\n")
            f.write(f"- **TBT:** {res['metrics']['TBT']}\n")
            f.write(f"- **INP:** {res['metrics']['INP']}\n\n")

            f.write("### Top Opportunities\n")
            if res['opportunities']:
                for opp in res['opportunities']:
                    f.write(f"- {opp['title']} (Savings: {opp['savings']:.0f}ms)\n")
            else:
                f.write("- No major opportunities found.\n")
            f.write("\n---\n\n")

    print(f"Summary written to {SUMMARY_FILE}")

if __name__ == "__main__":
    main()
