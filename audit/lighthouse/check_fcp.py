import json
import glob
import os

LIGHTHOUSE_DIR = "audit/lighthouse"

def analyze_report(filepath):
    with open(filepath, 'r') as f:
        data = json.load(f)

    categories = data.get('categories', {})
    audits = data.get('audits', {})

    def get_display_value(audit_id):
        return audits.get(audit_id, {}).get('displayValue', 'N/A')

    metrics = {
        'LCP': get_display_value('largest-contentful-paint'),
        'CLS': get_display_value('cumulative-layout-shift'),
        'TBT': get_display_value('total-blocking-time'),
        'FCP': get_display_value('first-contentful-paint'),
    }

    return {
        'file': os.path.basename(filepath),
        'metrics': metrics
    }

def main():
    report_files = glob.glob(f"{LIGHTHOUSE_DIR}/*.report.json")
    results = []

    for file in report_files:
        try:
            results.append(analyze_report(file))
        except Exception as e:
            print(f"Error analyzing {file}: {e}")

    for res in results:
        if 'home' in res['file']:
            print(f"Home FCP: {res['metrics']['FCP']}")
            print(f"Home LCP: {res['metrics']['LCP']}")
            print(f"Home TBT: {res['metrics']['TBT']}")

if __name__ == "__main__":
    main()
