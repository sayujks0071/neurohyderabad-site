
from playwright.sync_api import sync_playwright

def verify_locations(page):
    # 1. Go to Banjara Hills location page
    page.goto("http://localhost:3000/neurosurgeon-banjara-hills")
    page.wait_for_load_state("networkidle")

    # Take screenshot of Banjara Hills
    page.screenshot(path="verification/banjara_hills.png", full_page=True)
    print("Screenshot taken: verification/banjara_hills.png")

    # 2. Go to Endoscopic Spine Surgery service page
    page.goto("http://localhost:3000/services/endoscopic-spine-surgery-hyderabad")
    page.wait_for_load_state("networkidle")

    # Scroll to bottom to see LocalPathways
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(1000) # Wait for potential lazy load

    # Take screenshot of Service page
    page.screenshot(path="verification/service_page.png", full_page=True)
    print("Screenshot taken: verification/service_page.png")

    # 3. Go to Sciatica Condition page
    page.goto("http://localhost:3000/conditions/sciatica-pain-treatment-hyderabad")
    page.wait_for_load_state("networkidle")

    # Scroll to bottom
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(1000)

    # Take screenshot of Condition page
    page.screenshot(path="verification/condition_page.png", full_page=True)
    print("Screenshot taken: verification/condition_page.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_locations(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
