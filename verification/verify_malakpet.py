from playwright.sync_api import sync_playwright

def verify_malakpet_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Navigate to the page
            page.goto("http://localhost:3000/neurosurgeon-malakpet")

            # Wait for content to load
            page.wait_for_selector("h1")

            # Take a screenshot of the top section (Hero + Stats)
            # 1200x1200 should capture Hero, Stats, and some content
            page.set_viewport_size({"width": 1200, "height": 1200})
            page.screenshot(path="verification/malakpet_top.png")
            print("Screenshot captured: verification/malakpet_top.png")

            # Take a screenshot of the Services & Insurance section
            # scroll down
            page.evaluate("window.scrollBy(0, 1000)")
            page.screenshot(path="verification/malakpet_middle.png")
            print("Screenshot captured: verification/malakpet_middle.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_malakpet_page()
