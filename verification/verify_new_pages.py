from playwright.sync_api import sync_playwright

def verify_pages():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Verify Spinal TB Page
        print("Visiting Spinal TB page...")
        try:
            page.goto("http://localhost:3000/conditions/spinal-tuberculosis-treatment-hyderabad")
            page.wait_for_selector("h1")
            page.screenshot(path="verification/spinal-tb.png", full_page=True)
            print("Spinal TB screenshot saved.")
        except Exception as e:
            print(f"Error visiting Spinal TB page: {e}")

        # 2. Verify Lumbar Spondylosis Page
        print("Visiting Lumbar Spondylosis page...")
        try:
            page.goto("http://localhost:3000/conditions/lumbar-spondylosis-treatment-hyderabad")
            page.wait_for_selector("h1")
            page.screenshot(path="verification/lumbar-spondylosis.png", full_page=True)
            print("Lumbar Spondylosis screenshot saved.")
        except Exception as e:
             print(f"Error visiting Lumbar Spondylosis page: {e}")

        browser.close()

if __name__ == "__main__":
    verify_pages()
