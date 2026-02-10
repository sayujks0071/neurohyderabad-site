import requests
import json
import sys

# Configuration
BASE_URL = "http://localhost:3000" # Change if deployed
API_ENDPOINT = f"{BASE_URL}/api/ai/summarize"
TEST_URL = "https://www.drsayuj.info/blog/endoscopic-spine-surgery-hyderabad" # Example URL

def test_summarize_url():
    print(f"Testing URL summarization via {API_ENDPOINT}...")

    payload = {
        "url": TEST_URL,
        "maxLength": 100
    }

    try:
        response = requests.post(API_ENDPOINT, json=payload, stream=True)

        if response.status_code == 200:
            print("Success! Receiving stream...")
            content = ""
            for chunk in response.iter_content(chunk_size=1024):
                if chunk:
                    text = chunk.decode('utf-8')
                    print(text, end="", flush=True)
                    content += text
            print("\n\nTest Passed.")
        else:
            print(f"Failed with status {response.status_code}")
            print(response.text)
            sys.exit(1)

    except Exception as e:
        print(f"Error: {e}")
        print("Note: This test requires the Next.js server to be running (npm run dev).")
        sys.exit(1)

if __name__ == "__main__":
    test_summarize_url()
