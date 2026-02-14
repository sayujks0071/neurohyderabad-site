import json

with open('audit/lighthouse/home.report.json') as f:
    data = json.load(f)

audit = data['audits'].get('lcp-breakdown-insight')
if audit:
    print(json.dumps(audit, indent=2))
else:
    print("Not found")
