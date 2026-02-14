import json
import sys

try:
    with open('audit/lighthouse/home.report.json') as f:
        data = json.load(f)

    lcp_element = data['audits']['largest-contentful-paint-element']['details']['items'][0]
    print("LCP Element:")
    print(json.dumps(lcp_element, indent=2))
except Exception as e:
    print(e)
