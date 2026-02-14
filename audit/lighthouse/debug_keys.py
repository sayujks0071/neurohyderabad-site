import json

with open('audit/lighthouse/home.report.json') as f:
    data = json.load(f)

print(list(data['audits'].keys()))
