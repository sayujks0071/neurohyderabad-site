import time
from playwright.sync_api import sync_playwright

def verify_clarity():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("Navigating to http://localhost:3000...")
        try:
            page.goto("http://localhost:3000", timeout=60000)
        except Exception as e:
            print(f"Navigation failed: {e}")
            browser.close()
            return

        # Wait for hydration
        page.wait_for_load_state("networkidle")

        # Give some time for lazyOnload to trigger (it happens during idle)
        # We can simulate idle or just wait a bit.
        print("Waiting for lazy scripts...")
        time.sleep(5)

        # Check for the script tag
        # The id is "microsoft-clarity-init" passed to Script component
        script_locator = page.locator("script#microsoft-clarity-init")

        if script_locator.count() > 0:
            print("SUCCESS: Found script with id 'microsoft-clarity-init'.")
        else:
            print("WARNING: Script with id 'microsoft-clarity-init' not found yet.")

        # We can also check if the Clarity global 'clarity' is defined
        clarity_defined = page.evaluate("typeof window.clarity !== 'undefined'")
        if clarity_defined:
             print("SUCCESS: window.clarity is defined.")
        else:
             print("INFO: window.clarity is NOT defined (yet). This is expected if lazy loading is very delayed or blocked.")

        # Take a screenshot
        page.screenshot(path="verification_clarity.png")
        print("Screenshot saved to verification_clarity.png")

        browser.close()

if __name__ == "__main__":
    verify_clarity()
