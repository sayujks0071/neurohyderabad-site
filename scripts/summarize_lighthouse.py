import json
import os

def load_report(filename):
    if not os.path.exists(filename):
        return None
    with open(filename, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_summary(report, label):
    if not report:
        return f"## {label} - Not Found\n\n"

    cats = report.get('categories', {})

    summary = f"## {label}\n\n"
    summary += "| Category | Score |\n|---|---|\n"
    for cat_id, cat in cats.items():
        score = cat.get('score', 0) * 100
        summary += f"| {cat.get('title')} | {score:.0f} |\n"

    summary += "\n### Core Web Vitals (Field/Lab)\n\n"
    audits = report.get('audits', {})

    metrics = {
        'first-contentful-paint': 'FCP',
        'largest-contentful-paint': 'LCP',
        'total-blocking-time': 'TBT',
        'cumulative-layout-shift': 'CLS',
        'speed-index': 'Speed Index',
        'interactive': 'TTI'
    }

    summary += "| Metric | Value | Score |\n|---|---|---|\n"
    for audit_id, name in metrics.items():
        audit = audits.get(audit_id, {})
        display_value = audit.get('displayValue', 'N/A')
        score = audit.get('score', 0) * 100 if audit.get('score') is not None else 'N/A'
        summary += f"| {name} | {display_value} | {score} |\n"

    summary += "\n### Top Opportunities\n\n"
    opportunities = []
    for audit in audits.values():
        if audit.get('details', {}).get('type') == 'opportunity' and audit.get('score', 1) < 0.9:
            opportunities.append({
                'title': audit.get('title'),
                'savings': audit.get('details', {}).get('overallSavingsMs', 0),
                'description': audit.get('description')
            })

    opportunities.sort(key=lambda x: x['savings'], reverse=True)

    for op in opportunities[:5]:
        summary += f"- **{op['title']}** ({op['savings']:.0f}ms potential savings)\n"
        summary += f"  > {op['description'][:200]}...\n\n"

    return summary

def main():
    mobile = load_report('lighthouse-mobile.json')
    desktop = load_report('lighthouse-desktop.json')

    with open('audit/lighthouse/summary.md', 'w', encoding='utf-8') as f:
        f.write("# Lighthouse Audit Summary\n\n")
        f.write(extract_summary(mobile, "Mobile"))
        f.write("\n---\n\n")
        f.write(extract_summary(desktop, "Desktop"))

    print("Summary written to audit/lighthouse/summary.md")

if __name__ == "__main__":
    main()
